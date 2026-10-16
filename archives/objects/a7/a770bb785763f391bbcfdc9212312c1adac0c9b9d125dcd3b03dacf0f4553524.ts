import {MeshPhysicalMaterial,TextureLoader,SRGBColorSpace,Vector2,Color,type Texture} from 'three';
/** Editable authored channel maps. Dielectric glass and metallic trim are separate materials. */
export class LiuliMaterials {
 readonly maps:Record<string,Texture>={};
 constructor(){
  const loader=new TextureLoader();
  for(const name of ['baseColor','normal','roughness','metalness','clearcoat']){
   const t=loader.load(`${import.meta.env.BASE_URL}materials/liuli/${name}.png`);
   if(name==='baseColor')t.colorSpace=SRGBColorSpace;
   this.maps[name]=t;
  }
 }
 glass(color:string,transmission=.58){return new MeshPhysicalMaterial({
  color,map:this.maps.baseColor,normalMap:this.maps.normal,normalScale:new Vector2(.18,.18),
  roughness:.58,roughnessMap:this.maps.roughness,metalness:0,metalnessMap:this.maps.metalness,
  clearcoat:1,clearcoatMap:this.maps.clearcoat,clearcoatRoughness:.08,
  transmission:0,thickness:8,ior:1.46,attenuationColor:new Color(color),attenuationDistance:90,
  envMapIntensity:.3,specularIntensity:.45,transparent:true,opacity:transmission>.8?.15:.87,depthWrite:false,
 });}
 dispose(){Object.values(this.maps).forEach(t=>t.dispose());}
}
