import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import sharp from 'sharp';
const url=process.env.QA_URL??'http://127.0.0.1:5214/',remote=url.startsWith('https:'),out=remote?'output/playwright/v4/online':'public/review/v4';
await mkdir(out,{recursive:true});
const catalog=JSON.parse(await readFile('src/styles/city-catalog.json','utf8'));
const checks=[],errors=[],timings=[],capture=process.env.QA_CAPTURE!=='0';
if(process.env.QA_MATRIX==='0'){const previous=JSON.parse(await readFile(out+'/qa.json','utf8'));checks.push(...previous.checks);timings.push(...previous.timings);}
const browser=await chromium.launch({channel:'chrome',headless:true,args:process.env.CHROME_ARGS?.split('|')??[]});
const context=await browser.newContext({viewport:{width:1100,height:900}}),page=await context.newPage();
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&/WebGLProgram|Shader Error|GL_INVALID/.test(m.text()))errors.push(m.text());});
const check=(name,ok)=>{assert.ok(ok,name);if(!checks.includes(name))checks.push(name);console.log('PASS',name);};
const state=()=>page.evaluate(()=>window.cupViewer.debug()),wait=ms=>page.waitForTimeout(ms),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const shot=async name=>{if(capture)await page.screenshot({path:`${out}/${name}.jpg`,quality:90});};
const setView=async v=>{await page.evaluate(v=>window.cupViewer.setView(v,true),v);await wait(450);};
const select=async (variant,finish='enamel',text='auto')=>{const t=Date.now(),ok=await page.evaluate(s=>window.cupViewer.selectArtwork(s),{variant,finish,text});assert.ok(ok,variant);await wait(200);timings.push({variant,finish,text,elapsedMs:Date.now()-t});};
try{
 const start=Date.now();await page.goto(url);await page.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:180000});await wait(1900);
 const initial=await state(),legacy=initial.city.pack;
 timings.push({stage:'cold-default-to-ready-including-1900ms-settle',elapsedMs:Date.now()-start,resources:await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({url:r.name,bytes:r.transferSize,decoded:r.decodedBodySize,duration:r.duration})))});
 check('default is the unchanged gold pack, exposure and fixed relief',initial.version==='4.0.0'&&initial.selection.current.variant==='china-gold'&&initial.city.pack.version===3&&initial.exposure===1.08&&initial.fixedFinish.normalScale===4.4&&initial.fixedFinish.clearcoatNormalScale===2.4);
 check('no new variant textures are requested on first screen',await page.evaluate(()=>!performance.getEntriesByType('resource').some(r=>r.name.includes('/cities/v4/'))));
 await shot('gold-hero');await page.screenshot({path:out+'/gold-hero.png'});
 if(!remote){const region={left:140,top:125,width:790,height:640};const a=await sharp('output/playwright/v4/baseline/gold-hero.png').extract(region).raw().toBuffer(),b=await sharp(out+'/gold-hero.png').extract(region).raw().toBuffer();const delta=a.reduce((n,v,i)=>n+Math.abs(v-b[i]),0)/a.length;check('V3 versus V4 gold model region mean byte difference < 0.01',delta<.01);timings.push({goldPixelMeanDifference:delta});}
 // Exercise actual controls before the systematic visual matrix.
 await page.locator('#open-artwork').click();await shot('desktop-panel');
 await page.locator('[data-variant="china-green"]').click();await page.waitForFunction(()=>!window.cupViewer.debug().selection.busy);
 await page.locator('#artwork-finish').selectOption('paint');await page.waitForFunction(()=>!window.cupViewer.debug().selection.busy);
 check('UI variant and finish controls commit together',(await state()).selection.current.variant==='china-green'&&(await state()).city.pack.finish==='paint');
 await page.locator('#artwork-text').selectOption('none');await page.waitForFunction(()=>!window.cupViewer.debug().selection.busy);
 await page.locator('[data-theme="shenzhen"]').click();await page.waitForFunction(()=>!window.cupViewer.debug().selection.busy);
 check('hidden lettering survives UI theme change',(await state()).city.labelSource===null);
 await page.locator('#close-artwork').click();
 for(const v of process.env.QA_MATRIX==='0'?[]:process.env.QA_VARIANT?catalog.variants.filter(v=>v.id===process.env.QA_VARIANT):catalog.variants){
  for(const finish of ['enamel','metal','paint']){
   await select(v.id,finish);const s=await state();
   check(`${v.id}/${finish}: aligned float normals; fixed assets, geometry and white porcelain retained`,s.city.maps.length===6&&s.city.maps.every(m=>same(m.size,[4096,1783]))&&s.city.maps[4].precision==='RGBA16F'&&same(s.fixed,initial.fixed)&&same(s.geometries,initial.geometries)&&same(s.porcelain,initial.porcelain));
   await setView('hero');await shot(`${v.id}-${finish}-hero`);
   if(capture){await setView('front');await shot(`${v.id}-${finish}-text`);await setView('detail');await shot(`${v.id}-${finish}-detail`);
    await page.evaluate(()=>window.cupViewer.setCamera([-125,70,-140],[-9,40,-11]));await wait(600);await shot(`${v.id}-${finish}-grazing`);}
  }
  await select(v.id);await setView('detail');await page.evaluate(()=>window.cupViewer.setMode('relief'));await wait(200);await shot(`${v.id}-gray`);
  await page.evaluate(()=>window.cupViewer.setRelief(0));await wait(200);await shot(`${v.id}-gray-off`);await page.evaluate(()=>{window.cupViewer.setMode('pbr');window.cupViewer.setRelief(1)});
  for(const text of v.theme==='china'?['name','none']:['name','he','create','none']){
   await select(v.id,'enamel',text);const s=await state();check(`${v.id}/${text}: separate text option`,text==='none'?s.city.labelSource===null:s.city.labelColor===v.textColor);
   await setView('front');await shot(`${v.id}-lettering-${text}`);
  }
  console.log('VISUAL COMPLETE',v.id);
 }
 await select('china-green');await setView('hero');const stable=await state();
 const failure=await page.evaluate(async()=>{const c=window.cupViewer,p=c.debug().city.pack;try{await c.applyCityArtwork({...p,baseColor:'data:image/png;base64,broken'});return false}catch{return true}});
 check('failed legacy/API load preserves every active map',failure&&same((await state()).city.maps,stable.city.maps));
 await page.route(/\/china-blue-[a-f0-9]+\.hfn\.gz/,r=>r.abort());await page.evaluate(()=>window.cupViewer.selectArtwork({variant:'china-blue'}));
 check('failed selector load retains current and rolls controls back',(await state()).selection.current.variant==='china-green'&&(await state()).selection.desired.variant==='china-green'&&same((await state()).city.maps,stable.city.maps));await page.unroute(/\/china-blue-[a-f0-9]+\.hfn\.gz/);
 await page.evaluate(()=>Promise.all([window.cupViewer.selectArtwork({variant:'china-red'}),window.cupViewer.selectArtwork({variant:'china-purple'}),window.cupViewer.selectArtwork({variant:'shenzhen-teal',text:'create'})]));
 check('rapid changes only commit the latest complete selection',(await state()).selection.current.variant==='shenzhen-teal'&&(await state()).city.pack.id==='shenzhen-teal');
 await wait(600);const memory=(await state()).memory;
 for(let i=0;i<3;i++){await select('china-green');await select('shenzhen-teal');}
 check('repeated replacement releases old GPU textures',(await state()).memory.textures<=memory.textures+1);
 const beforeCamera=await state();await select('china-red');const afterCamera=await state();
 check('artwork changes preserve camera, target and background',same(beforeCamera.camera,afterCamera.camera)&&same(beforeCamera.target,afterCamera.target)&&same(beforeCamera.background,afterCamera.background));
 await page.locator('#reset').click();await wait(1700);check('reset changes only view, not chosen artwork',(await state()).selection.current.variant==='china-red');
 await page.evaluate(()=>window.cupViewer.restore());await wait(400);
 check('restore returns original gold and texture budget',(await state()).city.pack.id===legacy.id&&(await state()).city.maps.length===5&&(await state()).memory.textures<=initial.memory.textures+1);
 check('old city package interface remains compatible',await page.evaluate(p=>window.cupViewer.applyCityArtwork(p),legacy));
 const pan=await state();await page.mouse.move(500,400);await page.mouse.down({button:'right'});await page.mouse.move(620,430,{steps:12});await page.mouse.up({button:'right'});await wait(800);
 check('right-button drag translates the camera target',!same(pan.target,(await state()).target));
 for(const view of ['front','handle','top','bottom','saucerBottom','exploded','lid','detail','flowers','hero']){await setView(view);check('view '+view,(await state()).view===view);}
 await context.close();
 for(const [width,height]of[[320,667],[390,844],[844,390],[1440,1000]]){
  const c=await browser.newContext({viewport:{width,height},isMobile:width<900,hasTouch:width<900}),p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));
  await p.goto(url);await p.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:180000});await p.waitForTimeout(1800);
  check(`viewport ${width}: no document overflow`,await p.evaluate(()=>document.documentElement.scrollWidth===innerWidth));
  check(`viewport ${width}: correct automatic background`,(await p.evaluate(()=>window.cupViewer.debug().background.active))===(width<=900?'soft-v3':'gray'));
  await p.locator('#open-artwork').click();await p.waitForFunction(()=>[...document.querySelectorAll('.variant-card img')].every(i=>i.complete&&i.naturalWidth>0));if(capture)await p.screenshot({path:`${out}/viewport-${width}-panel.jpg`,quality:90});
  check(`viewport ${width}: panel is on screen`,await p.locator('#artwork-settings').evaluate(e=>{const r=e.getBoundingClientRect();return r.x>=0&&r.y>=0&&r.right<=innerWidth&&r.bottom<=innerHeight}));
  await p.locator('[data-theme="shenzhen"]').click();await p.waitForFunction(()=>!window.cupViewer.debug().selection.busy);await p.locator('#close-artwork').click();
  if(width===390){const session=await c.newCDPSession(p);const old=await p.evaluate(()=>window.cupViewer.debug());
   await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:140,y:330,id:0},{x:220,y:330,id:1}]});
   for(let i=1;i<=7;i++)await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:140+i*4,y:330+i*3,id:0},{x:220+i*4,y:330+i*3,id:1}]});
   await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(700);
   check('two-finger emulated drag pans',!same(old.target,(await p.evaluate(()=>window.cupViewer.debug())).target));
  }
  if(capture)await p.screenshot({path:`${out}/viewport-${width}.jpg`,quality:90});await c.close();
 }
 check('no shader errors or uncaught page exceptions',errors.length===0);
}finally{await writeFile(out+'/qa.json',JSON.stringify({url,date:new Date().toISOString(),checks,errors,timings,physicalDevice:'not tested; viewport and touch are browser emulation'},null,2));await browser.close();}
