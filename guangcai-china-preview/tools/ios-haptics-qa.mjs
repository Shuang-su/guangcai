import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const url=process.env.QA_URL??'http://127.0.0.1:5250/';
const out=process.env.QA_OUT??'.codex-work/tmp/ios-haptics/qa';await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true}),results=[];
try{
 for(const backend of ['vibration','ios-label','ios-gesture']){
  const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,
   userAgent:backend==='ios-gesture'?'Mozilla/5.0 (iPhone; CPU iPhone OS 26_5 like Mac OS X) AppleWebKit/605.1.15 Version/26.5 Mobile/15E148 Safari/604.1':'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 Version/18.6 Mobile/15E148 Safari/604.1'});
  await context.addInitScript(mode=>{
   window.motorRequests=[];
   Object.defineProperty(navigator,'vibrate',{configurable:true,value:mode==='vibration'?(n=>{window.motorRequests.push(n);return true;}):undefined});
   if(mode!=='vibration')Object.defineProperty(HTMLInputElement.prototype,'switch',{configurable:true,get(){return this.hasAttribute('switch');}});
   // Chromium has the newer untrusted label-forwarding semantics. Model the old
   // WebKit capability probe only; real control events retain their real trust.
   if(mode==='ios-label'){
    const add=HTMLLabelElement.prototype.addEventListener;
    HTMLLabelElement.prototype.addEventListener=function(type,listener,options){
     if(type==='click'&&this.hidden&&this.querySelector('input:not([switch])')){
      const wrapped=event=>listener.call(this,new Proxy(event,{get(target,key){if(key==='isTrusted')return true;const value=Reflect.get(target,key,target);return typeof value==='function'?value.bind(target):value;}}));
      return add.call(this,type,wrapped,options);
     }
     return add.call(this,type,listener,options);
    };
   }
  },backend);
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  const record={backend,checks:[],errors};results.push(record);const check=(name,value)=>{assert.ok(value,name);record.checks.push(name);};
  const state=()=>page.evaluate(()=>window.cupViewer.debug());
  await page.goto(url,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:120000});
  check('selected capability path',(await state()).haptics.backend===backend);
  check('document body remains native',await page.evaluate(()=>document.body.tagName==='BODY'&&!Object.hasOwn(document,'body')));
  check('scoped surfaces only',(await page.locator('.ios-haptic-surface').count())===(backend==='vibration'?0:3));
  if(backend==='ios-label')await page.locator('#adjust-material-tab,#adjust-color-tab').evaluateAll(buttons=>buttons.forEach(button=>{
   const handle=button.onclick;button.onclick=function(event){return handle.call(this,new Proxy(event,{get(target,key){if(key==='pointerType')return undefined;const value=Reflect.get(target,key,target);return typeof value==='function'?value.bind(target):value;}}));};
  }));
  await page.evaluate(()=>window.cupViewer.selectArtwork({variant:'beijing-green'}));await page.locator('#open-artwork').tap();
  await page.waitForTimeout(100);
  const initial=(await state()).haptics.requests;await page.locator('#adjust-material-tab').tap();await page.waitForTimeout(400);
  check('tab activates once with one request',(await state()).haptics.requests===initial+1&&await page.locator('#adjust-material-tab').getAttribute('aria-selected')==='true');
  await page.locator('#adjust-material-tab').tap();check('same tab has no repeated pulse',(await state()).haptics.requests===initial+1);
  await page.locator('#adjust-color-tab').tap();await page.waitForTimeout(400);
  const keyboardBefore=(await state()).haptics.requests;await page.locator('#adjust-material-tab').focus();await page.keyboard.press('Enter');
  check('keyboard button activation does not vibrate',(await state()).haptics.requests===keyboardBefore);await page.locator('#adjust-color-tab').tap();await page.waitForTimeout(400);
  await page.evaluate(()=>{
   window.switchMoves=[];
   document.addEventListener('pointerdown',event=>{window.hapticOrigin={x:event.clientX,y:event.clientY};},{capture:true});
   document.addEventListener('touchmove',event=>{
    const input=event.target;if(!(input instanceof HTMLInputElement)||!input.hasAttribute('data-haptic-switch'))return;
    const rect=input.parentElement.getBoundingClientRect(),origin=window.hapticOrigin;
    window.switchMoves.push({direction:getComputedStyle(input).direction,trusted:event.isTrusted,defaultPrevented:event.defaultPrevented,anchorError:Math.hypot(rect.x+rect.width/2-origin.x,rect.y+rect.height/2-origin.y)});
   },{passive:true});
  });
  const cdp=await context.newCDPSession(page);
  async function drag(selector){
   const el=page.locator(selector),before=await el.boundingBox();assert.ok(before);let x=before.x+before.width*.4,y=before.y+before.height*.5;
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]});await page.waitForTimeout(200);
   if(backend!=='vibration'&&!(await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches))){
    const target=await el.locator('[data-haptic-switch]').boundingBox();
    check(selector+' keeps full native target through touchstart',target.width>=before.width*.9&&target.height>=before.height*.9);
   }
   const active=await el.boundingBox();
   for(let i=1;i<=12;i++){x=active.x+active.width*(.4+i*.035);y=active.y+active.height*(.5-i*.02);await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y,id:1}]});await page.waitForTimeout(65);}
   await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(150);
  }
  const before=await state();await drag('#color-pad');const after=await state();
  check('drag changes colour',after.selection.current.appearance.hue!==before.selection.current.appearance.hue);
  check('detents request feedback',after.haptics.requests>=before.haptics.requests+3);
  if(backend!=='vibration'){
   const native=after.haptics.surfaces.find(s=>s.control==='color-pad');
   check('native touchmove consumes repeated detents',native.nativeMoves>=5&&native.transitions>=3);
   const moves=await page.evaluate(()=>window.switchMoves);
   check('real native target alternates in touchmove without cancelling default',moves.every(m=>m.trusted&&!m.defaultPrevented)&&moves.filter((m,i)=>i&&m.direction!==moves[i-1].direction).length>=3);
   check('native anchor survives control lift and scale',moves.every(m=>m.anchorError<2));
  }
  check('camera does not rotate during a control drag',JSON.stringify(after.camera)===JSON.stringify(before.camera));
  check('gesture release clears active state',!(await page.locator('#color-pad').getAttribute('class')).includes('is-dragging'));
  await page.locator('#adjust-material-tab').tap();await page.waitForTimeout(400);
  const materialBefore=await state();await drag('#material-pad');const materialAfter=await state();
  check('material drag changes physical parameters',materialAfter.selection.current.appearance.materialX!==materialBefore.selection.current.appearance.materialX);
  if(backend!=='vibration')check('material drag reaches repeated native transitions',materialAfter.haptics.surfaces.find(s=>s.control==='material-pad').transitions>=3);
  await page.locator('#adjust-color-tab').tap();await page.waitForTimeout(400);
  const lightBefore=await state();await drag('.lightness-control');const lightAfter=await state();
  check('lightness still changes',lightAfter.selection.current.appearance.lightness!==lightBefore.selection.current.appearance.lightness);
  check('lightness detents request feedback',lightAfter.haptics.requests>lightBefore.haptics.requests);
  const pad=await page.locator('#color-pad').boundingBox();await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:pad.x+pad.width*.5,y:pad.y+pad.height*.5,id:2}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});await page.waitForTimeout(150);
  check('touch cancellation clears active state',!(await page.locator('#color-pad').getAttribute('class')).includes('is-dragging'));
  await page.screenshot({path:`${out}/${backend}.png`,scale:'css'});
  await page.emulateMedia({reducedMotion:'reduce'});const quiet=(await state()).haptics.requests;await drag('#color-pad');
  check('reduced motion suppresses requests',(await state()).haptics.requests===quiet);
  if(backend!=='vibration')check('reduced motion removes native gesture interception',await page.locator('.ios-haptic-surface').evaluateAll(nodes=>nodes.every(n=>getComputedStyle(n).pointerEvents==='none')));
  await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('#close-artwork').tap();
  check('latest city options preserved',await page.locator('[data-theme]').count()===26);
  check('no application errors',errors.length===0);record.finalHaptics=(await state()).haptics;
  await page.evaluate(()=>window.cupViewer.dispose());
  check('app disposal removes all native helpers',await page.locator('[data-haptic-switch],[data-haptic-legacy]').count()===0);
  await context.close();
 }
}finally{await writeFile(`${out}/qa.json`,JSON.stringify({url,results,physicalMotor:false,environment:'Installed Chrome with capability simulation; this validates event routing and state, not iOS motor output.',date:new Date().toISOString()},null,2));await browser.close();}
console.log(JSON.stringify(results.map(r=>({backend:r.backend,checks:r.checks.length,errors:r.errors}))));
