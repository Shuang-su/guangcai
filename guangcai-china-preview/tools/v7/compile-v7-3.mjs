import fs from 'node:fs/promises';import path from 'node:path';import {createHash} from 'node:crypto';import assert from 'node:assert/strict';import sharp from 'sharp';
const hash=b=>createHash('sha256').update(b).digest('hex'),oldRoot='public/releases/v7-2',root='public/releases/v7-3';
const catalog=JSON.parse(await fs.readFile(oldRoot+'/catalog.json')),old=JSON.parse(await fs.readFile(oldRoot+'/'+catalog.manifestUrl)),manifest=structuredClone(old);manifest.releaseId='v7-3';
// Resolve each old URL before rebasing: v7-2 mixes own masks with ../v7-1 assets.
function rebase(v){if(v&&typeof v==='object'){if(v.url&&v.sha256)v.url=path.relative(root,path.resolve(oldRoot,v.url)).split(path.sep).join('/');else Object.values(v).forEach(rebase);}}rebase(manifest);
await fs.mkdir(root+'/assets',{recursive:true});
async function immutable(file,bytes){try{assert.deepEqual(await fs.readFile(file),Buffer.from(bytes),'Published release cannot be overwritten: '+file);}catch(e){if(e.code!=='ENOENT')throw e;await fs.writeFile(file,bytes);}}
async function emit(id,bytes,width,height,source,channels){const sha256=hash(bytes),url=`assets/${id}-${sha256.slice(0,16)}.webp`;await immutable(root+'/'+url,bytes);const decodedBytes=width*height*channels;return {id,url,sha256,sourceSha256:hash(source),encoding:'webp',width,height,bytes:bytes.length,decodedBytes,gpuBytes:Math.ceil(decodedBytes*4/3),channels,colorSpace:'linear'};}
const review=JSON.parse(await fs.readFile('evidence/v7.1.2/cities/review.json')),fillProof=[];
for(const correction of review.corrections){
 assert.equal(old.cities[correction.cityId].levels.detail.mask.sha256,correction.sourceAssetSha256);
 const overlay=await fs.readFile(correction.correction);assert.equal(hash(overlay),correction.correctionSha256);
 for(const [tier,l] of Object.entries(manifest.cities[correction.cityId].levels)){
  const prior=old.cities[correction.cityId].levels[tier].mask,source=await fs.readFile(oldRoot+'/'+prior.url),raw=await sharp(source).removeAlpha().raw().toBuffer({resolveWithObject:true}),pixels=Buffer.from(raw.data);
  const coverage=await sharp(overlay).resize(prior.width,prior.height).ensureAlpha().raw().toBuffer();let changed=0;
  for(let i=0;i<prior.width*prior.height;i++){const j=i*raw.info.channels+1,value=Math.max(pixels[j],coverage[i*4+3]);if(value!==pixels[j])changed++;pixels[j]=value;}
  assert(changed>0);const bytes=await sharp(pixels,{raw:raw.info}).webp({lossless:true}).toBuffer();l.mask=await emit(prior.id,bytes,prior.width,prior.height,Buffer.concat([source,overlay]),2);fillProof.push({cityId:correction.cityId,tier,changedPixels:changed,outlineUnchanged:true,normalSha256:l.normal.sha256});
 }
}
const sourceReport=JSON.parse(await fs.readFile('evidence/v7.1.2/slogans-source.json')),sloganProof=[];
await fs.mkdir('.codex-work/tmp/v7.1.2/full-labels',{recursive:true});
for(const entry of sourceReport.slogans){
 const source=await fs.readFile(entry.master);assert.equal(hash(source),entry.masterSha256);
 const content=source.toString().replace(/^<svg[^>]*>/,'').replace(/<\/svg>\s*$/,'');const h=1783*.52,scale=h/694,x=4096*.81-209*scale/2,y=1783*.09;
 const full=`<svg xmlns="http://www.w3.org/2000/svg" width="4096" height="1783"><g transform="translate(${x} ${y}) scale(${scale})">${content}</g></svg>`;
 const {data,info}=await sharp(Buffer.from(full)).ensureAlpha().raw().toBuffer({resolveWithObject:true});let left=4096,top=1783,right=0,bottom=0;
 for(let yy=0;yy<1783;yy++)for(let xx=0;xx<4096;xx++)if(data[(yy*4096+xx)*4+3]){left=Math.min(left,xx);top=Math.min(top,yy);right=Math.max(right,xx);bottom=Math.max(bottom,yy);}
 left=Math.max(0,left-4);top=Math.max(0,top-4);right=Math.min(4095,right+4);bottom=Math.min(1782,bottom+4);const width=right-left+1,height=bottom-top+1;
 const mask=Buffer.alloc(width*height);for(let yy=0;yy<height;yy++)for(let xx=0;xx<width;xx++)mask[yy*width+xx]=data[((top+yy)*4096+left+xx)*4+3];
 const bytes=await sharp(mask,{raw:{width,height,channels:1}}).webp({lossless:true}).toBuffer();manifest.slogans[entry.id]={text:entry.text,asset:await emit('slogan-'+entry.id,bytes,width,height,source,1),uvRect:[left/4096,1-(top+height)/1783,width/4096,height/1783]};
 await fs.writeFile(`.codex-work/tmp/v7.1.2/full-labels/${entry.id}.svg`,full);sloganProof.push({id:entry.id,width,height,bytes:bytes.length,gpuBytes:Math.ceil(width*height*4/3),uvRect:manifest.slogans[entry.id].uvRect});
}
const body=JSON.stringify(manifest,null,2)+'\n',name=`manifest-${hash(body).slice(0,16)}.json`;await immutable(root+'/'+name,body);
await immutable(root+'/catalog.json',JSON.stringify({...catalog,releaseId:manifest.releaseId,manifestUrl:name,cities:Object.fromEntries(Object.entries(manifest.cities).map(([id,c])=>[id,{name:c.name,thumbnail:c.thumbnail.url}]))},null,2)+'\n');
const bootstrap=JSON.parse(await fs.readFile('public/api/v1/bootstrap.json'));Object.assign(bootstrap,{releaseId:manifest.releaseId,catalogUrl:'releases/v7-3/catalog.json',manifestUrl:'releases/v7-3/'+name});bootstrap.defaultDesign.resourceReleaseId='v7-3';await fs.writeFile('public/api/v1/bootstrap.json',JSON.stringify(bootstrap,null,2)+'\n');
const report={releaseId:manifest.releaseId,reuses:['v7-1','v7-2'],changedMaskFiles:fillProof.length,changedSloganFiles:sloganProof.length,fillProof,sloganProof,sloganGpuBytes:sloganProof.reduce((n,s)=>n+s.gpuBytes,0),fontRuntimeBytes:0};await fs.writeFile('evidence/v7.1.2/resource-build.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
