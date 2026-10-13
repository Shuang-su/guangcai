import { ACESFilmicToneMapping, BoxGeometry, Color, DirectionalLight, HalfFloatType, HemisphereLight, Mesh, MeshBasicMaterial, MeshStandardMaterial, PCFSoftShadowMap, PerspectiveCamera, PlaneGeometry, PMREMGenerator, Scene, SRGBColorSpace, WebGLRenderer, BackSide } from 'three';

export function createStudio(canvas:HTMLCanvasElement){
  const renderer=new WebGLRenderer({canvas,antialias:true,alpha:false,preserveDrawingBuffer:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=SRGBColorSpace;
  renderer.toneMapping=ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=PCFSoftShadowMap;
  const scene=new Scene();scene.background=new Color('#b7b8ba');
  const camera=new PerspectiveCamera(33,1,.5,2500);camera.position.set(205,175,285);
  const environment=new Scene();environment.background=new Color('#565961');
  const room=new Mesh(new BoxGeometry(100,100,100),new MeshBasicMaterial({color:'#7f8187',side:BackSide}));environment.add(room);
  const cards:[number,number,number,number,number,number][]=[[-22,12,24,15,36,5],[23,20,-12,12,40,7],[0,44,0,35,23,5],[-8,-8,-32,18,25,1.5]];
  for(const[x,y,z,w,h,intensity]of cards){
    const card=new Mesh(new PlaneGeometry(w,h),new MeshBasicMaterial({color:new Color().setScalar(intensity)}));card.position.set(x,y,z);card.lookAt(0,0,0);environment.add(card);
  }
  const pmrem=new PMREMGenerator(renderer);const env=pmrem.fromScene(environment,.025,.1,200);scene.environment=env.texture;scene.environmentIntensity=.8;pmrem.dispose();
  environment.traverse(o=>{if(o instanceof Mesh){o.geometry.dispose();(o.material as MeshBasicMaterial).dispose();}});
  const key=new DirectionalLight('#fff9ed',2.5);key.position.set(-90,220,150);key.castShadow=true;
  key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-170;key.shadow.camera.right=170;key.shadow.camera.top=200;key.shadow.camera.bottom=-140;
  key.shadow.camera.near=1;key.shadow.camera.far=600;key.shadow.bias=-.00015;key.shadow.normalBias=.25;key.shadow.radius=4;scene.add(key);
  scene.add(new HemisphereLight('#f4f6ff','#737270',1.25));
  const fill=new DirectionalLight('#edf3ff',.6);fill.position.set(140,100,-140);scene.add(fill);
  const floor=new Mesh(new PlaneGeometry(4000,4000),new MeshStandardMaterial({color:'#a6a7a9',metalness:0,roughness:.92}));floor.rotation.x=-Math.PI/2;floor.position.y=-.15;floor.receiveShadow=true;scene.add(floor);
  const resize=()=>{const {width,height}=canvas.getBoundingClientRect();renderer.setSize(width,height,false);camera.aspect=width/Math.max(height,1);camera.updateProjectionMatrix();};
  const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
  return{renderer,scene,camera,resize,floor,dispose(){observer.disconnect();env.dispose();floor.geometry.dispose();(floor.material as MeshStandardMaterial).dispose();renderer.dispose();}};
}
export type Studio=ReturnType<typeof createStudio>;
