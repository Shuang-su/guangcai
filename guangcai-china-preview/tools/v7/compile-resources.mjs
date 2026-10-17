import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {gunzipSync,gzipSync} from 'node:zlib';
import {DataUtils} from 'three';
import sharp from 'sharp';

// Run from the application root. Originals are read-only. Outputs are reproducible.
const root='public/releases/v7-1',tiers={light:1024,standard:2048,detail:4096};
try{await fs.access(root+'/catalog.json');throw Error('v7-1 is immutable. Create a new release generator/configuration; do not overwrite a published catalog.');}catch(e){if(e.code!=='ENOENT')throw e;}
const hash=b=>createHash('sha256').update(b).digest('hex');
const catalog=JSON.parse(await fs.readFile('src/styles/city-catalog-v6.json','utf8'));
const fixedAtlas=JSON.parse(await fs.readFile('src/styles/fixed-rendering.json','utf8'));
const phrases={open:'开放包容',innovation:'创新驱动',cooperation:'合作共赢',sharing:'共建共享',together:'携手同心',ocean:'拥抱瀚海'};
await fs.mkdir(root+'/assets',{recursive:true});
const manifest={schemaVersion:1,releaseId:'v7-1',modelVersion:'china-cup-v6',recipeVersion:'porcelain-city-v6',fixed:{},cities:{},slogans:{}};
async function emit(id,bytes,width,height,encoding,source,channels=4,colorSpace='linear'){
 const sha256=hash(bytes),ext=encoding==='webp'?'webp':'hfn.gz',url=`assets/${id}-${sha256.slice(0,16)}.${ext}`;
 const dest=path.join(root,url);
 try {if(!Buffer.from(await fs.readFile(dest)).equals(bytes))throw Error('Immutable resource collision: '+dest);}
 catch(e){if(e.code==='ENOENT')await fs.writeFile(dest,bytes);else throw e;}
 const decodedBytes=width*height*(encoding==='webp'?channels:8);
 return {id,url,sha256,sourceSha256:hash(source),encoding,width,height,bytes:bytes.length,decodedBytes,gpuBytes:Math.ceil(decodedBytes*4/3),channels,colorSpace};
}
function dimensions(w,h,max,atlas){
 if(atlas){const gutter=Math.max(8,Math.round(atlas.gutter*max/w)),contentWidth=max-2*gutter,contentHeight=Math.max(1,Math.round(atlas.contentHeight*contentWidth/atlas.contentWidth));
  return {w:max,h:atlas.rows*(contentHeight+2*gutter),atlas:{rows:atlas.rows,contentWidth,contentHeight,gutter}};}
 const s=Math.min(1,max/Math.max(w,h));return {w:Math.round(w*s),h:Math.round(h*s)};
}
async function resizeImage(input,d,sourceAtlas){
 if(!sourceAtlas)return sharp(input).resize(d.w,d.h,{kernel:'lanczos3'}).png().toBuffer();
 const a=d.atlas,rows=[];
 for(let row=0;row<a.rows;row++){
  const tile=await sharp(input).extract({left:sourceAtlas.gutter,top:row*(sourceAtlas.contentHeight+2*sourceAtlas.gutter)+sourceAtlas.gutter,width:sourceAtlas.contentWidth,height:sourceAtlas.contentHeight}).resize(a.contentWidth,a.contentHeight).extend({top:a.gutter,bottom:a.gutter,left:a.gutter,right:a.gutter,extendWith:'copy'}).png().toBuffer();
  rows.push({input:tile,left:0,top:row*(a.contentHeight+2*a.gutter)});
 }
 return sharp({create:{width:d.w,height:d.h,channels:3,background:'#000'}}).composite(rows).png().toBuffer();
}
function resizeNormal(source,d,sourceAtlas){
 const raw=gunzipSync(source),w=raw.readUInt32LE(4),h=raw.readUInt32LE(8);
 if(raw.toString('ascii',0,4)!=='HFN1'||raw.length!==16+w*h*8)throw Error('Invalid HFN source');
 if(w===d.w&&h===d.h&&!sourceAtlas)return source;
 const input=new Uint16Array(raw.buffer,raw.byteOffset+16,w*h*4),out=Buffer.alloc(16+d.w*d.h*8);
 out.write('HFN1');out.writeUInt32LE(d.w,4);out.writeUInt32LE(d.h,8);out.writeUInt32LE(1,12);
 const data=new Uint16Array(out.buffer,out.byteOffset+16,d.w*d.h*4);
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
 for(let y=0;y<d.h;y++)for(let x=0;x<d.w;x++){
  let sx=(x+.5)*w/d.w-.5,sy=(y+.5)*h/d.h-.5;
  if(sourceAtlas){const a=d.atlas,rh=a.contentHeight+2*a.gutter,row=Math.floor(y/rh);
   sx=sourceAtlas.gutter+clamp((x-a.gutter+.5)/a.contentWidth,0,1)*sourceAtlas.contentWidth-.5;
   sy=row*(sourceAtlas.contentHeight+2*sourceAtlas.gutter)+sourceAtlas.gutter+clamp((y%rh-a.gutter+.5)/a.contentHeight,0,1)*sourceAtlas.contentHeight-.5;
   sx=clamp(sx,sourceAtlas.gutter,sourceAtlas.gutter+sourceAtlas.contentWidth-1);
   sy=clamp(sy,row*(sourceAtlas.contentHeight+2*sourceAtlas.gutter)+sourceAtlas.gutter,(row+1)*(sourceAtlas.contentHeight+2*sourceAtlas.gutter)-sourceAtlas.gutter-1);
  }
  sx=clamp(sx,0,w-1);sy=clamp(sy,0,h-1);
  const x0=Math.floor(sx),y0=Math.floor(sy),x1=Math.min(w-1,x0+1),y1=Math.min(h-1,y0+1),fx=sx-x0,fy=sy-y0;
  const offsets=[((h-1-y0)*w+x0)*4,((h-1-y0)*w+x1)*4,((h-1-y1)*w+x0)*4,((h-1-y1)*w+x1)*4];
  const weights=[(1-fx)*(1-fy),fx*(1-fy),(1-fx)*fy,fx*fy],n=[0,0,0];
  for(let k=0;k<3;k++)for(let j=0;j<4;j++)n[k]+=(DataUtils.fromHalfFloat(input[offsets[j]+k])*2-1)*weights[j];
  const length=Math.hypot(...n)||1,index=((d.h-1-y)*d.w+x)*4;
  for(let k=0;k<3;k++)data[index+k]=DataUtils.toHalfFloat(n[k]/length*.5+.5);
  data[index+3]=DataUtils.toHalfFloat(1);
 }
 return gzipSync(out,{level:9});
}
for(const region of ['body','handle','saucer']){
 const read=channel=>fs.readFile(`public/fixed/${region}-${channel}`);
 const color=await read('baseColor.png'),normal=await read('normal.hfn.gz'),rough=await read('roughness.png'),metal=await read('metalness.png');
 const meta=await sharp(color).metadata();manifest.fixed[region]={};
 for(const [tier,max]of Object.entries(tiers)){
  const d=dimensions(meta.width,meta.height,max,fixedAtlas[region]);
  const base=await sharp(await resizeImage(color,d,fixedAtlas[region])).webp({quality:88,effort:5}).toBuffer();
  const r=await sharp(await resizeImage(rough,d,fixedAtlas[region])).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const m=await sharp(await resizeImage(metal,d,fixedAtlas[region])).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const orm=Buffer.alloc(d.w*d.h*3);
  for(let i=0;i<d.w*d.h;i++){orm[i*3]=255;orm[i*3+1]=r.data[i*r.info.channels];orm[i*3+2]=m.data[i*m.info.channels];}
  manifest.fixed[region][tier]={...(d.atlas?{atlas:d.atlas}:{}),baseColor:await emit(`fixed-${region}-${tier}-color`,base,d.w,d.h,'webp',color,4,'srgb'),normal:await emit(`fixed-${region}-${tier}-normal`,resizeNormal(normal,d,fixedAtlas[region]),d.w,d.h,'hfn1-gzip',normal),orm:await emit(`fixed-${region}-${tier}-orm`,await sharp(orm,{raw:{width:d.w,height:d.h,channels:3}}).webp({lossless:true}).toBuffer(),d.w,d.h,'webp',Buffer.concat([rough,metal]))};
 }
 console.log('fixed',region);
}
for(const [id,city]of Object.entries(catalog.cities)){
 const source=await fs.readFile(`public/cities/v6/${city.mask}`),normal=await fs.readFile(`public/cities/v6/${city.normal}`),meta=await sharp(source).metadata();
 const thumb=await fs.readFile(`public/cities/v6/${id}-choice.webp`),tm=await sharp(thumb).metadata();
 const entry=manifest.cities[id]={name:city.name,thumbnail:await emit(`${id}-thumbnail`,thumb,tm.width,tm.height,'webp',thumb,4,'srgb'),levels:{}};
 for(const [tier,max]of Object.entries(tiers)){
  const d=dimensions(meta.width,meta.height,max);
  entry.levels[tier]={mask:await emit(`${id}-${tier}-mask`,await sharp(source).resize(d.w,d.h).webp({lossless:true}).toBuffer(),d.w,d.h,'webp',source,2),normal:await emit(`${id}-${tier}-normal`,resizeNormal(normal,d),d.w,d.h,'hfn1-gzip',normal)};
 }
 console.log('city',id);
}
for(const [id,text]of Object.entries(phrases)){
 const source=await fs.readFile(`public/cities/v6/slogan-${id}.webp`),{data,info}=await sharp(source).removeAlpha().raw().toBuffer({resolveWithObject:true});
 let left=info.width,top=info.height,right=0,bottom=0;
 for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*info.channels]){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
 left=Math.max(0,left-4);top=Math.max(0,top-4);right=Math.min(info.width-1,right+4);bottom=Math.min(info.height-1,bottom+4);
 const width=right-left+1,height=bottom-top+1,encoded=await sharp(source).extract({left,top,width,height}).webp({lossless:true}).toBuffer();
 manifest.slogans[id]={text,asset:await emit(`slogan-${id}`,encoded,width,height,'webp',source,1),uvRect:[left/info.width,1-(top+height)/info.height,width/info.width,height/info.height]};
}
const mark=await fs.readFile('public/marks/auratic-reference.png'),mb=await sharp(mark).resize({width:512}).webp({lossless:true}).toBuffer(),mm=await sharp(mb).metadata();
manifest.mark=await emit('mark',mb,mm.width,mm.height,'webp',mark,4,'srgb');
const manifestBytes=Buffer.from(JSON.stringify(manifest,null,2)+'\n'),manifestName=`manifest-${hash(manifestBytes).slice(0,16)}.json`;
await fs.writeFile(root+'/'+manifestName,manifestBytes);
const outputCatalog={schemaVersion:1,releaseId:manifest.releaseId,modelVersion:manifest.modelVersion,recipeVersion:manifest.recipeVersion,manifestUrl:manifestName,cities:Object.fromEntries(Object.entries(manifest.cities).map(([id,c])=>[id,{name:c.name,thumbnail:c.thumbnail.url}])),slogans:phrases,tiers:Object.keys(tiers)};
await fs.writeFile(root+'/catalog.json',JSON.stringify(outputCatalog,null,2)+'\n');
const bootstrap={schemaVersion:1,releaseId:manifest.releaseId,catalogUrl:'releases/v7-1/catalog.json',manifestUrl:`releases/v7-1/${manifestName}`,defaultDesign:{schemaVersion:1,resourceReleaseId:manifest.releaseId,modelVersion:manifest.modelVersion,recipeVersion:manifest.recipeVersion,cityId:'shenzhen',sloganId:'open',appearance:{preset:'gold',hue:41.80851063829786,saturation:100,lightness:63.13725490196078,material:1,materialX:.5,relief:1}}};
await fs.mkdir('public/api/v1',{recursive:true});await fs.writeFile('public/api/v1/bootstrap.json',JSON.stringify(bootstrap,null,2)+'\n');
const all=Object.values(manifest.fixed).flatMap(levels=>Object.values(levels).flatMap(l=>[l.baseColor,l.normal,l.orm])).concat(Object.values(manifest.cities).flatMap(c=>[c.thumbnail,...Object.values(c.levels).flatMap(l=>[l.mask,l.normal])]),Object.values(manifest.slogans).map(l=>l.asset),[manifest.mark]);
const initial=Object.values(manifest.fixed).flatMap(l=>[l.light.baseColor,l.light.normal,l.light.orm]).concat([manifest.cities.shenzhen.levels.light.mask,manifest.cities.shenzhen.levels.light.normal,manifest.slogans.open.asset,manifest.mark]);
const summary={releaseId:manifest.releaseId,files:all.length,bytes:all.reduce((n,a)=>n+a.bytes,0),initialBytes:initial.reduce((n,a)=>n+a.bytes,0),initialGpuBytes:initial.reduce((n,a)=>n+a.gpuBytes,0),source:'v6.0.1 / a231937',note:'GPU estimates exclude renderer targets, geometry and UI. No physical-device performance claim.'};
await fs.mkdir('evidence/v7',{recursive:true});await fs.writeFile('evidence/v7/resources.json',JSON.stringify(summary,null,2)+'\n');console.log(JSON.stringify(summary));
