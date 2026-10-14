import sharp from 'sharp';import {readFile,mkdir} from 'node:fs/promises';
await mkdir('evidence/visual-v2',{recursive:true});
const assets=JSON.parse(await readFile('assets/source/visual-v2/generation-manifest.json','utf8')).assets.filter(a=>a.folder==='options');
const order=['sea','cross','star','tide','bloom','birds','butterfly','garden','weave','reflect','cluster','relay','blue','gold','green','red','mountain','new','together','future'];
const comp=[];for(let i=0;i<order.length;i++){const a=assets.find(a=>a.id===order[i]);comp.push({input:await sharp(`public/media/options/${a.id}.webp`).resize(260,195).toBuffer(),left:(i%4)*270+5,top:Math.floor(i/4)*205+5});}
await sharp({create:{width:1080,height:1025,channels:3,background:'#f6f1e9'}}).composite(comp).png().toFile('evidence/visual-v2/options-contact-sheet.png');
const b=[];for(const [i,id]of['home-portrait','result-portrait','home-wide','result-wide'].entries()){b.push({input:await sharp(`public/media/v2/${id}.webp`).resize(i<2?270:480,i<2?480:270,{fit:'contain',background:'#eee'}).toBuffer(),left:i<2?i*270:540,top:i<2?0:(i-2)*270});}
await sharp({create:{width:1020,height:540,channels:3,background:'#eee'}}).composite(b).png().toFile('evidence/visual-v2/background-contact-sheet.png');
