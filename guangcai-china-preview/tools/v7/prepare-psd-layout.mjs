// One source-frame transform for city art and lettering. Original exports stay immutable.
import fs from 'node:fs/promises';import path from 'node:path';import sharp from 'sharp';import {createHash} from 'node:crypto';import assert from 'node:assert/strict';
const out='.codex-work/cache/v7.1.7',master='assets/masters/v7.1.7',hash=b=>createHash('sha256').update(b).digest('hex');
await fs.mkdir(out,{recursive:true});await fs.mkdir(master,{recursive:true});
const psd=await fs.readFile('assets/source/china-lines.psd');assert.equal(hash(psd),'837d6408195762eacaaf13edeb8fbafa35c610928c0889ee31c844f316f9eda9');
assert.equal(psd.readUInt32BE(14),4961);assert.equal(psd.readUInt32BE(18),7016);
const source=[1939,815],psdFrame=[5433,2365],runtime=[4096,1783],scale=runtime[0]/source[0];
const mapping={version:'7.1.7',sourceCanvas:source,psdDocument:[7016,4961],psdBounds:[777,2243,6210,4608],psdFrame,psdSha256:hash(psd),runtime,policy:'contain-width-bottom; preserve complete source; no nonuniform stretch or per-city registration',scale,offset:[0,runtime[1]-source[1]*scale],widthCoverage:1,topGapFraction:(runtime[1]-source[1]*scale)/runtime[1]};
await fs.writeFile(master+'/mapping.json',JSON.stringify(mapping,null,2)+'\n');
const layout=JSON.parse(await fs.readFile('assets/masters/v7.1.5/layout.json')),rows=[];
// Extract the city image/pattern and retain its exact local transform and clipping.
// Python's XML parser writes these clean sources from the preserved UI exports.
for(const c of layout.cities){const file='mastergo-'+c.id+'.png',svg=await fs.readFile(out+'/'+c.id+'.svg'),bytes=await sharp(svg).resize(3878,1630).png().toBuffer();await fs.writeFile(out+'/'+file,bytes);rows.push({id:c.id,name:c.name,file,sha256:hash(bytes),svgSha256:c.sha256,sourceRect:c.cityImageRect});}
for(const [cityId,name]of [['shenzhen','深圳'],['beijing','北京']]){const svg=await fs.readFile(`public/bezier-lab/${name}-独立闭合.svg`),bytes=await sharp(svg).resize(3878,1630).png().toBuffer(),file='bezier-'+cityId+'.png';await fs.writeFile(out+'/'+file,bytes);rows.push({id:'bezier-'+cityId,cityId,name,file,sha256:hash(bytes),svgSha256:hash(svg),experimental:true});}
await fs.writeFile(out+'/inputs.json',JSON.stringify(rows,null,2)+'\n');console.log({sources:rows.length,mapping});
