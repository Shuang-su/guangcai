// Texture-origin outage is intentional. Browser/worker JS remains reachable.
import {chromium,webkit} from 'playwright';import fs from 'node:fs/promises';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';
const url=process.env.QA_URL??'http://127.0.0.1:5276/',out=process.env.QA_OUT??'evidence/v7-preload/offline';await fs.mkdir(out,{recursive:true});
const browser=process.env.QA_WEBKIT?await webkit.launch():await chromium.launch({channel:'chrome'}),report={url,engine:process.env.QA_WEBKIT?'WebKit':'Chrome',checks:[],errors:[],timings:{cities:[],slogans:[]},physicalIPhoneTested:false};
function check(name,ok){report.checks.push({name,passed:!!ok});assert.ok(ok,name);}
const options={viewport:{width:375,height:812},deviceScaleFactor:2,isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1'};
try{
 const page=await browser.newPage(options);page.on('pageerror',e=>report.errors.push(e.message));await page.goto(url,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:90000,polling:100});
 const read=()=>page.evaluate(()=>window.cupViewer.debug());let d=await read();report.initial={preload:d.preload,entry:d.entryLoading,resources:d.resources};
 check('all city lows and six uploaded slogans precede entry',d.preload.readyCities===23&&d.preload.slogans===6&&d.entryLoading.completed===91&&d.entryLoading.received===10929425);
 const blocked=[];await page.route('**/releases/**/assets/**',r=>{blocked.push(r.request().url());return r.abort();});
 await page.evaluate(()=>window.cupViewer.setView('detail',true));await page.waitForFunction(()=>window.cupViewer.debug().quality.cityTier==='standard'&&!window.cupViewer.debug().quality.upgrading,null,{timeout:30000});
 check('current HD is already downloaded',blocked.length===0);
 await page.evaluate(()=>window.cupViewer.selectArtwork({variant:'v6-shenyang-gold'}));await page.evaluate(()=>window.cupViewer.setView('detail',true));await page.waitForFunction(()=>window.cupViewer.debug().quality.cityTier==='standard'&&!window.cupViewer.debug().quality.upgrading,null,{timeout:30000});
 check('neighbor HD decodes without needing its files from the origin',!blocked.some(u=>/shenyang-standard/.test(u)));
 await page.evaluate(()=>window.cupViewer.setView('hero',true));await page.waitForTimeout(700);
 const cities=Object.keys(JSON.parse(await fs.readFile('src/styles/city-catalog-v6.json')).cities);
 for(const city of ['urumqi',...cities.filter(c=>c!=='urumqi')]){
  const result=await page.evaluate(async id=>{const start=performance.now(),ok=await window.cupViewer.selectArtwork({variant:`v6-${id}-gold`});return {id,ok,ms:performance.now()-start,current:window.cupViewer.debug().selection.current.variant};},city);report.timings.cities.push(result);check('cached city '+city,result.ok&&result.current===`v6-${city}-gold`);
  await page.waitForFunction(()=>{const img=document.querySelector('.city-card[aria-pressed=true] img');return img?.complete&&img.naturalWidth>0;},null,{timeout:10000,polling:50});
  if(city==='urumqi')await page.screenshot({path:out+'/urumqi.png',scale:'css'});
 }
 check('no low city or thumbnail transfers after entry',!blocked.some(u=>/-light-|thumbnail/.test(u)));
 const initialPrograms=(await read()).memory.programs,transfers=(await read()).resources.fetchedBodyBytes;
 await page.evaluate(()=>window.cupViewer.setView('front',true));await page.waitForTimeout(600);
 const images=[];
 for(let round=0;round<3;round++)for(const text of ['open','innovation','cooperation','sharing','together','ocean']){
  const result=await page.evaluate(async text=>{const start=performance.now(),ok=await window.cupViewer.selectArtwork({text});return {text,ok,ms:performance.now()-start,current:window.cupViewer.debug().selection.current.text,uniformOnly:window.cupViewer.debug().city.uniformOnly};},text);report.timings.slogans.push(result);check(`slogan ${round}/${text}`,result.ok&&result.current===text&&result.uniformOnly);
  if(round===0){await page.waitForTimeout(100);const png=await page.screenshot({path:out+'/slogan-'+text+'.png',scale:'css'});images.push(createHash('sha256').update(png).digest('hex'));}
 }
 d=await read();check('slogan swaps make no new transfers',d.resources.fetchedBodyBytes===transfers&&!blocked.some(u=>/slogan-/.test(u)));check('slogan swaps reuse shader programs',d.memory.programs===initialPrograms);check('all six slogans render distinct frames',new Set(images).size===6);
 await page.evaluate(async ids=>{await Promise.all(ids.map(id=>window.cupViewer.selectArtwork({variant:`v6-${id}-gold`})) );},cities);
 check('rapid switching retains final city',(await read()).selection.current.variant===`v6-${cities.at(-1)}-gold`);
 const before=await page.evaluate(()=>window.cupViewer.exportDesign());await page.evaluate(()=>{window.loss=document.querySelector('#viewport').getContext('webgl2').getExtension('WEBGL_lose_context');window.loss.loseContext();});await page.waitForTimeout(300);await page.evaluate(()=>window.loss.restoreContext());await page.waitForFunction(()=>window.cupViewer.ready(),null,{timeout:30000,polling:100});
 d=await read();check('context recovers from pinned lows with resource origin unavailable',JSON.stringify(await page.evaluate(()=>window.cupViewer.exportDesign()))===JSON.stringify(before)&&d.quality.cityTier==='light'&&d.preload.readyCities===23);
 check('no fallback transfer of pinned low or fixed resources',!blocked.some(u=>/-light-|slogan-|thumbnail|mark/.test(u)));
 check('GPU steady and switching peak stay bounded',d.resources.estimatedGpuBytes+d.resources.reservedRenderTargetBytes<=d.resources.steadyBudget&&d.resources.peakEstimatedBytes<=d.resources.peakBudget);check('encoded cache stays within cap',d.resources.fileCache.peakBytes<=d.resources.fileCache.limit);report.final={resources:d.resources,preload:d.preload,blockedOptionalHD:blocked.length};
 await page.close();
 const missing=await browser.newPage(options);await missing.route('**/assets/urumqi-light-normal-*',r=>r.fulfill({status:404,body:'missing city test fixture'}));await missing.goto(url,{waitUntil:'domcontentloaded'});await missing.waitForFunction(()=>document.querySelector('#entry-loading').dataset.state==='error',null,{timeout:60000,polling:100});check('missing distant city is detected before entering design',await missing.locator('#app').evaluate(e=>e.inert&&getComputedStyle(e).visibility==='hidden'));await missing.screenshot({path:out+'/missing-city.png',scale:'css'});await missing.unroute('**/assets/urumqi-light-normal-*');await missing.locator('.entry-reload').click();await missing.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:90000,polling:100});check('reload repairs failed city preload',(await missing.evaluate(()=>window.cupViewer.debug())).preload.readyCities===23);await missing.close();check('no uncaught application errors',report.errors.length===0);
}catch(e){report.failure=e.stack;process.exitCode=1;}finally{await browser.close();await fs.writeFile(out+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({passed:!report.failure,checks:report.checks.length,failure:report.failure,errors:report.errors,timings:report.timings}));}
