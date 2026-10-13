import {Color} from 'three';
import type {Studio} from '../studio/studio';
import asset from './background-asset.json';

export type BackgroundChoice='auto'|'soft'|'soft-v3'|'gray'|'custom';
export interface BackgroundState {choice:BackgroundChoice;active:'soft'|'soft-v3'|'gray'|'custom';busy:boolean;hasCustom:boolean}
const mobileQuery='(max-width: 600px), (hover: none) and (pointer: coarse)';
const maxBytes=20*1024*1024;
function decodedImage(url:string){return new Promise<HTMLImageElement>((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(new Error('图片无法读取，请选择有效的 JPG、PNG 或 WebP。'));img.src=url;});}

/** Screen-only backdrop: never changes the environment, light or material maps. */
export class BackgroundController {
  private media=matchMedia(mobileQuery);
  private revision=0;
  private disposed=false;
  private intent:BackgroundChoice='auto';
  private current:BackgroundState={choice:'auto',active:'gray',busy:false,hasCustom:false};
  private customUrl:string|undefined;
  private softReady:Partial<Record<'soft'|'soft-v3',Promise<HTMLImageElement>>>={};
  private softUrls={soft:`${import.meta.env.BASE_URL}${asset.path}`,'soft-v3':`${import.meta.env.BASE_URL}${asset.v3.path}`};
  readonly ready:Promise<void>;
  constructor(private studio:Studio,private layer:HTMLElement,private notify:(state:BackgroundState)=>void,private report:(message:string)=>void){
    this.paint('gray');
    this.media.addEventListener('change',this.responsive);
    this.ready=this.select('auto').catch(e=>this.report((e as Error).message));
  }
  state=():BackgroundState=>({...this.current});
  private responsive=()=>{if(this.intent==='auto')void this.select('auto').catch(e=>this.report((e as Error).message));};
  private paint(active:BackgroundState['active'],url?:string){
    this.layer.style.backgroundImage=url?`url("${url}")`:'none';
    this.layer.dataset.background=active;
    this.studio.scene.background=active==='gray'?new Color('#b7b8ba'):null;
    this.studio.renderer.setClearColor(0,0);
  }
  async select(choice:BackgroundChoice){
    if(this.disposed)return;
    if(choice==='custom'&&!this.customUrl)throw new Error('请先选择一张背景图片。');
    const revision=++this.revision;this.intent=choice;this.current.busy=true;this.notify(this.state());
    const active=choice==='auto'?(this.media.matches?'soft-v3':'gray'):choice;
    try{
      if(active==='soft'||active==='soft-v3'){
        this.softReady[active]??=decodedImage(this.softUrls[active]).catch(e=>{delete this.softReady[active];throw e;});
        await this.softReady[active];
      }
      if(this.disposed||revision!==this.revision)return;
      this.paint(active,(active==='soft'||active==='soft-v3')?this.softUrls[active]:active==='custom'?this.customUrl:undefined);
      this.current={choice,active,busy:false,hasCustom:!!this.customUrl};this.notify(this.state());
    }catch(e){if(revision!==this.revision||this.disposed)return;this.intent=this.current.choice;this.current.busy=false;this.notify(this.state());throw e;}
  }
  async upload(file:File){
    if(this.disposed)return;
    const revision=++this.revision;this.intent='custom';this.current.busy=true;this.notify(this.state());
    let inputUrl:string|undefined,nextUrl:string|undefined;
    try{
      if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw new Error('请选择 JPG、PNG 或 WebP 图片。');
      if(file.size>maxBytes)throw new Error('图片超过 20 MB，请选择较小的图片。');
      inputUrl=URL.createObjectURL(file);
      const img=await decodedImage(inputUrl);
      if(this.disposed||revision!==this.revision)return;
      if(img.naturalWidth*img.naturalHeight>64000000)throw new Error('图片像素过大，请选择 6400 万像素以内的图片。');
      // Bound preview memory on mobile; the user's original file is never modified.
      const scale=Math.min(1,2048/Math.max(img.naturalWidth,img.naturalHeight));
      const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.naturalWidth*scale));canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));
      const context=canvas.getContext('2d');if(!context)throw new Error('浏览器暂时无法处理图片，请重试。');
      context.drawImage(img,0,0,canvas.width,canvas.height);
      const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('图片预览生成失败，请重试。')),'image/webp',.94));
      canvas.width=canvas.height=0;
      if(this.disposed||revision!==this.revision)return;
      nextUrl=URL.createObjectURL(blob);await decodedImage(nextUrl);
      if(this.disposed||revision!==this.revision)return;
      const previous=this.customUrl;this.customUrl=nextUrl;nextUrl=undefined;
      this.paint('custom',this.customUrl);
      this.current={choice:'custom',active:'custom',busy:false,hasCustom:true};this.notify(this.state());
      if(previous)URL.revokeObjectURL(previous);
    }catch(e){if(revision!==this.revision||this.disposed)return;this.intent=this.current.choice;this.current.busy=false;this.notify(this.state());throw e;}
    finally{if(inputUrl)URL.revokeObjectURL(inputUrl);if(nextUrl)URL.revokeObjectURL(nextUrl);}
  }
  dispose(){this.disposed=true;++this.revision;this.media.removeEventListener('change',this.responsive);this.layer.style.backgroundImage='none';if(this.customUrl)URL.revokeObjectURL(this.customUrl);this.customUrl=undefined;}
}
