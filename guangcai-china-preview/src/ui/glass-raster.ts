import {materials} from '../../vendor/glass-hq/src/core/materials';
import {tintChannels} from '../../vendor/glass-hq/src/dom/material-graph';
import type {LayerLens} from '../../vendor/glass-hq/src/dom/lens-layers';
import type {MaterialMaps} from '../../vendor/glass-hq/src/dom/maps';
import {decodedMaterialImage} from '../../vendor/glass-hq/src/dom/maps';

const vertex=`#version 300 es
precision highp float;
out vec2 uv;
void main(){uv=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(uv.x*2.-1.,1.-uv.y*2.,0,1);}`;
const head=`#version 300 es
precision highp float;
in vec2 uv;
`;
const baseFragment=head+`
uniform sampler2D model,background;
uniform vec2 cover;
uniform bool hasBackground;
out vec4 color;
void main(){vec4 m=texture(model,uv);vec3 b=hasBackground?texture(background,(uv-.5)*cover+.5).rgb:vec3(.9804,.9765,.9608);color=vec4(m.rgb+b*(1.-m.a),1);}`;
const copyFragment=head+`
uniform sampler2D source;
out vec4 color;
void main(){color=texture(source,vec2(uv.x,1.-uv.y));}`;
// Separable Gaussian, sampled at two CSS pixels. Sigma and fill weights are
// the original material constants. No CPU readback or per-frame image encoding.
const blurFragment=head+`
uniform sampler2D smallSource,wideSource;
uniform vec2 direction,sigma;
layout(location=0) out vec4 smallColor;
layout(location=1) out vec4 wideColor;
void main(){vec2 at=vec2(uv.x,1.-uv.y);vec4 a=vec4(0),b=vec4(0);vec2 sum=vec2(0);
for(int i=-35;i<=35;i++){float d=float(i)*2.;vec2 weight=exp(-.5*d*d/(sigma*sigma));weight*=step(vec2(abs(d)),3.*sigma);
a+=texture(smallSource,at+direction*float(i))*weight.x;b+=texture(wideSource,at+direction*float(i))*weight.y;sum+=weight;}
smallColor=a/sum.x;wideColor=b/sum.y;}`;
const lensFragment=head+`
uniform sampler2D backdrop,frost,fill,fieldA,fieldB,overlayA,overlayB;
uniform vec2 size;
uniform vec4 boxA,boxB;
uniform vec2 capsuleA,capsuleB;
uniform float mixMaps,travel,opacity,fillOpacity;
uniform bool regular,dark,nested,tinted;
uniform vec4 tone;
uniform vec3 tint;
layout(location=0) out vec4 accumulated;
layout(location=1) out vec4 glass;
vec4 mapAt(sampler2D plane,vec4 box,vec2 capsule){
 vec2 p=(uv*size-box.xy)/box.zw;
 if(any(lessThan(p,vec2(0)))||any(greaterThan(p,vec2(1))))return vec4(0);
 float cap=capsule.x*box.w/capsule.y;
 if(capsule.x>0.&&box.z>=2.*cap){float x=p.x*box.z;float nativeWidth=3.*(capsule.y-4.)+4.;
 if(x<cap)p.x=x/cap*capsule.x/nativeWidth;
 else if(x>box.z-cap)p.x=1.-(box.z-x)/cap*capsule.x/nativeWidth;
 else p.x=.5;}
 vec4 v=texture(plane,p);return vec4(v.rgb*v.a,v.a);
}
vec3 curve(vec3 v){
 if(regular){vec3 t=tone.x+tone.y*v+tone.z*v*v;return mix(v,t,dark?.90:.80);}
 vec3 t=v+tone.x*pow(1.-v,vec3(3))-tone.y*pow(v,vec3(3));
 vec3 wash=dark?.38*v+.20:.78*v+.26;
 return clamp(mix(t,wash,dark?.14:.06)+(dark&&nested?.08*(1.-v):vec3(0)),0.,1.);
}
void main(){
 vec4 field=mix(mapAt(fieldA,boxA,capsuleA),mapAt(fieldB,boxB,capsuleB),mixMaps);
 if(field.a<.001)discard;
 vec2 displacement=(field.rg/field.a-.5)*2.*travel;
 vec2 at=(uv*size+displacement)/size;at.y=1.-at.y;
 vec3 c=texture(backdrop,at).rgb;
 if(regular){vec3 f=texture(frost,at).rgb,g=texture(fill,at).rgb;c=mix(f,dark?min(f,g):max(f,g),fillOpacity);}
 // SVG table transfer uses 33 samples with linear interpolation.
 vec3 grid=clamp(c,0.,1.)*32.;c=mix(curve(floor(grid)/32.),curve(ceil(grid)/32.),fract(grid));
 if(regular){float l=dot(c,vec3(.213,.715,.072));c=clamp(mix(vec3(l),c,tone.w),0.,1.);}
 if(tinted){float body=regular?.78:.68;c=tint*(body+(1.-body)*dot(c,vec3(.213,.715,.072)));}
 vec4 light=mix(mapAt(overlayA,boxA,capsuleA),mapAt(overlayB,boxB,capsuleB),mixMaps);
 if(tinted)light.rgb*=(.45+.55*tint)/(dark?.82:1.);
 vec4 result=vec4(c*field.a,field.a)*(1.-light.a)+light;
 glass=accumulated=result*opacity;
}`;

