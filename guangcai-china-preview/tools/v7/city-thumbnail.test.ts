import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import path from 'node:path';import sharp from 'sharp';
import {cityThumbnail} from './city-thumbnail.mjs';
test('thumbnail keeps linework at all four source edges and uses gold on transparent sky',async()=>{
 const width=2048,height=892,data=Buffer.alloc(width*height*3);
 for(const [x,y]of [[20,20],[2000,20],[20,850],[2000,850]])for(let j=0;j<20;j++)for(let i=0;i<20;i++)data[((y+j)*width+x+i)*3]=255;
 const input=await sharp(data,{raw:{width,height,channels:3}}).png().toBuffer(),{data:out,info}=await sharp(await cityThumbnail(input)).raw().toBuffer({resolveWithObject:true});
 assert.deepEqual([info.width,info.height,info.channels],[560,244,4]);
 const quadrants=new Set();for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++){const i=(y*info.width+x)*4;if(out[i+3]>200){quadrants.add(`${x>280},${y>122}`);assert.deepEqual([...out.subarray(i,i+3)],[191,141,48]);}}
 assert.equal(quadrants.size,4);assert.equal(out[(122*560+280)*4+3],0);
});
test('all 23 published thumbnails retain the entire source R channel; cup maps and label placements are unchanged',async()=>{
 const read=async(root:string)=>{const c=JSON.parse(await fs.readFile(root+'/catalog.json','utf8'));return JSON.parse(await fs.readFile(root+'/'+c.manifestUrl,'utf8'));};
 const root='public/releases/v7-8',prior='public/releases/v7-7',m=await read(root),old=await read(prior);
 const normalize=(v:any,base:string):any=>v&&typeof v==='object'?v.url&&v.sha256?{...v,url:path.resolve(base,v.url)}:Object.fromEntries(Object.entries(v).map(([k,x])=>[k,normalize(x,base)])):v;
 assert.equal(Object.keys(m.cities).length,23);assert.deepEqual(m.artworkMapping,old.artworkMapping);
 for(const k of ['fixed','slogans','mark'])assert.deepEqual(normalize(m[k],root),normalize(old[k],prior));
 for(const [id,c]of Object.entries<any>(m.cities)){
  assert.deepEqual(normalize(c.levels,root),normalize(old.cities[id].levels,prior),id);
  assert.deepEqual(normalize(c.slogans,root),normalize(old.cities[id].slogans,prior),id);
  const expected=await sharp(path.resolve(root,c.levels.standard.mask.url)).extractChannel(0).resize(560,244,{fit:'inside'}).raw().toBuffer(),actual=await sharp(root+'/'+c.thumbnail.url).extractChannel('alpha').raw().toBuffer();
  assert.ok(actual.equals(expected),id+' entire resized source R channel is pixel-identical');
 }
});
