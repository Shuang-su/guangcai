import {chromium} from 'playwright';
import sharp from 'sharp';
import assert from 'node:assert/strict';
import {readFile,writeFile,readdir,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {gzipSync} from 'node:zlib';
const checks=[],check=(name,value)=>{assert.ok(value,name);checks.push(name)};
const hash=b=>createHash('sha256').update(b).digest('hex');
const protectedFiles={};
for(const f of (await readdir('public/china')).filter(f=>!f.startsWith('.')&&/\.(png|json)$/.test(f))){
 const path=`public/china/${f}`,now=await readFile(path),baseline=execFileSync('git',['show',`b92e418e547c11c21ce90ccb2baad9ae5198a5a5:guangcai-china-preview/${path}`],{maxBuffer:32*1024*1024});check(`${f}: city/lettering byte-identical to initial 3.0`,now.equals(baseline));protectedFiles[path]=hash(now);
}
const original={},edited={};
for(const region of ['body','handle','saucer']){
 original[region]=await sharp(`assets/masters/v3/${region}.png`).removeAlpha().raw().toBuffer({resolveWithObject:true});
 edited[region]=await sharp(`assets/masters/v3-hq/${region}-continuous.png`).removeAlpha().raw().toBuffer({resolveWithObject:true});
 const a=original[region],b=edited[region];check(`${region}: source dimensions preserved`,a.info.width===b.info.width&&a.info.height===b.info.height);
 if(region!=='saucer')check(`${region}: original master pixels unchanged`,a.data.equals(b.data));
 else{let unchanged=true;for(let y=0;y<a.info.height;y++){const start=(y*a.info.width+384)*3,end=(y*a.info.width+a.info.width-384)*3;if(!a.data.subarray(start,end).equals(b.data.subarray(start,end)))unchanged=false;}check('saucer: pixels outside 768px seam patch unchanged',unchanged);}
}
const b=await chromium.launch({channel:'chrome',headless:true}),p=await b.newPage();let precision,state,paths;
try{
 await p.goto('http://127.0.0.1:5210/');await p.waitForFunction(()=>window.cupViewer?.ready(),{},{timeout:120000});precision=await p.evaluate(()=>window.cupViewer.fixedPrecision());state=await p.evaluate(()=>window.cupViewer.debug());
 for(const [region,size]of Object.entries({body:[1024,2466],handle:[320,3728],saucer:[8192,384]}))check(`${region}: GPU texture is RGBA16F with expected dimensions`,precision[region].precision==='RGBA16F'&&JSON.stringify(precision[region].normalSize)===JSON.stringify(size));
 check('accepted depth and exposure retained',state.exposure===1.08&&state.fixedFinish.normalScale===4.4&&state.fixedFinish.clearcoatNormalScale===2.4);
 const raw=Buffer.alloc(16+32);raw.write('HFN1');raw.writeUInt32LE(2,4);raw.writeUInt32LE(2,8);raw.writeUInt32LE(1,12);for(let i=16;i<raw.length;i+=8){raw.writeUInt16LE(0x3800,i);raw.writeUInt16LE(0x3800,i+2);raw.writeUInt16LE(0x3c00,i+4);raw.writeUInt16LE(0x3c00,i+6);}
 paths=await p.evaluate(async uris=>{const {loadFloatNormal}=await import('/src/styles/float-normal.ts');const results=[];for(const uri of uris){const t=await loadFloatNormal(uri);results.push({size:[t.image.width,t.image.height],precision:t.userData.precision});t.dispose();}return results},[raw,gzipSync(raw)].map(x=>'data:application/octet-stream;base64,'+x.toString('base64')));
 check('raw HFN1 and gzip payloads both decode',paths.every(x=>x.precision==='RGBA16F'&&x.size[0]===2&&x.size[1]===2));
}finally{await b.close();}
const files=['assets/masters/v3-hq/seam-prompt.txt','assets/masters/v3-hq/seam-repair-generated.png','assets/masters/v3-hq/seam-final-native.png'];
const authoredSources=Object.fromEntries(await Promise.all(files.map(async f=>[f,hash(await readFile(f))])));
const result={date:new Date().toISOString(),baselineSource:'b92e418e547c11c21ce90ccb2baad9ae5198a5a5',checks,precision,protectedFiles,authoredSources,unmodifiedSaucerColumnsFraction:1-768/6924,normalDecodePaths:paths,locked:{exposure:state.exposure,fixedFinish:state.fixedFinish,city:state.city},scope:'Chrome WebGL and decoded source data; not physical phone or Safari acceptance'};
await writeFile('evidence/floral-hq/verification.json',JSON.stringify(result,null,2));await copyFile('evidence/floral-hq/verification.json','public/review/floral-hq/verification.json');console.log(JSON.stringify({passed:checks.length,precision}));
