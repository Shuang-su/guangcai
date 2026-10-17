import {gunzipSync} from 'three/addons/libs/fflate.module.js';
/** Fixed-size, synchronous work stays inside the cancellable decoding Worker.
 * Avoid WebKit worker DecompressionStream stalls after an encoded cache hit.
 * Caller verifies SHA-256 before invoking this decoder. */
export function inflateNormal(bytes:ArrayBuffer,expected:number){
 if(!Number.isSafeInteger(expected)||expected<16||expected>16+8192*8192*8)throw Error('Invalid normal byte budget');
 const input=new Uint8Array(bytes);
 if(input.length<18||input[0]!==31||input[1]!==139||new DataView(bytes).getUint32(bytes.byteLength-4,true)!==expected)throw Error('Normal gzip size differs from manifest');
 const output=new Uint8Array(expected),decoded=gunzipSync(input,{out:output});
 if(decoded.byteLength!==expected)throw Error('Normal decoded size differs from manifest');
 return output.buffer;
}
