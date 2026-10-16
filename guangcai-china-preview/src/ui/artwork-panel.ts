import {variants,variantFor,finishes,selectTheme,themes,themeFor,isFixedGold,isPilot,type SelectionController,type Finish,type Lettering,type Theme} from '../styles/city-selection';
import {palettes,presetAppearance,type Appearance,type Palette} from '../styles/city-appearance';
import {colorAtPosition,colorPosition} from '../styles/xy-mapping';
import {createXYPad} from './xy-pad';
import {colorField,materialField} from './xy-pad-background';

export function createArtworkPanel(controller:SelectionController,closeOtherPanels:()=>void){
 const main=document.querySelector('main')!;
 const toggle=document.createElement('button');toggle.disabled=true;toggle.id='open-artwork';toggle.className='open-artwork';toggle.textContent='城市与创作';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','artwork-settings');
 const panel=document.createElement('aside');panel.id='artwork-settings';panel.hidden=true;panel.setAttribute('aria-label','城市与创作');
 panel.innerHTML=`<div class="panel-heading"><h2>城市与创作</h2><button id="close-artwork">收起</button></div>
 <details class="city-selector"><summary>城市 <strong id="current-city"></strong></summary><div class="theme-options" role="group" aria-label="选择城市">${Object.entries(themes).map(([id,t])=>`<button data-theme="${id}">${t.name}</button>`).join('')}</div></details>
 <p class="field-label palette-heading">配色预设</p><div class="variant-grid" role="group" aria-label="选择配色预设"></div>
 <div id="creation-controls">
 <div class="adjust-tabs" role="tablist" aria-label="选择调整内容"><button id="adjust-color-tab" role="tab" aria-controls="adjust-color-panel" aria-selected="true">颜色</button><button id="adjust-material-tab" role="tab" aria-controls="adjust-material-panel" aria-selected="false" tabindex="-1">材质</button></div>
 <div id="adjust-color-panel" role="tabpanel" aria-labelledby="adjust-color-tab"><div class="color-pad-row"><div class="pad-mount"></div><label class="lightness-control" for="fill-lightness"><span>明度</span><input id="fill-lightness" type="range" min="0" max="100" step="1" aria-orientation="vertical"><output id="fill-lightness-value" for="fill-lightness"></output></label></div><p class="pad-hint">拖动选色 · 右侧调整明暗</p></div>
 <div id="adjust-material-panel" role="tabpanel" aria-labelledby="adjust-material-tab" hidden><div class="pad-mount"></div><p class="pad-hint">拖动调整质感 · 金线保持不变</p></div>
 <button id="reset-palette" class="text-button">恢复当前配色预设</button>
 </div>
 <div id="legacy-finish"><label class="field-label" for="artwork-finish">材质</label><select id="artwork-finish">${Object.entries(finishes).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select><p id="finish-note" class="note"></p></div>
 <label class="field-label" for="artwork-text">文字</label><select id="artwork-text"><option value="auto">随款式</option><option value="name">城市名称</option><option value="he">和合共彩</option><option value="create">共创美好</option><option value="none">不显示</option></select>
 <p class="note">切换城市保留当前创作。选择配色预设可重新开始。</p>
 <p id="artwork-progress" role="status" aria-live="polite"></p><button id="default-artwork" class="text-button">恢复默认款 · 中国纯金</button>`;
 main.append(toggle,panel);
 const $=<T extends HTMLElement>(s:string)=>panel.querySelector<T>(s)!;
 const finish=$<HTMLSelectElement>('#artwork-finish'),text=$<HTMLSelectElement>('#artwork-text');
 const citySelector=$<HTMLDetailsElement>('.city-selector'),mobile=matchMedia('(max-width:520px)');
 const responsive=()=>{if(mobile.matches)citySelector.open=false;};citySelector.open=false;mobile.addEventListener('change',responsive);
 let displayedTheme='',progress='',frame=0,pending:Appearance|undefined,selectedTab:'color'|'material'='color';
 let observedAppearance:Appearance|undefined,fromPad=false;
 function flush(){
  cancelAnimationFrame(frame);frame=0;const appearance=pending;pending=undefined;
  if(appearance){fromPad=true;try{void controller.select({appearance});}finally{fromPad=false;}}
 }
 const edit=(patch:Partial<Appearance>)=>{
  const a=pending??controller.desired.appearance;if(!a)return;
  pending={...a,...patch};if(!frame)frame=requestAnimationFrame(flush);
 };
 const cancelled=()=>{cancelPending();render();};
 const colorPad=createXYPad({id:'color-pad',label:'调整颜色',onInput:p=>{
  const a=pending??controller.desired.appearance;if(a)edit(colorAtPosition(p,a.hue));
 },onCommit:flush,onCancel:cancelled});
 const materialPad=createXYPad({id:'material-pad',label:'调整材质',onInput:p=>edit({materialX:p.x,material:p.y}),onCommit:flush,onCancel:cancelled});
 const lightness=$<HTMLInputElement>('#fill-lightness');
 lightness.onpointerdown=()=>cancelPending();lightness.oninput=()=>edit({lightness:Number(lightness.value)});
 lightness.onchange=flush;lightness.onpointercancel=cancelled;
 $('#adjust-color-panel .pad-mount').append(colorPad.element);$('#adjust-material-panel .pad-mount').append(materialPad.element);
 function cancelPending(){cancelAnimationFrame(frame);frame=0;pending=undefined;colorPad.cancel();materialPad.cancel();}
 function changeTab(tab:'color'|'material'){
  cancelPending();selectedTab=tab;
  for(const name of ['color','material'] as const){
   const active=name===tab,button=$('#adjust-'+name+'-tab');
   button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;
   $('#adjust-'+name+'-panel').hidden=!active;
  }
  render();(tab==='color'?colorPad:materialPad).refresh();
 }
 for(const name of ['color','material'] as const){
  const button=$('#adjust-'+name+'-tab');button.onclick=()=>changeTab(name);
  button.onkeydown=event=>{
   if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
   event.preventDefault();const tab=event.key==='Home'?'color':event.key==='End'?'material':selectedTab==='color'?'material':'color';
   changeTab(tab);$('#adjust-'+tab+'-tab').focus();
  };
 }
 function setOpen(open:boolean){
  cancelPending();panel.hidden=!open;main.classList.toggle('artwork-open',open);toggle.setAttribute('aria-expanded',String(open));
  if(open){closeOtherPanels();render();panel.scrollTop=0;$('#close-artwork').focus();colorPad.refresh();materialPad.refresh();}else toggle.focus();
 }
 toggle.onclick=()=>setOpen(panel.hidden);$('#close-artwork').onclick=()=>setOpen(false);
 const dismiss=()=>{cancelPending();panel.hidden=true;main.classList.remove('artwork-open');toggle.setAttribute('aria-expanded','false');};
 document.querySelector('#open-settings')!.addEventListener('click',dismiss);document.querySelector('#open-background')!.addEventListener('click',dismiss);
 const keyboard=(event:KeyboardEvent)=>{if(event.key==='Escape'&&!panel.hidden)setOpen(false);};document.addEventListener('keydown',keyboard);
 panel.querySelectorAll<HTMLButtonElement>('[data-theme]').forEach(button=>button.onclick=()=>{
  cancelPending();citySelector.open=false;
  void controller.select(selectTheme(controller.desired,button.dataset.theme as Theme));
 });
 finish.onchange=()=>{cancelPending();void controller.select({finish:finish.value as Finish});};
 text.onchange=()=>{cancelPending();void controller.select({text:text.value as Lettering});};
 $('#default-artwork').onclick=()=>{cancelPending();void controller.restore();};
 $('#reset-palette').onclick=()=>{cancelPending();const a=controller.desired.appearance;if(a)void controller.select({appearance:presetAppearance(a.preset)});};
 function render(){
  const s=controller.desired,v=variantFor(s.variant),pilot=isPilot(v.theme);
  // An external preset, API update or load failure invalidates a captured gesture.
  if(observedAppearance!==s.appearance&&!fromPad)cancelPending();
  observedAppearance=s.appearance;
  panel.setAttribute('aria-busy',String(controller.busy));$('#creation-controls').hidden=!pilot;$('#legacy-finish').hidden=pilot;
  $('#current-city').textContent=themeFor(v).name;
  if(v.theme!==displayedTheme){
   displayedTheme=v.theme;$('.variant-grid').classList.toggle('palette-grid',pilot);
   $('.variant-grid').innerHTML=variants.filter(x=>x.theme===v.theme).map(x=>{
    const p=pilot?palettes[x.id.slice(v.theme.length+1) as Palette]:null;
    return `<button class="variant-card" data-variant="${x.id}">${p?`<span class="palette-swatch" style="background:linear-gradient(145deg,${p.dark},${p.light})" aria-hidden="true"></span>`:x.thumbnail?`<img alt="" loading="lazy" src="${import.meta.env.BASE_URL}cities/v4/${x.thumbnail}">`:'<span class="gold-swatch" aria-hidden="true">金</span>'}<span>${x.name.split(' · ')[1]}</span></button>`;
   }).join('');
   panel.querySelectorAll<HTMLButtonElement>('[data-variant]').forEach(button=>button.onclick=()=>{
    cancelPending();void controller.select(pilot?{variant:button.dataset.variant!}:{variant:button.dataset.variant!,finish:'enamel'});
   });
  }
  panel.querySelectorAll<HTMLElement>('[data-theme]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.theme===v.theme)));
  panel.querySelectorAll<HTMLElement>('[data-variant]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.variant===s.variant)));
  finish.value=s.finish;finish.disabled=isFixedGold(v);text.value=s.text;
  for(const option of text.options)option.hidden=!themeFor(v).slogans&&['he','create'].includes(option.value);
  if(pilot&&s.appearance){
   const a=s.appearance;colorPad.setValue(colorPosition(a.hue,a.saturation));materialPad.setValue({x:a.materialX??.5,y:a.material});
   lightness.value=String(a.lightness);$('#fill-lightness-value').textContent=Math.round(a.lightness)+'%';
   lightness.style.setProperty('--lightness-color',`hsl(${a.hue} ${a.saturation}% 50%)`);
   colorPad.setBackground(String(a.lightness),colorField(a.lightness));
   materialPad.setBackground([a.hue,a.saturation,a.lightness].join(','),materialField(a));
  }
  $('#finish-note').textContent=isFixedGold(v)?'中国原版纯金保留原始材质。':'沿用已有中国图样与配色。';
  $('#artwork-progress').textContent=controller.busy?`正在准备 ${v.name}${progress?' · '+progress:''}`:controller.error||`当前：${variantFor(controller.current.variant).name}`;
  $('#artwork-progress').classList.toggle('error',!!controller.error);
  if(!controller.busy){progress='';document.querySelector('h1')!.textContent=themeFor(variantFor(controller.current.variant)).name+' · 共彩';}
 }
 render();return {ready:()=>{toggle.disabled=false;},render,progress:(done:number,total:number)=>{progress=`${done} / ${total}`;render();},close:dismiss,dispose(){
  cancelPending();colorPad.dispose();materialPad.dispose();mobile.removeEventListener('change',responsive);
  document.removeEventListener('keydown',keyboard);document.querySelector('#open-settings')?.removeEventListener('click',dismiss);document.querySelector('#open-background')?.removeEventListener('click',dismiss);panel.remove();toggle.remove();
 }};
}
