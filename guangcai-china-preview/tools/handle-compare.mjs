import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
const files=['public/references/1220.jpg','../evidence/overlays/1220-model.png','../evidence/overlays/1220-pbr.png'];
const labels=['参考照片','修改后的模型','50% 透明叠加'];
const sources=await Promise.all(files.map(async f=>`data:image/${f.endsWith('jpg')?'jpeg':'png'};base64,${(await readFile(f)).toString('base64')}`));
const html=`<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:30px;background:#ecebe8;color:#303234;font:20px system-ui}h1{font-size:25px;margin:0 0 8px}p{font-size:14px;color:#686868;margin:0 0 24px}.grid{display:flex;gap:20px}.frame{width:360px;height:480px;overflow:hidden;position:relative;background:#fff}.frame img{position:absolute;width:2160px;max-width:none;left:-1413px;top:-810px}h2{font-size:18px;margin:10px 0}</style><h1>把手上接头 · 同机位轮廓对比</h1><p>内外轮廓分别建模：上接头较厚、下沿斜向收分、上沿近水平、外肩小圆角。此处仅等比放大，不作局部拉伸。</p><div class="grid">${sources.map((s,i)=>`<section><div class="frame"><img src="${s}"></div><h2>${labels[i]}</h2></section>`).join('')}</div>`;
await mkdir('../evidence/handle-correction',{recursive:true});await writeFile('../evidence/handle-correction/index.html',html);
const browser=await chromium.launch({channel:'chrome',headless:true});try{const page=await browser.newPage({viewport:{width:1180,height:665},deviceScaleFactor:1});await page.setContent(html);await page.screenshot({path:'../evidence/handle-correction/comparison.png'});}finally{await browser.close()}
