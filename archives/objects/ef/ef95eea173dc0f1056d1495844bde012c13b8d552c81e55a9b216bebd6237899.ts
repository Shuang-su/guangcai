import {viewLabels,type View} from '../interaction/views';
import type {BackgroundChoice,BackgroundState} from './background';
export interface Actions{view:(v:View)=>void;auto:()=>void;reset:()=>void;relief:(v:number)=>void;fixedRelief:(v:boolean)=>void;metal:(v:boolean)=>void;mode:(v:string)=>void;reflection:(v:boolean)=>void;restore:()=>Promise<void>;background:(choice:BackgroundChoice)=>Promise<void>;uploadBackground:(file:File)=>Promise<void>;}
export function createInterface(actions:Actions){
 document.querySelector<HTMLDivElement>('#app')!.innerHTML=`<main aria-label="中国杯 4.2 三维预览">
 <div id="scene-background" class="scene-background" aria-hidden="true"></div>
 <canvas id="viewport" tabindex="0" aria-label="左键或单指旋转中国杯，右键或双指拖移，滚轮或双指捏合缩放"></canvas>
 <header><div><h1>中国 · 共彩</h1><p>4.2 · 城市主题与釉彩</p></div><div class="top-actions"><a class="standards-top" href="./evidence.html">素材与对照</a><button id="auto" aria-pressed="false">自动旋转</button><button id="reset">复位</button></div></header>
 <button id="open-settings" class="open-settings" aria-expanded="false" aria-controls="settings">材质校准</button>
 <button id="open-background" class="open-background" aria-expanded="false" aria-controls="background-settings">背景</button>
 <aside id="background-settings" hidden aria-label="背景设置"><div class="panel-heading"><h2>背景</h2><button id="close-background">关闭</button></div>
 <div class="background-choices" role="group" aria-label="选择预览背景"><button data-background-choice="auto" aria-pressed="true">自动<span>手机柔光 3.0 · 桌面灰底</span></button><button data-background-choice="soft-v3" aria-pressed="false">柔光背景 3.0</button><button data-background-choice="soft" aria-pressed="false">柔光背景 · 原版</button><button data-background-choice="gray" aria-pressed="false">灰色背景</button><button data-background-choice="custom" aria-pressed="false" hidden>已选图片</button></div>
 <button id="choose-background" class="file-button">选择背景图片</button><input id="background-file" type="file" accept="image/jpeg,image/png,image/webp" hidden aria-label="选择本地背景图片">
 <p class="note">JPG、PNG、WebP，最大 20 MB。图片居中铺满，只在当前浏览器预览，刷新后恢复自动背景。</p><p id="background-status" class="note" role="status" aria-live="polite"></p>
 </aside>
 <aside id="settings" hidden aria-label="材质校准"><div class="panel-heading"><h2>材质校准</h2><button id="close-settings">关闭</button></div>
 <section><label class="field-label" for="relief">城市线条凹凸</label><select id="relief"><option value="1">凸纹 · 当前预览</option><option value="0">关闭凹凸</option><option value="-1">凹纹 · 对照</option></select><p class="note">仅改变城市线条的表面起伏。实际凹凸方向和高度仍待工艺确认。</p><label class="check-label"><input id="city-metal" type="checkbox" checked> 城市金属反射</label><label class="check-label"><input id="local-reflections" type="checkbox" checked> 邻近部件反射</label></section>
 <section><label class="check-label"><input id="fixed-relief" type="checkbox" checked> 彩色花纹浅起伏</label><p class="note">杯碟、把手与纵向饰带的花瓣描线和叶脉。选“花纹近看”，开关比较。</p></section>
 <section><label class="field-label" for="material-mode">观察方式</label><select id="material-mode"><option value="pbr">完整材质</option><option value="clay">中性灰 · 检查器型</option><option value="relief">中性灰 · 检查线条</option><option value="floral">中性灰 · 检查花纹</option><option value="metalness">金属覆盖区域</option></select><p class="note">关闭金属后仍保留线条起伏；金色底面没有整体位移。</p></section>
 <section><h3>当前素材</h3><p id="style-name" class="current-style">中国 · 临时线稿</p><p class="note">中国建筑沿用 PSD 定位，深圳采用统一预览母稿。把手、纵向饰带和杯碟花纹固定。</p><button id="restore" class="text-button">恢复默认款</button></section>
 <p class="provenance">广彩纹样采用提供的原始花纸。凹凸为贴图视觉近似，不代表实测高度。城市图样与点缀为依据参考制作的可修订预览。</p>
 </aside><footer><p class="gesture-hint">左键 / 单指旋转 · 右键 / 双指拖移 · 滚轮 / 捏合缩放</p><nav aria-label="观察视角">${Object.entries(viewLabels).map(([key,label])=>`<button data-view="${key}" aria-pressed="${key==='hero'}">${label}</button>`).join('')}</nav></footer>
 <div id="status" role="status" aria-live="polite"></div><div id="fatal" hidden role="alert"></div></main>`;
 const $=<T extends HTMLElement>(s:string)=>document.querySelector<T>(s)!;
 const panel=$('#settings'),toggle=$('#open-settings'),backgroundPanel=$('#background-settings'),backgroundToggle=$('#open-background');
 const setBackgroundPanel=(open:boolean)=>{backgroundPanel.hidden=!open;backgroundToggle.setAttribute('aria-expanded',String(open));if(open){setPanel(false);$('#close-background').focus();}};
 const setPanel=(open:boolean)=>{panel.hidden=!open;toggle.setAttribute('aria-expanded',String(open));if(open){setBackgroundPanel(false);$('#close-settings').focus();}};
 toggle.onclick=()=>setPanel(panel.hidden);$('#close-settings').onclick=()=>setPanel(false);
 backgroundToggle.onclick=()=>setBackgroundPanel(backgroundPanel.hidden);$('#close-background').onclick=()=>{setBackgroundPanel(false);backgroundToggle.focus();};
 const keydown=(e:KeyboardEvent)=>{if(e.key==='Escape'){if(!backgroundPanel.hidden){setBackgroundPanel(false);backgroundToggle.focus();}else if(!panel.hidden){setPanel(false);toggle.focus();}}if(e.target instanceof HTMLInputElement||e.target instanceof HTMLSelectElement)return;if(e.key.toLowerCase()==='r')actions.reset();};
 document.addEventListener('keydown',keydown);
 const backgroundError=(text:string)=>{$('#background-status').textContent=text;$('#background-status').classList.add('error');};
 document.querySelectorAll<HTMLButtonElement>('[data-background-choice]').forEach(b=>b.onclick=async()=>{try{await actions.background(b.dataset.backgroundChoice as BackgroundChoice);}catch(e){backgroundError((e as Error).message);}});
 const backgroundFile=$<HTMLInputElement>('#background-file');$('#choose-background').onclick=()=>backgroundFile.click();
 backgroundFile.onchange=async()=>{const file=backgroundFile.files?.[0];backgroundFile.value='';if(!file)return;try{await actions.uploadBackground(file);}catch(e){backgroundError((e as Error).message);}};
 document.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(b=>b.onclick=()=>actions.view(b.dataset.view as View));
 $('#auto').onclick=actions.auto;$('#reset').onclick=actions.reset;
 $<HTMLSelectElement>('#relief').onchange=e=>actions.relief(+(e.target as HTMLSelectElement).value);
 $<HTMLInputElement>('#fixed-relief').onchange=e=>actions.fixedRelief((e.target as HTMLInputElement).checked);
 $<HTMLInputElement>('#city-metal').onchange=e=>actions.metal((e.target as HTMLInputElement).checked);
 $<HTMLSelectElement>('#material-mode').onchange=e=>actions.mode((e.target as HTMLSelectElement).value);
 $<HTMLInputElement>('#local-reflections').onchange=e=>actions.reflection((e.target as HTMLInputElement).checked);
 $('#restore').onclick=async()=>{try{message('正在恢复…',true);await actions.restore();}catch(e){message((e as Error).message,true);}};
 let timer=0;
 function message(text:string,persistent=false){clearTimeout(timer);$('#status').textContent=text;$('#status').classList.add('visible');if(!persistent)timer=window.setTimeout(()=>$('#status').classList.remove('visible'),3500);}
 return {closePanels(){setPanel(false);setBackgroundPanel(false);},canvas:$<HTMLCanvasElement>('#viewport'),backgroundLayer:$('#scene-background'),backgroundError,background(state:BackgroundState){document.querySelectorAll<HTMLButtonElement>('[data-background-choice]').forEach(b=>{b.setAttribute('aria-pressed',String(state.choice===b.dataset.backgroundChoice));if(b.dataset.backgroundChoice==='custom')b.hidden=!state.hasCustom;});backgroundPanel.setAttribute('aria-busy',String(state.busy));$('#background-status').classList.remove('error');$('#background-status').textContent=state.busy?'正在准备背景…':`当前：${{gray:'灰色背景',soft:'柔光背景 · 原版','soft-v3':'柔光背景 3.0',custom:'已选图片'}[state.active]}`;},message,style(name:string){$('#style-name').textContent=name;message(`已载入 · ${name}`);},update(view:View,auto:boolean){document.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===view)));$('#auto').setAttribute('aria-pressed',String(auto));$('#auto').textContent=auto?'暂停旋转':'自动旋转';},error(text:string){$('#fatal').hidden=false;$('#fatal').textContent=text;},dispose(){document.removeEventListener('keydown',keydown);clearTimeout(timer);}};
}
