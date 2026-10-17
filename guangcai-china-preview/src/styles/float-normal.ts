import {DataTexture, HalfFloatType, RGBAFormat, LinearFilter, LinearMipmapLinearFilter} from 'three';
import {downloadBytes} from './download-bytes';

/** HFN1: 16-byte LE header, then bottom-up RGBA IEEE binary16 texels.
 * No browser image decode, sRGB conversion, or 8-bit intermediate. */
export function decodeFloatNormal(buffer:ArrayBuffer):DataTexture {
  if(buffer.byteLength<16)throw new Error('高精度法线数据不完整');
  const header=new DataView(buffer);
  if(header.getUint32(0,false)!==0x48464e31||header.getUint32(12,true)!==1)throw new Error('不支持的高精度法线格式');
  const w=header.getUint32(4,true),h=header.getUint32(8,true);
  if(w<1||h<1||w>8192||h>8192||buffer.byteLength!==16+w*h*8)throw new Error('高精度法线尺寸或数据长度错误');
  const data=new Uint16Array(buffer,16);
  // Normals encode [0,1]. Reject non-finite, negative and out-of-range half values.
  for(let i=0;i<data.length;i++)if(data[i]>0x3c00)throw new Error('高精度法线数值越界');
  const texture=new DataTexture(data,w,h,RGBAFormat,HalfFloatType);
  texture.flipY=false;texture.generateMipmaps=true;
  texture.minFilter=LinearMipmapLinearFilter;texture.magFilter=LinearFilter;
  texture.userData={precision:'RGBA16F',sourceRows:'bottom-up'};
  texture.needsUpdate=true;
  return texture;
}

export async function loadFloatNormal(url:string):Promise<DataTexture> {
  let lastError:unknown;
  for(let i=0;i<3;i++){
    try{
      const address=new URL(url,document.baseURI);
      if(i&&/^https?:$/.test(address.protocol))address.searchParams.set('_normalRetry',`${i}-${Date.now()}`);
      // Some static hosts set Content-Encoding:gzip for .gz assets, so fetch
      // already decompresses them. Other hosts deliver the gzip file verbatim.
      const bytes=await downloadBytes(address),magic=new Uint8Array(bytes,0,Math.min(4,bytes.byteLength));
      const raw=magic[0]===0x1f&&magic[1]===0x8b
        ?await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer()
        :bytes;
      return decodeFloatNormal(raw);
    }catch(e){lastError=e;if(!/^https?:/.test(new URL(url,document.baseURI).protocol))break;}
  }
  throw lastError;
}
