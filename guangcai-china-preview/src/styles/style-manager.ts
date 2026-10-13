import { ClampToEdgeWrapping, MirroredRepeatWrapping, RepeatWrapping, NoColorSpace, SRGBColorSpace, Texture } from 'three';
import { setRegionMaps, type Maps, type Materials, type Region } from '../materials/materials';
import {loadTexture} from './load-texture';
import {loadFloatNormal} from './float-normal';
import webTextures from './web-textures.json';
import fixedLayout from './fixed-layout.json';
export interface RegionPack {baseColor:string;normal?:string;normalFormat?:'rgba16f-gzip-v1';roughness?:string;metalness?:string;height?:string;offsetU?:number}
export interface StylePack {mapping?:'source-layout-v3';name:string;regions:Record<Region,RegionPack>}
export const defaultPack:StylePack={name:'原始广彩花纸 · 450 杯 / 151 碟',mapping:'source-layout-v3',regions:Object.fromEntries(['body','handle','saucer'].map(region=>[region,Object.fromEntries(['baseColor','normal','roughness','metalness'].map(k=>[k,`${import.meta.env.BASE_URL}${webTextures[`fixed/${region}-${k}` as keyof typeof webTextures]}`]))])) as unknown as unknown as StylePack['regions']};
defaultPack.regions.saucer.offsetU=fixedLayout.saucer.sourceOffsetU;
for(const entry of Object.values(defaultPack.regions))if(entry.normal?.endsWith('.hfn.gz'))entry.normalFormat='rgba16f-gzip-v1';
export const builtinStyles = [
  {id:'original',name:defaultPack.name,description:'繁花、果实与蝶叶 · 原有款',path:'artwork',pack:defaultPack},
  ...[
    {id:'peony-magnolia',name:'牡丹玉兰 · 金地',description:'珊瑚牡丹、白玉兰与翠叶'},
    {id:'lotus-butterfly',name:'莲荷双蝶 · 金地',description:'粉莲、青荷与两只彩蝶'},
  ].map(style=>({...style,path:`artwork/${style.id}`,pack:{name:style.name,regions:Object.fromEntries(['body','handle','saucer'].map(region=>[region,Object.fromEntries(['baseColor','normal','roughness','metalness','height'].map(channel=>[channel,`${import.meta.env.BASE_URL}artwork/${style.id}/${region}-${channel}.png?v=dense-v3-final`]))])) as unknown as StylePack['regions']}}))
];
const channels=['baseColor','normal','roughness','metalness','height'] as const;
const regions:Region[]=['body','handle','saucer'];
export class StyleManager {
  private mapping:StylePack['mapping'];
  private offsets:Partial<Record<Region,number>>={};
  private aspects:Record<Region,number>={body:45.0294947/106.7,handle:11.9/117.6181655,saucer:106.1072919/7.1867934};
  fit(aspects:Record<Region,number>){
    this.aspects=aspects;
    for(const region of regions)for(const texture of Object.values(this.currentMaps[region]??{})){
      const img=texture.image as HTMLImageElement;
      if(this.mapping==='source-layout-v3'){texture.repeat.set(1,1);texture.offset.set(this.offsets[region]??0,0);texture.updateMatrix();continue;}
      const source=img.width/img.height,target=aspects[region];
      const x=Math.min(1,target/source),y=Math.min(1,source/target);
      texture.repeat.set(x,y);texture.offset.set((1-x)/2+(this.offsets[region]??0),(1-y)/2);texture.updateMatrix();
    }
  }
  private revision=0;
  private owned:Texture[]=[];
  currentName='正在载入花纸';
  currentMaps:Partial<Record<Region,Maps>>={};
  constructor(private materials:Materials,private anisotropy:number,private onChange:()=>void){}
  async apply(pack:StylePack):Promise<boolean>{
    const revision=++this.revision;
    if(!pack||typeof pack.name!=='string'||!pack.regions)throw new Error('无效材质包：缺少 name / regions');
    if(pack.mapping!==undefined&&pack.mapping!=='source-layout-v3')throw new Error('不支持的花纸展开规范');
    const tasks:{region:Region;channel:typeof channels[number];url:string;normalFormat?:RegionPack['normalFormat']}[]=[];
    for(const region of regions){
      const entry=pack.regions[region];
      if(!entry?.baseColor)throw new Error(`材质包缺少 ${region}.baseColor`);
      if(entry.offsetU!==undefined&&(!Number.isFinite(entry.offsetU)||Math.abs(entry.offsetU)>2))throw new Error('花纸定位无效');
      if(entry.normalFormat!==undefined&&(entry.normalFormat!=='rgba16f-gzip-v1'||!entry.normal))throw new Error('高精度法线格式无效');
      for(const channel of channels)if(entry[channel])tasks.push({region,channel,url:entry[channel]!,normalFormat:channel==='normal'?entry.normalFormat:undefined});
    }
    const results=await Promise.allSettled(tasks.map(async task=>{
      const texture:Texture=task.normalFormat?await loadFloatNormal(task.url):await loadTexture(task.url);
      const img=texture.image as {width:number;height:number};
      if(!img.width||!img.height||img.width>8192||img.height>8192){texture.dispose();throw new Error('贴图尺寸必须在 1–8192 像素内');}
      texture.colorSpace=task.channel==='baseColor'?SRGBColorSpace:NoColorSpace;
      texture.channel=pack.mapping==='source-layout-v3'?2:0;
      texture.wrapS=task.region==='saucer'?(pack.mapping==='source-layout-v3'?RepeatWrapping:MirroredRepeatWrapping):ClampToEdgeWrapping;
      texture.wrapT=ClampToEdgeWrapping;texture.anisotropy=this.anisotropy;
      return texture;
    }));
    const textures=results.flatMap(r=>r.status==='fulfilled'?[r.value]:[]);
    const release=()=>textures.forEach(t=>t.dispose());
    if(revision!==this.revision){release();return false;}
    if(results.some(r=>r.status==='rejected')){release();throw new Error('有贴图未能读取；已保留当前图案。检查文件或跨域设置。');}
    const maps={} as Record<Region,Maps>;
    tasks.forEach((task,i)=>{maps[task.region]??={} as Maps;maps[task.region][task.channel]=textures[i];});
    for(const region of regions){
      const map=maps[region],{width,height}=map.baseColor.image as HTMLImageElement;
      if(Object.values(map).some(t=>(t.image as HTMLImageElement).width!==width||(t.image as HTMLImageElement).height!==height)){
        release();throw new Error(`${region} 的 PBR 通道像素尺寸不一致，未应用。`);
      }
    }
    // Atomic swap: only after EVERY channel decodes and passes alignment checks.
    regions.forEach(region=>setRegionMaps(this.materials.regions[region],maps[region]));
    this.owned.forEach(t=>t.dispose());this.owned=textures;
    this.mapping=pack.mapping;this.currentMaps=maps;this.offsets=Object.fromEntries(regions.map(r=>[r,pack.regions[r].offsetU??0]));this.fit(this.aspects);this.currentName=pack.name;this.onChange();return true;
  }
  async flatFile(file:File){
    if(!file.type.startsWith('image/'))throw new Error('请选择 PNG、JPEG 或 WebP 图片');
    const url=URL.createObjectURL(file);
    try{return await this.apply({name:`平面印花 · ${file.name}`,regions:{body:{baseColor:url},handle:{baseColor:url},saucer:{baseColor:url}}});}
    finally{URL.revokeObjectURL(url);}
  }
  async folder(files:File[]){
    const manifest=files.find(f=>f.name==='style.json');if(!manifest)throw new Error('文件夹内需要 style.json');
    const pack=JSON.parse(await manifest.text()) as StylePack,urls:string[]=[];
    const base=manifest.webkitRelativePath.split('/').slice(0,-1).join('/');
    try{
      for(const region of regions)for(const channel of channels){
        const path=pack.regions?.[region]?.[channel];if(!path)continue;
        if(path.includes('..')||path.includes('://'))throw new Error('本地材质包只接受包内相对路径');
        const f=files.find(f=>f.webkitRelativePath===`${base}/${path}`||f.name===path);
        if(!f)throw new Error(`找不到 ${path}`);
        const url=URL.createObjectURL(f);urls.push(url);pack.regions[region][channel]=url;
      }
      return await this.apply(pack);
    }finally{urls.forEach(url=>URL.revokeObjectURL(url));}
  }
  precision(){return Object.fromEntries(Object.entries(this.currentMaps).map(([region,m])=>{const image=m.normal?.image as {width:number;height:number}|undefined;return [region,{normalType:m.normal?.type,normalSize:[image?.width,image?.height],precision:m.normal?.userData.precision??'8-bit',normalFlipY:m.normal?.flipY}]}));}
  dispose(){++this.revision;this.owned.forEach(t=>t.dispose());this.owned=[];}
}
