import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import sharp from 'sharp';
const url=process.env.QA_URL??'http://127.0.0.1:5208/';
const output='output/playwright/china';await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[],checks=[];page.on('pageerror',e=>errors.push(e.message));
page.on('console',m=>{if(m.type()==='error'&&/WebGLProgram|Shader Error|GL_INVALID/.test(m.text()))errors.push(m.text());});
const debug=()=>page.evaluate(()=>window.cupViewer.debug());
const check=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS',name);};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const pause=ms=>page.waitForTimeout(ms);
const view=async v=>{await page.locator(`[data-view="${v}"]`).click();await pause(1700);};
const frame=async name=>page.screenshot({path:`${output}/${name}.png`});
const region=async image=>sharp(image).extract({left:600,top:385,width:220,height:155}).removeAlpha().raw().toBuffer();
const delta=(a,b)=>a.reduce((n,v,i)=>n+Math.abs(v-b[i]),0)/a.length;
try{
 await page.goto(url);await page.waitForFunction(()=>window.cupViewer?.ready(),{},{timeout:30000});await pause(3900);
 const initial=await debug(),pack=initial.city.pack;
 check('initial independent city + fixed packages loaded',initial.city.maps.length===5&&Object.values(initial.fixed).every(r=>Object.keys(r).length===4));
 check('city uses UV1, aligned maps, and zero geometry displacement',initial.city.maps.every(m=>m.channel===1&&same(m.size,[4096,1783]))&&initial.city.displacementScale===0);
 check('old full-floral replacement controls removed',await page.locator('input[type=file],.style-choice').count()===0);
 check('local geometry reflection initialized',initial.reflections.ready&&initial.reflections.enabled&&initial.reflections.captures>0&&initial.reflections.resolution===512);
 await frame('desktop');
 for(const v of ['front','handle','top','bottom','saucerBottom','exploded','lid','detail','hero']){
  await view(v);check(`view button ${v}`,(await debug()).view===v);await frame(v);
  if(v==='bottom')check('turned cup clears the floor',(await debug()).bottomClearance>30);
  if(v==='exploded'){await pause(500);const r=(await debug()).reflections;check('local probe follows exploded cup',r.captures>initial.reflections.captures&&Math.abs(r.position[1]-initial.reflections.position[1]-26)<.01);}
 }
 await pause(650);const beforeOrbitCapture=(await debug()).reflections.captures;
 await page.locator('#auto').click();const a=await debug();await pause(500);const b=await debug();check('auto rotation changes camera',!same(a.camera,b.camera));
 await page.mouse.move(660,390);await page.mouse.down();await page.mouse.move(810,460,{steps:12});await page.mouse.up();await pause(250);const dragged=await debug();check('drag stops auto and rotates',!dragged.auto&&!same(dragged.camera,b.camera));
 check('camera rotation reuses the local reflection capture',dragged.reflections.captures===beforeOrbitCapture);
 const distance=s=>Math.hypot(...s.camera.map((v,i)=>v-s.target[i]));const beforeZoom=distance(dragged);await page.mouse.wheel(0,-210);await pause(350);check('wheel zoom',distance(await debug())<beforeZoom);
 await view('detail');await page.locator('#open-settings').click();
 const probeMap=(await debug()).reflections.envMap;
 await page.locator('#local-reflections').uncheck();const disabled=(await debug()).reflections;
 check('reflection toggle restores studio-only environment',!disabled.enabled&&disabled.envMap!==probeMap);
 await page.locator('#local-reflections').check();await pause(100);const localStable=await debug();
 check('reflection toggle restores local geometry capture',localStable.reflections.enabled&&localStable.reflections.envMap===probeMap);
 for(let i=0;i<5;i++){await page.evaluate(()=>{window.cupViewer.setLocalReflections(false);window.cupViewer.setLocalReflections(true);});await pause(100);}
 check('five reflection toggles reuse GPU resources',same((await debug()).memory,localStable.memory));
 for(const v of ['0','-1','1']){await page.locator('#relief').selectOption(v);check(`relief ${v} retains metal + geometry`,(await debug()).city.relief===+v&&(await debug()).city.metalEnabled&&same((await debug()).geometries,initial.geometries));}
 for(const mode of ['clay','relief','metalness','pbr']){await page.locator('#material-mode').selectOption(mode);check(`inspection ${mode}`,(await debug()).mode===mode);}
 await page.locator('#city-metal').uncheck();check('metal off retains stroke normal',(await debug()).city.relief===1&&!(await debug()).city.metalEnabled);await page.locator('#city-metal').check();await page.locator('#close-settings').click();
 for(const [v,name]of[[1,'convex'],[0,'flat'],[-1,'concave']]){await page.evaluate(v=>window.cupViewer.setRelief(v),v);await pause(200);await frame(name);}
 await page.evaluate(()=>{window.cupViewer.setRelief(1);window.cupViewer.setMode('relief')});await pause(200);await frame('stroke-only');await page.evaluate(()=>window.cupViewer.setMode('pbr'));
 await view('front');const beforeLabel=await region(await page.screenshot());
 const color=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=4096;c.height=1783;const x=c.getContext('2d');x.fillStyle='#387baf';x.fillRect(0,0,c.width,c.height);return c.toDataURL();});
 await page.evaluate(p=>window.cupViewer.applyCityArtwork(p),{...pack,id:'qa-blue',name:'QA temporary blue',baseColor:color});await pause(400);const swapped=await debug();const afterLabel=await region(await frame('replacement-blue-label'));
 check('city replacement keeps geometry and all fixed maps',same(swapped.geometries,initial.geometries)&&same(swapped.fixed,initial.fixed));
 const labelDelta=delta(beforeLabel,afterLabel);check('rendered label stays unchanged after recoloring',labelDelta<.3);await view('hero');await frame('replacement-blue-city');
 const failed=await page.evaluate(async p=>{try{await window.cupViewer.applyCityArtwork(p);return false;}catch{return true;}},{...pack,baseColor:'data:image/png;base64,broken'});
 check('failed load preserves entire current version',failed&&same((await debug()).city.maps,swapped.city.maps));
 const wrong=await page.evaluate(async p=>{const c=document.createElement('canvas');c.width=c.height=16;try{await window.cupViewer.applyCityArtwork({...p,normal:c.toDataURL()});return false;}catch{return true;}},pack);
 check('mismatched channel dimensions rejected atomically',wrong&&same((await debug()).city.maps,swapped.city.maps));
 const placement=await page.evaluate(async p=>{try{await window.cupViewer.applyCityArtwork({...p,placement:{scale:1,offsetU:.2,offsetV:0}});return false;}catch{return true;}},pack);
 check('out-of-bounds placement rejected atomically',placement&&same((await debug()).city.maps,swapped.city.maps));
 await page.route('**/china/slow-qa.png',async route=>{await new Promise(r=>setTimeout(r,600));await route.fulfill({path:'public/china/baseColor.png',contentType:'image/png'});});
 const races=await page.evaluate(async p=>Promise.all([window.cupViewer.applyCityArtwork({...p,id:'qa-slow',baseColor:'/china/slow-qa.png'}),window.cupViewer.applyCityArtwork({...p,id:'qa-last'})]),pack);
 check('rapid switching commits only last request',same(races,[false,true])&&(await debug()).city.pack.id==='qa-last');
 await page.evaluate(()=>window.cupViewer.restore());await pause(250);const stable=await debug();
 for(let i=0;i<5;i++){await page.evaluate(()=>window.cupViewer.restore());await pause(100);}
 const cycled=await debug();check('five swaps release old GPU textures',same(stable.memory,cycled.memory)&&same(cycled.geometries,initial.geometries));
 await view('hero');await pause(3500);await frame('desktop');
 const mobile=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});const mp=await mobile.newPage();mp.on('pageerror',e=>errors.push(e.message));await mp.goto(url);await mp.waitForFunction(()=>window.cupViewer?.ready());await mp.waitForTimeout(3800);
 check('mobile no horizontal overflow',await mp.evaluate(()=>document.documentElement.scrollWidth===innerWidth));
 await mp.screenshot({path:`output/playwright/china/mobile.png`});await mp.locator('[data-view="front"]').tap();await mp.waitForTimeout(1700);check('mobile touch selects view',(await mp.evaluate(()=>window.cupViewer.debug())).view==='front');
 const touch0=await mp.evaluate(()=>window.cupViewer.debug().camera);const cdp=await mobile.newCDPSession(mp);
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:170,y:330}]});for(let i=1;i<=8;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:170+i*11,y:330+i*3}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await mp.waitForTimeout(400);
 check('mobile touch drag rotates',!same(touch0,await mp.evaluate(()=>window.cupViewer.debug().camera)));
 await mp.locator('#open-settings').tap();check('mobile calibration panel fits viewport',await mp.locator('#settings').evaluate(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight;}));await mp.screenshot({path:`${output}/mobile-settings.png`});
 await mp.locator('#close-settings').tap();await mobile.close();
 const disposed=await page.evaluate(()=>{window.cupViewer.dispose();return window.cupViewer.debug().memory;});check('dispose frees GPU geometry',disposed.geometries===0);check('no browser runtime errors',errors.length===0);
 await writeFile('evidence/browser-qa.json',JSON.stringify({url,date:new Date().toISOString(),checks,errors,labelMeanPixelDelta:labelDelta,initialMemory:initial.memory,cycledMemory:cycled.memory,disposedMemory:disposed,scope:'Desktop Chrome and emulated mobile Chrome; not physical iPhone/Safari'},null,2));console.log(JSON.stringify({passed:checks.length,errors,labelDelta,memory:cycled.memory}));
}catch(e){await frame('failure');await writeFile('evidence/browser-qa-failure.json',JSON.stringify({checks,errors,error:e.stack},null,2));throw e;}finally{await browser.close();}
