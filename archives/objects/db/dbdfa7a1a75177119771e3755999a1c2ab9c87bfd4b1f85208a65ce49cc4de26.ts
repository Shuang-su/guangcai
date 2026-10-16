/** Route/scroll parallax is deterministic, interruptible and disabled for reduced motion. */
export function createScenery(art:HTMLElement){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let current=0,target=0,x=0,y=0,tx=0,ty=0,frame=0;
 const draw=()=>{
  frame=0;current+=(target-current)*.075;x+=(tx-x)*.055;y+=(ty-y)*.055;
  if(reduced){current=target;x=y=0;}
  art.style.setProperty('--scene-travel',String(current));art.style.setProperty('--look-x',x+'px');art.style.setProperty('--look-y',y+'px');
  if(!reduced&&(Math.abs(current-target)>.002||Math.abs(x-tx)>.05||Math.abs(y-ty)>.05))frame=requestAnimationFrame(draw);
 };
 const update=()=>{if(!frame)frame=requestAnimationFrame(draw);};
 window.addEventListener('pointermove',e=>{if(e.pointerType==='mouse'){tx=(e.clientX/innerWidth-.5)*8;ty=(e.clientY/innerHeight-.5)*5;update();}},{passive:true});
 window.addEventListener('scroll',()=>{ty=-Math.min(35,scrollY*.025);update();},{passive:true});
 return {setScene:(scene:string)=>{target=scene==='create'?1:scene==='result'?.45:scene==='intro'?-.6:0;update();}};
}
