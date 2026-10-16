import {profile} from './profile';
import {createConsumerPanel} from './ui/consumer-panel';
import {createConsumerInterface} from './ui/consumer-interface';
import {createGlassStudio} from './ui/glass-studio';
import {v6DefaultSelection} from './styles/city-selection';
import {configureFixedAtlas} from './materials/fixed-atlas';
import './ui/styles.css';
import {Color,Material,Mesh,MeshBasicMaterial,MeshStandardMaterial,SRGBColorSpace,Vector3} from 'three';
import {buildProduct} from './geometry/product';
import {makeMaterials} from './materials/materials';
import {calibratePorcelain,PORCELAIN} from './materials/porcelain';
import {RENDER_STANDARD} from './materials/render-standard';
import {createStudio} from './studio/studio';
import {createLocalReflections} from './studio/local-reflections';
import {createLidReflections} from './studio/lid-reflections';
import {defaultPack,StyleManager,type StylePack} from './styles/style-manager';
import {chinaPack,CityArtworkManager,type CityArtworkPack} from './styles/city-artwork';
import {ViewController,type View} from './interaction/views';
import {applyPose,type Pose} from './interaction/calibration';
import {createInterface} from './ui/interface';
import {SelectionController,artworkPack,variantFor,type Selection} from './styles/city-selection';
import {createArtworkPanel} from './ui/artwork-panel';
import {haptics} from './ui/haptics';
import {createHapticsDiagnostics} from './ui/haptics-diagnostics';
import {createCameraClipping} from './interaction/camera-clipping';
import {createAuthoringFraming} from './interaction/authoring-framing';
import {BackgroundController} from './ui/background';
import {loadTexture} from './styles/load-texture';
let disposeHapticsDiagnostics=()=>{};
const startupPending=new Set(['花纹','杯底标识','背景']);
let startupError='';
const mats=makeMaterials(),product=buildProduct(mats);
let view:ViewController,city:CityArtworkManager,mode='pbr',disposed=false,calibrating=false,assetsReady=false,fixedReliefEnabled=true;
const ui=(profile==='consumer'?createConsumerInterface:createInterface)({view:v=>{calibrating=false;studio.camera.clearViewOffset();studio.camera.fov=33;studio.camera.updateProjectionMatrix();view.set(v);},auto:()=>view.setAuto(!view.auto),reset:()=>{calibrating=false;studio.camera.clearViewOffset();studio.camera.fov=33;studio.camera.updateProjectionMatrix();view.set('hero');},relief:v=>setCityRelief(v),fixedRelief:v=>setFixedRelief(v),metal:v=>{city.setMetal(v);inspect();},mode:v=>{mode=v;inspect();},reflection:v=>reflections.setEnabled(v),background:choice=>background.select(choice),uploadBackground:file=>background.upload(file),restore:async()=>{await selection.restore();}});
let studio:ReturnType<typeof createStudio>;
ui.message('正在载入花纸与金色浮雕…',true);
try{studio=createStudio(ui.canvas,true);}catch(e){ui.error('无法启动 WebGL 2，请使用支持硬件加速的浏览器。');throw e;}
const background=new BackgroundController(studio,ui.backgroundLayer,ui.background,ui.backgroundError);
studio.scene.add(product.root);
const reflections=createLocalReflections(studio,product,mats.city,[mats.wallPorcelain]);
const porcelainControls=[calibratePorcelain(mats.porcelain),calibratePorcelain(mats.city,true),calibratePorcelain(mats.wallPorcelain)];
mats.porcelain.envMap=studio.porcelainEnvironment;
product.root.traverse(o=>{if(o instanceof Mesh)for(const m of (Array.isArray(o.material)?o.material:[o.material]))if(m.name==='knob-striped-porcelain'){m.envMap=studio.porcelainEnvironment;porcelainControls.push(calibratePorcelain(m));}});
const lidReflections=createLidReflections(studio,product,mats.porcelain);
view=new ViewController(studio,()=>product,()=>{if(view)ui.update(view.view,view.auto);});
const anisotropy=Math.min(8,studio.renderer.capabilities.getMaxAnisotropy());
// Fixed floral lines need the full available anisotropy at the saucer silhouette.
const fixed=new StyleManager(mats,studio.renderer.capabilities.getMaxAnisotropy(),()=>{});city=new CityArtworkManager(mats.city,anisotropy);
let artworkUI:ReturnType<typeof createArtworkPanel>|undefined;
const selection=new SelectionController(async s=>{const applied=await applyCityArtwork(artworkPack(s,chinaPack,import.meta.env.BASE_URL));if(applied&&s.variant==='china-gold'&&!s.appearance){city.setRelief(1);if(mode!=='pbr')inspect();}return applied;},()=>{artworkUI?.render();syncLoadingStatus();},profile==='consumer'?v6DefaultSelection:undefined);
artworkUI=profile==='consumer'?createConsumerPanel(selection,v=>{calibrating=false;view.set(v);}):createArtworkPanel(selection,ui.closePanels);
const glass=profile==='consumer'?createGlassStudio():undefined;
city.onProgress=(done,total)=>{artworkUI?.progress(done,total);if(selection.busy)ui.message(`正在准备 ${variantFor(selection.desired.variant).name} · ${done} / ${total}`,true);};
const handle=product.cup.getObjectByName('wide-ribbon-handle') as Mesh,saucer=product.saucer.children[0] as Mesh;
fixed.fit({body:product.parameters.radius*product.parameters.bandAngle/(product.parameters.height-5.3),handle:handle.geometry.userData.surfaceMetrics.aspect,saucer:saucer.geometry.userData.surfaceMetrics.aspect});
// Until fixed maps are ready, the band uses the same glaze as the adjacent wall.
const wallMaterials=(product.cup.getObjectByName('cup-wall-and-recessed-foot') as Mesh).material as Material[];
wallMaterials[1]=mats.wallPorcelain;
const originals=new Map<Mesh,Material|Material[]>();product.root.traverse(o=>{if(o instanceof Mesh&&o.type!=='Reflector')originals.set(o,o.material);});
let temporary:Material[]=[];
function inspect(){
 for(const [mesh,mat]of originals)mesh.material=mat;temporary.forEach(m=>m.dispose());temporary=[];
 if(mode==='pbr'){reflections.refresh();return;}
 const clay=new MeshStandardMaterial({color:'#b9b9b7',roughness:.45});temporary.push(clay);
 const lookup=new Map<Material,Material>();
 const convert=(m:Material):Material=>{
  if(lookup.has(m))return lookup.get(m)!;
  let result:Material=clay;
  if(mode==='metalness')result=new MeshBasicMaterial({color:m===mats.gold?0xffffff:0x000000});
  if(mode==='metalness'&&m===mats.city){const inspection=new MeshBasicMaterial({map:mats.city.metalnessMap});city.configureMetalnessInspection(inspection);result=inspection;}
  if(mode==='metalness'&&Object.values(mats.regions).includes(m as never))result=new MeshBasicMaterial({map:(m as typeof mats.city).metalnessMap});
  if(mode==='relief'&&m===mats.city)result=new MeshStandardMaterial({color:'#9b9b98',roughness:.48,normalMap:mats.city.normalMap,normalScale:mats.city.normalScale});
  if(mode==='floral'&&Object.values(mats.regions).includes(m as never)){const fm=m as typeof mats.city;result=new MeshStandardMaterial({color:'#9b9b98',roughness:.42,normalMap:fm.normalMap,normalScale:fm.normalScale});}
  if(result!==clay){if(mode==='metalness'&&!result.userData.cityParameterInspection)result.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','diffuseColor.rgb=vec3(diffuseColor.b);\n#include <color_fragment>');};configureFixedAtlas(result,m.userData.fixedAtlas);temporary.push(result);}lookup.set(m,result);return result;
 };
 for(const[mesh,mat]of originals)mesh.material=Array.isArray(mat)?mat.map(convert):convert(mat);
}
function setCityRelief(value:number){const appearance=selection.desired.appearance;if(appearance&&city.current?.parametric&&value>=0){void selection.select({appearance:{...appearance,relief:value}});}else{city.setRelief(value);inspect();}}
function setFixedRelief(enabled:boolean){fixedReliefEnabled=enabled;for(const m of Object.values(mats.regions)){m.normalScale.setScalar(enabled?RENDER_STANDARD.relief:0);m.clearcoatNormalScale.setScalar(enabled?RENDER_STANDARD.clearcoatRelief:0);}inspect();}
async function applyCityArtwork(pack:CityArtworkPack){const applied=await city.apply(pack);if(applied){if(!city.uniformOnly||mode!=='pbr')inspect();if(assetsReady)ui.style(city.current!.name);}return applied;}
function syncLoadingStatus(){
 if(disposed)return;
 if(selection.error){ui.message(selection.error);return;}
 if(selection.busy){ui.message('正在准备 · '+variantFor(selection.desired.variant).name,true);return;}
 if(startupError){ui.message(startupError,true);return;}
 if(startupPending.size){ui.message('正在载入'+[...startupPending].join('、')+'…',true);return;}
 if(assetsReady&&city.current){ui.canvas.dataset.ready='true';ui.style(city.current.name);}
}
function trackStartup<T>(stage:string,promise:Promise<T>){return promise.finally(()=>{startupPending.delete(stage);syncLoadingStatus();});}
const markReady=loadTexture(`${import.meta.env.BASE_URL}marks/auratic-reference.png`).then(t=>{if(disposed){t.dispose();return;}t.colorSpace=SRGBColorSpace;mats.mark.map=t;mats.mark.needsUpdate=true;});
Promise.all([trackStartup('花纹',fixed.apply(defaultPack).then(committed=>{if(committed&&!disposed){wallMaterials[1]=mats.regions.body;inspect();}})),(profile==='consumer'?selection.select(v6DefaultSelection):applyCityArtwork(chinaPack)),trackStartup('杯底标识',markReady),trackStartup('背景',profile==='consumer'?background.ready.then(()=>background.select('soft-v3')):background.ready)]).then(()=>{if(!disposed){reflections.initialize();assetsReady=true;artworkUI?.ready();syncLoadingStatus();}}).catch(e=>{startupError='部分素材未能载入，请刷新重试。';syncLoadingStatus();if(profile!=='consumer')ui.error((e as Error).message);});
let last=performance.now(),raf=0;
const authoringFraming=createAuthoringFraming(studio.camera,ui.canvas,profile==='consumer');
const updateClipping=createCameraClipping(studio.camera,product.root);
function frame(now:number){if(disposed)return;const dt=Math.min(.1,(now-last)/1000);last=now;if(!calibrating)view.update(dt);updateClipping();studio.contact.update(product.root);authoringFraming.apply();if(mode==='pbr'){reflections.update(now);lidReflections.update();}studio.floor.visible=product.saucer.visible&&product.cup.visible;studio.renderer.render(studio.scene,studio.camera);authoringFraming.restore();raf=requestAnimationFrame(frame);}
raf=requestAnimationFrame(frame);ui.canvas.addEventListener('dblclick',()=>{calibrating=false;studio.camera.clearViewOffset();studio.camera.fov=33;studio.camera.updateProjectionMatrix();view.set('hero');});
const debug=()=>({version:'6.0.2',profile,loading:{pending:[...startupPending],error:startupError},glass:glass?.debug(),haptics:haptics.debug(),selection:{current:selection.current,desired:selection.desired,busy:selection.busy,error:selection.error},porcelain:PORCELAIN,ready:ui.canvas.dataset.ready==='true',view:view.view,mode,auto:view.auto,camera:studio.camera.position.toArray(),clipping:{near:studio.camera.near,far:studio.camera.far},target:view.controls.target.toArray(),exposure:studio.renderer.toneMappingExposure,background:background.state(),environment:studio.scene.environment?.uuid,parameters:product.parameters,reflections:reflections.debug(),lidReflections:lidReflections.debug(),bottomClearance:view.bottomClearance(),geometries:[...originals.keys()].map(o=>o.geometry.uuid),memory:{...studio.renderer.info.memory,programs:studio.renderer.info.programs?.length},city:city.debug(),fixedFinish:{cleanGoldGround:mats.regions.saucer.userData.cleanGoldGround,enabled:fixedReliefEnabled,normalScale:mats.regions.saucer.normalScale.x,clearcoatNormalScale:mats.regions.saucer.clearcoatNormalScale.x,clearcoat:mats.regions.saucer.clearcoat,specularIntensity:mats.regions.saucer.specularIntensity},fixed:Object.fromEntries(Object.entries(fixed.currentMaps).map(([region,m])=>[region,Object.fromEntries(Object.entries(m).map(([k,t])=>[k,t.uuid]))]))});
Object.assign(window,{cupViewer:{ready:()=>ui.canvas.dataset.ready==='true',applyCityArtwork,restore:()=>selection.restore(),selectArtwork:(patch:Partial<Selection>)=>selection.select(patch),setView:(v:View,instant=false)=>{calibrating=false;studio.camera.clearViewOffset();studio.camera.fov=33;studio.camera.updateProjectionMatrix();view.set(v,instant);},setCalibration:(pose:Pose)=>{view.set('hero',true);calibrating=true;product.cup.quaternion.setFromAxisAngle(new Vector3(0,1,0),(pose.cupYaw??0)*Math.PI/180);product.lid.quaternion.copy(product.cup.quaternion);applyPose(studio.camera,pose,ui.canvas.clientWidth,ui.canvas.clientHeight);},setAuto:(v:boolean)=>view.setAuto(v),setRelief:setCityRelief,setLocalReflections:(v:boolean)=>reflections.setEnabled(v),refreshReflections:(options?:{includeHandle?:boolean})=>reflections.refresh(options),setFixedRelief,setCityMetal:(v:boolean)=>{city.setMetal(v);inspect();},setMode:(v:string)=>{mode=v;inspect();},
 setCamera:(camera:[number,number,number],target:[number,number,number])=>{view.set('hero',true);view.controls.dispatchEvent({type:'start'});studio.camera.position.fromArray(camera);view.controls.target.fromArray(target);view.controls.update();},
 setPorcelainEnabled:(v:boolean)=>{porcelainControls.forEach(c=>c.setEnabled(v));reflections.refresh();},
 fixedPrecision:()=>fixed.precision(),
 applyFixedArtwork:async(pack:StylePack)=>{const committed=await fixed.apply(pack);if(committed){reflections.refresh();inspect();}return committed;},
 debug,dispose:()=>{if(disposed)return;disposed=true;cancelAnimationFrame(raf);glass?.dispose();background.dispose();artworkUI?.dispose();disposeHapticsDiagnostics();haptics.dispose();ui.dispose();lidReflections.dispose();reflections.dispose();city.dispose();fixed.dispose();view.dispose();temporary.forEach(m=>m.dispose());product.dispose();Object.values(mats.regions).forEach(m=>m.dispose());mats.porcelain.dispose();mats.wallPorcelain.dispose();mats.gold.dispose();mats.foot.dispose();mats.mark.map?.dispose();mats.mark.dispose();mats.city.dispose();studio.dispose();}}});
if(profile==='dev')disposeHapticsDiagnostics=createHapticsDiagnostics();
if(import.meta.hot)import.meta.hot.dispose(()=>{(window as any).cupViewer.dispose();});
