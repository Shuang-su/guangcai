import {readFile,writeFile,rename,readdir,unlink} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root='public/cities/v4/';
const catalog=JSON.parse(await readFile(root+'catalog.json','utf8'));
const shared=new Map();
const renamed=new Map();
const hash=async name=>{
 if(renamed.has(name))return renamed.get(name);
 const bytes=await readFile(root+name),digest=createHash('sha256').update(bytes).digest('hex').slice(0,16);
 if(shared.has(digest)){renamed.set(name,shared.get(digest));return shared.get(digest);}
 if(name.includes(digest)){shared.set(digest,name);renamed.set(name,name);return name;}
 const output=name.replace(/(\.hfn\.gz|\.webp)$/,`-${digest}$1`);
 await rename(root+name,root+output);shared.set(digest,output);renamed.set(name,output);return output;
};
for(const v of catalog.variants){for(const k of Object.keys(v.maps))v.maps[k]=await hash(v.maps[k]);v.thumbnail=await hash(v.thumbnail);}
catalog.labels??={china:'label-china.webp',shenzhen:'label-shenzhen.webp',he:'label-he.webp',create:'label-create.webp'};
for(const k of Object.keys(catalog.labels))catalog.labels[k]=await hash(catalog.labels[k]);
await writeFile(root+'catalog.json',JSON.stringify(catalog,null,2)+'\n');
await writeFile('src/styles/city-catalog.json',JSON.stringify(catalog,null,2)+'\n');
const active=new Set(['catalog.json','china-structural-lines.webp','shenzhen-structural-lines.webp','beijing-structural-lines.webp',...catalog.variants.flatMap(v=>[v.thumbnail,...Object.values(v.maps)]),...Object.values(catalog.labels)]);
// This directory contains compiler output only; preserve source/master folders.
for(const name of await readdir(root))if(!name.startsWith('._')&&!active.has(name))await unlink(root+name);
console.log(`V4 catalog: ${catalog.variants.length} compiled variants, aligned channels and labels with content hashes`);
