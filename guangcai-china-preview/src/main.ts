import './ui/styles.css';
import {Color,Material,Mesh,MeshBasicMaterial,MeshStandardMaterial,SRGBColorSpace,Vector3} from 'three';
import {buildProduct} from './geometry/product';
import {makeMaterials} from './materials/materials';
import {calibratePorcelain,PORCELAIN} from './materials/porcelain';
import {RENDER_STANDARD} from './materials/render-standard';
import {createStudio} from './studio/studio';
import {createLocalReflections} from './studio/local-reflections';
import {createLidReflections} from './studio/lid-reflections';
import {defaultPack,StyleManager} from './styles/style-manager';
import {chinaPack,CityArtworkManager,type CityArtworkPack} from './styles/city-artwork';
import {ViewController,type View} from './interaction/views';
import {applyPose,type Pose} from './interaction/calibration';
import {createInterface} from './ui/interface';
import {BackgroundController} from './ui/background';
import {loadTexture} from './styles/load-texture';
const mats=makeMaterials(),product=buildProduct(mats);
let view:ViewController,city:CityArtworkManager,mode='pbr',disposed=false,calibrating=false,assetsReady=false,fixedReliefEnabled=true;
const ui=createInterface({view:v=>{calibrating=false;studio.camera.clearViewOffset();studio.camera.fov=33;studio.camera.updateProjectionMatrix();view.set(v);},auto:()=>view.setAuto(!view.auto),reset:()=>{calibrating=false;studio.camera.clearViewOffset();studio.camera.fov=33;studio.camera.updateProjectionMatrix();view.set('hero');},relief:v=>{city.setRelief(v);inspect();},fixedRelief:v=>setFixedRelief(v),metal:v=>{city.setMetal(v);inspect();},mode:v=>{mode=v;inspect();},reflection:v=>reflections.setEnabled(v),background:choice=>background.select(choice),uploadBackground:file=>background.upload(file),restore:async()=>{await applyCityArtwork(chinaPack);}});
let studio:ReturnType<typeof createStudio>;
ui.message('正在载入花纸与金色浮雕…',true);
try{studio=createStudio(ui.canvas,true);}catch(e){ui.error('无法启动 WebGL 2，请使用支持硬件加速的浏览器。');throw e;}
const background=new BackgroundController(studio,ui.backgroundLayer,ui.background,ui.backgroundError);
studio.scene.add(product.root);
const reflections=createLocalReflections(studio,product,mats.city);
const porcelainControls=[calibratePorcelain(mats.porcelain),calibratePorcelain(mats.city,true)];
mats.porcelain.envMap=studio.porcelainEnvironment;
product.root.traverse(o=>{if(o instanceof Mesh)for(const m of (Array.isArray(o.material)?o.material:[o.material]))if(m.name==='knob-striped-porcelain'){m.envMap=studio.porcelainEnvironment;porcelainControls.push(calibratePorcelain(m));}});
const lidReflections=createLidReflections(studio,product,mats.porcelain);
view=new ViewController(studio,()=>product,()=>{if(view)ui.update(view.view,view.auto);});
const anisotropy=Math.min(8,studio.renderer.capabilities.getMaxAnisotropy());
const fixed=new StyleManager(mats,anisotropy,()=>{});city=new CityArtworkManager(mats.city,anisotropy);
const handle=product.cup.getObjectByName('wide-ribbon-handle') as Mesh,saucer=product.saucer.children[0] as Mesh;
fixed.fit({body:product.parameters.radius*product.parameters.bandAngle/(product.parameters.height-5.3),handle:handle.geometry.userData.surfaceMetrics.aspect,saucer:saucer.geometry.userData.surfaceMetrics.aspect});
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
  if(mode==='metalness'&&m===mats.city)result=new MeshBasicMaterial({map:mats.city.metalnessMap});
  if(mode==='metalness'&&Object.values(mats.regions).includes(m as never))result=new MeshBasicMaterial({map:(m as typeof mats.city).metalnessMap});
  if(mode==='relief'&&m===mats.city)result=new MeshStandardMaterial({color:'#9b9b98',roughness:.48,normalMap:mats.city.normalMap,normalScale:mats.city.normalScale});
  if(mode==='floral'&&Object.values(mats.regions).includes(m as never)){const fm=m as typeof mats.city;result=new MeshStandardMaterial({color:'#9b9b98',roughness:.42,normalMap:fm.normalMap,normalScale:fm.normalScale});}
  if(result!==clay)temporary.push(result);lookup.set(m,result);return result;
 };
 for(const[mesh,mat]of originals)mesh.material=Array.isArray(mat)?mat.map(convert):convert(mat);
}
function setFixedRelief(enabled:boolean){fixedReliefEnabled=enabled;for(const m of Object.values(mats.regions)){m.normalScale.setScalar(enabled?RENDER_STANDARD.relief:0);m.clearcoatNormalScale.setScalar(enabled?RENDER_STANDARD.clearcoatRelief:0);}inspect();}
async function applyCityArtwork(pack:CityArtworkPack){const applied=await city.apply(pack);if(applied){inspect();if(assetsReady)ui.style(city.current!.name);}return applied;}
const markReady=loadTexture(`${import.meta.env.BASE_URL}marks/auratic-reference.png`).then(t=>{if(disposed){t.dispose();return;}t.colorSpace=SRGBColorSpace;mats.mark.map=t;mats.mark.needsUpdate=true;});
Promise.all([fixed.apply(defaultPack),applyCityArtwork(chinaPack),markReady,background.ready]).then(()=>{if(!disposed){reflections.initialize();assetsReady=true;ui.canvas.dataset.ready='true';ui.style(city.current!.name);}}).catch(e=>{ui.message('素材未完整载入，请刷新重试。',true);ui.error((e as Error).message);});
let last=performance.now(),raf=0;
function frame(now:number){if(disposed)return;const dt=Math.min(.1,(now-last)/1000);last=now;if(!calibrating)view.update(dt);studio.contact.update(product.root);if(mode==='pbr'){reflections.update(now);lidReflections.update();}studio.floor.visible=product.saucer.visible&&product.cup.visible;studio.renderer.render(studio.scene,studio.camera);raf=requestAnimationFrame(frame);}
raf=requestAnimationFrame(frame);ui.canvas.addEventListener('dblclick',()=>{calibrating=false;studio.camera.clearViewOffset();studio.camera.fov=33;studio.camera.updateProjectionMatrix();view.set('hero');});
const debug=()=>({version:'3.0.0',porcelain:PORCELAIN,ready:ui.canvas.dataset.ready==='true',view:view.view,mode,auto:view.auto,camera:studio.camera.position.toArray(),target:view.controls.target.toArray(),exposure:studio.renderer.toneMappingExposure,background:background.state(),environment:studio.scene.environment?.uuid,parameters:product.parameters,reflections:reflections.debug(),lidReflections:lidReflections.debug(),bottomClearance:view.bottomClearance(),geometries:[...originals.keys()].map(o=>o.geometry.uuid),memory:{...studio.renderer.info.memory},city:city.debug(),fixedFinish:{enabled:fixedReliefEnabled,normalScale:mats.regions.saucer.normalScale.x,clearcoatNormalScale:mats.regions.saucer.clearcoatNormalScale.x,clearcoat:mats.regions.saucer.clearcoat,specularIntensity:mats.regions.saucer.specularIntensity},fixed:Object.fromEntries(Object.entries(fixed.currentMaps).map(([region,m])=>[region,Object.fromEntries(Object.entries(m).map(([k,t])=>[k,t.uuid]))]))});
Object.assign(window,{cupViewer:{ready:()=>ui.canvas.dataset.ready==='true',applyCityArtwork,restore:()=>applyCityArtwork(chinaPack),setView:(v:View)=>{calibrating=false;studio.camera.clearViewOffset();studio.camera.fov=33;studio.camera.updateProjectionMatrix();view.set(v);},setCalibration:(pose:Pose)=>{view.set('hero',true);calibrating=true;product.cup.quaternion.setFromAxisAngle(new Vector3(0,1,0),(pose.cupYaw??0)*Math.PI/180);product.lid.quaternion.copy(product.cup.quaternion);applyPose(studio.camera,pose,ui.canvas.clientWidth,ui.canvas.clientHeight);},setAuto:(v:boolean)=>view.setAuto(v),setRelief:(v:number)=>{city.setRelief(v);inspect();},setLocalReflections:(v:boolean)=>reflections.setEnabled(v),refreshReflections:(options?:{includeHandle?:boolean})=>reflections.refresh(options),setFixedRelief,setCityMetal:(v:boolean)=>{city.setMetal(v);inspect();},setMode:(v:string)=>{mode=v;inspect();},
 setCamera:(camera:[number,number,number],target:[number,number,number])=>{view.set('hero',true);view.controls.dispatchEvent({type:'start'});studio.camera.position.fromArray(camera);view.controls.target.fromArray(target);view.controls.update();},
 setPorcelainEnabled:(v:boolean)=>{porcelainControls.forEach(c=>c.setEnabled(v));reflections.refresh();},
 fixedPrecision:()=>fixed.precision(),
 debug,dispose:()=>{if(disposed)return;disposed=true;cancelAnimationFrame(raf);background.dispose();ui.dispose();lidReflections.dispose();reflections.dispose();city.dispose();fixed.dispose();view.dispose();temporary.forEach(m=>m.dispose());product.dispose();Object.values(mats.regions).forEach(m=>m.dispose());mats.porcelain.dispose();mats.gold.dispose();mats.foot.dispose();mats.mark.map?.dispose();mats.mark.dispose();mats.city.dispose();studio.dispose();}}});
if(import.meta.hot)import.meta.hot.dispose(()=>{(window as any).cupViewer.dispose();});
