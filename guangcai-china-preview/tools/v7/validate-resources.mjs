import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const bootstrap=JSON.parse(await fs.readFile('public/api/v1/bootstrap.json')),m=JSON.parse(await fs.readFile('public/'+bootstrap.manifestUrl)),base='public/'+bootstrap.manifestUrl.slice(0,bootstrap.manifestUrl.lastIndexOf('/')+1);
const hash=b=>createHash('sha256').update(b).digest('hex');
const assets=[...Object.values(m.fixed).flatMap(t=>Object.values(t).flatMap(l=>[l.baseColor,l.normal,l.orm])),...Object.values(m.cities).flatMap(c=>[c.thumbnail,...Object.values(c.levels).flatMap(l=>[l.mask,l.normal])]),...Object.values(m.slogans).map(l=>l.asset),...Object.values(m.cities).flatMap(c=>Object.values(c.slogans??{}).map(l=>l.asset)),m.mark];
for(const a of assets){const bytes=await fs.readFile(base+a.url);assert.equal(bytes.length,a.bytes);assert.equal(hash(bytes),a.sha256);if(a.encoding==='webp'){const info=await sharp(bytes).metadata();assert.deepEqual([info.width,info.height],[a.width,a.height]);}else{const data=gunzipSync(bytes);assert.equal(data.length,16+a.decodedBytes);assert.equal(data.toString('ascii',0,4),'HFN1');assert.deepEqual([data.readUInt32LE(4),data.readUInt32LE(8)],[a.width,a.height]);if(data.readUInt32LE(12)===2){const n=a.width*a.height;for(let k=0;k<4;k++)for(let i=0;i<n;i++)assert.ok((data[16+k*2*n+i]|data[16+(k*2+1)*n+i]<<8)<=0x3c00,'finite byte-plane normal');}else{assert.equal(data.readUInt32LE(12),1);for(let i=16;i<data.length;i+=2)assert.ok(data.readUInt16LE(i)<=0x3c00,'finite normal');}}}
for(const [region,levels]of Object.entries(m.fixed))for(const [tier,l]of Object.entries(levels)){
 assert.deepEqual([l.baseColor.width,l.baseColor.height],[l.normal.width,l.normal.height]);assert.deepEqual([l.baseColor.width,l.baseColor.height],[l.orm.width,l.orm.height]);
 if(l.atlas){const a=l.atlas;assert.equal(l.baseColor.width,a.contentWidth+2*a.gutter);assert.equal(l.baseColor.height,a.rows*(a.contentHeight+2*a.gutter));assert.ok(a.gutter>=8);
 const {data,info}=await sharp(base+l.orm.url).raw().toBuffer({resolveWithObject:true});for(let row=0;row<a.rows;row++)for(let y=a.gutter;y<a.contentHeight+a.gutter;y+=7){for(const x of [0,a.gutter-1])for(let k=0;k<3;k++)assert.equal(data[((row*(a.contentHeight+2*a.gutter)+y)*info.width+x)*info.channels+k],data[((row*(a.contentHeight+2*a.gutter)+y)*info.width+a.gutter)*info.channels+k]);}}
}
for(const [id,s]of Object.entries(m.slogans)){
 let original;
 if(m.releaseId==='v7-7'){
  const source=await fs.readFile(`assets/masters/v7.1.5/slogan-${id}.svg`,'utf8'),scale=4096/1939,x=1539*scale,y=1783-815*scale+190*scale;
  original=await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="4096" height="1783"><g transform="translate(${x} ${y}) scale(${scale})">${source}</g></svg>`)).ensureAlpha().extractChannel('alpha').raw().toBuffer({resolveWithObject:true});
 }else if(m.releaseId==='v7-6'){
  const source=await fs.readFile(`assets/masters/v7.1.5/slogan-${id}.svg`,'utf8'),scale=4096*.82/1939,x=4096*.047+1539*scale,y=1783-815*scale+190*scale;
  original=await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="4096" height="1783"><g transform="translate(${x} ${y}) scale(${scale})">${source}</g></svg>`)).ensureAlpha().extractChannel('alpha').raw().toBuffer({resolveWithObject:true});
 }else if(['v7-3','v7-4','v7-5'].includes(m.releaseId)){
  const master=await fs.readFile(`assets/masters/v7.1.2/slogan-${id}.svg`,'utf8'),content=master.replace(/^<svg[^>]*>/,'').replace(/<\/svg>\s*$/,'');
  const scale=1783*.52/694,x=4096*.81-209*scale/2,y=1783*.09;
  original=await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="4096" height="1783"><g transform="translate(${x} ${y}) scale(${scale})">${content}</g></svg>`)).ensureAlpha().extractChannel('alpha').raw().toBuffer({resolveWithObject:true});
 }else original=await sharp(`public/cities/v6/slogan-${id}.webp`).removeAlpha().raw().toBuffer({resolveWithObject:true});
 const crop=await sharp(base+s.asset.url).removeAlpha().raw().toBuffer({resolveWithObject:true});
 const [u,v,w,h]=s.uvRect,left=Math.round(u*4096),top=Math.round((1-v-h)*1783);
 for(let y=0;y<crop.info.height;y++)for(let x=0;x<crop.info.width;x++)assert.equal(crop.data[(y*crop.info.width+x)*crop.info.channels],original.data[((y+top)*4096+x+left)*original.info.channels],id+' glyph mismatch');
 assert.equal(Math.round(w*4096),crop.info.width);assert.equal(Math.round(h*1783),crop.info.height);
}
const fixed=Object.values(m.fixed).flatMap(l=>[l.light.baseColor,l.light.normal,l.light.orm]);
const initial=[...fixed,m.mark,m.cities.shenzhen.levels.light.mask,m.cities.shenzhen.levels.light.normal,...Object.values(m.slogans).map(s=>s.asset)];
const preload=[...fixed,m.mark,...Object.values(m.cities).flatMap(c=>[c.thumbnail,c.levels.light.mask,c.levels.light.normal]),...Object.values(m.slogans).map(s=>s.asset),...['shenzhen','shenyang','shijiazhuang'].flatMap(id=>Object.values(m.cities[id].levels.standard))];
assert.ok(initial.reduce((n,a)=>n+a.gpuBytes,0)<64*1024**2);assert.ok(preload.reduce((n,a)=>n+a.bytes,0)<16*1024**2);
assert.equal(Object.keys(m.cities).length,23);assert.equal(Object.keys(m.slogans).length,6);
console.log(JSON.stringify({passed:true,assets:assets.length,labelsPixelIdentical:6,cities:23,preloadEncodedBytes:preload.reduce((n,a)=>n+a.bytes,0),initialGpuBytes:initial.reduce((n,a)=>n+a.gpuBytes,0),original5MiBTargetMet:preload.reduce((n,a)=>n+a.bytes,0)<5*1024**2}));
