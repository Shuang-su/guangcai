import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const slogans={open:'开放包容',innovation:'创新驱动',cooperation:'合作共赢',sharing:'共建共享',together:'携手同心',ocean:'拥抱瀚海'};
const fonts=await Promise.all(['woff2','woff'].map(async format=>({format,data:(await readFile(`assets/source/v6/fonts/nvgJEqf2rEvO.${format}`)).toString('base64')})));
const frame=(await readFile('assets/masters/v6/slogan-frame.svg','utf8')).replaceAll('#dcb251','#ffffff');
const browser=await chromium.launch({channel:'chrome',headless:true});
const records=[];
try{
 const page=await browser.newPage();await page.route('http://127.0.0.1/font-build',r=>r.fulfill({contentType:'text/html',body:'<!doctype html><html><body></body></html>'}));await page.goto('http://127.0.0.1/font-build');
 const result=await page.evaluate(async({fonts,frame,slogans})=>{
  const hash=async a=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',a))).map(x=>x.toString(16).padStart(2,'0')).join('');
  // Load both official formats independently; failure is fatal, no system fallback.
  for(const f of fonts){const face=new FontFace('V6-'+f.format,`url(data:font/${f.format};base64,${f.data})`,{weight:'400',style:'normal'});await face.load();document.fonts.add(face);if(face.status!=='loaded')throw Error('Official font unavailable');}
  await document.fonts.ready;
  const image=new Image();image.src='data:image/svg+xml;base64,'+btoa(frame);await image.decode();
  const output=[];
  for(const [id,phrase]of Object.entries(slogans)){
   const variants=[];
   for(const format of ['woff2','woff']){
    const c=document.createElement('canvas');c.width=4096;c.height=1783;const ctx=c.getContext('2d',{willReadFrequently:true});
    ctx.fillStyle='#000';ctx.fillRect(0,0,c.width,c.height);
    const height=c.height*.52,width=height*image.naturalWidth/image.naturalHeight,x=c.width*.81-width/2,y=c.height*.09;
    ctx.drawImage(image,x,y,width,height);ctx.fillStyle='#fff';ctx.font=`normal 400 ${width*.44}px "V6-${format}"`;ctx.textAlign='center';ctx.textBaseline='alphabetic';
    const glyphs=[];
    [...phrase].forEach((ch,i)=>{const m=ctx.measureText(ch),center=y+height*(.295+.14*i),baseline=center+(m.actualBoundingBoxAscent-m.actualBoundingBoxDescent)/2;ctx.fillText(ch,x+width/2,baseline);glyphs.push({character:ch,width:m.width,ascent:m.actualBoundingBoxAscent,descent:m.actualBoundingBoxDescent});});
    const pixels=ctx.getImageData(0,0,c.width,c.height).data;variants.push({format,hash:await hash(pixels.buffer),png:c.toDataURL('image/png').split(',')[1],glyphs});
   }
   output.push({id,phrase,variants});
  }return output;
 },{fonts,frame,slogans});
 await mkdir('public/cities/v6',{recursive:true});await mkdir('evidence/city-v6/slogans',{recursive:true});
 for(const r of result){
  assert.equal(r.variants[0].hash,r.variants[1].hash,`${r.id}: WOFF2 and WOFF glyph pixels differ`);
  const png=Buffer.from(r.variants[0].png,'base64');
  await sharp(png).webp({lossless:true}).toFile(`public/cities/v6/slogan-${r.id}.webp`);
  const frameHeight=Math.round(1783*.52),frameWidth=Math.round(frameHeight*Number(frame.match(/width="(\d+)"/)[1])/Number(frame.match(/height="(\d+)"/)[1]));
  await sharp(png).extract({left:Math.floor(4096*.81-frameWidth/2)-4,top:Math.floor(1783*.09)-4,width:frameWidth+8,height:frameHeight+8}).png().toFile(`evidence/city-v6/slogans/${r.id}.png`);
  const {data,info}=await sharp(png).extract({left:Math.floor(4096*.81-frameWidth/2)-4,top:Math.floor(1783*.09)-4,width:frameWidth+8,height:frameHeight+8}).removeAlpha().raw().toBuffer({resolveWithObject:true});
  for(let i=0;i<data.length;i+=3){const a=data[i]/255;data[i]=255*(1-a)+220*a;data[i+1]=253*(1-a)+178*a;data[i+2]=247*(1-a)+81*a;}
  await sharp(data,{raw:info}).webp({quality:95}).toFile(`public/cities/v6/slogan-${r.id}-proof.webp`);
  records.push({id:r.id,text:r.phrase,font:'阿里妈妈东方大楷 Regular',fontWeight:400,fontSizeRatio:.44,centers:[.295,.435,.575,.715],pixelSha256:r.variants[0].hash,formatsMatch:true,glyphs:r.variants[0].glyphs,file:`slogan-${r.id}.webp`,sha256:createHash('sha256').update(await readFile(`public/cities/v6/slogan-${r.id}.webp`)).digest('hex')});
 }
 await writeFile('evidence/city-v6/slogans.json',JSON.stringify({version:6,size:[4096,1783],fontFormatsVerified:['woff2','woff'],slogans:records},null,2)+'\n');
 await writeFile('public/cities/v6/slogans.json',JSON.stringify({version:6,size:[4096,1783],fontFormatsVerified:['woff2','woff'],slogans:records},null,2)+'\n');
 console.log('Six slogan masks generated; WOFF and WOFF2 glyph pixels match exactly.');
}finally{await browser.close();}
