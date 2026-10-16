import {test} from 'node:test';
import assert from 'node:assert/strict';
import {v6Themes,v6DefaultSelection,selectTheme,normalizeSelection,artworkPack,SelectionController} from '../src/styles/city-selection';
import {slogans} from '../src/styles/slogans';
import {presetAppearance} from '../src/styles/city-appearance';
import {MeshPhysicalMaterial,ShaderLib,Texture} from 'three';
import {installCityParameters} from '../src/materials/city-parametric';
test('all 23 V6 cities share six independent gold labels, without duplicated city channels',()=>{
 assert.equal(Object.keys(v6Themes).length,23);assert.equal(new Set(Object.values(v6Themes).map(x=>x.name)).size,23);
 const gold:any={};const labels=new Set();
 for(const theme of Object.keys(v6Themes) as (keyof typeof v6Themes)[]){
  const state=selectTheme(v6DefaultSelection,theme);const maps=new Set();
  for(const text of Object.keys(slogans) as (keyof typeof slogans)[]){const p=artworkPack(normalizeSelection(state,{text}),gold);labels.add(p.label?.source);maps.add(p.normal);assert.equal(p.version,6);assert.equal(p.label?.fixedGold,true);assert.equal(p.placement,undefined);}
  assert.equal(maps.size,1);
 }assert.equal(labels.size,6);
});
test('consumer restore returns Shenzhen, gold and open while city switches keep creation',async()=>{
 const c=new SelectionController(async()=>true,()=>{},v6DefaultSelection);
 const edited={...presetAppearance('blue'),hue:180,material:.25,lightness:44};await c.select({appearance:edited,text:'ocean'});await c.select(selectTheme(c.current,'v6-beijing'));
 assert.equal(c.current.text,'ocean');assert.deepEqual(c.current.appearance,edited);
 await c.restore();assert.deepEqual(c.current,normalizeSelection(v6DefaultSelection,{}));
});
test('fixed-gold lettering is independent of fill metal, palette and clearcoat, with legacy defaults',()=>{
 const m=new MeshPhysicalMaterial(),p=installCityParameters(m);p.enable(new Texture(),new Texture(),true);
 const shader:any={vertexShader:ShaderLib.physical.vertexShader,fragmentShader:ShaderLib.physical.fragmentShader,uniforms:{}};m.onBeforeCompile(shader,{} as any);
 p.fixedGold(true);for(const preset of ['blue','red','green','purple'] as const)for(const material of [0,.25,.5,.75,1]){p.update({...presetAppearance(preset),material},true);assert.equal(shader.uniforms.v5TextGold.value,1);assert.equal(shader.uniforms.v6FixedLabel.value,1);assert.equal(shader.uniforms.v5Blend.value,material);}
 p.fixedGold(false);p.update(presetAppearance('blue'),true);assert.equal(shader.uniforms.v5TextGold.value,0);assert.equal(shader.uniforms.v6FixedLabel.value,0);m.dispose();
});
