import {viewLabels,type View} from '../interaction/views';
export interface Actions{view:(v:View)=>void;auto:()=>void;reset:()=>void;relief:(v:number)=>void;fixedRelief:(v:boolean)=>void;metal:(v:boolean)=>void;mode:(v:string)=>void;reflection:(v:boolean)=>void;restore:()=>Promise<void>;}
export function createInterface(actions:Actions){
 document.querySelector<HTMLDivElement>('#app')!.innerHTML=`<main aria-label="中国杯临时稿三维预览">
 <canvas id="viewport" tabindex="0" aria-label="左键或单指旋转中国杯，右键或双指拖移，滚轮或双指捏合缩放"></canvas>
 <header><div><h1>中国 · 共彩</h1><p>临时线稿 · 金色浅浮雕</p></div><div class="top-actions"><a class="standards-top" href="./evidence.html">素材与对照</a><button id="auto" aria-pressed="false">自动旋转</button><button id="reset">复位</button></div></header>
 <button id="open-settings" class="open-settings" aria-expanded="false" aria-controls="settings">材质校准</button>
 <aside id="settings" hidden aria-label="材质校准"><div class="panel-heading"><h2>材质校准</h2><button id="close-settings">关闭</button></div>
 <section><label class="field-label" for="relief">城市线条凹凸</label><select id="relief"><option value="1">凸纹 · 当前预览</option><option value="0">关闭凹凸</option><option value="-1">凹纹 · 对照</option></select><p class="note">仅改变城市线条的表面起伏。实际凹凸方向和高度仍待工艺确认。</p><label class="check-label"><input id="city-metal" type="checkbox" checked> 城市金属反射</label><label class="check-label"><input id="local-reflections" type="checkbox" checked> 邻近部件反射</label></section>
 <section><label class="check-label"><input id="fixed-relief" type="checkbox" checked> 彩色花纹浅起伏</label><p class="note">杯碟、把手与纵向饰带的花瓣描线和叶脉。选“花纹近看”，开关比较。</p></section>
 <section><label class="field-label" for="material-mode">观察方式</label><select id="material-mode"><option value="pbr">完整材质</option><option value="clay">中性灰 · 检查器型</option><option value="relief">中性灰 · 检查线条</option><option value="floral">中性灰 · 检查花纹</option><option value="metalness">金属覆盖区域</option></select><p class="note">关闭金属后仍保留线条起伏；金色底面没有整体位移。</p></section>
 <section><h3>当前素材</h3><p id="style-name" class="current-style">中国 · 临时线稿</p><p class="note">城市建筑来自 PSD 原稿。文字保持原稿“中国 / CHINA”；把手、纵向饰带和杯碟花纹固定。</p><button id="restore" class="text-button">恢复中国临时稿</button></section>
 <p class="provenance">广彩花纸为依据参考生成的重建稿。凹凸为贴图视觉近似，不代表实测高度。其他城市和换色在后续版本接入。</p>
 </aside><footer><p class="gesture-hint">左键 / 单指旋转 · 右键 / 双指拖移 · 滚轮 / 捏合缩放</p><nav aria-label="观察视角">${Object.entries(viewLabels).map(([key,label])=>`<button data-view="${key}" aria-pressed="${key==='hero'}">${label}</button>`).join('')}</nav></footer>
 <div id="status" role="status" aria-live="polite"></div><div id="fatal" hidden role="alert"></div></main>`;
 const $=<T extends HTMLElement>(s:string)=>document.querySelector<T>(s)!;
 const panel=$('#settings'),toggle=$('#open-settings');
 const setPanel=(open:boolean)=>{panel.hidden=!open;toggle.setAttribute('aria-expanded',String(open));if(open)$('#close-settings').focus();};
 toggle.onclick=()=>setPanel(panel.hidden);$('#close-settings').onclick=()=>setPanel(false);
 document.addEventListener('keydown',e=>{if(e.key==='Escape')setPanel(false);if(e.target instanceof HTMLInputElement||e.target instanceof HTMLSelectElement)return;if(e.key.toLowerCase()==='r')actions.reset();});
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
 return {canvas:$<HTMLCanvasElement>('#viewport'),message,style(name:string){$('#style-name').textContent=name;message(`已载入 · ${name}`);},update(view:View,auto:boolean){document.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===view)));$('#auto').setAttribute('aria-pressed',String(auto));$('#auto').textContent=auto?'暂停旋转':'自动旋转';},error(text:string){$('#fatal').hidden=false;$('#fatal').textContent=text;}};
}
