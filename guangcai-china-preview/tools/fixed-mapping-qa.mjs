import {chromium} from 'playwright';import {readFile,writeFile} from 'node:fs/promises';import assert from 'node:assert/strict';
const old=JSON.parse(await readFile('tools/fixtures/fixed-pre-restoration.json','utf8'));
const b=await chromium.launch({channel:'chrome',headless:true}),p=await b.newPage();
try{await p.goto('http://127.0.0.1:5210');await p.waitForFunction(()=>window.cupViewer?.ready(),{},{timeout:120000});
const checks=await p.evaluate(async old=>{
 const{StyleManager,defaultPack}=await import('/src/styles/style-manager.ts'),{makeMaterials}=await import('/src/materials/materials.ts');
 const m=makeMaterials(),s=new StyleManager(m,1,()=>{}),out=[];const check=(n,v)=>{if(!v)throw new Error(n);out.push(n);};const ids=()=>JSON.stringify(Object.values(s.currentMaps).flatMap(r=>Object.values(r).map(t=>t.uuid)));
 await s.apply(defaultPack);
 check('v3 uses UV2 and normalized source region',Object.values(s.currentMaps).every(r=>Object.values(r).every(t=>t.channel===2&&t.repeat.x===1&&t.repeat.y===1)));
 check('v3 saucer repeats without mirroring',s.currentMaps.saucer.baseColor.wrapS===1000);
 check('all source channels share offsets',Object.values(s.currentMaps).every(r=>Object.values(r).every(t=>t.offset.equals(r.baseColor.offset))));
 check('saucer atlas is installed on the actual physical material',m.regions.saucer.userData.fixedAtlas?.contentWidth===8128);
 const before=ids();let failed=false;
 try{await s.apply({...defaultPack,regions:{...defaultPack.regions,body:{...defaultPack.regions.body,baseColor:'data:image/png;base64,broken'}}})}catch{failed=true}
 check('failed fixed load retains every current map',failed&&before===ids());
 failed=false;try{await s.apply({...defaultPack,regions:{...defaultPack.regions,saucer:{...defaultPack.regions.saucer,atlas:{...defaultPack.regions.saucer.atlas,gutter:0}}}})}catch{failed=true}
 check('invalid atlas rejects atomically and preserves the installed mapping',failed&&before===ids()&&m.regions.saucer.userData.fixedAtlas.gutter===32);
 await s.apply(old);check('prior source-layout package works without atlas',s.currentMaps.saucer.baseColor.channel===2&&!m.regions.saucer.userData.fixedAtlas);
 await s.apply({...old,mapping:undefined});check('legacy packages use UV0 and mirrored saucer wrap',Object.values(s.currentMaps).every(r=>Object.values(r).every(t=>t.channel===0))&&s.currentMaps.saucer.baseColor.wrapS===1002);
 const race=await Promise.all([s.apply({...defaultPack,name:'first'}),s.apply({...defaultPack,name:'last'})]);check('rapid fixed switching commits the latest complete package',race[0]===false&&race[1]===true&&s.currentName==='last');
 s.dispose();Object.values(m.regions).forEach(t=>t.dispose());m.city.dispose();m.porcelain.dispose();m.gold.dispose();m.foot.dispose();m.mark.dispose();return out;
},old);assert.equal(checks.length,9);await writeFile('evidence/floral-restored/fixed-mapping.json',JSON.stringify({date:new Date().toISOString(),checks,passed:checks.length},null,2));console.log(checks);
}finally{await b.close()}
