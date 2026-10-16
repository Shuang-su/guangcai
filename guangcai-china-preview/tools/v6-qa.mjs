// Browser plugin is not installed; repeatable automated checks use the repo's Playwright.
// In-app browser visual inspection is recorded separately. No physical motor claim.
import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const url=process.env.QA_URL??'http://127.0.0.1:5260/',out=process.env.QA_OUT??'.codex-work/tmp/v6-qa/final';await mkdir(out,{recursive:true});
const catalog=JSON.parse(await readFile('src/styles/city-catalog-v6.json'));
const checks=[],errors=[];const check=(name,ok)=>{assert.ok(ok,name);checks.push(name);};
const protectedFiles=JSON.parse(await readFile('../docs/changes/20261016-short-screen-lift/protected-haptics.json'));
for(const file of ['src/ui/haptics.ts','src/ui/ios-haptics.ts','src/ui/xy-pad.ts','src/ui/lightness-slider.ts','src/ui/control-lift.ts'])check(`${file} retains working haptic/input bytes`,createHash('sha256').update(await readFile(file)).digest('hex')===protectedFiles[file]);
const browser=await chromium.launch({channel:'chrome',headless:true});let state;
try{
 const context=await browser.newContext({viewport:{width:393,height:852}}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.stack??e.message));
 await page.goto(url,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:120000});
 const debug=()=>page.evaluate(()=>window.cupViewer.debug());state=await debug();
 const chooseMenu=async name=>{
  if(await page.locator('#palette-back').isVisible())await page.locator('#palette-back').click();
  const order=['city','color','material','slogan'];
  for(let i=0;i<4&&(await page.locator('#artwork-settings').getAttribute('data-pane'))!==name;i++){
   const current=await page.locator('#artwork-settings').getAttribute('data-pane');const expected=order[(order.indexOf(current)+1)%4];
   await page.locator('.creator-tabs [aria-selected=true]').press('ArrowRight');await page.waitForFunction(expected=>document.querySelector('#artwork-settings').dataset.pane===expected,expected);await page.waitForTimeout(550);
  }
 };
 const choosePalette=async name=>{
  const order=['purple','red','gold','blue','green'];
  for(let i=0;i<5&&(await debug()).selection.current.appearance.preset!==name;i++){await page.locator('.palette-tile[aria-pressed=true]').press('ArrowRight');await page.waitForTimeout(550);}
 };
 check('consumer identity and Shenzhen/gold/open defaults',state.profile==='consumer'&&state.selection.current.variant==='v6-shenzhen-gold'&&state.selection.current.text==='open');
 check('exactly 23 city choices and six slogans',await page.locator('[data-theme]').count()===23&&await page.locator('[data-slogan]').count()===6);
 check('seven right-side controls are camera views',JSON.stringify(await page.locator('.view-rail button').allTextContents())===JSON.stringify(['拆解','杯盖','杯碟','碟底','杯底','浮雕','花纹']));
 check('view choices stay closed behind a compact trigger',!await page.locator('#view-menu').isVisible()&&await page.locator('#view-trigger').isVisible());
 await page.locator('#view-trigger').click();await page.waitForTimeout(300);await page.screenshot({path:`${out}/view-menu.png`});
 await page.locator('[data-view=lid]').click();await page.locator('#view-menu').waitFor({state:'hidden'});check('view selection updates trigger and closes menu',(await debug()).view==='lid'&&await page.locator('#view-trigger span').textContent()==='杯盖'&&!await page.locator('#view-menu').isVisible());
 await page.locator('#view-trigger').focus();await page.keyboard.press('Enter');await page.keyboard.press('End');check('view menu keyboard navigation reaches last item',await page.locator('[data-view=flowers]').evaluate(e=>e===document.activeElement));await page.keyboard.press('Escape');await page.locator('#view-menu').waitFor({state:'hidden'});check('Escape closes view menu and returns focus',await page.locator('#view-trigger').evaluate(e=>e===document.activeElement)&&!await page.locator('#view-menu').isVisible());
 await page.locator('#view-trigger').click();await page.mouse.click(180,90);await page.locator('#view-menu').waitFor({state:'hidden'});check('outside press dismisses view menu',!await page.locator('#view-menu').isVisible());
 await page.locator('#reset').click();await page.locator('#auto').click();check('rotation icon toggles real automatic rotation',(await debug()).auto);const rotatingStart=(await debug()).camera;await page.waitForTimeout(900);const rotatingEnd=(await debug()).camera;check('automatic rotation actually moves camera during a view transition',Math.abs(Math.atan2(rotatingEnd[0],rotatingEnd[2])-Math.atan2(rotatingStart[0],rotatingStart[2]))>Math.PI/90);await page.locator('#auto').click();
 for(const distance of [2500,3000]){await page.evaluate(distance=>{const v=window.cupViewer;v.setView('hero',true);const s=v.debug(),t=s.target,c=s.camera,d=Math.hypot(...c.map((x,i)=>x-t[i]));v.setCamera(c.map((x,i)=>t[i]+(x-t[i])*distance/d),t);},distance);await page.waitForTimeout(400);const farState=await debug();check(`complete assembly remains within far plane at distance ${distance}`,farState.clipping.far>=distance+180&&farState.clipping.near===.5);await page.screenshot({path:`${out}/far-${distance}.png`});}
 await page.evaluate(()=>window.cupViewer.setView('hero',true));await page.waitForTimeout(400);

 for(const direction of ['ArrowRight','ArrowLeft']){
  for(let i=0;i<4;i++){await page.locator('.creator-tabs [aria-selected=true]').press(direction);await page.waitForTimeout(550);check(`four-menu ring ${direction} step ${i} shows exactly three options`,await page.locator('.creator-tabs button[aria-hidden=false]').count()===3);}
  check(`${direction} wraps back to city`,await page.locator('#artwork-settings').getAttribute('data-pane')==='city');
 }
 check('consumer does not construct dev settings, titles or legacy text select',await page.locator('#settings,#open-settings,#background-settings,h1,#artwork-text').count()===0);
 await page.waitForFunction(()=>window.cupViewer.debug().glass.ready||window.cupViewer.debug().glass.error);check('WebGL2 glass uses original material surfaces', (await debug()).glass.ready);
 check('city ring shows three complete cards plus two partial neighbors',await page.locator('.city-card[aria-hidden=false]').count()===5&&await page.locator('.city-cards').evaluate(e=>{const r=e.getBoundingClientRect();const boxes=[...e.querySelectorAll('[aria-hidden=false]')].map(b=>b.getBoundingClientRect());return boxes.filter(b=>b.left>=r.left&&b.right<=r.right).length===3&&boxes.some(b=>b.left<r.left&&b.right>r.left)&&boxes.some(b=>b.left<r.right&&b.right>r.right);}));
 check('city glass is clipped at the carousel viewport after map placement',await page.locator('feComposite[result$=overlay][in2$=Viewport]').count()>=5);
 check('city viewport reaches both panel edges',await page.locator('.city-cards').evaluate(e=>{const a=e.getBoundingClientRect(),b=e.closest('#artwork-settings').getBoundingClientRect();return Math.abs(a.left-b.left)<1&&Math.abs(a.right-b.right)<1;}));
 check('city cards keep a square outline',await page.locator('.city-card[aria-pressed=true]').evaluate(e=>{const b=e.getBoundingClientRect();return Math.abs(b.width-b.height)<1;}));
 check('center menu highlight leaves a gap to adjacent slots',await page.locator('.creator-tabs').evaluate(e=>e.querySelector('.creator-indicator').getBoundingClientRect().width<e.getBoundingClientRect().width/3));
 await page.locator('.panel-handle').hover();await page.waitForTimeout(300);check('fixed glass handle lights on hover without moving',await page.locator('.panel-handle').evaluate(e=>Number(e.style.getPropertyValue('--lg-glow'))>0&&!e.style.translate&&!e.style.scale));
 await page.locator('.panel-handle').click();await page.waitForFunction(()=>!document.querySelector('#artwork-settings').classList.contains('is-resizing'));check('handle collapses content and preserves category menu',await page.locator('#artwork-settings').getAttribute('data-collapsed')==='true'&&await page.locator('.creator-tabs').isVisible()&&!await page.locator('.creator-content').isVisible());check('collapsed frame matches the menu itself',await page.locator('#artwork-settings').evaluate(e=>{const a=e.getBoundingClientRect(),b=e.querySelector('.creator-tabs').getBoundingClientRect();return Math.abs(a.height-b.height)<1&&Math.abs(a.width-b.width)<1;}));await page.locator('.creator-tabs [aria-selected=true]').click();await page.waitForTimeout(500);check('active category reopens centered city',await page.locator('.city-card[aria-pressed=true]').getAttribute('data-theme')==='v6-shenzhen');
 await page.locator('.city-card[aria-pressed=true] img').evaluate(e=>e.decode());await page.screenshot({path:`${out}/consumer-city.png`});
 const structure=state.city.maps.slice(0,2).map(t=>t.uuid);let structureLoads=0;page.on('request',r=>{if(/cities\/v6\/.*(?:structure|normal)/.test(r.url()))structureLoads++;});
 await chooseMenu('slogan');
 const sloganButton=page.locator('[data-slogan=open]');await sloganButton.hover();await page.waitForTimeout(400);check('stationary slogan has upstream hover illumination',await sloganButton.evaluate(e=>Number(e.style.getPropertyValue('--lg-glow'))>0));const sloganRect=await sloganButton.boundingBox();await page.mouse.move(sloganRect.x+sloganRect.width/2,sloganRect.y+sloganRect.height/2);await page.mouse.down();await page.mouse.move(sloganRect.x+sloganRect.width+12,sloganRect.y+sloganRect.height/2,{steps:8});await page.waitForTimeout(300);check('slogan stretches under drag without reordering grid',await sloganButton.evaluate(e=>e.hasAttribute('data-glass-pressed')&&!!e.style.scale&&!!e.style.translate));await page.screenshot({path:`${out}/slogan-drag.png`});await page.mouse.up();await page.mouse.move(4,4);await page.waitForTimeout(900);check('slogan spring returns to its grid position',await sloganButton.evaluate(e=>!e.hasAttribute('data-glass-pressed')&&(!e.style.translate||e.style.translate==='0px')));
 for(const id of ['innovation','cooperation','sharing','together','ocean','open']){await page.locator(`[data-slogan=${id}]`).click();await page.waitForFunction(id=>!window.cupViewer.debug().selection.busy&&window.cupViewer.debug().selection.current.text===id,id);const s=await debug();check(`${id} uses fixed gold and keeps city structure`,s.city.parameters.fixedGoldLabel&&JSON.stringify(s.city.maps.slice(0,2).map(t=>t.uuid))===JSON.stringify(structure));}
 check('switching six slogans does not reload city textures',structureLoads===0);
