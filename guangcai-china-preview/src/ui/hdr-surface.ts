/// <reference types="@webgpu/types" />

// Extended-range output is optional; the existing SDR canvas/selector stays underneath.
// Reference: https://developer.chrome.com/blog/new-in-webgpu-129
const shader=`
@group(0) @binding(0) var source: texture_2d<f32>;
@group(0) @binding(1) var sourceSampler: sampler;
@group(0) @binding(2) var<uniform> settings: vec4f;
fn decodeSRGB(color:vec3f)->vec3f {
 return select(pow((color+vec3f(.055))/1.055,vec3f(2.4)),color/12.92,color<=vec3f(.04045));
}
fn encodeSRGB(color:vec3f)->vec3f {
 return select(1.055*pow(color,vec3f(1./2.4))-vec3f(.055),color*12.92,color<=vec3f(.0031308));
}
struct Vertex { @builtin(position) position: vec4f, @location(0) uv: vec2f };
@vertex fn vertex(@builtin(vertex_index) index:u32)->Vertex {
 let positions=array<vec2f,3>(vec2f(-1,-1),vec2f(3,-1),vec2f(-1,3));
 let p=positions[index];var out:Vertex;out.position=vec4f(p,0,1);out.uv=vec2f((p.x+1)*.5,(1-p.y)*.5);return out;
}
@fragment fn fragment(in:Vertex)->@location(0) vec4f {
 if(settings.y>.5){
  let alpha=1-smoothstep(.47,.5,length(in.uv-vec2f(.5)));
  return vec4f(encodeSRGB(vec3f(settings.x))*alpha,alpha);
 }
 // Gain is scene-linear exposure, not a multiplier on gamma-encoded RGB.
 let linear=decodeSRGB(textureSample(source,sourceSampler,in.uv).rgb);
 return vec4f(encodeSRGB(linear*settings.x),1);
}`;
interface SharedGPU {device:GPUDevice;pipeline:GPURenderPipeline;sampler:GPUSampler}
let shared:Promise<SharedGPU|null>|undefined,users=0;
function acquire(){
 users++;
 if(!shared)shared=(async()=>{
  let device:GPUDevice|undefined;
  try{
   const adapter=await navigator.gpu.requestAdapter({powerPreference:'low-power'});if(!adapter)return null;
   device=await adapter.requestDevice();
   const module=device.createShaderModule({code:shader,label:'Control HDR highlight'});
   const pipeline=await device.createRenderPipelineAsync({layout:'auto',vertex:{module,entryPoint:'vertex'},fragment:{module,entryPoint:'fragment',targets:[{format:'rgba16float'}]},primitive:{topology:'triangle-list'}});
   return {device,pipeline,sampler:device.createSampler({magFilter:'linear',minFilter:'linear'})};
  }catch{device?.destroy();return null;}
 })();
 return shared;
}
function release(){if(--users===0){const previous=shared;shared=undefined;void previous?.then(gpu=>gpu?.device.destroy());}}

