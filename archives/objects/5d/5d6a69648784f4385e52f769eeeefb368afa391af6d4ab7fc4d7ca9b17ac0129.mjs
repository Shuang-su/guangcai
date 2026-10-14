import {chromium} from 'playwright';import sharp from 'sharp';import {mkdir,readFile,writeFile}from'node:fs/promises';
const url='http://127.0.0.1:5209/',out='evidence/load-pan-floral';const browser=await chromium.launch({channel:'chrome',headless:true});const mappings=JSON.parse(await readFile('src/styles/web-textures.json','utf8'));const pngs=Object.fromEntries(Object.entries(mappings).filter(([k])=>k.startsWith('fixed/')).map(([k,v])=>['/'+v,'public/'+k+'.png']));const old='docs/changes/20261012-load-pan-floral/before/fixed';
await mkdir(out,{recursive:true});
for(const variant of ['old','source','web']){
 const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});const page=await context.newPage();if(variant!=='web')await page.route('**/textures/*',async r=>{const path=pngs[new URL(r.request().url()).pathname];if(path)await r.fulfill({path:variant==='old'?path.replace('public/fixed',old):path,contentType:'image/png'});else await r.continue();});
 await page.goto(url);await page.waitForFunction(()=>window.cupViewer?.ready());await page.addStyleTag({content:'header,footer,aside,.open-settings,#status{display:none!important}'});
 for(const v of ['hero','handle','detail','front']){await page.evaluate(v=>window.cupViewer.setView(v),v);await page.waitForTimeout(2200);await page.screenshot({path:`${out}/${variant}-${v}.png`});}
 await context.close();
}
const metrics=[];for(const view of ['hero','handle','detail','front']){
 const raw=async v=>sharp(`${out}/${v}-${view}.png`).removeAlpha().raw().toBuffer();const a=await raw('source'),b=await raw('web');let sum=0,sq=0,max=0;for(let i=0;i<a.length;i++){const d=Math.abs(a[i]-b[i]);sum+=d;sq+=d*d;max=Math.max(max,d)}metrics.push({view,meanRgbDelta:sum/a.length,rmse:Math.sqrt(sq/a.length),maxChannelDelta:max});
 await sharp({create:{width:2160,height:500,channels:3,background:'#fff'}}).composite(await Promise.all(['old','source','web'].map(async (v,i)=>({input:await sharp(`${out}/${v}-${view}.png`).resize(720,500).toBuffer(),left:i*720,top:0})))).jpeg({quality:94}).toFile(`${out}/comparison-${view}.jpg`);
}
await writeFile(`${out}/quality.json`,JSON.stringify({date:new Date().toISOString(),url,metrics,order:['old floral','new source PNG','new runtime WebP'],note:'Identical actual WebGL scene and cameras; differences measured across full frame, including unchanged background'},null,2));console.log(JSON.stringify(metrics));await browser.close();