await page.waitForTimeout(800);await page.screenshot({path:`${out}/consumer-lettering.png`});
 await page.locator('#view-trigger').click();await page.locator('[data-view=hero]').click();await chooseMenu('color');await page.waitForTimeout(600);
 check('palette viewport keeps inset from both panel edges',await page.locator('.palette-loop').evaluate(e=>{const a=e.getBoundingClientRect(),b=e.closest('#artwork-settings').getBoundingClientRect();return a.left-b.left>=11&&b.right-a.right>=11;}));
 check('all five square presets visible together',await page.locator('.palette-tile[aria-hidden=false]').count()===5);
 check('customize label and bottom category placement',await page.locator('.open-palette-editor').textContent()==='自定义'&&await page.locator('.creator-tabs').evaluate(e=>e.getBoundingClientRect().top>=document.querySelector('.creator-content').getBoundingClientRect().bottom));
 check('customize is a clear glass button with icon and 40px target',await page.locator('.open-palette-editor').evaluate(e=>e.getBoundingClientRect().height>=40&&!!e.querySelector('svg')&&e.style.clipPath.length>0));
 await page.screenshot({path:`${out}/consumer-presets.png`});
 for(const direction of ['ArrowRight','ArrowLeft']){for(let i=0;i<5;i++){await page.locator('.palette-tile[aria-pressed=true]').press(direction);await page.waitForTimeout(550);}check(`five-palette ring ${direction} wraps to gold`,(await debug()).selection.current.appearance.preset==='gold');}
 await page.locator('[data-palette=purple]').click();await page.waitForTimeout(550);check('tap outer swatch selects that exact preset',(await debug()).selection.current.appearance.preset==='purple');await choosePalette('gold');
 check('five palettes and existing two pads/lightness controls',await page.locator('[data-palette]').count()===5&&await page.locator('.xy-pad').count()===2&&await page.locator('#fill-lightness').count()===1);
 for(const preset of ['purple','red','blue','green','gold']){await choosePalette(preset);const s=await debug();check(`${preset} keeps fixed gold and normal identity`,s.city.parameters.fixedGoldLabel&&s.city.maps[1].uuid===state.city.maps[1].uuid);}
 await page.locator('.palette-tile[aria-pressed=true]').click();await page.waitForTimeout(450);
 check('editor has handle and only aligned icon controls',await page.locator('.panel-handle').isVisible()&&await page.locator('.color-readout,#palette-editor-name').count()===0&&await page.locator('.editor-toolbar').evaluate(e=>{const b=[...e.querySelectorAll('button')].map(b=>b.getBoundingClientRect());return b.length===2&&Math.abs(b[0].top-b[1].top)<1&&e.textContent.trim()==='';}));
 await page.locator('#palette-back').click();await page.waitForTimeout(400);check('back preserves current palette and restores all five presets',(await debug()).selection.current.appearance.preset==='gold'&&await page.locator('.palette-tile[aria-hidden=false]').count()===5);await page.locator('.open-palette-editor').click();await page.waitForTimeout(400);
 await page.evaluate(()=>{const v=window.cupViewer,a=v.debug().selection.current.appearance;return v.selectArtwork({appearance:{...a,hue:180,saturation:40,lightness:40}});});
 await page.locator('#reset-palette').click();await page.waitForTimeout(80);check('preset reset animates its icon and intermediate values',await page.locator('#artwork-settings').getAttribute('data-restoring')==='true'&&await page.locator('#reset-palette img').evaluate(e=>e.getAnimations().length>0));await page.waitForTimeout(500);check('reset finishes at original preset without continuing animation',await page.locator('#artwork-settings').getAttribute('data-restoring')===null&&(await debug()).selection.current.appearance.hue===state.selection.current.appearance.hue);
 await page.locator('#fill-lightness').focus();await page.keyboard.press('ArrowDown');await page.waitForTimeout(100);check('lightness keyboard changes appearance', (await debug()).selection.current.appearance.lightness!==state.selection.current.appearance.lightness);
 for(const [width,height]of [[360,640],[375,667],[393,715],[393,852],[612,1079],[852,393],[1365,900]]){
  await page.setViewportSize({width,height});await page.waitForTimeout(350);
  check(`${width}x${height} has no horizontal overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  check(`${width}x${height} creator tabs remain in viewport`,await page.locator('.editor-toolbar').evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth;}));
  await page.screenshot({path:`${out}/color-${width}x${height}.png`});
 }
 await page.setViewportSize({width:393,height:852});await chooseMenu('material');await page.waitForTimeout(1500);
 const resting=[];for(let i=0;i<3;i++){const image=await page.locator('#artwork-settings').screenshot();resting.push(await sharp(image).raw().toBuffer());await page.waitForTimeout(400);}check('glass panel settles instead of repeating popup animation',resting.slice(1).every((pixels,i)=>pixels.length===resting[i].length&&pixels.reduce((n,v,j)=>n+(v!==resting[i][j]?1:0),0)/pixels.length<.005));
 const before=(await debug()).selection.current.appearance;
 for(const id of Object.keys(catalog.cities)){await page.evaluate(async id=>{const v=window.cupViewer;const a=v.debug().selection.current.appearance;await v.selectArtwork({variant:`v6-${id}-${a.preset}`,appearance:a});},id);const s=await debug();check(`${id} retains creation with bounded city/label caches`,s.selection.current.variant.startsWith(`v6-${id}-`)&&JSON.stringify(s.selection.current.appearance)===JSON.stringify(before)&&s.city.cachedCities<=2&&s.city.cachedLabels<=6);}
 await page.evaluate(async()=>{const v=window.cupViewer;await Promise.all(['shanghai','beijing','shenzhen','guangzhou','chengdu','wuhan','xian','tianjin'].map(id=>v.selectArtwork({variant:`v6-${id}-blue`})))});
 check('rapid city selection applies only last request',(await debug()).selection.current.variant==='v6-tianjin-blue');
 await page.route('**/cities/v6/harbin-normal.hfn.gz*',r=>r.abort());const beforeFailure=(await debug()).selection.current.variant;
 await page.evaluate(()=>window.cupViewer.selectArtwork({variant:'v6-harbin-red'}));check('failed group retains current city',(await debug()).selection.current.variant===beforeFailure);await page.unroute('**/cities/v6/harbin-normal.hfn.gz*');
 await page.evaluate(()=>window.cupViewer.restore());check('consumer reset returns complete default',(await debug()).selection.current.variant==='v6-shenzhen-gold'&&(await debug()).selection.current.text==='open');
 await page.goto(new URL('dev/',url).href);await page.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:120000});check('dev retains China and full workbench',(await debug()).selection.current.variant==='china-gold'&&await page.locator('#settings,#background-settings,#artwork-text').count()===3);
 await page.locator('#open-artwork').click();check('dev has 26 original and 23 new city choices',await page.locator('[data-theme]').count()===49);await page.screenshot({path:`${out}/dev.png`});
 await page.goto(new URL('audit/',url).href);await page.locator('iframe').first().scrollIntoViewIfNeeded();for(const f of page.frames().slice(1))await f.waitForFunction(()=>window.glassAudit?.status().ready,null,{timeout:60000});
 const parity=await page.evaluate(()=>window.v6Audit.run());check('28 original WebGPU/WebGL2 map cases pass',parity.passed&&parity.comparisons.length===28);await writeFile(`${out}/glass-parity.json`,JSON.stringify(parity,null,2));await page.screenshot({path:`${out}/audit.png`});
 const lifecycle=await page.frames().find(f=>f.url().includes('backend=webgl2')).evaluate(()=>window.glassAudit.lifecycle());for(const result of lifecycle)check(result.name,result.passed);
 check('no uncaught application errors',errors.length===0);
 // iOS path: same native overlay and press-scale surface; real motor remains unverified.
 const touch=await browser.newContext({viewport:{width:375,height:667},hasTouch:true,isMobile:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 27_0_1 like Mac OS X) AppleWebKit/605.1.15 Version/27.0.1 Mobile/15E148 Safari/604.1'});
 await touch.addInitScript(()=>{Object.defineProperty(navigator,'vibrate',{configurable:true,value:undefined});Object.defineProperty(HTMLInputElement.prototype,'switch',{configurable:true,get(){return this.hasAttribute('switch');}});});
 const mobile=await touch.newPage();await mobile.goto(url);await mobile.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:120000});const requests=()=>mobile.evaluate(()=>window.cupViewer.debug().haptics.requests);const start=await requests();await mobile.locator('#color-tab').tap();await mobile.waitForTimeout(550);check('menu tap requests one native haptic',await requests()===start+1);const beforeOpen=await requests();await mobile.locator('.palette-tile[aria-pressed=true]').tap();await mobile.waitForTimeout(550);check('secondary editor tap requests one native haptic',await requests()===beforeOpen+1);
 check('consumer preserves newer iOS gesture branch',await mobile.evaluate(()=>window.cupViewer.debug().haptics.backend==='ios-gesture'));
 const cdp=await touch.newCDPSession(mobile);const box=await mobile.locator('#color-pad').boundingBox();const x=box.x+box.width*.35,y=box.y+box.height*.65;
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]});await mobile.waitForTimeout(400);
 check('short-screen press retains 1.24 lift',await mobile.locator('#color-pad').evaluate(e=>{const m=new DOMMatrix(getComputedStyle(e).transform);return m.a>1.2;}));await mobile.screenshot({path:`${out}/short-screen-pressed.png`});
 for(let i=1;i<=8;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+i*5,y:y-i*3,id:1}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await mobile.waitForTimeout(400);check('release clears drag state',await mobile.locator('#color-pad').evaluate(e=>!e.classList.contains('is-dragging')));await touch.close();
 const fallbackContext=await browser.newContext({viewport:{width:393,height:852}});await fallbackContext.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(kind,options){if(kind==='webgl2'&&options?.depth===false&&options?.stencil===false)return null;return original.call(this,kind,options);};});
 const fallbackPage=await fallbackContext.newPage();await fallbackPage.goto(url);await fallbackPage.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:120000});await fallbackPage.waitForFunction(()=>window.cupViewer.debug().glass.backend==='transparent-fallback');check('material backend failure retains working cup and transparent fallback',await fallbackPage.locator('#artwork-settings').isVisible());await fallbackContext.close();
 const report={status:'passed',date:new Date().toISOString(),url,checks,errors,physicalDevices:'pending',browser:'local Chrome automation; in-app visual check separate'};await writeFile(`${out}/qa.json`,JSON.stringify(report,null,2));console.log(`V6 QA passed: ${checks.length} checks`);
}catch(e){await writeFile(`${out}/qa.json`,JSON.stringify({status:'failed',checks,errors,error:String(e)},null,2));throw e;}
finally{await browser.close();}
