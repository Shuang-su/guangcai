/**
 * Scoped switch gestures, informed by ios-vibrator-pro-max 3.0.4 (Sam Denty, ISC).
 * See public/third-party/ios-vibrator-pro-max-NOTICE.txt and the source audit.
 * A request/checked change is never evidence that a physical motor fired.
 */
export type HapticBackend='vibration'|'ios-label'|'ios-gesture'|'none';
export interface HapticIntent {isTrusted:boolean;pointerType?:string;target?:EventTarget|null;type?:string;detail?:number}
interface Capabilities {vibrate:boolean;touchPoints:number;switchSupported:boolean;userAgent:string;labelForwardsTrusted:boolean}

export function chooseHapticBackend(c:Capabilities):HapticBackend {
 if(c.touchPoints<1)return 'none';
 if(c.vibrate)return 'vibration';
 if(!c.switchSupported)return 'none';
 const version=c.userAgent.match(/Version\/(\d+)(?:\.(\d+))?/)??c.userAgent.match(/(?:iPhone OS|CPU OS) (\d+)(?:_(\d+))?/);
 const major=version?Number(version[1]):undefined,minor=Number(version?.[2]??0);
 // Safari 17.4 had switches; their haptic feedback arrived with iOS 18.
 if(major!==undefined&&major<18)return 'none';
 if(major===undefined||major>26||(major===26&&minor>=5)||!c.labelForwardsTrusted)return 'ios-gesture';
 return 'ios-label';
}

function labelForwardsTrusted(){
 // A plain checkbox probes label event semantics without requesting any haptic.
 const label=document.createElement('label'),input=document.createElement('input');
 input.type='checkbox';label.hidden=true;label.append(input);document.body.append(label);
 let trusted=false;
 label.addEventListener('click',event=>{event.stopPropagation();if(event.target===input)trusted=event.isTrusted;});
 try{label.click();}finally{label.remove();}
 return trusted;
}

export function detectHapticBackend():HapticBackend {
 if(typeof navigator==='undefined'||typeof document==='undefined')return 'none';
 const vibrate=typeof navigator.vibrate==='function',touchPoints=navigator.maxTouchPoints;
 const switchSupported='switch' in document.createElement('input');
 return chooseHapticBackend({vibrate,touchPoints,switchSupported,userAgent:navigator.userAgent,
  labelForwardsTrusted:!vibrate&&touchPoints>0&&switchSupported?labelForwardsTrusted():false});
}

