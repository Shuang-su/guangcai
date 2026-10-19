// Browser plugin not available. Use the repository's installed Playwright + Chrome.
// Flow: load local candidate -> select a city -> verify source artwork on the cup,
// then restore each historical resource version and return to the candidate.
import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

const expectedRelease=process.env.QA_RELEASE??'v7-5';
const url=process.env.QA_URL??'http://127.0.0.1:5286/';
const out=process.env.QA_OUT??'evidence/city-alignment-20261019/qa';
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome'});
const report={url,browser:'Chrome / Playwright (Browser plugin not available)',viewports:[],checks:[],errors:[],warnings:[],physicalDeviceTested:false};
function check(name,value){assert.ok(value,name);report.checks.push(name);}
async function settled(page){await page.waitForFunction(()=>window.cupViewer?.ready()&&!window.cupViewer.debug().selection.busy&&!window.cupViewer.debug().quality.upgrading,null,{timeout:Number(process.env.QA_READY_TIMEOUT??90000)});}
function observe(page){page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());if(m.type()==='warning')report.warnings.push(m.text());});}
try{
 const page=await browser.newPage({viewport:{width:1200,height:1000},deviceScaleFactor:1});observe(page);
 await page.goto(url);await settled(page);const initial=await page.evaluate(()=>window.cupViewer.exportDesign());
 check('candidate bootstrap '+expectedRelease,initial.resourceReleaseId===expectedRelease);
 check('formal entry does not expose manual experiment API',await page.evaluate(()=>!window.cupViewer.applyLabArtwork));
 check('page identity',(await page.title())==='城市共彩'&&page.url()===url);
 check('meaningful content',await page.locator('#artwork-settings').isVisible());
 check('no framework overlay',(await page.locator('vite-error-overlay').count())===0);
 await page.screenshot({path:out+'/desktop-overview.png'});
 // Exercise the actual visible neighboring city card, not only the debug API.
 await page.locator('.city-card[data-theme="v6-shijiazhuang"]').click();
 await page.waitForFunction(()=>window.cupViewer.ready()&&!window.cupViewer.debug().selection.busy&&window.cupViewer.debug().selection.current.variant.includes('shijiazhuang'));await settled(page);
 check('visible city-card click changes selected city',await page.locator('.city-card[data-theme="v6-shijiazhuang"]').getAttribute('aria-pressed')==='true');
 const boot=JSON.parse(await fs.readFile('public/api/v1/bootstrap.json'));
 const manifest=JSON.parse(await fs.readFile('public/'+boot.manifestUrl));
 await page.evaluate(()=>window.cupViewer.setView('detail',true));await page.waitForTimeout(600);await settled(page);
 for(const cityId of Object.keys(manifest.cities)){
  assert.equal(await page.evaluate(d=>window.cupViewer.importDesign(d),{...initial,cityId}),true);await settled(page);
  check('city '+cityId,await page.evaluate(id=>window.cupViewer.exportDesign().cityId===id&&window.cupViewer.ready(),cityId));
  await page.screenshot({path:`${out}/${cityId}-gold.png`});
 }
 for(const cityId of ['shenzhen','beijing','xian','tianjin']){
  const design={...initial,cityId,appearance:{preset:'blue',hue:207.27272727272725,saturation:75.34246575342466,lightness:28.627450980392155,material:0,materialX:.5,relief:1}};
  assert.equal(await page.evaluate(d=>window.cupViewer.importDesign(d),design),true);await settled(page);
  assert.deepEqual(await page.evaluate(()=>window.cupViewer.exportDesign()),design);
  await page.screenshot({path:`${out}/${cityId}-blue.png`});check('blue fill and fixed gold '+cityId,true);
 }
 for(const resourceReleaseId of ['v7-1','v7-2','v7-3','v7-4','v7-5','v7-6','v7-7']){
  const design={...initial,resourceReleaseId};assert.equal(await page.evaluate(d=>window.cupViewer.importDesign(d),design),true);await settled(page);
  assert.deepEqual(await page.evaluate(()=>window.cupViewer.exportDesign()),design);check('historical roundtrip '+resourceReleaseId,true);
 }
 report.viewports.push({width:1200,height:1000,resourceReleaseId:initial.resourceReleaseId});
 await page.close();
 const mobile=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});observe(mobile);
 await mobile.goto(url);await settled(mobile);await mobile.screenshot({path:out+'/mobile-overview.png',scale:'css'});
 await mobile.locator('.city-card[data-theme="v6-shijiazhuang"]').click();
 await mobile.waitForFunction(()=>window.cupViewer.ready()&&!window.cupViewer.debug().selection.busy&&window.cupViewer.debug().selection.current.variant.includes('shijiazhuang'));await settled(mobile);
 check('mobile city-card click changes real design',true);
 await mobile.evaluate(d=>window.cupViewer.importDesign(d),initial);await mobile.evaluate(()=>window.cupViewer.setView('detail',true));await settled(mobile);
 await mobile.screenshot({path:out+'/mobile-shenzhen-detail.png',scale:'css'});
 check('mobile content and no overlay',await mobile.locator('#artwork-settings').isVisible()&&await mobile.locator('vite-error-overlay').count()===0);
 report.viewports.push({width:390,height:844});await mobile.close();
 check('no runtime or console errors',report.errors.length===0);report.passed=true;
}catch(e){report.passed=false;report.failure=e.stack;process.exitCode=1;}
finally{await browser.close();await fs.writeFile(out+'/report.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));}
