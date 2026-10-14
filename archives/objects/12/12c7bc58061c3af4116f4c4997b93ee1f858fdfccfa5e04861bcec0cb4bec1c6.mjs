import {chromium} from 'playwright';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import sharp from 'sharp';
const out='output/playwright/floral-relief';await mkdir(out,{recursive:true});
const b=await chromium.launch({channel:'chrome',headless:true});const p=await b.newPage({viewport:{width:1600,height:1100}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.route('**/src/main.ts*',async route=>{const r=await route.fetch();await route.fulfill({response:r,body:(await r.text())+`\nwindow.__floralTune=(v)=>{for(const m of Object.values(mats.regions)){m.specularIntensity=v.specular;m.clearcoat=v.coat;m.clearcoatRoughness=v.coatRough;m.normalScale.setScalar(v.normal);m.clearcoatNormalScale.setScalar(v.coatNormal);}reflections.refresh();};`});});
const settings={current:{specular:.55,coat:.35,coatRough:.14,normal:1.5,coatNormal:.825},oldGlaze:{specular:1,coat:1,coatRough:.11,normal:1.5,coatNormal:.825},balanced:{specular:.85,coat:.75,coatRough:.14,normal:2.2,coatNormal:1.6},strong:{specular:.85,coat:.75,coatRough:.14,normal:3,coatNormal:2.2},flat:{specular:.85,coat:.75,coatRough:.14,normal:0,coatNormal:0}};
try{
 await p.goto('http://127.0.0.1:5208');await p.waitForFunction(()=>window.cupViewer?.ready());await p.addStyleTag({content:'header,footer,aside,.open-settings,#status{display:none!important}'});
 for(const [name,s]of Object.entries(settings)){
  await p.evaluate(s=>window.__floralTune(s),s);
  for(const view of ['hero','handle']){await p.evaluate(v=>window.cupViewer.setView(v),view);await p.waitForTimeout(1800);await p.screenshot({path:`${out}/${name}-${view}.png`});}
  // Front flower band at grazing angle, identical camera for every material.
  await p.evaluate(()=>window.cupViewer.setCamera([0,23,155],[0,9,30]));await p.waitForTimeout(700);await p.screenshot({path:`${out}/${name}-flower.png`});
 }
}finally{await b.close();}
for(const view of ['hero','handle','flower'])await sharp({create:{width:2400,height:550,channels:3,background:'#fff'}}).composite(await Promise.all(['current','balanced','strong'].map(async(name,i)=>({input:await sharp(`${out}/${name}-${view}.png`).resize(800,550).toBuffer(),left:i*800,top:0})))).jpeg({quality:95}).toFile(`${out}/compare-${view}.jpg`);
await writeFile(`${out}/settings.json`,JSON.stringify({settings,errors,note:'Same v4 maps, camera and studio; only fixed decoration material parameters differ.'},null,2));console.log({out,errors});
