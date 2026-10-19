import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import path from 'node:path';import sharp from 'sharp';
async function manifest(id:string){const root='public/releases/'+id,c=JSON.parse(await fs.readFile(root+'/catalog.json','utf8'));return {root,data:JSON.parse(await fs.readFile(root+'/'+c.manifestUrl,'utf8'))};}

test('pixel-only export changes keep reviewed Jingdezhen and Zhengzhou contours and fill',async()=>{
 const old=await manifest('v7-4'),current=await manifest('v7-5');
 for(const id of ['jingdezhen','zhengzhou'])for(const tier of ['light','standard','detail']){
  const decode=async(root:string,a:{url:string})=>sharp(path.join(root,a.url)).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const a=await decode(old.root,old.data.cities[id].levels[tier].mask),b=await decode(current.root,current.data.cities[id].levels[tier].mask);assert.deepEqual(a.info,b.info);
  const {width:w,height:h,channels:c}=a.info;let bottom=0;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(a.data[(y*w+x)*c]>127)bottom=y+1;
  const dy=h-bottom;assert(dy>=0&&dy<=4);
  assert.deepEqual(b.data.subarray(dy*w*c),a.data.subarray(0,(h-dy)*w*c),id+'/'+tier+' changed reviewed geometry');
 }
});

test('new Xi’an keeps approved pagoda faces and wall fill without altering lines or normals',async()=>{
 const current=await manifest('v7-5'),prior=JSON.parse(await fs.readFile(current.root+'/manifest-845ec68dc9975e86.json','utf8'));
 const config=JSON.parse(await fs.readFile('assets/masters/v7.1.4/fill-preservation.json','utf8')).xian;
 const [sx,, ,sy,dx,dy]=config.matrix,scale=4096*.82/3878,offsetX=4096*.047,offsetY=1783-1630*scale;
 let changed=0;
 for(const tier of ['light','standard','detail']){
  const a=prior.cities.xian.levels[tier],b=current.data.cities.xian.levels[tier];assert.equal(a.normal.sha256,b.normal.sha256,'normal changed during fill repair');
  const old=await sharp(path.join(current.root,a.mask.url)).removeAlpha().raw().toBuffer({resolveWithObject:true}),newer=await sharp(path.join(current.root,b.mask.url)).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const {width:w,height:h,channels:c}=newer.info;
  for(let i=0;i<w*h;i++){assert.equal(old.data[i*c],newer.data[i*c],'outline changed during fill repair');assert(newer.data[i*c+1]>=old.data[i*c+1]);if(newer.data[i*c+1]!==old.data[i*c+1])changed++;}
  for(const [x,y]of [[900,1220],[880,1330],[2365,1510]]){
   const xx=Math.floor(((x*sx+dx)*scale+offsetX)*w/4096),yy=Math.floor(((y*sy+dy)*scale+offsetY)*h/1783);
   assert(newer.data[(yy*w+xx)*c+1]>240,'approved facade probe unfilled: '+tier+'/'+x+'/'+y);
  }
 }
 assert(changed>1000);
});
