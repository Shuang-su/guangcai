import { CanvasTexture, ClampToEdgeWrapping, NoColorSpace, SRGBColorSpace, Texture, TextureLoader, type MeshPhysicalMaterial } from 'three';

export interface CityArtworkPack {
  id: string; version: number; name: string; layout: 'blank-300deg-v1';
  placement?: {scale:number;offsetU:number;offsetV:number};
  baseColor: string; normal: string; roughness: string; metalness: string; height?: string;
}
export const chinaPack: CityArtworkPack = {
  placement:{scale:.82,offsetU:.047,offsetV:0},
  id:'china-draft-20261011',version:3,name:'中国 · 临时线稿',layout:'blank-300deg-v1',
  ...Object.fromEntries(['baseColor','normal','roughness','metalness','height'].map(k=>[k,`${import.meta.env.BASE_URL}china/${k}.png?v=3`])),
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
  private label?:Promise<Pixels>;current:CityArtworkPack|null=null;
  relief=1;metalEnabled=true;lastError='';
  constructor(private material:MeshPhysicalMaterial,private anisotropy:number){}
  private labelPixels(){
    if(!this.label)this.label=new TextureLoader().loadAsync(`${import.meta.env.BASE_URL}china/label.png`).then(t=>{
      try{return pixels(t.image,t.image.width,t.image.height);}finally{t.dispose();}
    }).catch(e=>{this.label=undefined;throw e;});return this.label;
  }
  async apply(pack:CityArtworkPack):Promise<boolean>{
    if(this.disposed)throw new Error('观察器已释放');
    const revision=++this.revision;
    if(!pack||pack.layout!=='blank-300deg-v1'||!pack.id||!pack.name||!Number.isInteger(pack.version)||pack.version<1||channels.some(k=>typeof pack[k]!=='string'||!pack[k]))throw new Error('城市包缺少有效版本、展开规范或对齐通道');
    const loader=new TextureLoader();loader.setCrossOrigin('anonymous');
    const results=await Promise.allSettled(channels.map(k=>loader.loadAsync(pack[k])));
    const loaded=results.flatMap(r=>r.status==='fulfilled'?[r.value]:[]);const staged:Texture[]=[];
    try{
      if(revision!==this.revision||this.disposed)return false;
      if(results.some(r=>r.status==='rejected'))throw new Error('城市贴图读取失败，已保留当前完整版本');
      const w=loaded[0].image.width,h=loaded[0].image.height;
      if(w<1||h<1||w>8192||h>8192||Math.abs(w/h-5433/2365)>.015||loaded.some(t=>t.image.width!==w||t.image.height!==h))throw new Error('城市通道尺寸不一致或展开比例不符，未应用');
      const label=await this.labelPixels();
      if(revision!==this.revision||this.disposed)return false;
      const labelCanvas=document.createElement('canvas');labelCanvas.width=label.width;labelCanvas.height=label.height;
      const lc=labelCanvas.getContext('2d')!,li=lc.createImageData(label.width,label.height);li.data.set(label.data);lc.putImageData(li,0,0);
      const l=pixels(labelCanvas,w,h).data;labelCanvas.width=labelCanvas.height=1;
      const place=pack.placement??{scale:1,offsetU:0,offsetV:0};
      if(!Object.values(place).every(Number.isFinite)||place.scale<=0||place.scale>1||place.offsetU<0||place.offsetV<0||place.offsetU+place.scale>1.001||place.offsetV+place.scale>1.001)throw new Error('城市图样定位超出展开区域');
      const [base,norm,rough,mask]=loaded.map((t,j)=>{
        const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d')!;
        ctx.fillStyle=j===1?'rgb(128,128,255)':'black';ctx.fillRect(0,0,w,h);
        ctx.drawImage(t.image,place.offsetU*w,(1-place.scale-place.offsetV)*h,place.scale*w,place.scale*h);
        const result=pixels(c,w,h).data;c.width=c.height=1;return result;
      });
      const outColor=new Uint8ClampedArray(w*h*4),outMetal=new Uint8ClampedArray(w*h*4),outRough=new Uint8ClampedArray(w*h*4),outCoat=new Uint8ClampedArray(w*h*4);
      for(let i=0;i<base.length;i+=4){
        const m=mask[i]/255,a=l[i]/255,combined=a+m*(1-a);
        for(let k=0;k<3;k++){
          outColor[i+k]=([244,243,237][k]*(1-m)+base[i+k]*m)*(1-a)+[221,181,56][k]*a;
          outMetal[i+k]=combined*255;outRough[i+k]=(41*(1-m)+rough[i]*m)*(1-a)+66*a;
          outCoat[i+k]=(255*(1-m)+26*m)*(1-a)+26*a;
        }
        outColor[i+3]=outMetal[i+3]=outRough[i+3]=outCoat[i+3]=255;
      }
      staged.push(canvasTexture(outColor,w,h,true,this.anisotropy),canvasTexture(outMetal,w,h,false,this.anisotropy),canvasTexture(outRough,w,h,false,this.anisotropy),canvasTexture(outCoat,w,h,false,this.anisotropy),canvasTexture(new Uint8ClampedArray(norm),w,h,false,this.anisotropy));
      if(revision!==this.revision||this.disposed)return false;
      const mat=this.material;
      [mat.map,mat.metalnessMap,mat.roughnessMap,mat.clearcoatMap,mat.normalMap]=staged;
      mat.clearcoatNormalMap=mat.normalMap;mat.metalness=this.metalEnabled?1:0;mat.roughness=1;mat.color.set(0xffffff);
      mat.normalScale.setScalar(this.relief*.7);mat.clearcoatNormalScale.setScalar(this.relief*.7);
      mat.displacementMap=null;mat.displacementScale=0;mat.needsUpdate=true;
      const old=this.owned;this.owned=[...staged];staged.length=0;old.forEach(t=>this.release(t));
      this.current={...pack};this.lastError='';return true;
    }catch(e){this.lastError=(e as Error).message;throw e;}
    finally{loaded.forEach(t=>t.dispose());staged.forEach(t=>this.release(t));}
  }
  setRelief(value:number){if(![-1,0,1].includes(value))throw new Error('凹凸方向只接受 -1 / 0 / 1');this.relief=value;this.material.normalScale.setScalar(value*.7);this.material.clearcoatNormalScale.setScalar(value*.7);}
  setMetal(enabled:boolean){this.metalEnabled=enabled;this.material.metalness=enabled?1:0;}
  private release(t:Texture){t.dispose();if(t.image instanceof HTMLCanvasElement)t.image.width=t.image.height=1;}
  debug(){return {pack:this.current,relief:this.relief,metalEnabled:this.metalEnabled,displacementScale:this.material.displacementScale,maps:this.owned.map(t=>({uuid:t.uuid,channel:t.channel,size:[(t.image as HTMLCanvasElement).width,(t.image as HTMLCanvasElement).height],colorSpace:t.colorSpace})),labelSource:'china/label.png',labelColor:'#ddb538',lastError:this.lastError};}
  dispose(){this.disposed=true;++this.revision;this.owned.forEach(t=>this.release(t));this.owned=[];this.label=undefined;}
}
