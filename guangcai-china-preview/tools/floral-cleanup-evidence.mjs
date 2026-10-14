import {readFile,writeFile,mkdir} from 'node:fs/promises';
import sharp from 'sharp';
const out='public/review/floral-cleanup-4.2';await mkdir(out,{recursive:true});
const checks=[];
for(const v of ['edge','grazing','handle','petals','pomegranate']){
 const a=await sharp(`output/playwright/floral-cleanup-4.2/before/${v}-flat.png`).raw().toBuffer();
 const b=await sharp(`output/playwright/floral-cleanup-4.2/after/${v}-flat.png`).raw().toBuffer();
 let changed=0,max=0,sum=0;for(let i=0;i<a.length;i++){const d=Math.abs(a[i]-b[i]);if(d)changed++;max=Math.max(max,d);sum+=d;}
 if(max>1||sum/a.length>1e-5)throw Error(v+' geometry-only render changed');checks.push({view:v,changedChannels:changed,maxDelta:max,meanDelta:sum/a.length,comparison:a.equals(b)?'byte-identical':'within one-level render rounding tolerance'});
 for(const stage of ['before','after'])for(const mode of ['color','gray','flat'])await sharp(`output/playwright/floral-cleanup-4.2/${stage}/${v}-${mode}.png`).jpeg({quality:95}).toFile(`${out}/${stage}-${v}-${mode}.jpg`);
}
const slider=(v,title)=>`<div><h3>${title}</h3><div class="compare" id="cleanup-${v}"><img loading="lazy" src="review/floral-cleanup-4.2/after-${v}-color.jpg" alt="4.2 清洗后"><img loading="lazy" class="model" src="review/floral-cleanup-4.2/before-${v}-color.jpg" alt="4.1 清洗前"><i class="divider"></i></div><div class="label"><span>4.1 清洗前</span><span>4.2 清洗后</span></div><input type="range" min="0" max="100" value="50" data-compare="cleanup-${v}" aria-label="${title}对照位置"></div>`;
const section=`<section id="floral-cleanup-4.2"><h2>4.2：金底清洗，保留原有花纹</h2><p>原始颜色母图与花果描线保持原样。只在确认的金色空白区使用统一金色底材，清理残留杂点、划痕和局部色痕；金属、粗糙度与法线同步对齐。真实亮暗继续由三维灯光产生。花果内部的水彩晕染保留，凹凸强度仍为 4.4／2.4。</p><div class="grid">${slider('pomegranate','石榴与叶茎之间的金底')}${slider('handle','把手花叶近景')}${slider('grazing','杯碟掠射角')}${slider('edge','杯碟边缘')}</div><div class="grid three">${['color','gray','flat'].map((m,i)=>`<figure><img loading="lazy" src="review/floral-cleanup-4.2/after-handle-${m}.jpg" alt="${['彩色','灰模','关闭凹凸'][i]}"><figcaption>${['4.2 彩色','灰模检查描线','关闭凹凸检查器型'][i]}</figcaption></figure>`).join('')}</div><p>生成式清洗样张改变了原线条，没有用作运行花纸。本次保留原始像素，清洗作用于独立材质支持范围与金底着色。与花瓣或描线相连的细小色痕仍可能保留；不会为去噪削细原有描线。正常观察和近景均可对照。</p><p>4.1 是上一轮已部署修复的回溯版本；4.2 同步更新应用界面和 package 编号。浏览器手机视口不等同于真实设备验收。法线不改变几何剪影。</p><p><a href="review/floral-cleanup-4.2/verification.json">像素与范围验证</a> · <a href="review/floral-cleanup-4.2/derivation.json">材质清洗记录</a></p></section>\n`;
let html=await readFile('public/evidence.html','utf8');html=html.replace(/<section id="floral-cleanup-4.2">[\s\S]*?<\/section>\n/,'');const at=html.indexOf('<section');html=html.slice(0,at)+section+html.slice(at);await writeFile('public/evidence.html',html);
for(const name of ['verification','derivation'])await writeFile(`${out}/${name}.json`,await readFile(`evidence/floral-cleanup-4.2/${name}.json`));
await writeFile('evidence/floral-cleanup-4.2/render-checks.json',JSON.stringify({checks,glaze:{before:{clearcoat:.4,roughness:.22},after:{clearcoat:.4,roughness:.22}},limits:'Browser rendering, not physical-device acceptance; normal maps do not displace the geometric silhouette.'},null,2));console.log(checks);
