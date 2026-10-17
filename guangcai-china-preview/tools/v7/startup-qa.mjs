import {chromium,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const url=process.env.QA_URL??'http://127.0.0.1:5276/',out=process.env.QA_OUT??'.codex-work/tmp/v7-preview/startup';
await mkdir(out,{recursive:true});const results=[];
for(const engine of ['chromium','webkit']){
 const browser=await (engine==='webkit'?webkit.launch({headless:true}):chromium.launch({channel:'chrome',headless:true}));
 const page=await browser.newPage({viewport:{width:375,height:812},deviceScaleFactor:2,isMobile:true,hasTouch:true,...(engine==='webkit'?{userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1'}:{})});
 const errors=[],checks=[];page.on('pageerror',e=>errors.push(e.message));
 const check=(name,ok)=>{checks.push({name,passed:!!ok});assert.ok(ok,`${engine}: ${name}`);};
 let openCatalog;const catalogPending=new Promise(resolve=>{openCatalog=resolve;});
 let release;const pending=new Promise(resolve=>{release=resolve;});
 try{
  await page.route('**/api/v1/bootstrap.json',async route=>{await catalogPending;await route.continue();});
  await page.route('**/assets/fixed-saucer-light-normal-*.hfn.gz',async route=>{await pending;await route.continue();});
  await page.goto(url,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.cupViewer&&document.querySelector('#color-tab'),null,{timeout:60000});
  check('design is locked while startup is incomplete',await page.locator('#app').evaluate(e=>e.inert));
  await page.evaluate(()=>{void window.cupViewer.selectArtwork({variant:'v6-beijing-gold'});void window.cupViewer.selectArtwork({variant:'v6-shanghai-gold'});});
  check('pre-catalog selection does not load legacy maps',await page.evaluate(()=>!performance.getEntriesByType('resource').some(r=>/\/(fixed|textures|cities\/v[456])\//.test(r.name))));
  openCatalog();
  check('entry page hides the unfinished cup',await page.locator('#app').evaluate(e=>e.inert&&getComputedStyle(e).visibility==='hidden'));
  check('entry progress is visible',await page.locator('#entry-loading').isVisible());
  await page.waitForFunction(()=>!window.cupViewer.debug().selection.busy,null,{timeout:120000});
  check('latest early selection survives resource bootstrap',await page.evaluate(()=>window.cupViewer.debug().selection.current.variant==='v6-shanghai-gold'));
  const progress=await page.evaluate(()=>window.cupViewer.debug().entryLoading);
  check('real received bytes advance before readiness',progress.received>0&&progress.received<progress.total&&progress.completed<progress.count);
  check('graphics memory has a labelled estimate',await page.locator('#entry-graphics').textContent().then(s=>s.includes('MiB')));
  check('scene is not falsely marked fully loaded',await page.evaluate(()=>!window.cupViewer.ready()));
  await page.screenshot({path:`${out}/${engine}-loading-interactive.png`,scale:'css'});
  release();await page.waitForFunction(()=>window.cupViewer.ready(),null,{timeout:120000});
  check('entry disappears only after complete rendering',await page.locator('#entry-loading').isHidden()&&await page.locator('#app').evaluate(e=>!e.inert&&getComputedStyle(e).visibility==='visible'));
  check('status clears once startup actually completes',await page.locator('#status').textContent()==='');
  for(let round=0;round<3;round++){
   // Move through both editors while the city list is display:none long
   // enough for its ResizeObserver to receive the zero-sized hidden box.
   await page.locator('#color-tab').tap();await page.waitForTimeout(700);
   await page.locator('#material-tab').tap();await page.waitForTimeout(700);
   await page.locator('#material-pad').tap({position:{x:75+round*5,y:90}});await page.waitForTimeout(500);
   await page.locator('#slogan-tab').tap();await page.waitForTimeout(700);
   const remembered=await page.locator('.city-cards').evaluate(e=>Number.parseFloat(e.style.getPropertyValue('--city-card-size')));
   check(`round ${round}: hidden cities retain positive cached size`,remembered>40);
   await page.locator('#city-tab').tap();await page.waitForFunction(()=>document.querySelector('#artwork-settings').dataset.pane==='city');
   const target=await page.locator('#artwork-settings').evaluate(e=>{
    const animation=e.getAnimations().find(a=>a.effect?.getKeyframes().some(k=>k.height));
    return animation?parseFloat(animation.effect.getKeyframes().at(-1).height):e.getBoundingClientRect().height;
   });
   await page.waitForTimeout(700);
   const geometry=await page.locator('#artwork-settings').evaluate(e=>{
    const card=e.querySelector('.city-card[aria-pressed=true]').getBoundingClientRect(),tabs=e.querySelector('.creator-tabs').getBoundingClientRect();
    return {height:e.getBoundingClientRect().height,card:{width:card.width,height:card.height,bottom:card.bottom},tabsTop:tabs.top};
   });
   console.log(JSON.stringify({engine,round,target,finalHeight:geometry.height}));
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
 finally{openCatalog();release();await browser.close();}
}
await writeFile(`${out}/startup-qa.json`,JSON.stringify({status:'passed',url,results,physicalIOS:'pending device retest; browser chrome cannot be asserted by desktop WebKit'},null,2));
console.log(results.map(r=>({engine:r.engine,checks:r.checks.length,errors:r.errors})));
