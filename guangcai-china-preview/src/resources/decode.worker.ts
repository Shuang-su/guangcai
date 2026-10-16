import {parseHFN,readBounded} from './hfn';
import type {Asset} from './types';
const scope=self as unknown as {onmessage:((e:MessageEvent<{bytes:ArrayBuffer;asset:Asset}>)=>void)|null;postMessage:(message:unknown,transfer:Transferable[])=>void};
scope.onmessage=async({data:{bytes,asset}})=>{
 try{
  const magic=new Uint8Array(bytes,0,Math.min(4,bytes.byteLength)),gzip=magic[0]===31&&magic[1]===139;
  // Hosts may transparently decode Content-Encoding:gzip; that case is checked
  // against the HFN header and exact uncompressed length instead of encoded hash.
  if(asset.encoding==='webp'||gzip){const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(x=>x.toString(16).padStart(2,'0')).join('');if(digest!==asset.sha256)throw Error('Resource checksum mismatch');}
  if(asset.encoding==='hfn1-gzip'){
   const raw=gzip?await readBounded(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip')),asset.decodedBytes+16):bytes;
   const normal=parseHFN(raw);if(normal.width!==asset.width||normal.height!==asset.height)throw Error('Normal dimensions differ from manifest');
   scope.postMessage({kind:'normal',data:normal.data,width:normal.width,height:normal.height},[raw]);return;
  }
  const bitmap=await createImageBitmap(new Blob([bytes],{type:'image/webp'}),{imageOrientation:'flipY',premultiplyAlpha:'none',colorSpaceConversion:'none'});
  if(bitmap.width!==asset.width||bitmap.height!==asset.height){bitmap.close();throw Error('Image dimensions differ from manifest');}
  if(asset.channels===4){scope.postMessage({kind:'bitmap',bitmap},[bitmap]);return;}
  const canvas=new OffscreenCanvas(bitmap.width,bitmap.height),ctx=canvas.getContext('2d',{willReadFrequently:true})!;
  ctx.drawImage(bitmap,0,0);bitmap.close();const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data,values=new Uint8Array(asset.width*asset.height*asset.channels);
  for(let i=0;i<asset.width*asset.height;i++)for(let k=0;k<asset.channels;k++)values[i*asset.channels+k]=pixels[i*4+k];
  canvas.width=canvas.height=1;scope.postMessage({kind:'data',data:values},[values.buffer]);
 }catch(e){scope.postMessage({error:String(e)},[]);}
};
