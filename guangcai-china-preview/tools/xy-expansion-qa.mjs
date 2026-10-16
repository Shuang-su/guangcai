// Check the transformed control itself, including input against its visual bounds.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const out=process.env.QA_OUT??'../.codex-work/tmp/xy-controls/qa-expansion';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true}),checks=[],metrics=[],errors=[];
const check=(name,ok)=>{assert.ok(ok,name);checks.push(name);console.log('PASS',name);};
try{
 for(const [width,height] of [[1200,900],[390,844],[844,390],[1280,720]]){
  const context=await browser.newContext({viewport:{width,height}}),page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  const idle=()=>page.waitForFunction(()=>!window.cupViewer.debug().selection.busy&&!document.querySelector('#artwork-settings')?.hasAttribute('data-restoring'));
  const appearance=()=>page.evaluate(()=>window.cupViewer.debug().selection.current.appearance);
  await page.goto(process.env.QA_URL??'http://127.0.0.1:5236/');
  await page.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:180000});
  await page.locator('#open-artwork').click();await page.locator('.city-selector summary').click();
  await page.locator('[data-theme="beijing"]').click();await idle();
  await page.locator('[data-variant="beijing-green"]').click();await idle();
  for(const kind of ['color','material']){
   await page.locator(`#adjust-${kind}-tab`).click();
   const pad=page.locator(`#${kind}-pad`);await page.locator('.pad-stage').filter({has:pad}).scrollIntoViewIfNeeded();await page.waitForTimeout(400);
   if(width===390&&kind==='color')await page.screenshot({path:`${out}/phone-before.png`});
   const neighbourY=kind==='color'?await page.locator('.lightness-control').evaluate(e=>{const r=e.getBoundingClientRect();return r.y+r.height/2;}):null;const before=await pad.boundingBox();await page.mouse.move(before.x+before.width*.7,before.y+before.height*.35);
   await page.mouse.down();await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await idle();const pressed=await appearance();await page.waitForTimeout(420);
   const geometry=await pad.evaluate(e=>{
    const r=e.getBoundingClientRect(),p=e.closest('aside').getBoundingClientRect();
    return {scale:r.width/e.clientWidth,pad:r.toJSON(),panel:p.toJSON(),visible:r.left>=p.left&&r.right<=p.right&&r.top>=p.top&&r.bottom<=p.bottom};
   });metrics.push({width,height,kind,...geometry});
   check(`${width} ${kind}: full expanded plate stays inside panel`,geometry.visible&&geometry.scale>1.1);
   check(`${width} ${kind}: stationary activation keeps parameters`,JSON.stringify(pressed)===JSON.stringify(await appearance()));
   await page.screenshot({path:`${out}/${width}-${kind}-pressed.png`});
   if(kind==='color')check(`${width}: neighbouring slider keeps its vertical centre`,Math.abs(neighbourY-await page.locator('.lightness-control').evaluate(e=>{const r=e.getBoundingClientRect();return r.y+r.height/2;}))<.1);
   const marker=await pad.evaluate(e=>{
    const r=e.getBoundingClientRect(),m=e.querySelector('.xy-reference'),p=m.getBoundingClientRect(),scale=r.width/e.clientWidth;
    const dx=(+m.dataset.x-+e.dataset.x)*(e.clientWidth-36),dy=(+m.dataset.y-+e.dataset.y)*(e.clientWidth-36),distance=Math.hypot(dx,dy),drift=4*Math.exp(-distance*distance/(2*42*42)),span=e.clientWidth-36;return {x:(p.x+p.width/2-r.x-18*scale)/(r.width-36*scale),y:1-(p.y+p.height/2-r.y-18*scale)/(r.height-36*scale),expectedX:+m.dataset.x+(distance?dx/distance*drift/span:0),expectedY:+m.dataset.y+(distance?dy/distance*drift/span:0)};
   });
   check(`${width} ${kind}: default marker follows the same local displacement as the dots`,Math.abs(marker.x-marker.expectedX)<.002&&Math.abs(marker.y-marker.expectedY)<.002);
   if(kind==='color')check(`${width}: slider remains visible beside expanded colour plate`,await page.locator('.lightness-control').evaluate(e=>{const r=e.getBoundingClientRect(),p=e.closest('aside').getBoundingClientRect(),c=document.querySelector('#color-pad').getBoundingClientRect();return getComputedStyle(e).opacity==='1'&&r.left>c.right&&Math.abs(r.width/e.clientWidth-1)<.001&&r.right<=p.right&&r.bottom<=p.bottom;}));
   check(`${width} ${kind}: independent reset remains visible during activation`,await page.locator('#reset-palette').evaluate(e=>{const r=e.getBoundingClientRect(),p=e.closest('aside').getBoundingClientRect();return r.top>=p.top&&r.bottom<=p.bottom&&getComputedStyle(e).opacity==='1'&&e.textContent==='';}));
   const rect=await pad.boundingBox(),scale=geometry.scale,edge=18*scale;
   await page.mouse.move(rect.x+rect.width-edge,rect.y+edge,{steps:10});await page.mouse.up();await idle();await page.waitForTimeout(600);
   const pos=await pad.evaluate(e=>({x:+e.dataset.x,y:+e.dataset.y,scale:e.getBoundingClientRect().width/e.clientWidth}));
   check(`${width} ${kind}: expanded top-right drag maps to corner and contracts`,Math.abs(pos.x-1)<.005&&Math.abs(pos.y-1)<.005&&Math.abs(pos.scale-1)<.001);
   if(width===390&&kind==='color')await page.screenshot({path:`${out}/phone-after.png`});
  }
  await page.locator('#adjust-color-tab').click();await page.locator('#reset-palette').click();await idle();await page.waitForTimeout(450);
  check(`${width}: reset brings selector exactly onto the sole default marker`,await page.locator('#color-pad').evaluate(e=>{const a=e.querySelector('.xy-thumb').getBoundingClientRect(),b=e.querySelector('.xy-reference').getBoundingClientRect();return Math.abs(a.x+a.width/2-b.x-b.width/2)<.1&&Math.abs(a.y+a.height/2-b.y-b.height/2)<.1&&!e.querySelector('.xy-neutral');}));
  const slider=page.locator('#fill-lightness');await page.locator('.pad-stage').filter({has:slider}).scrollIntoViewIfNeeded();const padY=await page.locator('#color-pad').evaluate(e=>{const r=e.getBoundingClientRect();return r.y+r.height/2;});const box=await slider.boundingBox();
  await page.mouse.move(box.x+box.width/2,box.y+box.height*.5);await page.mouse.down();await page.waitForTimeout(500);
  const railScale=await slider.evaluate(e=>e.getBoundingClientRect().height/e.clientHeight),panelBox=await page.locator('#artwork-settings').boundingBox(),centreY=box.y+box.height/2,expectedScale=Math.max(1,Math.min(1.24,2*Math.min(centreY-panelBox.y-10,panelBox.y+panelBox.height-10-centreY)/box.height));metrics.push({width,height,sliderScale:railScale,expectedScale});check(`${width}: slider alone expands within available vertical space`,Math.abs(railScale-expectedScale)<.015&&await page.locator('#color-pad').evaluate(e=>Math.abs(e.getBoundingClientRect().width/e.clientWidth-1)<.001));
  check(`${width}: neighbouring colour pad keeps its vertical centre`,Math.abs(padY-await page.locator('#color-pad').evaluate(e=>{const r=e.getBoundingClientRect();return r.y+r.height/2;}))<.1);await page.screenshot({path:`${out}/${width}-slider-pressed.png`});await page.mouse.up();await page.waitForTimeout(400);
  await slider.press('Home');await idle();const lower=(await appearance()).lightness;await slider.press('End');await idle();
  check(`${width}: slider limits lightness to 20–65`,lower===20&&(await appearance()).lightness===65);
  await page.locator('#color-pad').press('ArrowLeft');await idle();
  await page.locator('#adjust-material-tab').click();
  check(`${width}: first click switches tab after keyboard adjustment`,await page.locator('#adjust-material-tab').getAttribute('aria-selected')==='true');
  check(`${width}: cup canvas retains full viewport while controls are open`,await page.locator('#viewport').evaluate(e=>{const r=e.getBoundingClientRect();return Math.abs(r.width-innerWidth)<1&&Math.abs(r.height-innerHeight)<1&&Math.abs(r.x)<1;}));
  if(width===390){await page.mouse.move(195,190);await page.mouse.wheel(0,-1300);await page.waitForTimeout(700);await page.screenshot({path:`${out}/phone-close-up.png`});}
  await context.close();
 }
 check('no application runtime errors',errors.length===0);
}finally{
 await browser.close();await writeFile(`${out}/qa.json`,JSON.stringify({checks,metrics,errors,physicalDevice:false},null,2)+'\n');
}
