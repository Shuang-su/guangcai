import {chromium} from 'playwright';import {mkdir,writeFile}from'node:fs/promises';
const stage=process.argv[2]??'after',out=`public/review/floral-hq/${stage}`;await mkdir(out,{recursive:true});
const b=await chromium.launch({channel:'chrome',headless:true}),p=await b.newPage({viewport:{width:1400,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
try{await p.goto(process.env.QA_URL??'http://127.0.0.1:5210/');await p.waitForFunction(()=>window.cupViewer?.ready(),{},{timeout:120000});await p.addStyleTag({content:'header,footer,aside,.open-settings,.open-background,#status{display:none!important}'});
for(const [name,yaw]of [['seam',52.2],['petals',46],['center',180]]){
 const pose={cupYaw:180,yaw,pitch:0,roll:0,distance:125,fov:13,cx:.5,cy:.5,targetY:11};
 await p.evaluate(pose=>window.cupViewer.setCalibration(pose),pose);await p.waitForTimeout(600);
 for(const [mode,relief,suffix]of [['pbr',true,'color'],['floral',true,'gray'],['floral',false,'flat']]){await p.evaluate(([m,r])=>{window.cupViewer.setMode(m);window.cupViewer.setFixedRelief(r)},[mode,relief]);await p.waitForTimeout(400);await p.screenshot({path:`${out}/${name}-${suffix}.png`});}
}
await p.evaluate(()=>{window.cupViewer.setMode('pbr');window.cupViewer.setFixedRelief(true);window.cupViewer.setView('hero')});await p.waitForTimeout(1600);await p.screenshot({path:out+'/hero.png'});
await writeFile(out+'/capture.json',JSON.stringify({date:new Date().toISOString(),stage,errors,debug:await p.evaluate(()=>window.cupViewer.debug())},null,2));if(errors.length)throw Error(errors.join('\n'));console.log({stage,errors});}finally{await b.close()}
