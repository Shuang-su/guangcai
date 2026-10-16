import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

const url=process.env.QA_URL;
if(!url?.startsWith('https://'))throw new Error('QA_URL must be the verified HTTPS deployment URL');
const out='evidence/deployment';await mkdir(out,{recursive:true});
const manifest=JSON.parse(await readFile(`${out}/release-manifest.json`,'utf8'));
const checks=[],errors=[],assets=[],networkFailures=[];let complete=false;const started=Date.now();let readyAfterMs,warmReadyAfterMs;
const evidenceOnly=process.env.QA_EVIDENCE_ONLY==='1';
if(evidenceOnly){const prior=JSON.parse(await readFile(out+'/online-model-stage.json','utf8'));assert.ok(prior.checks.includes('mobile calibration panel fits'));checks.push(...prior.checks);readyAfterMs=prior.readyAfterMs;}
const check=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS',name);};
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
page.setDefaultTimeout(300000);page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>networkFailures.push({url:r.url(),error:r.failure()?.errorText}));
page.on('console',m=>{if(m.type()==='error'&&/WebGLProgram|Shader Error|GL_INVALID/.test(m.text()))errors.push(m.text());});
const pause=ms=>page.waitForTimeout(ms);
try{
 if(!evidenceOnly){
 const entry=await page.goto(url,{waitUntil:'domcontentloaded'});
 check('public HTTPS entry accessible without login',entry.status()===200);
 await page.waitForFunction(()=>window.cupViewer?.ready()||!document.querySelector('#fatal').hidden,{},{timeout:300000});assert.equal(await page.locator('#fatal').isVisible(),false,'Complete texture loading');await pause(2000);
 readyAfterMs=Date.now()-started;console.log('READY',readyAfterMs+' ms');
 const initial=await page.evaluate(()=>window.cupViewer.debug());
 await writeFile(`${out}/cold-load-resources.json`,JSON.stringify(await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({name:r.name,start:r.startTime,duration:r.duration,transfer:r.transferSize,encoded:r.encodedBodySize}))),null,2));
 check('current v3 city and independent fixed package render',initial.city.pack.version===3&&initial.city.maps.length===5&&Object.keys(initial.fixed).length===3);
 check('fixed floral relief remains 4.4 and clearcoat 2.4 online',initial.fixedFinish.normalScale===4.4&&initial.fixedFinish.clearcoatNormalScale===2.4);
 check('nearby geometry reflection active online',initial.reflections.ready&&initial.reflections.enabled&&initial.reflections.captures>0);
 check('no public badge overlays controls',await page.locator('script[src*="/.netlify/scripts/hud"]').count()===0);
 await page.screenshot({path:`${out}/live-desktop.png`});
 const panBefore=await page.evaluate(()=>window.cupViewer.debug());await page.mouse.move(620,420);await page.mouse.down({button:'right'});await page.mouse.move(740,450,{steps:10});await page.mouse.up({button:'right'});await pause(1000);const panAfter=await page.evaluate(()=>window.cupViewer.debug());
 check('right drag pans camera and target online',Math.hypot(...panAfter.target.map((v,i)=>v-panBefore.target[i]))>1&&panAfter.camera.every((v,i)=>Math.abs((v-panAfter.target[i])-(panBefore.camera[i]-panBefore.target[i]))<.05));
 await page.locator('#reset').click();await pause(2000);

 await page.locator('[data-view="detail"]').click();await pause(2000);await page.screenshot({path:`${out}/live-detail.png`});
 await page.locator('#open-settings').click();await page.locator('#local-reflections').uncheck();
 check('reflection toggle works online',!(await page.evaluate(()=>window.cupViewer.debug())).reflections.enabled);
 await page.locator('#local-reflections').check();await page.locator('#fixed-relief').uncheck();check('fixed flower normal control is independent online',!(await page.evaluate(()=>window.cupViewer.debug())).fixedFinish.enabled&&(await page.evaluate(()=>window.cupViewer.debug())).city.relief===1);await page.locator('#fixed-relief').check();await page.locator('#close-settings').click();
 await page.locator('[data-view="front"]').click();await pause(2000);
 check('text face and reflection restored',(await page.evaluate(()=>window.cupViewer.debug())).view==='front'&&(await page.evaluate(()=>window.cupViewer.debug())).reflections.enabled);
 await page.screenshot({path:`${out}/live-text-face.png`});
 await page.locator('[data-view="exploded"]').click();await pause(2300);
 const exploded=await page.evaluate(()=>window.cupViewer.debug());
 check('reflection probe follows exploded geometry online',exploded.reflections.captures>initial.reflections.captures&&Math.abs(exploded.reflections.position[1]-initial.reflections.position[1]-26)<.01);
 await page.setViewportSize({width:390,height:844});const warmStart=Date.now();await page.reload();await page.waitForFunction(()=>window.cupViewer?.ready(),{},{timeout:300000});warmReadyAfterMs=Date.now()-warmStart;console.log('WARM',warmReadyAfterMs+' ms');await pause(2000);
 check('mobile initial render and no overflow',await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth));
 check('mobile view controls within viewport',await page.locator('[data-view="detail"]').evaluate(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight;}));
 await page.screenshot({path:`${out}/live-mobile.png`});
 await page.locator('#open-settings').click();check('mobile calibration panel fits',await page.locator('#settings').evaluate(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight;}));await page.locator('#close-settings').click();
 }
 await page.goto(new URL('evidence.html',url).href,{waitUntil:'domcontentloaded'});await page.locator('details').evaluateAll(es=>es.forEach(e=>e.open=true));await page.locator('img').evaluateAll(imgs=>{imgs.forEach(i=>i.loading='eager');return Promise.all(imgs.map(i=>i.decode()));});
 check('all reference and evidence images decode online',await page.locator('img').count()===41);
 check('mobile evidence page has no overflow',await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth));
 await page.setViewportSize({width:1440,height:1000});
 const slider=page.locator('[data-compare="buildings"]');await slider.press('Home');await slider.press('ArrowRight');
 check('reference slider updates actual image split',await page.locator('#buildings .model').evaluate(e=>e.style.clipPath.includes('99%')));
 await page.locator('#floral-update').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/live-evidence.png`});
 const missing=await page.request.get(new URL('china/qa-missing-resource.png',url).href);check('missing texture is real 404',missing.status()===404);
 const texture=manifest.files.find(f=>f.path.startsWith('textures/'));
 check('content-hashed textures use immutable cache',(await page.request.get(new URL(texture.path,url).href)).headers()['cache-control']?.includes('immutable'));
 const hashed=manifest.files.find(f=>f.path.startsWith('assets/')&&f.path.endsWith('.js'));
 check('content-hashed JS uses immutable cache',(await page.request.get(new URL(hashed.path,url).href)).headers()['cache-control']?.includes('immutable'));
 check('stable city texture names revalidate',(await page.request.get(new URL('china/normal.png',url).href)).headers()['cache-control']?.includes('must-revalidate'));
 const remoteFiles=JSON.parse(await readFile(out+'/remote-files.json','utf8'));
 const remoteByPath=new Map(remoteFiles.map(f=>[f.path.replace(/^\//,'').toLowerCase(),f]));
 for(const file of manifest.files){
  const remote=remoteByPath.get(file.path.toLowerCase());assert.ok(remote,file.path+' exists in published file index');
  assert.equal(remote.sha,file.sha1,file.path+' published SHA-1');assert.equal(remote.size,file.size,file.path+' published bytes');
  assets.push({path:file.path,size:remote.size,sha1:remote.sha,method:'Netlify published file index compared to immutable local release'});
 }
 for(const file of manifest.files.filter(f=>f.path.endsWith('.html')||f.path.startsWith('assets/'))){
  const res=await page.request.get(new URL(file.path,url).href,{timeout:60000});const body=await res.body();
  const normalized=file.path.endsWith('.html')?Buffer.from(body.toString().replace(/\n<!-- This site is hosted on Netlify\.[\s\S]*?Netlify hosting facts for this site: static\/SSR served via Netlify Edge\. -->/,'')):body;
  assert.equal(res.status(),200,file.path);assert.equal(createHash('sha256').update(normalized).digest('hex'),file.sha256,file.path+' public response content');
 }
 check('public HTML and hashed bundle match release bytes',true);
 check('all release files match published Netlify digests and sizes',assets.length===manifest.files.length);
 check('no browser or shader errors',errors.length===0);complete=true;
}catch(error){errors.push(error.message);await page.screenshot({path:`${out}/online-qa-failure.png`}).catch(()=>{});throw error;}
finally{await writeFile(`${out}/online-qa.json`,JSON.stringify({date:new Date().toISOString(),url,complete,checks,errors,networkFailures,readyAfterMs,warmReadyAfterMs,evidenceOnly,assets,scope:'Public HTTPS in desktop Chrome and mobile-sized Chrome; local full touch/atomic-switch checks in evidence/browser-qa.json'},null,2));await browser.close();}
console.log(JSON.stringify({url,checks:checks.length,assets:assets.length,errors}));
