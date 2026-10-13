import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
const ids=['1220','1197','1198','1199','1205','1206','1163','1159','1165','1168','1178','1182','1145','1148','1142'];
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:768,height:1024},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>{errors.push(e.message);console.log(e.message)});
await page.goto('http://127.0.0.1:5187/');await page.waitForFunction(()=>window.cupViewer?.ready());
await page.addStyleTag({content:'header,footer,#open-settings,#settings,#status{display:none!important}'});
await mkdir('../evidence/matched-views',{recursive:true});
const states={};
for(const id of ids){await page.evaluate(id=>window.cupViewer.reference(id),id);await page.waitForTimeout(450);await page.screenshot({path:`../evidence/matched-views/${id}.png`});states[id]=await page.evaluate(()=>window.cupViewer.debug());}
await writeFile('../evidence/matched-views/cameras.json',JSON.stringify({viewport:{width:768,height:1024},states,errors},null,2));
await browser.close();console.log(JSON.stringify({captures:ids.length,errors}));
