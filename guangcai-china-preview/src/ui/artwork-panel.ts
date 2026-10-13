import {variants,variantFor,finishes,selectTheme,type SelectionController,type Finish,type Lettering,type Theme} from '../styles/city-selection';
export function createArtworkPanel(controller:SelectionController,closeOtherPanels:()=>void){
 const main=document.querySelector('main')!;
 const toggle=document.createElement('button');toggle.disabled=true;toggle.id='open-artwork';toggle.className='open-artwork';toggle.textContent='主题与款式';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','artwork-settings');
 const panel=document.createElement('aside');panel.id='artwork-settings';panel.hidden=true;panel.setAttribute('aria-label','主题与款式');
 panel.innerHTML=`<div class="panel-heading"><h2>主题与款式</h2><button id="close-artwork">收起</button></div>
 <div class="theme-options" role="group" aria-label="选择主题"><button data-theme="china">中国</button><button data-theme="shenzhen">深圳</button></div>
 <div class="variant-grid" role="group" aria-label="选择配色款式"></div>
 <label class="field-label" for="artwork-finish">材质试看</label><select id="artwork-finish">${Object.entries(finishes).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select>
 <p id="finish-note" class="note"></p>
 <label class="field-label" for="artwork-text">文字</label><select id="artwork-text"><option value="auto">随款式</option><option value="name">主题名称</option><option value="he">和合共彩</option><option value="create">共创美好</option><option value="none">不显示</option></select>
 <p class="note">换款保留当前视角与背景。文字可独立关闭。</p>
 <p id="artwork-progress" role="status" aria-live="polite"></p><button id="default-artwork" class="text-button">恢复默认款 · 中国纯金</button>`;
 main.append(toggle,panel);
 const $=<T extends HTMLElement>(s:string)=>panel.querySelector<T>(s)!;
 const finish=$<HTMLSelectElement>('#artwork-finish'),text=$<HTMLSelectElement>('#artwork-text');
 let displayedTheme='',progress='';
 function setOpen(open:boolean){panel.hidden=!open;main.classList.toggle('artwork-open',open);toggle.setAttribute('aria-expanded',String(open));if(open){closeOtherPanels();render();$('#close-artwork').focus();}else toggle.focus();}
 toggle.onclick=()=>setOpen(panel.hidden);$('#close-artwork').onclick=()=>setOpen(false);
 const dismiss=()=>{panel.hidden=true;main.classList.remove('artwork-open');toggle.setAttribute('aria-expanded','false');};
 document.querySelector('#open-settings')!.addEventListener('click',dismiss);document.querySelector('#open-background')!.addEventListener('click',dismiss);
 const keyboard=(e:KeyboardEvent)=>{if(e.key==='Escape'&&!panel.hidden)setOpen(false);};document.addEventListener('keydown',keyboard);
 panel.querySelectorAll<HTMLButtonElement>('[data-theme]').forEach(b=>b.onclick=()=>{void controller.select(selectTheme(controller.desired,b.dataset.theme as Theme));});
 finish.onchange=()=>{void controller.select({finish:finish.value as Finish});};text.onchange=()=>{void controller.select({text:text.value as Lettering});};
 $('#default-artwork').onclick=()=>{void controller.restore();};
 function render(){
  const s=controller.desired,v=variantFor(s.variant);
  panel.setAttribute('aria-busy',String(controller.busy));
  if(!panel.hidden&&v.theme!==displayedTheme){displayedTheme=v.theme;
   $('.variant-grid').innerHTML=variants.filter(x=>x.theme===v.theme).map(x=>`<button class="variant-card" data-variant="${x.id}">${x.thumbnail?`<img alt="" loading="eager" src="${import.meta.env.BASE_URL}cities/v4/${x.thumbnail}">`:'<span class="gold-swatch" aria-hidden="true">金</span>'}<span>${x.name.split(' · ')[1]}</span></button>`).join('');
   panel.querySelectorAll<HTMLButtonElement>('[data-variant]').forEach(b=>b.onclick=()=>{void controller.select({variant:b.dataset.variant!,finish:'enamel'});});
  }
  panel.querySelectorAll<HTMLElement>('[data-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===v.theme)));
  panel.querySelectorAll<HTMLElement>('[data-variant]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.variant===s.variant)));
  finish.value=s.finish;finish.disabled=s.variant==='china-gold';text.value=s.text;
  for(const option of text.options)option.hidden=v.theme==='china'&&['he','create'].includes(option.value);
  $('#finish-note').textContent=s.variant==='china-gold'?'原版纯金保留 3.0 材质。其他配色可比较三种材质。':s.finish==='enamel'?'釉彩填面与凸起描线独立反光。':s.finish==='metal'?'彩色图样呈现金属反射。':'柔和彩绘釉面，降低线条起伏与金属感。';
  $('#artwork-progress').textContent=controller.busy?`正在准备 ${v.name} · ${progress||'读取素材…'}`:controller.error||`当前：${variantFor(controller.current.variant).name}`;
  $('#artwork-progress').classList.toggle('error',!!controller.error);
  if(!controller.busy){progress='';document.querySelector('h1')!.textContent=variantFor(controller.current.variant).theme==='china'?'中国 · 共彩':'深圳 · 共彩';}
 }
 render();return {ready:()=>{toggle.disabled=false;},render,progress:(done:number,total:number)=>{progress=`${done} / ${total}`;render();},close:dismiss,dispose(){document.removeEventListener('keydown',keyboard);document.querySelector('#open-settings')?.removeEventListener('click',dismiss);document.querySelector('#open-background')?.removeEventListener('click',dismiss);panel.remove();toggle.remove();}};
}
