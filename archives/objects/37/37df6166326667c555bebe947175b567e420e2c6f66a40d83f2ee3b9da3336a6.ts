import test from 'node:test';
import assert from 'node:assert/strict';
import {fixedAtlasUV,validateFixedAtlas} from '../src/materials/fixed-atlas';
const atlas={rows:2,contentWidth:8128,contentHeight:512,gutter:32};
test('fixed atlas rejects mismatched dimensions, fractional rows and missing guards',()=>{
 validateFixedAtlas(atlas,8192,1152);
 for(const [a,w,h]of [[atlas,8192,1024],[{...atlas,rows:2.5},8192,1152],[{...atlas,gutter:0},8128,1024]] as const)assert.throws(()=>validateFixedAtlas(a,w,h));
});
test('periodic atlas coordinates preserve top/bottom orientation and protect both splits',()=>{
 for(const u of [-1.105,-.5,0,.25,.5,.999999,1,2.5])for(const v of [0,.5,1]){
  const a=fixedAtlasUV(u,v,atlas),b=fixedAtlasUV(u+1,v,atlas);assert.ok(a.every((n,i)=>Math.abs(n-b[i])<1e-10));assert.ok(a[0]>=32/8192&&a[0]<=(8192-32)/8192);assert.ok(a[1]>=32/1152&&a[1]<=1-32/1152);
 }
 assert.ok(fixedAtlasUV(.25,1,atlas)[1]>fixedAtlasUV(.25,0,atlas)[1]);
 assert.ok(fixedAtlasUV(.25,.5,atlas)[1]>fixedAtlasUV(.75,.5,atlas)[1],'first half is the upper row');
 for(const u of [0,.5,1]){const before=fixedAtlasUV(u-1e-9,.5,atlas),after=fixedAtlasUV(u+1e-9,.5,atlas);assert.ok(before[0]>.99&&after[0]<.01,'split samples stay inside duplicated guard pixels');}
});
