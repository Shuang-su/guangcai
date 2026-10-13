import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

const url=process.env.QA_URL;
if(!url?.startsWith('https://'))throw new Error('QA_URL must be the verified HTTPS deployment URL');
const evidence='../evidence/deployment';
await mkdir(evidence,{recursive:true});
const manifest=JSON.parse(await readFile(evidence+'/release-manifest.json'));
const checks=[],errors=[],assetResults=[];
let complete=false;
const check=(name,value)=>{assert.ok(value,name);checks.push(name);};
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
  const page=await browser.newPage({viewport:{width:1280,height:950},deviceScaleFactor:1});
  page.setDefaultTimeout(60000);
  page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(url,{waitUntil:'domcontentloaded'});
  check('public HTTPS entry is accessible without login',response.status()===200);
  await page.waitForFunction(()=>window.cupViewer?.ready());
  check('initial WebGL render is ready',await page.locator('#viewport').getAttribute('data-ready')==='true');
  const initial=await page.evaluate(()=>window.cupViewer.debug());
  await page.locator('#open-settings').click();
  for(const [id,name] of [['original','花蝶 · 金地'],['peony-magnolia','牡丹玉兰 · 金地'],['lotus-butterfly','莲荷双蝶 · 金地']]){
    await page.locator('[data-style="'+id+'"]').click();
    await page.waitForFunction(name=>window.cupViewer.debug().style===name,name);
    const d=await page.evaluate(()=>window.cupViewer.debug());
    check(id+' complete aligned PBR channels',Object.values(d.regions).every(r=>r.normal&&r.metal&&r.roughness));
    check(id+' fixed relief and brightness',d.exposure===1.08&&Object.values(d.regions).every(r=>r.normalScale.every(v=>v===1.5)));
    check(id+' keeps geometry',JSON.stringify(d.geometries)===JSON.stringify(initial.geometries));
  }
  await page.locator('#close-settings').click();
  await page.locator('[data-view="handle"]').click();
  await page.waitForTimeout(1500);
  check('view controls work online',(await page.evaluate(()=>window.cupViewer.debug())).view==='handle');
  await page.locator('#reset').click();await page.waitForTimeout(1500);
  await page.screenshot({path:evidence+'/live-desktop.png'});
  await page.setViewportSize({width:390,height:844});
  await page.reload();await page.waitForFunction(()=>window.cupViewer?.ready());await page.waitForTimeout(1500);
  check('mobile layout has no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth));
  await page.screenshot({path:evidence+'/live-mobile.png'});
  await page.goto(url+'texture-standards.html');
  await page.locator('.card img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
  check('all three standards previews render online',await page.locator('.card').count()===3);
  await page.setViewportSize({width:1400,height:1050});
  await page.screenshot({path:evidence+'/live-standards.png'});
  await page.goto(url+'compare.html?ref=1238');
  await page.waitForFunction(()=>window.cupCompare?.ready());
  check('reference photo and 3D overlay render online',await page.locator('#photo').evaluate(img=>img.complete&&img.naturalWidth>0));
  await page.locator('#overlay').click();
  check('overlay transparency works',await page.locator('#model').evaluate(e=>e.style.opacity)==='0.5');
  await page.screenshot({path:evidence+'/live-overlay.png'});
  const missing=await page.request.get(url+'artwork/this-asset-does-not-exist.png');
  check('missing asset is a real 404',missing.status()===404);
  const hashed=manifest.files.find(f=>f.path.startsWith('assets/')&&f.path.endsWith('.js'));
  const assetHeader=await page.request.get(url+hashed.path);
  check('hashed JavaScript has immutable caching',assetHeader.headers()['cache-control']?.includes('immutable'));
  const artHeader=await page.request.get(url+'artwork/saucer-baseColor.png');
  check('stable artwork filenames revalidate',artHeader.headers()['cache-control']?.includes('must-revalidate'));
  const pending=[...manifest.files];
  await Promise.all(Array.from({length:5},async()=>{
    while(pending.length){
      const file=pending.shift();
      const r=await page.request.get(new URL(file.path,url).href,{timeout:60000});
      const body=await r.body(),actualHash=createHash('sha256').update(body).digest('hex');
      // Netlify serves a platform attribution comment and public HUD script in HTML.
      // Remove only these observed, site-specific additions; every other byte must match.
      const normalized=file.path.endsWith('.html')?Buffer.from(body.toString()
        .replace(/\n<!-- This site is hosted on Netlify\.[\s\S]*?Netlify hosting facts for this site: static\/SSR served via Netlify Edge\. -->/,'')
        .replace(/\n<script async src="\/\.netlify\/scripts\/hud\?variant=public" data-nf-variant="public" data-netlify-site-id="cdc49df3-1e59-4e37-99ac-962584f050a6" data-app-host="app.netlify.com"><\/script>\n$/,'\n')):body;
      const contentHash=createHash('sha256').update(normalized).digest('hex');
      check(file.path+' deployed content equals release'+(file.path.endsWith('.html')?' apart from Netlify additions':''),r.ok()&&contentHash===file.sha256);
      assetResults.push({path:file.path,status:r.status(),bytes:body.length,sha256:actualHash,normalizedContentSha256:contentHash,netlifyHTMLAdditions:file.path.endsWith('.html')&&actualHash!==contentHash});
    }
  }));
  check('no browser runtime exceptions',errors.length===0);
  complete=true;
}catch(error){
  errors.push(error.message);throw error;
}finally{
  await writeFile(evidence+'/online-qa.json',JSON.stringify({date:new Date().toISOString(),url,complete,passed:checks.length,checks,errors,assetResults},null,2));
  await browser.close();
}
console.log(JSON.stringify({url,passed:checks.length,assets:assetResults.length,errors}));
