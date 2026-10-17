/** A large lossless normal map may take minutes on a slow link. Only abort
 * stalled transfers; a total-duration deadline repeatedly discards progress. */
export async function downloadBytes(url:URL,idleMs=120000,request:typeof fetch=fetch):Promise<ArrayBuffer>{
 const controller=new AbortController();let timer:ReturnType<typeof setTimeout>;
 const progress=()=>{clearTimeout(timer);timer=setTimeout(()=>controller.abort(),idleMs);};
 progress();
 try{
  const response=await request(url,{signal:controller.signal});
  if(!response.ok||!response.body)throw new Error(`资源读取失败 (${response.status})`);
  progress();
  const monitored=response.body.pipeThrough(new TransformStream<Uint8Array,Uint8Array>({transform(chunk,output){if(chunk.byteLength)progress();output.enqueue(chunk);}}));
  return await new Response(monitored).arrayBuffer();
 }finally{clearTimeout(timer!);}
}
