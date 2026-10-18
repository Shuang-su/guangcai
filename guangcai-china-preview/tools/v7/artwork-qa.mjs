// Fixed-camera app verification for V7.1.3 unchanged city/slogan artwork; desktop automation is not device acceptance.
import {chromium} from 'playwright';import fs from 'node:fs/promises';import assert from 'node:assert/strict';
const out=process.env.QA_OUT??'evidence/v7.1.3/qa/artwork',url=process.env.QA_URL??'http://127.0.0.1:5282/';await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome'}),report={url,checks:[],errors:[],physicalDeviceTested:false};
try{
 const page=await browser.newPage({viewport:{width:1200,height:1100},deviceScaleFactor:1});page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto(url);await page.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:180000});
 const initial=await page.evaluate(()=>window.cupViewer.exportDesign());assert.equal(initial.resourceReleaseId,'v7-4');
 const slogans=['open','innovation','cooperation','sharing','together','ocean'];
 for(const preset of ['gold','blue']){
  const appearance=preset==='gold'?initial.appearance:{preset:'blue',hue:207.27272727272725,saturation:75.34246575342466,lightness:28.627450980392155,material:0,materialX:.5,relief:1};
  for(const sloganId of slogans){const design={...initial,sloganId,appearance};assert.equal(await page.evaluate(d=>window.cupViewer.importDesign(d),design),true);await page.evaluate(()=>window.cupViewer.setView('front',true));await page.waitForFunction(()=>window.cupViewer.ready()&&!window.cupViewer.debug().selection.busy&&!window.cupViewer.debug().quality.upgrading,null,{timeout:30000});await page.waitForTimeout(450);await page.waitForFunction(()=>!window.cupViewer.debug().selection.busy);assert.deepEqual(await page.evaluate(()=>window.cupViewer.exportDesign()),design);await page.screenshot({path:`${out}/slogan-${preset}-${sloganId}.png`});report.checks.push(`${preset}/${sloganId} restores unchanged parameters and renders`);}
  for(const cityId of ['xiamen','xian']){assert.equal(await page.evaluate(d=>window.cupViewer.importDesign(d),{...initial,cityId,appearance}),true);await page.evaluate(()=>window.cupViewer.setView('detail',true));await page.waitForFunction(()=>!window.cupViewer.debug().quality.upgrading&&!window.cupViewer.debug().selection.busy,null,{timeout:30000});await page.waitForTimeout(600);await page.screenshot({path:`${out}/${cityId}-${preset}.png`});report.checks.push(`${cityId}/${preset} fixed camera`);}
 }
 const requests=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>r.name));assert(!requests.some(u=>/SourceHan|\.otf|\.ttf|\.woff/.test(u)));report.checks.push('consumer never requests font');assert.equal(report.errors.length,0);report.passed=true;
}catch(e){report.failure=String(e);process.exitCode=1;}finally{await browser.close();await fs.writeFile(out+'/report.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));}
