import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
const files=['public/references/1238.jpg','../evidence/overlays/1238-model.png','../evidence/overlays/1238-pbr.png'];
const labels=['参考照片','修改后的模型','50% 透明叠加'];
const sources=await Promise.all(files.map(async f=>`data:image/${f.endsWith('jpg')?'jpeg':'png'};base64,${(await readFile(f)).toString('base64')}`));
const html=`<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:30px;background:#ecebe8;color:#303234;font:20px system-ui}h1{font-size:25px;margin:0 0 8px}p{font-size:14px;color:#686868;margin:0 0 24px}.grid{display:flex;gap:20px}.frame{width:360px;height:560px;overflow:hidden;position:relative;background:#fff}.frame img{position:absolute;width:1094.4px;max-width:none;left:-508px;top:-530px}h2{font-size:18px;margin:10px 0}</style><h1>盖片与盖把 · 同机位轮廓对比</h1><p>先用盖缘拟合机位，再核对盖片、止口、盖把拱高与开口。各栏等比缩放；灰色模型受统一摄影棚光照，保留实际偏差。</p><div class="grid">${sources.map((s,i)=>`<section><div class="frame"><img src="${s}"></div><h2>${labels[i]}</h2></section>`).join('')}</div>`;
await mkdir('../evidence/lid-correction',{recursive:true});await writeFile('../evidence/lid-correction/index.html',html);
const browser=await chromium.launch({channel:'chrome',headless:true});try{const page=await browser.newPage({viewport:{width:1180,height:745},deviceScaleFactor:1});await page.setContent(html);await page.screenshot({path:'../evidence/lid-correction/comparison.png'});}finally{await browser.close()}
