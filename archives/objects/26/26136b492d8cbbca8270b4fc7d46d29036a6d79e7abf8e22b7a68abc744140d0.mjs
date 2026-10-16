import {chromium} from 'playwright';
import sharp from 'sharp';
import assert from 'node:assert/strict';
import {mkdir,writeFile,copyFile} from 'node:fs/promises';
const url=process.env.QA_URL??'http://127.0.0.1:5208/';
const output='output/playwright/relief-separation',review='public/review/relief-separation';
await mkdir(output,{recursive:true});await mkdir(review,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
page.on('console',m=>{if(m.type()==='error'&&/WebGLProgram|Shader Error|GL_INVALID/.test(m.text()))errors.push(m.text());});
try{
 await page.goto(url);await page.waitForFunction(()=>window.cupViewer?.ready());
 await page.addStyleTag({content:'header,footer,aside,.open-settings,#status{display:none!important}'});
 await page.evaluate(()=>window.cupViewer.setView('front'));await page.waitForTimeout(2800);
 await page.evaluate(()=>window.cupViewer.refreshReflections());await page.waitForTimeout(180);
 const withHandle=await page.screenshot({path:`${output}/handle-in-reflection.png`});
 await page.evaluate(()=>window.cupViewer.refreshReflections({includeHandle:false}));await page.waitForTimeout(180);
 const withoutHandle=await page.screenshot({path:`${output}/handle-excluded-from-reflection.png`});
 const crop={left:780,top:320,width:100,height:380};
 const a=await sharp(withHandle).extract(crop).removeAlpha().raw().toBuffer();
 const b=await sharp(withoutHandle).extract(crop).removeAlpha().raw().toBuffer();
 let sum=0,max=0,pixels=0;const diff=Buffer.alloc(a.length);
 for(let i=0;i<a.length;i+=3){let p=0;for(let c=0;c<3;c++){const d=Math.abs(a[i+c]-b[i+c]);sum+=d;max=Math.max(max,d);p=Math.max(p,d);diff[i+c]=Math.min(255,d*20);}if(p>1)pixels++;}
 const mean=sum/a.length;
 assert.ok(mean>.025&&max>=2&&pixels>100,'Actual handle contributes visible pixel differences on white cup body');
 assert.equal(errors.length,0,'No browser or shader errors');
 await sharp(diff,{raw:{width:crop.width,height:crop.height,channels:3}}).png().toFile(`${output}/handle-reflection-difference-x20.png`);
 await copyFile(`${output}/handle-reflection-difference-x20.png`,`${review}/handle-reflection-difference-x20.png`);
 await page.evaluate(()=>window.cupViewer.refreshReflections());await page.waitForTimeout(180);
 await page.screenshot({path:`${output}/final-front.png`});
 await page.evaluate(()=>window.cupViewer.setView('detail'));await page.waitForTimeout(2400);
 await page.screenshot({path:`${output}/final-detail.png`});
 for(const [source,name]of[['final-front','front'],['final-detail','after-detail'],['handle-in-reflection','reflection-on'],['handle-excluded-from-reflection','reflection-without-handle']]){
  await sharp(`${output}/${source}.png`).jpeg({quality:94}).toFile(`${review}/${name}.jpg`);
 }
 const result={date:new Date().toISOString(),url,whitePorcelainCrop:crop,meanRgbDelta:mean,maxChannelDelta:max,pixelsOverOneLevel:pixels,errors,method:'Real handle hidden only for cube capture, restored in camera image; compares white body pixels at identical pose',scope:'Local finite-volume reflection approximation; difference amplification image is labeled x20, not an actual render'};
 await writeFile('evidence/handle-reflection-qa.json',JSON.stringify(result,null,2));await copyFile('evidence/handle-reflection-qa.json',`${review}/handle-reflection-qa.json`);console.log(JSON.stringify(result,null,2));
}finally{await browser.close();}
