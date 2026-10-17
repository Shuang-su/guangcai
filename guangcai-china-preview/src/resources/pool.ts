import {Texture,DataTexture,HalfFloatType,RGBAFormat,RedFormat,RGFormat,UnsignedByteType,LinearFilter,LinearMipmapLinearFilter,SRGBColorSpace,NoColorSpace,ClampToEdgeWrapping} from 'three';
import type {Asset} from './types';
import {TaskQueue,abortError} from './queue';
import {readBounded} from './hfn';
import {decodeImage} from './image-decode';
import {EncodedCache} from './encoded-cache';
export interface Lease {texture:Texture;release:()=>void}
type Entry={asset:Asset;refs:number;touched:number;texture?:Texture;controller:AbortController;promise:Promise<Texture>};
const MiB=1024*1024;
export class ResourcePool {
 private received=new Map<string,number>();private decodeTask:{asset:string;phase:string}|null=null;private decodeRetries=0;
 private entries=new Map<string,Entry>();private disposed=false;private worker?:Worker;
 private network=new TaskQueue(2);private decoding=new TaskQueue(1);private bytes=0;private peak=0;private transferred=0;private cancelled=0;
 readonly steady:number;readonly maximum:number;reserve=0;private encoded:EncodedCache;private previewUrls=new Map<string,string>();
 constructor(mobile:boolean){this.steady=(mobile?128:256)*MiB;this.maximum=(mobile?192:384)*MiB;this.encoded=new EncodedCache((mobile?12:24)*MiB,(asset,signal)=>this.fetchBytes(asset,signal));}
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
 private fetchBytes(asset:Asset,signal:AbortSignal){return this.network.run(async()=>{
  const combined=AbortSignal.any([signal,AbortSignal.timeout(20000)]),response=await fetch(asset.url,{signal:combined});if(!response.ok||!response.body)throw Error(`Resource HTTP ${response.status}`);
  this.received.set(asset.url,0);const bytes=await readBounded(response.body,asset.bytes,size=>this.received.set(asset.url,size));this.transferred+=bytes.byteLength;return bytes;
 },signal);}
 private async load(asset:Asset,signal:AbortSignal){
  const source=await this.encoded.acquire(asset,signal),bytes=source.bytes;
  try{
   return await this.decoding.run(async()=>{
    if(signal.aborted)throw abortError();
    this.decodeTask={asset:asset.id,phase:'decode'};
    let decoded:Awaited<ReturnType<typeof decodeImage>>|Awaited<ReturnType<ResourcePool['decode']>>;
    try{if(asset.encoding==='webp')decoded=await decodeImage(bytes,asset,signal);else{try{decoded=await this.decode(bytes.slice(0),asset,signal);}catch(e){if(signal.aborted||!String(e).includes('timed out'))throw e;this.decodeRetries++;decoded=await this.decode(bytes.slice(0),asset,signal);}}}finally{this.decodeTask=null;}
    if(signal.aborted){if(decoded.kind==='image')decoded.image.close();throw abortError();}
    let texture:Texture;
    if(decoded.kind==='image')texture=new Texture(decoded.image);
    else texture=new DataTexture(decoded.data,asset.width,asset.height,asset.encoding==='hfn1-gzip'?RGBAFormat:asset.channels===1?RedFormat:RGFormat,asset.encoding==='hfn1-gzip'?HalfFloatType:UnsignedByteType);
    texture.flipY=decoded.kind==='image';texture.generateMipmaps=true;texture.minFilter=LinearMipmapLinearFilter;texture.magFilter=LinearFilter;texture.wrapS=texture.wrapT=ClampToEdgeWrapping;
    texture.colorSpace=asset.colorSpace==='srgb'?SRGBColorSpace:NoColorSpace;texture.needsUpdate=true;texture.userData={assetId:asset.id,gpuBytes:asset.gpuBytes,precision:asset.encoding==='hfn1-gzip'?'RGBA16F':asset.channels===1?'R8':asset.channels===2?'RG8':'RGBA8'};return texture;
   },signal);
  }finally{source.release();}
 }
 pinFiles(assets:Asset[]){this.encoded.pin(assets);}
 prefetch(assets:Asset[],signal?:AbortSignal){return this.encoded.prefetch(assets,signal);}
 fileReady(asset:Asset){return this.encoded.has(asset);}
 previewUrl(asset:Asset){let url=this.previewUrls.get(asset.url);if(!url){const bytes=this.encoded.peek(asset);if(!bytes)throw Error('Thumbnail was not preloaded');url=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));this.previewUrls.set(asset.url,url);}return url;}
 private decode(bytes:ArrayBuffer,asset:Asset,signal:AbortSignal):Promise<{kind:'normal';data:Uint16Array}>{
  return new Promise((resolve,reject)=>{
   const worker=this.worker??=new Worker(new URL('./decode.worker.ts',import.meta.url),{type:'module'});
   const clean=()=>{clearTimeout(timer);signal.removeEventListener('abort',abort);worker.onmessage=null;worker.onerror=null;};
   const fail=(error:Error)=>{clean();worker.terminate();if(this.worker===worker)this.worker=undefined;reject(error);};
   const abort=()=>fail(abortError()),timer=setTimeout(()=>fail(Error('Normal decode timed out')),15000);
   signal.addEventListener('abort',abort,{once:true});
   worker.onmessage=e=>{if(e.data.stage){this.decodeTask={asset:asset.id,phase:e.data.stage};return;}clean();if(e.data.error)reject(Error(e.data.error));else resolve(e.data);};
   worker.onerror=e=>{clean();worker.terminate();this.worker=undefined;reject(Error(e.message));};
   worker.postMessage({bytes,asset},[bytes]);
  });
 }
 progress(assets:Asset[]){const unique=[...new Map(assets.map(a=>[a.url,a])).values()];return {total:unique.reduce((n,a)=>n+a.bytes,0),received:unique.reduce((n,a)=>n+(this.encoded.has(a)?a.bytes:Math.min(a.bytes,this.received.get(a.url)??0)),0),completed:unique.filter(a=>this.encoded.has(a)||!!this.entries.get(a.url)?.texture).length,count:unique.length};}
 pause(value:boolean){this.network.pause(value);this.decoding.pause(value);}
 clear(){this.received.clear();for(const [key,e]of this.entries)this.disposeEntry(key,e);this.worker?.terminate();this.worker=undefined;}
 debug(){return {fileCache:this.encoded.debug(),decodeTask:this.decodeTask,decodeRetries:this.decodeRetries,estimatedGpuBytes:this.bytes,reservedRenderTargetBytes:this.reserve,peakEstimatedBytes:this.peak,steadyBudget:this.steady,peakBudget:this.maximum,entries:this.entries.size,activeEntries:[...this.entries.values()].filter(e=>e.refs>0).length,decodedBytes:[...this.entries.values()].filter(e=>e.texture).reduce((n,e)=>n+e.asset.decodedBytes,0),fetchedBodyBytes:this.transferred,cancelled:this.cancelled,network:this.network.debug(),decode:this.decoding.debug()};}
 dispose(){this.disposed=true;this.clear();this.encoded.dispose();for(const url of this.previewUrls.values())URL.revokeObjectURL(url);this.previewUrls.clear();}
}
