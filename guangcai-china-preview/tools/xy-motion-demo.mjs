// Capture real browser input; no generated or interpolated demonstration frames.
import {chromium} from 'playwright';
import {mkdir,rename,writeFile} from 'node:fs/promises';
const url=process.env.QA_URL??'http://127.0.0.1:5236/';
const out=process.env.QA_OUT??'../.codex-work/tmp/xy-controls/motion-demo';await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:600,height:900},recordVideo:{dir:out,size:{width:600,height:900}}});
const page=await context.newPage(),video=page.video(),errors=[];page.on('pageerror',e=>errors.push(e.message));
const idle=()=>page.waitForFunction(()=>!window.cupViewer.debug().selection.busy);
async function point(id,x,y){
 const pad=page.locator('#'+id);await pad.scrollIntoViewIfNeeded();const b=await pad.boundingBox();
 return {x:b.x+18+x*(b.width-36),y:b.y+18+(1-y)*(b.height-36)};
}
async function drag(id,positions){
 const first=await point(id,...positions[0]);await page.mouse.move(first.x,first.y);await page.mouse.down();await page.waitForTimeout(220);
 for(const [x,y]of positions.slice(1)){const p=await point(id,x,y);await page.mouse.move(p.x,p.y,{steps:3});await page.waitForTimeout(55);}
 await page.mouse.up();await idle();await page.waitForTimeout(600);
}
try{
 await page.goto(url);await page.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:180000});
 await page.locator('#open-artwork').click();await page.locator('.city-selector summary').click();await page.locator('[data-theme="beijing"]').click();await idle();await page.locator('[data-variant="beijing-blue"]').click();await idle();
 const slider=await page.locator('#fill-lightness').boundingBox();
 await page.mouse.click(slider.x+slider.width/2,slider.y+17+.45*(slider.height-34));await idle();await page.waitForTimeout(350);
 await drag('color-pad',Array.from({length:30},(_,i)=>{const a=i/29*Math.PI*1.6;return [.5+.35*Math.cos(a),.5+.35*Math.sin(a)];}));
 await page.mouse.move(slider.x+slider.width/2,slider.y+17+.45*(slider.height-34));await page.mouse.down();
 for(let i=0;i<=20;i++){const l=.25+.5*Math.sin(i/20*Math.PI);await page.mouse.move(slider.x+slider.width/2,slider.y+17+(1-l)*(slider.height-34));await page.waitForTimeout(55);}
 await page.mouse.up();await idle();await page.waitForTimeout(400);
 await page.locator('#adjust-material-tab').click();
 await drag('material-pad',Array.from({length:28},(_,i)=>[.15+.7*i/27,.5+.32*Math.sin(i/27*Math.PI*2)]));
 await page.locator('#adjust-color-tab').click();await page.locator('#fill-lightness').press('End');await page.locator('#fill-lightness').press('ArrowDown');await idle();
 await page.locator('#reset-palette').click();await idle();await page.locator('#close-artwork').click();await page.locator('#open-artwork').click();await page.waitForTimeout(700);
}finally{
 await context.close();await rename(await video.path(),out+'/interaction.webm');await browser.close();
 await writeFile(out+'/capture.json',JSON.stringify({url,viewport:{width:600,height:900},capture:'Playwright native recordVideo with actual pointer and range input',errors},null,2)+'\n');
}
if(errors.length)throw new Error(errors.join('\n'));
