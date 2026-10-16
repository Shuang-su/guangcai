// Independent V6 preview only. Existing .netlify/state.json is never relinked.
// Netlify file-digest API: https://docs.netlify.com/api-and-cli-guides/api-guides/get-started-with-api/
import {readFile,writeFile,mkdir,readdir,stat,copyFile} from 'node:fs/promises';
import {spawn,execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import os from 'node:os';import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));process.chdir(root);
const cfg=JSON.parse(await readFile('tools/v6-pipeline.json','utf8'));
if(cfg.siteId!=='15a98425-f9a2-4c44-afbe-5859f4b5d1f7'||cfg.siteName!=='guangcai-no1-china-v6'||cfg.protectedSiteIds.includes(cfg.siteId))throw new Error('Only the explicitly authorized independent V6 preview may be deployed');
const hash=(b,alg='sha256')=>createHash(alg).update(b).digest('hex');
const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
const work=path.resolve(cfg.work);await mkdir(work,{recursive:true});
const receiptFile=path.join(work,'deploy.json');
const receipt={siteId:cfg.siteId,siteName:cfg.siteName,sourceCommit:git('rev-parse','HEAD'),date:new Date().toISOString(),status:'checking'};
const save=()=>writeFile(receiptFile,JSON.stringify(receipt,null,2));
async function fileList(dir,base=dir){let result=[];for(const name of await readdir(dir)){if(name.startsWith('.'))continue;const p=path.join(dir,name);if((await stat(p)).isDirectory())result.push(...await fileList(p,base));else result.push(path.relative(base,p));}return result.sort();}
const delay=ms=>new Promise(r=>setTimeout(r,ms));
let token=process.env.NETLIFY_AUTH_TOKEN;
if(!token){const login=JSON.parse(await readFile(path.join(os.homedir(),'Library/Preferences/netlify/config.json'),'utf8'));token=login.users?.[login.userId]?.auth?.token;}
if(!token)throw new Error('No existing Netlify login; authenticate outside source/cache');
async function api(route,method='GET',body,raw=false){
 const attempts=method==='POST'?1:5;
 for(let i=0;i<attempts;i++){
  let response;
  try{response=await fetch('https://api.netlify.com/api/v1'+route,{method,headers:{Authorization:`Bearer ${token}`,...(body?{'Content-Type':raw?'application/octet-stream':'application/json'}:{})},body:body?(raw?body:JSON.stringify(body)):undefined,signal:AbortSignal.timeout(120000)});}
  catch(e){if(i+1===attempts)throw new Error(`Netlify ${method} ${route}: network failure (${e.name})`);await delay(1500*2**i);continue;}
  if((response.status===429||response.status>=500)&&i+1<attempts){const seconds=Number(response.headers.get('retry-after'));await delay(seconds>0?Math.min(seconds*1000,60000):2000*2**i);continue;}
  if(!response.ok)throw new Error(`Netlify ${method} ${route}: HTTP ${response.status}`);
  if(response.status===204)return {};
  const text=await response.text();return text?JSON.parse(text):{};
 }
}
const siteSummary=s=>({id:s.id,name:s.name,publishedDeploy:s.published_deploy?.id??null,gitConnected:!!s.build_settings?.repo_url});
try{
 if(git('status','--porcelain'))throw new Error('Commit reviewed source and evidence before publishing');
 const prepared=JSON.parse(await readFile(path.join(work,'prepare.json'),'utf8'));
 if(prepared.status!=='passed')throw new Error('Preparation pipeline did not pass');
 for(const [file,sha] of Object.entries(prepared.authorityHashes))if(hash(await readFile(file))!==sha)throw new Error(`Reviewed authority changed: ${file}`);
 for(const [file,sha] of Object.entries(prepared.buildFiles))if(hash(await readFile(path.join(cfg.build,file)))!==sha)throw new Error(`Prepared output changed: ${file}`);
 const actual=await fileList(cfg.build);if(actual.some(f=>!prepared.buildFiles[f]&&f!=='release.json'))throw new Error('Unexpected file in prepared output');
 const site=await api(`/sites/${cfg.siteId}`);
 if(site.name!==cfg.siteName||site.build_settings?.repo_url)throw new Error('Target name changed or Git CD unexpectedly enabled');
 receipt.protectedBefore=[];for(const id of cfg.protectedSiteIds)receipt.protectedBefore.push(siteSummary(await api(`/sites/${id}`)));
 // Route headers are checked after the new deployment reaches ready.
 await writeFile(path.join(cfg.build,'release.json'),JSON.stringify({version:JSON.parse(await readFile('package.json','utf8')).version,kind:'independent-preview',sourceCommit:receipt.sourceCommit,reviewSha256:prepared.reviewSha256,sourceHashes:prepared.sourceHashes},null,2)+'\n');
 const manifest={},bySha=new Map(),casePaths=new Set();
 for(const file of await fileList(cfg.build)){
  if(/[?#]/.test(file)||casePaths.has(file.toLowerCase()))throw new Error(`Unsafe or case-colliding deployment path: ${file}`);casePaths.add(file.toLowerCase());
  const data=await readFile(path.join(cfg.build,file)),sha1=hash(data,'sha1');manifest['/'+file]={sha1,sha256:hash(data),bytes:data.length};if(!bySha.has(sha1))bySha.set(sha1,file);
 }
 receipt.manifestSha256=hash(JSON.stringify(manifest));receipt.fileCount=Object.keys(manifest).length;
 let old;try{old=JSON.parse(await readFile(receiptFile,'utf8'));}catch{}
 let deploy;
 if(old?.deployId&&old.sourceCommit===receipt.sourceCommit&&old.manifestSha256===receipt.manifestSha256){receipt.deployId=old.deployId;deploy=await api(`/deploys/${old.deployId}`);}
 else{deploy=await api(`/sites/${cfg.siteId}/deploys`,'POST',{async:true,draft:false,title:`V6 city artwork library ${receipt.sourceCommit.slice(0,7)}`,files:Object.fromEntries(Object.entries(manifest).map(([p,v])=>[p,v.sha1]))});receipt.deployId=deploy.id;await save();}
 while(deploy.state==='preparing'){await delay(2000);deploy=await api(`/deploys/${receipt.deployId}`);}
 if(deploy.state==='error')throw new Error('Netlify rejected the upload manifest');
 const queue=[...(deploy.required??[])];let uploaded=0;receipt.requiredFiles=queue.length;receipt.status='uploading';await save();
 await Promise.all(Array.from({length:4},async()=>{while(queue.length){const sha=queue.shift(),file=bySha.get(sha);if(!file)throw new Error('Server requested an unknown digest');await api(`/deploys/${receipt.deployId}/files/${file.split('/').map(encodeURIComponent).join('/')}`,'PUT',await readFile(path.join(cfg.build,file)),true);uploaded++;if(uploaded%25===0)console.log(`Uploaded ${uploaded}/${receipt.requiredFiles}`);}}));
 for(let i=0;i<120;i++){deploy=await api(`/deploys/${receipt.deployId}`);if(deploy.state==='ready')break;if(deploy.state==='error')throw new Error('Netlify processing failed');await delay(2000);}
 if(deploy.state!=='ready')throw new Error('Deploy has not reached ready');
 receipt.url=deploy.ssl_url??`https://${cfg.siteName}.netlify.app`;receipt.permalink=deploy.deploy_ssl_url??`https://${receipt.deployId}--${cfg.siteName}.netlify.app`;receipt.status='ready';await save();
 const current=await api(`/sites/${cfg.siteId}`);if(current.published_deploy?.id!==receipt.deployId)throw new Error('Published deployment differs from uploaded deployment');
 const remote=await api(`/sites/${cfg.siteId}/files`);const remoteByPath=new Map(remote.map(f=>[f.path.toLowerCase(),f.sha]));
 const headerResponse=await fetch(receipt.url);if(!headerResponse.ok)throw new Error('Preview headers/entry page missing');
 for(const [p,v] of Object.entries(manifest)){
  if(['/','/_headers','/_redirects'].includes(p)&&!remoteByPath.has(p))continue; // Processed policy is checked above.
  if(remoteByPath.get(p.toLowerCase())!==v.sha1)throw new Error(`Remote digest mismatch: ${p}`);
 }
 receipt.remoteFilesMatched=Object.keys(manifest).length;receipt.protectedAfter=[];
 for(const id of cfg.protectedSiteIds)receipt.protectedAfter.push(siteSummary(await api(`/sites/${id}`)));
 if(JSON.stringify(receipt.protectedBefore)!==JSON.stringify(receipt.protectedAfter))throw new Error('An existing site changed during publication');
 const release=await fetch(new URL('release.json',receipt.url)).then(r=>r.json());if(release.sourceCommit!==receipt.sourceCommit)throw new Error('Public release metadata differs');
 const smoke=await Promise.all(['/dev/','/audit/','/this-file-must-not-exist.webp'].map(async p=>({path:p,status:(await fetch(new URL(p,receipt.url))).status})));
 if(smoke[0].status!==200||smoke[1].status!==200||smoke[2].status!==404)throw new Error('Online route/404 check failed');receipt.smoke=smoke;const devHeaders=await fetch(new URL('/dev/',receipt.url));if(!devHeaders.headers.get('x-robots-tag')?.includes('noindex'))throw new Error('Dev noindex header missing');await save();
 const code=await new Promise((resolve,reject)=>{const p=spawn('npm',['run','qa:v6'],{cwd:root,env:{...process.env,QA_URL:receipt.permalink+'/',QA_OUT:path.join(work,'online-qa')},stdio:'inherit'});p.once('error',reject);p.once('close',resolve);});
 if(code!==0)throw new Error('Online browser QA failed');
 const qa=JSON.parse(await readFile(path.join(work,'online-qa/qa.json'),'utf8'));receipt.onlineBrowserChecks=qa.checks.length;
 const motionCode=await new Promise((resolve,reject)=>{const p=spawn('node',['tools/v6-motion-qa.mjs'],{cwd:root,env:{...process.env,QA_URL:receipt.permalink+'/',QA_OUT:path.join(work,'online-motion')},stdio:'inherit'});p.once('error',reject);p.once('close',resolve);});
 if(motionCode!==0)throw new Error('Online glass motion QA failed');receipt.onlineMotion='passed';
 const archive=path.resolve('..','deployments',cfg.siteName,receipt.deployId);await mkdir(archive,{recursive:true});
 for(const file of Object.keys(manifest)){const dest=path.join(archive,'site',file.slice(1));await mkdir(path.dirname(dest),{recursive:true});try{const existing=await readFile(dest);if(hash(existing)!==manifest[file].sha256)throw new Error('Immutable archive differs');}catch(e){if(e.code!=='ENOENT')throw e;await copyFile(path.join(cfg.build,file.slice(1)),dest);}}
 receipt.archive=path.relative(path.resolve('..'),archive);receipt.status='verified';await save();
 for(const [name,data] of [['files.json',manifest],['deployment.json',receipt]]){
  try{await writeFile(path.join(archive,name),JSON.stringify(data,null,2)+'\n',{flag:'wx'});}catch(e){if(e.code!=='EEXIST')throw e;}
 }
 console.log(JSON.stringify({url:receipt.url,permalink:receipt.permalink,deployId:receipt.deployId,files:receipt.fileCount,onlineChecks:receipt.onlineBrowserChecks,oldSitesUnchanged:true}));
}catch(e){receipt.status='failed';receipt.error=e.message;await save();console.error(e.message);process.exitCode=1;}
