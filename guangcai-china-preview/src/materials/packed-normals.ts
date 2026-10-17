import {RGFormat,ShaderChunk,type MeshPhysicalMaterial} from 'three';
const installed=new WeakSet<MeshPhysicalMaterial>();
/** Three supports RG tangent normals; apply the same reconstruction to coat.
 * Run after atlas/porcelain hooks so every existing UV/finish correction stays. */
export function configurePackedNormals(material:MeshPhysicalMaterial){
 if(installed.has(material))return;installed.add(material);
 const prior=material.onBeforeCompile,key=material.customProgramCacheKey.bind(material);
 material.onBeforeCompile=(shader,renderer)=>{prior.call(material,shader,renderer);if(material.clearcoatNormalMap?.format!==RGFormat)return;
  shader.fragmentShader=shader.fragmentShader.replace('#include <clearcoat_normal_fragment_maps>',ShaderChunk.clearcoat_normal_fragment_maps).replace('clearcoatMapN.xy *= clearcoatNormalScale;', 'clearcoatMapN.z = sqrt(max(0.0, 1.0 - dot(clearcoatMapN.xy, clearcoatMapN.xy)));\nclearcoatMapN.xy *= clearcoatNormalScale;');
 };
 material.customProgramCacheKey=()=>key()+'-packed-coat-'+String(material.clearcoatNormalMap?.format);material.needsUpdate=true;
}
