import {packNormalXY,packNormalBytePlanes} from './texture-budget';
import {parseHFN} from './hfn';
import {inflateNormal} from './inflate';
import type {Asset} from './types';
const scope=self as unknown as {onmessage:((e:MessageEvent<{bytes:ArrayBuffer;asset:Asset}>)=>void)|null;postMessage:(message:unknown,transfer:Transferable[])=>void};
scope.onmessage=async({data:{bytes,asset}})=>{
 try{
  if(asset.encoding!=='hfn1-gzip')throw Error('Worker accepts high-precision normals only');
  scope.postMessage({stage:'checksum'},[]);
  const magic=new Uint8Array(bytes,0,Math.min(4,bytes.byteLength)),gzip=magic[0]===31&&magic[1]===139;
  // The manifest describes encoded gzip bytes, never HTTP-transparent HFN.
  if(!gzip)throw Error('Normal response must preserve gzip file bytes');
  if(gzip){const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(x=>x.toString(16).padStart(2,'0')).join('');if(digest!==asset.sha256)throw Error('Resource checksum mismatch');}
  scope.postMessage({stage:'inflate'},[]);
  const raw=inflateNormal(bytes,asset.decodedBytes+16);
  scope.postMessage({stage:'validate'},[]);
  const normal=parseHFN(raw);if(normal.width!==asset.width||normal.height!==asset.height)throw Error('Normal dimensions differ from manifest');
  const data=normal.bytePlanes?packNormalBytePlanes(normal.bytePlanes):packNormalXY(normal.data);scope.postMessage({kind:'normal',data},[data.buffer]);
 }catch(e){scope.postMessage({error:String(e)},[]);}
};
