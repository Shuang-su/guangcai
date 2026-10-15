import {test} from 'node:test';
import assert from 'node:assert/strict';
import {SelectionController,defaultSelection,normalizeSelection,selectTheme,artworkPack,variants} from '../src/styles/city-selection';
import {presetAppearance,normalizeAppearance,appearanceColors,hexHsl,hslRgb,materialAt,GOLD_LINE,palettes} from '../src/styles/city-appearance';
import type {CityArtworkPack} from '../src/styles/city-artwork';
const gold:CityArtworkPack={id:'legacy',version:3,name:'original',layout:'blank-300deg-v1',baseColor:'b',normal:'n',metalness:'m',roughness:'r',placement:{scale:.82,offsetU:.047,offsetV:0}};
test('original China pack and all legacy China palettes retain their interface',()=>{
 assert.deepEqual(artworkPack(defaultSelection,gold),gold);
 for(const v of variants.filter(x=>x.theme==='china'&&x.id!=='china-gold')){
  const p=artworkPack({variant:v.id,finish:'paint',text:'auto'},gold,'/preview/');assert.equal(p.finish,'enamel');assert.ok(p.baseColor.startsWith('/preview/cities/v4/'));
 }
 assert.equal(artworkPack({...defaultSelection,text:'none'},gold).label?.hidden,true);
});
test('two V5 cities each expose five presets and share all structural channels',()=>{
 for(const theme of ['beijing','shenzhen']){
  const city=variants.filter(v=>v.theme===theme);assert.equal(city.length,5);
  const packs=city.map(v=>artworkPack({variant:v.id,finish:'enamel',text:'name'},gold,'/preview/'));
  for(const key of ['normal','coverage','baseColor'] as const)assert.equal(new Set(packs.map(p=>p[key])).size,1);
  for(const p of packs){assert.equal(p.version,5);assert.equal(p.normalEncoding,'rgba16f');assert.equal(p.placement,undefined);assert.ok(p.parametric);assert.match(p.label!.source!,new RegExp(theme+'-label'));}
 }
});
test('continuous appearance survives theme changes and entire-selection normalization',()=>{
 const appearance={...presetAppearance('purple'),hue:171,saturation:42,lightness:36,material:.37,relief:1.75};
 const a=normalizeSelection(defaultSelection,{variant:'beijing-purple',appearance,text:'none'});
 const b=selectTheme(a,'shenzhen');const c=normalizeSelection(a,b);
 assert.deepEqual(c.appearance,appearance);assert.equal(c.variant,'shenzhen-purple');assert.equal(c.text,'none');
 const reset=normalizeSelection(c,{variant:'shenzhen-blue'});assert.deepEqual(reset.appearance,presetAppearance('blue'));
 assert.equal(normalizeSelection(c,{finish:'paint'}).appearance!.material,0);
 assert.equal(normalizeSelection(c,{finish:'metal'}).appearance!.material,1);
 assert.equal(normalizeSelection(c,{variant:'shenzhen-teal'}).variant,'shenzhen-blue');
 assert.throws(()=>normalizeSelection(c,{variant:'missing'}));
});
test('palette endpoints are reproduced in sRGB and HSL edits preserve a shared gradient',()=>{
 for(const key of Object.keys(palettes) as Array<keyof typeof palettes>){const p=palettes[key],a=presetAppearance(key),c=appearanceColors(a);
  for(const end of ['dark','light'] as const){const expected=[1,3,5].map(i=>parseInt(p[end].slice(i,i+2),16)/255);assert.ok(c[end].every((v,i)=>Math.abs(v-expected[i])<1e-8));}
 }
 assert.deepEqual(hslRgb(...hexHsl('#000000')),[0,0,0]);assert.deepEqual(hslRgb(...hexHsl('#ffffff')),[1,1,1]);
 assert.equal(normalizeAppearance({...presetAppearance('red'),material:20,relief:-1}).material,1);
 assert.equal(normalizeAppearance({...presetAppearance('red'),material:20,relief:-1}).relief,0);
 assert.throws(()=>normalizeAppearance({...presetAppearance('red'),hue:NaN}));
});
test('material interpolation keeps independent gold parameters and exact finish endpoints',()=>{
 assert.deepEqual(materialAt(0),{metalness:0,roughness:.31,clearcoat:191/255});
 assert.equal(materialAt(1).roughness,72/255);assert.ok(Math.abs(materialAt(1).clearcoat-26/255)<1e-12);
 for(const t of [0,.25,.5,.75,1]){assert.equal(materialAt(t).metalness,t);assert.equal(GOLD_LINE.metalness,1);assert.equal(GOLD_LINE.color,'#dcb251');}
});
test('last selection wins; stale failure and current failure preserve the committed selection',async()=>{
 const pending:Array<{resolve:(v:boolean)=>void,reject:(e:Error)=>void}>=[];
 const controller=new SelectionController(()=>new Promise((resolve,reject)=>pending.push({resolve,reject})),()=>{});
 const first=controller.select({variant:'beijing-green'}),last=controller.select({variant:'shenzhen-red'});
 pending[1].resolve(true);assert.equal(await last,true);pending[0].reject(new Error('stale'));assert.equal(await first,false);
 assert.equal(controller.current.variant,'shenzhen-red');assert.equal(controller.error,'');assert.equal(controller.busy,false);
 const failure=controller.select({variant:'beijing-blue'});pending[2].reject(new Error('failed'));
 assert.equal(await failure,false);assert.equal(controller.current.variant,'shenzhen-red');assert.deepEqual(controller.desired,controller.current);
});

test('Shenzhen explicit slogans remain available and reset outside Shenzhen',()=>{
 const s=normalizeSelection(defaultSelection,{variant:'shenzhen-red',text:'he'});
 assert.match(artworkPack(s,gold).label!.source!,/cities\/v4\/label-he-/);
 assert.equal(selectTheme(s,'beijing').text,'auto');
});
