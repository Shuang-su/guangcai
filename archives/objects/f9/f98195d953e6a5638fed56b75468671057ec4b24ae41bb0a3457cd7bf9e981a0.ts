import {MeshPhysicalMaterial,TextureLoader,SRGBColorSpace,Vector2,Color,type Texture} from 'three';
/** Actual dielectric transmission. Backdrop geometry supplies the refracted light buffer. */
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
 glass(color:string,transmission=.92){return new MeshPhysicalMaterial({
  color:new Color(color).lerp(new Color('white'),.55),map:this.maps.baseColor,
  normalMap:this.maps.normal,normalScale:new Vector2(.12,.12),
  roughness:.22,roughnessMap:this.maps.roughness,metalness:0,metalnessMap:this.maps.metalness,
  clearcoat:1,clearcoatMap:this.maps.clearcoat,clearcoatRoughness:.055,
  transmission,thickness:14,ior:1.48,attenuationColor:new Color(color),attenuationDistance:100,
  envMapIntensity:1.15,specularIntensity:1,transparent:false,opacity:1,depthWrite:true,
 });}
 dispose(){Object.values(this.maps).forEach(t=>t.dispose());}
}
