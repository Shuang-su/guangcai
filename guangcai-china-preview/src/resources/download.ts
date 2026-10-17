import {readExact} from './hfn';
import {abortError} from './queue';
class HttpFailure extends Error {constructor(readonly status:number){super(`Resource HTTP ${status}`);}}
export interface DownloadOptions {signal:AbortSignal;onProgress?:(bytes:number)=>void;idleMs?:number;request?:typeof fetch;backoffMs?:number}
/** Idle time, not total transfer time. One bounded destination per attempt. */
export async function downloadResource(url:string,length:number,options:DownloadOptions):Promise<ArrayBuffer>{
 const {signal,onProgress,idleMs=120000,request=fetch,backoffMs=400}=options;
 for(let attempt=0;attempt<3;attempt++){
  if(signal.aborted)throw abortError();
  const controller=new AbortController();let timer:ReturnType<typeof setTimeout>|undefined,received=0,timedOut=false;
  const reset=()=>{clearTimeout(timer);if(typeof document==='undefined'||!document.hidden)timer=setTimeout(()=>{timedOut=true;controller.abort();},idleMs);};
  const cancel=()=>controller.abort();signal.addEventListener('abort',cancel,{once:true});
  if(typeof document!=='undefined')document.addEventListener('visibilitychange',reset);
  let retry=false;
  try{
   onProgress?.(0);reset();const response=await request(url,{signal:controller.signal});reset();
   if(!response.ok){await response.body?.cancel();throw new HttpFailure(response.status);}
   if(!response.body)throw Error('Resource response has no body');
   return await readExact(response.body,length,size=>{if(size>received){received=size;reset();}onProgress?.(size);});
  }catch(error){
   if(signal.aborted)throw abortError();
   retry=timedOut||error instanceof TypeError||error instanceof HttpFailure&&([408,429].includes(error.status)||error.status>=500);
   if(!retry||attempt===2)throw timedOut?new Error('Resource download stalled'):error;
  }finally{clearTimeout(timer);signal.removeEventListener('abort',cancel);if(typeof document!=='undefined')document.removeEventListener('visibilitychange',reset);}
  if(retry)await new Promise<void>((resolve,reject)=>{const done=()=>{signal.removeEventListener('abort',cancel);resolve();},cancel=()=>{clearTimeout(timer);signal.removeEventListener('abort',cancel);reject(abortError());},timer=setTimeout(done,backoffMs*2**attempt);signal.addEventListener('abort',cancel,{once:true});if(signal.aborted)cancel();});
 }
 throw Error('Resource download failed');
}
