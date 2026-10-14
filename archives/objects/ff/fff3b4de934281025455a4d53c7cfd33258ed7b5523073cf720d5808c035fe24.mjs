import {readFile,writeFile,mkdir} from 'node:fs/promises';
import sharp from 'sharp';
const out='public/review/fixed-relief-alignment';await mkdir(out,{recursive:true});
const checks=[];
for(const v of ['edge','grazing','handle','petals']){
 const a=await sharp(`output/playwright/fixed-relief-alignment/before/${v}-flat.png`).raw().toBuffer();
 const b=await sharp(`output/playwright/fixed-relief-alignment/after/${v}-flat.png`).raw().toBuffer();
 let changed=0,max=0,sum=0;for(let i=0;i<a.length;i++){const d=Math.abs(a[i]-b[i]);if(d)changed++;max=Math.max(max,d);sum+=d;}
 if(max>1||sum/a.length>1e-5)throw Error(v+' geometry-only render changed');checks.push({view:v,changedChannels:changed,maxDelta:max,meanDelta:sum/a.length,comparison:a.equals(b)?'byte-identical':'within one-level render rounding tolerance'});
 for(const stage of ['before','after'])for(const mode of ['color','gray','flat'])await sharp(`output/playwright/fixed-relief-alignment/${stage}/${v}-${mode}.png`).jpeg({quality:95}).toFile(`${out}/${stage}-${v}-${mode}.jpg`);
}
const slider=(v,title)=>`<div><h3>${title}</h3><div class="compare" id="relief-${v}"><img loading="lazy" src="review/fixed-relief-alignment/after-${v}-color.jpg" alt="修正后"><img loading="lazy" class="model" src="review/fixed-relief-alignment/before-${v}-color.jpg" alt="v4.0 基线"><i class="divider"></i></div><div class="label"><span>v4.0 基线</span><span>修正后</span></div><input type="range" min="0" max="100" value="50" data-compare="relief-${v}" aria-label="${title}对照位置"></div>`;
const section=`<section id="fixed-relief-alignment"><h2>固定花纹：金底伪凹凸与侧边反光修正</h2><p>颜色、花鸟排列及 UV 保持原样。高度改为连续纹样范围与描线分别构建，平整金底不再继承零散暗点。固定花纹采用设备支持的最高各向异性过滤；釉层覆盖从 0.75 调至 0.40，釉层粗糙度从 0.14 调至 0.22，减少侧边掠射角的大片泛白。凹凸强度仍为 4.4／2.4，城市金色、器型、结构金边与白瓷参数不变。</p><div class="grid">${slider('grazing','杯碟掠射角')}${slider('handle','把手金底与描线')}</div><div class="grid three">${['color','gray','flat'].map((m,i)=>`<figure><img loading="lazy" src="review/fixed-relief-alignment/after-grazing-${m}.jpg" alt="${['彩色','灰模','关闭凹凸'][i]}"><figcaption>${['彩色','灰模检查侧边线条','关闭凹凸检查器型'][i]}</figcaption></figure>`).join('')}</div><p>灰模显示侧边描线并未缺失；彩色模式的釉面反射会影响其可见程度。法线贴图不会改变几何剪影，因此最外沿轮廓仍平滑，不能等同于真实位移浮雕。手机截图为浏览器模拟，仍需真机确认。</p><p><a href="review/fixed-relief-alignment/verification.json">像素与范围验证</a> · <a href="review/fixed-relief-alignment/derivation.json">高度生成记录</a></p></section>\n`;
let html=await readFile('public/evidence.html','utf8');html=html.replace(/<section id="fixed-relief-alignment">[\s\S]*?<\/section>\n/,'');const at=html.indexOf('<section');html=html.slice(0,at)+section+html.slice(at);await writeFile('public/evidence.html',html);
for(const name of ['verification','derivation'])await writeFile(`${out}/${name}.json`,await readFile(`evidence/fixed-relief-alignment/${name}.json`));
await writeFile('evidence/fixed-relief-alignment/render-checks.json',JSON.stringify({checks,glaze:{before:{clearcoat:.75,roughness:.14},after:{clearcoat:.4,roughness:.22}},limits:'Browser rendering, not physical-device acceptance; normal maps do not displace the geometric silhouette.'},null,2));console.log(checks);
