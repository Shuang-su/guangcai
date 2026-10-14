import { createContactShadow } from './contact-shadow';
import { ACESFilmicToneMapping, BoxGeometry, Color, DirectionalLight, HalfFloatType, HemisphereLight, Mesh, MeshBasicMaterial, MeshStandardMaterial, PCFShadowMap, PerspectiveCamera, PlaneGeometry, PMREMGenerator, Scene, SRGBColorSpace, ShadowMaterial, WebGLRenderer, BackSide } from 'three';

export function createStudio(canvas:HTMLCanvasElement,transparent=false){
  const renderer=new WebGLRenderer({canvas,antialias:true,alpha:transparent,preserveDrawingBuffer:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=SRGBColorSpace;
  renderer.toneMapping=ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=PCFShadowMap;
  const scene=new Scene();scene.background=transparent?null:new Color('#b7b8ba');
  if(transparent)renderer.setClearColor(0x000000,0);
  const camera=new PerspectiveCamera(33,1,.5,2500);camera.position.set(205,175,285);
  const environment=new Scene();environment.background=new Color('#565961');
  const room=new Mesh(new BoxGeometry(100,100,100),new MeshBasicMaterial({color:new Color().setScalar(.30),side:BackSide}));environment.add(room);
  const cards:[number,number,number,number,number,number][]=[
    [-24,12,28,18,38,3],[28,20,-18,14,38,3],[0,44,0,32,9,4],
    [-10,-35,-10,70,60,.7],[-20,8,-36,32,35,.45],
    [5,38,30,32,3,4],[32,4,25,7,32,2.8],
    [10,5,39,17,40,.008],[-35,1,15,10,40,.015],[-10,5,-39,12,36,.008],
    [35,-4,-10,14,24,.025],
  ];
  for(const[x,y,z,w,h,intensity]of cards){
    const card=new Mesh(new PlaneGeometry(w,h),new MeshBasicMaterial({color:new Color().setScalar(intensity)}));card.position.set(x,y,z);card.lookAt(0,0,0);environment.add(card);
  }
  const pmrem=new PMREMGenerator(renderer);const env=pmrem.fromScene(environment,.025,.1,200);scene.environment=env.texture;scene.environmentIntensity=1.0;pmrem.dispose();
  environment.traverse(o=>{if(o instanceof Mesh){o.geometry.dispose();(o.material as MeshBasicMaterial).dispose();}});
  const key=new DirectionalLight('#fffdf5',1.2);key.position.set(-90,220,150);key.castShadow=true;
  key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-170;key.shadow.camera.right=170;key.shadow.camera.top=200;key.shadow.camera.bottom=-140;
  key.shadow.camera.near=1;key.shadow.camera.far=600;key.shadow.bias=-.00015;key.shadow.normalBias=.25;key.shadow.radius=6;key.shadow.blurSamples=12;scene.add(key);
  scene.add(new HemisphereLight('#f4f6ff','#737270',.35));
  const fill=new DirectionalLight('#edf3ff',.3);fill.position.set(140,100,-140);scene.add(fill);
  const contact=createContactShadow(renderer,scene);const floor=contact.floor;
  const resize=()=>{const {width,height}=canvas.getBoundingClientRect();renderer.setSize(width,height,false);camera.aspect=width/Math.max(height,1);camera.updateProjectionMatrix();};
  const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
  return{renderer,scene,camera,resize,floor,contact,dispose(){observer.disconnect();env.dispose();contact.dispose();renderer.dispose();}};
}
export type Studio=ReturnType<typeof createStudio>;
