import {chromium} from 'playwright';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const url=process.env.QA_URL??'http://127.0.0.1:5250/',out=process.env.QA_OUT??'.codex-work/tmp/short-screen-lift/qa';
await mkdir(out,{recursive:true});
const checks=[],errors=[],measurements=[];
const check=(name,value)=>{assert.ok(value,name);checks.push(name);};
const protectedFiles=JSON.parse(await readFile('../docs/changes/20261016-short-screen-lift/protected-haptics.json','utf8'));
for(const [file,sha] of Object.entries(protectedFiles))check(file+' stays byte-identical to working V5.4.1',createHash('sha256').update(await readFile(file)).digest('hex')===sha);
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const context=await browser.newContext({viewport:{width:393,height:715},hasTouch:true,isMobile:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 27_0_1 like Mac OS X) AppleWebKit/605.1.15 Version/27.0.1 Mobile/15E148 Safari/604.1'});
 await context.addInitScript(()=>{Object.defineProperty(navigator,'vibrate',{configurable:true,value:undefined});Object.defineProperty(HTMLInputElement.prototype,'switch',{configurable:true,get(){return this.hasAttribute('switch');}});});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));const cdp=await context.newCDPSession(page);
 await page.goto(url,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:120000});
 await page.evaluate(()=>window.cupViewer.selectArtwork({variant:'beijing-green'}));await page.locator('#open-artwork').tap();
 const state=()=>page.evaluate(()=>window.cupViewer.debug());
 const sheet=()=>page.locator('#artwork-settings').evaluate(e=>({top:e.getBoundingClientRect().top,height:e.getBoundingClientRect().height,scroll:e.scrollTop,bottom:e.getBoundingClientRect().bottom}));
 check('actual iOS gesture branch is exercised',(await state()).haptics.backend==='ios-gesture');
 for(const [width,height] of [[360,640],[375,667],[393,715],[390,844],[420,890]]){
  await page.setViewportSize({width,height});await page.locator('#adjust-color-tab').tap();await page.locator('#artwork-settings').evaluate(e=>e.scrollTop=0);await page.waitForTimeout(380);
  check(`${width}x${height} has no horizontal overflow`,await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth));
  await page.screenshot({path:`${out}/${width}x${height}-rest.png`});
  for(const selector of ['#color-pad','.lightness-control','#material-pad']){
   if(selector==='#material-pad'){await page.locator('#adjust-material-tab').tap();await page.waitForTimeout(350);}
   const el=page.locator(selector),beforeBox=await el.boundingBox(),beforeSheet=await sheet(),before=await state();
   check(`${width}x${height} ${selector} is fully visible on entry`,beforeBox.y>=beforeSheet.top&&beforeBox.y+beforeBox.height<=beforeSheet.bottom-9);
   const control=selector.replace('#','').replace('.lightness-control','lightness'),nativeBefore=before.haptics.surfaces.find(s=>s.control===control);
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:beforeBox.x+beforeBox.width*.5,y:beforeBox.y+beforeBox.height*.6,id:1}]});await page.waitForTimeout(400);
   const active=await el.boundingBox(),activeSheet=await sheet(),scale=await el.evaluate(e=>new DOMMatrixReadOnly(getComputedStyle(e).transform).a);
   check(`${width}x${height} ${selector} restores 1.24 lift`,Math.abs(scale-1.24)<.005);
   check(`${width}x${height} ${selector} lifted bounds remain inside panel`,active.y>=activeSheet.top+9&&active.y+active.height<=activeSheet.bottom-9&&active.x>=8&&active.x+active.width<=width-8);
   check(`${width}x${height} ${selector} starts without moving or scrolling sheet`,Math.abs(activeSheet.top-beforeSheet.top)<1&&Math.abs(activeSheet.height-beforeSheet.height)<1&&activeSheet.scroll===beforeSheet.scroll);
   await page.screenshot({path:`${out}/${width}x${height}-${control}-pressed.png`});
   for(let i=1;i<=10;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:active.x+active.width*(.5+i*.02),y:active.y+active.height*(.6-i*.03),id:1}]});await page.waitForTimeout(65);}
   const during=await state(),native=during.haptics.surfaces.find(s=>s.control===control);
   check(`${width}x${height} ${selector} retains repeated native detents`,native.nativeMoves>nativeBefore.nativeMoves&&native.transitions>=nativeBefore.transitions+2);
   const anchor=await el.locator('.ios-haptic-surface').boundingBox();
   const anchorError=Math.hypot(anchor.x+anchor.width/2-(beforeBox.x+beforeBox.width*.5),anchor.y+anchor.height/2-(beforeBox.y+beforeBox.height*.6));
   check(`${width}x${height} ${selector} preserves native haptic touch coordinates`,anchorError<2);
   check(`${width}x${height} ${selector} drag does not rotate camera`,JSON.stringify(during.camera)===JSON.stringify(before.camera));
   await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(400);
   check(`${width}x${height} ${selector} releases to original size`,Math.abs((await el.boundingBox()).width-beforeBox.width)<1&&!await el.evaluate(e=>e.classList.contains('is-dragging')));
   measurements.push({viewport:[width,height],control,scale,restingSize:[beforeBox.width,beforeBox.height],anchorError,nativeTransitions:native.transitions-nativeBefore.transitions});
  }
 }
 await page.setViewportSize({width:393,height:715});await page.locator('#adjust-color-tab').tap();await page.waitForTimeout(350);await page.emulateMedia({reducedMotion:'reduce'});
 const pad=page.locator('#color-pad'),r=await pad.boundingBox(),quiet=(await state()).haptics.requests;
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:r.x+r.width*.5,y:r.y+r.height*.5,id:2}]});await page.waitForTimeout(200);
 check('short screen still respects reduced motion',await pad.evaluate(e=>getComputedStyle(e).transform==='none')&&(await state()).haptics.requests===quiet);
 await cdp.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});await page.emulateMedia({reducedMotion:'no-preference'});
 check('no application errors',errors.length===0);await context.close();
}finally{
 await writeFile(`${out}/qa.json`,JSON.stringify({url,date:new Date().toISOString(),checks,errors,measurements,physicalMotorVerified:false,environment:'Installed Chrome with iOS capability simulation; layout and native event routing, not motor verification.'},null,2));await browser.close();
}
console.log(JSON.stringify({checks:checks.length,errors,measurements},null,2));
