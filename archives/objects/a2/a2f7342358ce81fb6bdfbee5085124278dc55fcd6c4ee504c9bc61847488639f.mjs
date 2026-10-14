// Editable procedural authoring, not measured glass or inferred AI normal maps.
// Channels follow Three.js: roughness G, metalness B, clearcoat R, tangent normal RGB.
import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
const size=256,out='public/materials/liuli';await mkdir(out,{recursive:true});
const channels=['baseColor','normal','roughness','metalness','clearcoat'];
for(const kind of channels){
 const pixels=Buffer.alloc(size*size*3);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const u=x/(size-1),v=y/(size-1),edge=Math.pow(Math.abs(v-.5)*2,5),wave=Math.sin(u*12+v*3);
  let rgb;
  if(kind==='baseColor')rgb=[215+35*edge,232+23*edge,244+11*edge];
  else if(kind==='normal')rgb=[128+Math.cos(u*12+v*3)*3,128+Math.sin(v*18+u*2)*4,255];
  else if(kind==='roughness'){const n=70-46*edge+wave*9;rgb=[n,n,n];}
  else if(kind==='metalness')rgb=[0,0,0]; // Tinted glass is dielectric, never metallic.
  else {const n=185+70*edge;rgb=[n,n,n];}
  const at=(y*size+x)*3;rgb.forEach((n,i)=>pixels[at+i]=Math.round(n));
 }
 await sharp(pixels,{raw:{width:size,height:size,channels:3}}).png().toFile(`${out}/${kind}.png`);
}
await writeFile(`${out}/material.json`,JSON.stringify({version:'liuli-pbr-v1',source:'tools/build-liuli-maps.mjs',kind:'artist-authored procedural dielectric',channels,baseColorSpace:'sRGB',dataMapColorSpace:'none',metalness:0,ior:1.46,clearcoat:'map-controlled',notes:'Glass reflections from independent studio environment; gold trim uses a separate metallic material.'},null,2));
console.log('Authored 5 liuli PBR maps');
