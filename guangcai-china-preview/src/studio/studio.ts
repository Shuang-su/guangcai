import { createContactShadow } from './contact-shadow';
import { RENDER_STANDARD } from '../materials/render-standard';
import { ACESFilmicToneMapping, BoxGeometry, Color, DirectionalLight, HalfFloatType, HemisphereLight, Mesh, MeshBasicMaterial, MeshStandardMaterial, PCFShadowMap, PerspectiveCamera, PlaneGeometry, PMREMGenerator, type WebGLRenderTarget, Scene, SRGBColorSpace, ShadowMaterial, WebGLRenderer, BackSide } from 'three';

export function createStudio(canvas:HTMLCanvasElement,transparent=false,options:{consumer?:boolean;mobile?:boolean}={}){
  const renderer=new WebGLRenderer({canvas,antialias:true,alpha:transparent,preserveDrawingBuffer:!options.consumer,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,options.mobile?1.5:2));renderer.outputColorSpace=SRGBColorSpace;
  renderer.toneMapping=ACESFilmicToneMapping;renderer.toneMappingExposure=RENDER_STANDARD.exposure;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=PCFShadowMap;
  const scene=new Scene();scene.background=transparent?null:new Color('#b7b8ba');
  if(transparent)renderer.setClearColor(0x000000,0);
  const camera=new PerspectiveCamera(33,1,.5,2500);camera.position.set(205,175,285);
  // PMREM.fromScene needs depth only while capturing the studio cards. Retain
  // a byte-preserving GPU copy without that unused depth buffer afterwards.
  function retainEnvironment(source:WebGLRenderTarget){
    if(!options.consumer)return source;
    const result=source.clone();result.depthBuffer=false;
    renderer.initRenderTarget(result);renderer.copyTextureToTexture(source.texture,result.texture);source.dispose();return result;
  }
  function buildEnvironments(){
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
  const pmrem=new PMREMGenerator(renderer);const env=retainEnvironment(pmrem.fromScene(environment,.025,.1,200));scene.environment=env.texture;scene.environmentIntensity=1.0;
  // A brighter studio for the cup-wall reflections: lift nearly black flags,
  // retain their broad shape, and strengthen the large softboxes.
  for(const object of environment.children){
    if(!(object instanceof Mesh))continue;
    const material=object.material as MeshBasicMaterial;
    const intensity=material.color.r;
    material.color.setScalar(intensity<.10?.045:intensity>=2?intensity*1.65:intensity===.30?.42:intensity);
  }
  const cupEnvironment=retainEnvironment(pmrem.fromScene(environment,.035,.1,200));
  // Broad bright cards for white glaze only. Gold retains the original environments.
  for(const object of environment.children)if(object instanceof Mesh){const m=object.material as MeshBasicMaterial;m.color.setScalar(m.color.r<.5?.65:Math.min(m.color.r,4.5));}
  const porcelainEnvironment=retainEnvironment(pmrem.fromScene(environment,.10,.1,200));pmrem.dispose();
  environment.traverse(o=>{if(o instanceof Mesh){o.geometry.dispose();(o.material as MeshBasicMaterial).dispose();}});
    return {env,cupEnvironment,porcelainEnvironment};
  }
  let environments=buildEnvironments(),environmentReleased=false;
  const key=new DirectionalLight('#fffdf5',1.2);key.position.set(-90,220,150);key.castShadow=true;
  key.shadow.mapSize.set(options.mobile&&options.consumer?1024:2048,options.mobile&&options.consumer?1024:2048);key.shadow.camera.left=-170;key.shadow.camera.right=170;key.shadow.camera.top=200;key.shadow.camera.bottom=-140;
  key.shadow.camera.near=1;key.shadow.camera.far=600;key.shadow.bias=-.00015;key.shadow.normalBias=.25;key.shadow.radius=6;key.shadow.blurSamples=12;scene.add(key);
  scene.add(new HemisphereLight('#f4f6ff','#737270',.35));
  const fill=new DirectionalLight('#edf3ff',.3);fill.position.set(140,100,-140);scene.add(fill);
  const contact=createContactShadow(renderer,scene);const floor=contact.floor;
  const resize=()=>{const {width,height}=canvas.getBoundingClientRect();renderer.setSize(width,height,false);camera.aspect=width/Math.max(height,1);camera.updateProjectionMatrix();canvas.dispatchEvent(new Event('viewport-resize'));};
  const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
  const samples=Math.max(1,renderer.getContext().getParameter(renderer.getContext().SAMPLES));
  const memory=()=>({environments:Object.values(environments).reduce((n,e)=>n+e.width*e.height*(8+(e.depthBuffer?4:0)),0),shadow:key.shadow.mapSize.x*key.shadow.mapSize.y*8,contact:512*512*8*2,framebuffer:canvas.width*canvas.height*(4+8*samples)});
  return{memory,renderer,scene,camera,resize,floor,contact,get cupEnvironment(){return environments.cupEnvironment.texture;},get porcelainEnvironment(){return environments.porcelainEnvironment.texture;},releaseContext(){Object.values(environments).forEach(e=>e.dispose());environmentReleased=true;key.shadow.map?.dispose();contact.releaseContext();},rebuildEnvironment(){if(!environmentReleased)Object.values(environments).forEach(e=>e.dispose());environments=buildEnvironments();environmentReleased=false;},dispose(){observer.disconnect();Object.values(environments).forEach(e=>e.dispose());contact.dispose();renderer.dispose();}};
}
export type Studio=ReturnType<typeof createStudio>;
