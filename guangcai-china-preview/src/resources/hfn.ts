export function parseHFN(buffer:ArrayBuffer){
 if(buffer.byteLength<16)throw Error('高精度法线数据不完整');
 const h=new DataView(buffer),width=h.getUint32(4,true),height=h.getUint32(8,true);
 const layout=h.getUint32(12,true);
 if(h.getUint32(0,false)!==0x48464e31||![1,2].includes(layout))throw Error('不支持的高精度法线格式');
 if(!width||!height||width>8192||height>8192||buffer.byteLength!==16+width*height*8)throw Error('高精度法线尺寸或数据长度错误');
 const data=new Uint16Array(buffer,16),bytePlanes=layout===2?new Uint8Array(buffer,16):undefined;
 if(bytePlanes){const n=width*height;for(let k=0;k<4;k++)for(let i=0;i<n;i++)if((bytePlanes[k*2*n+i]|bytePlanes[(k*2+1)*n+i]<<8)>0x3c00)throw Error('高精度法线数值越界');}
 else for(let i=0;i<data.length;i++)if(data[i]>0x3c00)throw Error('高精度法线数值越界');
 return {data,width,height,bytePlanes};
}
/** Manifest sizes are exact. Fill one destination instead of retaining all
 * decompressed chunks and then allocating a second full-size copy. */
export async function readExact(stream:ReadableStream<Uint8Array>,length:number,onProgress?:(received:number)=>void){
 if(!Number.isSafeInteger(length)||length<0)throw Error('Invalid resource byte length');
 const bytes=new Uint8Array(length),reader=stream.getReader();let size=0;
 try{
  while(true){const r=await reader.read();if(r.done)break;const next=size+r.value.byteLength;if(next>length)throw Error('Resource exceeds declared byte budget');bytes.set(r.value,size);size=next;onProgress?.(size);}
  if(size!==length)throw Error('Resource is shorter than declared byte length');
  return bytes.buffer;
 }catch(e){await reader.cancel().catch(()=>{});throw e;}finally{reader.releaseLock();}
}
