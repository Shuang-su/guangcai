import {chromium} from 'playwright';
import {execFileSync} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
const phase=process.env.QA_PHASE??'before',out=`output/playwright/fixed-relief-alignment/${phase}`;
await mkdir(out,{recursive:true});
const b=await chromium.launch({channel:'chrome',headless:true});
const p=await b.newPage({viewport:{width:1100,height:850}}),errors=[];
p.on('pageerror',e=>errors.push(e.message));
p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
if(phase==='before')await p.route('**/src/materials/materials.ts',async route=>{
 const response=await route.fetch();const body=await response.text();
 await route.fulfill({response,body:body.replace('clearcoat: .4,','clearcoat: .75,').replace('clearcoatRoughness: .22,','clearcoatRoughness: .14,')});
});
try{
 await p.goto(process.env.QA_URL??'http://127.0.0.1:5212/',{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:180000});
 if(phase==='before'){
  const maps=JSON.parse(execFileSync('git',['show','v4.0:guangcai-china-preview/src/styles/web-textures.json'],{encoding:'utf8'}));
  const layout=JSON.parse(execFileSync('git',['show','v4.0:guangcai-china-preview/src/styles/fixed-layout.json'],{encoding:'utf8'}));
  const atlas=JSON.parse(execFileSync('git',['show','v4.0:guangcai-china-preview/src/styles/fixed-rendering.json'],{encoding:'utf8'}));
  const pack={name:'v4.0 baseline',mapping:'source-layout-v3',regions:Object.fromEntries(['body','handle','saucer'].map(r=>[r,{...Object.fromEntries(['baseColor','normal','metalness','roughness'].map(c=>[c,'/'+maps[`fixed/${r}-${c}`]])),normalFormat:'rgba16f-gzip-v1',...(r==='saucer'?{atlas:atlas.saucer,offsetU:layout.saucer.sourceOffsetU}:{})}]))};
  await p.evaluate(pack=>window.cupViewer.applyFixedArtwork(pack),pack);
 }
 await p.addStyleTag({content:'header,footer,aside,.open-settings,.open-background,#status,.open-artwork{display:none!important}'});
 const views=[['edge',[70,28,150],[48,11,38]],['handle',[-112,80,5],[-74,65,0]],['grazing',[0,24,155],[57,12,30]],['petals',[95,12,74],[56,11,44]]];
 for(const [name,camera,target] of views){
  await p.evaluate(({camera,target})=>window.cupViewer.setCamera(camera,target),{camera,target});
  for(const [mode,relief,label] of [['pbr',true,'color'],['floral',true,'gray'],['floral',false,'flat']]){
   await p.evaluate(({mode,relief})=>{window.cupViewer.setMode(mode);window.cupViewer.setFixedRelief(relief);},{mode,relief});
   await p.waitForTimeout(500);await p.screenshot({path:`${out}/${name}-${label}.png`});
  }
 }
 await p.setViewportSize({width:390,height:844});
 await p.evaluate(()=>{window.cupViewer.setMode('pbr');window.cupViewer.setFixedRelief(true);window.cupViewer.setCamera([0,24,155],[52,12,30]);});await p.waitForTimeout(500);await p.screenshot({path:out+'/mobile-grazing.png'});
 await writeFile(out+'/capture.json',JSON.stringify({phase,views,errors,debug:await p.evaluate(()=>window.cupViewer.debug()),precision:await p.evaluate(()=>window.cupViewer.fixedPrecision())},null,2));
 if(errors.length)throw Error(errors.join('\n'));
 console.log({phase,out,errors});
}finally{await b.close()}
