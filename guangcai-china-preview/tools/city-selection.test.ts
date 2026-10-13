import {test} from 'node:test';
import assert from 'node:assert/strict';
import {SelectionController,defaultSelection,normalizeSelection,selectTheme,artworkPack,variants} from '../src/styles/city-selection';
import type {CityArtworkPack} from '../src/styles/city-artwork';
const gold:CityArtworkPack={id:'legacy',version:3,name:'original',layout:'blank-300deg-v1',baseColor:'b',normal:'n',metalness:'m',roughness:'r',placement:{scale:.82,offsetU:.047,offsetV:0}};
test('all 9 choices resolve; original pack is preserved exactly',()=>{
 assert.equal(variants.length,9);assert.deepEqual(artworkPack(defaultSelection,gold),gold);
 for(const v of variants.slice(1))for(const finish of ['enamel','metal','paint'] as const){
  const p=artworkPack({variant:v.id,finish,text:'auto'},gold,'/preview/');
  assert.equal(p.finish,finish);assert.ok(p.coverage?.startsWith('/preview/cities/v4/'));assert.equal(p.normalEncoding,'rgba16f');assert.equal(p.placement,undefined);
 }
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
