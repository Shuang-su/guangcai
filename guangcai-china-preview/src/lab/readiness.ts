export interface PreviewReadiness {
 ready:()=>boolean;
 getLoadState?:()=>{phase:string;error?:unknown};
 debug:()=>{selection:{busy:boolean};quality:{upgrading:boolean}};
}
/** A progressing transfer has no total deadline; the viewer reports actual failures. */
export async function waitForLabPreview<T extends PreviewReadiness>(getViewer:()=>T|undefined,pause=()=>new Promise<void>(r=>setTimeout(r,80))):Promise<T>{
 for(;;){
  const viewer=getViewer(),state=viewer?.getLoadState?.();
  if(state?.phase==='error')throw Error(String(state.error??'杯身预览载入失败，请刷新重试'));
  if(viewer?.ready()&&!viewer.debug().selection.busy&&!viewer.debug().quality.upgrading)return viewer;
  await pause();
 }
}
