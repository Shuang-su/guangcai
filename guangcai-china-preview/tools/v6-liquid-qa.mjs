import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium,webkit} from 'playwright';
const url=process.env.QA_URL??'http://127.0.0.1:5260/',out=process.env.QA_OUT??'.codex-work/tmp/v6-qa/liquid';
await mkdir(out,{recursive:true});const checks=[],errors=[];
const check=(name,ok,detail)=>{checks.push({name,passed:!!ok,detail});assert.ok(ok,name+' '+JSON.stringify(detail??''));};
for(const [name,engine]of [['chromium',chromium],['webkit',webkit]]){
 const browser=await engine.launch({headless:true,...(name==='chromium'?{channel:'chrome'}:{})});
 const page=await browser.newPage({viewport:{width:393,height:852},deviceScaleFactor:2,isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 26_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6 Mobile/15E148 Safari/604.1'});
 page.on('pageerror',e=>errors.push(name+': '+e.message));
 try{
  await page.goto(url);await page.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:120000});await page.waitForTimeout(1200);
  const debug=await page.evaluate(()=>window.cupViewer.debug().glass);
  // Chromium's Apple UA deliberately exercises the same portable compositor.
  check(name+': full isolated refraction active',debug.backend==='webgl2-isolated'&&debug.maps>0&&debug.compositor.frames>0,debug);
  for(const menu of ['city','color','material','slogan']){
   for(let i=0;i<4;i++){if(await page.locator('#'+menu+'-tab').getAttribute('aria-hidden')!=='true'){if(await page.locator('#'+menu+'-tab').getAttribute('aria-selected')!=='true')await page.locator('#'+menu+'-tab').click();break;}await page.locator('.creator-tabs [aria-hidden=false]').last().click();await page.waitForTimeout(500);}
   await page.waitForTimeout(900);
   const samples=await page.evaluate(async()=>{
    const panel=document.querySelector('#artwork-settings'),tabs=document.querySelector('.creator-tabs');
    const sample=()=>{const a=panel.getBoundingClientRect(),b=tabs.getBoundingClientRect();return{top:b.top,bottom:b.bottom,panelBottom:a.bottom,height:a.height,width:b.width}};
    const rows=[sample()];document.querySelector('.panel-handle').click();
    await new Promise(resolve=>{const end=performance.now()+520;function tick(){rows.push(sample());if(performance.now()<end)requestAnimationFrame(tick);else resolve()}requestAnimationFrame(tick)});return rows;
   });
   const tops=samples.map(r=>r.top),bottoms=samples.map(r=>r.bottom),heights=samples.map(r=>r.height);
   check(name+': '+menu+' collapse keeps capsule at bottom',Math.max(...bottoms)-Math.min(...bottoms)<15&&Math.min(...tops)>=tops[0]-2,samples);
   check(name+': '+menu+' closes completely',Math.abs(heights.at(-1)-48)<1,samples.at(-1));
   await page.locator('.creator-tabs [aria-selected=true]').click();await page.waitForTimeout(700);
   check(name+': '+menu+' reopens',await page.locator('#artwork-settings').getAttribute('data-collapsed')==='false');
  }
  await page.locator('#city-tab').click();await page.waitForTimeout(900);await page.screenshot({path:out+'/'+name+'-city.png',scale:'css'});
  await page.locator('#color-tab').click();await page.waitForTimeout(900);
  await page.evaluate(()=>{const{camera,target}=window.cupViewer.debug();window.cupViewer.setCamera(camera.map((v,i)=>target[i]+(v-target[i])*.42),target)});await page.waitForTimeout(900);
  await page.screenshot({path:out+'/'+name+'-zoom.png',scale:'css'});
  check(name+': graphics context healthy',await page.locator('.glass-raster').evaluate(e=>e.getContext('webgl2').getError())===0);
  await page.locator('.open-palette-editor').click();await page.waitForTimeout(650);
  check(name+': transparent optical layer does not block editor',await page.locator('#artwork-settings').getAttribute('data-level')==='editor');
  await page.getByRole('button',{name:'返回配色预设',exact:true}).click();await page.waitForTimeout(650);
  // Deliberate resource failure must leave real buttons usable and disclose it.
  await page.locator('.glass-raster').evaluate(e=>e.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());await page.waitForTimeout(650);
  check(name+': actual context loss activates readable fallback',await page.evaluate(()=>window.cupViewer.debug().glass.backend==='native-backdrop'&&window.cupViewer.debug().glass.error.includes('context lost')));
  await page.locator('.open-palette-editor').click();await page.waitForTimeout(500);
  check(name+': fallback editor remains clickable',await page.locator('#artwork-settings').getAttribute('data-level')==='editor');
  await page.goto(new URL('audit/glass.html?backend=webgl2',url).href);await page.waitForFunction(()=>typeof window.rasterContract==='function');
  const pixels=await page.evaluate(()=>window.rasterContract());
  check(name+': displacement shifts the sampled scene pixels',pixels.refracted[0]>pixels.neutral[0]+5,pixels);
  check(name+': nested glass samples the already refracted parent',pixels.nested[0]>pixels.refracted[0]+5,pixels);
  check(name+': model updates reach the glass live',pixels.live[0]>pixels.nested[0]+5,pixels);
  check(name+': optical viewport clips pixels at the same boundary',pixels.clipped[3]===0&&pixels.inside[3]===255,pixels);
  check(name+': original rounded field and highlight remain intact',pixels.corner[3]===0&&pixels.edge[3]>200&&pixels.center[3]===255,pixels);
  check(name+': freshly prepared map renders on its first frame',pixels.firstFrame[3]===255,pixels.firstFrame);
  check(name+': pixel probe has no renderer errors',pixels.errors.length===0,pixels.errors);
 }finally{await browser.close()}
}
check('no application errors',errors.length===0,errors);
await writeFile(out+'/liquid-qa.json',JSON.stringify({status:'passed',url,checks,errors,physicalDevice:'pending'},null,2));console.log(`Passed ${checks.length} liquid/collapse checks`);
