import {references,type ReferenceId} from '../interaction/reference-views';
import { viewLabels, type View } from '../interaction/views';
import type { MaterialMode } from '../materials/materials';
import type { Dimensions } from '../geometry/parameters';
export interface Actions{
 reference:(v:ReferenceId)=>void;view:(v:View)=>void;auto:()=>void;reset:()=>void;mode:(v:MaterialMode)=>void;
 relief:(v:number)=>void;exposure:(v:number)=>void;flat:(f:File)=>Promise<void>;
 folder:(f:File[])=>Promise<void>;restore:()=>Promise<void>;dimensions:(p:Partial<Dimensions>)=>void;
}
export function createInterface(actions:Actions,p:Dimensions){
  document.querySelector<HTMLDivElement>('#app')!.innerHTML=`
    <main aria-label="广彩瓷器三维观察器">
      <canvas id="viewport" aria-label="可旋转的三维杯、盖与碟；也可使用下方预设视角" tabindex="0"></canvas>
      <header><div class="identity"><h1>广彩 · 器物</h1><p>一号杯 · 花纹展示</p></div>
        <div class="top-actions"><button id="auto" aria-pressed="false">自动旋转</button><button id="reset">复位</button></div>
      </header>
      <button id="open-settings" class="open-settings" aria-expanded="false" aria-controls="settings">材质与图案</button>
      <aside id="settings" hidden aria-label="材质与图案设置">
        <div class="panel-heading"><h2>材质与图案</h2><button id="close-settings" aria-label="关闭设置">关闭</button></div>
        <section><label class="field-label" for="reference-view">照片对应机位</label><select id="reference-view"><option value="">选择参考照片</option>${Object.entries(references).map(([id,p])=>`<option value="${id}">${p.label}</option>`).join('')}</select><p class="note">依据照片透视估计，保留自由旋转。原照片分组与对照图见交付目录。 <a href="./compare.html">打开实拍叠图校准</a></p></section><section><label class="field-label" for="material-mode">观察材质</label>
          <select id="material-mode"><option value="pbr">白瓷 · 金彩 · 花纸</option><option value="porcelain">素瓷与金边</option><option value="clay">中性灰器型</option><option value="normal">表面法线</option><option value="metalness">金属区域</option></select>
          <label class="slider-label" for="relief">彩绘微浮雕 <output id="relief-value">0.65</output></label><input id="relief" type="range" min="0" max="1.5" value="0.65" step="0.05">
          <label class="slider-label" for="exposure">摄影棚亮度 <output id="exposure-value">1.08</output></label><input id="exposure" type="range" min=".65" max="1.5" value="1.08" step=".01">
        </section>
        <section><h3>替换图案</h3><p class="current-style" id="style-name">正在载入花纸…</p>
          <label class="file-button">上传一张图片<input id="flat-upload" type="file" accept="image/png,image/jpeg,image/webp"></label>
          <p class="note">按各装饰区比例等比裁切，自动清除旧浮雕和金属遮罩。</p>
          <label class="file-button secondary">导入完整材质包<input id="pack-upload" type="file" webkitdirectory multiple></label>
          <p class="note">选择含 style.json 和对齐贴图的文件夹。</p>
          <button id="restore" class="text-button">恢复花蝶 · 金地</button>
        </section>
        <details><summary>器型尺寸 <span>推定值 / mm</span></summary>
          <div class="dimension-grid">
            <label>杯身直径<input id="diameter" type="number" value="${p.radius*2}" min="70" max="110" step="1"></label>
            <label>杯身高度<input id="height" type="number" value="${p.height}" min="90" max="150" step="1"></label>
            <label>杯壁厚度<input id="wall" type="number" value="${p.wall}" min="1.5" max="4" step=".1"></label>
            <label>把手外伸<input id="reach" type="number" value="${p.handleReach}" min="25" max="45" step="1"></label>
          </div><button id="apply-dimensions">应用尺寸</button>
          <p class="note">杯身尺寸按照片比例推定，非实测。底碟直径 151 mm 来自产品参数。</p>
        </details>
        <p class="provenance">花纸为 AI 生成的参考风格重建，非原版花纸。碟径 151 mm 来自产品参数，其余尺寸由照片推定。</p>
      </aside>
      <footer><p class="gesture-hint">拖拽旋转 · 滚轮 / 双指缩放</p><nav aria-label="观察视角">${Object.entries(viewLabels).map(([key,label])=>`<button data-view="${key}" aria-pressed="${key==='hero'}">${label}</button>`).join('')}</nav></footer>
      <div id="status" role="status" aria-live="polite">正在准备器物与花纸…</div>
      <div id="fatal" hidden role="alert"></div>
    </main>`;
  const $=<T extends HTMLElement>(s:string)=>document.querySelector<T>(s)!;
  const panel=$('#settings'),toggle=$('#open-settings');
  function setPanel(open:boolean){panel.hidden=!open;toggle.setAttribute('aria-expanded',String(open));if(open)$('#close-settings').focus();}
  toggle.onclick=()=>setPanel(panel.hidden);$('#close-settings').onclick=()=>setPanel(false);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setPanel(false);if(e.target instanceof HTMLInputElement||e.target instanceof HTMLSelectElement)return;if(e.key.toLowerCase()==='r')actions.reset();});
  document.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(b=>b.onclick=()=>actions.view(b.dataset.view as View));
  $<HTMLSelectElement>('#reference-view').onchange=e=>{actions.reference((e.target as HTMLSelectElement).value as ReferenceId);setPanel(false);};
  $('#auto').onclick=actions.auto;$('#reset').onclick=actions.reset;
  $<HTMLSelectElement>('#material-mode').onchange=e=>actions.mode((e.target as HTMLSelectElement).value as MaterialMode);
  for(const id of['relief','exposure'] as const){$<HTMLInputElement>(`#${id}`).oninput=e=>{const v=+(e.target as HTMLInputElement).value;$(`#${id}-value`).textContent=v.toFixed(2);actions[id](v);};}
  const operation=async(fn:()=>Promise<void>)=>{try{message('正在载入图案…',true);await fn();}catch(e){message(e instanceof Error?e.message:'操作失败，保留当前图案。',true);}};
  $<HTMLInputElement>('#flat-upload').onchange=e=>{const el=e.target as HTMLInputElement,f=el.files?.[0];if(f)void operation(()=>actions.flat(f));el.value='';};
  $<HTMLInputElement>('#pack-upload').onchange=e=>{const el=e.target as HTMLInputElement,files=Array.from(el.files??[]);if(files.length)void operation(()=>actions.folder(files));el.value='';};
  $('#restore').onclick=()=>void operation(actions.restore);
  $('#apply-dimensions').onclick=()=>{
    const ids=['diameter','height','wall','reach'];if(ids.some(id=>!$<HTMLInputElement>(`#${id}`).reportValidity()))return;
    actions.dimensions({radius:+$<HTMLInputElement>('#diameter').value/2,height:+$<HTMLInputElement>('#height').value,wall:+$<HTMLInputElement>('#wall').value,handleReach:+$<HTMLInputElement>('#reach').value});
  };
  let messageTimer=0;
  function message(text:string,persistent=false){clearTimeout(messageTimer);$('#status').textContent=text;$('#status').classList.add('visible');if(!persistent)messageTimer=window.setTimeout(()=>$('#status').classList.remove('visible'),4000);}
  return{canvas:$<HTMLCanvasElement>('#viewport'),message,
    update(view:View,auto:boolean){document.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===view)));$('#auto').setAttribute('aria-pressed',String(auto));$('#auto').textContent=auto?'暂停旋转':'自动旋转';},
    style(name:string){$('#style-name').textContent=name;message(`已应用 · ${name}`);},
    error(text:string){$('#fatal').hidden=false;$('#fatal').textContent=text;},
  };
}
