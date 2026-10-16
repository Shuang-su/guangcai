import { icons } from '../ui/graphics';
const base=import.meta.env.BASE_URL;
const clip=(n:number)=>Math.max(0,Math.min(1,n));
export function introMarkup(){
 return `<section class="intro-scroll"><div class="intro-stage"><div class="intro-atmosphere" aria-hidden="true"><div class="light-origin"></div><div class="intro-haze haze-a"></div><div class="intro-haze haze-b"></div></div><div class="intro-copy"><h1>唤醒一束光</h1></div><div class="intro-main-title" aria-hidden="true"><span>为 APEC</span><strong>添彩</strong></div><div class="pattern-flight" aria-hidden="true">${['enamel-bird','porcelain-flower','enamel-butterfly'].map((name,i)=>`<img class="motif-${name}" src="${base}media/v2/${name}.webp" alt="" style="--i:${i}">`).join('')}</div><div id="viewer-host" class="intro-cup-slot"></div><div class="intro-controls"><button class="scroll-hint icon-button" disabled data-action="advance-intro" aria-label="下一步">${icons.next}</button><button class="primary intro-finish" hidden data-action="complete-scroll">开始添彩 ${icons.next}</button></div></div></section>`;
}
export function bindIntro(host:HTMLElement,onFinished:()=>void,onProgress:(p:number)=>void){
 const root=host.querySelector<HTMLElement>('.intro-scroll')!,stage=host.querySelector<HTMLElement>('.intro-stage')!;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const title=stage.querySelector('h1')!,hint=stage.querySelector<HTMLElement>('.scroll-hint')!,finish=stage.querySelector<HTMLElement>('.intro-finish')!;
 let progress=0,frame=0;
 if(reduced){root.classList.add('reduced');hint.innerHTML='下一步';hint.classList.add('text-button');}
 const update=()=>{
  frame=0;
  if(!reduced)progress=clip((scrollY-root.offsetTop)/Math.max(1,root.offsetHeight-innerHeight));
  const chapter=progress<.28?0:progress<.67?1:2;
  title.textContent=['唤醒一束光','让光抵达远方','万彩落于白瓷'][chapter];
  stage.dataset.progress=progress.toFixed(4);stage.dataset.chapter=String(chapter);
  const water=clip((progress-.84)/.15);
  document.body.style.setProperty('--intro-paper',String(water));
  stage.style.setProperty('--p',String(progress));
  stage.style.setProperty('--light',String(clip(progress*5+.35)*(1-clip((progress-.3)/.2))));
  stage.style.setProperty('--pattern',String(clip((progress-.25)/.12)*(1-clip((progress-.51)/.14))));
  stage.style.setProperty('--pattern-travel',`${(progress-.5)*220}px`);
  stage.style.setProperty('--ink-reveal',String(water));
  stage.style.setProperty('--title-fade',String(1-clip((progress-.82)/.09)));
  stage.style.setProperty('--main-reveal',String(clip((progress-.89)/.10)));
  const end=progress>.97;hint.hidden=end;finish.hidden=!end;
  onProgress(progress);
 };
 const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
 hint.removeAttribute("disabled");
 const advance=()=>{if(reduced){progress=clip(progress+.34);update();}else window.scrollTo({top:root.offsetTop+Math.min(1,progress+.27)*(root.offsetHeight-innerHeight),behavior:'smooth'});};
 hint.addEventListener('click',advance);finish.addEventListener('click',onFinished);
 window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);update();
 return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll);document.body.style.removeProperty('--intro-paper');};
}
