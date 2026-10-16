import {readFile,copyFile,mkdir,writeFile} from 'node:fs/promises';
import sharp from 'sharp';
const arg=process.argv[2]??'assets/source/visual-v2/generation-manifest.json';
const {assets}=JSON.parse(await readFile(arg,'utf8'));
for(const a of assets){
 if(!a.path) continue;
 const archive = (arg.includes('flat-options')||arg.includes('pure-pattern')) ? 'pure-patterns' : arg.includes('revised') ? 'final' : a.folder==='options' ? 'cards' : 'superseded';
 await mkdir(`assets/source/visual-v2/${archive}`,{recursive:true});
 await copyFile(a.path,`assets/source/visual-v2/${archive}/${a.id}.png`);
 if(archive==='superseded')continue;
 await mkdir(`public/media/${a.folder}`,{recursive:true});
 await sharp(a.path).resize(a.folder==='options'?640:1600,a.folder==='options'?480:undefined,{fit:a.folder==='options'?'cover':'inside',withoutEnlargement:true}).webp({quality:88,alphaQuality:100}).toFile(`public/media/${a.folder}/${a.id}.webp`);
}
console.log('Saved',assets.length,'assets; superseded poster compositions are source-only.');
