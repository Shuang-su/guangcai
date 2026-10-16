import {Texture,DataTexture,HalfFloatType,RGBAFormat,RedFormat,RGFormat,UnsignedByteType,LinearFilter,LinearMipmapLinearFilter,SRGBColorSpace,NoColorSpace,ClampToEdgeWrapping} from 'three';
import type {Asset} from './types';
import {TaskQueue,abortError} from './queue';
import {readBounded} from './hfn';
export interface Lease {texture:Texture;release:()=>void}
type Entry={asset:Asset;refs:number;touched:number;texture?:Texture;controller:AbortController;promise:Promise<Texture>};
const MiB=1024*1024;
export class ResourcePool {
 private entries=new Map<string,Entry>();private disposed=false;private worker?:Worker;
 private network=new TaskQueue(2);private decoding=new TaskQueue(1);private bytes=0;private peak=0;private transferred=0;private cancelled=0;
 readonly steady:number;readonly maximum:number;reserve=0;
 constructor(mobile:boolean){this.steady=(mobile?128:256)*MiB;this.maximum=(mobile?192:384)*MiB;}
 private disposeEntry(key:string,e:Entry){
  this.entries.delete(key);this.bytes-=e.asset.gpuBytes;e.controller.abort();
  if(e.texture){e.texture.dispose();const image=e.texture.image as {close?:()=>void;data?:unknown};image?.close?.();if(image&&'data'in image)image.data=null;e.texture=null as unknown as Texture;}
 }
 private trim(target:number){
  const idle=[...this.entries].filter(([,e])=>e.refs===0).sort((a,b)=>a[1].touched-b[1].touched);
  for(const [k,e]of idle){if(this.bytes+this.reserve<=target)break;this.disposeEntry(k,e);}
 }
 setReserve(bytes:number){this.reserve=bytes;this.trim(this.steady);this.peak=Math.max(this.peak,this.bytes+this.reserve);}
 canFit(assets:Asset[]){const newBytes=[...new Map(assets.map(a=>[a.url,a])).values()].filter(a=>!this.entries.has(a.url)).reduce((n,a)=>n+a.gpuBytes,0);this.trim(this.steady-newBytes);return this.bytes+this.reserve+newBytes<=this.maximum;}
 async acquire(asset:Asset,signal?:AbortSignal):Promise<Lease>{
  if(this.disposed||signal?.aborted)throw abortError();
  let entry=this.entries.get(asset.url);
  if(!entry){
   if(!this.canFit([asset]))throw Error('Resource memory budget exceeded');
   const controller=new AbortController();entry={asset,refs:0,touched:performance.now(),controller,promise:null as unknown as Promise<Texture>};
   this.entries.set(asset.url,entry);this.bytes+=asset.gpuBytes;this.peak=Math.max(this.peak,this.bytes+this.reserve);
   const current=entry;
   entry.promise=this.load(asset,controller.signal).then(texture=>{if(controller.signal.aborted||this.disposed){texture.dispose();(texture.image as ImageBitmap)?.close?.();throw abortError();}current.texture=texture;return texture;}).catch(e=>{if(this.entries.get(asset.url)===current)this.disposeEntry(asset.url,current);throw e;});
  }
  const current=entry;current.refs++;let released=false;
  const release=()=>{if(released)return;released=true;signal?.removeEventListener('abort',cancel);current.refs--;current.touched=performance.now();if(current.refs===0&&!current.texture){this.cancelled++;current.controller.abort();if(this.entries.get(asset.url)===current)this.disposeEntry(asset.url,current);}this.trim(this.steady);};
  let cancel=()=>{};
  try{
   const aborted=new Promise<never>((_,reject)=>{cancel=()=>{release();reject(abortError());};signal?.addEventListener('abort',cancel,{once:true});});
   const texture=await Promise.race([current.promise,aborted]);
   signal?.removeEventListener('abort',cancel);if(signal?.aborted){release();throw abortError();}
   return {texture,release};
  }catch(e){release();throw e;}
 }
 async acquireAll(assets:Asset[],signal?:AbortSignal){
  if(!this.canFit(assets))throw Error('Resource memory budget exceeded');
  const results=await Promise.allSettled(assets.map(a=>this.acquire(a,signal))),leases=results.flatMap(r=>r.status==='fulfilled'?[r.value]:[]),error=results.find(r=>r.status==='rejected');
  if(error?.status==='rejected'){leases.forEach(l=>l.release());throw error.reason;}return leases;
 }
 private async load(asset:Asset,signal:AbortSignal){
  // Keep a transfer slot until decoding finishes: queued compressed/decoded
  // buffers are bounded too, not merely the number of concurrent fetch calls.
  return this.network.run(async()=>{
   const timeout=AbortSignal.timeout(20000),combined=AbortSignal.any([signal,timeout]);
   const response=await fetch(asset.url,{signal:combined});if(!response.ok||!response.body)throw Error(`Resource HTTP ${response.status}`);
   const bytes=await readBounded(response.body,Math.max(asset.bytes,asset.decodedBytes+16));this.transferred+=bytes.byteLength;
   return this.decoding.run(async()=>{
    if(signal.aborted)throw abortError();
    const decoded=await this.decode(bytes,asset,signal);
    if(signal.aborted){decoded.bitmap?.close();throw abortError();}
    let texture:Texture;
    if(decoded.kind==='bitmap')texture=new Texture(decoded.bitmap);
    else texture=new DataTexture(decoded.data,asset.width,asset.height,asset.encoding==='hfn1-gzip'?RGBAFormat:asset.channels===1?RedFormat:RGFormat,asset.encoding==='hfn1-gzip'?HalfFloatType:UnsignedByteType);
    texture.flipY=false;texture.generateMipmaps=true;texture.minFilter=LinearMipmapLinearFilter;texture.magFilter=LinearFilter;texture.wrapS=texture.wrapT=ClampToEdgeWrapping;
    texture.colorSpace=asset.colorSpace==='srgb'?SRGBColorSpace:NoColorSpace;texture.needsUpdate=true;texture.userData={assetId:asset.id,gpuBytes:asset.gpuBytes,precision:asset.encoding==='hfn1-gzip'?'RGBA16F':asset.channels===1?'R8':asset.channels===2?'RG8':'RGBA8'};return texture;
   },signal);
  },signal);
 }
 private decode(bytes:ArrayBuffer,asset:Asset,signal:AbortSignal):Promise<{kind:string;bitmap?:ImageBitmap;data?:Uint8Array|Uint16Array}>{
  return new Promise((resolve,reject)=>{
   const worker=this.worker??=new Worker(new URL('./decode.worker.ts',import.meta.url),{type:'module'});
   const clean=()=>{signal.removeEventListener('abort',abort);worker.onmessage=null;worker.onerror=null;};
   const abort=()=>{clean();worker.terminate();if(this.worker===worker)this.worker=undefined;reject(abortError());};
   signal.addEventListener('abort',abort,{once:true});
   worker.onmessage=e=>{clean();if(e.data.error)reject(Error(e.data.error));else resolve(e.data);};
   worker.onerror=e=>{clean();worker.terminate();this.worker=undefined;reject(Error(e.message));};
   worker.postMessage({bytes,asset},[bytes]);
  });
 }
 pause(value:boolean){this.network.pause(value);this.decoding.pause(value);}
 clear(){for(const [key,e]of this.entries)this.disposeEntry(key,e);this.worker?.terminate();this.worker=undefined;}
 debug(){return {estimatedGpuBytes:this.bytes,reservedRenderTargetBytes:this.reserve,peakEstimatedBytes:this.peak,steadyBudget:this.steady,peakBudget:this.maximum,entries:this.entries.size,activeEntries:[...this.entries.values()].filter(e=>e.refs>0).length,decodedBytes:[...this.entries.values()].filter(e=>e.texture).reduce((n,e)=>n+e.asset.decodedBytes,0),fetchedBodyBytes:this.transferred,cancelled:this.cancelled,network:this.network.debug(),decode:this.decoding.debug()};}
 dispose(){this.disposed=true;this.clear();}
}
