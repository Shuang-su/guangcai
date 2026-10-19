// The production delta is six outlined slogan masks. All city/fixed maps are reused.
import fs from 'node:fs/promises';import path from 'node:path';import {createHash} from 'node:crypto';import assert from 'node:assert/strict';import sharp from 'sharp';
const hash=b=>createHash('sha256').update(b).digest('hex'),root='public/releases/v7-6',prior='public/releases/v7-5',masters='assets/masters/v7.1.5';
await fs.mkdir(root+'/assets',{recursive:true});await fs.mkdir('evidence/v7.1.5',{recursive:true});
const cat=JSON.parse(await fs.readFile(prior+'/catalog.json')),old=JSON.parse(await fs.readFile(prior+'/'+cat.manifestUrl)),m=structuredClone(old);m.releaseId='v7-6';
function rebase(v){if(v&&typeof v==='object'){if(v.url&&v.sha256)v.url=path.relative(root,path.resolve(prior,v.url)).split(path.sep).join('/');else Object.values(v).forEach(rebase);}}rebase(m);
async function immutable(p,b){b=Buffer.from(b);try{assert.deepEqual(await fs.readFile(p),b,'Immutable release changed: '+p);}catch(e){if(e.code!=='ENOENT')throw e;await fs.writeFile(p,b);}}
const W=4096,H=1783,scale=W*.82/1939,dx=W*.047,dy=H-815*scale,proof=[];
for(const [id,label] of Object.entries(m.slogans)){
 const source=await fs.readFile(`${masters}/slogan-${id}.svg`),full=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><g transform="translate(${dx+1539*scale} ${dy+190*scale}) scale(${scale})">${source}</g></svg>`;
 const {data}=await sharp(Buffer.from(full)).ensureAlpha().raw().toBuffer({resolveWithObject:true});let l=W,t=H,r=0,b=0;
 for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(data[(y*W+x)*4+3]){l=Math.min(l,x);t=Math.min(t,y);r=Math.max(r,x);b=Math.max(b,y);}
 l-=4;t-=4;r+=4;b+=4;assert(l>=0&&t>=0&&r<W&&b<H);const width=r-l+1,height=b-t+1,pixels=Buffer.alloc(width*height);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++)pixels[y*width+x]=data[((t+y)*W+l+x)*4+3];
 const bytes=await sharp(pixels,{raw:{width,height,channels:1}}).webp({lossless:true}).toBuffer(),sha256=hash(bytes),url=`assets/slogan-${id}-${sha256.slice(0,16)}.webp`;await immutable(root+'/'+url,bytes);
 const decodedBytes=width*height;m.slogans[id]={text:label.text,asset:{id:'slogan-'+id,url,sha256,sourceSha256:hash(source),encoding:'webp',width,height,bytes:bytes.length,decodedBytes,gpuBytes:Math.ceil(decodedBytes*4/3),channels:1,colorSpace:'linear'},uvRect:[l/W,1-(t+height)/H,width/W,height/H]};
 proof.push({id,text:label.text,uvRect:m.slogans[id].uvRect,width,height,sha256,sourceSha256:hash(source),origin:['cooperation','innovation'].includes(id)?'Approved outlined glyphs at measured 66px and canonical position':'Current MasterGo outlined glyphs and frame'});
}
const body=JSON.stringify(m,null,2)+'\n',manifest=`manifest-${hash(body).slice(0,16)}.json`;await immutable(root+'/'+manifest,body);await immutable(root+'/catalog.json',JSON.stringify({...cat,releaseId:'v7-6',manifestUrl:manifest},null,2)+'\n');
const boot=JSON.parse(await fs.readFile('public/api/v1/bootstrap.json'));boot.releaseId='v7-6';boot.catalogUrl=root.slice(7)+'/catalog.json';boot.manifestUrl=root.slice(7)+'/'+manifest;boot.defaultDesign.resourceReleaseId='v7-6';await fs.writeFile('public/api/v1/bootstrap.json',JSON.stringify(boot,null,2)+'\n');
await fs.writeFile('evidence/v7.1.5/resource-build.json',JSON.stringify({passed:true,releaseId:'v7-6',manifest,sourceToCup:{scale,offset:[dx,dy]},slogans:proof,changedResources:6,cityAndFixedMapsUnchanged:true},null,2)+'\n');console.log({manifest,changedResources:6});
