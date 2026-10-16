import{mkdir,cp,readdir,readFile,writeFile}from'node:fs/promises';
import{createHash}from'node:crypto';
const staging=process.argv[2];if(!staging?.startsWith('.codex-work/deploy/'))throw new Error('Provide a new project-local staging directory');
await mkdir(staging,{recursive:true});
const allowlist=['index.html','evidence.html','assets','china','fixed','marks','review/v3','review/floral-hq','review/floral-restored','backgrounds','cities/v4','review/v4','review/v4-color-coverage','review/v4-body-seam','review/fixed-relief-alignment','review/floral-cleanup-4.2'];
for(const name of allowlist)await cp(`dist/${name}`,`${staging}/${name}`,{recursive:true,errorOnExist:true,force:false,filter:p=>!p.split('/').pop().startsWith('._')});
// Only current content-addressed textures are published. Older exports stay local.
const runtime=JSON.parse(await readFile('src/styles/web-textures.json','utf8'));
await mkdir(`${staging}/textures`,{recursive:true});
for(const path of Object.values(runtime))await cp(`dist/${path}`,`${staging}/${path}`,{errorOnExist:true,force:false});
const files=[];
// ExFAT may create AppleDouble sidecars during cp even when its input filter
// excludes them. They are filesystem metadata, not Netlify release content.
async function walk(dir,prefix=''){for(const entry of await readdir(dir,{withFileTypes:true})){if(entry.name.startsWith('._'))continue;const p=prefix+entry.name;if(entry.isDirectory())await walk(dir+'/'+entry.name,p+'/');else{const data=await readFile(dir+'/'+entry.name);files.push({path:p,size:data.length,sha256:createHash('sha256').update(data).digest('hex'),sha1:createHash('sha1').update(data).digest('hex')});}}}
await walk(staging);files.sort((a,b)=>a.path.localeCompare(b.path));
const result={date:new Date().toISOString(),siteName:'guangcai-no1-china-v4',staging,allowlist,files,totalBytes:files.reduce((n,f)=>n+f.size,0)};
const recordDir=process.env.RELEASE_RECORD_DIR??'evidence/deployment/v4';
if(!recordDir.startsWith('evidence/deployment/'))throw new Error('Release record must be project local');
await mkdir(recordDir,{recursive:true});
await writeFile(recordDir+'/release-manifest.json',JSON.stringify(result,null,2));console.log(JSON.stringify({files:files.length,bytes:result.totalBytes,staging}));
