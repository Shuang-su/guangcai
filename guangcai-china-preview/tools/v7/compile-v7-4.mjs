import fs from 'node:fs/promises';import path from 'node:path';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';import {gunzipSync,gzipSync} from 'node:zlib';import {DataUtils} from 'three';import sharp from 'sharp';import {resizeNormal} from './resize-hfn.mjs';
const hash=b=>createHash('sha256').update(b).digest('hex'),root='public/releases/v7-4',oldRoot='public/releases/v7-3',masters='assets/masters/v7.1.3';
const catalog=JSON.parse(await fs.readFile(oldRoot+'/catalog.json')),old=JSON.parse(await fs.readFile(oldRoot+'/'+catalog.manifestUrl)),manifest=structuredClone(old);manifest.releaseId='v7-4';manifest.fixedMapping='source-layout-v4';
function rebase(v){if(v&&typeof v==='object'){if(v.url&&v.sha256)v.url=path.relative(root,path.resolve(oldRoot,v.url)).split(path.sep).join('/');else Object.values(v).forEach(rebase);}}rebase(manifest);
async function immutable(file,bytes){try{assert.deepEqual(await fs.readFile(file),Buffer.from(bytes),'Cannot overwrite published file: '+file);}catch(e){if(e.code!=='ENOENT')throw e;await fs.writeFile(file,bytes);}}
await fs.mkdir(root+'/assets',{recursive:true});await fs.mkdir(masters,{recursive:true});await fs.mkdir('evidence/v7.1.3',{recursive:true});
const sourceFile='assets/masters/v3/body.png',source=await fs.readFile(sourceFile),{data,info}=await sharp(source).removeAlpha().raw().toBuffer({resolveWithObject:true});
assert.equal(info.width,637);assert.equal(info.height,1534);
// Only the two explicitly identified manufacturing cutouts. Seeds, bounded windows,
// source checksum and resulting mask are reviewable; white flowers are never scanned.
const spec={sourceFile,sourceSha256:hash(source),size:[637,1534],holes:[{id:'upper',seed:[315,180],bounds:[210,85,426,308]},{id:'lower',seed:[315,1010],bounds:[210,910,427,1118]}],edgeRadius:2,normalEdgeRadius:4,goldRGB:[255,200,70],roughness:56,metalness:255};
const core=Buffer.alloc(info.width*info.height),counts=[];
for(const hole of spec.holes){const [left,top,right,bottom]=hole.bounds,queue=[hole.seed[1]*info.width+hole.seed[0]],seen=new Set();let count=0;
 while(queue.length){const id=queue.pop();if(seen.has(id))continue;seen.add(id);const x=id%info.width,y=Math.floor(id/info.width);if(x<left||x>right||y<top||y>bottom)continue;
  if(![0,1,2].every(k=>data[id*info.channels+k]>=240))continue;core[id]=255;count++;queue.push(id-1,id+1,id-info.width,id+info.width);
 }assert(count>25000&&count<50000);counts.push({id:hole.id,pixels:count});
}
// Expand only a few pixels into the surrounding bare gold to remove anti-aliased
// white outlines and the normal ridge produced by the obsolete cutout boundary.
function dilate(radius){const out=Buffer.from(core);for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(core[y*info.width+x])for(let dy=-radius;dy<=radius;dy++)for(let dx=-radius;dx<=radius;dx++)if(dx*dx+dy*dy<=radius*radius){const xx=x+dx,yy=y+dy;if(xx>=0&&xx<info.width&&yy>=0&&yy<info.height)out[yy*info.width+xx]=255;}return out;}
const correction=await sharp(dilate(2),{raw:{width:info.width,height:info.height,channels:1}}).png().toBuffer(),normalCorrection=await sharp(dilate(4),{raw:{width:info.width,height:info.height,channels:1}}).png().toBuffer();
await immutable(masters+'/body-hole-mask.png',correction);await immutable(masters+'/body-normal-repair-mask.png',normalCorrection);await immutable(masters+'/body-hole-spec.json',JSON.stringify(spec,null,2)+'\n');
const colorSource=await fs.readFile('public/fixed/body-baseColor.png'),roughSource=await fs.readFile('public/fixed/body-roughness.png'),metalSource=await fs.readFile('public/fixed/body-metalness.png'),normalSource=await fs.readFile('public/fixed/body-normal.hfn.gz');
const color=await sharp(colorSource).removeAlpha().raw().toBuffer({resolveWithObject:true}),rough=await sharp(roughSource).removeAlpha().raw().toBuffer(),metal=await sharp(metalSource).removeAlpha().raw().toBuffer();
const {width:w,height:h}=color.info,mask=await sharp(correction).resize(w,h).removeAlpha().greyscale().raw().toBuffer(),normalMask=await sharp(normalCorrection).resize(w,h).blur(.5).removeAlpha().greyscale().raw().toBuffer();
const correctedColor=Buffer.from(color.data),orm=Buffer.alloc(w*h*3),normal=gunzipSync(normalSource),normals=new Uint16Array(normal.buffer,normal.byteOffset+16,w*h*4);
assert.equal(normal.toString('ascii',0,4),'HFN1');assert.equal(normal.readUInt32LE(4),w);assert.equal(normal.readUInt32LE(8),h);
let changedColorPixels=0,changedNormalPixels=0;
for(let i=0;i<w*h;i++){const alpha=mask[i]/255;orm[i*3]=255;orm[i*3+1]=Math.round(rough[i*3]*(1-alpha)+spec.roughness*alpha);orm[i*3+2]=Math.round(metal[i*3]*(1-alpha)+spec.metalness*alpha);
 if(alpha){changedColorPixels++;for(let c=0;c<3;c++)correctedColor[i*3+c]=Math.round(correctedColor[i*3+c]*(1-alpha)+spec.goldRGB[c]*alpha);}
 const a=normalMask[i]/255;if(a){changedNormalPixels++;const j=((h-1-Math.floor(i/w))*w+i%w)*4,n=[0,1,2].map(k=>(DataUtils.fromHalfFloat(normals[j+k])*2-1)*(1-a)+(k===2?a:0)),length=Math.hypot(...n);for(let k=0;k<3;k++)normals[j+k]=DataUtils.toHalfFloat(n[k]/length*.5+.5);}
}
const masterColor=await sharp(correctedColor,{raw:color.info}).png().toBuffer(),masterOrm=await sharp(orm,{raw:{width:w,height:h,channels:3}}).png().toBuffer(),masterNormal=gzipSync(normal,{level:9});
for(const [name,bytes]of [['body-color.png',masterColor],['body-orm.png',masterOrm],['body-normal.hfn.gz',masterNormal]])await immutable(masters+'/'+name,bytes);
async function emit(prior,bytes,provenance){const sha256=hash(bytes),url=`assets/${prior.id}-${sha256.slice(0,16)}.${prior.encoding==='webp'?'webp':'hfn.gz'}`;await immutable(root+'/'+url,bytes);return {...prior,url,sha256,bytes:bytes.length,sourceSha256:hash(provenance)};}
const generated=[];
for(const [tier,level]of Object.entries(manifest.fixed.body)){const d={w:level.baseColor.width,h:level.baseColor.height};
 level.baseColor=await emit(level.baseColor,await sharp(masterColor).resize(d.w,d.h,{kernel:'lanczos3'}).webp({quality:88,effort:5}).toBuffer(),masterColor);
 level.orm=await emit(level.orm,await sharp(masterOrm).resize(d.w,d.h,{kernel:'lanczos3'}).webp({lossless:true}).toBuffer(),masterOrm);
 level.normal=await emit(level.normal,resizeNormal(masterNormal,d),masterNormal);generated.push({tier,...d,assets:[level.baseColor,level.orm,level.normal].map(a=>({id:a.id,sha256:a.sha256,bytes:a.bytes}))});
}
const body=JSON.stringify(manifest,null,2)+'\n',name=`manifest-${hash(body).slice(0,16)}.json`;await immutable(root+'/'+name,body);await immutable(root+'/catalog.json',JSON.stringify({...catalog,releaseId:manifest.releaseId,manifestUrl:name,cities:Object.fromEntries(Object.entries(manifest.cities).map(([id,c])=>[id,{name:c.name,thumbnail:c.thumbnail.url}]))},null,2)+'\n');
const bootstrap=JSON.parse(await fs.readFile('public/api/v1/bootstrap.json'));Object.assign(bootstrap,{releaseId:manifest.releaseId,catalogUrl:'releases/v7-4/catalog.json',manifestUrl:'releases/v7-4/'+name});bootstrap.defaultDesign.resourceReleaseId=manifest.releaseId;await fs.writeFile('public/api/v1/bootstrap.json',JSON.stringify(bootstrap,null,2)+'\n');
const report={releaseId:manifest.releaseId,fixedMapping:manifest.fixedMapping,source:spec,counts,correctionSha256:hash(correction),normalCorrectionSha256:hash(normalCorrection),originalInputs:Object.fromEntries([['color',colorSource],['roughness',roughSource],['metalness',metalSource],['normal',normalSource]].map(([k,v])=>[k,hash(v)])),changedColorPixels,changedNormalPixels,generated,unmodified:['all city channels','all slogan masks','handle textures','saucer atlas','handle ribbon and attachment centers','lower porcelain collar geometry'],normalOrientation:'HFN1 RGBA16F bottom-up; runtime RG16F; mirrored tangent basis from transformed UV derivatives'};await fs.writeFile('evidence/v7.1.3/resource-build.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
