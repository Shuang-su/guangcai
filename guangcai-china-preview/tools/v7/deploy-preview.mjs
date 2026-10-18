// Explicitly authorized independent V7 preview. Never links or writes another site.
// Official Netlify file-digest API; uses the existing local login without copying it.
import {readFile,writeFile,mkdir,readdir,copyFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';import os from 'node:os';
const root=fileURLToPath(new URL('../../',import.meta.url));process.chdir(root);
const siteId='52e02ef9-e2d8-4fcb-98ed-1d14e283c74c',siteName='guangcai-no1-china-v7';
const protectedIds=['15a98425-f9a2-4c44-afbe-5859f4b5d1f7','b1fce272-cf28-41e5-8366-024c314b615f','cbb885ed-16d0-41a2-9ab0-055c0c3ce234','71306515-d3d5-46a9-8f36-e51f4f3ae480','8d9dfdb3-270a-46c5-9dde-0fe4ddc2662f'];
const build='.codex-work/deploy/v7-build',work='.codex-work/deploy/v7-preview-release';await mkdir(work,{recursive:true});
const hash=(data,algorithm='sha256')=>createHash(algorithm).update(data).digest('hex');
const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
const receiptFile=path.join(work,'deploy.json');let old;try{old=JSON.parse(await readFile(receiptFile,'utf8'));}catch{}
const receipt={siteId,siteName,sourceCommit:git('rev-parse','HEAD'),sourceBranch:git('branch','--show-current'),date:new Date().toISOString(),status:'checking'};
const save=()=>writeFile(receiptFile,JSON.stringify(receipt,null,2)+'\n');
const login=JSON.parse(await readFile(path.join(os.homedir(),'Library/Preferences/netlify/config.json'),'utf8'));
const token=process.env.NETLIFY_AUTH_TOKEN??login.users?.[login.userId]?.auth?.token;if(!token)throw Error('Existing Netlify login required');
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function api(route,method='GET',body,raw=false){
 // Only writes to the fixed V7 project and its own newly-created deploy.
 if(method!=='GET'&&route!==`/sites/${siteId}/deploys`&&!route.startsWith(`/deploys/${receipt.deployId}/files/`))throw Error('Write outside authorized V7 target');
 for(let attempt=0;attempt<(method==='POST'?1:4);attempt++){
  let response;try{response=await fetch('https://api.netlify.com/api/v1'+route,{method,headers:{Authorization:`Bearer ${token}`,...(body?{'Content-Type':raw?'application/octet-stream':'application/json'}:{})},body:body?(raw?body:JSON.stringify(body)):undefined,signal:AbortSignal.timeout(60000)});}catch(e){if(method==='POST'||attempt===3)throw Error(`Netlify ${method}: ${e.name}`);await delay(2000);continue;}
  if((response.status===429||response.status>=500)&&method!=='POST'&&attempt<3){await delay(4000);continue;}
  if(!response.ok)throw Error(`Netlify ${method} ${route}: HTTP ${response.status}`);const text=await response.text();return text?JSON.parse(text):{};
 }
}
async function files(dir,base=dir){let list=[];for(const item of await readdir(dir,{withFileTypes:true})){if(item.name.startsWith('.'))throw Error('Hidden file in deployment');const p=path.join(dir,item.name);if(item.isDirectory())list.push(...await files(p,base));else if(item.isFile())list.push(path.relative(base,p));else throw Error('Non-regular deployment file');}return list.sort();}
const summary=s=>({id:s.id,name:s.name,publishedDeploy:s.published_deploy?.id??null,gitConnected:!!s.build_settings?.repo_url});
try{
 if(receipt.sourceBranch!=='codex/v7.1.3-floral-correction'||git('status','--porcelain'))throw Error('Commit the reviewed V7 branch before deployment');
 const reviewed=JSON.parse(await readFile('evidence/v7/consumer-build.json','utf8'));
 const actual=(await files(build)).filter(f=>f!=='release.json');if(JSON.stringify(actual)!==JSON.stringify(reviewed.inventory.map(f=>f.path).sort()))throw Error('Build inventory changed');
 for(const file of reviewed.inventory)if(hash(await readFile(path.join(build,file.path)))!==file.sha256)throw Error(`Build changed: ${file.path}`);
 for(const folder of ['chrome','webkit']){const report=JSON.parse(await readFile(`evidence/v7.1.3/qa/${folder}/report.json`));if(report.failure||report.errors.length||report.checks.some(c=>!c.passed))throw Error('Consumer/preload QA did not pass');}
 for(const engine of ['chrome','webkit']){const city=JSON.parse(await readFile(`evidence/v7.1.3/qa/city-${engine}/report.json`));if(!city.passed)throw Error('HD/city/glass QA did not pass');}
 const startup=JSON.parse(await readFile('evidence/v7.1.3/qa/startup/startup-qa.json'));if(startup.status!=='passed')throw Error('Startup QA did not pass');
 const retry=JSON.parse(await readFile('evidence/v7.1.3/qa/retry/report.json'));if(!retry.passed)throw Error('Recovery QA did not pass');
 const liquid=JSON.parse(await readFile('evidence/v7.1.3/qa/liquid/liquid-qa.json'));if(liquid.status!=='passed')throw Error('Liquid QA did not pass');
 const split=JSON.parse(await readFile('evidence/v7.1.3/qa/split/report.json'));if(!split.passed)throw Error('Split-origin QA did not pass');
 const performance=JSON.parse(await readFile('evidence/v7.1.3/qa/performance/report.json'));receipt.controlledColdStartPassed=performance.passed;receipt.physicalDeviceAcceptance='pending';
 const artwork=JSON.parse(await readFile('evidence/v7.1.3/qa/artwork/report.json'));if(!artwork.passed)throw Error('Fixed-camera artwork QA did not pass');
 for(const folder of ['feedback','feedback-webkit','floral-webkit'])if(!JSON.parse(await readFile(`evidence/v7.1.3/qa/${folder}/report.json`)).passed)throw Error('Final feedback QA did not pass');
 const floral=JSON.parse(await readFile('evidence/v7.1.3/qa/floral/report.json'));if(!floral.passed)throw Error('Floral mapping and transactional restore QA did not pass');
 const art=JSON.parse(await readFile('evidence/v7.1.3/resource-validation.json'));if(!art.passed)throw Error('Artwork preservation QA did not pass');
 const site=await api(`/sites/${siteId}`);if(site.name!==siteName||site.build_settings?.repo_url)throw Error('V7 target name or Git connection changed');
 receipt.protectedBefore=await Promise.all(protectedIds.map(async id=>summary(await api(`/sites/${id}`))));
 await writeFile(path.join(build,'release.json'),JSON.stringify({version:JSON.parse(await readFile('package.json')).version,kind:'independent-preview',sourceCommit:receipt.sourceCommit,sourceBranch:receipt.sourceBranch,v6SyncedThrough:'833a8b33561d36e72f1164743e80f28fc63d96b2',resourceRelease:JSON.parse(await readFile('public/api/v1/bootstrap.json')).releaseId},null,2)+'\n');
 const manifest={},bySha=new Map(),casePaths=new Set();for(const file of await files(build)){if(/[?#]/.test(file)||casePaths.has(file.toLowerCase()))throw Error('Unsafe or case-colliding deployment path');casePaths.add(file.toLowerCase());const bytes=await readFile(path.join(build,file)),sha1=hash(bytes,'sha1');manifest['/'+file]={sha1,sha256:hash(bytes),bytes:bytes.length};bySha.set(sha1,file);}
 receipt.fileCount=Object.keys(manifest).length;receipt.manifestSha256=hash(JSON.stringify(manifest));
 let deploy;if(old?.deployId&&old.sourceCommit===receipt.sourceCommit&&old.manifestSha256===receipt.manifestSha256){receipt.deployId=old.deployId;deploy=await api(`/deploys/${old.deployId}`);}else{deploy=await api(`/sites/${siteId}/deploys`,'POST',{async:true,draft:false,title:`V${JSON.parse(await readFile('package.json')).version} independent iPhone preview ${receipt.sourceCommit.slice(0,7)}`,files:Object.fromEntries(Object.entries(manifest).map(([p,v])=>[p,v.sha1]))});receipt.deployId=deploy.id;await save();}
 if(deploy.site_id!==siteId)throw Error('Deployment ownership mismatch');
 for(let i=0;deploy.state==='preparing'&&i<90;i++){await delay(2000);deploy=await api(`/deploys/${receipt.deployId}`);}
 if(['error','preparing'].includes(deploy.state))throw Error('Deploy preparation failed');
 const queue=[...(deploy.required??[])];receipt.requiredFiles=queue.length;receipt.status='uploading';await save();let uploaded=0;
 await Promise.all(Array.from({length:4},async()=>{while(queue.length){const digest=queue.shift(),file=bySha.get(digest);if(!file)throw Error('Unknown requested digest');await api(`/deploys/${receipt.deployId}/files/${file.split('/').map(encodeURIComponent).join('/')}`,'PUT',await readFile(path.join(build,file)),true);if(++uploaded%25===0)console.log(`Uploaded ${uploaded}/${receipt.requiredFiles}`);}}));
 for(let i=0;i<90;i++){deploy=await api(`/deploys/${receipt.deployId}`);if(deploy.state==='ready')break;if(deploy.state==='error')throw Error('Deploy processing failed');await delay(2000);}
 if(deploy.state!=='ready')throw Error('Deploy not ready');
 receipt.url=`https://${siteName}.netlify.app/`;receipt.permalink=`https://${receipt.deployId}--${siteName}.netlify.app/`;
 const current=await api(`/sites/${siteId}`);if(current.published_deploy?.id!==receipt.deployId)throw Error('Published deployment mismatch');
 const remote=new Map((await api(`/sites/${siteId}/files`)).map(f=>[f.path.toLowerCase(),f.sha]));let matched=0;for(const [file,entry]of Object.entries(manifest)){if(file==='/_headers'&&!remote.has(file))continue;if(remote.get(file.toLowerCase())!==entry.sha1)throw Error(`Remote digest mismatch: ${file}`);matched++;}receipt.remoteFilesMatched=matched;
 const response=await fetch(receipt.url,{signal:AbortSignal.timeout(30000)});if(!response.ok||!(await response.text()).includes('城市共彩'))throw Error('Anonymous public entry unavailable');
 const release=await fetch(new URL('release.json',receipt.url)).then(r=>r.json());if(release.sourceCommit!==receipt.sourceCommit)throw Error('Public source metadata mismatch');
 receipt.protectedAfter=await Promise.all(protectedIds.map(async id=>summary(await api(`/sites/${id}`))));if(JSON.stringify(receipt.protectedBefore)!==JSON.stringify(receipt.protectedAfter))throw Error('Protected site state changed');
 const archive=path.resolve('..','deployments',siteName,receipt.deployId);await mkdir(archive,{recursive:true});
 for(const [file,entry]of Object.entries(manifest)){const dest=path.join(archive,'site',file.slice(1));await mkdir(path.dirname(dest),{recursive:true});try{if(hash(await readFile(dest))!==entry.sha256)throw Error('Immutable archive differs');}catch(e){if(e.code!=='ENOENT')throw e;await copyFile(path.join(build,file.slice(1)),dest);}}
 receipt.archive=path.relative(path.resolve('..'),archive);receipt.status='server-verified-browser-check-pending';await save();
 for(const [name,value]of [['files.json',manifest],['deployment.json',receipt]])try{await writeFile(path.join(archive,name),JSON.stringify(value,null,2)+'\n',{flag:'wx'});}catch(e){if(e.code!=='EEXIST')throw e;}
 console.log(JSON.stringify({url:receipt.url,deployId:receipt.deployId,filesMatched:matched,protectedSitesUnchanged:true}));
}catch(e){receipt.status='failed';receipt.error=e.message;await save();console.error(e.message);process.exitCode=1;}
