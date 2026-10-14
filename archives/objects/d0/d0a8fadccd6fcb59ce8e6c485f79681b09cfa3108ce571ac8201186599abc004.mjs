import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const url=process.env.QA_URL||'http://127.0.0.1:5218/';
const out=`output/playwright/beijing-4.3/${url.startsWith('https:')?'online':'production'}-preview`;
await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
try{
 await page.goto(url);await page.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:180000});
 assert.equal(await page.evaluate(()=>window.cupViewer.debug().version),'4.3.0');checks.push('Production version 4.3.0');
 await page.locator('#open-artwork').click();await page.locator('[data-theme="beijing"]').click();await page.waitForFunction(()=>!window.cupViewer.debug().selection.busy);
 assert.equal(await page.locator('.variant-card').count(),5);checks.push('Beijing five choices');
 await page.locator('[data-variant="beijing-blue"]').click();await page.waitForFunction(()=>!window.cupViewer.debug().selection.busy);
 assert.equal(await page.evaluate(()=>window.cupViewer.debug().selection.current.variant),'beijing-blue');
 await page.screenshot({path:`${out}/production-beijing.jpg`});
 await page.goto(new URL('evidence.html#beijing-4.3',url).href);
 await page.locator('#beijing-4\\.3 img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));
 for(const color of ['gold','green','red','purple','blue']){
  await page.selectOption('#beijing-variant',color);
  for(const finish of color==='gold'?['enamel']:['enamel','metal','paint']){
   if(color!=='gold')await page.selectOption('#beijing-finish',finish);
   await page.waitForFunction(()=>[...document.querySelectorAll('#beijing-4\\.3 img')].every(i=>i.complete&&i.naturalWidth>0),null,{timeout:60000});
   checks.push(`Comparison images decoded: ${color}/${finish}`);
  }
 }
 await page.selectOption('#beijing-variant','green');await page.selectOption('#beijing-finish','enamel');
 await page.locator('input[data-compare="beijing-source"]').fill('25');
 assert.equal(await page.locator('#beijing-source .model').evaluate(e=>e.style.clipPath),'inset(0px 75% 0px 0px)');checks.push('Source comparison slider works');
 await page.screenshot({path:`${out}/evidence.jpg`});
 assert.deepEqual(errors,[]);checks.push('No page or network errors');
}finally{await writeFile(`${out}/qa.json`,JSON.stringify({url,checks,errors,date:new Date().toISOString()},null,2));await browser.close();}
console.log(JSON.stringify({checks:checks.length,errors}));
