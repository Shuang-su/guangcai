import fs from 'node:fs/promises';import path from 'node:path';import {createHash} from 'node:crypto';import sharp from 'sharp';
import {cityThumbnail} from './city-thumbnail.mjs';
const prior='public/releases/v7-7',root='public/releases/v7-8',hash=b=>createHash('sha256').update(b).digest('hex');
const catalog=JSON.parse(await fs.readFile(prior+'/catalog.json')),old=JSON.parse(await fs.readFile(prior+'/'+catalog.manifestUrl)),m=structuredClone(old);
function rebase(v){if(v&&typeof v==='object'){if(v.url&&v.sha256)v.url=path.relative(root,path.resolve(prior,v.url)).split(path.sep).join('/');else Object.values(v).forEach(rebase);}}
rebase(m);m.releaseId='v7-8';await fs.mkdir(root+'/assets',{recursive:true});
for(const [id,c]of Object.entries(m.cities)){
 const mask=c.levels.standard.mask,bytes=await cityThumbnail(path.resolve(root,mask.url)),sha256=hash(bytes),url=`assets/${id}-thumbnail-${sha256.slice(0,16)}.webp`,info=await sharp(bytes).metadata(),decodedBytes=info.width*info.height*4;
 await fs.writeFile(root+'/'+url,bytes);
 c.thumbnail={...c.thumbnail,url,sha256,sourceSha256:mask.sourceSha256,width:info.width,height:info.height,bytes:bytes.length,decodedBytes,gpuBytes:Math.ceil(decodedBytes*4/3)};
}
const bytes=JSON.stringify(m,null,2)+'\n',manifestUrl='manifest-'+hash(bytes).slice(0,16)+'.json';await fs.writeFile(root+'/'+manifestUrl,bytes);
await fs.writeFile(root+'/catalog.json',JSON.stringify({...catalog,releaseId:m.releaseId,manifestUrl,cities:Object.fromEntries(Object.entries(m.cities).map(([id,c])=>[id,{name:c.name,thumbnail:c.thumbnail.url}]))},null,2)+'\n');
const boot=JSON.parse(await fs.readFile('public/api/v1/bootstrap.json'));Object.assign(boot,{releaseId:m.releaseId,catalogUrl:'releases/v7-8/catalog.json',manifestUrl:'releases/v7-8/'+manifestUrl});boot.defaultDesign.resourceReleaseId=m.releaseId;await fs.writeFile('public/api/v1/bootstrap.json',JSON.stringify(boot,null,2)+'\n');
console.log({releaseId:m.releaseId,manifestUrl,thumbnails:23,cityAndLabelMapsUnchanged:true});
