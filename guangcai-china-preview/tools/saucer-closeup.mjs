import {chromium} from 'playwright';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:800,height:800},deviceScaleFactor:1.5});
 await page.goto(process.env.QA_URL??'http://127.0.0.1:5187/');await page.waitForFunction(()=>window.cupViewer?.ready());
 await page.evaluate(()=>window.cupViewer.reference('1221-detail'));await page.waitForTimeout(800);
 await page.addStyleTag({content:'header,footer,#open-settings,#settings,#status{display:none!important}'});
 await page.screenshot({path:'../evidence/saucer-correction/after-pbr.png'});
 await page.evaluate(()=>{const el=document.getElementById('material-mode');el.value='clay';el.dispatchEvent(new Event('change',{bubbles:true}));});await page.waitForTimeout(500);
 await page.screenshot({path:'../evidence/saucer-correction/after-clay.png'});
}finally{await browser.close();}
