import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const url=process.env.QA_URL??'http://127.0.0.1:5187/';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:900},deviceScaleFactor:1});
const errors=[],checks=[];page.on('pageerror',e=>errors.push(e.message));
const debug=()=>page.evaluate(()=>window.cupViewer.debug());
const check=(name,value)=>{assert.ok(value,name);checks.push(name);};
try{
 await page.goto(url);await page.waitForFunction(()=>window.cupViewer?.ready());await page.waitForTimeout(700);
 const initial=await debug();check('initial aligned PBR maps loaded',Object.values(initial.regions).every(r=>r.normal&&r.metal&&r.roughness));
 for(const view of ['front','handle','top','bottom','exploded','lid','detail','hero']){
   await page.locator(`[data-view="${view}"]`).click();await page.waitForTimeout(1400);
   check(`UI view ${view}`, (await debug()).view===view);
   if(view==='bottom')check('flipped cup clears ground',(await debug()).bottomClearance>30);
 }
 await page.locator('#auto').click();const auto0=await debug();await page.waitForTimeout(500);const auto1=await debug();
 check('auto rotate moves camera',JSON.stringify(auto0.camera)!==JSON.stringify(auto1.camera));
 await page.mouse.move(650,350);await page.mouse.down();await page.mouse.move(800,440,{steps:12});await page.mouse.up();await page.waitForTimeout(300);
 check('drag stops auto rotation and changes camera',!(await debug()).auto&&JSON.stringify((await debug()).camera)!==JSON.stringify(auto1.camera));
 const distance=s=>Math.hypot(...s.camera.map((v,i)=>v-s.target[i]));const beforeZoom=distance(await debug());await page.mouse.wheel(0,-220);await page.waitForTimeout(400);
 check('wheel zoom',distance(await debug())<beforeZoom);
 await page.locator('#open-settings').click();
 for(const mode of ['clay','normal','metalness','porcelain','pbr']){await page.locator('#material-mode').selectOption(mode);check(`material ${mode}`,(await debug()).mode===mode);}
 await page.locator('#reference-view').selectOption('1220');await page.waitForTimeout(500);check('photo selector applies pose',(await debug()).camera[2]>350);
 await page.locator('#open-settings').click();await page.locator('summary').click();await page.locator('#height').fill('110');await page.locator('#apply-dimensions').click();await page.waitForTimeout(400);
 const resized=await debug();check('dimension edit rebuilds geometry',resized.parameters.height===110&&resized.geometries[0]!==initial.geometries[0]);
 await page.locator('#height').fill('103');await page.locator('#apply-dimensions').click();await page.locator('#close-settings').click();
 const ids=(await debug()).geometries;
 const tile=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=c.height=64;const ctx=c.getContext('2d');ctx.fillStyle='#3c8297';ctx.fillRect(0,0,64,64);return c.toDataURL();});
 const pack=name=>({name,regions:Object.fromEntries(['body','handle','saucer'].map(k=>[k,{baseColor:tile}]))});
 await page.evaluate(p=>window.cupViewer.applyStyle(p),pack('QA flat'));await page.waitForTimeout(200);
 const flat=await debug();check('single image clears obsolete channels',Object.values(flat.regions).every(r=>!r.normal&&!r.metal&&!r.roughness&&r.metalness===0));
 check('single image preserves geometry',JSON.stringify(ids)===JSON.stringify(flat.geometries));
 // Square input is cropped to the ribbon aspect, never stretched to fill it.
 check('flat artwork fit preserves proportions',flat.regions.handle.repeat[0]<.12&&flat.regions.handle.repeat[1]===1);
 const failed=await page.evaluate(async p=>{p.regions.handle.baseColor='data:image/png;base64,broken';try{await window.cupViewer.applyStyle(p);return false;}catch{return true;}},pack('broken'));
 check('failed package retains existing maps',failed&&(await debug()).style==='QA flat');
 const mismatched=await page.evaluate(async p=>{const c=document.createElement('canvas');c.width=8;c.height=8;p.regions.body.normal=c.toDataURL();try{await window.cupViewer.applyStyle(p);return false;}catch{return true;}},pack('wrong alignment'));
 check('mismatched channel resolution is rejected atomically',mismatched&&(await debug()).style==='QA flat');
 await page.evaluate(async([a,b])=>Promise.all([window.cupViewer.applyStyle(a),window.cupViewer.applyStyle(b)]),[pack('race first'),pack('race last')]);
 check('last style request wins',(await debug()).style==='race last');
 await page.evaluate(()=>window.cupViewer.restore());await page.waitForTimeout(300);const stable=await debug();
 for(let i=0;i<5;i++){await page.evaluate(()=>window.cupViewer.restore());await page.waitForTimeout(100);}
 const cycled=await debug();check('five style swaps keep geometry and texture counts stable',JSON.stringify(cycled.memory)===JSON.stringify(stable.memory)&&JSON.stringify(cycled.geometries)===JSON.stringify(ids));
 await page.locator('#reset').click();await page.waitForTimeout(1400);await mkdir('../evidence/final',{recursive:true});await page.screenshot({path:'../evidence/final/desktop.png'});
 await page.setViewportSize({width:390,height:844});await page.locator('#reset').click();await page.waitForTimeout(1400);
 check('mobile no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth));
 await page.screenshot({path:'../evidence/final/mobile.png'});
 await page.locator('#open-settings').click();check('mobile settings stay inside viewport',await page.locator('#settings').evaluate(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight;}));
 await page.locator('#close-settings').click();
 const disposed=await page.evaluate(()=>{window.cupViewer.dispose();return window.cupViewer.debug().memory;});check('dispose frees GPU geometries',disposed.geometries===0);
 check('no runtime errors',errors.length===0);
 await writeFile('../evidence/browser-qa.json',JSON.stringify({url,date:new Date().toISOString(),checks,errors,initialMemory:initial.memory,stableMemory:cycled.memory,disposedMemory:disposed},null,2));
 console.log(JSON.stringify({passed:checks.length,errors,memory:cycled.memory},null,2));
}finally{await browser.close();}
