import test from 'node:test';
import assert from 'node:assert/strict';
import {Mesh, Vector3} from 'three';
import {defaults} from '../src/geometry/parameters';
import {handlePath,handleRails,handleCollar} from '../src/geometry/handle';
import {ribbon} from '../src/geometry/ribbon';
import {buildProduct} from '../src/geometry/product';
import {makeMaterials} from '../src/materials/materials';

test('handle and porcelain collars stay outside the cavity across all UI dimension extremes',()=>{
  let clearance=Infinity;
  for(const radius of [35,43,55])for(const height of [90,103,150])for(const wall of [1.5,2.2,4])for(const handleReach of [25,35,45]){
    const p={...defaults,radius,height,wall,handleReach};
    for(const g of [ribbon(handlePath(p).path,p.handleWidth,p.handleThickness,192,true,handleRails(p)),handleCollar(radius,p.handleWidth,p.handleThickness,2.5)]){
      const pos=g.getAttribute('position');
      for(let i=0;i<pos.count;i++)clearance=Math.min(clearance,Math.hypot(pos.getX(i),pos.getZ(i))-(radius-wall));
      g.dispose();
    }
  }
  assert.ok(clearance>.5,`minimum cavity clearance ${clearance}`);
  console.log('minimum radial cavity clearance, mm:',clearance);
});
test('handle artwork uses uniform physical scale through the upper corner and lower curve',()=>{
  const g=ribbon(handlePath(defaults).path,defaults.handleWidth,defaults.handleThickness,192,true,handleRails(defaults));
  const pos=g.getAttribute('position'),uv=g.getAttribute('uv'),{width,length}=g.userData.surfaceMetrics;
  const a=new Vector3(),b=new Vector3();let maxError=0;
  for(let i=0;i<192;i++){
    const first=i*81+74,next=(i+1)*81+74;
    const actual=a.fromBufferAttribute(pos,first).distanceTo(b.fromBufferAttribute(pos,next));
    const mapped=Math.abs(uv.getY(next)-uv.getY(first))*length;
    maxError=Math.max(maxError,Math.abs(actual/mapped-1));
    const across=a.fromBufferAttribute(pos,first).distanceTo(b.fromBufferAttribute(pos,first+1));
    assert.ok(Math.abs(across/(Math.abs(uv.getX(first+1)-uv.getX(first))*width)-1)<.01);
  }
  assert.ok(maxError<.015,`outer rail stretch error ${maxError}`);g.dispose();
  console.log('max handle UV longitudinal scale error:',maxError);
});
test('all rendered triangles face the same side as their vertex normals; no invalid attributes',()=>{
  const product=buildProduct(makeMaterials());let count=0;
  product.root.traverse(o=>{
    if(!(o instanceof Mesh))return;
    const g=o.geometry,p=g.getAttribute('position'),n=g.getAttribute('normal'),idx=g.index!;
    for(const attr of Object.values(g.attributes))for(const x of attr.array)assert.ok(Number.isFinite(x),o.name);
    const a=new Vector3(),b=new Vector3(),c=new Vector3(),normal=new Vector3(),sum=new Vector3();
    for(let i=0;i<idx.count;i+=3){
      const ia=idx.getX(i),ib=idx.getX(i+1),ic=idx.getX(i+2);
      a.fromBufferAttribute(p,ia);b.fromBufferAttribute(p,ib);c.fromBufferAttribute(p,ic);
      normal.subVectors(b,a).cross(c.sub(a));if(normal.lengthSq()<1e-14)continue;
      sum.fromBufferAttribute(n,ia).add(new Vector3().fromBufferAttribute(n,ib)).add(new Vector3().fromBufferAttribute(n,ic));
      assert.ok(normal.dot(sum)>-1e-7,`${o.name}: triangle ${i/3} faces inward`);count++;
    }
  });product.dispose();console.log('triangles checked:',count);
});
test('reference-derived assembly retains inset saucer foot, recessed cup base and lid flange',()=>{
  const product=buildProduct(makeMaterials());
  const saucer=(product.saucer.children[0] as Mesh).geometry.getAttribute('position');
  let minFoot=Infinity,maxFoot=0;
  for(let i=0;i<saucer.count;i++)if(saucer.getY(i)<.05){const r=Math.hypot(saucer.getX(i),saucer.getZ(i));minFoot=Math.min(minFoot,r);maxFoot=Math.max(maxFoot,r);}
  assert.ok(minFoot/defaults.saucerRadius>.80);assert.ok(maxFoot/defaults.saucerRadius<.85);
  const body=(product.cup.children[0] as Mesh).geometry.getAttribute('position');
  assert.ok(body.getY(0)>2);assert.ok((product.lid.children[0] as Mesh).geometry.boundingBox!.min.y<-3);
  assert.ok(Math.abs(defaults.saucerRadius*2-151)<.001);
  product.dispose();
});
test('invalid parameters reject before creating a replacement model',()=>{
  for(const p of [{radius:NaN},{wall:25},{height:0},{saucerRadius:40}])assert.throws(()=>buildProduct(makeMaterials(),{...defaults,...p}));
});

test('bottom marks face outward, sit below the recessed base and share physical scale',()=>{
  const product=buildProduct(makeMaterials());
  const normals=[];
  for(const [part,name,recess] of [[product.cup,'cup-bottom-mark',2.5-defaults.height/2],[product.saucer,'saucer-bottom-mark',2.25]] as const){
    const mark=part.getObjectByName(name) as Mesh;
    assert.ok(mark.position.y<recess&&recess-mark.position.y<.02);
    normals.push(new Vector3(0,0,1).applyQuaternion(mark.quaternion));
    mark.geometry.computeBoundingBox();assert.equal(mark.geometry.boundingBox!.max.x-mark.geometry.boundingBox!.min.x,20);
  }
  assert.ok(normals.every(n=>n.y<-.999));product.dispose();
});
