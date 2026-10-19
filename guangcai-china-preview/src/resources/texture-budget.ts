import type {Asset} from './types';
export const mobileEncodedCacheBytes=16*1024*1024;

/** HFN files remain RGBA16F masters; runtime keeps exact half-float X/Y.
 * Three reconstructs the positive tangent-space Z for RG normal textures. */
export const textureBytes=(asset:Asset)=>asset.encoding==='hfn1-gzip'?Math.ceil(asset.width*asset.height*4*4/3):asset.gpuBytes;
export const retainedBytes=(asset:Asset)=>asset.encoding==='hfn1-gzip'?asset.width*asset.height*4:asset.decodedBytes;
export function packNormalXY(rgba:Uint16Array){
 if(rgba.length%4)throw Error('Invalid RGBA normal length');
 const xy=new Uint16Array(rgba.length/2);
 for(let i=0,j=0;i<rgba.length;i+=4,j+=2){if(rgba[i+2]<0x3800||rgba[i+2]>0x3c00)throw Error('Packed normals require positive tangent Z');xy[j]=rgba[i];xy[j+1]=rgba[i+1];}
 return xy;
}
/** Lossless byte planes store the exact same RGBA16F values; copy X/Y directly
 * into the existing RG16F upload without a second full RGBA allocation. */
export function packNormalBytePlanes(bytes:Uint8Array){
 if(bytes.length%8)throw Error('Invalid byte-plane normal length');
 const n=bytes.length/8,xy=new Uint16Array(n*2);
 for(let i=0;i<n;i++){
  const z=bytes[4*n+i]|bytes[5*n+i]<<8;if(z<0x3800||z>0x3c00)throw Error('Packed normals require positive tangent Z');
  xy[i*2]=bytes[i]|bytes[n+i]<<8;xy[i*2+1]=bytes[2*n+i]|bytes[3*n+i]<<8;
 }
 return xy;
}
