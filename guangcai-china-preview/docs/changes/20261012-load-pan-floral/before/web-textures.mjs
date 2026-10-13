import sharp from 'sharp';
import {mkdir,readFile,writeFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const channels=['baseColor','normal','roughness','metalness'];
const files=[...['body','handle','saucer'].flatMap(region=>channels.map(c=>`fixed/${region}-${c}`)),...channels.map(c=>`china/${c}`)];
const records=[];
for(const name of files){
 const original=`public/${name}.png`,dest=`public/web/${name}.webp`;
 await mkdir(dest.slice(0,dest.lastIndexOf('/')),{recursive:true});
 await sharp(original).webp({lossless:true,effort:6}).toFile(dest);
 const pixels=p=>sharp(p).toColourspace('srgb').ensureAlpha().raw().toBuffer();
 assert.ok((await pixels(original)).equals(await pixels(dest)),name+' exact decoded pixels');
 records.push({source:original,web:dest,sourceBytes:(await stat(original)).size,webBytes:(await stat(dest)).size,sha256:createHash('sha256').update(await readFile(dest)).digest('hex'),decodedPixelsIdentical:true});
}
const result={date:new Date().toISOString(),format:'lossless WebP, original PNG retained',sourceBytes:records.reduce((n,r)=>n+r.sourceBytes,0),webBytes:records.reduce((n,r)=>n+r.webBytes,0),records};
await writeFile('evidence/web-textures.json',JSON.stringify(result,null,2));console.log(JSON.stringify({files:records.length,sourceBytes:result.sourceBytes,webBytes:result.webBytes,decodedPixelsIdentical:true}));
