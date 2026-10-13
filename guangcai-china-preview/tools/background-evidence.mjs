import {chromium} from 'playwright';import sharp from 'sharp';import{mkdir,copyFile}from'node:fs/promises';
const out='public/review/background',raw='output/playwright/background';await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 const page=await context.newPage();await page.goto('http://127.0.0.1:5208/');await page.waitForFunction(()=>window.cupViewer?.ready()&&!window.cupViewer.debug().background.busy);await page.waitForFunction(()=>getComputedStyle(document.querySelector('#status')).opacity==='0');
 await page.screenshot({path:raw+'/mobile-soft.png'});
 await page.locator('#open-background').tap();await page.waitForTimeout(350);await page.screenshot({path:raw+'/mobile-panel.png'});
 await page.locator('[data-background-choice="gray"]').tap();await page.locator('#close-background').tap();await page.waitForTimeout(100);await page.screenshot({path:raw+'/mobile-gray.png'});
 await sharp({create:{width:780,height:844,channels:3,background:'#fff'}}).composite([{input:raw+'/mobile-gray.png',left:0,top:0},{input:raw+'/mobile-soft.png',left:390,top:0}]).jpeg({quality:92}).toFile(out+'/mobile-comparison.jpg');
 await sharp(raw+'/mobile-panel.png').jpeg({quality:92}).toFile(out+'/mobile-panel.jpg');
 await copyFile(raw+'/verification.json',out+'/verification.json');
}finally{await browser.close();}
console.log(out);
