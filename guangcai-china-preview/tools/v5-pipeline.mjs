// Repeatable, fail-closed preparation. Generation is an explicit ImageGen step;
// this pipeline never invents a visual approval or calls an unconfigured AI API.
import {readFile,writeFile,mkdir,readdir,stat} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));process.chdir(root);
const cfg=JSON.parse(await readFile('tools/v5-pipeline.json','utf8'));
const work=path.resolve(cfg.work);await mkdir(work,{recursive:true});
const digest=b=>createHash('sha256').update(b).digest('hex');
const report={date:new Date().toISOString(),status:'running',steps:[],sourceHashes:{}};
const save=()=>writeFile(path.join(work,'prepare.json'),JSON.stringify(report,null,2));
async function run(name,command,args,env={}){
 console.log(`\n[${name}]`);const start=Date.now();
 const code=await new Promise((resolve,reject)=>{const p=spawn(command,args,{cwd:root,env:{...process.env,...env},stdio:'inherit'});p.once('error',reject);p.once('close',resolve);});
 report.steps.push({name,code,durationMs:Date.now()-start});await save();if(code!==0)throw new Error(`${name} failed (${code})`);
}
async function files(dir,base=dir){let result=[];for(const name of await readdir(dir)){if(name.startsWith('.'))continue;const f=path.join(dir,name);if((await stat(f)).isDirectory())result.push(...await files(f,base));else result.push(path.relative(base,f));}return result.sort();}
let server;
try{
 const reviewBytes=await readFile(cfg.review);const review=JSON.parse(reviewBytes);
 if(review.status!=='agent-reviewed')throw new Error('Artwork visual review is required');
 const spec=JSON.parse(await readFile('assets/masters/v5/cities.json','utf8'));
 for(const c of spec.cities){const r=review.cities[c.id];const hash=digest(await readFile(c.source));if(!r||r.source!==c.source||r.sha256!==hash||Object.values(r.checks).some(v=>v!==true))throw new Error(`Source changed or review incomplete: ${c.id}`);report.sourceHashes[c.id]=hash;}
 report.reviewSha256=digest(reviewBytes);report.steps.push({name:'source-hash and visual-review gate',code:0});await save();
 const python=process.env.CITY_PYTHON??'python3';
 await run('compile',python,['tools/compile-city-v5.py',...(process.argv.includes('--trace')?['--trace']:[])]);
 await run('asset checks',python,['tools/test_city_v5_assets.py']);
 await run('application tests','npm',['test']);
 const historic=await readFile('evidence/web-textures.json');
 try{await run('production build','npm',['run','build','--','--outDir',cfg.build]);}
 finally{const now=JSON.parse(await readFile('evidence/web-textures.json','utf8')),old=JSON.parse(historic);delete now.date;delete old.date;if(JSON.stringify(now)===JSON.stringify(old))await writeFile('evidence/web-textures.json',historic);}
 // This is a standalone preview, intentionally absent from search indexing.
 await writeFile(path.join(cfg.build,'_headers'),'/*\n  Cache-Control: public, max-age=0, must-revalidate\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Robots-Tag: noindex, nofollow\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n');
 await writeFile(path.join(cfg.build,'robots.txt'),'User-agent: *\nDisallow: /\n');
 const url=`http://127.0.0.1:${cfg.localPort}/`;
 server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port',String(cfg.localPort),'--strictPort','--outDir',cfg.build],{cwd:root,stdio:['ignore','pipe','pipe']});
 let exited=false;server.on('exit',()=>exited=true);server.stderr.on('data',b=>process.stderr.write(b));
 for(let i=0;i<50;i++){if(exited)throw new Error('Preview server exited');try{if((await fetch(url)).ok)break;}catch{}await new Promise(r=>setTimeout(r,200));if(i===49)throw new Error('Preview server unavailable');}
 await run('local browser QA','npm',['run','qa:v5'],{QA_URL:url,QA_OUT:path.join(work,'local-qa')});
 const qa=JSON.parse(await readFile(path.join(work,'local-qa/qa.json'),'utf8'));if(qa.errors.length||qa.checks.length<45)throw new Error('Incomplete browser QA');
 report.browserChecks=qa.checks.length;report.buildFiles={};
 for(const f of await files(cfg.build))report.buildFiles[f]=digest(await readFile(path.join(cfg.build,f)));
 report.authorityHashes={};for(const f of [cfg.review,'tools/v5-pipeline.mjs','tools/deploy-v5.mjs','tools/compile-city-v5.py','tools/test_city_v5_assets.py','tools/v5-pipeline.json','assets/masters/v5/cities.json',...spec.cities.flatMap(c=>[c.source,`assets/masters/v5/${c.id}.svg`])])report.authorityHashes[f]=digest(await readFile(f));
 report.status='passed';await save();console.log(`Prepared ${Object.keys(report.buildFiles).length} files. Commit the reviewed source, then run npm run deploy:v5.`);
}catch(e){report.status='failed';report.error=e.message;await save();process.exitCode=1;console.error(e.message);}
finally{if(server&&!server.killed)server.kill('SIGTERM');}
