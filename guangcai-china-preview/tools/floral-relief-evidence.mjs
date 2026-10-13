import {chromium} from 'playwright';
import sharp from 'sharp';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const out='output/playwright/floral-relief-final',pub='public/review/floral-relief';await mkdir(out,{recursive:true});await mkdir(pub,{recursive:true});
const beforeRoot='docs/changes/20261012-floral-relief-calibration/before';
const old=JSON.parse(await readFile(beforeRoot+'/src/styles/web-textures.json','utf8')),current=JSON.parse(await readFile('src/styles/web-textures.json','utf8'));
const replacement=Object.fromEntries(Object.entries(current).filter(([k])=>k.startsWith('fixed/')).map(([k,v])=>['/'+v,'public/'+old[k]]));
const b=await chromium.launch({channel:'chrome',headless:true});const errors=[];
for(const version of ['before','after']){
 const p=await b.newPage({viewport:{width:1600,height:1100}});p.on('pageerror',e=>errors.push(e.message));
 if(version==='before'){
  await p.route('**/textures/*',async route=>{const path=replacement[new URL(route.request().url()).pathname];path?await route.fulfill({path,contentType:'image/webp'}):await route.continue();});
  await p.route('**/src/main.ts*',async route=>{const r=await route.fetch();await route.fulfill({response:r,body:(await r.text())+`\nwindow.__beforeFinish=()=>{for(const m of Object.values(mats.regions)){m.specularIntensity=.55;m.clearcoat=.35;m.clearcoatRoughness=.14;m.normalScale.setScalar(1.5);m.clearcoatNormalScale.setScalar(.825);}reflections.refresh();};`});});
 }
 await p.goto('http://127.0.0.1:5208');await p.waitForFunction(()=>window.cupViewer?.ready());if(version==='before')await p.evaluate(()=>window.__beforeFinish());
 await p.addStyleTag({content:'header,footer,aside,.open-settings,#status{display:none!important}'});
 for(const view of ['flowers','handle','hero']){await p.evaluate(v=>window.cupViewer.setView(v),view);await p.waitForTimeout(1800);await p.screenshot({path:`${out}/${version}-${view}.png`});}
 await p.evaluate(()=>window.cupViewer.setCamera([95,31,115],[0,9,25]));await p.waitForTimeout(800);await p.screenshot({path:`${out}/${version}-grazing.png`});
 if(version==='after'){
  await p.evaluate(()=>window.cupViewer.setView('flowers'));await p.waitForTimeout(1800);
  for(const enabled of [true,false]){await p.evaluate(v=>window.cupViewer.setFixedRelief(v),enabled);await p.waitForTimeout(400);await p.screenshot({path:`${out}/${enabled?'on':'off'}-flowers.png`});}
  await p.evaluate(()=>window.cupViewer.setMode('floral'));
  for(const enabled of [true,false]){await p.evaluate(v=>window.cupViewer.setFixedRelief(v),enabled);await p.waitForTimeout(400);await p.screenshot({path:`${out}/${enabled?'on':'off'}-gray.png`});}
 }
 await p.close();
}
await b.close();assert.equal(errors.length,0);
const roi={left:100,top:460,width:1400,height:250};const pixels=async n=>sharp(`${out}/${n}.png`).extract(roi).removeAlpha().raw().toBuffer();
const a=await pixels('on-flowers'),z=await pixels('off-flowers');const mean=a.reduce((n,v,i)=>n+Math.abs(v-z[i]),0)/a.length;assert.ok(mean>.15,'normal toggle changes actual flower render');
for(const view of ['flowers','handle','grazing']){
 for(const v of ['before','after'])await sharp(`${out}/${v}-${view}.png`).jpeg({quality:95}).toFile(`${pub}/${v}-${view}.jpg`);
 const h=view==='flowers'?roi: {left:0,top:0,width:1600,height:1100};
 await sharp({create:{width:h.width*2,height:h.height,channels:3,background:'#fff'}}).composite(await Promise.all(['before','after'].map(async(v,i)=>({input:await sharp(`${out}/${v}-${view}.png`).extract(h).toBuffer(),left:i*h.width,top:0})))).jpeg({quality:95}).toFile(`${pub}/comparison-${view}.jpg`);
}
for(const name of ['on-gray','off-gray','on-flowers','off-flowers'])await sharp(`${out}/${name}.png`).extract(roi).jpeg({quality:95}).toFile(`${pub}/${name}.jpg`);
await writeFile(`${pub}/verification.json`,JSON.stringify({date:new Date().toISOString(),errors,roi,flowerToggleMeanRgbDelta:mean,normalOn:2.2,coatNormalOn:1.6,normalOff:0,previous:{normal:1.5,coatNormal:.825,clearcoat:.35,specularIntensity:.55},current:{normal:2.2,coatNormal:1.6,clearcoat:.75,specularIntensity:.85},scope:'Actual WebGL before/current normal and material parameters on identical v4 colour artwork; matching cameras and environment. Gray view isolates fixed flower normals. Height is visual approximation, not physical measurement.'},null,2));
console.log({out,mean,errors});
