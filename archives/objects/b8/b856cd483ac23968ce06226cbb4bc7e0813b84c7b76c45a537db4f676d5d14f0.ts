import {test} from 'node:test';
import assert from 'node:assert/strict';
import {SelectionController,defaultSelection,normalizeSelection,selectTheme,artworkPack,variants,isFixedGold,themeFor} from '../src/styles/city-selection';
import type {CityArtworkPack} from '../src/styles/city-artwork';
const gold:CityArtworkPack={id:'legacy',version:3,name:'original',layout:'blank-300deg-v1',baseColor:'b',normal:'n',metalness:'m',roughness:'r',placement:{scale:.82,offsetU:.047,offsetV:0}};
test('all 14 choices resolve; original pack is preserved exactly',()=>{
 assert.equal(variants.length,14);assert.deepEqual(artworkPack(defaultSelection,gold),gold);
 for(const v of variants.slice(1))for(const finish of ['enamel','metal','paint'] as const){
  const p=artworkPack({variant:v.id,finish,text:'auto'},gold,'/preview/');
  assert.equal(p.finish,isFixedGold(v)?undefined:finish);assert.ok(p.coverage?.startsWith('/preview/cities/v4/'));assert.equal(p.normalEncoding,'rgba16f');assert.equal(p.placement,undefined);
 }
});
test('Beijing shares one normal and coverage across five palettes; gold is fixed',()=>{
 const beijing=variants.filter(v=>v.theme==='beijing');assert.equal(beijing.length,5);
 const packs=beijing.map(v=>artworkPack({variant:v.id,finish:'enamel',text:'auto'},gold));
 assert.equal(new Set(packs.map(p=>p.normal)).size,1);assert.equal(new Set(packs.map(p=>p.coverage)).size,1);
 for(const p of packs){assert.match(p.label!.source!,/label-beijing-/);assert.equal(p.label!.hidden,false);}
 assert.equal(packs[0].finish,undefined);assert.equal(packs[0].label!.metalness,1);
 assert.equal(normalizeSelection(defaultSelection,{variant:'beijing-gold',finish:'paint'}).finish,'enamel');
 assert.equal(selectTheme(defaultSelection,'beijing').variant,'beijing-gold');
 assert.equal(selectTheme({...defaultSelection,text:'none'},'beijing').text,'none');
 assert.equal(selectTheme({variant:'shenzhen-red',finish:'metal',text:'he'},'beijing').text,'auto');
 assert.equal(themeFor(beijing[0]).name,'北京');
 const a=artworkPack({variant:'beijing-green',finish:'enamel',text:'auto'},gold);
 const b=artworkPack({variant:'beijing-green',finish:'enamel',text:'name'},gold);
 assert.deepEqual(a,b);
 const hidden=artworkPack({variant:'beijing-green',finish:'enamel',text:'none'},gold);
 assert.equal(hidden.normal,a.normal);assert.equal(hidden.baseColor,a.baseColor);assert.equal(hidden.label!.hidden,true);
});
test('hidden text survives theme changes; Shenzhen slogans reset for China',()=>{
 assert.equal(selectTheme({...defaultSelection,text:'none'},'shenzhen').text,'none');
 assert.equal(selectTheme({variant:'shenzhen-teal',finish:'paint',text:'he'},'china').text,'auto');
 assert.equal(normalizeSelection(defaultSelection,{variant:'china-gold',finish:'metal'}).finish,'enamel');
 assert.throws(()=>normalizeSelection(defaultSelection,{variant:'missing'}));
 const red=artworkPack({variant:'shenzhen-red',finish:'enamel',text:'auto'},gold),teal=artworkPack({variant:'shenzhen-teal',finish:'enamel',text:'auto'},gold);
 assert.match(red.label!.source!,/label-he-/);assert.match(teal.label!.source!,/label-create-/);
 assert.equal(artworkPack({...defaultSelection,text:'none'},gold).label!.hidden,true);
});
test('last selection wins; stale failures cannot overwrite newer success',async()=>{
 const pending:Array<{resolve:(v:boolean)=>void,reject:(e:Error)=>void}>=[];
 const controller=new SelectionController(()=>new Promise((resolve,reject)=>pending.push({resolve,reject})),()=>{});
 const first=controller.select({variant:'china-green'}),last=controller.select({variant:'shenzhen-red'});
 pending[1].resolve(true);assert.equal(await last,true);pending[0].reject(new Error('stale'));assert.equal(await first,false);
 assert.equal(controller.current.variant,'shenzhen-red');assert.equal(controller.error,'');assert.equal(controller.busy,false);
 const failure=controller.select({variant:'china-blue'});pending[2].reject(new Error('failed'));
 assert.equal(await failure,false);assert.equal(controller.current.variant,'shenzhen-red');assert.deepEqual(controller.desired,controller.current);assert.equal(controller.error,'failed');
});
