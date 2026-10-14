import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
const phase=process.env.QA_PHASE??'after',url=process.env.QA_URL??'http://127.0.0.1:5215/';
const out=`output/playwright/v4-body-seam/${phase}`;await mkdir(out,{recursive:true});
const b=await chromium.launch({channel:'chrome',headless:true,args:process.env.CHROME_ARGS?.split('|')??[]});
const p=await b.newPage({viewport:{width:1100,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/WebGLProgram|Shader Error/.test(m.text()))errors.push(m.text())});
const checks=[];
let release;const gate=new Promise(r=>release=r);
await p.route('**/textures/*',async route=>{await gate;await route.continue();});
const camera=[-925,215,-215],target=[0,62,0];
try{
 await p.goto(url,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.cupViewer);
 await p.evaluate(({camera,target})=>window.cupViewer.setCamera(camera,target),{camera,target});await p.waitForTimeout(800);
 await p.screenshot({path:out+'/loading.png'});release();
 await p.waitForFunction(()=>window.cupViewer.ready(),null,{timeout:180000});await p.waitForTimeout(1200);
 await p.screenshot({path:out+'/gold.png'});const baseline=await p.evaluate(()=>window.cupViewer.debug());
 for(const variant of ['china-green','shenzhen-teal']){
  await p.evaluate(variant=>window.cupViewer.selectArtwork({variant,finish:'enamel',text:'auto'}),variant);await p.waitForTimeout(700);await p.screenshot({path:out+'/'+variant+'.png'});
 }
 for(const variant of ['china-green','shenzhen-teal'])for(const finish of ['metal','paint']){
  assert.ok(await p.evaluate(s=>window.cupViewer.selectArtwork(s),{variant,finish,text:'auto'}));await p.waitForTimeout(350);
  const state=await p.evaluate(()=>window.cupViewer.debug());assert.deepEqual(state.fixed,baseline.fixed);assert.deepEqual(state.geometries,baseline.geometries);assert.equal(state.exposure,1.08);checks.push(`${variant}/${finish}: fixed textures, geometry and exposure preserved`);
 }
 await p.evaluate(()=>window.cupViewer.setMode('clay'));await p.waitForTimeout(500);await p.screenshot({path:out+'/clay.png'});
 await p.evaluate(()=>window.cupViewer.setMode('pbr'));await p.waitForTimeout(500);
 await p.evaluate(()=>window.cupViewer.setLocalReflections(false));await p.waitForTimeout(350);await p.screenshot({path:out+'/reflections-off.png'});
 await p.evaluate(()=>window.cupViewer.setLocalReflections(true));await p.waitForTimeout(350);
 const metrics=[];
 for(const name of ['loading','gold','china-green','shenzhen-teal']){
  const {data,info}=await sharp(out+'/'+name+'.png').removeAlpha().raw().toBuffer({resolveWithObject:true});
  const col=x=>{let sum=0;for(let y=370;y<520;y++)sum+=(data[(y*info.width+x)*3]+data[(y*info.width+x)*3+1]+data[(y*info.width+x)*3+2])/3;return sum/150;};
  const jump=Math.abs(col(489)-col(487));metrics.push({name,boundaryJump:jump});if(phase!=='before')assert.ok(jump<.4,`${name}: visible glaze boundary step ${jump}`);
 }
 if(phase==='after'){
  const old=await sharp('output/playwright/v4-body-seam/before/clay.png').raw().toBuffer(),current=await sharp(out+'/clay.png').raw().toBuffer();
  assert.ok(old.equals(current),'geometry-only render unchanged');checks.push('before/after clay render identical');
 }
 await p.setViewportSize({width:390,height:844});await p.evaluate(()=>window.cupViewer.setView('handle',true));await p.waitForTimeout(400);await p.screenshot({path:out+'/mobile.png'});
 assert.equal(errors.length,0);checks.push('no runtime or shader errors');
 await writeFile(out+'/qa.json',JSON.stringify({phase,url,camera,target,metrics,checks,errors,debug:await p.evaluate(()=>window.cupViewer.debug())},null,2));console.log({phase,errors});
}finally{release();await b.close()}
