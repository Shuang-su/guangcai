import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
// Original, editable pigment / polished-glass maps. No poster pixels or logos.
const out='public/materials/ribbons',W=768,H=192;
await mkdir(out,{recursive:true});
const palettes={cyan:['#076e93','#13c2cb','#d0fafa'],blue:['#111674','#2764cd','#daeaff'],coral:['#830e39','#ee364e','#ffded4'],amber:['#b85308','#ffad46','#fff5db'],mint:['#005e50','#20c8a7','#dcfff2'],violet:['#382469','#7d78c4','#f2e6ff']};
const rgb=s=>s.match(/\w\w/g).map(x=>parseInt(x,16));
const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
// An independently drawn flowing cloud curl, for the expanded end of selected leaves.
const cloud=`<svg xmlns="http://www.w3.org/2000/svg" width="768" height="192" viewBox="0 0 768 192"><g transform="translate(612 93) rotate(-8)" fill="none" stroke="#edffff" stroke-linecap="round"><path d="M-46 17 C-14 18 27 16 31-7 C35-29 5-39 -4-20 C-11-6 7 6 14-5" stroke-width="5" opacity=".65"/><path d="M-37 35 C-1 27 13 33 36 19 C60 4 52-20 44-30" stroke-width="2.5" opacity=".58"/><path d="M-13 43 C26 39 43 37 56 24" stroke-width="1.4" opacity=".38"/></g></svg>`;
await writeFile(out+'/cloud-source.svg',cloud);
for(const [name,stops] of Object.entries(palettes)){
 const px=Buffer.alloc(W*H*3),rough=Buffer.alloc(W*H*3),normal=Buffer.alloc(W*H*3),coat=Buffer.alloc(W*H*3);
 const [dark,mid,light]=stops.map(s=>rgb(s.slice(1)));
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){
  const u=x/(W-1),v=y/(H-1),edge=Math.pow(Math.abs(v-.5)*2,12);
  const lightFace=.10+.56*Math.pow(u,.8)+.16*Math.pow(Math.sin(v*Math.PI),.8);
  let col=mix(mid,light,lightFace);col=mix(col,dark,edge*.64);
  // The moving reflections come from mesh normals; this is only a restrained pigment shift.
  col=mix(col,mid,(.5+.5*Math.sin(u*8-1))*.18);
  const at=(y*W+x)*3,n=95-65*edge;
  for(let c=0;c<3;c++){px[at+c]=Math.round(col[c]);rough[at+c]=n;coat[at+c]=245;}
  normal[at]=128+Math.round(Math.cos(u*11+v*3)*1);normal[at+1]=128+Math.round(Math.sin(v*10)*2);normal[at+2]=255;
 }
 let base=sharp(px,{raw:{width:W,height:H,channels:3}});
 if(['cyan','blue','amber'].includes(name))base=base.composite([{input:Buffer.from(cloud)}]);
 await base.png().toFile(`${out}/${name}-baseColor.png`);
 if(name==='cyan'){
  for(const [key,b]of Object.entries({roughness:rough,normal,clearcoat:coat,metalness:Buffer.alloc(W*H*3)}))await sharp(b,{raw:{width:W,height:H,channels:3}}).png().toFile(`${out}/${key}.png`);
 }
}
await writeFile(out+'/material.json',JSON.stringify({version:'petal-glass-v1',source:'tools/build-ribbon-maps.mjs',palettes:Object.keys(palettes),cloud:'Original vector cloud curl; not traced from poster',channels:['baseColor','normal','roughness','metalness','clearcoat'],metalness:0,ior:1.48,kind:'Artist authored PBR approximation, not measured glass'},null,2));
