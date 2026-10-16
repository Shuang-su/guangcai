import {Texture} from 'three';
// Bound simultaneous transfers on slower public connections. Failed HTTP image
// requests get a fresh URL; local files/data URLs fail immediately.
let active=0;const queued:(()=>void)[]=[];
async function acquire(){if(active<4){active++;return;}await new Promise<void>(resolve=>queued.push(resolve));}
function release(){const next=queued.shift();if(next)next();else active--;}
function attempt(url:string){return new Promise<Texture<HTMLImageElement>>((resolve,reject)=>{
 const image=new Image();image.crossOrigin='anonymous';
 const finish=()=>{clearTimeout(timer);image.onload=null;image.onerror=null;};
 const timer=window.setTimeout(()=>{finish();image.src='';reject(new Error('贴图请求超时'));},120000);
 image.onload=()=>{finish();const texture=new Texture(image);texture.needsUpdate=true;resolve(texture);};
 image.onerror=()=>{finish();reject(new Error('贴图请求中断'));};image.src=url;
});}
export async function loadTexture(source:string):Promise<Texture<HTMLImageElement>>{
 await acquire();
 try{
  const url=new URL(source,document.baseURI),remote=/^https?:$/.test(url.protocol);let lastError:unknown;
  for(let i=0;i<(remote?3:1);i++){
   if(i){await new Promise(resolve=>window.setTimeout(resolve,400*i));url.searchParams.set('_textureRetry',`${i}-${Date.now()}`);}
   try{return await attempt(i?url.href:source);}catch(error){lastError=error;}
  }
  throw lastError;
 }finally{release();}
}
