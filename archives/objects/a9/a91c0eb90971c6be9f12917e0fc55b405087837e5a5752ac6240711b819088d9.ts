import {Scene,Group,Mesh,Shape,ExtrudeGeometry,PlaneGeometry,MeshPhysicalMaterial,Texture,TextureLoader,SRGBColorSpace,DoubleSide,Vector2,Color} from 'three';
import {LiuliMaterials} from './liuli-material';
const colors=['#65cedf','#74cbb5','#8ab8e6','#b5a0e9'];
function rounded(w:number,h:number,r:number){
 const s=new Shape(),x=-w/2,y=-h/2;
 s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;
}
type Card={group:Group,face:Mesh<PlaneGeometry,MeshPhysicalMaterial>,glass:Mesh<ExtrudeGeometry,MeshPhysicalMaterial>,source:string,w:number,h:number};
/** PBR surfaces are decorative. Native radio buttons retain focus, labels, hit targets and selection. */
export class GlassCards{
 private cards:Card[]=[];
 private textures=new Map<string,Texture>();
 private loader=new TextureLoader();
 private host:HTMLElement|null=null;
 constructor(private scene:Scene,private materials:LiuliMaterials){}
 bind(host:HTMLElement|null){this.host?.classList.remove('pbr-ready');this.host=host;}
 private disposeCards(){this.cards.forEach(c=>{this.scene.remove(c.group);c.group.traverse(o=>{if(o instanceof Mesh){o.geometry.dispose();(o.material as MeshPhysicalMaterial).dispose();}});});this.cards=[];}
 update(time:number){
  const buttons=this.host?.isConnected?[...this.host.querySelectorAll<HTMLButtonElement>('.option')]:[];
  if(buttons.length!==4){this.cards.forEach(c=>c.group.visible=false);return;}
  const images=buttons.map(b=>b.querySelector('img')!);
  // Keep real HTML imagery while loading; never hide an unloaded card.
  if(images.some(img=>!img.complete||!img.naturalWidth)){this.host?.classList.remove('pbr-ready');this.cards.forEach(c=>c.group.visible=false);return;}
  const rects=buttons.map(b=>b.getBoundingClientRect());
  if(!this.cards.length||this.cards.some((c,i)=>Math.abs(c.w-rects[i].width)>.5||Math.abs(c.h-rects[i].height)>.5)){
   this.disposeCards();
   rects.forEach((r,i)=>{
    const group=new Group();
    const geometry=new ExtrudeGeometry(rounded(r.width,r.height,9),{depth:5,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:2,bevelThickness:2,curveSegments:6});
    // Normalized UVs are required for authored PBR maps, rather than pixel-scale repeats.
    const uv=geometry.getAttribute('uv');for(let n=0;n<uv.count;n++)uv.setXY(n,(uv.getX(n)+r.width/2)/r.width,(uv.getY(n)+r.height/2)/r.height);
    const back=new Mesh(geometry.clone(),new MeshPhysicalMaterial({color:new Color(colors[i]).lerp(new Color("white"),.65),emissive:new Color(colors[i]).lerp(new Color("white"),.6),emissiveIntensity:.6,roughness:.32,metalness:0,clearcoat:.55,envMapIntensity:.25}));back.position.z=-9;group.add(back);
    const face=new Mesh(new PlaneGeometry(1,1),new MeshPhysicalMaterial({roughness:.6,metalness:0,clearcoat:.2,clearcoatRoughness:.18,side:DoubleSide,envMapIntensity:.05,emissive:0xffffff,emissiveIntensity:.6}));face.position.z=-1;group.add(face);
    const glass=new Mesh(geometry,this.materials.glass(colors[i],.88));glass.position.z=1;glass.material.opacity=.055;glass.material.clearcoat=.35;glass.material.specularIntensity=.2;glass.material.color.set('#e5f8fb');glass.material.attenuationColor.set(colors[i]);glass.material.attenuationDistance=180;group.add(glass);
    group.position.z=70;this.scene.add(group);this.cards.push({group,face,glass,source:'',w:r.width,h:r.height});
   });
  }
  this.cards.forEach((c,i)=>{
   const r=rects[i],image=images[i],src=image.currentSrc||image.src,ir=image.getBoundingClientRect();
   c.group.visible=true;c.group.position.set(r.left+r.width/2,r.top+r.height/2,70);
   c.glass.material.envMapIntensity=buttons[i].classList.contains('selected')?.4:.25;
   if(c.source!==src){
    let texture=this.textures.get(src);if(!texture){texture=new Texture(image);texture.colorSpace=SRGBColorSpace;texture.flipY=false;texture.needsUpdate=true;this.textures.set(src,texture);}
    c.face.material.map=texture;c.face.material.emissiveMap=texture;
    const id=buttons[i].dataset.choice!;
    for(const channel of ['normal','roughness','metalness','clearcoat'] as const){
      const key=id+'-'+channel;let map=this.textures.get(key);
      if(!map){map=this.loader.load(`${import.meta.env.BASE_URL}materials/options/${key}.png`);map.flipY=false;this.textures.set(key,map);}
      const property=channel==='normal'?'normalMap':channel==='roughness'?'roughnessMap':channel==='metalness'?'metalnessMap':'clearcoatMap';
      c.face.material[property]=map;
    }
    c.face.material.normalScale=new Vector2(.25,.25);c.face.material.metalness=.65;c.face.material.roughness=.85;
    c.face.material.needsUpdate=true;c.source=src;
   }
   c.face.scale.set(r.width-10,ir.height-8,1);c.face.position.y=-r.height/2+ir.height/2+3;
  });
  this.host?.classList.add('pbr-ready');
 }
 hide(){this.cards.forEach(c=>c.group.visible=false);this.host?.classList.remove('pbr-ready');}
 debug(){return {count:this.cards.length,images:this.cards.map(c=>c.source.split('/').pop()),pbrChannels:Object.keys(this.materials.maps)};}
 dispose(){this.disposeCards();this.textures.forEach(t=>t.dispose());this.textures.clear();}
}
