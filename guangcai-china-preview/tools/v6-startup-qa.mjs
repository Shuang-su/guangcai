import {chromium,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const url=process.env.QA_URL??'http://127.0.0.1:5260/',out=process.env.QA_OUT??'.codex-work/tmp/v6-qa/startup';
await mkdir(out,{recursive:true});const results=[];
for(const engine of ['chromium','webkit']){
 const browser=await (engine==='webkit'?webkit.launch({headless:true}):chromium.launch({channel:'chrome',headless:true}));
 const page=await browser.newPage({viewport:{width:393,height:852},deviceScaleFactor:3,isMobile:true,hasTouch:true,...(engine==='webkit'?{userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 26_6 like Mac OS X) AppleWebKit/605.1.15 Version/26.6 Mobile/15E148 Safari/604.1'}:{})});
 const errors=[],checks=[];page.on('pageerror',e=>errors.push(e.message));
 const check=(name,ok)=>{checks.push({name,passed:!!ok});assert.ok(ok,`${engine}: ${name}`);};
 let release;const pending=new Promise(resolve=>{release=resolve;});
 try{
  await page.route('**/textures/fixed-*-normal-*.hfn.gz',async route=>{await pending;await route.continue();});
  await page.goto(url,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.cupViewer&&document.querySelector('#color-tab'),null,{timeout:60000});
  check('initial panel is interactive before all assets arrive',await page.locator('#artwork-settings').evaluate(e=>!e.inert));
  await page.locator('#color-tab').tap();await page.waitForTimeout(700);
  check('touch changes menu while floral textures are pending',await page.locator('#artwork-settings').getAttribute('data-pane')==='color');
  await page.locator('.open-palette-editor').tap();await page.waitForTimeout(700);
  check('editor opens before asset readiness',await page.locator('#artwork-settings').getAttribute('data-level')==='editor');
  await page.locator('#palette-back').tap();await page.waitForTimeout(700);
  await page.waitForFunction(()=>!window.cupViewer.debug().selection.busy,null,{timeout:Number(process.env.QA_READY_TIMEOUT??120000)});
  check('status identifies outstanding floral assets',await page.locator('#status').textContent().then(s=>s.includes('花纹')&&!s.includes('深圳')));
  check('scene is not falsely marked fully loaded',await page.evaluate(()=>!window.cupViewer.ready()));
  await page.screenshot({path:`${out}/${engine}-loading-interactive.png`,scale:'css'});
  release();await page.waitForFunction(()=>window.cupViewer.ready(),null,{timeout:Number(process.env.QA_READY_TIMEOUT??120000)});
  check('status clears once startup actually completes',await page.locator('#status').textContent()==='');
  for(let round=0;round<3;round++){
   // Move through both editors while the city list is display:none long
   // enough for its ResizeObserver to receive the zero-sized hidden box.
   await page.locator('#material-tab').tap();await page.waitForTimeout(700);
   await page.locator('#material-pad').tap({position:{x:75+round*5,y:90}});await page.waitForTimeout(500);
   await page.locator('#slogan-tab').tap();await page.waitForTimeout(700);
   const remembered=await page.locator('.city-cards').evaluate(e=>Number.parseFloat(e.style.getPropertyValue('--city-card-size')));
   check(`round ${round}: hidden cities retain positive cached size`,remembered>40);
   await page.locator('#city-tab').tap();await page.waitForTimeout(160);
   const target=await page.locator('#artwork-settings').evaluate(e=>{
    const animation=e.getAnimations().find(a=>a.effect?.getKeyframes().some(k=>k.height));
    return animation?parseFloat(animation.effect.getKeyframes().at(-1).height):e.getBoundingClientRect().height;
   });
   await page.waitForTimeout(700);
   const geometry=await page.locator('#artwork-settings').evaluate(e=>{
    const card=e.querySelector('.city-card[aria-pressed=true]').getBoundingClientRect(),tabs=e.querySelector('.creator-tabs').getBoundingClientRect();
    return {height:e.getBoundingClientRect().height,card:{width:card.width,height:card.height,bottom:card.bottom},tabsTop:tabs.top};
   });
   check(`round ${round}: city transition targets its final height`,Math.abs(target-geometry.height)<1);
   check(`round ${round}: city card stays square`,Math.abs(geometry.card.width-geometry.card.height)<1);
   check(`round ${round}: cards clear the menu`,geometry.card.bottom<geometry.tabsTop);
   await page.screenshot({path:`${out}/${engine}-city-return-${round}.png`,scale:'css'});
   await page.locator('#color-tab').tap();await page.waitForTimeout(700);
  }
  check('root and body retain the backdrop for browser edge sampling',await page.evaluate(()=>[document.documentElement,document.body].every(e=>getComputedStyle(e).backgroundImage.includes('soft-light-v3'))));
  check('standalone viewport metadata',await page.locator('meta[name=apple-mobile-web-app-status-bar-style]').getAttribute('content')==='black-translucent');
  check('zero runtime errors',errors.length===0);
  results.push({engine,version:await browser.version(),checks,errors});
 }catch(error){await page.screenshot({path:`${out}/${engine}-failure.png`,scale:'css'});throw error;}
 finally{release();await browser.close();}
}
await writeFile(`${out}/startup-qa.json`,JSON.stringify({status:'passed',url,results,physicalIOS:'pending device retest; browser chrome cannot be asserted by desktop WebKit'},null,2));
console.log(results.map(r=>({engine:r.engine,checks:r.checks.length,errors:r.errors})));
