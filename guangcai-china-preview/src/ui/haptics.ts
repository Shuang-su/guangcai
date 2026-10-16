/** Optional, short touch feedback. A successful request is not proof of motor output. */
import {createIOSHaptics,detectHapticBackend,type HapticIntent} from './ios-haptics';
type TouchIntent=HapticIntent;
interface HapticEnvironment {
 allowed:()=>boolean;
 vibrate:(duration:number,event:TouchIntent)=>boolean;
 now:()=>number;
}
export function createHaptics(environment:HapticEnvironment){
 let last=-Infinity;
 return {pulse(event:TouchIntent,duration=8){
  if(!event.isTrusted||event.pointerType!=='touch'||!environment.allowed())return false;
  const now=environment.now();if(now-last<55)return false;
  last=now;
  try{return environment.vibrate(Math.max(4,Math.min(16,duration)),event);}catch{return false;}
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
const allowed=()=>typeof navigator!=='undefined'&&navigator.maxTouchPoints>0&&document.visibilityState==='visible'&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
let runtime:ReturnType<typeof createIOSHaptics>|undefined,backend:ReturnType<typeof detectHapticBackend>='none',requested=0;
function init(){if(!runtime){backend=detectHapticBackend();runtime=createIOSHaptics(backend,allowed);}return runtime;}
const pulses=createHaptics({allowed,now:()=>performance.now(),vibrate:(duration,event)=>{
 const ios=init();const accepted=backend==='vibration'?navigator.vibrate(duration):ios.request(event,duration);
 if(accepted)requested++;return accepted;
}});
export const haptics={pulse(event:TouchIntent,duration=8){
 const ios=init();
 // Older Safari click events can be MouseEvents. A recorded trusted touch on
 // this exact button supplies the missing pointer type; keyboard clicks cannot.
 const intent=!event.pointerType&&ios.isTouchClick(event)?{isTrusted:event.isTrusted,pointerType:'touch',target:event.target}:event;
 return pulses.pulse(intent,duration);
},
 attachContinuous:(element:HTMLElement)=>init().attachContinuous(element),
 attachButton:(button:HTMLButtonElement)=>init().attachButton(button),
 debug:()=>({backend,continuousBackend:backend.startsWith('ios-')?'ios-gesture':backend,requests:requested,physicalMotorVerified:false}),
 dispose(){runtime?.dispose();runtime=undefined;backend='none';requested=0;},
};
