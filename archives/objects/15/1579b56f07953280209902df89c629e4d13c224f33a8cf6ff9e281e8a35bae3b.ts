import {type MeshPhysicalMaterial} from 'three';

/** Porcelain-only response. A zero gain is retained for same-camera evidence. */
export const PORCELAIN = Object.freeze({color:'#fffdf7',indirectGain:1.38,roughness:.16,clearcoatRoughness:.065});
export function calibratePorcelain(material:MeshPhysicalMaterial,mixed=false){
 const previous=material.onBeforeCompile,previousKey=material.customProgramCacheKey.bind(material);
 const uniform={value:1};
 material.onBeforeCompile=(shader,renderer)=>{
  previous.call(material,shader,renderer);
  shader.uniforms.porcelainCalibration=uniform;
  shader.fragmentShader='uniform float porcelainCalibration;\n'+shader.fragmentShader;
  // Use the actual metalness-map coverage, even when the metal inspection switch
  // is off. City / fixed text cannot accidentally inherit the porcelain gain.
  const mask=mixed?'porcelainCoverage':'1.0';
  const coverage=mixed?'float porcelainCoverage=1.0;\n#ifdef USE_METALNESSMAP\nporcelainCoverage=1.0-texture2D(metalnessMap,vMetalnessMapUv).b;\n#endif\n':'';
  shader.fragmentShader=shader.fragmentShader.replace('#include <lights_fragment_end>',`#include <lights_fragment_end>\n${coverage}reflectedLight.indirectDiffuse *= 1.0 + ((${PORCELAIN.indirectGain} * mix(1.08,0.45,smoothstep(-0.75,0.75,normal.x)))-1.0)*porcelainCalibration*${mask};`);
 };
 material.customProgramCacheKey=()=>previousKey()+'-porcelain-v3-'+mixed;
 material.needsUpdate=true;
 return {setEnabled(value:boolean){uniform.value=value?1:0;if(!mixed)material.color.set(value?PORCELAIN.color:'#f4f3ed');},uniform};
}
