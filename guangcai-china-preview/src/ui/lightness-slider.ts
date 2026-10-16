/** Native one-axis input with the same floating selector and point feedback as XYPad. */
interface SliderOptions {
 onStart:()=>void;
 onInput:(value:number)=>void;
 onCommit:()=>void;
 onCancel:()=>void;
}
export function createLightnessSlider(element:HTMLElement,options:SliderOptions){
 const input=element.querySelector<HTMLInputElement>('input')!;
 element.insertAdjacentHTML('afterbegin','<div class="lightness-rail" aria-hidden="true"><canvas class="lightness-dots"></canvas></div><span class="lightness-thumb" aria-hidden="true"></span>');
 const rail=element.querySelector<HTMLElement>('.lightness-rail')!;
 const canvas=element.querySelector<HTMLCanvasElement>('canvas')!;
 const thumb=element.querySelector<HTMLElement>('.lightness-thumb')!;
 const events=new AbortController(),listen={signal:events.signal},motion=matchMedia('(prefers-reduced-motion: reduce)');
 let value=50,feedback=50,energy=0,activation=0,lastFrame=0,frame=0,pointer:number|null=null,blocked=false,keyboard=false,disposed=false;
 const inset=17,clamp=(n:number)=>Number.isFinite(n)?Math.max(0,Math.min(100,n)):50;
 function sync(){thumb.style.top=`${inset+(1-value/100)*Math.max(0,element.clientHeight-inset*2)}px`;}
 function schedule(){if(!frame&&!disposed)frame=requestAnimationFrame(draw);}
 function draw(now:number){
  frame=0;if(disposed||!rail.clientHeight)return;
  const width=rail.clientWidth,height=rail.clientHeight,dpr=Math.min(devicePixelRatio||1,2);
  if(canvas.width!==Math.round(width*dpr)||canvas.height!==Math.round(height*dpr)){canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);}
  sync();const dt=Math.min(.05,(now-lastFrame)/1000||1/60);lastFrame=now;
  const target=pointer!==null ? 1 : keyboard ? .48 : 0;
  activation=motion.matches?0:Math.max(0,activation-dt/.34);
  if(motion.matches){feedback=value;energy=target;}
  else{feedback+=(value-feedback)*(1-Math.exp(-dt*23));energy+=(target-energy)*(1-Math.exp(-dt*14));}
  const ctx=canvas.getContext('2d')!;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
  const x=width/2,span=height-2*inset,y=inset+(1-feedback/100)*span;
  if(activation>0){const wash=ctx.createLinearGradient(0,0,0,height*.85);wash.addColorStop(0,`rgba(255,255,255,${activation*.44})`);wash.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=wash;ctx.fillRect(0,0,width,height);}
  if(energy>.003){const spot=ctx.createRadialGradient(x,y,0,x,y,58);spot.addColorStop(0,`rgba(255,255,255,${energy*.3})`);spot.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=spot;ctx.fillRect(0,0,width,height);}
  const divisions=Math.max(4,Math.round(span/20));
  for(let i=0;i<=divisions;i++){
   const py=inset+i/divisions*span,d=py-y,p=Math.exp(-d*d/(2*34*34));
   ctx.beginPath();ctx.fillStyle=`rgba(255,255,255,${Math.min(1,.28+p*(.62+energy*.16))})`;
   ctx.shadowColor=`rgba(255,255,255,${p*.7})`;ctx.shadowBlur=motion.matches?0:p*(3+energy*8);
   ctx.arc(x,py,1.65*(1+p*(1.4+energy*.95)),0,Math.PI*2);ctx.fill();
   ctx.shadowBlur=0;ctx.strokeStyle='rgba(35,25,35,.2)';ctx.lineWidth=.5;ctx.stroke();
  }
  if(!motion.matches&&(Math.abs(feedback-value)>.04||Math.abs(target-energy)>.003||activation>.001))schedule();
 }
 function cancel(){
  if(pointer!==null){blocked=true;const id=pointer;pointer=null;if(input.hasPointerCapture(id))input.releasePointerCapture(id);}
  keyboard=false;energy=0;activation=0;feedback=value;element.classList.remove('is-dragging','is-keyboard');schedule();
 }
 input.addEventListener('pointerdown',event=>{
  if(!event.isPrimary||event.button!==0)return;
  options.onStart();blocked=false;keyboard=false;pointer=event.pointerId;activation=1;
  element.classList.add('is-dragging');element.classList.remove('is-keyboard');schedule();
 },listen);
 input.addEventListener('pointerup',()=>{pointer=null;element.classList.remove('is-dragging');schedule();},listen);
 const interrupted=()=>{if(pointer===null)return;cancel();options.onCancel();};
 input.addEventListener('pointercancel',interrupted,listen);input.addEventListener('lostpointercapture',interrupted,listen);
 input.addEventListener('input',()=>{
  if(blocked){input.value=String(value);return;}
  value=clamp(Number(input.value));sync();schedule();options.onInput(value);
 },listen);
 input.addEventListener('change',()=>{if(!blocked)options.onCommit();},listen);
 input.addEventListener('focus',()=>{
  if(pointer===null&&input.matches(':focus-visible')){keyboard=true;activation=.65;element.classList.add('is-keyboard');schedule();}
 },listen);
 input.addEventListener('keydown',()=>{blocked=false;if(!keyboard)activation=.65;keyboard=true;element.classList.add('is-keyboard');schedule();},listen);
 input.addEventListener('blur',()=>{keyboard=false;activation=0;element.classList.remove('is-keyboard');schedule();},listen);
 const observer=new ResizeObserver(schedule);observer.observe(element);motion.addEventListener('change',schedule,listen);
 return {cancel,refresh:schedule,
  setValue(next:number,hue:number,saturation:number){
   if(pointer===null){value=clamp(next);input.value=String(value);}
   rail.style.setProperty('--lightness-color',`hsl(${hue} ${saturation}% 50%)`);sync();schedule();
  },
  dispose(){disposed=true;cancel();events.abort();observer.disconnect();cancelAnimationFrame(frame);}
 };
}
