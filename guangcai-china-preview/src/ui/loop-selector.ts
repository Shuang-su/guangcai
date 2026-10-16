import {Spring,springs} from '../../vendor/glass-hq/src/core/spring';

export const loopIndex=(index:number,count:number)=>((index%count)+count)%count;
export function loopOffset(index:number,current:number,count:number,direction=1){
 let offset=loopIndex(index-current,count);if(offset>count/2)offset-=count;
 if(count%2===0&&offset===count/2&&direction<0)offset=-offset;
 return offset;
}
/** Cyclic identities in three menu slots or five palette slots. Gestures stay inside the strip. */
export function createLoopSelector(host:HTMLElement,items:HTMLButtonElement[],options:{initial:number;onSelect:(index:number)=>void;onActivate?:(index:number)=>void;palette?:boolean;visibleSlots?:3|4|5;peek?:boolean}){
 const n=items.length,slots=options.visibleSlots??3,position=new Spring(0,springs.layout),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let index=loopIndex(options.initial,n),target=index,direction=1,step=1,raf=0,last=0,pending=false,suppress=false,disposed=false;
 let drag:{id:number;x:number;y:number;lastX:number;lastTime:number;velocity:number;moved:boolean}|undefined;
 const resize=()=>{step=host.clientWidth/slots||1;paint();};
 function paint(){
  host.dataset.selected=String(target);
  items.forEach((button,i)=>{
   const offset=loopOffset(i,index,n,direction);
   let distance=offset+position.value/step;
   if(slots===n){distance=((distance+n/2)%n+n)%n-n/2;}
   button.style.left=`calc(50% + ${distance*step}px)`;
   const amount=Math.min(1,Math.abs(distance));button.style.setProperty('--loop-scale',String(options.palette?1-amount*.16:1));button.style.opacity=String(1-amount*(options.palette?.3:.43));
   const visible=Math.abs(distance)<slots/2+(options.peek?.5:0);button.style.visibility=visible?'visible':'hidden';button.inert=!visible;button.setAttribute('aria-hidden',String(!visible));button.tabIndex=i===target?0:-1;
   button.setAttribute(options.palette?'aria-pressed':'aria-selected',String(i===target));
  });
 }
 function finish(){if(pending){index=target;pending=false;}position.jump(0);paint();}
 function frame(now:number){raf=0;const dt=last?Math.min(.05,(now-last)/1000):1/60;last=now;if(!drag)position.step(dt);paint();if(!drag&&!position.settled)raf=requestAnimationFrame(frame);else if(!drag)finish();}
 const wake=()=>{if(!raf&&!disposed){last=0;raf=requestAnimationFrame(frame);}};
 function move(delta:number){
  if(disposed)return;finish();direction=delta<0?-1:1;target=loopIndex(index+delta,n);pending=true;
  position.configure(springs.layout).target=-delta*step;options.onSelect(target);
  if(reduced.matches)finish();else wake();
 }
 function settleDrag(delta:number){
  direction=delta<0?-1:1;target=loopIndex(index+direction,n);pending=true;position.configure(springs.release).target=-direction*step;
  options.onSelect(target);if(reduced.matches)finish();else wake();
 }
 const down=(event:PointerEvent)=>{if(event.button!==0)return;finish();drag={id:event.pointerId,x:event.clientX,y:event.clientY,lastX:event.clientX,lastTime:performance.now(),velocity:0,moved:false};};
 const dragMove=(event:PointerEvent)=>{
  if(!drag||event.pointerId!==drag.id)return;const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
  if(!drag.moved&&Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>10){drag=undefined;return;}
  if(Math.abs(dx)>7){drag.moved=true;host.setPointerCapture(event.pointerId);}
  if(!drag.moved)return;event.preventDefault();direction=dx>0?-1:1;
  const now=performance.now();drag.velocity=(event.clientX-drag.lastX)/Math.max(1,now-drag.lastTime);drag.lastX=event.clientX;drag.lastTime=now;
  position.jump(Math.max(-step*1.12,Math.min(step*1.12,dx)));paint();
 };
 const up=(event:PointerEvent)=>{
  if(!drag||event.pointerId!==drag.id)return;const {moved,velocity}=drag;drag=undefined;
  if(host.hasPointerCapture(event.pointerId))host.releasePointerCapture(event.pointerId);
  if(moved){suppress=true;setTimeout(()=>{suppress=false;},0);if(Math.abs(position.value)>Math.min(36,step*.24)||Math.abs(velocity)>.45)settleDrag(position.value<0?1:-1);else{position.target=0;wake();}}
 };
 const cancel=(event:PointerEvent)=>{if(drag?.id!==event.pointerId)return;drag=undefined;if(host.hasPointerCapture(event.pointerId))host.releasePointerCapture(event.pointerId);position.target=0;wake();};
 const click=(event:MouseEvent)=>{if(suppress){suppress=false;event.preventDefault();event.stopImmediatePropagation();}};
 host.addEventListener('pointerdown',down);host.addEventListener('pointermove',dragMove);host.addEventListener('pointerup',up);host.addEventListener('pointercancel',cancel);host.addEventListener('click',click,true);
 items.forEach((button,i)=>{
  button.onclick=()=>{if(i===target){if(!pending)options.onActivate?.(i);}else move(loopOffset(i,target,n,direction));};
  button.onkeydown=event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);items[target].focus({preventScroll:true});}else if(event.key==='Home'||event.key==='End'){event.preventDefault();set(event.key==='Home'?0:n-1);options.onSelect(index);items[index].focus({preventScroll:true});}};
 });
 function set(next:number){next=loopIndex(next,n);if(next===target)return;target=index=next;pending=false;position.jump(0);paint();}
 const observer=new ResizeObserver(resize);observer.observe(host);resize();
 return {move,set,selected:()=>target,refresh:resize,dispose(){disposed=true;cancelAnimationFrame(raf);observer.disconnect();host.removeEventListener('pointerdown',down);host.removeEventListener('pointermove',dragMove);host.removeEventListener('pointerup',up);host.removeEventListener('pointercancel',cancel);host.removeEventListener('click',click,true);for(const b of items){b.onclick=null;b.onkeydown=null;}}};
}
