import type {Actions} from './interface';
import type {View} from '../interaction/views';
import type {BackgroundState} from './background';
import {haptics} from './haptics';
import './consumer.css';

const icon=(paths:string)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
const rotateIcon=icon('<path d="m12 2.5 5.5 3.2v6.4L12 15.3l-5.5-3.2V5.7Z"/><path d="m6.5 5.7 5.5 3.2 5.5-3.2M12 8.9v6.4"/><path d="M4.1 12.5C1 14.1 1.8 17 5.6 18.6c4 1.8 9.5 1.6 13.2-.4 2.6-1.5 3.1-3.7 1.3-5.2m0 0 .2 3m-.2-3-2.7 1"/>');
const pauseIcon=icon('<path d="M9 7v10M15 7v10"/>');
const resetIcon=icon('<path d="M4.5 8A8 8 0 1 1 4 16.5M4.5 3.5V8H9"/>');
const viewIcon=icon('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>');
export function createConsumerInterface(actions:Actions){
 const views:{id:View;label:string}[]=[{id:'exploded',label:'拆解'},{id:'lid',label:'杯盖'},{id:'hero',label:'杯碟'},{id:'saucerBottom',label:'碟底'},{id:'bottom',label:'杯底'},{id:'detail',label:'浮雕'},{id:'flowers',label:'花纹'}];
 document.querySelector('#app')!.innerHTML=`<main class="consumer-scene" aria-label="城市杯自由创作"><div id="glass-content"><div id="scene-background" class="scene-background" aria-hidden="true"></div><canvas id="viewport" tabindex="0" aria-label="单指旋转杯子，双指移动或缩放"></canvas></div><div class="consumer-actions" role="group" aria-label="杯子操作"><button id="auto" class="scene-icon lg-surface" aria-label="自动旋转" title="自动旋转" aria-pressed="false">${rotateIcon}</button><button id="reset" class="scene-icon lg-surface" aria-label="复位视角" title="复位视角">${resetIcon}</button></div><div class="view-picker"><button id="view-trigger" class="lg-surface" aria-haspopup="menu" aria-expanded="false" aria-controls="view-menu" aria-label="切换视角，当前杯碟">${viewIcon}<span>杯碟</span>${icon('<path d="m8 10 4 4 4-4"/>')}</button><nav id="view-menu" class="view-rail lg-surface lg-menu" role="menu" aria-label="观察视角" hidden>${views.map(v=>`<button data-view="${v.id}" role="menuitemradio" aria-checked="${v.id==='hero'}" aria-pressed="${v.id==='hero'}" tabindex="${v.id==='hero'?0:-1}"><span>${v.label}</span>${icon('<path d="m5 12 4 4L19 6"/>')}</button>`).join('')}</nav></div><div id="status" role="status" aria-live="polite"></div><div id="fatal" role="alert" hidden></div></main>`;
 const $=<T extends HTMLElement>(q:string)=>document.querySelector<T>(q)!;
 const trigger=$<HTMLButtonElement>('#view-trigger'),menu=$('#view-menu'),picker=$('.view-picker'),buttons=Array.from(menu.querySelectorAll<HTMLButtonElement>('[data-view]'));
 let timer=0,open=false,motion:Animation|undefined;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const onExited=()=>{if(!open){menu.hidden=true;menu.dataset.closed='';}};menu.addEventListener('glass:exited',onExited);
 function setOpen(next:boolean,focus=false){
  motion?.cancel();motion=undefined;open=next;trigger.setAttribute('aria-expanded',String(open));menu.inert=!open;
  if(next){menu.hidden=false;delete menu.dataset.closed;delete menu.dataset.endingStyle;}
  // Original Glass-HQ resolves a joined drop from morphFrom and emits its
  // exit completion. Keep the DOM mounted until that spring returns home.
  if(!reduce.matches&&document.querySelector('.consumer-scene')?.getAttribute('data-glass-state')==='ready'){
   if(!next){if(menu.hasAttribute('data-lg-container'))menu.dataset.endingStyle='';else menu.hidden=true;}
  }else if(!reduce.matches){
   const a=menu.animate(next?[{opacity:0,transform:'translateY(-8px) scale(.85)'},{opacity:1,transform:'none'}]:[{opacity:1,transform:'none'},{opacity:0,transform:'translateY(-8px) scale(.85)'}],{duration:200,easing:'ease-out'});motion=a;void a.finished.then(()=>{if(motion===a){motion=undefined;if(!open)menu.hidden=true;}},()=>{});
  }else menu.hidden=!next;
  if(focus)(next?buttons.find(b=>b.getAttribute('aria-checked')==='true')??buttons[0]:trigger).focus();
 }

 trigger.onclick=e=>setOpen(!open,e.detail===0);
 for(const button of buttons)button.onclick=()=>{actions.view(button.dataset.view as View);setOpen(false,true);};
 $('#auto').onclick=actions.auto;$('#reset').onclick=()=>{actions.reset();setOpen(false);};
 const detach=[trigger,...buttons,$<HTMLButtonElement>('#auto'),$<HTMLButtonElement>('#reset')].map(button=>{const action=button.onclick;button.onclick=function(e){haptics.pulse(e,8);return action?.call(this,e);};return haptics.attachButton(button);});
 const outside=(e:PointerEvent)=>{if(open&&!picker.contains(e.target as Node))setOpen(false);};document.addEventListener('pointerdown',outside);
 const menuKeys=(e:KeyboardEvent)=>{const index=buttons.indexOf(document.activeElement as HTMLButtonElement);if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:(index+(e.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;buttons[next].focus();}};menu.addEventListener('keydown',menuKeys);
 function message(text:string,persistent=false){clearTimeout(timer);$('#status').textContent=text;$('#status').classList.add('visible');if(!persistent)timer=window.setTimeout(()=>$('#status').classList.remove('visible'),2600);}
 const keyboard=(e:KeyboardEvent)=>{if(e.key==='Escape'&&open){e.preventDefault();e.stopImmediatePropagation();setOpen(false,true);}else if(e.key.toLowerCase()==='r'&&!(e.target instanceof HTMLInputElement))actions.reset();};document.addEventListener('keydown',keyboard,true);
 return {canvas:$<HTMLCanvasElement>('#viewport'),backgroundLayer:$('#scene-background'),closePanels(){setOpen(false);},background(_state:BackgroundState){},backgroundError:message,message,
  style(_name:string){clearTimeout(timer);$('#status').classList.remove('visible');$('#status').textContent='';},
  update(view:View,auto:boolean){const active=view==='front'?'hero':view,label=views.find(v=>v.id===active)?.label??'杯碟';for(const b of buttons){const selected=b.dataset.view===active;b.setAttribute('aria-pressed',String(selected));b.setAttribute('aria-checked',String(selected));b.tabIndex=selected?0:-1;}trigger.querySelector('span')!.textContent=label;trigger.setAttribute('aria-label',`切换视角，当前${label}`);$('#auto').setAttribute('aria-pressed',String(auto));const autoButton=$('#auto'),autoLabel=auto?'暂停旋转':'自动旋转';autoButton.setAttribute('aria-label',autoLabel);autoButton.title=autoLabel;const oldIcon=autoButton.querySelector('svg')!;oldIcon.outerHTML=auto?pauseIcon:rotateIcon;},
  error(text:string){$('#fatal').hidden=false;$('#fatal').textContent=text;},dispose(){clearTimeout(timer);motion?.cancel();detach.forEach(fn=>fn());document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',keyboard,true);menu.removeEventListener('keydown',menuKeys);menu.removeEventListener('glass:exited',onExited);}};
}
