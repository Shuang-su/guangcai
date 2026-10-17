import type {Asset} from './types';
import {abortError} from './queue';
type DecodedImage={kind:'image';image:HTMLImageElement&{close:()=>void}}|{kind:'data';data:Uint8Array};
/** Keep image decoding in the document: WebKit can leave worker bitmap jobs pending. */
export async function decodeImage(bytes:ArrayBuffer,asset:Asset,signal:AbortSignal):Promise<DecodedImage>{
 const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(x=>x.toString(16).padStart(2,'0')).join('');
 if(digest!==asset.sha256)throw Error('Resource checksum mismatch');if(signal.aborted)throw abortError();
 const image=await new Promise<HTMLImageElement>((resolve,reject)=>{
  const img=new Image(),url=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
  const clean=()=>{clearTimeout(timer);signal.removeEventListener('abort',abort);img.onload=img.onerror=null;URL.revokeObjectURL(url);};
  const fail=(error:Error)=>{clean();img.src='';reject(error);};
  const abort=()=>fail(abortError()),timer=setTimeout(()=>fail(Error('Image decode timed out')),15000);
  img.onload=()=>{clean();resolve(img);};img.onerror=()=>fail(Error('Image decode failed'));signal.addEventListener('abort',abort,{once:true});img.src=url;
 });
 const close=()=>{image.src='';};
 if(signal.aborted){close();throw abortError();}
 if(image.naturalWidth!==asset.width||image.naturalHeight!==asset.height){close();throw Error('Image dimensions differ from manifest');}
 if(asset.channels===4)return {kind:'image',image:Object.assign(image,{close})};
 const canvas=document.createElement('canvas');canvas.width=asset.width;canvas.height=asset.height;
 try{
  const ctx=canvas.getContext('2d',{willReadFrequently:true})!;
  // Match the old flipped bitmap pixels, while keeping DataTexture.flipY false.
  ctx.translate(0,asset.height);ctx.scale(1,-1);ctx.drawImage(image,0,0);
  const pixels=ctx.getImageData(0,0,asset.width,asset.height).data,values=new Uint8Array(asset.width*asset.height*asset.channels);
  for(let i=0;i<asset.width*asset.height;i++)for(let k=0;k<asset.channels;k++)values[i*asset.channels+k]=pixels[i*4+k];
  return {kind:'data',data:values};
 }finally{close();canvas.width=canvas.height=1;}
}
