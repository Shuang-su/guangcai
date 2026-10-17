import {CubeCamera,HalfFloatType,LinearFilter,PMREMGenerator,ShaderChunk,Vector3,WebGLCubeRenderTarget,type MeshPhysicalMaterial,type WebGLRenderTarget} from 'three';
import type {Product}from'../geometry/product';
import type {Studio}from'./studio';
/** Geometry-aware local reflection probe. The receiving cup wall is hidden only
 * during capture. Nearby handle/lid/saucer are rendered with their real materials.
 * A single centre probe is a local approximation, not ray-traced self reflection. */
export function createLocalReflections(studio:Studio,product:Product,material:MeshPhysicalMaterial,companions:MeshPhysicalMaterial[]=[],captureBudget?:(active:boolean)=>void){
 const target=new WebGLCubeRenderTarget(512,{type:HalfFloatType,minFilter:LinearFilter,generateMipmaps:false});
 const camera=new CubeCamera(.3,2500,target);
 const wall=product.cup.getObjectByName('cup-wall-and-recessed-foot')!,mark=product.cup.getObjectByName('cup-bottom-mark')!;
 let filtered:WebGLRenderTarget|undefined,enabled=true,ready=false,disposed=false,captures=0,lastKey='',observedKey='',changedAt=0;
 const position=new Vector3();
 const probeUniforms={cupProbePosition:{value:position},cupProbeHandleDirection:{value:new Vector3(1,0,0)},cupProbeMinimum:{value:new Vector3()},cupProbeMaximum:{value:new Vector3()},cupProbeEnabled:{value:0}};
 // A finite capture volume corrects the strongest near-handle parallax. Keep
 // the distant studio directions unchanged outside that local angular sector.
 const receivers=[material,...companions];
 for(const receiver of receivers){
 receiver.envMap=studio.cupEnvironment;
 receiver.onBeforeCompile=shader=>{
  Object.assign(shader.uniforms,probeUniforms);
  shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vCupProbePosition;').replace('#include <worldpos_vertex>','#include <worldpos_vertex>\nvCupProbePosition = (modelMatrix * vec4(transformed, 1.0)).xyz;');
  const chunk=ShaderChunk.envmap_physical_pars_fragment.replace('vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );',`
   float handleSector = smoothstep(0.55, 0.85, dot(reflectVec,cupProbeHandleDirection)) * (1.0 - smoothstep(0.3, 0.7, abs(dot(reflectVec,cross(cupProbeHandleDirection,vec3(0.0,1.0,0.0)))))) * cupProbeEnabled;
   vec3 safeRay = mix(vec3(-1.0), vec3(1.0), step(vec3(0.0), reflectVec)) * max(abs(reflectVec), vec3(0.00001));
   vec3 distances = max((cupProbeMaximum-vCupProbePosition)/safeRay, (cupProbeMinimum-vCupProbePosition)/safeRay);
   float travel = max(0.0, min(min(distances.x, distances.y), distances.z));
   vec3 localDirection = normalize(vCupProbePosition + reflectVec * travel - cupProbePosition);
   reflectVec = normalize(mix(reflectVec, localDirection, handleSector));
   vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );`);
  shader.fragmentShader='varying vec3 vCupProbePosition;\nuniform vec3 cupProbePosition;\nuniform vec3 cupProbeHandleDirection;\nuniform vec3 cupProbeMinimum;\nuniform vec3 cupProbeMaximum;\nuniform float cupProbeEnabled;\n'+shader.fragmentShader.replace('#include <envmap_physical_pars_fragment>',chunk);
 };
 receiver.customProgramCacheKey=()=> 'cup-local-reflection-parallax-v1';
 }
 const key=()=>product.root.children.map(o=>[...o.position.toArray(),...o.quaternion.toArray(),o.visible?1:0].map(v=>v.toFixed(3)).join(',')).join('/');
 function capture(options:{includeHandle?:boolean}={}){
  if(disposed||!ready)return;
  const {renderer,scene}=studio,background=scene.background,blur=scene.backgroundBlurriness,autoShadow=renderer.shadowMap.autoUpdate;
  const hidden=[wall,mark,studio.floor];
  if(options.includeHandle===false)hidden.push(product.cup.getObjectByName('wide-ribbon-handle')!);
  const visibility=hidden.map(o=>o.visible);
  captureBudget?.(true);
  const pmrem=new PMREMGenerator(studio.renderer);
  try{
   product.root.updateMatrixWorld(true);product.cup.getWorldPosition(position);camera.position.copy(position);probeUniforms.cupProbeHandleDirection.value.set(1,0,0).transformDirection(product.cup.matrixWorld);
   probeUniforms.cupProbeMinimum.value.copy(position).add(new Vector3(-83,-65,-83));probeUniforms.cupProbeMaximum.value.copy(position).add(new Vector3(83,65,83));
   hidden.forEach(o=>o.visible=false);scene.background=studio.cupEnvironment;scene.backgroundBlurriness=0;
   renderer.shadowMap.autoUpdate=false;camera.update(renderer,scene);
   const next=pmrem.fromCubemap(target.texture);filtered?.dispose();filtered=next;captures++;lastKey=key();
  }finally{
   pmrem.dispose();target.dispose();captureBudget?.(false);
   hidden.forEach((o,i)=>o.visible=visibility[i]);scene.background=background;scene.backgroundBlurriness=blur;renderer.shadowMap.autoUpdate=autoShadow;
  }
  if(enabled){for(const receiver of receivers){receiver.envMap=filtered!.texture;receiver.needsUpdate=true;}probeUniforms.cupProbeEnabled.value=1;}
 }
 return{
  initialize(){ready=true;capture();},
  releaseContext(){target.dispose();filtered?.dispose();filtered=undefined;ready=false;lastKey='';},
  invalidate(){lastKey='';ready=false;for(const receiver of receivers){receiver.envMap=studio.cupEnvironment;receiver.needsUpdate=true;}},
  update(now:number){if(!ready||disposed||!enabled)return;const next=key();if(next!==observedKey){observedKey=next;changedAt=now;}if(next!==lastKey&&now-changedAt>160)capture();},
  setEnabled(value:boolean){enabled=value;probeUniforms.cupProbeEnabled.value=value?1:0;if(!value){for(const receiver of receivers){receiver.envMap=studio.cupEnvironment;receiver.needsUpdate=true;}}else{capture();}},
  refresh:capture,
  debug(){return {enabled,ready,captures,resolution:512,position:position.toArray(),envMap:material.envMap?.uuid,method:'local cube probe; cup wall excluded, real nearby geometry included',approximation:'single centre probe with finite-volume correction near handle; no ray tracing or multiple bounces'};},
  dispose(){if(disposed)return;disposed=true;for(const receiver of receivers)receiver.envMap=null;target.dispose();filtered?.dispose();}
 };
}
