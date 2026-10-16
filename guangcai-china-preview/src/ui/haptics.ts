/** Optional, short touch feedback. A successful request is not proof of motor output. */
interface TouchIntent {isTrusted:boolean;pointerType?:string}
interface HapticEnvironment {
 allowed:()=>boolean;
 vibrate:(duration:number)=>boolean;
 now:()=>number;
}
export function createHaptics(environment:HapticEnvironment){
 let last=-Infinity;
 return {pulse(event:TouchIntent,duration=8){
  if(!event.isTrusted||event.pointerType!=='touch'||!environment.allowed())return false;
  const now=environment.now();if(now-last<55)return false;
  last=now;
  try{return environment.vibrate(Math.max(4,Math.min(16,duration)));}catch{return false;}
 }};
}
/** Distance/grid crossings produce discrete ticks, not one buzz per pointer event. */
export function createHapticTrack(){
 let x=0,y=0,cell='';
 const cellAt=(px:number,py:number,spacing:number)=>`${Math.round(px/spacing)},${Math.round(py/spacing)}`;
 return {
  reset(px:number,py:number,spacing:number){x=px;y=py;cell=cellAt(x,y,spacing);},
  move(px:number,py:number,spacing:number){
   const distance=Math.hypot(px-x,py-y);if(distance<.7)return false;
   const next=cellAt(px,py,spacing),crossed=next!==cell;
   if(distance>=spacing*.8||(crossed&&distance>=spacing*.45)){x=px;y=py;cell=next;return true;}return false;
  },
 };
}
export const haptics=createHaptics({
 allowed:()=>typeof navigator!=='undefined'&&typeof navigator.vibrate==='function'&&navigator.maxTouchPoints>0&&document.visibilityState==='visible'&&!matchMedia('(prefers-reduced-motion: reduce)').matches,
 vibrate:duration=>navigator.vibrate(duration),now:()=>performance.now(),
});
