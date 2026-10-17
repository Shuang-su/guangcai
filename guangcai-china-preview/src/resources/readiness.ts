export type LoadState={phase:'loading'|'rendering'|'ready'|'error'|'disposed';receivedBytes:number;totalBytes:number;lastProgressAt:number;error:string|null};
export function createReadiness(){
 let state:LoadState={phase:'loading',receivedBytes:0,totalBytes:0,lastProgressAt:0,error:null};
 const listeners=new Set<(state:LoadState)=>void>();
 const get=()=>({...state});
 const publish=(patch:Partial<LoadState>)=>{if(patch.receivedBytes!==undefined&&patch.receivedBytes>state.receivedBytes)patch.lastProgressAt=Date.now();state={...state,...patch};for(const f of listeners){try{f(get());}catch(e){console.error('Load listener failed',e);}}};
 const subscribe=(f:(state:LoadState)=>void)=>{listeners.add(f);f(get());return ()=>{listeners.delete(f);};};
 const whenReady=({signal}:{signal?:AbortSignal}={})=>new Promise<void>((resolve,reject)=>{
  let release=()=>{};const cancel=()=>{release();signal?.removeEventListener('abort',cancel);reject(new DOMException('Viewer wait cancelled','AbortError'));};
  if(signal?.aborted){cancel();return;}signal?.addEventListener('abort',cancel,{once:true});
  const check=(s:LoadState)=>{if(s.phase==='ready'||s.phase==='error'||s.phase==='disposed'){release();signal?.removeEventListener('abort',cancel);if(s.phase==='ready')resolve();else reject(Error(s.error??'Viewer disposed'));}};
  listeners.add(check);release=()=>{listeners.delete(check);};check(state);
 });
 return {get,publish,subscribe,whenReady,dispose(){publish({phase:'disposed',error:'Viewer disposed'});listeners.clear();}};
}
