import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
const url=process.env.QA_URL??'http://127.0.0.1:5225/';
const out=process.env.QA_OUT??'.codex-work/tmp/v5/qa';await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});const context=await browser.newContext({viewport:{width:1200,height:900}});const page=await context.newPage();
const catalog=JSON.parse(await readFile(new URL('../src/styles/city-catalog-v5.json',import.meta.url),'utf8'));
const cities=Object.keys(catalog.cities);
const checks=[],errors=[],expectedErrors=[],timings=[];let expectingNetworkFailure=false;
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')(expectingNetworkFailure&&/net::ERR_FAILED/.test(m.text())?expectedErrors:errors).push(m.text());});
const check=(name,ok)=>{assert.ok(ok,name);checks.push(name);console.log('PASS',name);};
const state=()=>page.evaluate(()=>window.cupViewer.debug());const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const settled=()=>page.waitForFunction(()=>!window.cupViewer.debug().selection.busy);
const shot=async name=>{await page.waitForTimeout(180);await page.screenshot({path:`${out}/${name}.png`});};
const select=async patch=>{assert.ok(await page.evaluate(p=>window.cupViewer.selectArtwork(p),patch));await settled();};
const slide=async(id,value)=>{await page.locator(id).scrollIntoViewIfNeeded();await page.locator(id).evaluate((el,v)=>{el.value=String(v);el.dispatchEvent(new Event('input',{bubbles:true}));},value);const key={'#material-blend':'material','#fill-hue':'hue','#fill-saturation':'saturation','#fill-lightness':'lightness','#city-relief':'relief'}[id];await page.waitForFunction(({key,value})=>Math.abs(window.cupViewer.debug().city.parameters.appearance[key]-value)<.001,{key,value:id==='#material-blend'?value/100:value},{timeout:15000});await settled();};
try{
 const started=Date.now();await page.goto(url,{waitUntil:'domcontentloaded',timeout:90000});await page.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:180000});await page.waitForTimeout(1000);const initial=await state();
 timings.push({initialMs:Date.now()-started});check('page identity, V5 and meaningful canvas',initial.version==='5.1.0'&&await page.title().then(x=>x.includes('中国'))&&await page.locator('h1').textContent().then(x=>x.includes('共彩')));
 check('default China unchanged and optional V5 cities not preloaded',initial.selection.current.variant==='china-gold'&&!await page.evaluate(()=>performance.getEntriesByType('resource').some(r=>r.name.includes('/cities/v5/'))));
 check('no framework overlay',await page.locator('vite-error-overlay').count()===0);
 await page.locator('#open-artwork').click();await page.locator('[data-theme="beijing"]').click();await settled();
 check('Beijing has five presets and no paint option',await page.locator('.variant-card').count()===5&&await page.locator('option[value=paint]').count()===0);
 await page.locator('[data-variant="beijing-green"]').click();await settled();await page.waitForTimeout(300);const green=await state();
 check('source maps aligned and high precision; fixed art and geometry preserved',green.city.maps.length===3&&green.city.maps.every(m=>same(m.size,[4096,1783]))&&green.city.maps[1].precision==='RGBA16F'&&same(green.fixed,initial.fixed)&&same(green.geometries,initial.geometries));
 const resources=await page.evaluate(()=>performance.getEntriesByType('resource').filter(r=>r.name.includes('/cities/v5/')).length);const maps=green.city.maps;
 for(const preset of ['gold','green','red','purple','blue']){await page.locator(`[data-variant="beijing-${preset}"]`).click();await settled();check(`preset ${preset} reuses city geometry and maps`,same((await state()).city.maps,maps));}
 await page.locator('[data-variant="beijing-green"]').click();await settled();
 for(const value of [0,25,50,75,100]){await slide('#material-blend',value);const s=await state();check(`material ${value}% updates fill and preserves gold`,s.city.parameters.fill.metalness===value/100&&s.city.parameters.line.color==='#dcb251'&&s.city.parameters.line.metalness===1&&same(s.city.maps,maps));await shot(`beijing-material-${value}`);}
 await slide('#fill-hue',235);await slide('#fill-saturation',70);await slide('#fill-lightness',35);await slide('#city-relief',1.6);await slide('#material-blend',37);
 const custom=await state();await shot('beijing-custom-panel');
 check('sliders update actual material without additional city requests',custom.city.parameters.appearance.hue===235&&custom.city.relief===1.6&&resources===await page.evaluate(()=>performance.getEntriesByType('resource').filter(r=>r.name.includes('/cities/v5/')).length));
 check('uniform edits do not create GPU textures or programs',same(custom.city.maps,maps)&&custom.memory.textures===green.memory.textures&&custom.memory.programs===green.memory.programs&&custom.reflections.captures===green.reflections.captures);
 await page.locator('#artwork-text').selectOption('none');await settled();await page.locator('[data-theme="shenzhen"]').click();await settled();await page.waitForTimeout(200);const sz=await state();
 check('theme switch preserves all custom parameters and hidden lettering',same(sz.selection.current.appearance,custom.selection.current.appearance)&&sz.city.labelSource===null&&sz.city.cachedCities===2);
 await shot('shenzhen-custom-panel');for(const preset of ['gold','green','red','purple','blue']){await select({variant:`shenzhen-${preset}`});check(`Shenzhen ${preset} preset uses shared structure`,same((await state()).city.maps,sz.city.maps));}await page.locator('[data-variant="shenzhen-red"]').click();await settled();
 await page.locator('#artwork-text').selectOption('he');await settled();check('Shenzhen explicit slogan remains compatible',/label-he-/.test((await state()).city.labelSource));await page.locator('#artwork-text').selectOption('none');await settled();
 check('preset resets material, HSL and relief',((await state()).selection.current.appearance.material===0)&&((await state()).city.relief===1));
 await page.locator('#finish-metal').click();await page.waitForTimeout(80);await settled();check('metal shortcut sets endpoint',(await state()).city.parameters.fill.metalness===1);
 await page.locator('#finish-enamel').click();await page.waitForTimeout(80);await settled();check('enamel shortcut sets endpoint',(await state()).city.parameters.fill.metalness===0);
 await page.locator('#artwork-text').selectOption('name');await settled();await page.locator('#close-artwork').click();await shot('shenzhen-red-hero');
 // Every newly supplied city must render, preserve parameters and keep only two packs cached.
 check('fourteen city options include separate Beijing 2 and Shenzhen 2',await page.locator('[data-theme]').count()===14&&await page.locator('[data-theme="beijing-2"]').textContent()==='北京 2'&&await page.locator('[data-theme="shenzhen-2"]').textContent()==='深圳 2');
 await select({variant:'shenzhen-green'});await page.locator('#open-artwork').click();await page.locator('#artwork-settings').evaluate(el=>{el.scrollTop=0;});await shot('city-options');await slide('#material-blend',37);await slide('#fill-hue',150);await slide('#city-relief',1.25);
 const preserved=(await state()).selection.current.appearance;
 for(const id of cities){
  await page.locator(`[data-theme="${id}"]`).click();await settled();const s=await state();
  check(`${id} renders its own complete maps with persistent appearance and bounded cache`,s.selection.current.variant.startsWith(id+'-')&&same(s.selection.current.appearance,preserved)&&s.city.maps.length===3&&s.city.pack.parametric.mask.endsWith(id+'-structure.webp')&&s.city.cachedCities<=2&&s.city.parameters.line.color==='#dcb251'&&same(s.fixed,initial.fixed));
  await page.locator('#close-artwork').click();await select({variant:`${id}-green`});await page.evaluate(()=>window.cupViewer.setView('hero',true));await shot(`city-${id}`);
  await page.locator('#open-artwork').click();await slide('#material-blend',37);await slide('#fill-hue',150);await slide('#city-relief',1.25);
 }
 await page.locator('#close-artwork').click();await page.evaluate(()=>window.cupViewer.setView('hero',true));
 const mem=(await state()).memory.textures;
 for(let i=0;i<4;i++){await select({variant:'beijing-red'});await select({variant:'shenzhen-blue'});}
 check('repeated switching retains bounded cache and texture count',(await state()).city.cachedCities===2&&(await state()).memory.textures<=mem+1);
 await page.evaluate(()=>Promise.all([window.cupViewer.selectArtwork({variant:'beijing-green'}),window.cupViewer.selectArtwork({variant:'shenzhen-red'}),window.cupViewer.selectArtwork({variant:'beijing-blue'})]));await settled();
 check('rapid city choices commit only latest complete state',(await state()).selection.current.variant==='beijing-blue');
 const previous=await state();const failedPack={...previous.city.pack,normal:'/v5-test-missing-normal.hfn.gz',parametric:{...previous.city.pack.parametric,mask:'/v5-test-missing-mask.webp'}};
 await page.route(/v5-test-missing-/,r=>r.abort());expectingNetworkFailure=true;
 const failed=await page.evaluate(async p=>{try{return await window.cupViewer.applyCityArtwork(p);}catch{return false;}},failedPack);await page.waitForTimeout(100);expectingNetworkFailure=false;
 check('failed load preserves active maps, selection and visible city',!failed&&same((await state()).city.maps,previous.city.maps)&&same((await state()).selection.current,previous.selection.current));await page.unroute(/v5-test-missing-/);
 check('legacy paint input resolves to enamel',await page.evaluate(async()=>{await window.cupViewer.selectArtwork({finish:'paint'});return window.cupViewer.debug().city.parameters.fill.metalness===0;}));
 await select({variant:'beijing-green'});await page.evaluate(()=>window.cupViewer.setView('detail',true));
 for(const relief of [0,1,2]){await page.evaluate(v=>window.cupViewer.setRelief(v),relief);await settled();await page.evaluate(()=>window.cupViewer.setMode('relief'));await shot(`beijing-relief-${relief}`);check(`relief ${relief} keeps displacement disabled`,(await state()).city.displacementScale===0&&(await state()).city.relief===relief);}
 await page.evaluate(()=>window.cupViewer.setMode('metalness'));await shot('beijing-metalness-inspection');check('parameterized metallic coverage inspection renders',!(await state()).city.parameters.fill.metalness);await page.evaluate(()=>{window.cupViewer.setMode('pbr');window.cupViewer.setView('hero',true);});await page.evaluate(()=>window.cupViewer.restore());await settled();check('restore and legacy API compatibility',(await state()).city.relief===1&&(await state()).city.pack.id===initial.city.pack.id&&await page.evaluate(p=>window.cupViewer.applyCityArtwork(p),initial.city.pack));
 for(const [width,height]of[[390,844],[844,390]]){
  await page.setViewportSize({width,height});await select({variant:'beijing-green'});await page.locator('#open-artwork').click();await page.locator('#artwork-settings').evaluate(el=>{el.scrollTop=0;});await page.waitForTimeout(250);await shot(`mobile-${width}-city-options`);
  check(`viewport ${width} panel fits and has no horizontal overflow`,await page.evaluate(()=>{const r=document.querySelector('#artwork-settings').getBoundingClientRect();return document.documentElement.scrollWidth===innerWidth&&r.x>=0&&r.right<=innerWidth+1&&r.y>=0&&r.bottom<=innerHeight+1;}));
  await page.locator('[data-theme="nanjing"]').click();await settled();check(`viewport ${width} last city option is reachable`,(await state()).selection.current.variant.startsWith('nanjing-'));await slide('#material-blend',50);check(`viewport ${width} controls update actual state`,(await state()).city.parameters.fill.metalness===.5);await shot(`mobile-${width}-panel`);await page.locator('#close-artwork').click();await shot(`mobile-${width}-hero`);
 }
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const touch=await mobile.newPage();touch.on('pageerror',e=>errors.push(e.message));
 await touch.goto(url,{waitUntil:'domcontentloaded',timeout:90000});await touch.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:180000});await touch.locator('#open-artwork').tap();await touch.locator('[data-theme="beijing"]').tap();await touch.waitForFunction(()=>!window.cupViewer.debug().selection.busy);await touch.locator('[data-variant="beijing-green"]').tap();await touch.waitForFunction(()=>!window.cupViewer.debug().selection.busy);
 await touch.locator('#material-blend').scrollIntoViewIfNeeded();const box=await touch.locator('#material-blend').boundingBox();const cdp=await mobile.newCDPSession(touch);
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:box.x+8,y:box.y+box.height/2}]});
 for(let i=1;i<=5;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:box.x+8+(box.width-16)*.7*i/5,y:box.y+box.height/2}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await touch.waitForFunction(()=>Math.abs(window.cupViewer.debug().city.parameters.appearance.material-.7)<.03);
 check('emulated phone touch drag changes the real material slider',true);await touch.screenshot({path:`${out}/phone-touch-panel.png`});await touch.locator('#close-artwork').tap();
 const target=await touch.evaluate(()=>window.cupViewer.debug().target);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:130,y:240,id:0},{x:220,y:240,id:1}]});
 for(let i=1;i<=6;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:130+i*4,y:240+i*2,id:0},{x:220+i*4,y:240+i*2,id:1}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await touch.waitForTimeout(250);check('emulated two-finger pan still works',!same(target,await touch.evaluate(()=>window.cupViewer.debug().target)));await mobile.close();
 const review=await context.newPage();await review.goto(new URL('review/v5/',url).href);await review.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
 check('source review decodes source, vector and fill for every registered pattern',await review.locator('img').count()===cities.length*3);check('source review offers all masters and coordinate template',await review.locator('a[download]').count()===cities.length+1);await review.screenshot({path:`${out}/source-review.png`});await review.close();
 check('no unexpected console, shader or runtime errors',errors.length===0);
}finally{await writeFile(`${out}/qa.json`,JSON.stringify({url,checks,errors,expectedErrors,timings,environment:'Chrome headless; Browser plugin not available; existing Playwright',physicalDevices:'not tested',date:new Date().toISOString()},null,2));await browser.close();}
