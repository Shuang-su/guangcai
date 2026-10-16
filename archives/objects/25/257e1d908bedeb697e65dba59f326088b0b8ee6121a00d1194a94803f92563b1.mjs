import{chromium}from'playwright';import{mkdir,writeFile,copyFile}from'node:fs/promises';import assert from'node:assert/strict';
const dir='evidence/petal-ribbons',url=process.env.QA_URL??'http://127.0.0.1:5178';await mkdir(dir+'/video',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});const ctx=await browser.newContext({viewport:{width:430,height:932},deviceScaleFactor:1,hasTouch:true,recordVideo:{dir:dir+'/video',size:{width:430,height:932}}});const page=await ctx.newPage();const checks=[],errors=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
const state=()=>page.evaluate(()=>h5Debug());const check=(n,b)=>{assert.ok(b,n);checks.push(n);console.log('PASS',n);};const shot=n=>page.screenshot({path:dir+'/'+n+'.png'});
try{
 await page.goto(url+'/#/intro');await page.waitForSelector('.intro-stage');await page.waitForTimeout(600);const id=(await state()).viewer.instanceId;
 const scroll=async n=>{await page.evaluate(n=>scrollTo(0,n*(document.querySelector('.intro-scroll').offsetHeight-innerHeight)),n);await page.waitForTimeout(160);};
 // Real scroll frames, rather than setting scene methods directly.
 for(let i=0;i<=30;i++){await scroll(i/50);}
 await shot('ring-430');await scroll(.70);let top=(await state()).viewer;await shot('top-view-430');
 check('Cup is top-down before lids assemble',top.camera[1]-top.target[1]>330&&!top.assembly.lidVisible&&!top.assembly.saucerVisible);
 await scroll(.84);const assembling=(await state()).viewer;await shot('assembly-430');
 check('Lid and saucer use separate moving 3D groups',assembling.assembly.lidVisible&&assembling.assembly.saucerVisible&&assembling.assembly.lid[1]>140&&assembling.assembly.saucer[0]<-30);
 for(let i=43;i<=50;i++)await scroll(i/50);await shot('intro-main-430');
 check('Main title appears after assembly',await page.locator('.intro-main-title').evaluate(e=>Number(getComputedStyle(e).opacity)>.98));
 await page.getByRole('button',{name:'开始添彩',exact:true}).click();await page.waitForSelector('.options.pbr-ready');await page.waitForTimeout(650);
 let d=await state();check('Same cup survives intro into cards',d.viewer.instanceId===id);check('Seven independent open petal / crossing ribbons',d.viewer.ribbon.meshes===7&&d.viewer.ribbon.silhouette==='open-petal-fan');check('Five PBR channels remain separate',d.viewer.ribbon.pbrChannels.length===5);check('Glass uses transmission, no opaque backplate',d.viewer.ribbon.cards.transmission>.9&&!d.viewer.ribbon.cards.opaqueBackplate);
 await page.evaluate(()=>{window.__glassHost=document.querySelector('.options');});await page.getByRole('radio').first().click();check('Selecting keeps the same ready glass host',await page.evaluate(()=>window.__glassHost===document.querySelector('.options')&&window.__glassHost.classList.contains('pbr-ready')));await page.locator('[data-action=next-step]').click();await page.waitForTimeout(180);await shot('wipe-enter');await page.waitForTimeout(470);await shot('wipe-overlap');
 check('Current heading remains visible during sweep',await page.locator('#step-title').isVisible());check('Multi-layer sweep moves left to right',(await state()).viewer.ribbon.sweepDirection==='left-to-right');
 await page.waitForFunction(()=>!h5Debug().viewer.ribbon.transitioning);check('Sweep reveals glass without remounting to flat cards',await page.locator('.options').evaluate(e=>e.classList.contains('pbr-ready')));await shot('cards-final-430');
 await page.getByRole('radio').nth(1).click();await page.getByRole('button',{name:'活动规则',exact:true}).click();const selected=(await state()).session.draft.choices;await page.getByRole('button',{name:'关闭',exact:true}).click();check('Rule close keeps card choices',JSON.stringify((await state()).session.draft.choices)===JSON.stringify(selected));
 for(let i=1;i<5;i++){await page.getByRole('radio').nth(i%4).click();await page.locator('[data-action=next-step]').click();if(i<4){await page.locator(`[data-step="${i+1}"]`).waitFor();await page.waitForFunction(()=>!h5Debug().viewer.ribbon.transitioning);}}
 await page.waitForSelector('.poster-image.ready',{timeout:60000});await page.getByRole('button',{name:'查看 3D 作品',exact:false}).click();await page.waitForSelector('#viewer-host[data-ready=true]');await page.waitForTimeout(850);
 const rect=await page.locator('#viewer-host').boundingBox();check('Result observation slot reaches both screen edges',Math.abs(rect.x)<1&&Math.abs(rect.width-430)<1);await shot('result-full-bleed');
 await page.locator('.viewer-tools summary').click();await page.getByRole('button',{name:'放大器物',exact:true}).click();await page.getByRole('button',{name:'放大器物',exact:true}).click();await page.waitForTimeout(250);await shot('result-zoom');
 check('Result button uses generated ink slice',await page.locator('.result-viewer>.primary').evaluate(e=>getComputedStyle(e).backgroundImage.includes('ink-button.webp')));
 await page.getByRole('button',{name:'查看分享海报',exact:true}).click();await page.waitForSelector('.poster-image.ready');check('Poster return preserves result',(await state()).viewer.instanceId===id);
 await page.goto(url+'/#/home');await page.waitForSelector('#viewer-host[data-ready=true]');await page.waitForTimeout(800);const before=await page.locator('.home-art').evaluate(e=>getComputedStyle(e).transform);await page.getByRole('button',{name:/开始添彩|继续添彩|查看我的作品/}).click();await page.waitForTimeout(180);const during=await page.locator('.home-art').evaluate(e=>getComputedStyle(e).transform);check('Background transforms during route transition',before!==during);
 await page.goto(url+'/#/create');await page.waitForSelector('.options.pbr-ready');await page.waitForTimeout(800);for(const [w,h]of[[360,640],[390,844],[780,958],[1366,900]]){await page.setViewportSize({width:w,height:h});await page.waitForTimeout(450);check(`No overflow at ${w}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:dir+`/cards-final-${w}.png`,fullPage:true});}
 check('No runtime or shader errors',errors.length===0);
 await writeFile(dir+'/qa.json',JSON.stringify({url,checks,errors,limitations:'Desktop Chromium and emulated touch only. Not real mobile GPU acceptance.'},null,2));
}catch(e){await shot('failure');await writeFile(dir+'/qa-failure.json',JSON.stringify({checks,errors,error:String(e),state:await state()},null,2));console.error(e);process.exitCode=1;}
const video=page.video();await ctx.close();await copyFile(await video.path(),dir+'/interaction.webm');await browser.close();
