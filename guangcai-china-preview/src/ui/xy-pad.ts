/**
 * Point proximity feedback adapted from XYSlider.swift, Andrew Janson (2025).
 * MIT source and license: docs/changes/20261016-xy-color-material/references/.
 * Browser input, rendering, accessibility and state lifecycle are project-specific.
 */
import {normalizePosition,type XYPosition} from '../styles/xy-mapping';
import {prepareControlLift} from './control-lift';
import {createHDRSurface} from './hdr-surface';
import {haptics,createHapticTrack} from './haptics';

export type PadPainter=(context:CanvasRenderingContext2D,size:number,inset:number)=>void;
interface XYPadOptions {
 id:string;label:string;
 onStart?:()=>void;
 onInput:(position:XYPosition)=>void;
 onCommit:(position:XYPosition)=>void;
 onCancel:()=>void;
}
export function createXYPad(options:XYPadOptions){
 const element=document.createElement('div');
 element.id=options.id;element.className='xy-pad';element.tabIndex=0;
 element.setAttribute('role','group');element.setAttribute('aria-roledescription','二维调整面板');
 element.setAttribute('aria-label',options.label);
 element.setAttribute('aria-describedby',options.id+'-help');
 element.innerHTML=`<canvas class="xy-background" aria-hidden="true"></canvas><canvas class="xy-dots" aria-hidden="true"></canvas><span class="xy-reference" aria-hidden="true"></span><span class="xy-thumb" aria-hidden="true"></span><span class="sr-only" id="${options.id}-help">使用方向键调整位置，按住 Shift 精细调整。也可使用以下横向、纵向控件。</span><input class="sr-only" type="range" min="0" max="100" step="0.1" tabindex="-1" aria-label="${options.label}横向位置"><input class="sr-only" type="range" min="0" max="100" step="0.1" tabindex="-1" aria-label="${options.label}纵向位置">`;
 const background=element.querySelector<HTMLCanvasElement>('.xy-background')!;
 const dots=element.querySelector<HTMLCanvasElement>('.xy-dots')!;
 const thumb=element.querySelector<HTMLElement>('.xy-thumb')!;
 const referenceMark=element.querySelector<HTMLElement>('.xy-reference')!;
 const hdrField=createHDRSurface(element,background),hdrSelector=createHDRSurface(thumb);
 const hapticTrack=createHapticTrack();
 const axes=[...element.querySelectorAll<HTMLInputElement>('input')];
 const hapticSurface=haptics.attachContinuous(element);
 const events=new AbortController(),eventOptions={signal:events.signal};
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let value:XYPosition={x:.5,y:.5},pointer:number|null=null,frame=0,size=0,dpr=0;
 let backgroundKey='',backgroundDirty=true,painter:PadPainter|undefined,disposed=false;
 let feedback:XYPosition|undefined,energy=0,lastFrame=0,activation=0,afterglowUntil=0,keyboardFocused=false;
 let reference:XYPosition={x:.5,y:.5},lastPointer:{x:number;y:number}|undefined,hapticZone='';
 const zone=()=>Math.hypot(value.x-reference.x,value.y-reference.y)<.035?'default':[value.x,value.y].some(v=>v===0||v===1)?'edge':'';
 const inset=18;
 function syncPosition(){
  const span=Math.max(1,size-2*inset);
  thumb.style.left=`${inset+value.x*span}px`;thumb.style.top=`${inset+(1-value.y)*span}px`;
  referenceMark.dataset.x=String(reference.x);referenceMark.dataset.y=String(reference.y);
  element.dataset.x=String(value.x);element.dataset.y=String(value.y);
  axes[0].value=String(value.x*100);axes[1].value=String(value.y*100);
  axes.forEach((axis,i)=>axis.setAttribute('aria-valuetext',`${Math.round((i?value.y:value.x)*100)}%`));
 }
 function expansionGeometry(){
  prepareControlLift(element);
 }
 function expand(active:boolean){if(active)expansionGeometry();element.classList.toggle('is-expanded',active);}
 function draw(now:number){
  frame=0;if(disposed)return;
  const measured=element.clientWidth;if(!measured)return;
  const ratio=Math.min(devicePixelRatio||1,2);
  if(size!==measured||ratio!==dpr){
   size=measured;dpr=ratio;backgroundDirty=true;
   if(element.classList.contains('is-expanded'))expansionGeometry();
   for(const canvas of [background,dots]){canvas.width=Math.round(size*dpr);canvas.height=Math.round(size*dpr);}
  }
  syncPosition();
  const dt=Math.min(.05,(now-lastFrame)/1000||1/60);lastFrame=now;
  const targetEnergy=pointer!==null ? 1 : keyboardFocused ? .48 : 0;
  if(motion.matches)activation=0;
  else if(pointer!==null)activation=Math.max(.8,activation-dt/.7);
  else if(now>afterglowUntil)activation=Math.max(0,activation-dt/.32);
  if(!feedback)feedback={...value};
  if(motion.matches){feedback={...value};energy=targetEnergy;}
  else{
   const follow=1-Math.exp(-dt*23),engage=1-Math.exp(-dt*14);
   feedback.x+=(value.x-feedback.x)*follow;feedback.y+=(value.y-feedback.y)*follow;
   energy+=(targetEnergy-energy)*engage;
  }
  let repainted=false;
  if(backgroundDirty&&painter){
   const ctx=background.getContext('2d')!;ctx.setTransform(dpr,0,0,dpr,0,0);
   ctx.clearRect(0,0,size,size);painter(ctx,size,inset);backgroundDirty=false;repainted=true;
  }
  const ctx=dots.getContext('2d')!;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,size,size);
  const span=size-2*inset,divisions=Math.max(6,Math.round(span/20));
  const px=inset+feedback.x*span,py=inset+(1-feedback.y)*span;
  const vx=inset+value.x*span,vy=inset+(1-value.y)*span,axisWidth=span/divisions*.28;
  const displace=(x:number,y:number)=>{
   const distance=Math.hypot(x-px,y-py),proximity=Math.exp(-distance*distance/(2*42*42));
   const drift=motion.matches?0:proximity*energy*4;
   return {x:x+(distance?(x-px)/distance*drift:0),y:y+(distance?(y-py)/distance*drift:0)};
  };
  const origin=displace(inset+reference.x*span,inset+(1-reference.y)*span);
  referenceMark.style.left=`${origin.x}px`;referenceMark.style.top=`${origin.y}px`;
  // Activation illuminates the field; the feedback canvas only carries the local spotlight.
  // Screen illumination increases the colour field's brightness, without a white veil.
  background.style.filter=`brightness(${1+activation*.65})`;
  hdrField.update(1+activation*1.25,repainted);hdrSelector.update(1+activation*1.25);
  if(energy>.003){
   const radius=(64+energy*22)*size/240,light=ctx.createRadialGradient(px,py,0,px,py,radius);
   light.addColorStop(0,`rgba(255,255,255,${energy*.28})`);
   light.addColorStop(.45,`rgba(255,255,255,${energy*.13})`);light.addColorStop(1,'rgba(255,255,255,0)');
   ctx.fillStyle=light;ctx.fillRect(0,0,size,size);
  }
  for(let row=0;row<=divisions;row++)for(let col=0;col<=divisions;col++){
   const x=inset+col/divisions*span,y=inset+row/divisions*span,distance=Math.hypot(x-px,y-py);
   const proximity=Math.exp(-distance*distance/(2*42*42));
   const axis=Math.max(Math.exp(-((x-vx)**2)/(2*axisWidth**2)),Math.exp(-((y-vy)**2)/(2*axisWidth**2)));
   const scale=1+proximity*(.65+energy*1.55)+axis*.1,opacity=Math.min(1,.17+axis*.5+proximity*(.25+energy*.45));
   // The origin hint uses this exact deformation too, so zoom never leaves it behind.
   const projected=displace(x,y);
   ctx.beginPath();ctx.fillStyle=`rgba(255,255,255,${opacity})`;
   ctx.shadowColor=`rgba(255,255,255,${proximity*.7})`;ctx.shadowBlur=motion.matches?0:proximity*(3+energy*8);
   ctx.arc(projected.x,projected.y,1.65*scale,0,Math.PI*2);ctx.fill();
   ctx.shadowBlur=0;ctx.strokeStyle='rgba(35,25,35,.16)';ctx.lineWidth=.5;ctx.stroke();
  }
  if(!motion.matches&&(Math.hypot(feedback.x-value.x,feedback.y-value.y)*span>.1||Math.abs(targetEnergy-energy)>.003||activation>.001))schedule();
 }
 function schedule(){if(!frame&&!disposed)frame=requestAnimationFrame(draw);}
 function setValue(next:XYPosition){
  if(pointer!==null)return;
  value=normalizePosition(next);syncPosition();schedule();
 }
 function emit(next:XYPosition){
  value=normalizePosition(next);syncPosition();schedule();options.onInput({...value});
 }
 function fromPointer(event:PointerEvent){
  const rect=element.getBoundingClientRect(),padding=inset/(size||rect.width);
  return {x:(event.clientX-rect.left-rect.width*padding)/(rect.width*(1-2*padding)),
   y:1-(event.clientY-rect.top-rect.height*padding)/(rect.height*(1-2*padding))};
 }
 function cancel(animateRelease=false){
  const id=pointer;pointer=null;lastPointer=undefined;element.classList.remove('is-dragging');expand(false);
  if(!animateRelease){activation=0;afterglowUntil=0;energy=0;feedback=undefined;keyboardFocused=false;}
  if(id!==null&&element.hasPointerCapture(id))element.releasePointerCapture(id);
  if(!animateRelease)hapticSurface?.cancel();
  schedule();
 }
 element.addEventListener('pointerdown',event=>{
  if(pointer!==null||!event.isPrimary||event.button!==0)return;
  const native=hapticSurface?.owns(event);if(!native)event.preventDefault();event.stopPropagation();const next=fromPointer(event);options.onStart?.();
  hapticSurface?.start(event);if(!native)element.focus({preventScroll:true});
  keyboardFocused=false;activation=1;afterglowUntil=0;pointer=event.pointerId;lastPointer={x:event.clientX,y:event.clientY};if(!native)element.setPointerCapture(pointer);expansionGeometry();element.classList.add('is-dragging');expand(true);
  emit(next);hapticZone=zone();const span=size-2*inset;hapticTrack.reset(value.x*span,value.y*span,span/Math.max(6,Math.round(span/20)));haptics.pulse(event);
 },eventOptions);
 element.addEventListener('pointermove',event=>{
  if(pointer!==event.pointerId)return;if(!hapticSurface?.owns(event))event.preventDefault();event.stopPropagation();
  if(lastPointer?.x===event.clientX&&lastPointer?.y===event.clientY)return;
  lastPointer={x:event.clientX,y:event.clientY};emit(fromPointer(event));
  const nextZone=zone(),span=size-2*inset,spacing=span/Math.max(6,Math.round(span/20)),tick=hapticTrack.move(value.x*span,value.y*span,spacing);
  if(nextZone&&nextZone!==hapticZone){haptics.pulse(event,8);hapticTrack.reset(value.x*span,value.y*span,spacing);}else if(tick)haptics.pulse(event,4);hapticZone=nextZone;
 },eventOptions);
 element.addEventListener('pointerup',event=>{
  if(pointer!==event.pointerId)return;if(!hapticSurface?.owns(event))event.preventDefault();event.stopPropagation();
  if(lastPointer?.x!==event.clientX||lastPointer?.y!==event.clientY)emit(fromPointer(event));
  afterglowUntil=performance.now()+80;cancel(true);options.onCommit({...value});haptics.pulse(event,6);
 },eventOptions);
 const interrupted=(event:PointerEvent)=>{
  if(pointer!==event.pointerId)return;cancel();options.onCancel();
 };
 element.addEventListener('pointercancel',interrupted,eventOptions);
 element.addEventListener('lostpointercapture',interrupted,eventOptions);
 element.addEventListener('focus',()=>{
  keyboardFocused=element.matches(':focus-visible');if(keyboardFocused)activation=.65;schedule();
 },eventOptions);
 element.addEventListener('blur',()=>{keyboardFocused=false;activation=0;expand(false);schedule();},eventOptions);
 element.addEventListener('keydown',event=>{
  if(event.target!==element)return;
  const step=event.shiftKey ? .001 : .01,next={...value};
  if(event.key==='ArrowLeft')next.x-=step;
  else if(event.key==='ArrowRight')next.x+=step;
  else if(event.key==='ArrowUp')next.y+=step;
  else if(event.key==='ArrowDown')next.y-=step;
  else if(event.key==='Home'){next.x=.5;next.y=.5;}
  else return;
  event.preventDefault();event.stopPropagation();options.onStart?.();if(!keyboardFocused)activation=.65;keyboardFocused=true;emit(next);options.onCommit({...value});
 },eventOptions);
 axes.forEach((axis,i)=>{
  axis.addEventListener('input',event=>{event.stopPropagation();const next=Number(axis.value)/100;options.onStart?.();emit({...value,[i?'y':'x']:next});},eventOptions);
  axis.addEventListener('change',()=>options.onCommit({...value}),eventOptions);
 });
 const observer=new ResizeObserver(schedule);observer.observe(element);
 motion.addEventListener('change',schedule,eventOptions);
 return {element,setValue,cancel,
  setReference(next:XYPosition){reference=normalizePosition(next);syncPosition();schedule();},
  setBackground(key:string,paint:PadPainter){if(key!==backgroundKey){backgroundKey=key;painter=paint;backgroundDirty=true;schedule();}},
  refresh:schedule,
  dispose(){disposed=true;cancel();hapticSurface?.dispose();events.abort();observer.disconnect();cancelAnimationFrame(frame);hdrField.dispose();hdrSelector.dispose();element.remove();}
 };
}
