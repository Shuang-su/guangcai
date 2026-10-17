import type {Asset} from './types';
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
