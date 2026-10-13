import sharp from 'sharp';
import {mkdir,readFile,writeFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const channels=['baseColor','normal','roughness','metalness'];
const files=[...['body','handle','saucer'].flatMap(region=>channels.map(c=>`fixed/${region}-${c}`)),...channels.map(c=>`china/${c}`)];
const records=[],runtime={};
await mkdir('public/textures',{recursive:true});
for(const name of files){
 if(name.startsWith('fixed/')&&name.endsWith('-normal')){
  const original=`public/${name}.hfn.gz`,encoded=await readFile(original),sha256=createHash('sha256').update(encoded).digest('hex');
  const dest=`public/textures/${name.replaceAll('/','-')}-${sha256.slice(0,16)}.hfn.gz`;
  await writeFile(dest,encoded);runtime[name]=dest.slice(7);
  const sourceMeta=await sharp(`public/${name}.png`).metadata();
  records.push({source:original,web:dest,sourceBytes:encoded.length,webBytes:encoded.length,sha256,size:[sourceMeta.width,sourceMeta.height],encoding:'lossless gzip RGBA16F tangent normals',decodedPixelsIdentical:true,rmse:0,maxDelta:0,psnr:null});continue;
 }
 const original=`public/${name}.png`,color=name.startsWith('fixed/')&&name.endsWith('-baseColor');
 // Retain the useful native density of all three original floral regions.
 const width=undefined; // Original v3 crops are already at useful native density.
 const resized=await sharp(original).resize({width}).png().toBuffer();
 const encoded=await sharp(resized).webp({lossless:true,effort:6}).toBuffer();
 const sha256=createHash('sha256').update(encoded).digest('hex');
 const dest=`public/textures/${name.replaceAll('/','-')}-${sha256.slice(0,16)}.webp`;
 await writeFile(dest,encoded);runtime[name]=dest.slice(7);
 const pixels=p=>sharp(p).toColourspace('srgb').ensureAlpha().raw().toBuffer();
 const a=await pixels(resized),b=await pixels(encoded);const identical=a.equals(b);
 const meta=await sharp(encoded).metadata();const sourceMeta=await sharp(resized).metadata();
 assert.deepEqual([meta.width,meta.height],[sourceMeta.width,sourceMeta.height],name+' dimensions');
 assert.ok(identical,name+' exact decoded pixels');
 let squared=0,maxDelta=0;for(let i=0;i<a.length;i++){const d=Math.abs(a[i]-b[i]);squared+=d*d;maxDelta=Math.max(maxDelta,d);}
 const rmse=Math.sqrt(squared/a.length);
 records.push({source:original,web:dest,sourceBytes:(await stat(original)).size,webBytes:encoded.length,sha256,size:[meta.width,meta.height],encoding:'lossless WebP',decodedPixelsIdentical:identical,rmse,maxDelta,psnr:rmse?20*Math.log10(255/rmse):null});
}
const result={date:new Date().toISOString(),format:'High precision fixed decals: lossless color/data WebP, gzip RGBA16F normals, float-height derivatives. City channels unchanged. Original PNG and 16-bit height masters retained.',sourceBytes:records.reduce((n,r)=>n+r.sourceBytes,0),webBytes:records.reduce((n,r)=>n+r.webBytes,0),records};
await writeFile('src/styles/web-textures.json',JSON.stringify(runtime,null,2)+'\n');
await writeFile('evidence/web-textures.json',JSON.stringify(result,null,2));console.log(JSON.stringify({files:records.length,sourceBytes:result.sourceBytes,webBytes:result.webBytes,fullResolutionCityAndSaucer:true,losslessDataChannels:records.filter(r=>r.decodedPixelsIdentical).length}));
