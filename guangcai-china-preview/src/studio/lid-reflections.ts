import {Color,Matrix4,Mesh,PlaneGeometry,ShaderMaterial,Vector3,type MeshPhysicalMaterial} from 'three';
import {Reflector} from 'three/addons/objects/Reflector.js';
import type {Product} from '../geometry/product';
import type {Studio} from './studio';

/** A view-dependent planar capture for the flat glazed lid. Only the real knob
 * and its feet are captured; the existing studio response supplies the base glaze. */
export function createLidReflections(studio:Studio,product:Product,porcelain:MeshPhysicalMaterial){
 const plate=product.lid.getObjectByName('lid-double-sided-with-seat') as Mesh;
 const original=plate.material as MeshPhysicalMaterial[];
 const material=porcelain.clone();material.name='lid-planar-glaze';
 plate.material=[material,original[1]];
 const plane=new Reflector(new PlaneGeometry(1,1),{textureWidth:1024,textureHeight:1024,multisample:0});
 plane.rotation.x=-Math.PI/2;plane.visible=false;
 product.lid.add(plane);
 plane.position.y=plate.userData.topHeight;
 const uniforms={lidReflection:{value:plane.getRenderTarget().texture},lidReflectionMatrix:{value:new Matrix4()},lidReflectionEnabled:{value:0}};
 let captures=0,lastKey='',disposed=false;
 const before=porcelain.onBeforeCompile,key=porcelain.customProgramCacheKey.bind(porcelain);
 material.onBeforeCompile=(shader,renderer)=>{
  before.call(material,shader,renderer);Object.assign(shader.uniforms,uniforms);
  shader.vertexShader='uniform mat4 lidReflectionMatrix;\nvarying vec4 vLidReflection;\nvarying float vLidTop;\n'+shader.vertexShader;
  shader.vertexShader=shader.vertexShader.replace('#include <worldpos_vertex>','#include <worldpos_vertex>\nvLidReflection=lidReflectionMatrix*modelMatrix*vec4(transformed,1.0);\nvLidTop=smoothstep(0.94,0.999,normal.y);');
  shader.fragmentShader='uniform sampler2D lidReflection;\nuniform float lidReflectionEnabled;\nvarying vec4 vLidReflection;\nvarying float vLidTop;\n'+shader.fragmentShader;
  shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',`
   vec2 lidUv=vLidReflection.xy/vLidReflection.w;
   vec4 lidSample=texture2D(lidReflection,lidUv)*0.5;
   lidSample+=(texture2D(lidReflection,lidUv+vec2(0.0008,0.0))+texture2D(lidReflection,lidUv-vec2(0.0008,0.0))+texture2D(lidReflection,lidUv+vec2(0.0,0.0008))+texture2D(lidReflection,lidUv-vec2(0.0,0.0008)))*0.125;
   float lidFresnel=0.04+0.96*pow(1.0-clamp(dot(normal,geometryViewDir),0.0,1.0),5.0);
   float lidCoverage=lidSample.a*vLidTop*lidReflectionEnabled*step(0.0,lidUv.x)*step(lidUv.x,1.0)*step(0.0,lidUv.y)*step(lidUv.y,1.0);
   outgoingLight=mix(outgoingLight,lidSample.rgb/max(lidSample.a,0.001),lidCoverage*lidFresnel*0.85);
   #include <opaque_fragment>`);
 };
 material.customProgramCacheKey=()=>key()+'-lid-planar-v3';material.needsUpdate=true;
 const position=new Vector3(),clear=new Color();
 function update(){
  if(disposed||!product.lid.visible)return;
  product.root.updateMatrixWorld(true);studio.camera.updateMatrixWorld(true);
  plane.getWorldPosition(position);
  if(studio.camera.position.y<=position.y){uniforms.lidReflectionEnabled.value=0;return;}
  const current=[...studio.camera.matrixWorld.elements,...studio.camera.projectionMatrix.elements,...product.lid.matrixWorld.elements].map(v=>v.toFixed(5)).join(',');
  if(current===lastKey){uniforms.lidReflectionEnabled.value=1;return;}
  const {scene,renderer,camera}=studio,bg=scene.background,alpha=renderer.getClearAlpha();renderer.getClearColor(clear);
  const hidden=[product.cup,product.saucer,plate,studio.floor],visibility=hidden.map(o=>o.visible);
  try{
   hidden.forEach(o=>o.visible=false);scene.background=null;renderer.setClearColor(0,0);
   plane.onBeforeRender(renderer,scene,camera,plane.geometry,plane.material as ShaderMaterial,null as never);
   uniforms.lidReflectionMatrix.value.copy((plane.material as ShaderMaterial).uniforms.textureMatrix.value).multiply(new Matrix4().copy(plane.matrixWorld).invert());
   uniforms.lidReflectionEnabled.value=1;captures++;lastKey=current;
  }finally{hidden.forEach((o,i)=>o.visible=visibility[i]);plane.visible=false;scene.background=bg;renderer.setClearColor(clear,alpha);}
 }
 return {update,releaseContext(){plane.getRenderTarget().dispose();lastKey='';},invalidate(){lastKey='';material.envMap=studio.porcelainEnvironment;material.needsUpdate=true;},debug:()=>({method:'planar reflection of actual lid knob',captures,resolution:1024}),dispose(){disposed=true;plate.material=original;product.lid.remove(plane);plane.geometry.dispose();plane.dispose();material.dispose();}};
}
