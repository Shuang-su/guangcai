import {type MeshPhysicalMaterial,type Texture} from 'three';

export function setPorcelainCoverage(material:MeshPhysicalMaterial,texture:Texture|null){
 const u=material.userData.porcelainArtworkCoverage;if(u){u.map.value=texture;u.enabled.value=texture?1:0;}
}

/** Porcelain-only response. A zero gain is retained for same-camera evidence. */
export const PORCELAIN = Object.freeze({color:'#fffdf7',indirectGain:1.38,roughness:.16,clearcoatRoughness:.065});
export function calibratePorcelain(material:MeshPhysicalMaterial,mixed=false){
 const previous=material.onBeforeCompile,previousKey=material.customProgramCacheKey.bind(material);
 const uniform={value:1};
 const coverageMap={value:null as Texture|null},coverageEnabled={value:0};
 if(mixed)material.userData.porcelainArtworkCoverage={map:coverageMap,enabled:coverageEnabled};
 material.onBeforeCompile=(shader,renderer)=>{
  previous.call(material,shader,renderer);
  shader.uniforms.porcelainCalibration=uniform;
  if(mixed){shader.uniforms.porcelainArtworkMap=coverageMap;shader.uniforms.porcelainArtworkEnabled=coverageEnabled;shader.fragmentShader='uniform sampler2D porcelainArtworkMap;\nuniform float porcelainArtworkEnabled;\n'+shader.fragmentShader;}
  shader.fragmentShader='uniform float porcelainCalibration;\n'+shader.fragmentShader;
  // Use the actual metalness-map coverage, even when the metal inspection switch
  // is off. City / fixed text cannot accidentally inherit the porcelain gain.
  const mask=mixed?'porcelainCoverage':'1.0';
  const coverage=mixed?'float porcelainCoverage=1.0;\n#ifdef USE_METALNESSMAP\nporcelainCoverage=1.0-texture2D(metalnessMap,vMetalnessMapUv).b;\nif(porcelainArtworkEnabled>0.5)porcelainCoverage=1.0-texture2D(porcelainArtworkMap,vMetalnessMapUv).r;\n#endif\n':'';
  shader.fragmentShader=shader.fragmentShader.replace('#include <lights_fragment_end>',`#include <lights_fragment_end>\n${coverage}reflectedLight.indirectDiffuse *= 1.0 + ((${PORCELAIN.indirectGain} * mix(1.08,0.45,smoothstep(-0.75,0.75,normal.x)))-1.0)*porcelainCalibration*${mask};`);
 };
 material.customProgramCacheKey=()=>previousKey()+'-porcelain-v3-'+mixed;
 material.needsUpdate=true;
 return {setEnabled(value:boolean){uniform.value=value?1:0;if(!mixed)material.color.set(value?PORCELAIN.color:'#f4f3ed');},uniform};
}
