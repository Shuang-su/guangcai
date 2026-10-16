import type {Actions} from './interface';
import type {View} from '../interaction/views';
import type {BackgroundState} from './background';
import './consumer.css';

export function createConsumerInterface(actions:Actions){
 const views:{id:View;label:string}[]=[{id:'exploded',label:'拆解'},{id:'lid',label:'杯盖'},{id:'hero',label:'杯碟'},{id:'saucerBottom',label:'碟底'},{id:'bottom',label:'杯底'},{id:'detail',label:'浮雕'},{id:'flowers',label:'花纹'}];
 document.querySelector('#app')!.innerHTML=`<main class="consumer-scene" aria-label="城市杯自由创作"><div id="glass-content"><div id="scene-background" class="scene-background" aria-hidden="true"></div><canvas id="viewport" tabindex="0" aria-label="单指旋转杯子，双指移动或缩放"></canvas></div><div class="consumer-actions"><button id="auto" aria-pressed="false">旋转</button><button id="reset">复位</button></div><nav class="view-rail" aria-label="观察视角">${views.map(v=>`<button data-view="${v.id}" aria-pressed="${v.id==='hero'}">${v.label}</button>`).join('')}</nav><div id="status" role="status" aria-live="polite"></div><div id="fatal" role="alert" hidden></div></main>`;
 const $=<T extends HTMLElement>(q:string)=>document.querySelector<T>(q)!;
 document.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(b=>b.onclick=()=>actions.view(b.dataset.view as View));
 $('#auto').onclick=actions.auto;$('#reset').onclick=actions.reset;
 let timer=0;
 function message(text:string,persistent=false){clearTimeout(timer);$('#status').textContent=text;$('#status').classList.add('visible');if(!persistent)timer=window.setTimeout(()=>$('#status').classList.remove('visible'),2600);}
 const keyboard=(e:KeyboardEvent)=>{if(e.key.toLowerCase()==='r'&&!(e.target instanceof HTMLInputElement))actions.reset();};document.addEventListener('keydown',keyboard);
 return {canvas:$<HTMLCanvasElement>('#viewport'),backgroundLayer:$('#scene-background'),closePanels(){},background(_state:BackgroundState){},backgroundError:message,message,
  style(_name:string){clearTimeout(timer);$('#status').classList.remove('visible');$('#status').textContent='';},
  update(view:View,auto:boolean){document.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===(view==='front'?'hero':view))));$('#auto').setAttribute('aria-pressed',String(auto));$('#auto').textContent=auto?'暂停':'旋转';},
  error(text:string){$('#fatal').hidden=false;$('#fatal').textContent=text;},dispose(){clearTimeout(timer);document.removeEventListener('keydown',keyboard);}};
}
