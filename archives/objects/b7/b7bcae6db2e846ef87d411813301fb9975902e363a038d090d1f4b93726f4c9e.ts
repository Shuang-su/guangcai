import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {DataUtils,HalfFloatType} from 'three';
import sharp from 'sharp';
import {decodeFloatNormal} from '../src/styles/float-normal';

const buffer=(b:Buffer)=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength) as ArrayBuffer;
test('half-float normal decoder rejects corrupt headers, dimensions, and non-finite values',()=>{
  const b=Buffer.alloc(24);b.write('HFN1');b.writeUInt32LE(1,4);b.writeUInt32LE(1,8);b.writeUInt32LE(1,12);
  assert.throws(()=>decodeFloatNormal(new ArrayBuffer(3)));
  for(const [offset,value]of [[0,0],[4,9000],[12,2]]){const bad=Buffer.from(b);bad.writeUInt32LE(value,offset);assert.throws(()=>decodeFloatNormal(buffer(bad)));}
  b.writeUInt16LE(0x7c00,16);assert.throws(()=>decodeFloatNormal(buffer(b)));
});
for(const region of ['body','handle','saucer'])test(`${region} normal retains half precision and matches source orientation`,async()=>{
  const raw=gunzipSync(readFileSync(`public/fixed/${region}-normal.hfn.gz`));
  const t=decodeFloatNormal(buffer(raw));assert.equal(t.type,HalfFloatType);assert.equal(t.flipY,false);assert.equal(t.generateMipmaps,true);
  const {data,info}=await sharp(`public/fixed/${region}-normal.png`).removeAlpha().raw().toBuffer({resolveWithObject:true});
  assert.deepEqual([t.image.width,t.image.height],[info.width,info.height]);
  let max=0,fractional=0;
  for(let y=0;y<info.height;y+=31)for(let x=0;x<info.width;x+=17)for(let k=0;k<3;k++){
    const f=DataUtils.fromHalfFloat(t.image.data[((info.height-1-y)*info.width+x)*4+k]);
    max=Math.max(max,Math.abs(f-data[(y*info.width+x)*3+k]/255));
    if(Math.abs(f*255-Math.round(f*255))>.01)fractional++;
  }
  assert.ok(max<.0023,`normal direction differs from source: ${max}`);assert.ok(fractional>100,'data was quantized through an 8-bit path');
  assert.equal((await sharp(`public/fixed/${region}-height.png`).metadata()).depth,'ushort');t.dispose();
});
