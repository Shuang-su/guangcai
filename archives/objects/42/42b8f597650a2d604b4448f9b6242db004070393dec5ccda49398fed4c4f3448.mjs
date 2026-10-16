import {chromium} from 'playwright';
import {mkdir,writeFile,copyFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const dir='evidence/visual-v2';await mkdir(dir,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:430,height:932},deviceScaleFactor:1,hasTouch:true,isMobile:true,recordVideo:{dir:dir+'/video',size:{width:430,height:932}}});
const page=await context.newPage(),errors=[],checks=[];page.on('pageerror',e=>errors.push(e.message));
page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
const url=process.env.QA_URL??'http://127.0.0.1:5177';
const state=()=>page.evaluate(()=>window.h5Debug());
const check=(name,v)=>{assert.ok(v,name);checks.push(name);console.log('PASS',name);};
const shot=async(name)=>{await page.waitForTimeout(800);await page.screenshot({path:`${dir}/${name}.png`,fullPage:false});};
try{
 await page.goto(url+'/#/home');await page.waitForSelector('#viewer-host[data-ready=true]');await shot('home-430');
 const initial=await state();check('Real source cup geometry loaded',initial.viewer.meshCount===11);
 await page.getByRole('button',{name:'开始添彩',exact:true}).click();await page.waitForSelector('#viewer-host[data-ready=true]');await shot('create-430');
 check('Same renderer and cup across home -> creation',(await state()).viewer.instanceId===initial.viewer.instanceId);
 check('Four image cards',await page.getByRole('radio').count()===4);
 check('Gate before choice',await page.locator('[data-action=next-step]').isDisabled());
 check('No old disclaimer or invented autosave copy',!(await page.locator('body').innerText()).match(/暂不改变|体验记录|选一份心意|已记录这笔/));
 const c0=(await state()).viewer.camera;
 const box=await page.locator('#viewer-host').boundingBox();await page.mouse.move(box.x+box.width*.45,box.y+box.height*.5);await page.mouse.down();await page.mouse.move(box.x+box.width*.72,box.y+box.height*.57,{steps:12});await page.mouse.up();await page.waitForTimeout(600);
 check('Dragging rotates actual camera',JSON.stringify(c0)!==JSON.stringify((await state()).viewer.camera));
 await page.getByRole('button',{name:'活动规则',exact:true}).click();await page.getByRole('dialog').waitFor();const cr=(await state()).viewer.camera;await shot('rules-overlay');await page.getByRole('button',{name:'关闭',exact:true}).click();
 const currentCamera=(await state()).viewer.camera;check('Rule overlay preserves camera',cr.every((n,i)=>Math.abs(n-(currentCamera[i]))<.1));
 for(let i=0;i<5;i++){
  const radios=page.getByRole('radio');await radios.nth(i%4).click();await page.waitForTimeout(120);
  check(`Step ${i+1} remains white`,(await state()).viewer.phase==='white');
  if(i===3)check('Four approved colors, no purple',!(await page.locator('body').innerText()).includes('焕新紫'));
  if(i===1||i===3||i===4)await shot(`step-${i+1}`);
  await page.locator('[data-action=next-step]').click();
  if(i<4){await page.locator(`[data-step="${i+1}"]`).waitFor();await page.waitForFunction(()=>!window.h5Debug().viewer.ribbon.transitioning);}
 }
 await page.waitForSelector('.poster-image.ready',{timeout:60000});await shot('result-430');
 const result=await state();check('Fixed complete style and real poster',result.result.posterBytes>50000&&result.viewer.phase==='fixed');
 check('Same instance through creation and result',result.viewer.instanceId===initial.viewer.instanceId);
 const posterId=result.result.id;
 await page.getByRole('button',{name:'查看 3D 作品',exact:false}).click();await page.waitForSelector('#viewer-host[data-ready=true]');await shot('result-3d');
 check('Same identity in 3D',(await state()).result.id===posterId);
 const sideBox=await page.locator('#viewer-host').boundingBox();await page.mouse.move(sideBox.x+sideBox.width*.3,sideBox.y+sideBox.height*.5);await page.mouse.down();await page.mouse.move(sideBox.x+sideBox.width*.7,sideBox.y+sideBox.height*.5,{steps:12});await page.mouse.up();await shot('result-3d-side');
 await page.getByRole('button',{name:'查看分享海报',exact:false}).click();await page.waitForSelector('.poster-image.ready');
 check('Return does not regenerate result',(await state()).result.id===posterId);
 await page.getByRole('button',{name:'分享给好友',exact:true}).click();await page.getByRole('dialog').waitFor();check('Share is an image-save guide',await page.getByText('长按图片，保存分享海报',{exact:true}).count()>0);await page.getByRole('button',{name:'我知道了'}).click();
 await page.goto(url+'/#/intro');await page.waitForSelector('.intro-stage');await shot('intro-01');
 await page.evaluate(()=>scrollTo(0,(document.querySelector('.intro-scroll').getBoundingClientRect().height-innerHeight)*.46));await shot('intro-02');
 const p=Number(await page.locator('.intro-stage').getAttribute('data-progress'));check('Opening follows scroll',p>.4&&p<.5);
 await page.evaluate(()=>scrollTo(0,(document.querySelector('.intro-scroll').getBoundingClientRect().height-innerHeight)*.78));await shot('intro-03');
 await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));await shot('intro-landing');
 await page.locator('.intro-finish').click();await page.waitForSelector('.editor');check('Opening enters live creation',(await state()).route==='/create');
 for(const [w,h]of[[360,740],[390,844],[780,958],[1366,900]]){await page.setViewportSize({width:w,height:h});await shot('create-'+w);const metrics=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,btn:document.querySelector('[data-action=next-step]').getBoundingClientRect().toJSON()}));check(`No horizontal overflow ${w}`,metrics.scroll<=w+1);}
 check('No runtime errors',errors.length===0);
 await writeFile(dir+'/qa.json',JSON.stringify({passed:checks.length,checks,errors,result},null,2));
}catch(e){await page.screenshot({path:dir+'/failure.png',fullPage:true});await writeFile(dir+'/qa-failure.json',JSON.stringify({checks,errors,error:String(e),state:await state()},null,2));console.error(e);process.exitCode=1;}
finally{await context.close();if(!process.exitCode)await copyFile(await page.video().path(),dir+'/walkthrough.webm');await browser.close();}
