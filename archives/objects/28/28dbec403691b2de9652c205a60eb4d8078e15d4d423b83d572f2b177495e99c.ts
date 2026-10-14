import {Color, MeshPhysicalMaterial, SRGBColorSpace, TextureLoader, Vector2, DataTexture, RGBAFormat, FloatType, EquirectangularReflectionMapping, type Texture} from 'three';

type RibbonDesign = {palette:string; leaf:boolean; width:number; twist:number; depth:number; path:number[][]};
/** Open silhouettes in card-grid coordinates; independent ends, crossing levels and negative space. */
export const ribbonDesigns:RibbonDesign[] = [
 {palette:'mint',leaf:false,width:.14,twist:.8,depth:-54,path:[[-.5,.88],[.04,.65],[.57,.60],[1.02,.72],[1.5,.39]]},
 {palette:'cyan',leaf:true,width:.13,twist:.38,depth:-28,path:[[-.42,1.08],[.18,.99],[.64,.64],[.97,.19],[.88,-.07]]},
 {palette:'blue',leaf:true,width:.093,twist:-.45,depth:-14,path:[[-.35,.73],[.06,.60],[.47,.58],[.80,.31],[.71,-.10]]},
 {palette:'amber',leaf:true,width:.057,twist:.26,depth:-6,path:[[-.23,.85],[.03,.51],[.18,.26],[.32,-.07],[.42,-.09]]},
 {palette:'violet',leaf:false,width:.13,twist:-.83,depth:5,path:[[-.38,.57],[.16,.58],[.54,.67],[.98,1.0],[1.40,.89]]},
 {palette:'coral',leaf:false,width:.083,twist:.95,depth:17,path:[[-.45,.44],[.05,.52],[.5,.63],[.95,.95],[1.50,.84]]},
 {palette:'cyan',leaf:false,width:.12,twist:-.60,depth:-35,path:[[-.4,1.16],[.1,1.09],[.52,1.04],[.91,.96],[1.42,.76]]},
];

/** Glass remains a dielectric. Pigment, micro-normal and polish are separate data channels. */
export class RibbonMaterials {
 private maps:Record<string,Texture>={};
 private reflection:Texture;

 constructor(){
  // Small linear HDR softbox environment dedicated to the ribbons. It never lights the cup.
  const width=256,height=128,data=new Float32Array(width*height*4);
  for(let y=0;y<height;y++)for(let x=0;x<width;x++){
   const u=x/width,v=y/height;
   const box=(cx:number,cy:number,wx:number,wy:number)=>Math.exp(-Math.pow((u-cx)/wx,8)-Math.pow((v-cy)/wy,8));
   const warm=box(.21,.46,.035,.26)*3.4;
   const cool=box(.67,.38,.045,.20)*2.8;
   const wash=box(.47,.13,.23,.075)*1.4;
   const at=(y*width+x)*4;
   data.set([.045+warm+cool*.78+wash,.068+warm*.94+cool*.90+wash,.095+warm*.83+cool+wash,1],at);
  }
  this.reflection=new DataTexture(data,width,height,RGBAFormat,FloatType);
  this.reflection.mapping=EquirectangularReflectionMapping;this.reflection.needsUpdate=true;
  const loader=new TextureLoader();
  for(const name of ['cyan-baseColor','blue-baseColor','coral-baseColor','amber-baseColor','mint-baseColor','violet-baseColor','normal','roughness','metalness','clearcoat']){
   const texture=loader.load(`${import.meta.env.BASE_URL}materials/ribbons/${name}.png`);
   if(name.endsWith('baseColor'))texture.colorSpace=SRGBColorSpace;
   this.maps[name]=texture;
  }
 }
 glass(palette:string,cover=false){
  return new MeshPhysicalMaterial({color:'white',map:this.maps[`${palette}-baseColor`],envMap:this.reflection,
   normalMap:this.maps.normal,normalScale:new Vector2(.05,.05),
   roughness:cover?.18:.14,roughnessMap:this.maps.roughness,
   metalness:0,metalnessMap:this.maps.metalness,
   clearcoat:1,clearcoatMap:this.maps.clearcoat,clearcoatRoughness:.035,
   transmission:cover?.55:.68,thickness:cover?24:7,ior:1.48,
   attenuationColor:new Color('#daf6fb'),attenuationDistance:90,
   envMapIntensity:1.15,specularIntensity:1,depthWrite:true,
  });
 }
 dispose(){this.reflection.dispose();Object.values(this.maps).forEach(t=>t.dispose());}
}
