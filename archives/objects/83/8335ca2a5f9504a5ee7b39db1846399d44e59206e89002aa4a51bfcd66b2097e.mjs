import {chromium} from 'playwright';
import sharp from 'sharp';
import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
const out='public/review/v3';await mkdir(out,{recursive:true});await mkdir('output/playwright/v3',{recursive:true});
const url=process.env.QA_URL??'http://127.0.0.1:5210/';
const browser=await chromium.launch({channel:'chrome',headless:true});
const p=await browser.newPage({viewport:{width:1920,height:1280}}),errors=[];
p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
const save=async name=>{const b=await p.screenshot();await sharp(b).jpeg({quality:94}).toFile(`${out}/${name}.jpg`);return b;};
try{
 await p.goto(url);await p.waitForFunction(()=>window.cupViewer?.ready());await p.waitForTimeout(1000);
 await p.addStyleTag({content:'header,footer,aside,.open-settings,.open-background,#status{display:none!important}'});
 for(const c of JSON.parse(await readFile('evidence/camera-calibration-v3.json'))){
  await p.evaluate(pose=>window.cupViewer.setCalibration(pose),c.pose);await p.waitForTimeout(900);
  const model=await save(`v3-${c.id}`),reference=await sharp(`assets/source/reference-v3-${c.id}.jpg`).resize(1920,1280).jpeg({quality:95}).toBuffer();
  await writeFile(`${out}/reference-${c.id}.jpg`,reference);
  const a=await sharp(model).removeAlpha().raw().toBuffer(),b=await sharp(reference).removeAlpha().raw().toBuffer();
  const half=Buffer.from(a.map((v,i)=>Math.round((v+b[i])/2)));await sharp(half,{raw:{width:1920,height:1280,channels:3}}).jpeg({quality:94}).toFile(`${out}/${c.id}-overlay.jpg`);
  await sharp({create:{width:3840,height:1280,channels:3,background:'#fff'}}).composite([{input:reference,left:0,top:0},{input:model,left:1920,top:0}]).jpeg({quality:93}).toFile(`${out}/${c.id}-comparison.jpg`);
  await sharp(model).extract({left:730,top:350,width:480,height:180}).png().toFile(`${out}/lid-model-${c.id}.png`);
  await sharp(reference).extract({left:730,top:350,width:480,height:180}).png().toFile(`${out}/lid-reference-${c.id}.png`);
  // Native crops retained separately; these are not generated or repainted.
  await sharp(`assets/source/reference-v3-${c.id}.jpg`).extract({left:2300,top:1130,width:1380,height:480}).jpeg({quality:97}).toFile(`${out}/lid-native-${c.id}.jpg`);
 }
 await p.setViewportSize({width:1400,height:900});await p.evaluate(()=>window.cupViewer.setView('flowers'));await p.waitForTimeout(1800);
 for(const [mode,relief,name] of [['pbr',true,'floral-color'],['floral',true,'floral-gray'],['floral',false,'floral-flat']]){await p.evaluate(([m,r])=>{window.cupViewer.setMode(m);window.cupViewer.setFixedRelief(r)},[mode,relief]);await p.waitForTimeout(300);await save(name);}
 await p.evaluate(()=>{window.cupViewer.setMode('pbr');window.cupViewer.setFixedRelief(true);});
 for(const name of ['hero','front','handle','lid']){await p.evaluate(v=>window.cupViewer.setView(v),name);await p.waitForTimeout(1700);await save(name);}
 const views=[];
 for(let i=0;i<4;i++){const angle=i*Math.PI/2;await p.evaluate(c=>window.cupViewer.setCamera(c,[0,60,0]),[Math.sin(angle)*335,127,Math.cos(angle)*335]);await p.waitForTimeout(800);views.push(await p.screenshot());}
 await sharp({create:{width:1400,height:900,channels:3,background:'#b7b8ba'}}).composite(await Promise.all(views.map(async(v,i)=>({input:await sharp(v).resize(700,450).toBuffer(),left:i%2*700,top:Math.floor(i/2)*450})))).jpeg({quality:92}).toFile(`${out}/quarters.jpg`);
 await writeFile(`${out}/capture.json`,JSON.stringify({date:new Date().toISOString(),url,errors,debug:await p.evaluate(()=>window.cupViewer.debug()),method:'Browser WebGL. References are proportionally resized from 6000x4000; no perspective warp. 50% arithmetic overlays. Native lid crops contain only original pixels.'},null,2));
 await copyFile('evidence/camera-calibration-v3.json',`${out}/camera-calibration.json`);await copyFile('evidence/source-floral-v3.json',`${out}/source-floral.json`);
}finally{await browser.close();}
if(errors.length)throw new Error(errors.join('\n'));
console.log('V3 reference and relief evidence captured.');
