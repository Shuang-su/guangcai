import {Material,ShaderChunk} from 'three';
export interface FixedAtlas {rows:number;contentWidth:number;contentHeight:number;gutter:number}
export function validateFixedAtlas(a:FixedAtlas,width:number,height:number){
 if(!a||![a.rows,a.contentWidth,a.contentHeight,a.gutter].every(Number.isInteger)||a.rows<2||a.rows>4||a.contentWidth<1||a.contentHeight<1||a.gutter<8||a.gutter>128||width!==a.contentWidth+2*a.gutter||height!==a.rows*(a.contentHeight+2*a.gutter))throw new Error('花带图集尺寸或护边参数无效');
}
// Used by tests/exporters. Original UV remains continuous for the tangent basis.
export function fixedAtlasUV(u:number,v:number,a:FixedAtlas):[number,number]{
 const wrap=((u%1)+1)%1,scaled=wrap*a.rows,row=Math.min(a.rows-1,Math.floor(scaled)),w=a.contentWidth+2*a.gutter,h=a.contentHeight+2*a.gutter;
 return [(a.gutter+(scaled-row)*a.contentWidth)/w,((a.rows-1-row)*h+a.gutter+v*a.contentHeight)/(a.rows*h)];
}
const installed=new WeakSet<Material>();
export function configureFixedAtlas(material:Material,atlas?:FixedAtlas){
 material.userData.fixedAtlas=atlas;
 if(!installed.has(material)){
  installed.add(material);const previous=material.onBeforeCompile,key=material.customProgramCacheKey.bind(material);
  material.onBeforeCompile=(shader,renderer)=>{
   previous.call(material,shader,renderer);const a=material.userData.fixedAtlas as FixedAtlas|undefined;if(!a)return;
   const w=a.contentWidth+2*a.gutter,h=a.contentHeight+2*a.gutter,totalH=h*a.rows;
   shader.fragmentShader=`vec4 sampleFixedAtlas(sampler2D tex, vec2 sourceUv) {
     float scaled=fract(sourceUv.x)*${a.rows.toFixed(1)};
     float row=min(${(a.rows-1).toFixed(1)},floor(scaled));
     vec2 uv=vec2((${a.gutter.toFixed(1)}+fract(scaled)*${a.contentWidth.toFixed(1)})/${w.toFixed(1)},
       ((${(a.rows-1).toFixed(1)}-row)*${h.toFixed(1)}+${a.gutter.toFixed(1)}+sourceUv.y*${a.contentHeight.toFixed(1)})/${totalH.toFixed(1)});
     vec2 derivativeScale=vec2(${(a.rows*a.contentWidth/w).toFixed(10)},${(a.contentHeight/totalH).toFixed(10)});
     return textureGrad(tex,uv,dFdx(sourceUv)*derivativeScale,dFdy(sourceUv)*derivativeScale);
   }\n`+shader.fragmentShader;
   for(const name of ['map_fragment','roughnessmap_fragment','metalnessmap_fragment','normal_fragment_maps','clearcoat_normal_fragment_maps'] as const){
    const code=ShaderChunk[name].replace(/texture2D\(\s*(map|normalMap|roughnessMap|metalnessMap|clearcoatNormalMap)\s*,\s*(v\w+Uv)\s*\)/g,'sampleFixedAtlas( $1, $2 )');
    shader.fragmentShader=shader.fragmentShader.replace(`#include <${name}>`,code);
   }
  };
  material.customProgramCacheKey=()=>key()+'-fixed-atlas-'+JSON.stringify(material.userData.fixedAtlas??null);
 }
 material.needsUpdate=true;
}
