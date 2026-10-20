// Browser plugin not available. Flow: formal app -> city cards -> complete
// gold skyline, then keyboard/click switching and responsive card geometry.
import {chromium} from 'playwright';import fs from 'node:fs/promises';import assert from 'node:assert/strict';import sharp from 'sharp';
const base=process.env.QA_URL??'http://127.0.0.1:5294/',out=process.env.QA_OUT??'evidence/v7.1.9/thumbnails-local';await fs.mkdir(out,{recursive:true});
const report={base,browser:'Chrome / Playwright (Browser plugin not available)',viewports:[],checks:[],errors:[],cities:[],physicalDeviceTested:false},check=(name,v)=>{assert.ok(v,name);report.checks.push(name);};
let browser=await chromium.launch({channel:'chrome'});
async function ready(p){await p.waitForFunction(()=>window.cupViewer?.ready()&&!window.cupViewer.debug().selection.busy&&!window.cupViewer.debug().quality.upgrading,null,{timeout:300000});}
async function inspect(p,id){
 const card=p.locator('.city-card[aria-pressed=true]');await card.locator('img').evaluate(i=>i.decode());
 const geometry=await card.evaluate(c=>{const i=c.querySelector('img'),s=getComputedStyle(i),r=i.getBoundingClientRect(),b=c.getBoundingClientRect(),scale=Math.min(r.width/i.naturalWidth,r.height/i.naturalHeight);return {fit:s.objectFit,position:s.objectPosition,image:[r.width,r.height],natural:[i.naturalWidth,i.naturalHeight],inside:r.left>=b.left-.1&&r.right<=b.right+.1&&r.top>=b.top-.1&&r.bottom<=b.bottom+.1,whole:scale>0&&i.naturalWidth*scale<=r.width+.01&&i.naturalHeight*scale<=r.height+.01};});
 check(id+' complete image fits inside card',geometry.inside&&geometry.whole&&geometry.fit==='contain'&&geometry.natural[0]===560&&geometry.natural[1]===244);
 const png=await card.locator('img').evaluate(i=>{const c=document.createElement('canvas');c.width=i.naturalWidth;c.height=i.naturalHeight;c.getContext('2d').drawImage(i,0,0);return c.toDataURL();});
 const decoded=await sharp(Buffer.from(png.split(',')[1],'base64')).extractChannel('alpha').raw().toBuffer();
 const boot=await fetch(new URL('api/v1/bootstrap.json',base)).then(r=>r.json()),manifest=await fetch(new URL(boot.manifestUrl,base)).then(r=>r.json()),url=new URL(manifest.cities[id].thumbnail.url,new URL(boot.manifestUrl,base));
 const expected=await sharp(Buffer.from(await fetch(url).then(r=>r.arrayBuffer()))).extractChannel('alpha').raw().toBuffer();
 check(id+' browser decodes every linework pixel',decoded.equals(expected));return geometry;
}
try{
 const p=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});p.on('pageerror',e=>report.errors.push(e.message));p.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});await p.goto(base);await ready(p);
 check('formal identity',(await p.title())==='城市共彩'&&p.url()===base);check('meaningful app and no framework overlay',await p.locator('#artwork-settings').isVisible()&&await p.locator('vite-error-overlay').count()===0);
 check('V7.1.9 / v7-8 active',await p.evaluate(()=>window.cupViewer.debug().version==='7.1.9'&&window.cupViewer.exportDesign().resourceReleaseId==='v7-8'));
 await p.evaluate(()=>window.cupViewer.setAuto(false));const cards=await p.locator('.city-card').evaluateAll(es=>es.map(e=>e.dataset.theme.slice(3)));check('23 city choices',cards.length===23);
 const thumbs=[];
 for(let n=0;n<23;n++){
  await p.waitForTimeout(800);await ready(p);const id=await p.locator('.city-card[aria-pressed=true]').getAttribute('data-theme').then(s=>s.slice(3));check(id+' real selected card matches cup',await p.locator(`.city-card[data-theme="v6-${id}"]`).getAttribute('aria-pressed')==='true');
  report.cities.push({id,geometry:await inspect(p,id)});const file=out+'/'+id+'-card.png';await p.locator('.city-card[aria-pressed=true]').screenshot({path:file});thumbs.push(file);
  if(n===0)await p.screenshot({path:out+'/mobile-after.png',scale:'css'});
  const next=cards[(cards.indexOf(id)+1)%cards.length];await p.locator('.city-card[aria-pressed=true]').press('ArrowRight');await p.waitForFunction(id=>window.cupViewer.debug().selection.current.variant==='v6-'+id+'-gold'&&!window.cupViewer.debug().selection.busy,next,{timeout:300000});
 }
 check('every city visited once',new Set(report.cities.map(c=>c.id)).size===23);await p.waitForTimeout(800);await ready(p);check('keyboard loop returns to Shenzhen',await p.evaluate(()=>window.cupViewer.exportDesign().cityId==='shenzhen'));
 await p.close();await browser.close();
 for(const size of [{width:320,height:568},{width:430,height:932},{width:844,height:390},{width:1440,height:1000}]){
  browser=await chromium.launch({channel:'chrome'});const responsive=await browser.newPage({viewport:size,deviceScaleFactor:1,isMobile:size.width<900,hasTouch:size.width<900});responsive.on('pageerror',e=>report.errors.push(e.message));responsive.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});await responsive.goto(base);await ready(responsive);await inspect(responsive,'shenzhen');check('no horizontal overflow '+size.width,await responsive.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));report.viewports.push(size);await responsive.screenshot({path:out+`/responsive-${size.width}.png`,scale:'css'});await responsive.locator('.city-card[data-theme="v6-shijiazhuang"]').click();await responsive.waitForFunction(()=>window.cupViewer.debug().selection.current.variant==='v6-shijiazhuang-gold'&&!window.cupViewer.debug().selection.busy,null,{timeout:300000});await ready(responsive);check('visible neighbor click updates real cup '+size.width,await responsive.evaluate(()=>window.cupViewer.exportDesign().cityId==='shijiazhuang'));await browser.close();
 }
 const composite=[];for(let i=0;i<thumbs.length;i++){const b=await sharp(thumbs[i]).resize(170,170,{fit:'contain',background:'#fffaf2'}).png().toBuffer();composite.push({input:b,left:(i%6)*180+5,top:Math.floor(i/6)*180+5});}
 await sharp({create:{width:1080,height:720,channels:3,background:'#f5f0e7'}}).composite(composite).png().toFile(out+'/all-23-cards.png');
 check('no runtime or console errors',report.errors.length===0);report.passed=true;
}catch(e){report.passed=false;report.failure=e.stack;process.exitCode=1;}finally{await browser.close();await fs.writeFile(out+'/report.json',JSON.stringify(report,null,2)+'\n');console.log({passed:report.passed,checks:report.checks.length,cities:report.cities.length,failure:report.failure,errors:report.errors});}
