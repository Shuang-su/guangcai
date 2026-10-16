import {test} from 'node:test';
import assert from 'node:assert/strict';
import {MeshPhysicalMaterial,ShaderLib,PerspectiveCamera,Vector3} from 'three';
import {createAuthoringFraming} from '../src/interaction/authoring-framing';
import {colorAtPosition,colorPosition,normalizePosition} from '../src/styles/xy-mapping';
import {materialAt,normalizeAppearance,presetAppearance,GOLD_LINE,hslRgb} from '../src/styles/city-appearance';
import {normalizeSelection,selectTheme,defaultSelection} from '../src/styles/city-selection';
import {installCityParameters} from '../src/materials/city-parametric';

const near=(a:number,b:number)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
test('authoring framing keeps the full canvas and restores the camera projection without accumulation',()=>{
 for(const [width,height] of [[390,844],[600,900],[1200,900],[844,390]]){
  const camera=new PerspectiveCamera(33,width/height,.5,2500),original=camera.projectionMatrix.clone(),position=camera.position.clone();
  const canvas={clientWidth:width,clientHeight:height,closest:()=>({classList:{contains:()=>true}})} as unknown as HTMLCanvasElement;
  const framing=createAuthoringFraming(camera,canvas);
  for(let frame=0;frame<10;frame++){
   framing.apply();const centre=new Vector3(0,0,-10).applyMatrix4(camera.projectionMatrix);
   near(centre.x,width<=700&&height>520?0:-(height<=520?310:340)/width);near(centre.y,width<=700&&height>520?.48:0);
   framing.restore();assert.deepEqual(camera.projectionMatrix.elements,original.elements);assert.deepEqual(camera.position,position);
  }
 }
});
test('cached colour field lightness compositing matches direct HSL at both endpoints and in between',()=>{
 for(const h of [0,37,120,237,300,359.9])for(const s of [0,20,63,100])for(const l of [0,1,25,49,50,51,78,99,100]){
  const base=hslRgb(h,s,50),direct=hslRgb(h,s,l),amount=l/100;
  const composed=base.map(v=>amount<.5?v*2*amount:v*2*(1-amount)+(2*amount-1));
  composed.forEach((v,i)=>near(v,direct[i]));
 }
});
test('square colour mapping reaches all edges and round-trips hue and saturation',()=>{
 for(let h=0;h<=360;h+=5)for(const s of [0,1,25,50,99,100]){
  const p=colorPosition(h,s),c=colorAtPosition(p,h);
  near(c.hue,h%360);near(c.saturation,s);
  assert.ok(p.x>=0&&p.x<=1&&p.y>=0&&p.y<=1);
 }
 for(const p of [{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1},{x:.5,y:1},{x:1,y:.5}]){
  const c=colorAtPosition(p,123),q=colorPosition(c.hue,c.saturation);
  near(c.saturation,100);near(p.x,q.x);near(p.y,q.y);
 }
 assert.deepEqual(colorAtPosition({x:.5,y:1},17),{hue:0,saturation:100});
 assert.deepEqual(colorAtPosition({x:.5,y:.5},237),{hue:237,saturation:0});
 near(colorPosition(359.999,100).x,colorPosition(-.001,100).x);
 assert.deepEqual(normalizePosition({x:-5,y:7}),{x:0,y:1});
 for(const n of [NaN,Infinity,-Infinity]){
  assert.throws(()=>normalizePosition({x:n,y:0}));assert.throws(()=>colorPosition(n,50));
 }
});

test('material plane preserves the full legacy column and varies in both directions',()=>{
 for(let i=0;i<=100;i++){
  const t=i/100,old={metalness:t,roughness:.31+(72/255-.31)*t,clearcoat:191/255+(26/255-191/255)*t};
  assert.deepEqual(materialAt(t),old);assert.deepEqual(materialAt(t,.5),old);
  const l=materialAt(t,.5-1e-9),r=materialAt(t,.5+1e-9);
  assert.ok(Math.abs(l.roughness-r.roughness)<1e-8&&Math.abs(l.clearcoat-r.clearcoat)<1e-8);
 }
 const nine=new Set<string>();
 for(const t of [0,.5,1])for(const x of [0,.5,1]){
  const m=materialAt(t,x);nine.add(JSON.stringify(m));near(m.metalness,t);
  assert.ok(m.roughness>=.079999&&m.roughness<=.750001&&m.clearcoat>=0&&m.clearcoat<=1);
 }
 assert.equal(nine.size,9);near(materialAt(.4,0).roughness,.75);near(materialAt(.4,1).roughness,.08);
 assert.deepEqual(materialAt(-2,-2),materialAt(0,0));assert.deepEqual(materialAt(2,2),materialAt(1,1));
 for(const n of [NaN,Infinity,-Infinity])assert.throws(()=>materialAt(.5,n));
});

test('legacy input, presets and cross-city updates preserve a single material state',()=>{
 const legacy={preset:'red' as const,hue:15,saturation:50,lightness:30,material:.37,relief:1.6};
 assert.equal(normalizeAppearance(legacy).materialX,.5);
 assert.throws(()=>normalizeAppearance({...legacy,materialX:NaN}));
 assert.equal(normalizeAppearance({...legacy,materialX:20}).materialX,1);
 const appearance={...legacy,materialX:.83};
 const s=normalizeSelection(defaultSelection,{variant:'beijing-red',appearance});
 assert.deepEqual(selectTheme(s,'shenzhen').appearance,appearance);
 for(const finish of ['enamel','metal','paint'] as const){
  const a=normalizeSelection(s,{finish}).appearance!;
  assert.equal(a.materialX,.5);assert.equal(a.material,finish==='metal'?1:0);assert.equal(a.relief,1.6);
 }
 assert.deepEqual(normalizeSelection(s,{variant:'beijing-green'}).appearance,presetAppearance('green'));
});

test('uniform-only material edits preserve program, normals and legacy lettering inputs',()=>{
 const material=new MeshPhysicalMaterial(),parameters=installCityParameters(material);
 const shader={fragmentShader:ShaderLib.physical.fragmentShader,vertexShader:ShaderLib.physical.vertexShader,uniforms:{}};
 material.onBeforeCompile(shader as never,null as never);
 const u=shader.uniforms as Record<string,{value:unknown}>,version=material.version,key=material.customProgramCacheKey();
 const a={...presetAppearance('red'),material:.37,relief:1.6};
 parameters.update(a,true);const normal=material.normalScale.clone(),coatNormal=material.clearcoatNormalScale.clone();
 for(const x of [0,.5,1]){
  parameters.update({...a,materialX:x},true);const expected=materialAt(.37,x);
  near(u.v5Blend.value as number,.37);near(u.v5FillRoughness.value as number,expected.roughness);near(u.v5FillClearcoat.value as number,expected.clearcoat);
  assert.deepEqual(parameters.debug().fill,expected);assert.deepEqual(parameters.debug().line,GOLD_LINE);
  assert.ok(material.normalScale.equals(normal)&&material.clearcoatNormalScale.equals(coatNormal));
  assert.equal(material.version,version);assert.equal(material.customProgramCacheKey(),key);
 }
 assert.match(shader.fragmentShader,/\(cityCoverage-cityLine\)\*v5FillRoughness/);
 assert.match(shader.fragmentShader,/\(cityCoverage-cityLine\)\*v5FillClearcoat/);
 assert.match(shader.fragmentShader,/mix\(191\.0\/255\.0,26\.0\/255\.0,v5Blend\),cityLabel/);
 material.dispose();
});
