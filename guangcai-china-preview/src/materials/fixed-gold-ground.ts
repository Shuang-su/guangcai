import {Color, MeshPhysicalMaterial} from 'three';

// The registered colour master remains untouched. Only confirmed bare gold gets
// a uniform pigment value; illumination still comes from the physical material.
const gold=new Color('#ffc846');
const installed=new WeakSet<MeshPhysicalMaterial>();
export function configureFixedGoldGround(material:MeshPhysicalMaterial,enabled=false){
 material.userData.cleanGoldGround=enabled;
 if(!installed.has(material)){
  installed.add(material);
  const previous=material.onBeforeCompile,key=material.customProgramCacheKey.bind(material);
  material.onBeforeCompile=(shader,renderer)=>{
   previous.call(material,shader,renderer);
   if(!material.userData.cleanGoldGround)return;
   const sample=material.userData.fixedAtlas?'sampleFixedAtlas':'texture2D';
   shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`
    #if defined(USE_MAP) && defined(USE_METALNESSMAP)
      float bareGold=${sample}(metalnessMap,vMetalnessMapUv).b;
      diffuseColor.rgb=mix(diffuseColor.rgb,vec3(${gold.r.toFixed(9)},${gold.g.toFixed(9)},${gold.b.toFixed(9)}),smoothstep(0.92,0.965,bareGold));
    #endif
    #include <color_fragment>`);
  };
  material.customProgramCacheKey=()=>key()+'-clean-gold-blue-channel-'+Boolean(material.userData.cleanGoldGround);
 }
 material.needsUpdate=true;
}