export function createIOSHaptics(backend:HapticBackend,allowed:()=>boolean){
 const requests=new WeakMap<EventTarget,(duration:number)=>boolean>();
 const touchOrigins=new WeakMap<HTMLButtonElement,boolean>();
 const bindings=new Set<()=>void>();
 const surfaces=new Map<HTMLElement,()=>unknown>();
 let legacy:HTMLLabelElement|undefined,sequence=0;
 const motion=typeof matchMedia==='function'?matchMedia('(prefers-reduced-motion: reduce)'):undefined;
 const refresh=()=>{for(const update of bindings)update();};
 motion?.addEventListener('change',refresh);
 if(typeof document!=='undefined')document.addEventListener('visibilitychange',refresh);

 function switchInput(){
  const input=document.createElement('input');input.type='checkbox';input.setAttribute('switch','');
  input.tabIndex=-1;input.setAttribute('aria-hidden','true');input.autocomplete='off';
  input.dataset.hapticSwitch='';
  // Input/change belong to the helper, not the user's colour/range value.
  for(const name of ['click','input','change'])input.addEventListener(name,event=>event.stopPropagation());
  return input;
 }
 function request(event:HapticIntent,duration:number){
  const attached=event.target?requests.get(event.target):undefined;
  if(attached)return attached(duration);
  if(backend==='ios-gesture')return false;
  if(backend!=='ios-label')return false;
  if(!legacy){
   legacy=document.createElement('label');legacy.dataset.hapticLegacy='';legacy.hidden=true;
   legacy.append(switchInput());legacy.addEventListener('click',event=>event.stopPropagation());document.body.append(legacy);
  }
  legacy.click();return true;
 }

 function attachContinuous(element:HTMLElement){
  // Long drags cannot depend on the old label-click grant, which can expire.
  // Both generations have native switches, so use the real gesture for dragging.
  if(backend!=='ios-gesture'&&backend!=='ios-label')return undefined;
  const clip=document.createElement('span'),input=switchInput(),events=new AbortController();
  clip.className='ios-haptic-surface';clip.setAttribute('aria-hidden','true');clip.append(input);element.append(clip);
  input.style.cssText='all:revert;position:absolute;width:100%;height:100%;top:50%;left:50%;transform:translate(-50%,-50%);touch-action:none;';
  let pointer:number|null=null,startX=0,startY=0,startClientX=0,startClientY=0,x=0,y=0,resetTimer=0;
  let moved=false,pending=false,on=false,nativeMoves=0,transitions=0,starts=0,cancels=0,pointerMoves=0,touchMovesSeen=0;
  const owns=(event:PointerEvent)=>event.target===input&&event.isTrusted&&event.pointerType==='touch';
  const stats=()=>({control:element.id||'lightness',active:pointer!==null,pending,starts,cancels,pointerMoves,touchMovesSeen,nativeMoves,transitions,direction:on?'ltr':'rtl'});
  surfaces.set(element,stats);
  function reset(){
   clearTimeout(resetTimer);resetTimer=0;pointer=null;moved=false;pending=false;on=false;input.checked=false;
   clip.style.cssText='';input.disabled=!allowed();clip.style.pointerEvents=allowed()?'':'none';
  }
  function cancel(){
   if(pointer===null)return;
   cancels++;input.disabled=true;pending=false;
   const id=pointer;pointer=null;if(input.hasPointerCapture(id))input.releasePointerCapture(id);
   clearTimeout(resetTimer);resetTimer=window.setTimeout(reset,0);
  }
  function moveStyle(){
   if(pointer===null||!moved)return;
   const w=28,h=12.4,angle=Math.atan2(y-startY,x-startX)*180/Math.PI;
   // Keep the finger on the far side of the switch in its own coordinates.
   // The accepted detent, not pointer-event parity, changes the desired side.
   clip.style.cssText=`position:absolute;inset:auto;width:${w}px;height:${h}px;top:0;left:0;overflow:hidden;opacity:0;direction:${on?'ltr':'rtl'};transform:translate(${startX-w/2}px,${startY-h/2}px) rotate(${angle}deg);`;
   // WebKit reads renderer geometry in its touchmove default handler. Flush this
   // small native target before that handler rather than waiting for a paint.
   input.getBoundingClientRect();
  }
  function start(event:PointerEvent){
   if(!owns(event)||!event.isPrimary||!allowed())return;
   reset();starts++;pointer=event.pointerId;const r=element.getBoundingClientRect();
   startClientX=event.clientX;startClientY=event.clientY;
   startX=x=(event.clientX-r.left)*element.clientWidth/r.width;startY=y=(event.clientY-r.top)*element.clientHeight/r.height;
   // Leave the full target intact for native touchstart / held tracking.
  }
  input.addEventListener('pointermove',event=>{if(owns(event))pointerMoves++;},{passive:true,signal:events.signal});
  input.addEventListener('touchmove',event=>{
   if(event.isTrusted)touchMovesSeen++;
   if(!event.isTrusted||pointer===null||!allowed()||event.touches.length!==1)return;
   const touch=event.targetTouches[0];if(!touch)return;
   const r=element.getBoundingClientRect(),scaleX=element.clientWidth/r.width,scaleY=element.clientHeight/r.height;
   // The colour/material controls lift and scale during dragging. Convert both
   // endpoints back to local CSS pixels so the native anchor stays under the
   // original screen position instead of moving with that visual animation.
   startX=(startClientX-r.left)*scaleX;startY=(startClientY-r.top)*scaleY;
   x=(touch.clientX-r.left)*scaleX;y=(touch.clientY-r.top)*scaleY;
   moved=true;nativeMoves++;
   // A short request must survive the interval between pointermove and the
   // native switch's touchmove. One gesture consumes at most one pending tick.
   if(pending){pending=false;on=!on;transitions++;}
   moveStyle();
  },{passive:true,signal:events.signal});
  input.addEventListener('pointerup',()=>{pending=false;clearTimeout(resetTimer);resetTimer=window.setTimeout(reset,0);},{signal:events.signal});
  input.addEventListener('pointercancel',cancel,{signal:events.signal});
  input.addEventListener('touchcancel',cancel,{signal:events.signal});
  const update=()=>{if(!allowed()){cancel();input.disabled=true;clip.style.pointerEvents='none';}else if(pointer===null)reset();};bindings.add(update);reset();
  requests.set(input,()=>{if(pointer===null||!allowed())return false;pending=true;return true;});
  return {owns,start,cancel,dispose(){events.abort();clearTimeout(resetTimer);bindings.delete(update);requests.delete(input);surfaces.delete(element);clip.remove();}};
 }

 function attachButton(button:HTMLButtonElement){
  if(backend==='none')return ()=>{};
  const originEvents=new AbortController(),originOptions={capture:true,signal:originEvents.signal};
  button.addEventListener('pointerdown',event=>touchOrigins.set(button,event.isTrusted&&event.pointerType==='touch'),originOptions);
  for(const name of ['pointercancel','keydown'])button.addEventListener(name,()=>touchOrigins.delete(button),originOptions);
  const clearOrigin=()=>touchOrigins.delete(button);
  const disposeOrigin=()=>{originEvents.abort();touchOrigins.delete(button);};
  if(backend!=='ios-gesture'){
   button.addEventListener('click',clearOrigin,{signal:originEvents.signal});return disposeOrigin;
  }
  const label=document.createElement('label'),input=switchInput(),events=new AbortController();
  const oldPosition=button.style.position;if(getComputedStyle(button).position==='static')button.style.position='relative';
  input.id=`city-haptic-switch-${++sequence}`;input.hidden=true;label.htmlFor=input.id;
  label.className='ios-haptic-button';label.setAttribute('aria-hidden','true');button.append(label,input);
  let requested=false;
  label.addEventListener('click',()=>{requested=false;},{capture:true,signal:events.signal});
  // Registered after the action handler, so a conditional action can request one pulse.
  button.addEventListener('click',event=>{
   if(event.target===label&&(!event.isTrusted||!touchOrigins.get(button)||!requested||!allowed()))event.preventDefault();
   clearOrigin();
  },{signal:events.signal});
  requests.set(label,()=>{requested=true;return true;});
  const update=()=>{input.disabled=!allowed();label.style.pointerEvents=allowed()?'':'none';};bindings.add(update);update();
  return ()=>{disposeOrigin();events.abort();bindings.delete(update);requests.delete(label);label.remove();input.remove();button.style.position=oldPosition;};
 }
 function isTouchClick(event:HapticIntent){
  if(!event.isTrusted||event.type!=='click'||!event.detail||typeof Element==='undefined'||!(event.target instanceof Element))return false;
  const button=event.target.closest('button');return !!button&&touchOrigins.get(button)===true;
 }
 return {request,isTouchClick,attachContinuous,attachButton,debug:()=>[...surfaces.values()].map(read=>read()),dispose(){legacy?.remove();bindings.clear();surfaces.clear();motion?.removeEventListener('change',refresh);if(typeof document!=='undefined')document.removeEventListener('visibilitychange',refresh);}};
}
