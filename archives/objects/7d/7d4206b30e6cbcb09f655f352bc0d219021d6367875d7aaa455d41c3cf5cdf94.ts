import {Scene,Group,Mesh,Shape,ExtrudeGeometry,PlaneGeometry,MeshPhysicalMaterial,Texture,TextureLoader,SRGBColorSpace,Vector2,Color} from 'three';
import {LiuliMaterials} from './liuli-material';
const colors=['#30b9d9','#37baa9','#529be6','#ac80de'];
function rounded(w:number,h:number,r:number){
 const s=new Shape(),x=-w/2,y=-h/2;
 s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;
}
type Card={group:Group,glass:Mesh<ExtrudeGeometry,MeshPhysicalMaterial[]>,face:Mesh<PlaneGeometry,MeshPhysicalMaterial>,source:string,w:number,h:number};
/** Pattern pigment inside a transmissive glass tile. HTML owns labels, radio semantics and all input. */
export class GlassCards{
 private cards:Card[]=[];
 private textures=new Map<string,Texture>();
 private loader=new TextureLoader();
 private host:HTMLElement|null=null;
 constructor(private scene:Scene,private materials:LiuliMaterials){}
 bind(host:HTMLElement|null){if(this.host===host)return;this.host?.classList.remove('pbr-ready');this.host=host;}
 private disposeCards(){this.cards.forEach(c=>{this.scene.remove(c.group);c.glass.geometry.dispose();new Set(c.glass.material).forEach(m=>m.dispose());c.face.geometry.dispose();c.face.material.dispose();});this.cards=[];}
 update(time:number){
  const buttons=this.host?.isConnected?[...this.host.querySelectorAll<HTMLButtonElement>('.option')]:[];
  if(buttons.length!==4){this.hide();return;}
  const images=buttons.map(b=>b.querySelector('img')!);
  if(images.some(img=>!img.complete||!img.naturalWidth)){this.hide();return;}
  const rects=buttons.map(b=>b.getBoundingClientRect());
  if(!this.cards.length||this.cards.some((c,i)=>Math.abs(c.w-rects[i].width)>.5||Math.abs(c.h-rects[i].height)>.5)){
   this.disposeCards();
   rects.forEach((r,i)=>{
    const group=new Group(), bevel=4;
    const geometry=new ExtrudeGeometry(rounded(r.width-bevel*2,r.height-bevel*2,13),{depth:9,bevelEnabled:true,bevelSegments:6,steps:1,bevelSize:bevel,bevelThickness:4,curveSegments:12});
    const uv=geometry.getAttribute('uv');for(let n=0;n<uv.count;n++)uv.setXY(n,(uv.getX(n)+r.width/2)/r.width,(uv.getY(n)+r.height/2)/r.height);
    const front=this.materials.glass(colors[i],.96), edge=this.materials.glass(colors[i],.92);
    front.color.set('white');front.thickness=11;front.attenuationDistance=42;front.normalScale.set(.08,.08);front.envMapIntensity=.25;front.clearcoat=.35;front.specularIntensity=.65;
    edge.thickness=19;edge.attenuationDistance=48;edge.roughness=.12;edge.envMapIntensity=1.2;
    front.onBeforeCompile=shader=>{
      shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`
        #ifdef USE_MAP
          vec2 corner=abs(vMapUv-.5)-vec2(.445,.44); if(length(max(corner,0.))>.06) discard;
          vec2 patternUV=(vMapUv-vec2(.055,.055))/vec2(.89,.70);
          float mask=smoothstep(.015,.055,vMapUv.x)*(1.-smoothstep(.945,.985,vMapUv.x))*smoothstep(.015,.055,vMapUv.y)*(1.-smoothstep(.72,.82,vMapUv.y));
          vec3 pigment=texture2D(map,clamp(patternUV,0.,1.)).rgb;
          diffuseColor.rgb *= mix(vec3(.87,.97,1.),pigment,mask*.96);
        #endif
      `);
      // Keep the caption area polished; relief / gold belong to the pigment area only.
      shader.fragmentShader=shader.fragmentShader.replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\nroughnessFactor = mix(.065,roughnessFactor,1.-smoothstep(.72,.82,vMapUv.y));');
    };
    front.customProgramCacheKey=()=> 'glass-pigment-v3';
    const glass=new Mesh(geometry,[edge,edge]);group.add(glass);
    const faceGeometry=new PlaneGeometry(r.width-8,r.height-8,28,24),fp=faceGeometry.getAttribute('position');
    for(let v=0;v<fp.count;v++){const u=fp.getX(v)/(r.width*.5),q=fp.getY(v)/(r.height*.5);fp.setZ(v,14+Math.max(0,1-u*u)*Math.max(0,1-q*q)*7);}
    faceGeometry.computeVertexNormals();
    const face=new Mesh(faceGeometry,front);face.renderOrder=8;group.add(face);group.position.z=90;this.scene.add(group);
    this.cards.push({group,glass,face,source:'',w:r.width,h:r.height});
   });
  }
  this.cards.forEach((c,i)=>{
   const r=rects[i],image=images[i],src=image.currentSrc||image.src,front=c.face.material;
   c.group.visible=true;c.group.position.set(r.left+r.width/2,r.top+r.height/2,90);
   c.glass.material[1].envMapIntensity=buttons[i].classList.contains('selected')?1.6:1.15;
   if(c.source!==src){
    let texture=this.textures.get(src);if(!texture){texture=new Texture(image);texture.colorSpace=SRGBColorSpace;texture.flipY=false;texture.needsUpdate=true;this.textures.set(src,texture);}
    front.map=texture;
    const id=buttons[i].dataset.choice!;
    for(const channel of ['normal','roughness','metalness','clearcoat'] as const){
      const key=id+'-'+channel;let map=this.textures.get(key);
      if(!map){map=this.loader.load(`${import.meta.env.BASE_URL}materials/options/${key}.png`);map.flipY=false;this.textures.set(key,map);}
      const property=channel==='normal'?'normalMap':channel==='roughness'?'roughnessMap':channel==='metalness'?'metalnessMap':'clearcoatMap';front[property]=map;
    }
    front.normalScale=new Vector2(.1,.1);front.metalness=.14;front.roughness=.2;
    front.needsUpdate=true;c.source=src;
   }
  });
  this.host?.classList.add('pbr-ready');
 }
 hide(){this.cards.forEach(c=>c.group.visible=false);this.host?.classList.remove('pbr-ready');}
 debug(){return {count:this.cards.length,images:this.cards.map(c=>c.source.split('/').pop()),pbrChannels:Object.keys(this.materials.maps),transmission:this.cards[0]?.face.material.transmission,opaqueBackplate:false};}
 dispose(){this.disposeCards();this.textures.forEach(t=>t.dispose());this.textures.clear();}
}
