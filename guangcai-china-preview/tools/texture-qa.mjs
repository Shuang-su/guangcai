import {chromium} from 'playwright';
import sharp from 'sharp';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const url=process.env.QA_URL??'http://127.0.0.1:5197/';
const styles=[{id:'original',name:'花蝶 · 金地',dir:'public/artwork'}, {id:'peony-magnolia',name:'牡丹玉兰 · 金地',dir:'public/artwork/peony-magnolia'}, {id:'lotus-butterfly',name:'莲荷双蝶 · 金地',dir:'public/artwork/lotus-butterfly'}];
const checks=[],errors=[],report={url,date:new Date().toISOString(),checks,errors,styles:[]};
const check=(name,condition)=>{assert.ok(condition,name);checks.push(name);};
await mkdir('../evidence/textures',{recursive:true});
for(const s of styles){
 const manifest=JSON.parse(await readFile(s.dir+'/manifest.json','utf8'));
 for(const [region,r] of Object.entries(manifest.regions)){
  for(const [channel,c] of Object.entries(r.maps)){
   const file='public/'+c.url,data=await readFile(file),m=await sharp(data).metadata();
   check(s.id+'/'+region+'/'+channel+' dimensions and SHA-256',m.width===r.width&&m.height===r.height&&createHash('sha256').update(data).digest('hex')===c.sha256);
  }
 }
}
const density=JSON.parse(await readFile('../evidence/textures/density-final.json','utf8'));
for(const s of styles.slice(1))for(const region of ['body','handle','saucer']){
 const current=density.styles[s.id][region],reference=density.styles.original[region];
 check(s.id+'/'+region+' density no lower than original within 10 percent',current.enamelCoverage>=reference.enamelCoverage*.9);
 if(region==='saucer')check(s.id+' full coverage at BOTH rim edges',current.top20Percent>=reference.top20Percent*.9&&current.bottom20Percent>=reference.bottom20Percent*.9);
}
const originalPrompts=JSON.parse(await readFile('assets/prompts.json','utf8')).entries;
for(const v of JSON.parse(await readFile('assets/variant-prompts.json','utf8')).variants)for(const [i,part]of ['body','band'].entries())check(v.id+'/'+part+' exact original prompt prefix preserved',v[part+'Prompt'].startsWith(originalPrompts[i].prompt));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1120,height:1000},deviceScaleFactor:1});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url+'?style=original');await page.waitForFunction(()=>window.cupViewer?.ready());await page.waitForTimeout(1500);
 const debug=()=>page.evaluate(()=>window.cupViewer.debug());
 const initial=await debug();
 await page.locator('#open-settings').click();
 check('no editable relief or exposure controls',await page.locator('input#relief,input#exposure').count()===0);
 check('fixed values displayed',await page.locator('#relief-value').innerText()==='1.5'&&await page.locator('#exposure-value').innerText()==='1.08');
 for(const s of styles){
  await page.evaluate(()=>window.cupViewer.reference('1197'));await page.waitForTimeout(150);const before=await debug();
  await page.locator('[data-style="'+s.id+'"]').click();await page.waitForFunction(name=>window.cupViewer.debug().style===name,s.name);await page.waitForTimeout(300);
  const d=await debug();report.styles.push({id:s.id,...d});
  check(s.id+' locked material constants',d.exposure===1.08&&Object.values(d.regions).every(r=>r.normalScale.every(n=>n===1.5)&&r.clearcoatNormalScale.every(n=>Math.abs(n-.825)<1e-9)));
  check(s.id+' same geometry and camera',JSON.stringify(d.geometries)===JSON.stringify(initial.geometries)&&JSON.stringify(d.camera)===JSON.stringify(before.camera));
  check(s.id+' five channels share UV transforms and correct color space',Object.values(d.regions).every(r=>Object.entries(r.channels).length===5&&Object.entries(r.channels).every(([c,t])=>JSON.stringify(t.repeat)===JSON.stringify(r.repeat)&&JSON.stringify(t.offset)===JSON.stringify(r.offset)&&t.colorSpace===(c==='baseColor'?'srgb':''))));
  check(s.id+' all PBR channels loaded',Object.values(d.regions).every(r=>r.normal&&r.metal&&r.roughness));
  check(s.id+' selected card reflects applied style',await page.locator('[data-style="'+s.id+'"]').getAttribute('aria-pressed')==='true');
  const data=await page.locator('#viewport').evaluate(c=>c.toDataURL('image/png'));
  await sharp(Buffer.from(data.split(',')[1],'base64')).jpeg({quality:93}).toFile(s.dir+'/preview.jpg');
  await page.locator('#close-settings').click();
  await page.locator('[data-view="detail"]').click();await page.waitForTimeout(1500);
  const detail=await page.locator('#viewport').evaluate(c=>c.toDataURL('image/png'));
  await writeFile('../evidence/textures/'+s.id+'-detail.png',Buffer.from(detail.split(',')[1],'base64'));
  await page.locator('[data-view="hero"]').click();await page.waitForTimeout(1600);await page.locator('#open-settings').click();
 }
 const stable=await debug();
 for(let i=0;i<6;i++)await page.evaluate(id=>window.cupViewer.applyBuiltin(id),styles[i%3].id);
 await page.waitForTimeout(300);const cycled=await debug();
 check('repeated variant switching releases old GPU maps',JSON.stringify(stable.memory)===JSON.stringify(cycled.memory));
 await page.goto(url);await page.waitForFunction(()=>window.cupViewer?.ready());
 check('selected variant persists on reload',(await debug()).style==='莲荷双蝶 · 金地');
 await page.setViewportSize({width:390,height:844});await page.locator('#open-settings').click();
 check('mobile variant panel fits',await page.locator('#settings').evaluate(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight;}));
 await page.locator('[data-style="peony-magnolia"]').click();await page.waitForFunction(()=>window.cupViewer.debug().style==='牡丹玉兰 · 金地');
 check('mobile card activates',(await debug()).exposure===1.08);
 await page.screenshot({path:'../evidence/textures/mobile-settings.png'});
 await page.goto(url+'texture-standards.html');
 for(const s of styles){
  for(const region of ['body','handle','saucer']){
   await page.locator('#'+s.id+' .region').selectOption(region);
   for(const channel of ['baseColor','normal','roughness','metalness','height']){
    await page.locator('#'+s.id+' .channel').selectOption(channel);
    await page.locator('#'+s.id+' .map').evaluate(img=>img.decode());
    check('gallery '+s.id+'/'+region+'/'+channel,await page.locator('#'+s.id+' .map').evaluate(img=>img.naturalWidth>0));
   }
  }
 }
 check('standards mobile no overflow',await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth));
 await page.screenshot({path:'../evidence/textures/standards-mobile.png'});
 await page.setViewportSize({width:1400,height:1050});await page.goto(url+'texture-standards.html');
 await page.locator('.card .render img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
 check('all three rendered previews loaded',await page.locator('.card .render img').count()===3);
 await page.screenshot({path:'../evidence/textures/standards-desktop.png'});
 await page.goto(url+'compare.html?ref=1238');await page.waitForFunction(()=>window.cupCompare?.ready());
 const compare=await page.evaluate(()=>window.cupCompare.state().renderStandard);check('photo overlay uses the same locked brightness and relief',compare.exposure===1.08&&compare.normalScales.flat().every(n=>n===1.5));
 check('no runtime errors',errors.length===0);
 await writeFile('../evidence/textures/texture-qa.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify({passed:checks.length,errors,exposure:cycled.exposure,normalScales:Object.values(cycled.regions).map(r=>r.normalScale),memory:cycled.memory}));
}finally{await browser.close();}

