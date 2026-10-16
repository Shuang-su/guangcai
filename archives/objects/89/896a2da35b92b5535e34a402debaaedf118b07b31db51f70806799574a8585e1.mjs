/** PBR data derivation, NOT artwork generation. Colour is extracted from the supplied original floral PSD.
 * Gold segmentation is based on chromaticity, relief on semantic paint boundary
 * and ink contours; never luminance-to-height. All maps share exact pixel crops. */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const fixedLayout=JSON.parse(await readFile('src/styles/fixed-layout.json','utf8'));
const out='public/fixed';await mkdir(out,{recursive:true});
const smooth = (a,b,x) => { const t=Math.max(0,Math.min(1,(x-a)/(b-a))); return t*t*(3-2*t); };
const physical=JSON.parse(await readFile('assets/surface-metrics.json','utf8'));
physical.body.width*=.5+fixedLayout.body.visibleEndFraction;
physical.saucer.width*=4; // one entire original arc, not a legacy quarter repeat
const configs = ['body','handle','saucer'].map(name=>({name,input:`assets/masters/v3/${name}.png`}));
const manifest = { version:1, provenance:'User supplied original 450 ml cup and 151 saucer decals, ICC converted from floral-export.psd.', method:'Gold: ochre chromaticity mask. Relief: paint silhouette plus bounded local chromatic ink ridges, then smoothed. No grayscale-color height conversion.', heightCalibration:"Artistic micro-relief only; not measured, no geometric displacement", regions:{} };
for (const c of configs) {
  let source=sharp(c.input); const meta=await source.metadata();
  if(c.crop) source=source.extract({left:Math.round(meta.width*c.crop[0]),top:Math.round(meta.height*c.crop[1]),width:Math.floor(meta.width*c.crop[2]),height:Math.floor(meta.height*c.crop[3])});
  // Original accepted layout: all regions use the original normalized crops and uniform cover.
  const {data,info}=await source.removeAlpha().raw().toBuffer({resolveWithObject:true});
  // Detect narrow dark strokes relative to their coloured neighbourhood.
  // Red petal hatching and green veins are not necessarily near-black.
  // This bounded ridge mask adds only local ink relief, never RGB shading as height.
  const neighbourhood=await sharp(data,{raw:{width:info.width,height:info.height,channels:3}}).blur(2).raw().toBuffer();
  const w=info.width,h=info.height,n=w*h, metal=Buffer.alloc(n),rough=Buffer.alloc(n),height=Buffer.alloc(n);
  for(let i=0;i<n;i++){
    const r=data[i*3]/255,g=data[i*3+1]/255,b=data[i*3+2]/255;
    // Ochre ground r:g:b near 1:.80:.43; cream petals are less saturated,
    // greens have higher g/r and reds lower g/r. Gold mask leaves enamel dielectric.
    const gr=g/Math.max(.01,r), br=b/Math.max(.01,r);
    const gold=smooth(.60,.70,gr)*(1-smooth(.87,.97,gr))*smooth(.22,.32,br)*(1-smooth(.53,.64,br))*smooth(.25,.42,r);
    metal[i]=Math.round(255*gold*.97);
    // Metallic base color represents reflectance, not a shaded ochre photograph.
    for(let k=0;k<3;k++)data[i*3+k]=Math.round(data[i*3+k]*(1-gold)+[255,200,70][k]*gold);
    rough[i]=Math.round(255*(.22*gold+.29*(1-gold)));
    const nr=neighbourhood[i*3]/255,ng=neighbourhood[i*3+1]/255,nb=neighbourhood[i*3+2]/255;
    const localContrast=Math.max(0,nr-r,ng-g,nb-b)/Math.max(.2,nr,ng,nb);
    const ink=Math.max(1-smooth(.20,.39,Math.max(r,g,b)),smooth(.035,.20,localContrast))*(1-gold);
    height[i]=Math.round(92+(1-gold)*24+ink*24);
    if(c.name==='body'&&Math.min(r,g,b)>.98){height[i]=92;rough[i]=41;metal[i]=0;}
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
  const region={offsetU:c.name==='saucer'?fixedLayout.saucer.sourceOffsetU:0,width:w,height:h,physical:physical[c.name],source:c.input,sourceSize:[meta.width,meta.height],crop:null,layout:'source-layout-v3',fit:'Full original region; all channels share UV2; full saucer circumference without mirroring',maps:{}};
  for(const [channel,buffer]of Object.entries(maps)){
    const filename=`${c.name}-${channel}.png`;
    await sharp(buffer,{raw:{width:w,height:h,channels:channel==='baseColor'||channel==='normal'?3:1}}).png().toFile(`${out}/${filename}`);
    region.maps[channel]={url:`${out.slice(7)}/${filename}`,sha256:createHash('sha256').update(await readFile(`${out}/${filename}`)).digest('hex')};
  }
  manifest.regions[c.name]=region;
}
manifest.version=7;
manifest.name='原始广彩花纸 · 450 杯 / 151 碟';
manifest.mapping='source-layout-v3';
manifest.renderStandard={relief:4.4,clearcoatRelief:2.4,specularIntensity:.85,clearcoat:.75,clearcoatRoughness:.14,exposure:1.08};
manifest.reliefRevision='Existing v5 height profile and strengths applied to the original source contours; visual approximation, not measured physical height.';
manifest.runtimeOffsets={saucerU:fixedLayout.saucer.sourceOffsetU};
manifest.layoutCalibration=fixedLayout;
await writeFile(`${out}/manifest.json`,JSON.stringify(manifest,null,2));
await writeFile(`${out}/style.json`,JSON.stringify({name:manifest.name,mapping:manifest.mapping,regions:Object.fromEntries(configs.map(c=>[c.name,{...Object.fromEntries(['baseColor','normal','roughness','metalness','height'].map(channel=>[channel,`${c.name}-${channel}.png`])),offsetU:c.name==='saucer'?fixedLayout.saucer.sourceOffsetU:0}]))},null,2));
console.log(JSON.stringify({out,regions:Object.fromEntries(Object.entries(manifest.regions).map(([k,v])=>[k,[v.width,v.height]]))}));
