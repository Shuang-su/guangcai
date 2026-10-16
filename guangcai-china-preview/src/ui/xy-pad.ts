/**
 * Point proximity feedback adapted from XYSlider.swift, Andrew Janson (2025).
 * MIT source and license: docs/changes/20261016-xy-color-material/references/.
 * Browser input, rendering, accessibility and state lifecycle are project-specific.
 */
import {normalizePosition,type XYPosition} from '../styles/xy-mapping';

export type PadPainter=(context:CanvasRenderingContext2D,size:number,inset:number)=>void;
interface XYPadOptions {
 id:string;label:string;
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
 element.innerHTML=`<canvas class="xy-background" aria-hidden="true"></canvas><canvas class="xy-dots" aria-hidden="true"></canvas><span class="xy-thumb" aria-hidden="true"></span><span class="sr-only" id="${options.id}-help">使用方向键调整位置，按住 Shift 精细调整。也可使用以下横向、纵向控件。</span><input class="sr-only" type="range" min="0" max="100" step="0.1" tabindex="-1" aria-label="${options.label}横向位置"><input class="sr-only" type="range" min="0" max="100" step="0.1" tabindex="-1" aria-label="${options.label}纵向位置">`;
 const background=element.querySelector<HTMLCanvasElement>('.xy-background')!;
 const dots=element.querySelector<HTMLCanvasElement>('.xy-dots')!;
 const thumb=element.querySelector<HTMLElement>('.xy-thumb')!;
 const axes=[...element.querySelectorAll<HTMLInputElement>('input')];
 const events=new AbortController(),eventOptions={signal:events.signal};
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let value:XYPosition={x:.5,y:.5},pointer:number|null=null,frame=0,size=0,dpr=0;
 let backgroundKey='',backgroundDirty=true,painter:PadPainter|undefined,disposed=false;
 let feedback:XYPosition|undefined,energy=0,lastFrame=0;
 const inset=18;
 function syncPosition(){
  const span=Math.max(1,size-2*inset);
  thumb.style.left=`${inset+value.x*span}px`;thumb.style.top=`${inset+(1-value.y)*span}px`;
  element.dataset.x=String(value.x);element.dataset.y=String(value.y);
  axes[0].value=String(value.x*100);axes[1].value=String(value.y*100);
  axes.forEach((axis,i)=>axis.setAttribute('aria-valuetext',`${Math.round((i?value.y:value.x)*100)}%`));
 }
 function draw(now:number){
  frame=0;if(disposed)return;
  const measured=element.clientWidth;if(!measured)return;
  const ratio=Math.min(devicePixelRatio||1,2);
  if(size!==measured||ratio!==dpr){
   size=measured;dpr=ratio;backgroundDirty=true;
   for(const canvas of [background,dots]){canvas.width=Math.round(size*dpr);canvas.height=Math.round(size*dpr);}
  }
  syncPosition();
  const dt=Math.min(.05,(now-lastFrame)/1000||1/60);lastFrame=now;
  const targetEnergy=pointer===null?0:1;
  if(!feedback||motion.matches){feedback={...value};energy=targetEnergy;}
  else{
   const follow=1-Math.exp(-dt*23),engage=1-Math.exp(-dt*14);
   feedback.x+=(value.x-feedback.x)*follow;feedback.y+=(value.y-feedback.y)*follow;
   energy+=(targetEnergy-energy)*engage;
  }
  if(backgroundDirty&&painter){
   const ctx=background.getContext('2d')!;ctx.setTransform(dpr,0,0,dpr,0,0);
   ctx.clearRect(0,0,size,size);painter(ctx,size,inset);backgroundDirty=false;
  }
  const ctx=dots.getContext('2d')!;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,size,size);
  const span=size-2*inset,divisions=Math.max(6,Math.round(span/20));
  const px=inset+feedback.x*span,py=inset+(1-feedback.y)*span;
  for(let row=0;row<=divisions;row++)for(let col=0;col<=divisions;col++){
   const x=inset+col/divisions*span,y=inset+row/divisions*span,distance=Math.hypot(x-px,y-py);
   const proximity=Math.exp(-distance*distance/(2*42*42));
   const scale=1+proximity*(1.4+energy*.95),opacity=Math.min(1,.22+proximity*(.7+energy*.16));
   const drift=motion.matches?0:proximity*energy*4;
   const dx=distance?(x-px)/distance*drift:0,dy=distance?(y-py)/distance*drift:0;
   ctx.beginPath();ctx.fillStyle=`rgba(255,255,255,${opacity})`;
   ctx.shadowColor=`rgba(255,255,255,${proximity*.7})`;ctx.shadowBlur=motion.matches?0:proximity*(3+energy*8);
   ctx.arc(x+dx,y+dy,1.65*scale,0,Math.PI*2);ctx.fill();
   ctx.shadowBlur=0;ctx.strokeStyle='rgba(35,25,35,.16)';ctx.lineWidth=.5;ctx.stroke();
  }
  if(!motion.matches&&(Math.hypot(feedback.x-value.x,feedback.y-value.y)*span>.1||Math.abs(targetEnergy-energy)>.003))schedule();
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
 function cancel(){
  const id=pointer;pointer=null;element.classList.remove('is-dragging');
  if(id!==null&&element.hasPointerCapture(id))element.releasePointerCapture(id);
  schedule();
 }
 element.addEventListener('pointerdown',event=>{
  if(pointer!==null||!event.isPrimary||event.button!==0)return;
  event.preventDefault();event.stopPropagation();element.focus({preventScroll:true});
  pointer=event.pointerId;element.setPointerCapture(pointer);element.classList.add('is-dragging');
  emit(fromPointer(event));
 },eventOptions);
 element.addEventListener('pointermove',event=>{
  if(pointer!==event.pointerId)return;event.preventDefault();event.stopPropagation();emit(fromPointer(event));
 },eventOptions);
 element.addEventListener('pointerup',event=>{
  if(pointer!==event.pointerId)return;event.preventDefault();event.stopPropagation();
  emit(fromPointer(event));cancel();options.onCommit({...value});
 },eventOptions);
 const interrupted=(event:PointerEvent)=>{
  if(pointer!==event.pointerId)return;cancel();options.onCancel();
 };
 element.addEventListener('pointercancel',interrupted,eventOptions);
 element.addEventListener('lostpointercapture',interrupted,eventOptions);
 element.addEventListener('keydown',event=>{
  if(event.target!==element)return;
  const step=event.shiftKey ? .001 : .01,next={...value};
  if(event.key==='ArrowLeft')next.x-=step;
  else if(event.key==='ArrowRight')next.x+=step;
  else if(event.key==='ArrowUp')next.y+=step;
  else if(event.key==='ArrowDown')next.y-=step;
  else if(event.key==='Home'){next.x=.5;next.y=.5;}
  else return;
  event.preventDefault();event.stopPropagation();emit(next);options.onCommit({...value});
 },eventOptions);
 axes.forEach((axis,i)=>{
  axis.addEventListener('input',event=>{event.stopPropagation();emit({...value,[i?'y':'x']:Number(axis.value)/100});},eventOptions);
  axis.addEventListener('change',()=>options.onCommit({...value}),eventOptions);
 });
 const observer=new ResizeObserver(schedule);observer.observe(element);
 motion.addEventListener('change',schedule,eventOptions);
 return {element,setValue,cancel,
  setBackground(key:string,paint:PadPainter){if(key!==backgroundKey){backgroundKey=key;painter=paint;backgroundDirty=true;schedule();}},
  refresh:schedule,
  dispose(){disposed=true;cancel();events.abort();observer.disconnect();cancelAnimationFrame(frame);element.remove();}
 };
}
