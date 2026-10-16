import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {webkit} from 'playwright';
import sharp from 'sharp';

const url=process.env.QA_URL??'http://127.0.0.1:5260/';
const out=process.env.QA_OUT??'.codex-work/tmp/v6-qa/webkit';
await mkdir(out,{recursive:true});
const browser=await webkit.launch({headless:true});
// Desktop WebKit's touch emulation leaves maxTouchPoints at zero. Supply an
// iPhone UA to exercise the mobile policy; rendering still runs in WebKit.
const page=await browser.newPage({viewport:{width:420,height:912},deviceScaleFactor:3,isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 26_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6 Mobile/15E148 Safari/604.1'});
const errors=[],checks=[];
page.on('pageerror',error=>errors.push(error.message));
const check=(name,ok)=>{checks.push({name,passed:!!ok});assert.ok(ok,name);};
const pause=()=>page.waitForTimeout(900);
async function screenshot(name){
 const buffer=await page.screenshot({path:`${out}/${name}.png`,scale:'css'});
 // The reported failure leaves solid #faf9f5 horizontal bands over the scene.
 // Inspect several rows in addition to geometry/hit testing and saved images.
 const {data,info}=await sharp(buffer).removeAlpha().raw().toBuffer({resolveWithObject:true});
 for(const y of [.12,.24,.4,.6,.78].map(v=>Math.floor(info.height*v))){
  const colors=new Set();for(let x=8;x<info.width-8;x+=4){const i=(y*info.width+x)*info.channels;colors.add(`${data[i]},${data[i+1]},${data[i+2]}`);}
  check(`${name}: row ${y} has rendered scene detail`,colors.size>5);
 }
}
async function tab(id){
 // Only three of four tabs are visible; advance through an accessible neighbor.
 for(let i=0;i<4;i++){
  if(await page.locator(`#${id}-tab`).getAttribute('aria-hidden')!=='true'){await page.locator(`#${id}-tab`).click();await pause();return;}
  const buttons=page.locator('.creator-tabs button[aria-hidden=false]');
  await buttons.last().click();await pause();
 }
 throw new Error(`Cannot reach ${id}`);
}
try{
 await page.goto(url);await page.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:120000});await pause();
 check('page identity',await page.title()==='城市共彩');
 check('native mobile WebKit compositor selected',await page.evaluate(()=>window.cupViewer.debug().glass.backend==='native-backdrop'));
 check('WebGL scene has no SVG filter or transformed ancestor',await page.evaluate(()=>{let e=document.querySelector('#viewport');for(;e;e=e.parentElement){const s=getComputedStyle(e);if(s.filter!=='none'||s.transform!=='none')return false;}return true;}));
 check('no full-screen reference filter graph created',await page.locator('.consumer-scene filter').count()===0);
 await screenshot('city');
 await tab('color');await screenshot('color');
 await page.evaluate(()=>{const {camera,target}=window.cupViewer.debug();window.cupViewer.setCamera(camera.map((v,i)=>target[i]+(v-target[i])*.42),target);});await pause();
 check('glass panel remains over canvas',await page.locator('.open-palette-editor').evaluate(e=>{const b=e.getBoundingClientRect();return e.contains(document.elementFromPoint(b.x+b.width/2,b.y+b.height/2));}));
 await screenshot('color-zoom');
 await page.locator('.open-palette-editor').click();await pause();
 check('editor opens',await page.locator('#artwork-settings').getAttribute('data-level')==='editor');
 await screenshot('editor-zoom');
 await page.getByRole('button',{name:'返回配色预设',exact:true}).click();await pause();
 await page.locator('#reset').click();await pause();
 await tab('material');await tab('slogan');await screenshot('slogan');
 await page.locator('[data-slogan=innovation]').click();await pause();
 check('slogan selection updates',await page.locator('[data-slogan=innovation]').getAttribute('aria-pressed')==='true');
 await page.locator('.panel-handle').click();await pause();
 check('collapsed shell matches menu height',await page.locator('#artwork-settings').evaluate(e=>Math.abs(e.getBoundingClientRect().height-e.querySelector('.creator-tabs').getBoundingClientRect().height)<1));
 await screenshot('collapsed');
 await tab('city');
 await page.locator('#view-trigger').click();await pause();
 check('view popup above scene',await page.locator('[data-view=lid]').evaluate(e=>{const b=e.getBoundingClientRect();return e.contains(document.elementFromPoint(b.x+b.width/2,b.y+b.height/2));}));
 await screenshot('view-menu');
 await page.locator('[data-view=hero]').click();await pause();
 check('view popup closes',await page.locator('#view-menu').isHidden());
 await page.locator('#auto').click();const before=await page.evaluate(()=>window.cupViewer.debug().camera);await page.waitForTimeout(600);const after=await page.evaluate(()=>window.cupViewer.debug().camera);
 check('rotation changes camera',before.some((v,i)=>Math.abs(v-after[i])>.1));await page.locator('#auto').click();
 for(const viewport of [{width:393,height:852},{width:390,height:664},{width:844,height:390},{width:420,height:912}]){
  await page.setViewportSize(viewport);await pause();
  check(`scene fills ${viewport.width}x${viewport.height}`,await page.evaluate(()=>{const r=document.querySelector('#glass-content').getBoundingClientRect();return r.x===0&&r.y===0&&Math.abs(r.height-innerHeight)<1&&Math.abs(r.width-innerWidth)<1;}));
  await screenshot(`resize-${viewport.width}x${viewport.height}`);
 }
 check('no framework error overlay',await page.locator('vite-error-overlay').count()===0);
 check('no runtime errors',errors.length===0);
 const result={status:'passed',url,engine:await browser.version(),userAgent:await page.evaluate(()=>navigator.userAgent),deviceScaleFactor:3,hasTouch:true,physicalIOS:'pending real-device retest; desktop WebKit automation is not iOS 27',checks,errors};
 await writeFile(`${out}/webkit-qa.json`,JSON.stringify(result,null,2));console.log(`WebKit ${result.engine}: ${checks.length} checks passed`);
}catch(error){await page.screenshot({path:`${out}/failure.png`,scale:'css'});await writeFile(`${out}/webkit-qa.json`,JSON.stringify({status:'failed',error:error.message,checks,errors},null,2));throw error;}
finally{await browser.close();}
