import test from 'node:test';
import assert from 'node:assert/strict';
import {Mesh, Vector3} from 'three';
import {defaults} from '../src/geometry/parameters';
import {handlePath,handleRails,handleCollar} from '../src/geometry/handle';
import {ribbon} from '../src/geometry/ribbon';
import {buildProduct} from '../src/geometry/product';
import {makeMaterials} from '../src/materials/materials';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

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

test('city artwork reaches the rounded exterior foot with a continuous upright second UV set',()=>{
  const product=buildProduct(makeMaterials());
  const mesh=product.cup.getObjectByName('cup-wall-and-recessed-foot') as Mesh;
  const g=mesh.geometry,idx=g.index!,pos=g.getAttribute('position'),uv=g.getAttribute('uv1');
  let minY=Infinity,maxY=-Infinity,minV=Infinity,maxV=-Infinity;
  for(const group of g.groups.filter(g=>g.materialIndex===3))for(let j=group.start;j<group.start+group.count;j++){
    const i=idx.getX(j),y=pos.getY(i),r=Math.hypot(pos.getX(i),pos.getZ(i));
    assert.ok(r>=defaults.radius-1.71,'city never enters underside or inner cavity');
    assert.ok(uv.getX(i)>=-1e-6&&uv.getX(i)<=1.000001,'city stays within blank 300 degree UV');
    minY=Math.min(minY,y);maxY=Math.max(maxY,y);minV=Math.min(minV,uv.getY(i));maxV=Math.max(maxV,uv.getY(i));
  }
  assert.ok(Math.abs(minY-.12)<1e-5,'no white pedestal below artwork');
  assert.ok(Math.abs(maxY-(defaults.height-2.3))<1e-4);
  assert.equal(minV,0);assert.equal(maxV,1);product.dispose();
});

test('fixed layout calibration preserves previous-release geometry and city coordinates exactly',()=>{
  const baseline=JSON.parse(readFileSync('docs/changes/20261013-fixed-layout/geometry-before.json','utf8'));
  const product=buildProduct(makeMaterials()),seen=new Set<string>();
  const hash=(a:Float32Array|Uint16Array|Uint32Array)=>createHash('sha256').update(Buffer.from(a.buffer,a.byteOffset,a.byteLength)).digest('hex');
  product.root.traverse(o=>{
    if(!(o instanceof Mesh))return;
    const key=o.name+(seen.has(o.name)?'_2':'');seen.add(key);
    const g=o.geometry;
    for(const name of ['position','normal','uv1'])if(baseline[key][name])assert.equal(hash(g.attributes[name].array as Float32Array),baseline[key][name],key+'.'+name);
    if(baseline[key].cityIndices){const group=g.groups.find(x=>x.materialIndex===3)!;assert.equal(hash(g.index!.array.slice(group.start,group.start+group.count) as Uint32Array),baseline[key].cityIndices);}
  });
  assert.equal(seen.size,Object.keys(baseline).length);product.dispose();
});

test('narrow floral coverage remains continuous and does not expose the handle roots',()=>{
  const product=buildProduct(makeMaterials());
  const g=(product.cup.getObjectByName('cup-wall-and-recessed-foot') as Mesh).geometry;
  const pos=g.attributes.position,idx=g.index!,group=g.groups.find(x=>x.materialIndex===1)!;
  const angles=[];
  for(let j=group.start;j<group.start+group.count;j++){const i=idx.getX(j);angles.push(Math.atan2(pos.getZ(i),pos.getX(i))*180/Math.PI);}
  assert.ok(Math.abs(Math.min(...angles)+30)<.001);assert.ok(Math.abs(Math.max(...angles)-18)<.001);
  // Both roots occupy less than +/-10 degrees around the handle axis.
  assert.ok(Math.min(...angles)<-10&&Math.max(...angles)>10);product.dispose();
});

test('balanced saucer UV closes without a new seam, folds or abrupt changes of motif scale',()=>{
  const product=buildProduct(makeMaterials());
  const g=(product.saucer.getObjectByName('saucer-bowl-and-continuous-rim') as Mesh).geometry,uv=g.attributes.uv;
  const rows=uv.count/321,steps=[];
  for(let i=0;i<320;i++){const d=uv.getX((i+1)*rows)-uv.getX(i*rows);assert.ok(d>.009&&d<.016,'positive and bounded UV density');steps.push(d);}
  assert.ok(Math.abs(uv.getX(320*rows)-uv.getX(0)-4)<1e-6,'exact four mirrored cycles');
  assert.ok(Math.abs(steps[0]-steps.at(-1)!)<1e-6,'matching slope at seam');
  for(let i=1;i<steps.length;i++)assert.ok(Math.abs(steps[i]-steps[i-1])<.0001);
  product.dispose();
});
