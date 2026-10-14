/** PBR data derivation, NOT artwork generation. Color images are generated masters.
 * Gold segmentation is based on chromaticity, relief on semantic paint boundary
 * and ink contours; never luminance-to-height. All maps share exact pixel crops. */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const out = 'public/artwork'; await mkdir(out, { recursive: true });
const smooth = (a,b,x) => { const t=Math.max(0,Math.min(1,(x-a)/(b-a))); return t*t*(3-2*t); };
const configs = [
  { name: 'body', input: 'assets/masters/body-generated.png', width:1024,height:2048 },
  { name: 'handle', input: 'assets/masters/body-generated.png', crop:[.47,.07,.22,.82], width:384,height:1536 },
  { name: 'saucer', input: 'assets/masters/band-generated.png', crop:[0,.38,1,.25], width:2172,height:181 },
];
const manifest = { version:1, provenance:'Built-in image_gen; new reference-inspired artwork, not official artwork.', method:'Gold: ochre chromaticity mask. Relief: paint silhouette and dark chromatic ink contours, then smoothed. No grayscale-color height conversion.', maxReliefMm:.045, regions:{} };
for (const c of configs) {
  let source=sharp(c.input); const meta=await source.metadata();
  if(c.crop) source=source.extract({left:Math.round(meta.width*c.crop[0]),top:Math.round(meta.height*c.crop[1]),width:Math.floor(meta.width*c.crop[2]),height:Math.floor(meta.height*c.crop[3])});
  const {data,info}=await source.resize(c.width,c.height).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const w=info.width,h=info.height,n=w*h, metal=Buffer.alloc(n),rough=Buffer.alloc(n),height=Buffer.alloc(n);
  for(let i=0;i<n;i++){
    const r=data[i*3]/255,g=data[i*3+1]/255,b=data[i*3+2]/255;
    // Ochre ground r:g:b near 1:.80:.43; cream petals are less saturated,
    // greens have higher g/r and reds lower g/r. Gold mask leaves enamel dielectric.
    const gr=g/Math.max(.01,r), br=b/Math.max(.01,r);
    const gold=smooth(.60,.70,gr)*(1-smooth(.87,.97,gr))*smooth(.22,.32,br)*(1-smooth(.53,.64,br))*smooth(.25,.42,r);
    metal[i]=Math.round(255*gold*.97);
    rough[i]=Math.round(255*(.22*gold+.29*(1-gold)));
    const ink=(1-smooth(.20,.39,Math.max(r,g,b)))*(1-gold);
    height[i]=Math.round(92+(1-gold)*24+ink*16);
  }
  const blurred=await sharp(height,{raw:{width:w,height:h,channels:1}}).blur(.8).greyscale().raw().toBuffer();
  const normal=Buffer.alloc(n*3);
  const at=(x,y)=>blurred[Math.max(0,Math.min(h-1,y))*w+Math.max(0,Math.min(w-1,x))]/255;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const dx=(at(x+1,y)-at(x-1,y))*1.6,dy=(at(x,y+1)-at(x,y-1))*1.6;
    const norm=Math.sqrt(dx*dx+dy*dy+1),i=(y*w+x)*3;
    normal[i]=Math.round((-dx/norm*.5+.5)*255); normal[i+1]=Math.round((dy/norm*.5+.5)*255); normal[i+2]=Math.round((1/norm*.5+.5)*255);
  }
  const maps={baseColor:data,metalness:metal,roughness:rough,height:blurred,normal};
  const region={width:w,height:h,maps:{}};
  for(const [channel,buffer]of Object.entries(maps)){
    const filename=`${c.name}-${channel}.png`;
    await sharp(buffer,{raw:{width:w,height:h,channels:channel==='baseColor'||channel==='normal'?3:1}}).png().toFile(`${out}/${filename}`);
    region.maps[channel]={url:`artwork/${filename}`,sha256:createHash('sha256').update(await readFile(`${out}/${filename}`)).digest('hex')};
  }
  manifest.regions[c.name]=region;
}
await writeFile(`${out}/manifest.json`,JSON.stringify(manifest,null,2));
console.log(JSON.stringify(manifest,null,2));
