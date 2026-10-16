import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
const url=process.env.QA_URL??'http://127.0.0.1:5235/';
const out=process.env.QA_OUT??'../.codex-work/tmp/xy-controls/qa';await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1200,height:900}}),page=await context.newPage();
const catalog=JSON.parse(await readFile(new URL('../src/styles/city-catalog-v5.json',import.meta.url),'utf8'));
const cities=Object.keys(catalog.cities),checks=[],errors=[],expectedErrors=[],timings=[];
let expectingNetworkFailure=false;
const watch=p=>{p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{
 if(m.type()==='error')(expectingNetworkFailure&&/net::ERR_FAILED/.test(m.text())?expectedErrors:errors).push(m.text());
});};watch(page);
const check=(name,ok)=>{assert.ok(ok,name);checks.push(name);console.log('PASS',name);};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),near=(a,b,tolerance=.006)=>Math.abs(a-b)<tolerance;
const state=(p=page)=>p.evaluate(()=>window.cupViewer.debug());
const settled=(p=page)=>p.waitForFunction(()=>!window.cupViewer.debug().selection.busy&&!document.querySelector('#artwork-settings')?.hasAttribute('data-restoring'));
const ready=async(p=page)=>{await p.goto(url,{waitUntil:'domcontentloaded',timeout:90000});await p.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:180000});};
const shot=async name=>{await page.waitForTimeout(150);await page.screenshot({path:`${out}/${name}.png`});};
const open=async(p=page)=>{if(!await p.locator('#artwork-settings').isVisible())await p.locator('#open-artwork').click();};
const close=async(p=page)=>{if(await p.locator('#artwork-settings').isVisible())await p.locator('#close-artwork').click();};
const chooseCity=async(id,p=page)=>{
 await open(p);if(!await p.locator('.city-selector').evaluate(e=>e.open))await p.locator('.city-selector summary').click();
 await p.locator(`[data-theme="${id}"]`).click();await settled(p);
};
const select=async patch=>{assert.ok(await page.evaluate(p=>window.cupViewer.selectArtwork(p),patch));await settled();};
const patchAppearance=async patch=>{await page.evaluate(p=>window.cupViewer.selectArtwork({appearance:{...window.cupViewer.debug().selection.current.appearance,...p}}),patch);await settled();};
const point=async(id,x,y,p=page)=>{
 const pad=p.locator('#'+id);await pad.scrollIntoViewIfNeeded();await pad.evaluate(async e=>{await Promise.all([...e.getAnimations(),...(e.closest('.color-pad-row')?.getAnimations()??[]),...(e.closest('[role=tabpanel]')?.getAnimations()??[])].map(a=>a.finished.catch(()=>{})));});
 const b=await pad.boundingBox(),scale=await pad.evaluate(e=>e.getBoundingClientRect().width/e.clientWidth),edge=18*scale;
 return {x:b.x+edge+x*(b.width-2*edge),y:b.y+edge+(1-y)*(b.height-2*edge)};
};
const sliderPoint=async(t,p=page)=>{
 const input=p.locator('#fill-lightness');await input.evaluate(async e=>{await Promise.all(e.closest('.lightness-control').getAnimations().map(a=>a.finished.catch(()=>{})));});
 const b=await input.boundingBox(),height=await input.evaluate(e=>e.clientHeight),edge=17*b.height/height;
 return {x:b.x+b.width/2,y:b.y+edge+(1-t)*(b.height-2*edge)};
};
const pad=async(kind,x,y,p=page)=>{
 await open(p);await p.locator('#adjust-'+kind+'-tab').click();const pos=await point(kind+'-pad',x,y,p);
 await p.mouse.click(pos.x,pos.y);await settled(p);
};
const material=async(x,y)=>pad('material',x,y);
const color=async(h,s)=>{
 const angle=h*Math.PI/180,u=-Math.sin(angle),v=Math.cos(angle),scale=s/100/Math.max(Math.abs(u),Math.abs(v));
 await pad('color',(1+u*scale)/2,(1+v*scale)/2);
};
try{
 const started=Date.now();await ready();await page.waitForTimeout(600);const initial=await state();
 timings.push({initialMs:Date.now()-started});
 check('page identity, V5.1 and meaningful canvas',initial.version==='5.1.0'&&(await page.title()).includes('中国')&&(await page.locator('h1').textContent()).includes('共彩'));
 check('no framework overlay',await page.locator('vite-error-overlay').count()===0);
 check('China default and lazy city loading unchanged',initial.selection.current.variant==='china-gold'&&!await page.evaluate(()=>performance.getEntriesByType('resource').some(r=>r.name.includes('/cities/v5/'))));
 await chooseCity('beijing');await page.locator('[data-variant="beijing-green"]').click();await settled();await page.waitForTimeout(400);
 const green=await state(),maps=green.city.maps;
 check('five presets, two pads, lightness axis and retired controls removed',await page.locator('.variant-card').count()===5&&await page.locator('.xy-pad').count()===2&&await page.locator('#fill-lightness').count()===1&&await page.locator('#material-blend,#fill-hue,#fill-saturation,#city-relief,#finish-metal,#finish-enamel').count()===0);
 check('city selector folds after choosing and full square is visible',!await page.locator('.city-selector').evaluate(e=>e.open)&&await page.locator('#color-pad').evaluate(e=>{const r=e.getBoundingClientRect(),p=e.closest('aside').getBoundingClientRect();return r.y>=p.y&&r.bottom<=p.bottom&&Math.abs(r.width-r.height)<1;}));
 await shot('desktop-color');
 const originalAxes=(await state()).selection.current.appearance;
 await page.locator('#fill-lightness').press('Home');await settled();
 check('lightness keyboard minimum changes only the lightness axis',(await state()).selection.current.appearance.lightness===20&&(await state()).selection.current.appearance.hue===originalAxes.hue&&(await state()).selection.current.appearance.saturation===originalAxes.saturation&&(await state()).city.relief===originalAxes.relief);
 const fieldPixel=()=>page.locator('#color-pad .xy-background').evaluate(c=>[...c.getContext('2d').getImageData(Math.floor(c.width/2),1,1,1).data]);
 await page.waitForTimeout(80);check('lightness lower bound retains colour instead of black',Math.abs((await fieldPixel())[0]-102)<2);
 await page.locator('#fill-lightness').press('End');await settled();
 await page.waitForFunction(()=>{const c=document.querySelector('#color-pad .xy-background');return window.cupViewer.debug().selection.current.appearance.lightness===65&&Math.abs(c.getContext('2d').getImageData(Math.floor(c.width/2),1,1,1).data[1]-77)<2;});
 check('lightness upper bound retains colour instead of white',(await state()).selection.current.appearance.lightness===65&&(await fieldPixel())[1]<80);
 const slider=await page.locator('#fill-lightness').boundingBox();
 await page.mouse.move(slider.x+slider.width/2,slider.y+17);await page.mouse.down();const lightTarget=await sliderPoint(.55);await page.mouse.move(lightTarget.x,lightTarget.y,{steps:20});await page.waitForTimeout(150);
 const sliderScale=()=>page.locator('.lightness-thumb').evaluate(e=>new DOMMatrixReadOnly(getComputedStyle(e).transform).a);
 check('one-axis slider has a floating circular selector and live point canvas',await sliderScale()>1.2&&await page.locator('.lightness-thumb').evaluate(e=>e.clientWidth===e.clientHeight)&&await page.locator('.lightness-dots').evaluate(c=>c.width>0&&c.height>c.width));
 check('slider activation increases saturation without a white overlay',await page.locator('.lightness-rail').evaluate(e=>Number(getComputedStyle(e).filter.match(/saturate\(([^)]+)\)/)?.[1]??1)>1.5));await shot('lightness-pressed');await page.mouse.up();await settled();await page.waitForTimeout(700);
 check('one-axis selector settles after pointer release',near(await sliderScale(),1,.001));
 check('real vertical slider drag controls lightness without changing material',near((await state()).selection.current.appearance.lightness,44.75,2)&&(await state()).selection.current.appearance.material===originalAxes.material&&(await state()).selection.current.appearance.materialX===originalAxes.materialX);
 await page.waitForTimeout(100);const pixel=await fieldPixel(),actualL=(await state()).selection.current.appearance.lightness;
 const red=actualL<=50?255*actualL/50:255,other=actualL<=50?0:255*(actualL-50)/50;
 check('cached lightness field matches HSL colour',Math.abs(pixel[0]-red)<=3&&Math.abs(pixel[1]-other)<=3&&Math.abs(pixel[2]-other)<=3);
 await shot('desktop-lightness');
 await page.mouse.move(slider.x+slider.width/2,slider.y+17+.45*(slider.height-34));await page.mouse.down();
 await select({variant:'beijing-blue'});const sliderReset=(await state()).selection.current.appearance;
 await page.mouse.move(slider.x+slider.width/2,slider.y+17+.2*(slider.height-34),{steps:8});await page.mouse.up();await settled();
 check('external preset cancels stale native slider edits',same((await state()).selection.current.appearance,sliderReset));
 await page.emulateMedia({reducedMotion:'reduce'});await page.mouse.down();await page.waitForTimeout(80);const staticSlider=await page.locator('.lightness-dots').evaluate(c=>c.toDataURL());await page.waitForTimeout(100);
 check('reduced motion keeps slider highlight static without scaling',near(await sliderScale(),1,.001)&&staticSlider===await page.locator('.lightness-dots').evaluate(c=>c.toDataURL()));await page.mouse.up();await page.emulateMedia({reducedMotion:'no-preference'});
 await page.locator('[data-variant="beijing-green"]').click();await settled();
 await page.waitForFunction(()=>{const c=document.querySelector('#color-pad .xy-background'),l=window.cupViewer.debug().selection.current.appearance.lightness;return Math.abs(c.getContext('2d').getImageData(Math.floor(c.width/2),1,1,1).data[0]-Math.min(255,255*l/50))<3;});
 const baseField=await page.locator('#color-pad .xy-background').evaluate(c=>c.toDataURL());
 const fieldBrightness=()=>page.locator('#color-pad .xy-background').evaluate(c=>Number(getComputedStyle(c).filter.match(/brightness\(([^)]+)\)/)?.[1]??1));
 const motionPoint=await point('color-pad',.75,.7);await page.mouse.move(motionPoint.x,motionPoint.y);await page.mouse.down();await page.waitForTimeout(80);
 const dotFrame=()=>page.locator('#color-pad .xy-dots').evaluate(c=>c.toDataURL());
 const activationGain=await fieldBrightness(),pressAppearance=(await state()).selection.current.appearance;
 const firstDots=await dotFrame();await page.waitForTimeout(140);const secondDots=await dotFrame();
 const knobScale=()=>page.locator('#color-pad .xy-thumb').evaluate(e=>new DOMMatrixReadOnly(getComputedStyle(e).transform).a);
 console.log('Press feedback',JSON.stringify({scale:await knobScale(),dotChange:firstDots!==secondDots,classes:await page.locator('#color-pad').getAttribute('class')}));check('pressed knob expands and nearby dots animate',await knobScale()>1.1&&firstDots!==secondDots);await shot('motion-pressed');
 check('whole colour pad expands while a stationary press keeps its value',await page.locator('#color-pad').evaluate(e=>e.getBoundingClientRect().width/e.clientWidth>1.1)&&same((await state()).selection.current.appearance,pressAppearance));
 await page.waitForTimeout(650);check('surface stays illuminated during sustained input',await fieldBrightness()>1.3);check('illumination uses colour brightness without a white canvas veil',await page.locator('#color-pad .xy-dots').evaluate(c=>c.getContext('2d').getImageData(Math.round(c.width*.2),Math.round(c.height*8/c.clientHeight),1,1).data[3]<5));await page.mouse.up();await page.waitForTimeout(120);check('surface afterglow briefly softens release',await fieldBrightness()>1.1);await page.waitForTimeout(700);const settledDots=await dotFrame();await page.waitForTimeout(100);
 const restingGain=await fieldBrightness(),baseUnchanged=await page.locator('#color-pad .xy-background').evaluate(c=>c.toDataURL())===baseField;
 console.log('Spotlight samples',JSON.stringify({activationGain,restingGain,baseUnchanged}));
 check('activation surface light fades without repainting the base colour field',activationGain>1.3&&restingGain===1&&baseUnchanged);
 check('release settles the spring and stops dot animation',near(await knobScale(),1,.001)&&settledDots===await dotFrame());
 await page.emulateMedia({reducedMotion:'reduce'});await page.mouse.down();await page.waitForTimeout(80);const reducedDots=await dotFrame();await page.waitForTimeout(140);
 check('reduced motion disables temporal dot animation and knob scaling',near(await knobScale(),1,.001)&&reducedDots===await dotFrame());await page.mouse.up();await page.emulateMedia({reducedMotion:'no-preference'});
 await pad('color',.8,.7);await page.waitForTimeout(1800);
 const guides=await page.locator('#color-pad .xy-dots').evaluate(c=>{
  const size=c.clientWidth,span=size-36,divisions=Math.max(6,Math.round(span/20)),ratio=c.width/size,ctx=c.getContext('2d');
  const alpha=(x,y)=>{const pixels=ctx.getImageData(Math.round((18+x/divisions*span)*ratio)-1,Math.round((18+y/divisions*span)*ratio)-1,3,3).data;return Math.max(...Array.from({length:9},(_,i)=>pixels[i*4+3]));};
  return {horizontal:alpha(0,Math.round(.3*divisions)),vertical:alpha(Math.round(.8*divisions),divisions),offAxis:alpha(0,divisions)};
 });timings.push({guidePixels:guides});
 check('dotted crosshair stays brighter than distant off-axis dots after release',guides.horizontal>guides.offAxis+40&&guides.vertical>guides.offAxis+40);
 const originalRef=await page.locator('#color-pad .xy-reference').evaluate(e=>[e.dataset.x,e.dataset.y]);await pad('color',.2,.3);
 check('reference marker stays at the preset origin across gestures',same(originalRef,await page.locator('#color-pad .xy-reference').evaluate(e=>[e.dataset.x,e.dataset.y]))&&await page.locator('#color-pad .xy-reference').count()===1&&await page.locator('#color-pad .xy-neutral').count()===0);
 await page.locator('#color-pad').press('ArrowLeft');await page.waitForTimeout(400);
 check('keyboard focus is elevated and highlighted without an outer frame',await page.locator('#color-pad').evaluate(e=>document.activeElement===e&&getComputedStyle(e).outlineStyle==='none')&&await knobScale()>1.1);
 await page.locator('#fill-lightness').press('ArrowUp');
 check('lightness focus keeps its accessible name without an enclosing outline',await page.getByRole('slider',{name:'明度',exact:true}).count()===1&&await page.locator('#fill-lightness').evaluate(e=>getComputedStyle(e).opacity==='0'));

 await page.locator('[data-variant="beijing-green"]').click();await settled();
 const resources=await page.evaluate(()=>performance.getEntriesByType('resource').filter(r=>r.name.includes('/cities/v5/')).length);
 for(const preset of ['gold','green','red','purple','blue']){
  await page.locator(`[data-variant="beijing-${preset}"]`).click();await settled();
  check(`preset ${preset} reuses structure and centres material X`,same((await state()).city.maps,maps)&&(await state()).selection.current.appearance.materialX===.5);
 }
 await page.locator('[data-variant="beijing-green"]').click();await settled();
 for(const id of ['beijing','shenzhen']){
  await chooseCity(id);await page.locator(`[data-variant="${id}-green"]`).click();await settled();
  const before=(await state()).selection.current.appearance;
  for(const y of [0,.5,1])for(const x of [0,.5,1]){
   await material(x,y);const s=await state(),f=s.city.parameters.fill;
   check(`${id} material ${x},${y} updates fill and preserves colour, relief and gold`,
    near(f.metalness,y)&&near(s.selection.current.appearance.materialX,x)&&
    near(f.roughness,x===0?.75:x===1?.08:.31+(72/255-.31)*y)&&
    near(f.clearcoat,x===0?0:x===1?1:191/255+(26/255-191/255)*y)&&
    s.selection.current.appearance.hue===before.hue&&s.city.relief===before.relief&&
    same(s.city.parameters.line,green.city.parameters.line)&&same(s.fixed,initial.fixed));
   await close();await page.evaluate(()=>window.cupViewer.setView('hero',true));await shot(`${id}-material-${x}-${y}`);
  }
 }
 await chooseCity('beijing');await page.locator('[data-variant="beijing-green"]').click();await settled();await page.waitForTimeout(300);
 const beforeEdits=await state(),editResources=await page.evaluate(()=>performance.getEntriesByType('resource').filter(r=>r.name.includes('/cities/v5/')).length);
 await patchAppearance({lightness:35,relief:1.6});await color(235,70);await material(.81,.37);const custom=await state();
 check('colour and material update actual state independently while retaining hidden lightness and relief',
  near(custom.selection.current.appearance.hue,235,.8)&&near(custom.selection.current.appearance.saturation,70,.6)&&custom.selection.current.appearance.lightness===35&&custom.city.relief===1.6&&near(custom.city.parameters.fill.metalness,.37));
 check('uniform edits add no city requests, GPU textures, programs or reflection captures',
  editResources===await page.evaluate(()=>performance.getEntriesByType('resource').filter(r=>r.name.includes('/cities/v5/')).length)&&
  same(custom.city.maps,beforeEdits.city.maps)&&custom.memory.textures===beforeEdits.memory.textures&&custom.memory.programs===beforeEdits.memory.programs&&custom.reflections.captures===beforeEdits.reflections.captures);
 await shot('desktop-material');
 await page.locator('#artwork-text').selectOption('none');await settled();await chooseCity('shenzhen');
 const sz=await state();check('city switch preserves two axes, colour, hidden text and bounded cache',same(sz.selection.current.appearance,custom.selection.current.appearance)&&sz.city.labelSource===null&&sz.city.cachedCities===2);
 await page.locator('[data-variant="shenzhen-red"]').click();await settled();
 check('preset resets both axes, HSL and relief',(await state()).selection.current.appearance.materialX===.5&&(await state()).selection.current.appearance.material===0&&(await state()).city.relief===1);
 await material(.9,.8);await page.locator('#reset-palette').click();await settled();
 check('reset button restores both cursor coordinates',await page.locator('#material-pad').evaluate(e=>Math.abs(+e.dataset.x-.5)<1e-8&&+e.dataset.y===0));
 await page.locator('#artwork-text').selectOption('he');await settled();
 check('Shenzhen slogan API retained',/label-he-/.test((await state()).city.labelSource));
 await page.locator('#artwork-text').selectOption('none');await settled();
 for(const finish of ['metal','paint']){
  await material(.8,.4);await select({finish});
  check(`legacy ${finish} restores exact centre-column endpoint`,(await state()).selection.current.appearance.materialX===.5&&(await state()).city.parameters.fill.metalness===(finish==='metal'?1:0));
 }
 await pad('color',.73,.8);const hue=(await state()).selection.current.appearance.hue;await pad('color',.5,.5);
 check('centre preserves last hue and zero saturation',near((await state()).selection.current.appearance.hue,hue,.1)&&near((await state()).selection.current.appearance.saturation,0,.1));
 await pad('color',.499,1);const leftHue=(await state()).selection.current.appearance.hue;await pad('color',.501,1);const rightHue=(await state()).selection.current.appearance.hue;
 check('hue wraps continuously across red seam',Math.min(Math.abs(leftHue-rightHue),360-Math.abs(leftHue-rightHue))<2);
 await material(.5,.5);const beforeKey=(await state()).selection.current.appearance;
 await page.locator('#material-pad').press('ArrowRight');await settled();await page.locator('#material-pad').press('Shift+ArrowUp');await settled();
 check('keyboard and fine adjustment change both axes',near((await state()).selection.current.appearance.materialX,beforeKey.materialX+.01,.0001)&&near((await state()).selection.current.appearance.material,beforeKey.material+.001,.0001));
 await page.locator('#material-pad input').first().evaluate(el=>{el.value='23';el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));});await settled();
 check('equivalent accessible axis edits the same state',near((await state()).selection.current.appearance.materialX,.23,.0001)&&await page.getByRole('slider',{name:'调整材质横向位置',exact:true}).count()===1);
 const start=await point('material-pad',.2,.2),camera=(await state()).camera;
 await page.mouse.move(start.x,start.y);await page.mouse.down();const end=await point('material-pad',.8,.8);await page.mouse.move(end.x,end.y,{steps:20});await page.mouse.up();await settled();
 check('real drag updates both axes without rotating the cup',near((await state()).selection.current.appearance.materialX,.8)&&near((await state()).selection.current.appearance.material,.8)&&same((await state()).camera,camera));
 await page.mouse.move(end.x,end.y);await page.mouse.down();await page.mouse.move(end.x+400,end.y-400,{steps:8});await page.mouse.up();await settled();
 check('captured drag clamps beyond edges and releases cleanly',(await state()).selection.current.appearance.materialX===1&&(await state()).selection.current.appearance.material===1&&!await page.locator('#material-pad').evaluate(e=>e.classList.contains('is-dragging')));
 await material(.5,.5);const externalStart=await point('material-pad',.4,.4);
 await page.mouse.move(externalStart.x,externalStart.y);await page.mouse.down();await select({variant:'shenzhen-blue'});
 const externallySelected=(await state()).selection.current.appearance;
 await page.mouse.move(externalStart.x+45,externalStart.y+30);await page.mouse.up();await page.waitForTimeout(50);await settled();
 check('external preset cancels captured gesture and stale pending edits',same((await state()).selection.current.appearance,externallySelected)&&!await page.locator('#material-pad').evaluate(e=>e.classList.contains('is-dragging')));
 await material(.5,.5);const baseline=await state(),resourceCount=await page.evaluate(()=>performance.getEntriesByType('resource').length);
 const dragStart=await point('material-pad',.1,.1);await page.mouse.move(dragStart.x,dragStart.y);await page.mouse.down();
 for(let i=0;i<80;i++){const p=await point('material-pad',.15+.7*(i%10)/9,.15+.7*Math.floor(i/10)/7);await page.mouse.move(p.x,p.y);}
 await page.mouse.up();await settled();const afterDrag=await state();
 check('sustained drag keeps GPU and reflection resources fixed',same(afterDrag.city.maps,baseline.city.maps)&&afterDrag.memory.textures===baseline.memory.textures&&afterDrag.memory.programs===baseline.memory.programs&&afterDrag.reflections.captures===baseline.reflections.captures&&resourceCount===await page.evaluate(()=>performance.getEntriesByType('resource').length));
 check('twenty-eight city options include all supplied variants',cities.length===27&&await page.locator('[data-theme]').count()===cities.length+1);
 const preserved=afterDrag.selection.current.appearance;
 for(const id of cities){
  await chooseCity(id);const s=await state();
  check(`${id} retains creation state, own maps and bounded cache`,same(s.selection.current.appearance,preserved)&&s.city.maps.length===3&&s.city.pack.parametric.mask.endsWith(id+'-structure.webp')&&s.city.cachedCities<=2&&same(s.fixed,initial.fixed));
 }
 const memory=(await state()).memory.textures;
 for(let i=0;i<4;i++){await select({variant:'beijing-red'});await select({variant:'shenzhen-blue'});}
 check('repeated switching does not accumulate textures',(await state()).city.cachedCities===2&&(await state()).memory.textures<=memory+1);
 await page.evaluate(()=>Promise.all([window.cupViewer.selectArtwork({variant:'beijing-green'}),window.cupViewer.selectArtwork({variant:'shenzhen-red'}),window.cupViewer.selectArtwork({variant:'beijing-blue'})]));await settled();
 check('rapid choices commit only latest state',(await state()).selection.current.variant==='beijing-blue');
 const previous=await state(),failedPack={...previous.city.pack,normal:'/v5-test-missing-normal.hfn.gz',parametric:{...previous.city.pack.parametric,mask:'/v5-test-missing-mask.webp'}};
 await page.route(/v5-test-missing-/,r=>r.abort());expectingNetworkFailure=true;
 const failed=await page.evaluate(async p=>{try{return await window.cupViewer.applyCityArtwork(p);}catch{return false;}},failedPack);
 await page.waitForTimeout(100);expectingNetworkFailure=false;await page.unroute(/v5-test-missing-/);
 check('failed pack retains selection and visible maps',!failed&&same((await state()).city.maps,previous.city.maps)&&same((await state()).selection.current,previous.selection.current));
 await select({variant:'beijing-green'});await page.evaluate(()=>window.cupViewer.setView('detail',true));
 for(const relief of [0,1,2]){
  await page.evaluate(v=>window.cupViewer.setRelief(v),relief);await settled();
  check(`hidden relief API ${relief} retains compatibility`,(await state()).city.relief===relief&&(await state()).city.displacementScale===0);
 }
 await page.evaluate(()=>window.cupViewer.setMode('metalness'));await shot('metalness-inspection');await page.evaluate(()=>{window.cupViewer.setMode('pbr');window.cupViewer.setView('hero',true);});
 await page.evaluate(()=>window.cupViewer.restore());await settled();
 check('original restore and legacy artwork API remain compatible',(await state()).city.relief===1&&(await state()).city.pack.id===initial.city.pack.id&&await page.evaluate(p=>window.cupViewer.applyCityArtwork(p),initial.city.pack));
 for(const [width,height]of [[390,844],[600,900],[844,390],[1280,720]]){
  await close();await page.setViewportSize({width,height});await page.evaluate(()=>window.cupViewer.setView('hero',true));await chooseCity('beijing');await page.locator('[data-variant="beijing-green"]').click();await settled();await page.locator('#adjust-color-tab').click();await page.locator('#artwork-settings').evaluate(e=>{e.scrollTop=0;});await page.waitForTimeout(200);
  check(`viewport ${width} fits without horizontal overflow`,await page.locator('#artwork-settings').evaluate(e=>{const r=e.getBoundingClientRect();return document.documentElement.scrollWidth===innerWidth&&r.x>=0&&r.right<=innerWidth+1&&r.y>=0&&r.bottom<=innerHeight+1;}));
  if(height>520)check(`viewport ${width} shows entire pad and lightness axis on entry`,await page.locator('#color-pad').evaluate(e=>{const r=e.getBoundingClientRect(),p=e.closest('aside').getBoundingClientRect(),s=document.querySelector('#fill-lightness').getBoundingClientRect();return r.y>=p.y&&r.bottom<=p.bottom&&s.y>=p.y&&s.bottom<=p.bottom&&s.right<=p.right;}));
  await shot(`mobile-${width}-color`);await chooseCity(cities.at(-1));check(`viewport ${width} can reach final city option`,(await state()).selection.current.variant.startsWith(cities.at(-1)+'-'));await material(.7,.3);
  check(`viewport ${width} last city and material remain reachable`,(await state()).selection.current.variant.startsWith(cities.at(-1)+'-')&&near((await state()).city.parameters.fill.metalness,.3));
  await shot(`mobile-${width}-material`);
 }
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),touch=await mobile.newPage();watch(touch);await ready(touch);await chooseCity('beijing',touch);await touch.locator('[data-variant="beijing-green"]').tap();await settled(touch);await touch.locator('#adjust-material-tab').tap();
 const cdp=await mobile.newCDPSession(touch);
 await touch.locator('#adjust-color-tab').tap();await touch.locator('#fill-lightness').scrollIntoViewIfNeeded();
 const lightBox=await touch.locator('#fill-lightness').boundingBox(),lightBefore=(await state(touch)).selection.current.appearance;
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:lightBox.x+lightBox.width/2,y:lightBox.y+lightBox.height-17,id:0}]});
 const lightEnd=await sliderPoint(.7,touch);for(let i=1;i<=12;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:lightBox.x+lightBox.width/2+(lightEnd.x-lightBox.x-lightBox.width/2)*i/12,y:lightBox.y+lightBox.height-17+(lightEnd.y-lightBox.y-lightBox.height+17)*i/12,id:0}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await settled(touch);
 check('emulated phone lightness drag preserves hue, saturation and material',near((await state(touch)).selection.current.appearance.lightness,51.5,3)&&(await state(touch)).selection.current.appearance.hue===lightBefore.hue&&(await state(touch)).selection.current.appearance.saturation===lightBefore.saturation&&(await state(touch)).selection.current.appearance.materialX===lightBefore.materialX);
 await touch.waitForTimeout(200);await touch.screenshot({path:`${out}/phone-lightness-dots.png`});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:lightBox.x+lightBox.width/2,y:lightBox.y+lightBox.height/2,id:0}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});await settled(touch);
 check('one-axis touch cancellation clears active feedback',!await touch.locator('.lightness-control').evaluate(e=>e.classList.contains('is-dragging')));
 await touch.locator('#adjust-material-tab').tap();
 const a=await point('material-pad',.1,.2,touch),beforeTouch=await state(touch);
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:a.x,y:a.y,id:0}]});
 const b=await point('material-pad',.8,.7,touch);
 for(let i=1;i<=10;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:a.x+(b.x-a.x)*i/10,y:a.y+(b.y-a.y)*i/10,id:0}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await settled(touch);
 check('emulated touch changes real material without rotating cup',near((await state(touch)).selection.current.appearance.materialX,.8,.02)&&near((await state(touch)).city.parameters.fill.metalness,.7,.02)&&same((await state(touch)).camera,beforeTouch.camera));
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:b.x,y:b.y,id:0}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});await settled(touch);
 await touch.locator('#reset-palette').tap();await settled(touch);await touch.waitForTimeout(100);
 check('touch cancellation and reset leave no stale gesture or frame',(await state(touch)).selection.current.appearance.materialX===.5&&(await state(touch)).selection.current.appearance.material===0&&!await touch.locator('#material-pad').evaluate(e=>e.classList.contains('is-dragging')));
 await touch.locator('#adjust-color-tab').tap();await touch.locator('#artwork-settings').evaluate(e=>{e.scrollTop=0;});await touch.waitForTimeout(200);await touch.screenshot({path:`${out}/phone-touch-panel.png`});await close(touch);
 const target=(await state(touch)).target;
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:130,y:240,id:0},{x:220,y:240,id:1}]});
 for(let i=1;i<=6;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:130+i*4,y:240+i*2,id:0},{x:220+i*4,y:240+i*2,id:1}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await touch.waitForTimeout(250);
 check('two-finger canvas pan remains available outside pad',!same(target,(await state(touch)).target));await mobile.close();
 const review=await context.newPage();await review.goto(new URL('review/v5/index.html',url).href);check('source review route resolves to the source page',(await review.title()).includes('城市图样原稿'));for(const image of await review.locator('img').all()){await image.scrollIntoViewIfNeeded();await image.evaluate(el=>el.decode());}
 check('all source review images and downloads retained',await review.locator('img').count()===cities.length*3&&await review.locator('a[download]').count()===cities.length+1);await review.close();
 check('no unexpected console or shader errors',errors.length===0);
}finally{
 await writeFile(`${out}/qa.json`,JSON.stringify({url,checks,errors,expectedErrors,timings,environment:'Installed Chrome headless; Browser plugin not available; existing Playwright regression',physicalDevices:'not tested',date:new Date().toISOString()},null,2));await browser.close();
}
