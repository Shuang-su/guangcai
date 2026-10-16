import {v6Themes,selectTheme,variantFor,type SelectionController,type Theme} from '../styles/city-selection';
import {palettes,presetAppearance,type Palette,type Appearance} from '../styles/city-appearance';
import {slogans,type Slogan} from '../styles/slogans';
import {colorAtPosition,colorPosition} from '../styles/xy-mapping';
import type {View} from '../interaction/views';
import {createXYPad} from './xy-pad';
import {createLightnessSlider} from './lightness-slider';
import {colorField,materialField} from './xy-pad-background';
import {haptics} from './haptics';
import {createLoopSelector} from './loop-selector';
import './consumer-panel.css';

const paletteOrder:Palette[]=['purple','red','gold','blue','green'];
const paletteNames={purple:'焕新紫',red:'繁盛红',gold:'同心金',blue:'开放蓝',green:'共融绿'};
const menus=['city','color','material','slogan'] as const,typeNames=['城市','色彩','质感','祝福语'];
type Menu=typeof menus[number];
export function createConsumerPanel(controller:SelectionController,onView:(view:View)=>void){
 const panel=document.createElement('aside');panel.id='artwork-settings';panel.className='creator-panel camera-creator';panel.dataset.pane='city';panel.dataset.level='overview';panel.setAttribute('aria-label','城市与创作');
 panel.innerHTML=`<div class="creator-glass" aria-hidden="true"></div><button class="panel-handle" aria-label="收起创作面板" aria-expanded="true"><span class="handle-glass lg-surface" data-glass-interactive></span></button><div class="creator-tabs loop-menu lg-surface" role="tablist" aria-label="创作选项，左右循环切换"><div class="creator-indicator" aria-hidden="true"></div>${menus.map((id,i)=>`<button role="tab" id="${id}-tab" data-pane="${id}" aria-controls="${id}-pane" aria-selected="${i===0}">${typeNames[i]}</button>`).join('')}</div>
 <div class="creator-content"><div id="city-pane" role="tabpanel" aria-labelledby="city-tab"><div class="city-cards" role="group" aria-label="选择城市">${Object.entries(v6Themes).map(([id,t])=>`<button class="city-card" data-theme="${id}"><span>${t.name}</span><img alt="" loading="${id==='v6-shenzhen'?'eager':'lazy'}" src="/cities/v6/${id.slice(3)}-choice.webp"></button>`).join('')}</div></div>
 <div id="color-pane" role="tabpanel" aria-labelledby="color-tab" hidden><div class="palette-overview"><div class="palette-viewport"><div class="palette-loop" role="group" aria-label="五种配色，左右循环切换">${paletteOrder.map(p=>`<button class="palette-tile" data-palette="${p}" aria-label="${paletteNames[p]}"><span class="palette-swatch" style="background:linear-gradient(155deg,${palettes[p].light},${palettes[p].dark})"></span><span>${paletteNames[p]}</span></button>`).join('')}</div></div><button class="open-palette-editor lg-surface" aria-label="自定义配色"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M4 7h8m4 0h4M4 17h3m4 0h9"/><circle cx="14" cy="7" r="2"/><circle cx="9" cy="17" r="2"/></svg><span>自定义</span></button></div>
 <div class="color-editor" hidden><div class="editor-toolbar"><button id="palette-back" class="icon-control" aria-label="返回配色预设"><img src="/icons/chevron-left.svg" alt=""></button><button id="reset-palette" class="icon-control" aria-label="恢复当前配色预设"><img src="/icons/arrow-path.svg" alt=""></button></div><div id="creation-controls"><div class="pad-stage editor-pad-transition"><div class="color-pad-row"><div class="pad-mount"></div><div class="lightness-control"><input id="fill-lightness" type="range" min="20" max="65" step="1" aria-label="明度" aria-orientation="vertical"></div></div></div></div></div></div>
 <div id="material-pane" role="tabpanel" aria-labelledby="material-tab" hidden><div class="material-toolbar"><button id="reset-material" class="icon-control" aria-label="恢复当前质感"><img src="/icons/arrow-path.svg" alt=""></button></div><div class="pad-stage material-pad-stage"><div class="pad-mount"></div></div></div>
 <div id="slogan-pane" role="tabpanel" aria-labelledby="slogan-tab" hidden><div class="slogan-grid" role="group" aria-label="选择祝福语">${Object.entries(slogans).map(([id,t])=>`<button class="lg-surface" data-slogan="${id}">${t}</button>`).join('')}</div></div></div><p id="artwork-progress" class="sr-only" role="status" aria-live="polite"></p>`;
 panel.append(panel.querySelector('.creator-tabs')!);
 document.querySelector('main')!.append(panel);
 const $=<T extends HTMLElement>(q:string)=>panel.querySelector<T>(q)!;
 let pane:Menu='city',editor=false,collapsed=false,pending:Appearance|undefined,frame=0,fromInput=false,observed:Appearance|undefined,transition=0,restoringFrame=0;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');const detach:Array<()=>void>=[];let motion:Animation[]=[],layoutMotion:Animation|undefined;
 const stopLayout=()=>{layoutMotion?.cancel();layoutMotion=undefined;panel.classList.remove('is-resizing');};
 const layoutTo=(from:DOMRect)=>{stopLayout();const to=panel.getBoundingClientRect();if(reduce.matches||Math.abs(from.height-to.height)+Math.abs(from.width-to.width)<1)return;panel.classList.add('is-resizing');const a=panel.animate([{height:from.height+'px',width:from.width+'px'},{height:to.height+'px',width:to.width+'px'}],{duration:420,easing:'cubic-bezier(.22,.82,.22,1)',fill:'both'});layoutMotion=a;void a.finished.then(()=>{if(layoutMotion===a){stopLayout();refresh();}},()=>{});};
 const panelHeight=()=>panel.getBoundingClientRect();
 const syncCollapsed=()=>{panel.dataset.collapsed=String(collapsed);$('.panel-handle').hidden=collapsed;$('.creator-content').hidden=collapsed;$('.creator-content').inert=collapsed;$('.panel-handle').setAttribute('aria-expanded',String(!collapsed));$('.panel-handle').setAttribute('aria-label',collapsed?'展开创作面板':'收起创作面板');};
 const finishMotion=()=>{++transition;motion.forEach(a=>a.cancel());motion=[];};
 const cancelPending=()=>{cancelAnimationFrame(restoringFrame);restoringFrame=0;delete panel.dataset.restoring;cancelAnimationFrame(frame);frame=0;pending=undefined;colorPad.cancel();materialPad.cancel();lightness.cancel();};
 const beginInput=()=>{finishMotion();stopLayout();cancelPending();};
 const flush=()=>{cancelAnimationFrame(frame);frame=0;const a=pending;pending=undefined;if(a){fromInput=true;try{void controller.select({appearance:a});}finally{fromInput=false;}}};
 const edit=(patch:Partial<Appearance>)=>{const a=pending??controller.desired.appearance;if(a){pending={...a,...patch};if(!frame)frame=requestAnimationFrame(flush);}};
 const cancelled=()=>{cancelPending();render();};
 const colorPad=createXYPad({id:'color-pad',label:'调整颜色',onStart:beginInput,onInput:p=>{const a=pending??controller.desired.appearance;if(a)edit(colorAtPosition(p,a.hue));},onCommit:flush,onCancel:cancelled});
 const materialPad=createXYPad({id:'material-pad',label:'调整质感',onStart:beginInput,onInput:p=>edit({materialX:p.x,material:p.y}),onCommit:flush,onCancel:cancelled});
 const lightness=createLightnessSlider($('.lightness-control'),{onStart:beginInput,onInput:lightness=>edit({lightness}),onCommit:flush,onCancel:cancelled});
 $('.color-pad-row .pad-mount').append(colorPad.element);$('#material-pane .pad-mount').append(materialPad.element);
 const menuButtons=[...panel.querySelectorAll<HTMLButtonElement>('.creator-tabs [role=tab]')],tiles=[...panel.querySelectorAll<HTMLButtonElement>('[data-palette]')];
 const menuLoop=createLoopSelector($('.creator-tabs'),menuButtons,{initial:0,onSelect:i=>show(menus[i]),onActivate:()=>setCollapsed(!collapsed)});
 const paletteLoop=createLoopSelector($('.palette-loop'),tiles,{initial:2,palette:true,visibleSlots:5,wrapCopies:true,onSelect:i=>{cancelPending();const theme=variantFor(controller.desired.variant).theme;void controller.select({variant:`${theme}-${paletteOrder[i]}`});},onActivate:()=>openEditor()});
 const cityButtons=[...panel.querySelectorAll<HTMLButtonElement>('[data-theme]')],cityIds=Object.keys(v6Themes);
 const cityLoop=createLoopSelector($('.city-cards'),cityButtons,{initial:cityIds.indexOf('v6-shenzhen'),palette:true,visibleSlots:4,peek:true,onSelect:i=>{cancelPending();void controller.select(selectTheme(controller.desired,cityIds[i] as Theme));}});
 function refresh(){menuLoop.refresh();paletteLoop.refresh();cityLoop.refresh();colorPad.refresh();materialPad.refresh();lightness.refresh();}
 function show(next:Menu){
  const height=panelHeight();finishMotion();stopLayout();cancelPending();const token=transition,content=$('.creator-content');
  const reveal=()=>{
   if(token!==transition)return;editor=false;collapsed=false;pane=next;panel.dataset.pane=next;panel.dataset.level='overview';syncCollapsed();$('.creator-tabs').hidden=false;$('.palette-overview').hidden=false;$('.color-editor').hidden=true;
   for(const name of menus){const e=$('#'+name+'-pane');e.hidden=name!==next;e.inert=e.hidden;}
   // City height depends on the now-visible strip width. Measure it before
   // fixing the shell's animation target, not after the animation has begun.
   if(next==='city')onView('hero');if(next==='slogan')onView('front');render();refresh();layoutTo(height);
   if(!reduce.matches)motion.push(content.animate([{opacity:0,filter:'blur(7px)',transform:'translateY(5px) scale(.96)'},{opacity:1,filter:'blur(0px)',transform:'none'}],{duration:290,easing:'cubic-bezier(.2,.75,.2,1)'}));
  };
  if(reduce.matches||collapsed){reveal();return;}
  content.inert=true;const exit=content.animate([{opacity:1,filter:'blur(0px)',transform:'none'},{opacity:0,filter:'blur(6px)',transform:'scale(.97)'}],{duration:110,easing:'ease-in',fill:'both'});motion.push(exit);void exit.finished.then(()=>{exit.cancel();reveal();},()=>{});
 }
 function setCollapsed(value:boolean){
  if(editor){back();}const height=panelHeight();finishMotion();stopLayout();cancelPending();collapsed=value;syncCollapsed();layoutTo(height);refresh();
 }
 function openEditor(){
  if(editor)return;const height=panelHeight();finishMotion();stopLayout();cancelPending();const source=tiles[paletteLoop.selected()].querySelector('.palette-swatch')!.getBoundingClientRect();
  editor=true;collapsed=false;syncCollapsed();panel.dataset.level='editor';$('.creator-tabs').hidden=true;$('.palette-overview').hidden=true;$('.color-editor').hidden=false;render();refresh();layoutTo(height);
  if(!reduce.matches){
   const node=$('.color-pad-row .pad-mount'),target=node.getBoundingClientRect(),scale=source.width/target.width;
   const animation=node.animate([{transform:`translate(${source.x-target.x}px,${source.y-target.y}px) scale(${scale})`,opacity:.15,filter:'blur(5px)'},{transform:'scale(1.025)',opacity:1,filter:'blur(0px)',offset:.78},{transform:'none',opacity:1,filter:'blur(0px)'}],{duration:460,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});motion.push(animation);
   motion.push($('.lightness-control').animate([{opacity:0,transform:'translateX(-8px) scale(.6)',filter:'blur(3px)'},{opacity:1,transform:'none',filter:'blur(0px)'}],{duration:460,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'}));
   motion.push($('.editor-toolbar').animate([{opacity:0},{opacity:1}],{duration:220,delay:80,fill:'backwards'}));
   const token=transition;void animation.finished.then(()=>{if(token===transition){animation.cancel();refresh();}},()=>{});
  }
 }
 function back(){
  if(!editor)return;const height=panelHeight();finishMotion();stopLayout();cancelPending();const source=colorPad.element.getBoundingClientRect();editor=false;panel.dataset.level='overview';$('.creator-tabs').hidden=false;$('.palette-overview').hidden=false;$('.color-editor').hidden=true;refresh();layoutTo(height);
  const tile=tiles[paletteLoop.selected()],swatch=tile.querySelector<HTMLElement>('.palette-swatch')!,target=swatch.getBoundingClientRect();
  if(!reduce.matches){const a=swatch.animate([{transform:`translate(${source.x-target.x}px,${source.y-target.y}px) scale(${source.width/target.width})`,opacity:.35,filter:'blur(4px)'},{transform:'none',opacity:1,filter:'blur(0px)'}],{duration:420,easing:'cubic-bezier(.22,.82,.22,1)'});motion.push(a);}
  tile.focus({preventScroll:true});
 }
 const handle=$<HTMLButtonElement>('.panel-handle');let handleDrag:{id:number;y:number}|undefined,handleSwiped=false;
 handle.onclick=()=>{if(handleSwiped){handleSwiped=false;return;}setCollapsed(!collapsed);};
 handle.onpointerdown=e=>{handleDrag={id:e.pointerId,y:e.clientY};handleSwiped=false;handle.setPointerCapture(e.pointerId);};
 handle.onpointerup=e=>{if(handleDrag?.id!==e.pointerId)return;const dy=e.clientY-handleDrag.y;handleDrag=undefined;handle.releasePointerCapture(e.pointerId);if(Math.abs(dy)>16){handleSwiped=true;setCollapsed(dy>0);}};
 handle.onpointercancel=()=>{handleDrag=undefined;handleSwiped=false;};
 syncCollapsed();
 $('#palette-back').onclick=back;$('.open-palette-editor').onclick=openEditor;
 function restore(kind:'color'|'material',event:MouseEvent){
  haptics.pulse(event,12);cancelPending();const a=controller.desired.appearance;if(!a)return;const preset=presetAppearance(a.preset),target=kind==='color'?preset:{...a,material:preset.material,materialX:preset.materialX};
  if(reduce.matches){void controller.select({appearance:target});return;}
  const icon=$(kind==='color'?'#reset-palette img':'#reset-material img');icon.getAnimations().forEach(animation=>animation.cancel());icon.animate([{transform:'rotate(-180deg)'},{transform:'rotate(0deg)'}],{duration:420,easing:'ease-out'});
  const started=performance.now(),hueDelta=((target.hue-a.hue+540)%360)-180;panel.dataset.restoring='true';
  const tick=(now:number)=>{const t=Math.min(1,(now-started)/420),ease=1-(1-t)**3,next:Appearance={...target,hue:(a.hue+hueDelta*ease+360)%360};
   for(const key of ['saturation','lightness','material','materialX','relief'] as const)next[key]=(a[key]??.5)+((target[key]??.5)-(a[key]??.5))*ease;
   fromInput=true;try{void controller.select({appearance:t===1?target:next});}finally{fromInput=false;}
   if(t<1)restoringFrame=requestAnimationFrame(tick);else{restoringFrame=0;delete panel.dataset.restoring;}
  };restoringFrame=requestAnimationFrame(tick);
 }
 $('#reset-palette').onclick=e=>restore('color',e);$('#reset-material').onclick=e=>restore('material',e);
 panel.querySelectorAll<HTMLButtonElement>('[data-slogan]').forEach(b=>b.onclick=()=>{cancelPending();void controller.select({text:b.dataset.slogan as Slogan});});
 // Keep the original drag haptic nodes; these are discrete navigation buttons.
 const clickControls=[...menuButtons,...tiles,...panel.querySelectorAll<HTMLButtonElement>('[data-palette-copy]'),...cityButtons,...panel.querySelectorAll<HTMLButtonElement>('[data-slogan],.panel-handle,.open-palette-editor,#palette-back')];
 for(const button of clickControls){const action=button.onclick;button.onclick=function(event){haptics.pulse(event,8);return action?.call(this,event);};detach.push(haptics.attachButton(button));}
 for(const id of ['reset-palette','reset-material'])detach.push(haptics.attachButton($<HTMLButtonElement>('#'+id)));
 const keyboard=(event:KeyboardEvent)=>{if(event.key==='Escape'&&editor){event.preventDefault();back();}};document.addEventListener('keydown',keyboard);
 function render(){
  const s=controller.desired,a=s.appearance;if(!a)return;
  if(observed!==a&&!fromInput)cancelPending();observed=a;
  const theme=variantFor(s.variant).theme;cityLoop.set(cityIds.indexOf(theme));panel.setAttribute('aria-busy',String(controller.busy));
  panel.querySelectorAll<HTMLElement>('[data-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===theme)));
  panel.querySelectorAll<HTMLElement>('[data-slogan]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.slogan===s.text)));
  paletteLoop.set(paletteOrder.indexOf(a.preset));
  const original=presetAppearance(a.preset);colorPad.setValue(colorPosition(a.hue,a.saturation));colorPad.setReference(colorPosition(original.hue,original.saturation));materialPad.setValue({x:a.materialX??.5,y:a.material});materialPad.setReference({x:original.materialX??.5,y:original.material});lightness.setValue(a.lightness,a.hue,a.saturation,original.lightness);
  colorPad.setBackground(String(a.lightness),colorField(a.lightness));materialPad.setBackground([a.hue,a.saturation,a.lightness].join(','),materialField(a));
  $('#artwork-progress').textContent=controller.busy?'正在准备图样':controller.error;
 }
 render();return {ready(){panel.inert=false;refresh();},render,progress(){render();},close:back,dispose(){finishMotion();stopLayout();cancelPending();cityLoop.dispose();menuLoop.dispose();paletteLoop.dispose();colorPad.dispose();materialPad.dispose();lightness.dispose();detach.forEach(f=>f());document.removeEventListener('keydown',keyboard);panel.remove();}};
}