type Target={frame:WebGLFramebuffer;textures:WebGLTexture[];width:number;height:number};
type Program={program:WebGLProgram;locations:Map<string,WebGLUniformLocation|null>};
type MapTexture={texture:WebGLTexture;ready:boolean;last:number};

/** Final material-graph port for mobile WebKit. The existing Glass-HQ scene
 * still measures every shape and produces all field/overlay/morph pixels.
 * Only its SVG/WebGL composition is replaced. Both the original model and
 * this transparent optical canvas are ordinary, unfiltered sibling layers.
 * The offscreen accumulator includes earlier glass, so nested lenses refract
 * their finished parent instead of resampling the bare model. */
export function createRasterGlass(root:HTMLElement,onError:(error:unknown)=>void){
 const canvas=document.createElement('canvas');canvas.className='glass-raster';canvas.setAttribute('aria-hidden','true');
 const gl=canvas.getContext('webgl2',{alpha:true,antialias:false,premultipliedAlpha:true,depth:false,stencil:false,preserveDrawingBuffer:false});
 if(!gl)throw Error('Glass compositor WebGL2 unavailable');
 const gpu=gl;
 const compile=(type:number,source:string)=>{const shader=gpu.createShader(type)!;gpu.shaderSource(shader,source);gpu.compileShader(shader);if(!gpu.getShaderParameter(shader,gpu.COMPILE_STATUS)){const error=gpu.getShaderInfoLog(shader);gpu.deleteShader(shader);throw Error(error??'Glass shader failed');}return shader;};
 const program=(source:string):Program=>{const p=gpu.createProgram()!,v=compile(gpu.VERTEX_SHADER,vertex),f=compile(gpu.FRAGMENT_SHADER,source);gpu.attachShader(p,v);gpu.attachShader(p,f);gpu.linkProgram(p);gpu.deleteShader(v);gpu.deleteShader(f);if(!gpu.getProgramParameter(p,gpu.LINK_STATUS))throw Error(gpu.getProgramInfoLog(p)??'Glass program failed');return {program:p,locations:new Map()};};
 const base=program(baseFragment),copy=program(copyFragment),blur=program(blurFragment),lens=program(lensFragment);
 const location=(p:Program,key:string)=>{if(!p.locations.has(key))p.locations.set(key,gpu.getUniformLocation(p.program,key));return p.locations.get(key)!;};
 const scalar=(p:Program,key:string,n:number)=>gpu.uniform1f(location(p,key),n);
 const flag=(p:Program,key:string,n:boolean)=>gpu.uniform1i(location(p,key),Number(n));
 const vector=(p:Program,key:string,n:number[])=>{if(n.length===2)gpu.uniform2fv(location(p,key),n);else if(n.length===3)gpu.uniform3fv(location(p,key),n);else gpu.uniform4fv(location(p,key),n);};
 const texture=()=>{const t=gpu.createTexture()!;gpu.bindTexture(gpu.TEXTURE_2D,t);gpu.texParameteri(gpu.TEXTURE_2D,gpu.TEXTURE_MIN_FILTER,gpu.LINEAR);gpu.texParameteri(gpu.TEXTURE_2D,gpu.TEXTURE_MAG_FILTER,gpu.LINEAR);gpu.texParameteri(gpu.TEXTURE_2D,gpu.TEXTURE_WRAP_S,gpu.CLAMP_TO_EDGE);gpu.texParameteri(gpu.TEXTURE_2D,gpu.TEXTURE_WRAP_T,gpu.CLAMP_TO_EDGE);return t;};
 const bind=(p:Program,key:string,t:WebGLTexture,unit:number)=>{gpu.activeTexture(gpu.TEXTURE0+unit);gpu.bindTexture(gpu.TEXTURE_2D,t);gpu.uniform1i(location(p,key),unit);};
 const allocate=(t:WebGLTexture,w:number,h:number)=>{gpu.bindTexture(gpu.TEXTURE_2D,t);gpu.texImage2D(gpu.TEXTURE_2D,0,gpu.RGBA8,w,h,0,gpu.RGBA,gpu.UNSIGNED_BYTE,null);};
 const target=(count:number):Target=>({frame:gpu.createFramebuffer()!,textures:Array.from({length:count},texture),width:0,height:0});
 const resizeTarget=(t:Target,w:number,h:number)=>{if(t.width===w&&t.height===h)return;t.width=w;t.height=h;gpu.bindFramebuffer(gpu.FRAMEBUFFER,t.frame);t.textures.forEach((v,i)=>{allocate(v,w,h);gpu.framebufferTexture2D(gpu.FRAMEBUFFER,gpu.COLOR_ATTACHMENT0+i,gpu.TEXTURE_2D,v,0);});gpu.drawBuffers(t.textures.map((_,i)=>gpu.COLOR_ATTACHMENT0+i));if(gpu.checkFramebufferStatus(gpu.FRAMEBUFFER)!==gpu.FRAMEBUFFER_COMPLETE)throw Error('Glass framebuffer incomplete');};
 const accumulated=target(2),blurX=target(2),blurY=target(2),snapshot=texture(),modelTexture=texture(),backgroundTexture=texture();
 const images=new Map<string,MapTexture>();
 let lenses:readonly LayerLens[]=[],width=0,height=0,ratio=1,disposed=false,frames=0,lastDuration=0,backgroundUrl='',backgroundImage:HTMLImageElement|undefined,backgroundReady=false,source:HTMLCanvasElement|null=null;
 const upload=(t:WebGLTexture,image:TexImageSource,premultiplied=false)=>{gpu.bindTexture(gpu.TEXTURE_2D,t);gpu.pixelStorei(gpu.UNPACK_FLIP_Y_WEBGL,false);gpu.pixelStorei(gpu.UNPACK_PREMULTIPLY_ALPHA_WEBGL,premultiplied);gpu.pixelStorei(gpu.UNPACK_COLORSPACE_CONVERSION_WEBGL,gpu.NONE);gpu.texImage2D(gpu.TEXTURE_2D,0,gpu.RGBA,gpu.RGBA,gpu.UNSIGNED_BYTE,image);};
 allocate(backgroundTexture,1,1);
 const mapTexture=(url:string)=>{let entry=images.get(url);if(!entry){entry={texture:texture(),ready:false,last:frames};images.set(url,entry);const decoded=decodedMaterialImage(url);if(decoded){upload(entry.texture,decoded);entry.ready=true;}else{allocate(entry.texture,1,1);const image=new Image();image.src=url;const next=entry;void image.decode().then(()=>{if(disposed||images.get(url)!==next)return;upload(next.texture,image);next.ready=true;render();}).catch(onError);}}entry.last=frames;return entry;};
 const draw=()=>gpu.drawArrays(gpu.TRIANGLES,0,3);
 const scissor=(x:number,y:number,w:number,h:number,scale=ratio)=>{const left=Math.max(0,Math.floor(x*scale)),bottom=Math.max(0,Math.floor((height-y-h)*scale));const right=Math.min(Math.ceil(width*scale),Math.ceil((x+w)*scale)),top=Math.min(Math.ceil(height*scale),Math.ceil((height-y)*scale));gpu.scissor(left,bottom,Math.max(0,right-left),Math.max(0,top-bottom));};
 const render=()=>{
  if(disposed||!source||!width||!height||!lenses.length)return;
  const start=performance.now();
  try{
   if(gpu.isContextLost())return;
   const w=Math.ceil(width*ratio),h=Math.ceil(height*ratio);
   if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;resizeTarget(accumulated,w,h);resizeTarget(blurX,Math.ceil(width/2),Math.ceil(height/2));resizeTarget(blurY,blurX.width,blurX.height);allocate(snapshot,w,h);}
   gpu.disable(gpu.SCISSOR_TEST);gpu.disable(gpu.BLEND);gpu.bindFramebuffer(gpu.FRAMEBUFFER,accumulated.frame);gpu.viewport(0,0,w,h);gpu.drawBuffers([gpu.COLOR_ATTACHMENT0,gpu.COLOR_ATTACHMENT1]);gpu.clearBufferfv(gpu.COLOR,1,new Float32Array(4));gpu.drawBuffers([gpu.COLOR_ATTACHMENT0]);
   upload(modelTexture,source,true);gpu.useProgram(base.program);bind(base,'model',modelTexture,0);bind(base,'background',backgroundTexture,1);flag(base,'hasBackground',backgroundReady);
   const factor=backgroundImage?Math.max(width/backgroundImage.width,height/backgroundImage.height):1;
   vector(base,'cover',backgroundImage?[width/(backgroundImage.width*factor),height/(backgroundImage.height*factor)]:[1,1]);draw();
   gpu.enable(gpu.SCISSOR_TEST);
   for(const l of lenses){
    const a=l.place?.a??{maps:l.maps,x:l.x,y:l.y,w:l.w,h:l.h},b=l.place?.b??a;
    const maps=[a.maps.field,b.maps.field,a.maps.overlay,b.maps.overlay].map(mapTexture);if(maps.some(m=>!m.ready))continue;
    let clip={x:Math.max(0,l.x-2),y:Math.max(0,l.y-2),right:Math.min(width,l.x+l.w+2),bottom:Math.min(height,l.y+l.h+2)};
    if(l.clipBounds){clip.x=Math.max(clip.x,l.clipBounds.x);clip.y=Math.max(clip.y,l.clipBounds.y);clip.right=Math.min(clip.right,l.clipBounds.x+l.clipBounds.width);clip.bottom=Math.min(clip.bottom,l.clipBounds.y+l.clipBounds.height);}
    // DOM clips must also constrain the optical layer during panel collapse.
    for(let e=l.element.parentElement;e&&e!==root;e=e.parentElement){const style=getComputedStyle(e);if(/hidden|clip/.test(style.overflowX+style.overflowY)){const r=e.getBoundingClientRect(),origin=root.getBoundingClientRect();clip.x=Math.max(clip.x,r.left-origin.left);clip.y=Math.max(clip.y,r.top-origin.top);clip.right=Math.min(clip.right,r.right-origin.left);clip.bottom=Math.min(clip.bottom,r.bottom-origin.top);}}
    if(clip.right<=clip.x||clip.bottom<=clip.y)continue;
    const o=l.options,dark=o.appearance==='dark',regular=o.material==='regular',spec=dark?materials.regular.dark:materials.regular.light;
    const reach=l.refraction+(regular?3*spec.fillSigma:0)+6;
    const x=Math.max(0,Math.floor((clip.x-reach)*ratio)),y=Math.max(0,Math.floor((height-clip.bottom-reach)*ratio));
    const right=Math.min(w,Math.ceil((clip.right+reach)*ratio)),top=Math.min(h,Math.ceil((height-clip.y+reach)*ratio));
    gpu.bindFramebuffer(gpu.FRAMEBUFFER,accumulated.frame);gpu.readBuffer(gpu.COLOR_ATTACHMENT0);gpu.activeTexture(gpu.TEXTURE0);gpu.bindTexture(gpu.TEXTURE_2D,snapshot);gpu.copyTexSubImage2D(gpu.TEXTURE_2D,0,x,y,x,y,right-x,top-y);
    if(regular){
     gpu.disable(gpu.BLEND);gpu.useProgram(blur.program);vector(blur,'sigma',[materials.regular.blur,spec.fillSigma]);
     gpu.bindFramebuffer(gpu.FRAMEBUFFER,blurX.frame);gpu.viewport(0,0,blurX.width,blurX.height);scissor(clip.x-l.refraction-3*spec.fillSigma-4,clip.y-l.refraction-3*spec.fillSigma-4,clip.right-clip.x+2*(l.refraction+3*spec.fillSigma+4),clip.bottom-clip.y+2*(l.refraction+3*spec.fillSigma+4),.5);
     vector(blur,'direction',[2/width,0]);bind(blur,'smallSource',snapshot,0);bind(blur,'wideSource',snapshot,1);draw();
     gpu.bindFramebuffer(gpu.FRAMEBUFFER,blurY.frame);vector(blur,'direction',[0,2/height]);bind(blur,'smallSource',blurX.textures[0],0);bind(blur,'wideSource',blurX.textures[1],1);draw();
    }
    gpu.bindFramebuffer(gpu.FRAMEBUFFER,accumulated.frame);gpu.drawBuffers([gpu.COLOR_ATTACHMENT0,gpu.COLOR_ATTACHMENT1]);gpu.viewport(0,0,w,h);scissor(clip.x,clip.y,clip.right-clip.x,clip.bottom-clip.y);
    gpu.enable(gpu.BLEND);gpu.blendFunc(gpu.ONE,gpu.ONE_MINUS_SRC_ALPHA);gpu.useProgram(lens.program);
    bind(lens,'backdrop',snapshot,0);bind(lens,'frost',blurY.textures[0],1);bind(lens,'fill',blurY.textures[1],2);
    ['fieldA','fieldB','overlayA','overlayB'].forEach((key,i)=>bind(lens,key,maps[i].texture,i+3));
    vector(lens,'size',[width,height]);vector(lens,'boxA',[a.x-2,a.y-2,a.w+4,a.h+4]);vector(lens,'boxB',[b.x-2,b.y-2,b.w+4,b.h+4]);
    const cap=(m:MaterialMaps)=>m.capsule?[m.capsule.cap,m.capsule.height]:[0,1];vector(lens,'capsuleA',cap(a.maps));vector(lens,'capsuleB',cap(b.maps));
    scalar(lens,'mixMaps',l.place?.mix??0);scalar(lens,'travel',l.refraction);scalar(lens,'opacity',l.opacity);scalar(lens,'fillOpacity',spec.fillOpacity);
    flag(lens,'regular',regular);flag(lens,'dark',dark);flag(lens,'nested',l.parents.length>0);const tint=tintChannels(o);flag(lens,'tinted',!!tint);vector(lens,'tint',tint??[1,1,1]);
    const clear=dark?materials.clear.dark:materials.clear.light;vector(lens,'tone',regular?[...spec.tone]:[clear.shadowLift,clear.highlightRolloff,0,0]);draw();
   }
   gpu.bindFramebuffer(gpu.FRAMEBUFFER,null);gpu.viewport(0,0,w,h);gpu.disable(gpu.SCISSOR_TEST);gpu.disable(gpu.BLEND);gpu.useProgram(copy.program);bind(copy,'source',accumulated.textures[1],0);draw();
   frames++;lastDuration=performance.now()-start;
   if(frames%120===0)for(const [url,m]of images)if(frames-m.last>240){gpu.deleteTexture(m.texture);images.delete(url);}
  }catch(error){onError(error);}
 };
 const refreshBackground=()=>{const element=root.querySelector<HTMLElement>('#scene-background');const url=element?.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1]??'';if(url===backgroundUrl)return;backgroundUrl=url;backgroundReady=false;if(!url)return;const image=new Image();image.src=url;void image.decode().then(()=>{if(disposed||backgroundUrl!==url)return;backgroundImage=image;upload(backgroundTexture,image);backgroundReady=true;}).catch(onError);};
 const observer=new MutationObserver(refreshBackground);const background=root.querySelector('#scene-background');if(background)observer.observe(background,{attributes:true,attributeFilter:['style']});refreshBackground();
 const lost=(event:Event)=>{event.preventDefault();onError(Error('Glass compositor context lost'));};canvas.addEventListener('webglcontextlost',lost);
 root.append(canvas);
 return {
  update(next:readonly LayerLens[],content:HTMLElement,rect:{width:number;height:number}){lenses=next;source=content.querySelector('canvas');width=rect.width;height=rect.height;ratio=Math.min(devicePixelRatio||1,1.5);render();},
  render,
  debug:()=>({frames,lenses:lenses.length,textures:images.size,renderMs:Math.round(lastDuration*10)/10,dpr:ratio}),
  owns:(node:Node)=>node===canvas,
  dispose(){if(disposed)return;disposed=true;observer.disconnect();canvas.removeEventListener('webglcontextlost',lost);canvas.remove();for(const t of [accumulated,blurX,blurY]){gpu.deleteFramebuffer(t.frame);t.textures.forEach(v=>gpu.deleteTexture(v));}for(const t of [snapshot,modelTexture,backgroundTexture,...[...images.values()].map(v=>v.texture)])gpu.deleteTexture(t);for(const p of [base,copy,blur,lens])gpu.deleteProgram(p.program);images.clear();gpu.getExtension('WEBGL_lose_context')?.loseContext();},
 };
}
