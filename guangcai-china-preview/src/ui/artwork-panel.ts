import {variants,variantFor,finishes,selectTheme,themes,themeFor,isFixedGold,isPilot,type SelectionController,type Finish,type Lettering,type Theme} from '../styles/city-selection';
import {palettes,presetAppearance,type Appearance,type Palette} from '../styles/city-appearance';
export function createArtworkPanel(controller:SelectionController,closeOtherPanels:()=>void){
 const main=document.querySelector('main')!;
 const toggle=document.createElement('button');toggle.disabled=true;toggle.id='open-artwork';toggle.className='open-artwork';toggle.textContent='城市与创作';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','artwork-settings');
 const panel=document.createElement('aside');panel.id='artwork-settings';panel.hidden=true;panel.setAttribute('aria-label','城市与创作');
 const range=(id:string,label:string,min:number,max:number,step=1)=>`<label class="slider-label" for="${id}">${label}<output id="${id}-value" for="${id}"></output></label><input id="${id}" type="range" min="${min}" max="${max}" step="${step}">`;
 panel.innerHTML=`<div class="panel-heading"><h2>城市与创作</h2><button id="close-artwork">收起</button></div>
 <div class="theme-options" role="group" aria-label="选择城市">${Object.entries(themes).map(([id,t])=>`<button data-theme="${id}">${t.name}</button>`).join('')}</div>
 <p class="field-label palette-heading">配色预设</p><div class="variant-grid" role="group" aria-label="选择配色预设"></div>
 <div id="creation-controls">
 <div class="finish-endpoints" role="group" aria-label="材质快捷预设"><button id="finish-enamel">彩釉金线</button><span aria-hidden="true">↔</span><button id="finish-metal">彩色金属</button></div>
 ${range('material-blend','材质',0,100)}
 <p class="note">金线保持金色；滑动调整填面的质感。</p>
 <details class="color-controls" open><summary>整片颜色</summary>${range('fill-hue','色相',0,360)}${range('fill-saturation','饱和度',0,100)}${range('fill-lightness','明度',0,100)}</details>
 ${range('city-relief','线条浮雕',0,2,.05)}<button id="reset-palette" class="text-button">恢复当前配色预设</button>
 </div>
 <div id="legacy-finish"><label class="field-label" for="artwork-finish">材质</label><select id="artwork-finish">${Object.entries(finishes).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select><p id="finish-note" class="note"></p></div>
 <label class="field-label" for="artwork-text">文字</label><select id="artwork-text"><option value="auto">随款式</option><option value="name">城市名称</option><option value="he">和合共彩</option><option value="create">共创美好</option><option value="none">不显示</option></select>
 <p class="note">城市图样之间切换时保留创作参数。选择配色预设可重新开始。</p>
 <p id="artwork-progress" role="status" aria-live="polite"></p><button id="default-artwork" class="text-button">恢复默认款 · 中国纯金</button>`;
 main.append(toggle,panel);
 const $=<T extends HTMLElement>(s:string)=>panel.querySelector<T>(s)!;
 const finish=$<HTMLSelectElement>('#artwork-finish'),text=$<HTMLSelectElement>('#artwork-text');
 let displayedTheme='',progress='',frame=0,pending:Appearance|undefined;
 function setOpen(open:boolean){panel.hidden=!open;main.classList.toggle('artwork-open',open);toggle.setAttribute('aria-expanded',String(open));if(open){closeOtherPanels();render();$('#close-artwork').focus();}else toggle.focus();}
 toggle.onclick=()=>setOpen(panel.hidden);$('#close-artwork').onclick=()=>setOpen(false);
 const dismiss=()=>{panel.hidden=true;main.classList.remove('artwork-open');toggle.setAttribute('aria-expanded','false');};
 document.querySelector('#open-settings')!.addEventListener('click',dismiss);document.querySelector('#open-background')!.addEventListener('click',dismiss);
 const keyboard=(e:KeyboardEvent)=>{if(e.key==='Escape'&&!panel.hidden)setOpen(false);};document.addEventListener('keydown',keyboard);
 const cancelPending=()=>{cancelAnimationFrame(frame);frame=0;pending=undefined;};
 panel.querySelectorAll<HTMLButtonElement>('[data-theme]').forEach(b=>b.onclick=()=>{cancelPending();void controller.select(selectTheme(controller.desired,b.dataset.theme as Theme));});
 finish.onchange=()=>{void controller.select({finish:finish.value as Finish});};text.onchange=()=>{void controller.select({text:text.value as Lettering});};
 $('#default-artwork').onclick=()=>{cancelPending();void controller.restore();};
 const edit=(patch:Partial<Appearance>)=>{const a=pending??controller.desired.appearance;if(!a)return;pending={...a,...patch};if(!frame)frame=requestAnimationFrame(()=>{frame=0;const appearance=pending;pending=undefined;if(appearance)void controller.select({appearance});});};
 for(const [id,key]of [['fill-hue','hue'],['fill-saturation','saturation'],['fill-lightness','lightness'],['material-blend','material'],['city-relief','relief']] as const){
  $<HTMLInputElement>('#'+id).oninput=e=>{const value=+(e.target as HTMLInputElement).value;edit({[key]:id==='material-blend'?value/100:value});};
 }
 $('#finish-enamel').onclick=()=>edit({material:0});$('#finish-metal').onclick=()=>edit({material:1});
 $('#reset-palette').onclick=()=>{cancelPending();const a=controller.desired.appearance;if(a)void controller.select({appearance:presetAppearance(a.preset)});};
 function render(){
  const s=controller.desired,v=variantFor(s.variant),pilot=isPilot(v.theme);
  panel.setAttribute('aria-busy',String(controller.busy));$('#creation-controls').hidden=!pilot;$('#legacy-finish').hidden=pilot;
  if(v.theme!==displayedTheme){displayedTheme=v.theme;
   $('.variant-grid').classList.toggle('palette-grid',pilot);
   $('.variant-grid').innerHTML=variants.filter(x=>x.theme===v.theme).map(x=>{
    const p=pilot?palettes[x.id.slice(v.theme.length+1) as Palette]:null;
    return `<button class="variant-card" data-variant="${x.id}">${p?`<span class="palette-swatch" style="background:linear-gradient(145deg,${p.dark},${p.light})" aria-hidden="true"></span>`:x.thumbnail?`<img alt="" loading="lazy" src="${import.meta.env.BASE_URL}cities/v4/${x.thumbnail}">`:'<span class="gold-swatch" aria-hidden="true">金</span>'}<span>${x.name.split(' · ')[1]}</span></button>`;
   }).join('');
   panel.querySelectorAll<HTMLButtonElement>('[data-variant]').forEach(b=>b.onclick=()=>{cancelPending();void controller.select(pilot?{variant:b.dataset.variant!}:{variant:b.dataset.variant!,finish:'enamel'});});
  }
  panel.querySelectorAll<HTMLElement>('[data-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===v.theme)));
  panel.querySelectorAll<HTMLElement>('[data-variant]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.variant===s.variant)));
  finish.value=s.finish;finish.disabled=isFixedGold(v);text.value=s.text;
  for(const option of text.options)option.hidden=!themeFor(v).slogans&&['he','create'].includes(option.value);
  if(pilot&&s.appearance){const a=s.appearance;
   for(const [id,value,suffix]of [['fill-hue',a.hue,'°'],['fill-saturation',a.saturation,'%'],['fill-lightness',a.lightness,'%'],['material-blend',a.material*100,'%'],['city-relief',a.relief,'×']] as const){
    $<HTMLInputElement>('#'+id).value=String(value);$('#'+id+'-value').textContent=(id==='city-relief'?value.toFixed(2):Math.round(value))+suffix;
   }
   $('#finish-enamel').setAttribute('aria-pressed',String(a.material===0));$('#finish-metal').setAttribute('aria-pressed',String(a.material===1));
  }
  $('#finish-note').textContent=isFixedGold(v)?'中国原版纯金保留原始材质。':'沿用已有中国图样与配色。';
  $('#artwork-progress').textContent=controller.busy?`正在准备 ${v.name}${progress?' · '+progress:''}`:controller.error||`当前：${variantFor(controller.current.variant).name}`;
  $('#artwork-progress').classList.toggle('error',!!controller.error);
  if(!controller.busy){progress='';document.querySelector('h1')!.textContent=themeFor(variantFor(controller.current.variant)).name+' · 共彩';}
 }
 render();return {ready:()=>{toggle.disabled=false;},render,progress:(done:number,total:number)=>{progress=`${done} / ${total}`;render();},close:dismiss,dispose(){cancelPending();document.removeEventListener('keydown',keyboard);document.querySelector('#open-settings')?.removeEventListener('click',dismiss);document.querySelector('#open-background')?.removeEventListener('click',dismiss);panel.remove();toggle.remove();}};
}
