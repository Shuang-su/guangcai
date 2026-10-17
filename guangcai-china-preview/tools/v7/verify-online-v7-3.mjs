import fs from 'node:fs/promises';import {createHash} from 'node:crypto';import assert from 'node:assert/strict';
const base='https://guangcai-no1-china-v7.netlify.app/',out='evidence/v7.1.2/qa/online';await fs.mkdir(out,{recursive:true});
const digest=b=>createHash('sha256').update(b).digest('hex');
async function get(p){const r=await fetch(new URL(p,base),{signal:AbortSignal.timeout(120000)});assert.equal(r.status,200,p);return Buffer.from(await r.arrayBuffer());}
const receipt=JSON.parse(await fs.readFile('.codex-work/deploy/v7-preview-release/deploy.json'));
const release=JSON.parse(await get('release.json'));assert.equal(release.version,'7.1.2');assert.equal(release.resourceRelease,'v7-3');assert.equal(release.sourceCommit,receipt.sourceCommit);
assert((await get('index.html')).toString().includes('<dd>V7.1.2</dd>'));
const bootstrap=JSON.parse(await get('api/v1/bootstrap.json'));assert.equal(bootstrap.releaseId,'v7-3');
const entries=[];let manifest;
for(const id of ['v7-1','v7-2','v7-3']){const catPath=`releases/${id}/catalog.json`,cat=await get(catPath);assert.equal(digest(cat),digest(await fs.readFile('public/'+catPath)));const p=`releases/${id}/${JSON.parse(cat).manifestUrl}`,bytes=await get(p);assert.equal(digest(bytes),digest(await fs.readFile('public/'+p)));entries.push({releaseId:id,catalogSha256:digest(cat),manifestPath:p,manifestSha256:digest(bytes)});if(id==='v7-3')manifest=JSON.parse(bytes);}
const assets=[];function scan(v){if(v&&typeof v==='object'){if(v.url&&v.sha256){if(!v.url.startsWith('..'))assets.push(v);}else Object.values(v).forEach(scan);}}scan(manifest);
const rows=[];for(const a of assets){const p=new URL(a.url,new URL(bootstrap.manifestUrl,base)).href;const b=await get(p);assert.equal(b.length,a.bytes);assert.equal(digest(b),a.sha256);rows.push({id:a.id,bytes:b.length,sha256:digest(b)});}assert.equal(rows.length,12);
const v6=await fetch('https://guangcai-no1-china-v6.netlify.app/release.json').then(r=>r.json());assert.equal(v6.sourceCommit,'833a8b33561d36e72f1164743e80f28fc63d96b2');
const report={passed:true,base,deployId:receipt.deployId,release,entries,newAssetHashes:rows,entryVersionMatches:true,serverFilesMatched:receipt.remoteFilesMatched,protectedSitesUnchanged:JSON.stringify(receipt.protectedBefore)===JSON.stringify(receipt.protectedAfter),v6,physicalDeviceAcceptance:'pending'};
await fs.writeFile(out+'/report.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({passed:true,deployId:receipt.deployId,resourceRelease:release.resourceRelease,filesMatched:receipt.remoteFilesMatched,newAssetHashes:rows.length}));
