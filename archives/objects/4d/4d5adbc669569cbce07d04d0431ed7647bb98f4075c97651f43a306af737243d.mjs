import {readFile,writeFile}from'node:fs/promises';
import {createHash}from'node:crypto';
import assert from'node:assert/strict';
import sharp from'sharp';
const hash=async p=>createHash('sha256').update(await readFile(p)).digest('hex');
const original='../guangcai-viewer',baseline=JSON.parse(await readFile('evidence/source-integrity.json','utf8'));
const checked=[];
for(const input of baseline.inputs){assert.equal(await hash(input.source),input.sha256,input.source);assert.equal(await hash(input.copy),input.sha256,input.copy);checked.push(input.copy);}
for(const [p,digest]of Object.entries(baseline.originalProject)){assert.equal(await hash(`${original}/${p}`),digest,p);}
const audit=JSON.parse(await readFile('evidence/psd-audit.json','utf8'));for(const [name,digest]of Object.entries(audit.maps)){assert.equal(await hash(`public/china/${name}`),digest,name);const meta=await sharp(`public/china/${name}`).metadata();assert.deepEqual([meta.width,meta.height],audit.outputSize);}
for(const layer of audit.cleanup)assert.equal(layer.originalPixelsAtAlpha128,layer.retainedPixelsAtAlpha128,layer.layer);
const fixed=JSON.parse(await readFile('public/fixed/manifest.json','utf8'));for(const [region,entry]of Object.entries(fixed.regions)){for(const [channel,map]of Object.entries(entry.maps)){assert.equal(await hash(`public/${map.url}`),map.sha256,`${region}.${channel}`);const meta=await sharp(`public/${map.url}`).metadata();assert.deepEqual([meta.width,meta.height],[entry.width,entry.height]);}}
const result={verifiedAt:new Date().toISOString(),sourceCopies:checked,originalProjectFilesUnchanged:Object.keys(baseline.originalProject).length,cityMapsVerified:Object.keys(audit.maps).length,fixedMapsVerified:Object.values(fixed.regions).reduce((n,r)=>n+Object.keys(r.maps).length,0),allSubstantialStrokePixelsRetained:true,notes:'Source/hash and pixel channel checks; does not certify visual match or manufacturing dimensions'};
await writeFile('evidence/delivery-verification.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
