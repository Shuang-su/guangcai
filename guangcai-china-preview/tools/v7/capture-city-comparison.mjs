// Requested per-city visual evidence. Browser plugin absent; repository Playwright.
import fs from 'node:fs/promises';import assert from 'node:assert/strict';import sharp from 'sharp';import {chromium} from 'playwright';
const url=process.env.QA_URL??'http://127.0.0.1:5286/';
const out='public/city-compare/images',evidence='evidence/v7.1.4';await fs.mkdir(out,{recursive:true});await fs.mkdir(evidence,{recursive:true});
const browser=await chromium.launch({channel:'chrome'}),report={url,viewport:{width:1200,height:1000},rows:[],errors:[],physicalDeviceTested:false};
const requested=process.env.QA_CITIES?.split(',');
async function ready(page){await page.waitForFunction(()=>window.cupViewer?.ready()&&!window.cupViewer.debug().selection.busy&&!window.cupViewer.debug().quality.upgrading,null,{timeout:120000});}
try{
 const page=await browser.newPage({viewport:report.viewport,deviceScaleFactor:1});page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
 await page.goto(url);await ready(page);const initial=await page.evaluate(()=>window.cupViewer.exportDesign());assert.equal(initial.resourceReleaseId,'v7-5');
 const boot=JSON.parse(await fs.readFile('public/api/v1/bootstrap.json')),m=JSON.parse(await fs.readFile('public/'+boot.manifestUrl));
 for(const cityId of Object.keys(m.cities)){
  if(requested&&!requested.includes(cityId))continue;
  let camera;
  for(const finish of ['gold','blue'])for(const [phase,resourceReleaseId]of [['before','v7-4'],['after','v7-5']]){
   const appearance=finish==='gold'?initial.appearance:{preset:'blue',hue:207.27272727272725,saturation:75.34246575342466,lightness:28.627450980392155,material:0,materialX:.5,relief:1};
   const design={...initial,resourceReleaseId,cityId,appearance};assert.equal(await page.evaluate(d=>window.cupViewer.importDesign(d),design),true);await ready(page);
   await page.evaluate(()=>window.cupViewer.setView('detail',true));await page.waitForTimeout(450);await ready(page);
   const d=await page.evaluate(()=>({design:window.cupViewer.exportDesign(),debug:window.cupViewer.debug()}));assert.deepEqual(d.design,design);assert.equal(d.debug.quality.cityTier,'detail');
   const pose={camera:d.debug.camera,target:d.debug.target,view:d.debug.view};if(camera){assert.equal(pose.view,camera.view);for(const key of ['camera','target'])pose[key].forEach((n,i)=>assert(Math.abs(n-camera[key][i])<1e-9,'Camera drift'));}else camera=pose;
   const image=await page.evaluate(()=>window.cupViewer.capture());const encoded=Buffer.from(image.slice(image.indexOf(',')+1),'base64');
   const file=`${cityId}-${finish}-${phase}.webp`;await sharp(encoded).webp({quality:95,effort:5}).toFile(out+'/'+file);
   report.rows.push({cityId,name:m.cities[cityId].name,finish,phase,resourceReleaseId,file,pose,textureWidth:d.debug.city.pack.runtime.mask.width});
  }
  console.log(cityId,'4 matching-camera comparisons saved');
 }
 assert.equal(report.rows.length,(requested?.length??23)*4);assert.equal(report.errors.length,0);
 if(requested){const prior=JSON.parse(await fs.readFile(evidence+'/capture-comparison.json'));report.rows=[...prior.rows.filter(r=>!requested.includes(r.cityId)),...report.rows];report.refreshedCities=requested;report.previousErrors=prior.errors;assert.equal(prior.errors.length,0);}
 assert.equal(report.rows.length,92);report.passed=true;
}catch(e){report.passed=false;report.failure=e.stack;process.exitCode=1;}finally{await browser.close();await fs.writeFile(evidence+'/capture-comparison.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({passed:report.passed,rows:report.rows.length,errors:report.errors,failure:report.failure}));}
