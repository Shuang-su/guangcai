import {chromium} from 'playwright';
import sharp from 'sharp';
import {readFile,mkdir,copyFile,writeFile}from'node:fs/promises';
const root='output/playwright/china',out='public/review';await mkdir(out,{recursive:true});
const b=await chromium.launch({channel:'chrome',headless:true});const p=await b.newPage({viewport:{width:1440,height:1000}});
try{
 await p.goto(process.env.QA_URL??'http://127.0.0.1:5208');await p.waitForFunction(()=>window.cupViewer?.ready());await p.waitForTimeout(1000);
 await p.addStyleTag({content:'header,footer,aside,.open-settings,#status{display:none!important}'});
 for(const c of JSON.parse(await readFile('evidence/camera-calibration.json','utf8'))){
  await p.setViewportSize({width:c.width,height:c.height});await p.waitForTimeout(100);await p.evaluate(pose=>window.cupViewer.setCalibration(pose),c.pose);await p.waitForTimeout(700);
  await p.screenshot({path:`${root}/reference-pose-${c.id}.png`});
  const model=await sharp(`${root}/reference-pose-${c.id}.png`).removeAlpha().raw().toBuffer(),ref=await sharp(`public/reference/${c.id}.jpg`).removeAlpha().raw().toBuffer();
  const half=Buffer.from(model.map((v,i)=>Math.round((v+ref[i])/2)));await sharp(half,{raw:{width:c.width,height:c.height,channels:3}}).png().toFile(`${out}/${c.id}-overlay.png`);
  await copyFile(`${root}/reference-pose-${c.id}.png`,`${out}/${c.id}-model.png`);await copyFile(`public/reference/${c.id}.jpg`,`${out}/${c.id}-reference.jpg`);
  await sharp({create:{width:c.width*2,height:c.height,channels:3,background:'#eeeeeb'}}).composite([{input:`public/reference/${c.id}.jpg`,left:0,top:0},{input:`${root}/reference-pose-${c.id}.png`,left:c.width,top:0}]).jpeg({quality:92}).toFile(`${out}/${c.id}-comparison.jpg`);
 }
 await p.setViewportSize({width:1440,height:1000});await p.evaluate(()=>window.cupViewer.setView('hero'));await p.waitForTimeout(1500);
 for(let i=0;i<4;i++){const angle=i*Math.PI/2;await p.evaluate(c=>window.cupViewer.setCamera(c,[0,60,0]),[Math.sin(angle)*335,127,Math.cos(angle)*335]);await p.waitForTimeout(600);await p.screenshot({path:`${root}/quarter-${i}.png`});}
}finally{await b.close();}
for(const name of['desktop','front','handle','detail','mobile','convex','flat','concave','stroke-only'])await sharp(`${root}/${name}.png`).resize({width:1200,withoutEnlargement:true}).jpeg({quality:91}).toFile(`${out}/${name}.jpg`);
for(const [source,name] of [['evidence/bottom-fix-detail.png','before-matte'],['evidence/matte-detail.png','after-matte'],['evidence/china-atlas-preview.png','atlas']])await sharp(source).resize({width:1200,withoutEnlargement:true}).jpeg({quality:93}).toFile(`${out}/${name}.jpg`);
for(const name of['lines-original','lines','metalness','height','normal','label'])await sharp(`public/china/${name}.png`).resize({width:1200}).png().toFile(`${out}/${name}.png`);
const tileW=640,tileH=444;
await sharp({create:{width:tileW*2,height:tileH*2,channels:3,background:'#b7b8ba'}}).composite(await Promise.all([0,1,2,3].map(async i=>({input:await sharp(`${root}/quarter-${i}.png`).resize(tileW,tileH,{fit:'cover'}).toBuffer(),left:(i%2)*tileW,top:Math.floor(i/2)*tileH})))).jpeg({quality:90}).toFile(`${out}/fixed-quarters.jpg`);
await copyFile('evidence/browser-qa.json',`${out}/browser-qa.json`);await copyFile('evidence/psd-audit.json',`${out}/psd-audit.json`);await copyFile('evidence/camera-calibration.json',`${out}/camera-calibration.json`);
await writeFile(`${out}/evidence.json`,JSON.stringify({date:new Date().toISOString(),description:'Browser WebGL captures. Reference images are unmodified crops. Overlays are arithmetic 50% blends for alignment inspection; no generated replacement render.'},null,2));
console.log('Evidence generated in '+out);
