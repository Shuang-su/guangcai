import {Color,NoColorSpace,SRGBColorSpace,type MeshBasicMaterial,type MeshPhysicalMaterial,type Texture} from 'three';
import {appearanceColors,GOLD_LINE,materialAt,normalizeAppearance,type Appearance} from '../styles/city-appearance';

/** One program for both finishes. No texture allocation or shader recompilation on input. */
export function installCityParameters(material:MeshPhysicalMaterial){
 const prior=material.onBeforeCompile,key=material.customProgramCacheKey.bind(material);
 const uniforms={v5Enabled:{value:0},v5Dark:{value:new Color()},v5Light:{value:new Color()},v5Gold:{value:new Color(GOLD_LINE.color)},v5Porcelain:{value:new Color('#fffdf7')},v5Blend:{value:0},v5Label:{value:null as Texture|null},v5TextVisible:{value:0},v5TextGold:{value:0},v5MetalEnabled:{value:1}};
 let appearance:Appearance|undefined,updates=0;
 material.onBeforeCompile=(shader,renderer)=>{
  prior.call(material,shader,renderer);Object.assign(shader.uniforms,uniforms);
  shader.fragmentShader=`uniform float v5Enabled,v5Blend,v5TextVisible,v5TextGold,v5MetalEnabled;\nuniform vec3 v5Dark,v5Light,v5Gold,v5Porcelain;\nuniform sampler2D v5Label;\n`+shader.fragmentShader;
  shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
   float cityCoverage=0.0,cityLine=0.0,cityLabel=0.0;
   #ifdef USE_MAP
   if(v5Enabled>0.5){
    vec2 shape=texture2D(map,vMapUv).rg;
    cityCoverage=shape.g;cityLine=min(shape.r,cityCoverage);
    cityLabel=texture2D(v5Label,vMapUv).r*v5TextVisible;
    float gradient=clamp(((1.0-vMapUv.y)-0.28)/0.72,0.0,1.0);
    vec3 fillColor=mix(v5Dark,v5Light,gradient);
    diffuseColor.rgb=v5Porcelain*(1.0-cityCoverage)+fillColor*(cityCoverage-cityLine)+v5Gold*cityLine;
    diffuseColor.rgb=mix(diffuseColor.rgb,mix(v5Dark,v5Gold,v5TextGold),cityLabel);
   }
   #endif`);
  shader.fragmentShader=shader.fragmentShader.replace('#include <metalnessmap_fragment>',`#include <metalnessmap_fragment>
   if(v5Enabled>0.5){metalnessFactor=mix((cityCoverage-cityLine)*v5Blend+cityLine,mix(v5Blend,1.0,v5TextGold),cityLabel)*v5MetalEnabled;}`);
  shader.fragmentShader=shader.fragmentShader.replace('#include <roughnessmap_fragment>',`#include <roughnessmap_fragment>
   if(v5Enabled>0.5){roughnessFactor=mix((1.0-cityCoverage)*(41.0/255.0)+(cityCoverage-cityLine)*mix(0.31,72.0/255.0,v5Blend)+cityLine*0.23,66.0/255.0,cityLabel);}`);
  shader.fragmentShader=shader.fragmentShader.replace('#include <lights_physical_fragment>',`#include <lights_physical_fragment>
   #ifdef USE_CLEARCOAT
   if(v5Enabled>0.5){material.clearcoat=mix((1.0-cityCoverage)+(cityCoverage-cityLine)*mix(191.0/255.0,26.0/255.0,v5Blend)+cityLine*(26.0/255.0),mix(191.0/255.0,26.0/255.0,v5Blend),cityLabel);}
   #endif`);
  // The existing porcelain calibration must exclude pigment, line and lettering.
  shader.fragmentShader=shader.fragmentShader.replace('porcelainCoverage=1.0-texture2D(porcelainArtworkMap,vMetalnessMapUv).r;',
   'porcelainCoverage=1.0-mix(texture2D(porcelainArtworkMap,vMetalnessMapUv).r,cityCoverage+cityLabel*(1.0-cityCoverage),v5Enabled);');
 };
 material.customProgramCacheKey=()=>key()+'-city-parameters-v5';
 return {
  enable(mask:Texture,label:Texture,showText:boolean){mask.colorSpace=NoColorSpace;uniforms.v5Enabled.value=1;uniforms.v5Label.value=label;uniforms.v5TextVisible.value=showText?1:0;},
  disable(){uniforms.v5Enabled.value=0;},
  update(value:Appearance,showText:boolean){appearance=normalizeAppearance(value);const c=appearanceColors(appearance);uniforms.v5Dark.value.setRGB(...c.dark,SRGBColorSpace);uniforms.v5Light.value.setRGB(...c.light,SRGBColorSpace);uniforms.v5Blend.value=appearance.material;uniforms.v5TextVisible.value=showText?1:0;uniforms.v5TextGold.value=appearance.preset==='gold'?1:0;material.normalScale.setScalar(.7*appearance.relief);material.clearcoatNormalScale.setScalar(.7*appearance.relief);updates++;},
  metal(enabled:boolean){uniforms.v5MetalEnabled.value=enabled?1:0;},
  inspect(target:MeshBasicMaterial){
   target.userData.cityParameterInspection=true;
   target.onBeforeCompile=shader=>{
    Object.assign(shader.uniforms,uniforms);
    shader.fragmentShader='uniform float v5Blend,v5TextVisible,v5TextGold;uniform sampler2D v5Label;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
     vec2 shape=texture2D(map,vMapUv).rg;
     float text=texture2D(v5Label,vMapUv).r*v5TextVisible;
     float metallic=mix((shape.g-shape.r)*v5Blend+shape.r,mix(v5Blend,1.0,v5TextGold),text);
     diffuseColor.rgb=vec3(metallic);`);
   };
  },
  debug(){return {enabled:!!uniforms.v5Enabled.value,appearance:appearance?{...appearance}:null,fill:appearance?materialAt(appearance.material):null,line:GOLD_LINE,updates};},
 };
}
