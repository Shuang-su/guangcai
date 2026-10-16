import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import sharp from 'sharp';
const url=process.env.QA_URL??'http://127.0.0.1:5216/',remote=url.startsWith('https:');
const out=`output/playwright/beijing-4.3/${remote?'online':'local'}`;
await mkdir(out,{recursive:true});
const catalog=JSON.parse(await readFile('src/styles/city-catalog.json','utf8'));
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1100,height:900}}),page=await context.newPage();
const checks=[],errors=[],timings=[];page.on('pageerror',e=>errors.push(e.message));
page.on('console',m=>{if(m.type()==='error'&&/WebGLProgram|Shader Error|GL_INVALID/.test(m.text()))errors.push(m.text());});
const check=(name,ok)=>{assert.ok(ok,name);checks.push(name);console.log('PASS',name);};
const state=()=>page.evaluate(()=>window.cupViewer.debug()),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const wait=ms=>page.waitForTimeout(ms);
const shot=async name=>{await wait(300);await page.screenshot({path:`${out}/${name}.jpg`,quality:90});};
const select=async(variant,finish='enamel',text='auto')=>{const t=Date.now();assert.ok(await page.evaluate(s=>window.cupViewer.selectArtwork(s),{variant,finish,text}));await wait(100);timings.push({variant,finish,text,ms:Date.now()-t});};
const view=async v=>{await page.evaluate(v=>window.cupViewer.setView(v,true),v);await wait(350);};
try{
 const start=Date.now();await page.goto(url);await page.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:180000});await wait(1900);
 const initial=await state(),legacy=initial.city.pack;
 timings.push({stage:'default-cold-ready-plus-settle',ms:Date.now()-start,resources:await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({url:r.name,bytes:r.transferSize,duration:r.duration})))});
 check('4.3 default retains original China gold, exposure and fixed relief',initial.version==='4.3.0'&&initial.selection.current.variant==='china-gold'&&initial.exposure===1.08&&initial.fixedFinish.normalScale===4.4&&initial.fixedFinish.clearcoatNormalScale===2.4);
 check('default screen does not fetch Beijing or other optional artwork',await page.evaluate(()=>!performance.getEntriesByType('resource').some(r=>r.name.includes('/cities/v4/'))));
 await shot('china-gold-baseline');
 if(!remote){
  const before=await context.newPage();await before.goto('http://127.0.0.1:5212/');await before.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:180000});await before.waitForTimeout(1900);
  const onlyModel='header,footer,aside,#status,.open-settings,.open-background,.open-artwork{visibility:hidden!important}';
  await before.addStyleTag({content:onlyModel});const hideAfter=await page.addStyleTag({content:onlyModel});
  const roi={left:165,top:160,width:690,height:610};
  const a=await sharp(await before.screenshot()).extract(roi).raw().toBuffer();await before.close();await page.bringToFront();await wait(900);
  const b=await sharp(await page.screenshot()).extract(roi).raw().toBuffer();
  await hideAfter.evaluate(e=>e.remove());
  const delta=a.reduce((n,v,i)=>n+Math.abs(v-b[i]),0)/a.length;timings.push({baselinePixelMeanDifference:delta});check('4.2 vs 4.3 default model region unchanged',delta<.01);
 }
 await page.locator('#open-artwork').click();await page.locator('[data-theme="beijing"]').click();await page.waitForFunction(()=>!window.cupViewer.debug().selection.busy);
 check('Beijing theme selects fixed gold with exactly five choices',(await state()).selection.current.variant==='beijing-gold'&&await page.locator('.variant-card').count()===5&&await page.locator('#artwork-finish').isDisabled());
 await shot('beijing-panel');await page.locator('#close-artwork').click();
 const stableCamera=await state();
 for(const v of catalog.variants.filter(v=>v.theme==='beijing')){
  for(const finish of v.fixedGold?['enamel']:['enamel','metal','paint']){
   await select(v.id,finish);const s=await state();
   check(`${v.id}/${finish} shares fixed assets, camera, porcelain and high precision`,s.city.maps.length===6&&s.city.maps.every(m=>same(m.size,[4096,1783]))&&s.city.maps[4].precision==='RGBA16F'&&same(s.fixed,initial.fixed)&&same(s.geometries,initial.geometries)&&same(s.porcelain,initial.porcelain));
   await view('hero');await shot(`${v.id}-${finish}-hero`);
   await view('detail');await shot(`${v.id}-${finish}-detail`);
   await page.evaluate(()=>window.cupViewer.setMode('relief'));await shot(`${v.id}-${finish}-gray`);
   await page.evaluate(()=>window.cupViewer.setRelief(0));await shot(`${v.id}-${finish}-gray-off`);
   await page.evaluate(()=>{window.cupViewer.setMode('pbr');window.cupViewer.setRelief(1);window.cupViewer.setCamera([-125,70,-140],[-9,40,-11]);});await shot(`${v.id}-${finish}-grazing`);
  }
  for(const text of ['auto','name','none']){
   await select(v.id,'enamel',text);await view('front');const s=await state();
   check(`${v.id}/${text} separate Beijing lettering`,text==='none'?s.city.labelSource===null:/label-beijing-/.test(s.city.labelSource)&&s.city.labelColor===v.textColor);
   await shot(`${v.id}-${text}-text`);
  }
 }
 await page.locator('#open-artwork').click();await page.locator('#artwork-text').selectOption('none');await page.waitForFunction(()=>!window.cupViewer.debug().selection.busy);
 await page.locator('[data-theme="shenzhen"]').click();await page.waitForFunction(()=>!window.cupViewer.debug().selection.busy);
 check('hidden text survives Beijing to Shenzhen',(await state()).city.labelSource===null);
 await page.locator('#artwork-text').selectOption('he');await page.waitForFunction(()=>!window.cupViewer.debug().selection.busy);
 await page.locator('[data-theme="beijing"]').click();await page.waitForFunction(()=>!window.cupViewer.debug().selection.busy);
 check('Shenzhen slogan resets to Beijing theme name',(await state()).selection.current.text==='auto'&&/label-beijing-/.test((await state()).city.labelSource));
 await page.locator('#close-artwork').click();
 for(const v of catalog.variants.filter(v=>v.theme!=='beijing')){for(const finish of ['enamel','metal','paint']){await select(v.id,finish);check(`legacy ${v.id}/${finish}`,same((await state()).fixed,initial.fixed));}}
 await select('beijing-green');const previous=await state();
 await page.route(/beijing-red-baseColor-.*\.webp/,r=>r.abort());
 const failed=await page.evaluate(()=>window.cupViewer.selectArtwork({variant:'beijing-red'}));
 check('failed new palette preserves the complete previous set',!failed&&(await state()).selection.current.variant==='beijing-green'&&same((await state()).city.maps,previous.city.maps));
 await page.unroute(/beijing-red-baseColor-.*\.webp/);
 await page.evaluate(()=>Promise.all([window.cupViewer.selectArtwork({variant:'beijing-red'}),window.cupViewer.selectArtwork({variant:'beijing-purple'}),window.cupViewer.selectArtwork({variant:'beijing-blue',text:'none'})]));
 check('rapid switching commits only latest complete choice',(await state()).selection.current.variant==='beijing-blue'&&(await state()).city.labelSource===null);
 await select('beijing-green');await wait(400);const mem=(await state()).memory.textures;
 for(let i=0;i<2;i++){await select('beijing-red');await select('beijing-green');}
 check('replaced GPU textures are released',(await state()).memory.textures<=mem+1);
 const ca=await state();await select('beijing-purple');const cb=await state();
 check('palette switch preserves camera, target and background',same(ca.camera,cb.camera)&&same(ca.target,cb.target)&&same(ca.background,cb.background));
 await page.locator('#reset').click();await wait(1500);check('reset preserves selected style',(await state()).selection.current.variant==='beijing-purple');
 const pan=await state();await page.mouse.move(480,450);await page.mouse.down({button:'right'});await page.mouse.move(570,480,{steps:8});await page.mouse.up({button:'right'});await wait(500);
 check('right-button pan works',!same(pan.target,(await state()).target));
 await page.evaluate(()=>window.cupViewer.restore());check('restore returns original China gold',(await state()).city.pack.id===legacy.id);
 check('legacy applyCityArtwork interface remains compatible',await page.evaluate(p=>window.cupViewer.applyCityArtwork(p),legacy));
 for(const [width,height]of[[320,667],[390,844],[844,390],[1440,1000]]){
  const c=await browser.newContext({viewport:{width,height},isMobile:width<900,hasTouch:width<900}),p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));
  await p.goto(url);await p.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:180000});await p.waitForTimeout(1400);
  check(`viewport ${width} no overflow and default background`,await p.evaluate(()=>document.documentElement.scrollWidth===innerWidth&&window.cupViewer.debug().background.active===(innerWidth<=900?'soft-v3':'gray')));
  await p.locator('#open-artwork').click();await p.locator('[data-theme="beijing"]').click();await p.waitForFunction(()=>!window.cupViewer.debug().selection.busy);
  check(`viewport ${width} Beijing panel fits`,await p.locator('#artwork-settings').evaluate(e=>{const r=e.getBoundingClientRect();return r.x>=0&&r.y>=0&&r.right<=innerWidth+1&&r.bottom<=innerHeight+1}));
  await p.screenshot({path:`${out}/viewport-${width}-panel.jpg`,quality:90});
  await p.locator('[data-variant="beijing-green"]').click();await p.waitForFunction(()=>!window.cupViewer.debug().selection.busy);await p.locator('#close-artwork').click();
  await p.screenshot({path:`${out}/viewport-${width}-hero.jpg`,quality:90});
  if(width===390){const session=await c.newCDPSession(p);const old=await p.evaluate(()=>window.cupViewer.debug());
   await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:140,y:330,id:0},{x:220,y:330,id:1}]});
   for(let i=1;i<=7;i++)await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:140+i*4,y:330+i*3,id:0},{x:220+i*4,y:330+i*3,id:1}]});
   await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(600);
   check('emulated two-finger drag pans',!same(old.target,(await p.evaluate(()=>window.cupViewer.debug())).target));
  }await c.close();
 }
 check('no shader errors or uncaught exceptions',errors.length===0);
}finally{await writeFile(out+'/qa.json',JSON.stringify({url,checks,errors,timings,date:new Date().toISOString(),physicalDevice:'not tested; browser viewport and touch emulation only'},null,2));await browser.close();}
