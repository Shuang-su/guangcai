import {AmbientLight,DirectionalLight,DataTexture,RGBAFormat,UnsignedByteType,LinearMipmapLinearFilter,LinearFilter,RepeatWrapping,ClampToEdgeWrapping,Mesh,MeshPhysicalMaterial,OrthographicCamera,PlaneGeometry,Scene,WebGLRenderer,WebGLRenderTarget} from 'three';
import {configureFixedAtlas} from '../src/materials/fixed-atlas';
export function verifyAtlasRendering(){
 const sourceW=512,sourceH=64,a={rows:2,contentWidth:256,contentHeight:64,gutter:8},aw=272,ah=160;
 const full:DataTexture[]=[],atlas:DataTexture[]=[];
 const texture=(pixels:Uint8Array,w:number,h:number)=>{const bottom=new Uint8Array(pixels.length);for(let y=0;y<h;y++)bottom.set(pixels.subarray(y*w*4,(y+1)*w*4),(h-1-y)*w*4);const t=new DataTexture(bottom,w,h,RGBAFormat,UnsignedByteType);t.generateMipmaps=true;t.minFilter=LinearMipmapLinearFilter;t.magFilter=LinearFilter;t.wrapS=RepeatWrapping;t.wrapT=ClampToEdgeWrapping;t.needsUpdate=true;return t;};
 for(let channel=0;channel<4;channel++){
  const data=new Uint8Array(sourceW*sourceH*4);
  for(let y=0;y<sourceH;y++)for(let x=0;x<sourceW;x++){
   const i=(y*sourceW+x)*4,u=(x+.5)/sourceW,v=(y+.5)/sourceH;
   const n=[.3*Math.cos(u*Math.PI*6),.25*Math.sin(v*Math.PI*2),1],length=Math.hypot(...n);
   const rgb=channel===0?[110+80*Math.sin(u*Math.PI*4),80+110*v,90+60*Math.cos(u*Math.PI*8)]:channel===1?n.map(k=>(k/length*.5+.5)*255):channel===2?[150,150,150]:[50,50,50];
   data.set([...rgb.map(Math.round),255],i);
  }
  const packed=new Uint8Array(aw*ah*4);
  for(let y=0;y<ah;y++)for(let x=0;x<aw;x++){
   const row=Math.floor(y/80),sy=Math.max(0,Math.min(63,y%80-8)),sx=((row*256+x-8)%512+512)%512;
   packed.set(data.subarray((sy*512+sx)*4,(sy*512+sx)*4+4),(y*aw+x)*4);
  }
  full.push(texture(data,512,64));atlas.push(texture(packed,aw,ah));
 }
 const renderer=new WebGLRenderer(),scene=new Scene(),camera=new OrthographicCamera(-1,1,.5,-.5,.1,10);camera.position.z=3;scene.add(new AmbientLight(0xffffff,.8));const light=new DirectionalLight(0xffffff,2);light.position.set(-1,2,3);scene.add(light);
 const materials=[full,atlas].map(t=>new MeshPhysicalMaterial({map:t[0],normalMap:t[1],clearcoatNormalMap:t[1],roughnessMap:t[2],metalnessMap:t[3],metalness:1,roughness:1,clearcoat:.8,clearcoatRoughness:.2}));configureFixedAtlas(materials[1],a);
 const geometry=new PlaneGeometry(2,1),mesh=new Mesh(geometry,materials[0]);scene.add(mesh);const results=[];
 for(const w of [512,128]){
  const h=w/2,target=new WebGLRenderTarget(w,h),images=[];renderer.setRenderTarget(target);
  for(const m of materials){mesh.material=m;renderer.render(scene,camera);const pixels=new Uint8Array(w*h*4);renderer.readRenderTargetPixels(target,0,0,w,h,pixels);images.push(pixels);}
  let sum=0,max=0,seamSum=0,seamN=0;for(let i=0;i<images[0].length;i++){if(i%4===3)continue;const d=Math.abs(images[0][i]-images[1][i]);sum+=d;max=Math.max(max,d);const x=Math.floor(i/4)%w;if(Math.abs(x-w/2)<4){seamSum+=d;seamN++;}}
  const result={width:w,mean:sum/(w*h*3),max,seamMean:seamSum/seamN};if(result.mean>.7||result.seamMean>1.5)throw new Error('Atlas changes reference shading: '+JSON.stringify(result));results.push(result);target.dispose();
 }
 renderer.dispose();geometry.dispose();materials.forEach(m=>m.dispose());[...full,...atlas].forEach(t=>t.dispose());return results;
}
