import {chromium,webkit} from 'playwright';import fs from 'node:fs/promises';import assert from 'node:assert/strict';
const url=process.env.QA_URL??'http://127.0.0.1:5271/',out=process.env.QA_OUT??'evidence/v7.1.3/qa/floral',engine=process.env.QA_WEBKIT?'webkit':'chrome';await fs.mkdir(out,{recursive:true});
const browser=engine==='webkit'?await webkit.launch():await chromium.launch({channel:'chrome'}),report={engine,url,checks:[],errors:[],versions:[],physicalIPhoneTested:false};let page,activePage;
const check=(name,value)=>{assert(value,name);report.checks.push(name);};
async function ready(p){if(await p.evaluate(()=>document.hidden))await p.bringToFront();await p.waitForFunction(()=>window.cupViewer?.ready()&&!window.cupViewer.debug().selection.busy&&!window.cupViewer.debug().quality.upgrading,null,{timeout:120000});}
try{
 page=activePage=await browser.newPage({viewport:{width:1100,height:1100}});page.on('pageerror',e=>report.errors.push(e.message));await page.goto(url);await ready(page);const initial=await page.evaluate(()=>window.cupViewer.exportDesign());
 for(const releaseId of ['v7-3','v7-4','v7-1','v7-4','v7-2','v7-4','v7-3','v7-4']){
  check('import '+releaseId,await page.evaluate(d=>window.cupViewer.importDesign(d),{...initial,resourceReleaseId:releaseId}));await ready(page);
  const state=await page.evaluate(()=>({design:window.cupViewer.exportDesign(),debug:window.cupViewer.debug(),fixed:window.cupViewer.fixedPrecision()})),mapping=releaseId==='v7-4'?'source-layout-v4':'source-layout-v3';
  check(releaseId+' complete mapping',state.debug.fixedMapping===mapping&&Object.values(state.fixed).every(r=>r.mapping===mapping&&r.repeat[0]===(releaseId==='v7-4'?-1:1)));
  check(releaseId+' exact design',JSON.stringify(state.design)===JSON.stringify({...initial,resourceReleaseId:releaseId}));
  check(releaseId+' bounded steady memory',state.debug.resources.estimatedGpuBytes+state.debug.resources.reservedRenderTargetBytes<=state.debug.resources.steadyBudget);
  report.versions.push({releaseId,mapping,activeEntries:state.debug.resources.activeEntries,precision:state.fixed});
 }
 for(const releaseId of ['v7-3','v7-4']){
  await page.evaluate(d=>window.cupViewer.importDesign(d),{...initial,resourceReleaseId:releaseId});await ready(page);
  const poses=[['side',90,3,290,60,33],['upper',75,24,245,76,33],['upper-under',135,-4,190,83,33],['lower',105,-8,245,36,33],['saucer-front',0,4,210,14,40],['saucer-back',180,4,210,14,40]];
  for(const [name,yaw,pitch,distance,targetY,fov]of poses){await page.evaluate(p=>window.cupViewer.setCalibration(p),{yaw,pitch,distance,targetY,fov,cupYaw:0,roll:0,cx:.5,cy:.5});await page.waitForTimeout(800);await ready(page);await page.screenshot({path:`${out}/${releaseId}-${name}.png`});}
  await page.evaluate(()=>window.cupViewer.setView('exploded',true));await page.waitForTimeout(900);await page.screenshot({path:`${out}/${releaseId}-exploded.png`});
 }
 // Fresh context ensures the old body files cannot be served from the encoded cache.
 const fault=await browser.newPage({viewport:{width:393,height:852},isMobile:true,hasTouch:true});activePage=fault;fault.on('pageerror',e=>report.errors.push(e.message));await fault.goto(url);await ready(fault);const before=await fault.evaluate(()=>window.cupViewer.exportDesign());
 await fault.route('**/v7-1/assets/fixed-body-light-*',r=>r.fulfill({status:404,body:'test missing resource'}));
 const failed=await fault.evaluate(async d=>{try{await window.cupViewer.importDesign({...d,resourceReleaseId:'v7-1'});return false;}catch{return true;}},before);await ready(fault);check('404 rejects import',failed);check('404 retains original complete work',JSON.stringify(await fault.evaluate(()=>window.cupViewer.exportDesign()))===JSON.stringify(before));check('404 retains v4 mapping',await fault.evaluate(()=>window.cupViewer.debug().fixedMapping==='source-layout-v4'));await fault.unroute('**/v7-1/assets/fixed-body-light-*');
 // Invalid atlas is rejected at application after staging all candidate resources.
 await fault.route('**/v7-1/manifest-*.json',async r=>{const response=await r.fetch(),json=await response.json();json.fixed.saucer.light.atlas.gutter=1;await r.fulfill({response,json});});
 check('staged invalid atlas rolls back',await fault.evaluate(async d=>{try{await window.cupViewer.importDesign({...d,resourceReleaseId:'v7-1'});return false;}catch{return true;}},before));await ready(fault);check('rollback mapping and parameters',await fault.evaluate(d=>JSON.stringify(window.cupViewer.exportDesign())===JSON.stringify(d)&&window.cupViewer.fixedPrecision().body.mapping==='source-layout-v4',before));await fault.unroute('**/v7-1/manifest-*.json');
 // Pause one manifest response; public changes/exports cannot observe a mixed version.
 let release;const delayed=new Promise(resolve=>release=resolve);let requested;const seen=new Promise(resolve=>requested=resolve);
 await fault.route('**/v7-1/manifest-*.json',async r=>{requested();await delayed;await r.continue().catch(()=>{});});
 await fault.evaluate(d=>{window.importOutcome=null;window.cupViewer.importDesign({...d,resourceReleaseId:'v7-1'}).then(()=>window.importOutcome='ok',()=>window.importOutcome='cancelled');},before);await seen;
 check('pending work hidden and immutable',await fault.evaluate(()=>document.querySelector('#app').inert&&window.cupViewer.debug().importing&&!window.cupViewer.ready()));
 check('pending export rejects',await fault.evaluate(()=>{try{window.cupViewer.exportDesign();return false;}catch{return true;}}));
 check('pending selection rejected',await fault.evaluate(()=>window.cupViewer.selectArtwork({variant:'v6-beijing-gold'}))===false);
 check('concurrent import rejected',await fault.evaluate(async d=>{try{await window.cupViewer.importDesign(d);return false;}catch{return true;}},before));
 await fault.evaluate(()=>{window.loss=document.querySelector('#viewport').getContext('webgl2').getExtension('WEBGL_lose_context');window.loss.loseContext();});await fault.waitForTimeout(150);release();await fault.unroute('**/v7-1/manifest-*.json');await fault.evaluate(()=>window.loss.restoreContext());await ready(fault);
 check('context loss cancels pending version',await fault.evaluate(()=>window.importOutcome==='cancelled'));await fault.waitForFunction(d=>{const v=window.cupViewer,s=v.debug();return !s.selection.busy&&!s.quality.upgrading&&JSON.stringify(v.exportDesign())===JSON.stringify(d)&&s.fixedMapping==='source-layout-v4';},before,{timeout:30000});check('context restores committed version and mapping',true);
 await fault.close();check('no application exceptions',report.errors.length===0);report.passed=true;
}catch(e){report.failure=e.stack;report.state=await activePage?.evaluate(()=>window.cupViewer?.debug()).catch(()=>null);process.exitCode=1;}finally{await browser.close();await fs.writeFile(out+'/report.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({passed:report.passed,checks:report.checks.length,failure:report.failure}));}
