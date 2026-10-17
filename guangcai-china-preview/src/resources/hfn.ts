export function parseHFN(buffer:ArrayBuffer){
 if(buffer.byteLength<16)throw Error('高精度法线数据不完整');
 const h=new DataView(buffer),width=h.getUint32(4,true),height=h.getUint32(8,true);
 if(h.getUint32(0,false)!==0x48464e31||h.getUint32(12,true)!==1)throw Error('不支持的高精度法线格式');
 if(!width||!height||width>8192||height>8192||buffer.byteLength!==16+width*height*8)throw Error('高精度法线尺寸或数据长度错误');
 const data=new Uint16Array(buffer,16);for(let i=0;i<data.length;i++)if(data[i]>0x3c00)throw Error('高精度法线数值越界');
 return {data,width,height};
}
export async function readBounded(stream:ReadableStream<Uint8Array>,limit:number,onProgress?:(received:number)=>void){
 const reader=stream.getReader(),chunks:Uint8Array[]=[];let size=0;
 try{while(true){const r=await reader.read();if(r.done)break;size+=r.value.byteLength;if(size>limit)throw Error('Resource exceeds declared byte budget');chunks.push(r.value);onProgress?.(size);}}
 catch(e){await reader.cancel();throw e;}finally{reader.releaseLock();}
 const bytes=new Uint8Array(size);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.length;}return bytes.buffer;
}
