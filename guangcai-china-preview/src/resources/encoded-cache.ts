import type {Asset} from './types';
import {abortError} from './queue';
type Entry={asset:Asset;refs:number;touched:number;controller:AbortController;data?:ArrayBuffer;promise:Promise<ArrayBuffer>};
export interface ByteLease {bytes:ArrayBuffer;release:()=>void}
/** Encoded file cache: reserving bytes before requests bounds queued and in-flight data too. */
export class EncodedCache {
 private entries=new Map<string,Entry>();private pins=new Set<string>();private used=0;private peak=0;private disposed=false;
 constructor(readonly limit:number,private fetcher:(asset:Asset,signal:AbortSignal)=>Promise<ArrayBuffer>){}
 pin(assets:Asset[]){const unique=new Map(assets.map(a=>[a.url,a]));if([...unique.values()].reduce((n,a)=>n+a.bytes,0)>this.limit)throw Error('Pinned resource library exceeds cache budget');this.pins=new Set(unique.keys());}
 private drop(url:string,e:Entry){if(this.entries.get(url)!==e)return;this.entries.delete(url);this.used-=e.asset.bytes;e.controller.abort();e.data=undefined;}
 private reserve(bytes:number){for(const [url,e]of [...this.entries].filter(([url,e])=>!this.pins.has(url)&&e.refs===0).sort((a,b)=>a[1].touched-b[1].touched)){if(this.used+bytes<=this.limit)break;this.drop(url,e);}if(this.used+bytes>this.limit)throw Error('Encoded resource cache budget exceeded');}
 async acquire(asset:Asset,signal?:AbortSignal):Promise<ByteLease>{
  if(this.disposed||signal?.aborted)throw abortError();let entry=this.entries.get(asset.url);
  if(!entry){
   this.reserve(asset.bytes);const controller=new AbortController();entry={asset,refs:0,touched:performance.now(),controller,promise:null as unknown as Promise<ArrayBuffer>};
   const current=entry;this.entries.set(asset.url,current);this.used+=asset.bytes;this.peak=Math.max(this.peak,this.used);
   entry.promise=Promise.resolve().then(()=>this.fetcher(asset,controller.signal)).then(async bytes=>{
    if(bytes.byteLength!==asset.bytes)throw Error('Encoded resource size differs from manifest');
    const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(n=>n.toString(16).padStart(2,'0')).join('');
    if(digest!==asset.sha256)throw Error('Resource checksum mismatch');if(controller.signal.aborted||this.disposed)throw abortError();current.data=bytes;return bytes;
   }).catch(error=>{this.drop(asset.url,current);throw error;});
  }
  const current=entry;current.refs++;current.touched=performance.now();let released=false,cancel=()=>{};
  const release=()=>{if(released)return;released=true;signal?.removeEventListener('abort',cancel);current.refs--;current.touched=performance.now();if(current.refs===0&&!current.data)this.drop(asset.url,current);};
  try{const aborted=new Promise<never>((_,reject)=>{cancel=()=>{release();reject(abortError());};signal?.addEventListener('abort',cancel,{once:true});});
   const bytes=await Promise.race([current.promise,aborted]);signal?.removeEventListener('abort',cancel);if(signal?.aborted){release();throw abortError();}return {bytes,release};
  }catch(error){release();throw error;}
 }
 async prefetch(assets:Asset[],signal?:AbortSignal){const results=await Promise.allSettled([...new Map(assets.map(a=>[a.url,a])).values()].map(async asset=>{const lease=await this.acquire(asset,signal);lease.release();}));const failed=results.find(r=>r.status==='rejected');if(failed?.status==='rejected')throw failed.reason;}
 peek(asset:Asset){const entry=this.entries.get(asset.url);if(entry?.data){entry.touched=performance.now();return entry.data;}return undefined;}
 has(asset:Asset){return !!this.entries.get(asset.url)?.data;}
 debug(){return {bytes:[...this.entries.values()].reduce((n,e)=>n+(e.data?.byteLength??0),0),reservedBytes:this.used,peakBytes:this.peak,limit:this.limit,entries:this.entries.size,pending:[...this.entries.values()].filter(e=>!e.data).length};}
 dispose(){this.disposed=true;for(const [url,e]of this.entries)this.drop(url,e);this.pins.clear();}
}
