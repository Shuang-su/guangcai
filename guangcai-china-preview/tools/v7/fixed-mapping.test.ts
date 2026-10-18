import test from 'node:test';import assert from 'node:assert/strict';import {Mesh,Texture,Vector2} from 'three';
import {buildProduct} from '../../src/geometry/product';import {makeMaterials} from '../../src/materials/materials';import {StyleManager,type StylePack} from '../../src/styles/style-manager';

test('v4 extends only floral triangles to city bottom; geometry and old mapping round trip exactly',()=>{
 const product=buildProduct(makeMaterials()),mesh=product.cup.getObjectByName('cup-wall-and-recessed-foot') as Mesh,g=mesh.geometry,idx=g.index!,uv=g.getAttribute('uv2');
 const oldIndex=Array.from(idx.array),oldUV=Array.from(uv.array),oldGroups=structuredClone(g.groups),immutable=['position','normal','uv','uv1'].map(k=>Array.from(g.getAttribute(k).array));
 const minY=(material:number)=>Math.min(...g.groups.filter(g=>g.materialIndex===material).flatMap(group=>Array.from({length:group.count},(_,i)=>g.getAttribute('position').getY(idx.getX(group.start+i)))));
 assert.ok(Math.abs(minY(1)-2.8)<1e-5);assert.ok(Math.abs(minY(3)-.12)<1e-5);
 const collars=product.cup.children.filter(o=>o.name==='porcelain-handle-root') as Mesh[],collarData=collars.map(o=>[o.geometry.uuid,o.material]);assert.equal(collars.length,2);const collarBefore=collars.map(o=>Array.from(o.geometry.getAttribute('position').array));
 for(let i=0;i<5;i++){
  assert.equal(product.setFixedMapping('source-layout-v4'),true);assert.equal(product.setFixedMapping('source-layout-v4'),false);assert.equal(g.index,idx);
  assert.deepEqual(Array.from(collars[1].geometry.getAttribute('position').array),collarBefore[1]);
  const lower=collars[0].geometry.getAttribute('position');assert.ok(Math.min(...Array.from({length:lower.count},(_,i)=>lower.getY(i)))< -8.79);
  // At the exposed ring, the fillet lies below the upper-arm inner rail (u - 6.2).
  assert.ok(lower.getY(65+32)<-6.2-.8);
  assert.equal(minY(1),minY(3));assert.equal(idx.count,oldIndex.length);
  for(const group of g.groups.filter(g=>g.materialIndex===1))for(let at=group.start;at<group.start+group.count;at++){const id=idx.getX(at);assert.ok(Math.abs(uv.getY(id)-(g.getAttribute('position').getY(id)-.12)/(103-2.42))<1e-6);}
  assert.deepEqual(['position','normal','uv','uv1'].map(k=>Array.from(g.getAttribute(k).array)),immutable);
  product.setFixedMapping('source-layout-v3');assert.deepEqual(Array.from(idx.array),oldIndex);assert.deepEqual(Array.from(uv.array),oldUV);assert.deepEqual(g.groups,oldGroups);assert.deepEqual(collars.map(o=>Array.from(o.geometry.getAttribute('position').array)),collarBefore);
 }
 assert.deepEqual(collars.map(o=>[o.geometry.uuid,o.material]),collarData);product.dispose();
});
test('every PBR channel mirrors logical source U with offset before atlas; repeated fit is idempotent',async()=>{
 const materials=makeMaterials(),manager=new StyleManager(materials,4,()=>{});
 const maps=Object.fromEntries(['body','handle','saucer'].map(r=>[r,Object.fromEntries(['baseColor','normal','roughness','metalness'].map(c=>{const texture=new Texture({width:1024,height:1024});return[c,texture];}))]));
 // Exercise the same shared texture matrix path as loaded resources, without a GPU.
 Object.assign(manager,{currentMaps:maps,mapping:'source-layout-v4',offsets:{saucer:-.105}});
 for(let pass=0;pass<3;pass++)manager.fit({body:.4,handle:.1,saucer:16});
 for(const [region,channels]of Object.entries(maps))for(const t of Object.values(channels))for(const u of [0,.2,.8,1]){
  const point=new Vector2(u,.4).applyMatrix3(t.matrix);assert.ok(Math.abs(point.x-(1-(u+(region==='saucer'?-.105:0))))<1e-7);assert.equal(point.y,.4);
 }
 Object.assign(manager,{mapping:'source-layout-v3'});manager.fit({body:.4,handle:.1,saucer:16});assert.deepEqual(maps.body.normal.repeat.toArray(),[1,1]);assert.equal(maps.saucer.normal.offset.x,-.105);
});
