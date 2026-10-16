// Reuse expensive raster validation only while every tested input/output is identical.
import {readFile,writeFile,readdir,stat,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';import {spawn} from 'node:child_process';import path from 'node:path';
const receipt='.codex-work/deploy/v6-release/asset-validation.json';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
async function files(dir){const out=[];for(const name of await readdir(dir)){if(name.startsWith('.')||['references','README.md','review.json'].includes(name))continue;const f=path.join(dir,name);if((await stat(f)).isDirectory())out.push(...await files(f));else out.push(f);}return out;}
const list=(await Promise.all(['assets/source/v6','assets/masters/v6','public/cities/v6'].map(files))).flat().concat(['tools/test_city_v6_assets.py','evidence/city-v6/derivation.json','evidence/city-v6/slogans.json']).sort();
const hashes={};for(const f of list)hashes[f]=sha(await readFile(f));const fingerprint=sha(JSON.stringify(hashes));
await mkdir(path.dirname(receipt),{recursive:true});
if(process.argv.includes('--import-passed-run')){
 const priorBytes=await readFile('.codex-work/deploy/v6-release/prepare.json'),prior=JSON.parse(priorBytes);
 if(prior.steps.find(s=>s.name==='23-city/font asset checks')?.code!==0)throw Error('No successful asset stage to import');
 for(const f of list)if((await stat(f)).mtimeMs>Date.parse(prior.date))throw Error('Input was modified after that validation started: '+f);
 await writeFile(receipt,JSON.stringify({status:'passed',date:prior.date,fingerprint,hashes,importedStage:prior.steps.find(s=>s.name==='23-city/font asset checks'),priorReportSha256:sha(priorBytes)},null,2)+'\n');
 console.log('Imported completed asset validation; all tested files predate the run.');
}else{
 let previous;try{previous=JSON.parse(await readFile(receipt));}catch{}
 if(previous?.status==='passed'&&previous.fingerprint===fingerprint){console.log('Reusing unchanged 23-city/font validation from '+previous.date);}
 else{
  const code=await new Promise((resolve,reject)=>{const p=spawn(process.env.CITY_PYTHON??'python3',['tools/test_city_v6_assets.py'],{stdio:'inherit'});p.once('error',reject);p.once('close',resolve);});
  if(code!==0)process.exit(code??1);
  // Detect concurrent edits rather than stamping outputs the test did not read.
  for(const f of list)if(sha(await readFile(f))!==hashes[f])throw Error('Asset changed during validation: '+f);
  await writeFile(receipt,JSON.stringify({status:'passed',date:new Date().toISOString(),fingerprint,hashes},null,2)+'\n');
 }
}
