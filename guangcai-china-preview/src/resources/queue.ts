export const abortError=()=>new DOMException('Resource request cancelled','AbortError');
export class TaskQueue {
 private active=0;private paused=false;
 private waiting:Array<{run:()=>void;cancel:()=>void}>=[];
 constructor(readonly limit:number){if(limit<1)throw Error('Invalid queue limit');}
 run<T>(task:()=>Promise<T>,signal?:AbortSignal):Promise<T>{
  if(signal?.aborted)return Promise.reject(abortError());
  return new Promise<T>((resolve,reject)=>{
   const entry={run:()=>{signal?.removeEventListener('abort',cancel);this.active++;void Promise.resolve().then(()=>{if(signal?.aborted)throw abortError();return task();}).then(resolve,reject).finally(()=>{this.active--;this.pump();});},cancel:()=>cancel()};
   const cancel=()=>{const index=this.waiting.indexOf(entry);if(index>=0){this.waiting.splice(index,1);signal?.removeEventListener('abort',cancel);reject(abortError());}};
   signal?.addEventListener('abort',cancel,{once:true});this.waiting.push(entry);this.pump();
  });
 }
 private pump(){while(!this.paused&&this.active<this.limit&&this.waiting.length)this.waiting.shift()!.run();}
 pause(value:boolean){this.paused=value;this.pump();}
 debug(){return {active:this.active,queued:this.waiting.length,limit:this.limit,paused:this.paused};}
}
