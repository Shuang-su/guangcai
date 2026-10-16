import { CanvasTexture, ClampToEdgeWrapping, NoColorSpace, SRGBColorSpace, Texture, type MeshPhysicalMaterial, type MeshBasicMaterial } from 'three';
import {loadTexture} from './load-texture';
import {loadFloatNormal} from './float-normal';
import {setPorcelainCoverage} from '../materials/porcelain';
import webTextures from './web-textures.json';
import {installCityParameters} from '../materials/city-parametric';
import {normalizeAppearance,type Appearance} from './city-appearance';
import type {CityLevel,Label} from '../resources/types';
import type {ResourcePool,Lease} from '../resources/pool';

export interface CityArtworkPack {
  runtime?:CityLevel&{label:Label};
  id: string; version: number; name: string; layout: 'blank-300deg-v1';
  placement?: {scale:number;offsetU:number;offsetV:number};
  baseColor: string; normal: string; roughness: string; metalness: string; height?: string;
  coverage?:string; clearcoat?:string; normalEncoding?:'rgba16f';
  finish?:'enamel'|'metal'|'paint';
  label?:{source?:string;color?:string;hidden?:boolean;metalness?:number;fixedGold?:boolean};
  parametric?:{mask:string;appearance:Appearance};
}
export const chinaPack: CityArtworkPack = {
  placement:{scale:.82,offsetU:.047,offsetV:0},
  id:'china-draft-20261011',version:3,name:'中国 · 临时线稿',layout:'blank-300deg-v1',
  ...Object.fromEntries(['baseColor','normal','roughness','metalness'].map(k=>[k,`${import.meta.env.BASE_URL}${webTextures[`china/${k}` as keyof typeof webTextures]}`])),
  height:`${import.meta.env.BASE_URL}china/height.png?v=3`,
} as CityArtworkPack;
const channels=['baseColor','normal','roughness','metalness'] as const;
type Pixels={data:Uint8ClampedArray;width:number;height:number};
function pixels(image:CanvasImageSource,width:number,height:number):Pixels {
  const c=document.createElement('canvas');c.width=width;c.height=height;
  const ctx=c.getContext('2d',{willReadFrequently:true})!;ctx.drawImage(image,0,0,width,height);
  const data=ctx.getImageData(0,0,width,height).data;c.width=c.height=1;return {data,width,height};
}
function canvasTexture(data:Uint8ClampedArray,w:number,h:number,color:boolean,anisotropy:number){
  const c=document.createElement('canvas');c.width=w;c.height=h;
  const im=c.getContext('2d')!.createImageData(w,h);im.data.set(data);c.getContext('2d')!.putImageData(im,0,0);
  const t=new CanvasTexture(c);t.colorSpace=color?SRGBColorSpace:NoColorSpace;t.channel=1;
  t.wrapS=t.wrapT=ClampToEdgeWrapping;t.anisotropy=anisotropy;return t;
}
export class CityArtworkManager {
  private revision=0;private disposed=false;private owned:Texture[]=[];
  private label?:Promise<Pixels>;private labelUrl='';current:CityArtworkPack|null=null;
  onProgress?:(completed:number,total:number)=>void;
  relief=1;metalEnabled=true;lastError='';
  uniformOnly=false;
  private parameters:ReturnType<typeof installCityParameters>;
  private leases:Lease[]=[];private controller?:AbortController;
  private parametricCache=new Map<string,Promise<Texture[]>>();private paramKey='';private paramMaps:Texture[]=[];
  private textCache=new Map<string,Promise<Texture[]>>();private textKey='';private requestedStructure='';private requestedText='';
  constructor(private material:MeshPhysicalMaterial,private anisotropy:number,private pool?:ResourcePool){this.parameters=installCityParameters(material);}
  private labelPixels(source?:string){
    const url=source??`${import.meta.env.BASE_URL}china/label.png`;
    if(url!==this.labelUrl){this.label=undefined;this.labelUrl=url;}
    if(!this.label)this.label=loadTexture(url).then(t=>{
      try{return pixels(t.image,t.image.width,t.image.height);}finally{t.dispose();}
    }).catch(e=>{this.label=undefined;throw e;});return this.label;
  }
  async apply(pack:CityArtworkPack):Promise<boolean>{
    if(this.disposed)throw new Error('观察器已释放');
    const revision=++this.revision;
    if(pack?.finish==='paint')pack={...pack,finish:'enamel'};
    this.uniformOnly=false;
    if(pack.runtime&&this.pool)return this.applyRuntime(pack,revision);
    if(!pack||pack.layout!=='blank-300deg-v1'||!pack.id||!pack.name||!Number.isInteger(pack.version)||pack.version<1||channels.some(k=>typeof pack[k]!=='string'||!pack[k]))throw new Error('城市包缺少有效版本、展开规范或对齐通道');
    if(pack.label?.color&&!/^#[0-9a-f]{6}$/i.test(pack.label.color))throw new Error('文字颜色格式不正确');
    if(pack.finish&&!['enamel','metal','paint'].includes(pack.finish))throw new Error('不支持的城市材质');
    if(pack.normalEncoding&&pack.normalEncoding!=='rgba16f')throw new Error('法线编码不支持');
    if(pack.parametric)return this.applyParametric(pack,revision);
    const keys=[...channels,...(pack.coverage?['coverage' as const]:[]),...(pack.clearcoat?['clearcoat' as const]:[])];let complete=0;
    const results=await Promise.allSettled(keys.map(async k=>{const t=await(k==='normal'&&pack.normalEncoding==='rgba16f'?loadFloatNormal(pack[k]!):loadTexture(pack[k]!));if(revision===this.revision)this.onProgress?.(++complete,keys.length+1);return t;}));
    const loaded=results.flatMap(r=>r.status==='fulfilled'?[r.value]:[]);const staged:Texture[]=[];
    let transferredNormal:Texture|undefined;
    try{
      if(revision!==this.revision||this.disposed)return false;
      if(results.some(r=>r.status==='rejected'))throw new Error('城市贴图读取失败，已保留当前完整版本');
      const w=loaded[0].image.width,h=loaded[0].image.height;
      if(w<1||h<1||w>8192||h>8192||Math.abs(w/h-5433/2365)>.015||loaded.some(t=>t.image.width!==w||t.image.height!==h))throw new Error('城市通道尺寸不一致或展开比例不符，未应用');
      const label=pack.label?.hidden?null:await this.labelPixels(pack.label?.source);
      if(revision!==this.revision||this.disposed)return false;
      this.onProgress?.(keys.length+1,keys.length+1);
      let l:Uint8ClampedArray|null=null;
      if(label){const labelCanvas=document.createElement('canvas');labelCanvas.width=label.width;labelCanvas.height=label.height;
      const lc=labelCanvas.getContext('2d')!,li=lc.createImageData(label.width,label.height);li.data.set(label.data);lc.putImageData(li,0,0);
      l=pixels(labelCanvas,w,h).data;labelCanvas.width=labelCanvas.height=1;}
      const place=pack.placement??{scale:1,offsetU:0,offsetV:0};
      if(!Object.values(place).every(Number.isFinite)||place.scale<=0||place.scale>1||place.offsetU<0||place.offsetV<0||place.offsetU+place.scale>1.001||place.offsetV+place.scale>1.001)throw new Error('城市图样定位超出展开区域');
      if(pack.normalEncoding&&(place.scale!==1||place.offsetU!==0||place.offsetV!==0))throw new Error('高精度法线必须使用预对齐的完整展开图');
      const data=loaded.map((t,j)=>{
        if(j===1&&pack.normalEncoding)return null;
        const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d')!;
        ctx.fillStyle=j===1?'rgb(128,128,255)':'black';ctx.fillRect(0,0,w,h);
        ctx.drawImage(t.image as CanvasImageSource,place.offsetU*w,(1-place.scale-place.offsetV)*h,place.scale*w,place.scale*h);
        const result=pixels(c,w,h).data;c.width=c.height=1;return result;
      });
      const [base,,rough,mask]=data as [Uint8ClampedArray,unknown,Uint8ClampedArray,Uint8ClampedArray];
      const coverage=pack.coverage?data[keys.indexOf('coverage')]!:mask,coat=pack.clearcoat?data[keys.indexOf('clearcoat')]!:null;
      const labelColor=pack.label?.color?[1,3,5].map(i=>parseInt(pack.label!.color!.slice(i,i+2),16)):[221,181,56];
      const outColor=new Uint8ClampedArray(w*h*4),outMetal=new Uint8ClampedArray(w*h*4),outRough=new Uint8ClampedArray(w*h*4),outCoat=new Uint8ClampedArray(w*h*4),outCoverage=pack.coverage?new Uint8ClampedArray(w*h*4):null;
      for(let i=0;i<base.length;i+=4){
        const m=coverage[i]/255,a=(l?.[i]??0)/255,metal=pack.finish==='metal'?m:mask[i]/255;
        const combined=a*(pack.label?.metalness??1)+metal*(1-a);
        const r=pack.finish==='metal'?72:rough[i];
        for(let k=0;k<3;k++){
          outColor[i+k]=([255,253,247][k]*(1-m)+base[i+k]*m)*(1-a)+labelColor[k]*a;
          outMetal[i+k]=combined*255;outRough[i+k]=(41*(1-m)+r*m)*(1-a)+66*a;
          outCoat[i+k]=(255*(1-m)+(pack.finish==='metal'?26:coat?.[i]??26)*m)*(1-a)+(pack.label?.metalness===0?191:26)*a;
          if(outCoverage)outCoverage[i+k]=(a+m*(1-a))*255;
        }
        outColor[i+3]=outMetal[i+3]=outRough[i+3]=outCoat[i+3]=255;
        if(outCoverage)outCoverage[i+3]=255;
      }
      const normal=pack.normalEncoding?loaded[1]:canvasTexture(data[1]!,w,h,false,this.anisotropy);
      if(pack.normalEncoding){normal.channel=1;normal.anisotropy=this.anisotropy;}
      staged.push(canvasTexture(outColor,w,h,true,this.anisotropy));
      staged.push(canvasTexture(outMetal,w,h,false,this.anisotropy));
      staged.push(canvasTexture(outRough,w,h,false,this.anisotropy));
      staged.push(canvasTexture(outCoat,w,h,false,this.anisotropy));
      staged.push(normal);if(pack.normalEncoding)transferredNormal=normal;
      if(outCoverage)staged.push(canvasTexture(outCoverage,w,h,false,this.anisotropy));
      if(revision!==this.revision||this.disposed)return false;
      const mat=this.material;
      this.parameters.disable();this.paramKey='';this.textKey='';this.paramMaps=[];
      [mat.map,mat.metalnessMap,mat.roughnessMap,mat.clearcoatMap,mat.normalMap]=staged;
      setPorcelainCoverage(mat,staged[5]??null);
      mat.clearcoatNormalMap=mat.normalMap;mat.metalness=this.metalEnabled?1:0;mat.roughness=1;mat.color.set(0xffffff);
      const strength=.7;
      mat.normalScale.setScalar(this.relief*strength);mat.clearcoatNormalScale.setScalar(this.relief*strength);
      mat.displacementMap=null;mat.displacementScale=0;mat.needsUpdate=true;
      const old=this.owned;this.owned=[...staged];staged.length=0;old.forEach(t=>this.release(t));
      this.current={...pack};this.lastError='';return true;
    }catch(e){this.lastError=(e as Error).message;throw e;}
    finally{loaded.filter(t=>t!==transferredNormal).forEach(t=>t.dispose());staged.forEach(t=>this.release(t));}
  }
  private resource(cache:Map<string,Promise<Texture[]>>,key:string,load:()=>Promise<Texture[]>){
    let promise=cache.get(key);
    if(!promise){
      promise=load().then(maps=>{
        if(maps.some(t=>{const image=t.image as {width:number;height:number};return image.width!==4096||image.height!==1783;})){maps.forEach(t=>t.dispose());throw new Error('城市通道尺寸不一致');}
        maps.forEach(t=>{t.channel=1;t.colorSpace=NoColorSpace;t.anisotropy=this.anisotropy;t.wrapS=t.wrapT=ClampToEdgeWrapping;});return maps;
      });
      cache.set(key,promise);const original=promise;
      void promise.catch(()=>{if(cache.get(key)===original)cache.delete(key);});
    }else{cache.delete(key);cache.set(key,promise);}
    return promise;
  }
  private async applyRuntime(pack:CityArtworkPack,revision:number){
    const runtime=pack.runtime!,key=[runtime.mask.url,runtime.normal.url].join('|'),textKey=runtime.label.asset.url;
    const appearance=normalizeAppearance(pack.parametric!.appearance);
    if(key===this.paramKey&&textKey===this.textKey){this.controller?.abort();this.uniformOnly=true;this.parameters.update(appearance,true);this.current=structuredClone(pack);this.relief=appearance.relief;return true;}
    this.controller?.abort();const controller=this.controller=new AbortController();let leases:Lease[]=[];
    try{
      leases=await this.pool!.acquireAll([runtime.mask,runtime.normal,runtime.label.asset],controller.signal);
      if(revision!==this.revision||this.disposed)return false;
      const [mask,normal,label]=leases.map(l=>l.texture);for(const t of [mask,normal,label]){t.channel=1;t.anisotropy=this.anisotropy;}
      const mat=this.material;this.uniformOnly=this.paramKey===key;
      mat.map=mat.metalnessMap=mask;mat.normalMap=mat.clearcoatNormalMap=normal;mat.roughnessMap=mat.clearcoatMap=null;
      mat.clearcoat=1;mat.roughness=1;mat.metalness=this.metalEnabled?1:0;mat.color.set(0xffffff);mat.displacementMap=null;mat.displacementScale=0;
      setPorcelainCoverage(mat,mask);mat.needsUpdate=true;
      this.parameters.enable(mask,label,true,runtime.label.uvRect);this.parameters.fixedGold(true);this.parameters.update(appearance,true);this.parameters.metal(this.metalEnabled);
      const old=this.leases;this.leases=leases;leases=[];old.forEach(l=>l.release());this.owned.forEach(t=>this.release(t));this.owned=[];
      this.paramKey=key;this.textKey=textKey;this.paramMaps=[mask,normal,label];this.current=structuredClone(pack);this.relief=appearance.relief;this.lastError='';return true;
    }catch(e){if(controller.signal.aborted)return false;this.lastError=String(e);throw e;}finally{leases.forEach(l=>l.release());}
  }
  private trimResources(){
    for(const [cache,limit,protectedKeys] of [[this.parametricCache,2,[this.paramKey,this.requestedStructure]],[this.textCache,6,[this.textKey,this.requestedText]]] as const){
      for(const [key,promise] of cache){if(cache.size<=limit)break;if(protectedKeys.includes(key))continue;cache.delete(key);void promise.then(maps=>maps.forEach(t=>this.release(t)),()=>{});}
    }
  }
  private async applyParametric(pack:CityArtworkPack,revision:number){
    try{
      const appearance=normalizeAppearance(pack.parametric!.appearance);
      if(pack.normalEncoding!=='rgba16f'||pack.placement||!pack.label?.source||!pack.parametric!.mask)throw new Error('参数化城市包需要完整对齐的遮罩、法线和文字');
      const key=[pack.parametric!.mask,pack.normal].join('|'),textKey=pack.label.source;
      this.requestedStructure=key;this.requestedText=textKey;
      if(this.paramKey===key&&this.textKey===textKey){
        this.uniformOnly=true;this.parameters.fixedGold(!!pack.label.fixedGold);this.parameters.update(appearance,!pack.label.hidden);this.relief=appearance.relief;
        this.current={...pack,parametric:{...pack.parametric!,appearance}};this.lastError='';return true;
      }
      const structure=this.resource(this.parametricCache,key,async()=>{
        const result=await Promise.allSettled([loadTexture(pack.parametric!.mask),loadFloatNormal(pack.normal)]);
        const maps=result.flatMap(r=>r.status==='fulfilled'?[r.value]:[]);
        if(result.some(r=>r.status==='rejected')){maps.forEach(t=>t.dispose());throw new Error('城市结构读取失败，已保留当前效果');}return maps;
      });
      const lettering=this.resource(this.textCache,textKey,async()=>[await loadTexture(textKey)]);
      const [maps,text]=await Promise.all([structure,lettering]);
      if(revision!==this.revision||this.disposed)return false;
      const mat=this.material,structureChanged=this.paramKey!==key;
      this.uniformOnly=!structureChanged;
      if(structureChanged){
        mat.map=mat.metalnessMap=maps[0];mat.roughnessMap=null;mat.clearcoatMap=null;
        mat.normalMap=mat.clearcoatNormalMap=maps[1];mat.clearcoat=1;mat.metalness=this.metalEnabled?1:0;mat.roughness=1;mat.color.set(0xffffff);
        mat.displacementMap=null;mat.displacementScale=0;setPorcelainCoverage(mat,maps[0]);mat.needsUpdate=true;
      }
      this.parameters.enable(maps[0],text[0],!pack.label.hidden);this.parameters.fixedGold(!!pack.label.fixedGold);this.parameters.update(appearance,!pack.label.hidden);this.parameters.metal(this.metalEnabled);
      this.owned.forEach(t=>this.release(t));this.owned=[];this.paramMaps=[...maps,...text];this.paramKey=key;this.textKey=textKey;this.relief=appearance.relief;
      this.current={...pack,parametric:{...pack.parametric!,appearance}};this.lastError='';return true;
    }catch(e){if(revision===this.revision)this.lastError=(e as Error).message;throw e;}
    finally{this.trimResources();}
  }
  resetRuntime(){this.controller?.abort();++this.revision;this.leases.forEach(l=>l.release());this.leases=[];this.paramKey=this.textKey='';this.paramMaps=[];}
  setRelief(value:number){if(!Number.isFinite(value)||value< -1||value>2)throw new Error('凹凸强度超出范围');this.relief=value;if(this.current?.parametric){const a={...this.current.parametric.appearance,relief:Math.max(0,value)};this.current.parametric.appearance=a;this.parameters.update(a,!this.current.label?.hidden);}else{this.material.normalScale.setScalar(value*.7);this.material.clearcoatNormalScale.setScalar(value*.7);}}
  setMetal(enabled:boolean){this.metalEnabled=enabled;this.material.metalness=enabled?1:0;this.parameters.metal(enabled);}
  configureMetalnessInspection(material:MeshBasicMaterial){if(this.current?.parametric)this.parameters.inspect(material);}
  private release(t:Texture){t.dispose();if(t.image instanceof HTMLCanvasElement)t.image.width=t.image.height=1;}
  debug(){return {pack:this.current,relief:this.relief,metalEnabled:this.metalEnabled,displacementScale:this.material.displacementScale,parameters:this.parameters.debug(),cachedCities:this.parametricCache.size,cachedLabels:this.textCache.size,uniformOnly:this.uniformOnly,maps:[...this.owned,...this.paramMaps].map(t=>({uuid:t.uuid,channel:t.channel,size:[(t.image as {width:number;height:number}).width,(t.image as {width:number;height:number}).height],colorSpace:t.colorSpace,precision:t.userData.precision??'8-bit'})),labelSource:this.current?.label?.hidden?null:this.current?.label?.source??'china/label.png',labelColor:this.current?.label?.color??'#ddb538',lastError:this.lastError};}
  dispose(){this.disposed=true;++this.revision;this.controller?.abort();this.leases.forEach(l=>l.release());this.leases=[];this.owned.forEach(t=>this.release(t));this.owned=[];for(const p of [...this.parametricCache.values(),...this.textCache.values()])void p.then(ts=>ts.forEach(t=>t.dispose()),()=>{});this.parametricCache.clear();this.textCache.clear();this.paramMaps=[];this.label=undefined;}
}