/** Field source uploads only when repainted. The white selector uses a 1px texture. */
export function createHDRSurface(host:HTMLElement,source?:HTMLCanvasElement){
 const canvas=document.createElement('canvas');canvas.className=source?'xy-hdr-field':'xy-hdr-selector';
 canvas.setAttribute('aria-hidden','true');canvas.hidden=true;if(source)source.after(canvas);else host.append(canvas);
 const media=matchMedia('(dynamic-range: high)');
 let gpu:SharedGPU|null=null,context:GPUCanvasContext|null=null,texture:GPUTexture|undefined,uniform:GPUBuffer|undefined,bindGroup:GPUBindGroup|undefined;
 let disposed=false,requested=false,failed=false,ready=false,epoch=0,gain=1,dirty=true,sourceWidth=0,sourceHeight=0,lastGain=NaN,frames=0,uploads=0;
 let onGPUError:((event:GPUUncapturedErrorEvent)=>void)|undefined;
 const setStatus=(status:string)=>{canvas.dataset.hdrState=status;};
 function teardown(status:string){
  ++epoch;ready=false;canvas.hidden=true;setStatus(status);texture?.destroy();uniform?.destroy();context?.unconfigure();
  if(onGPUError)gpu?.device.removeEventListener('uncapturederror',onGPUError);onGPUError=undefined;
  gpu=null;texture=undefined;uniform=undefined;context=null;bindGroup=undefined;sourceWidth=sourceHeight=0;lastGain=NaN;dirty=true;
  if(requested){requested=false;release();}
 }
 function fail(reason:unknown='Extended output unavailable'){failed=true;canvas.dataset.hdrReason=String(reason);teardown('unavailable');}
 async function initialize(){
  if(disposed||requested||failed)return;
  if(!media.matches){setStatus('sdr-display');return;}
  if(!isSecureContext||!navigator.gpu){setStatus('unavailable');return;}
  requested=true;const generation=++epoch;delete canvas.dataset.hdrReason;setStatus('checking');
  const candidate=await acquire();if(disposed||generation!==epoch)return;
  if(!candidate){fail();return;}
  gpu=candidate;const device=gpu.device;context=canvas.getContext('webgpu');if(!context){fail();return;}
  device.pushErrorScope('validation');
  try{
   context.configure({device,format:'rgba16float',colorSpace:'srgb',alphaMode:'premultiplied',toneMapping:{mode:'extended'}});
   const actual=context.getConfiguration();
   if(actual?.toneMapping?.mode!=='extended'||actual.format!=='rgba16float')throw new Error('Extended output unavailable');
   uniform=device.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});
  }catch(error){await device.popErrorScope();fail(error);return;}
  const error=await device.popErrorScope();if(disposed||generation!==epoch)return;if(error){fail();return;}
  onGPUError=(event:GPUUncapturedErrorEvent)=>{event.preventDefault();if(!disposed&&generation===epoch)fail(event.error.message);};
  device.addEventListener('uncapturederror',onGPUError,{once:true});
  void device.lost.then(()=>{if(!disposed&&generation===epoch)fail();});
  ready=true;setStatus('ready');canvas.dataset.hdrFormat='rgba16float/extended';render();
 }
 function render(){
  if(!ready||!gpu||!context||!uniform||disposed)return;
  if(gain<=1.001||host.closest('[hidden]')){canvas.hidden=true;return;}
  try{
   const width=source?.width??Math.round(host.clientWidth*Math.min(devicePixelRatio||1,2));
   const height=source?.height??Math.round(host.clientHeight*Math.min(devicePixelRatio||1,2));
   if(!width||!height)return;
   const resized=canvas.width!==width||canvas.height!==height;if(resized){canvas.width=width;canvas.height=height;}
   const tw=source?width:1,th=source?height:1;
   if(sourceWidth!==tw||sourceHeight!==th){
    texture?.destroy();texture=gpu.device.createTexture({size:[tw,th],format:'rgba8unorm',usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});
    sourceWidth=tw;sourceHeight=th;dirty=true;
    bindGroup=gpu.device.createBindGroup({layout:gpu.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:texture.createView()},{binding:1,resource:gpu.sampler},{binding:2,resource:{buffer:uniform}}]});
   }
   if(!dirty&&!resized&&lastGain===gain){canvas.hidden=false;return;}
   if(dirty){
    if(source)gpu.device.queue.copyExternalImageToTexture({source},{texture:texture!,colorSpace:'srgb'},[tw,th]);
    else gpu.device.queue.writeTexture({texture:texture!},new Uint8Array([255,255,255,255]),{bytesPerRow:4},[1,1]);
    dirty=false;canvas.dataset.hdrUploads=String(++uploads);
   }
   gpu.device.queue.writeBuffer(uniform,0,new Float32Array([gain,source?0:1,0,0]));
   const encoder=gpu.device.createCommandEncoder();
   const pass=encoder.beginRenderPass({colorAttachments:[{view:context.getCurrentTexture().createView(),clearValue:[0,0,0,0],loadOp:'clear',storeOp:'store'}]});
   pass.setPipeline(gpu.pipeline);pass.setBindGroup(0,bindGroup!);pass.draw(3);pass.end();gpu.device.queue.submit([encoder.finish()]);
   lastGain=gain;canvas.hidden=false;canvas.dataset.hdrFrames=String(++frames);canvas.dataset.hdrGain=String(gain);
  }catch(error){fail(error);}
 }
 const changed=()=>{failed=false;if(!media.matches)teardown('sdr-display');else void initialize();};media.addEventListener('change',changed);
 setStatus(media.matches?'idle':'sdr-display');
 return {
  update(nextGain:number,repainted=false){gain=Number.isFinite(nextGain)?Math.max(1,Math.min(2.25,nextGain)):1;dirty||=repainted;if(!host.closest('[hidden]'))void initialize();render();},
  dispose(){disposed=true;media.removeEventListener('change',changed);teardown('disposed');canvas.remove();},
 };
}
