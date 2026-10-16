import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const output='docs/handoff-manifest.json',files=[];
async function walk(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){
 if(e.name.startsWith('.')||['node_modules','.codex-work'].includes(e.name))continue;
 const path=dir?`${dir}/${e.name}`:e.name;if(path===output)continue;
 if(e.isDirectory()){await walk(path);continue;}if(!e.isFile())continue;
 const b=await fs.readFile(path);files.push({file:path,bytes:b.length,sha256:createHash('sha256').update(b).digest('hex')});
}}
await walk('.');
// Normalize before excluding self: traversal starts with './'.
const normalized=files.map(f=>({...f,file:f.file.replace(/^\.\//,'')})).filter(f=>f.file!==output).sort((a,b)=>a.file.localeCompare(b.file));
await fs.writeFile(output,JSON.stringify({scope:'Editable H5 sources, assets, documents, evidence and dist; excludes node_modules, .codex-work, dotfiles and self',generatedAt:new Date().toISOString(),files:normalized},null,2));
for(const f of normalized){const b=await fs.readFile(f.file);if(createHash('sha256').update(b).digest('hex')!==f.sha256)throw Error('Changed during manifest verification: '+f.file);}
console.log(`Verified ${normalized.length} handoff files`);
