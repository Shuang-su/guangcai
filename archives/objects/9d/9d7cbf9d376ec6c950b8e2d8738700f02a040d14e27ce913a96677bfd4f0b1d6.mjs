import {chromium} from 'playwright';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const phase=process.env.QA_PHASE??'after',url=process.env.QA_URL??'http://127.0.0.1:5215/';
const out=phase==='online'?'output/playwright/v4-color-coverage/online':`public/review/v4-color-coverage/${phase}`;
await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true,args:process.env.CHROME_ARGS?.split('|')??[]});
const page=await browser.newPage({viewport:{width:1100,height:900}}),checks=[],errors=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&/WebGLProgram|Shader Error/.test(m.text()))errors.push(m.text());});
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
async function shot(name){await page.screenshot({path:`${out}/${name}.png`});}
try{
 await page.goto(url);await page.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:180000});await page.waitForTimeout(1900);
 const initial=await page.evaluate(()=>window.cupViewer.debug());await shot('gold-hero');
 if(phase==='after'){
  const crop={left:140,top:125,width:790,height:640};const a=await sharp('public/review/v4-color-coverage/before/gold-hero.png').extract(crop).raw().toBuffer(),b=await sharp(out+'/gold-hero.png').extract(crop).raw().toBuffer();
  const delta=a.reduce((n,v,i)=>n+Math.abs(v-b[i]),0)/a.length;assert.ok(delta<.01);checks.push({name:'original gold model unchanged',meanDifference:delta});
 }
 for(const variant of ['china-green','china-red','china-purple','china-blue']){
  for(const finish of phase==='online'?['enamel']:['enamel','metal','paint']){
   assert.ok(await page.evaluate(s=>window.cupViewer.selectArtwork(s),{variant,finish,text:'auto'}));
   await page.evaluate(()=>window.cupViewer.setView('detail',true));await page.waitForTimeout(550);
   const s=await page.evaluate(()=>window.cupViewer.debug());
   assert.ok(same(s.fixed,initial.fixed)&&same(s.geometries,initial.geometries)&&same(s.porcelain,initial.porcelain));
   assert.equal(s.city.maps[4].precision,'RGBA16F');assert.equal(s.exposure,1.08);
   checks.push({name:`${variant}/${finish}`,fixedGeometryAndPorcelainUnchanged:true});await shot(`${variant}-${finish}-detail`);
   if(phase==='after')for(const [view,key] of [['hero','hero'],['front','text'],['detail','detail'],['grazing','grazing']]){
    await page.evaluate(v=>v==='grazing'?window.cupViewer.setCamera([-125,70,-140],[-9,40,-11]):window.cupViewer.setView(v,true),view);await page.waitForTimeout(550);
    await page.screenshot({path:`public/review/v4/${variant}-${finish}-${key}.jpg`,quality:90});
   }
  }
  if(phase==='after')for(const text of ['name','none']){
   await page.evaluate(s=>window.cupViewer.selectArtwork(s),{variant,finish:'enamel',text});await page.evaluate(()=>window.cupViewer.setView('front',true));await page.waitForTimeout(550);
   await page.screenshot({path:`public/review/v4/${variant}-lettering-${text}.jpg`,quality:90});
  }
 }
 assert.ok(await page.evaluate(()=>window.cupViewer.selectArtwork({variant:'china-green',finish:'enamel',text:'auto'})));
 await page.evaluate(()=>{window.cupViewer.setView('detail',true);window.cupViewer.setMode('relief')});await page.waitForTimeout(400);await shot('green-gray');
 if(phase==='after'){
  const a=await sharp('public/review/v4-color-coverage/before/green-gray.png').raw().toBuffer(),b=await sharp(out+'/green-gray.png').raw().toBuffer();
  const delta=a.reduce((n,v,i)=>n+Math.abs(v-b[i]),0)/a.length;assert.ok(delta<.01);checks.push({name:'relief gray frame unchanged',meanDifference:delta});
 }
 await page.evaluate(()=>{window.cupViewer.setMode('pbr');window.cupViewer.setView('hero',true)});await page.waitForTimeout(400);
 await page.locator('#open-artwork').click();await page.waitForFunction(()=>[...document.querySelectorAll('.variant-card img')].every(i=>i.complete&&i.naturalWidth>0));await shot('green-panel');
 assert.equal(errors.length,0);checks.push({name:'no runtime or shader exceptions'});
 console.log(JSON.stringify({phase,checks:checks.length,errors}));
}finally{await writeFile(out+'/qa.json',JSON.stringify({phase,url,date:new Date().toISOString(),checks,errors},null,2));await browser.close();}
