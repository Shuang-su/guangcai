// Browser plugin is absent. Use the repository Playwright workflow; no device claim.
import {chromium,webkit} from 'playwright';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import {createHash} from 'node:crypto';
const url=process.env.QA_URL??'http://127.0.0.1:5274/',out=process.env.QA_OUT??'.codex-work/tmp/v7-qa/final';await fs.mkdir(out,{recursive:true});
const browser=process.env.QA_WEBKIT?await webkit.launch({headless:true}):await chromium.launch({channel:'chrome',headless:true});
let expectedNetworkFailure=false;let activePage;
async function bounded(name,promise){let timer;try{return await Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Timed out: '+name)),45000);})]);}catch(e){report.timeoutDebug=await Promise.race([activePage.evaluate(()=>({hidden:document.hidden,resources:window.cupViewer.debug().resources})),new Promise(resolve=>setTimeout(()=>resolve({unavailable:true}),2000))]);throw e;}finally{clearTimeout(timer);}}
const report={engine:process.env.QA_WEBKIT?'Desktop WebKit with mobile policy':'Chrome',url,checks:[],errors:[],metrics:{},physicalIPhoneTested:false};
function check(name,value){report.checks.push({name,passed:!!value});if(report.checks.length%10===0)console.log('checks',report.checks.length,name);assert.ok(value,name);}
try{
 const page=await browser.newPage({viewport:{width:375,height:812},deviceScaleFactor:2,isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1'});
 activePage=page;
 if(process.env.QA_ASSET_BASE)await page.addInitScript(base=>{window.GUANGCAI_CONFIG={assetBase:base};},process.env.QA_ASSET_BASE);
 page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('404')&&!(expectedNetworkFailure&&m.text().includes('net::ERR_FAILED')))report.errors.push(m.text().slice(0,1500));});
 console.log('loading',url);const started=performance.now();await bounded('navigation',page.goto(url,{waitUntil:'domcontentloaded'}));if(await page.evaluate(()=>document.hidden))await bounded('foreground',page.bringToFront());await bounded('initial readiness',page.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:60000,polling:100}));
 report.metrics.unthrottledReadyMs=Math.round(performance.now()-started);const read=()=>page.evaluate(()=>window.cupViewer.debug());let state=await read();
 check('correct page and meaningful content',(await page.title())==='城市共彩'&&await page.locator('#artwork-settings').isVisible());
 check('no framework overlay',await page.locator('vite-error-overlay').count()===0);
 check('light first render and preserved reflections',state.quality.cityTier==='light'&&state.reflections.enabled&&state.reflections.resolution===512&&state.lidReflections.resolution===1024);
 check('initial texture budget',state.resources.estimatedGpuBytes<64*1024**2);check('initial model GPU estimate within steady budget',state.resources.estimatedGpuBytes+state.resources.reservedRenderTargetBytes<=state.resources.steadyBudget);
 report.metrics.initial={quality:state.quality,resources:state.resources,renderTargets:state.renderTargets};
 const requests=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({url:r.name,encoded:r.encodedBodySize,decoded:r.decodedBodySize})));
 check('consumer never requests legacy large texture paths',!requests.some(r=>/\/(fixed|textures|cities\/v[456])\//.test(r.url)));
 report.metrics.initialResourceEncodedBytes=requests.reduce((n,r)=>n+r.encoded,0);
 check('all 23 low cities and six slogans ready before entry',state.preload.readyCities===23&&state.preload.slogans===6&&state.entryLoading.completed===state.entryLoading.count);
 check('encoded startup matches declared preload plus UI and code',report.metrics.initialResourceEncodedBytes<=state.entryLoading.total+2*1024**2);
 report.metrics.original5MiBTargetMet=report.metrics.initialResourceEncodedBytes<5*1024**2;
 await page.waitForTimeout(1300);await page.screenshot({path:out+'/mobile-city.png',scale:'css'});
 const f1=(await read()).quality.renderFrames;await page.waitForTimeout(1000);check('stationary model stops rendering',(await read()).quality.renderFrames===f1);
 const beforeDesign=await page.evaluate(()=>window.cupViewer.exportDesign());
 await page.evaluate(()=>window.cupViewer.setView('detail',true));await page.waitForFunction(()=>window.cupViewer.debug().quality.cityTier==='standard'&&!window.cupViewer.debug().quality.upgrading,null,{timeout:30000});
 check('near view preserves design',JSON.stringify(await page.evaluate(()=>window.cupViewer.exportDesign()))===JSON.stringify(beforeDesign));
 state=await read();check('near view stays within mobile budget',state.resources.estimatedGpuBytes+state.resources.reservedRenderTargetBytes<=state.resources.steadyBudget);report.metrics.near={quality:state.quality,resources:state.resources};await page.screenshot({path:out+'/mobile-detail.png',scale:'css'});
 await page.evaluate(()=>window.cupViewer.setView('flowers',true));await page.waitForFunction(()=>window.cupViewer.debug().quality.fixedTiers.saucer==='standard'&&!window.cupViewer.debug().quality.upgrading,null,{timeout:30000});await page.screenshot({path:out+'/mobile-flowers.png',scale:'css'});check('flower focus promotes only inspected region',(await read()).quality.fixedTiers.body==='light');
 await page.evaluate(()=>window.cupViewer.setView('front',true));await page.waitForTimeout(600);await page.screenshot({path:out+'/mobile-lettering.png',scale:'css'});
 const cities=Object.keys(JSON.parse(await fs.readFile('src/styles/city-catalog-v6.json')).cities);
 await page.evaluate(async ids=>{await Promise.all(ids.map(id=>window.cupViewer.selectArtwork({variant:`v6-${id}-gold`})) );},cities);
 check('last fast city selection wins',(await read()).selection.current.variant===`v6-${cities.at(-1)}-gold`);
 for(let round=0;round<2;round++)for(const id of cities)check(`city ${round+1}/${id}`,await bounded(`city ${round+1}/${id}`,page.evaluate(id=>window.cupViewer.selectArtwork({variant:`v6-${id}-gold`}),id)));
 for(const id of ['open','innovation','cooperation','sharing','together','ocean'])check('slogan '+id,await bounded('slogan '+id,page.evaluate(text=>window.cupViewer.selectArtwork({text}),id)));
 await page.waitForFunction(()=>window.cupViewer.debug().resources.network.active===0,null,{polling:100});
 state=await read();check('repeated switching budget bounded',state.resources.estimatedGpuBytes+state.resources.reservedRenderTargetBytes<=state.resources.steadyBudget);check('peak accounts for reflection scratch buffers',state.resources.peakEstimatedBytes<=state.resources.peakBudget);check('no pending jobs',state.resources.network.active===0&&state.resources.decode.active===0);check('raw file cache within budget',state.resources.fileCache.peakBytes<=state.resources.fileCache.limit);report.metrics.afterSwitching=state.resources;
 const original=await page.evaluate(()=>window.cupViewer.exportDesign());
 check('invalid design rejected',await page.evaluate(async()=>{try{await window.cupViewer.importDesign({...window.cupViewer.exportDesign(),cityId:'invalid'});return false;}catch{return true;}}));
 expectedNetworkFailure=true;await page.route('**/assets/beijing-light-normal-*',r=>r.abort());
 // Low files are now pinned: the selection must succeed with the origin unavailable.
 const cached=await page.evaluate(()=>window.cupViewer.selectArtwork({variant:'v6-beijing-gold'}));
 check('preloaded city survives unavailable origin',cached&&(await read()).selection.current.variant==='v6-beijing-gold');await page.unroute('**/assets/beijing-light-normal-*');expectedNetworkFailure=false;
 check('export/import roundtrip',await page.evaluate(d=>window.cupViewer.importDesign(d),original));
 await page.locator('#auto').click();const c1=(await read()).camera;const cadence=await page.evaluate(async()=>{const start=window.cupViewer.debug().quality.renderFrames;let samples=0;await new Promise(resolve=>{function tick(){if(++samples<20)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);});return {renders:window.cupViewer.debug().quality.renderFrames-start,samples};});check('auto render requests coalesce to one per frame',cadence.renders<=cadence.samples+2);check('auto rotation changes actual camera',(await read()).camera.some((n,i)=>Math.abs(n-c1[i])>.01));await page.locator('#auto').click();
 await page.evaluate(()=>{window.testLoss=document.querySelector('#viewport').getContext('webgl2').getExtension('WEBGL_lose_context');window.testLoss.loseContext();});await page.waitForTimeout(300);await page.evaluate(()=>window.testLoss.restoreContext());await page.waitForFunction(()=>window.cupViewer.ready(),null,{timeout:60000});
 check('context recovery preserves design',JSON.stringify(await page.evaluate(()=>window.cupViewer.exportDesign()))===JSON.stringify(original));check('context recovery restarts at light',(await read()).quality.cityTier==='light');await page.screenshot({path:out+'/mobile-restored.png',scale:'css'});
 const protectedFiles=JSON.parse(await fs.readFile('../docs/changes/20261016-short-screen-lift/protected-haptics.json'));
 for(const file of ['src/ui/haptics.ts','src/ui/ios-haptics.ts','src/ui/xy-pad.ts','src/ui/lightness-slider.ts','src/ui/control-lift.ts'])check('input bytes preserved '+file,createHash('sha256').update(await fs.readFile(file)).digest('hex')===protectedFiles[file]);
 if(!process.env.QA_CONSUMER_ONLY){
 await page.goto(new URL('integration/',url).href);await page.waitForFunction(()=>!document.querySelector('#save').disabled,null,{timeout:60000});await page.selectOption('#identity','alice');await page.fill('#title','V7 integration proof');await page.click('#save');await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('作品已保存'));await page.click('#share');await page.waitForFunction(()=>document.querySelector('#share-link').textContent.length>0);const share=await page.locator('#share-link').getAttribute('href');
 const anonymous=await browser.newPage({viewport:{width:1280,height:900}});anonymous.on('pageerror',e=>report.errors.push(e.message));await anonymous.goto(share);await anonymous.waitForFunction(()=>document.querySelector('#status').textContent.includes('匿名还原'),null,{timeout:60000});check('anonymous share renders',(await anonymous.locator('#identity').inputValue())==='');await anonymous.screenshot({path:out+'/integration-share.png',scale:'css'});await anonymous.close();
 await page.click('#revoke');await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('已撤销'));check('sample creates and revokes public share',true);
 await page.screenshot({path:out+'/integration.png',scale:'css'});
 }
 // A clean desktop view exercises the retained optical UI backend as well.
 const desktop=await bounded('desktop page',browser.newPage({viewport:{width:1440,height:900}}));activePage=desktop;desktop.on('pageerror',e=>report.errors.push(e.message));await bounded('desktop navigation',desktop.goto(url,{waitUntil:'domcontentloaded'}));if(await desktop.evaluate(()=>document.hidden))await bounded('desktop foreground',desktop.bringToFront());await bounded('desktop readiness',desktop.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:60000,polling:100}));await desktop.waitForTimeout(1000);await desktop.screenshot({path:out+'/desktop.png',scale:'css'});check('desktop full glass backend',await desktop.evaluate(()=>window.cupViewer.debug().glass.backend==='webgl2'));await desktop.close();
 check('no uncaught application errors',report.errors.length===0);
}catch(e){report.failure=e.stack;process.exitCode=1;}finally{await browser.close();await fs.writeFile(out+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({passed:!report.failure,checks:report.checks.length,failure:report.failure,errors:report.errors,metrics:report.metrics},null,2));}
