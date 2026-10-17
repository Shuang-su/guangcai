import {readFile,writeFile,mkdir,readdir,stat} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));process.chdir(root);
const cfg=JSON.parse(await readFile('tools/v6-pipeline.json'));
const work=path.resolve(cfg.work);await mkdir(work,{recursive:true});
const hash=b=>createHash('sha256').update(b).digest('hex');
async function files(dir,base=dir){const result=[];for(const name of await readdir(dir)){if(name.startsWith('.'))continue;const f=path.join(dir,name);if((await stat(f)).isDirectory())result.push(...await files(f,base));else result.push(path.relative(base,f));}return result.sort();}
const report={date:new Date().toISOString(),status:'running',steps:[],sourceHashes:{}};
const save=()=>writeFile(path.join(work,'prepare.json'),JSON.stringify(report,null,2));
async function run(name,cmd,args,env={}){const start=Date.now();console.log(name);const code=await new Promise((resolve,reject)=>{const p=spawn(cmd,args,{cwd:root,env:{...process.env,...env},stdio:'inherit'});p.once('error',reject);p.once('close',resolve);});report.steps.push({name,code,durationMs:Date.now()-start});await save();if(code!==0)throw Error(name+' failed');}
let server;
try{
 const reviewBytes=await readFile(cfg.review),review=JSON.parse(reviewBytes);
 if(review.status!=='agent-reviewed')throw Error('Visual source review missing');
 if(!(await readFile('design-qa.md','utf8')).includes('final result: passed'))throw Error('Design QA has not passed');
 const spec=JSON.parse(await readFile('assets/masters/v6/cities.json'));
 if(spec.cities.length!==23)throw Error('V6 requires exactly 23 supplied cities');
 for(const c of spec.cities){const sha=hash(await readFile(c.source));if(review.cities[c.id]?.sha256!==sha)throw Error('Source changed: '+c.id);report.sourceHashes[c.id]=sha;}
 report.reviewSha256=hash(reviewBytes);
 await run('unit and contract tests','npm',['test']);
 await run('23-city/font asset checks','node',['tools/v6-asset-validation.mjs']);
 report.assetValidation=JSON.parse(await readFile(path.join(work,'asset-validation.json')));
 const before=await readFile('evidence/web-textures.json');
 try{await run('shared consumer/dev/audit build','npm',['run','build','--','--outDir',cfg.build]);}
 finally{const a=JSON.parse(await readFile('evidence/web-textures.json')),b=JSON.parse(before);delete a.date;delete b.date;if(JSON.stringify(a)===JSON.stringify(b))await writeFile('evidence/web-textures.json',before);}
 await writeFile(path.join(cfg.build,'_headers'),'/*\n  Cache-Control: public, max-age=0, must-revalidate\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n/dev/*\n  X-Robots-Tag: noindex, nofollow\n/audit/*\n  X-Robots-Tag: noindex, nofollow\n/review/*\n  X-Robots-Tag: noindex, nofollow\n/manifest.webmanifest\n  Content-Type: application/manifest+json\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n');
 await writeFile(path.join(cfg.build,'_redirects'),'/dev /dev/ 301\n/audit /audit/ 301\n');
 await writeFile(path.join(cfg.build,'robots.txt'),'User-agent: *\nDisallow: /dev/\nDisallow: /audit/\nDisallow: /review/\n');
 const url=`http://127.0.0.1:${cfg.localPort}/`;
 server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port',String(cfg.localPort),'--strictPort','--outDir',cfg.build],{stdio:['ignore','pipe','pipe']});server.stderr.on('data',b=>process.stderr.write(b));
 for(let i=0;i<60;i++){try{if((await fetch(url)).ok)break;}catch{}if(i===59)throw Error('Built preview unavailable');await new Promise(r=>setTimeout(r,200));}
 await run('built V6 browser checks','node',['tools/v6-qa.mjs'],{QA_URL:url,QA_OUT:path.join(work,'local-qa')});
 await run('same-frame glass motion and original menu morph','node',['tools/v6-motion-qa.mjs'],{QA_URL:url,QA_OUT:path.join(work,'motion-qa')});
 await run('mobile WebKit isolated glass and viewport regression','node',['tools/v6-webkit-qa.mjs'],{QA_URL:url,QA_OUT:path.join(work,'webkit-qa')});
 report.webkit=JSON.parse(await readFile(path.join(work,'webkit-qa/webkit-qa.json')));
 await run('slow startup, touch navigation and repeated city return','node',['tools/v6-startup-qa.mjs'],{QA_URL:url,QA_OUT:path.join(work,'startup-qa')});
 report.startup=JSON.parse(await readFile(path.join(work,'startup-qa/startup-qa.json')));
 await run('isolated refraction pixels, collapse anchors and context loss','node',['tools/v6-liquid-qa.mjs'],{QA_URL:url,QA_OUT:path.join(work,'liquid-qa')});
 report.liquid=JSON.parse(await readFile(path.join(work,'liquid-qa/liquid-qa.json')));
 await run('legacy haptic paths in dev','node',['tools/ios-haptics-qa.mjs'],{QA_URL:url+'dev/',QA_OUT:path.join(work,'legacy-haptics')});
 const qa=JSON.parse(await readFile(path.join(work,'local-qa/qa.json')));if(qa.status!=='passed')throw Error('Browser checks incomplete');
 report.browserChecks=qa.checks.length;
 await writeFile(path.join(cfg.build,'audit/verification.json'),JSON.stringify({version:JSON.parse(await readFile('package.json','utf8')).version,status:'browser-and-asset-checks-passed',checks:qa.checks,webkit:report.webkit,startup:report.startup,liquid:report.liquid,physicalDevices:'iOS 27 failures observed on 6.0.0 and 6.0.1; 6.0.3 isolated liquid refraction and collapse-anchor fixes await physical device retest',sourceReview:review,glassParity:JSON.parse(await readFile(path.join(work,'local-qa/glass-parity.json')))},null,2)+'\n');
 report.authorityHashes={};for(const dir of ['src','vendor','assets/source/v6','assets/masters/v6','tools'])for(const file of await files(dir))report.authorityHashes[dir+'/'+file]=hash(await readFile(path.join(dir,file)));
 for(const file of ['package.json','package-lock.json','index.html','public/manifest.webmanifest','dev/index.html','audit/index.html','audit/glass.html','vite.config.ts','design-qa.md'])report.authorityHashes[file]=hash(await readFile(file));
 report.buildFiles={};for(const file of await files(cfg.build))report.buildFiles[file]=hash(await readFile(path.join(cfg.build,file)));
 report.status='passed';await save();console.log(`Prepared ${Object.keys(report.buildFiles).length} files with ${qa.checks.length} browser checks. Physical iPhone verification remains pending.`);
}catch(e){report.status='failed';report.error=String(e);await save();console.error(e);process.exitCode=1;}
finally{server?.kill('SIGTERM');}
