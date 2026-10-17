import {configurePackedNormals} from './materials/packed-normals';
import {textureBytes} from './resources/texture-budget';
import {createReadiness} from './resources/readiness';
import {GlassFramePolicy} from './resources/glass-policy';
import {profile} from './profile';
import {ResourcePool} from './resources/pool';
import {createEntryLoading} from './ui/entry-loading';
import {cityLibrary,neighborAssets} from './resources/preload';
import {loadResources,exportDesign,validateDesign,type Resources} from './resources/client';
import type {DesignConfig,Tier,Region} from './resources/types';
import {AdaptiveResolution} from './resources/quality';
import {createConsumerPanel} from './ui/consumer-panel';
import {createConsumerInterface} from './ui/consumer-interface';
import {createGlassStudio} from './ui/glass-studio';
import {v6DefaultSelection,v6Themes} from './styles/city-selection';
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
if(profile==='consumer')document.documentElement.style.setProperty('--consumer-edge-background',`url("${import.meta.env.BASE_URL}backgrounds/soft-light-v3-d06c52a8f2003f50.webp")`);
let disposeHapticsDiagnostics=()=>{};
const startupPending=new Set(['花纹','杯底标识','背景']);
let startupError='',resourcesPromise:Promise<Resources>|undefined,initialization=0;
let neighborController:AbortController|undefined,neighborCity='',neighborError='';
let sloganLeases:Awaited<ReturnType<ResourcePool['acquireAll']>>=[];
const cityOrder=Object.keys(v6Themes).map(id=>id.slice(3));
function ensureResources(){return resourcesPromise??=loadResources().then(value=>resources=value);}
const mobile=matchMedia('(pointer:coarse), (max-width:700px)').matches;
const pool=profile==='consumer'?new ResourcePool(mobile):undefined;
const readiness=createReadiness();
Object.assign(window,{cupViewer:{ready:()=>readiness.get().phase==='ready',whenReady:readiness.whenReady,getLoadState:readiness.get,onLoadStateChange:readiness.subscribe}});
const entryLoading=pool?createEntryLoading(pool,readiness.publish):undefined;
let resources:Resources|undefined,cityTier:Tier='light',requestedCity='shenzhen';
let fixedTiers:Record<Region,Tier>={body:'light',handle:'light',saucer:'light'};
let raf=0,last=performance.now(),dirty=true,awakeUntil=0,renderFrames=0,contextLost=false,recovering=false,qualityTimer=0,qualityBusy=false,qualityError='',baselineDensity=0;
const subscribers=new Set<(design:DesignConfig)=>void>();let lastDesign='';
function invalidate(){dirty=true;awakeUntil=performance.now()+500;if(!raf&&!document.hidden&&!contextLost)raf=requestAnimationFrame(frame);}
function publishDesign(){if(!resources||!assetsReady||selection.busy)return;const design=exportDesign(selection.current,resources.manifest),key=JSON.stringify(design);if(key!==lastDesign){lastDesign=key;for(const callback of subscribers){try{callback(structuredClone(design));}catch(e){console.error('Design listener failed',e);}}}}

const mats=makeMaterials(),product=buildProduct(mats);
let view:ViewController,city:CityArtworkManager,mode='pbr',disposed=false,calibrating=false,assetsReady=false,fixedReliefEnabled=true;
const ui=(profile==='consumer'?createConsumerInterface:createInterface)({view:v=>{calibrating=false;studio.camera.clearViewOffset();studio.camera.fov=33;studio.camera.updateProjectionMatrix();view.set(v);},auto:()=>view.setAuto(!view.auto),reset:()=>{calibrating=false;studio.camera.clearViewOffset();studio.camera.fov=33;studio.camera.updateProjectionMatrix();view.set('hero');},relief:v=>setCityRelief(v),fixedRelief:v=>setFixedRelief(v),metal:v=>{city.setMetal(v);inspect();},mode:v=>{mode=v;inspect();},reflection:v=>reflections.setEnabled(v),background:choice=>background.select(choice),uploadBackground:file=>background.upload(file),restore:async()=>{await selection.restore();}});
let studio:ReturnType<typeof createStudio>;
ui.message('正在载入花纸与金色浮雕…',true);
try{studio=createStudio(ui.canvas,true,{consumer:profile==='consumer',mobile});}catch(e){entryLoading?.fail('无法启动画面，请使用支持 WebGL 2 的浏览器。');ui.error('无法启动 WebGL 2，请使用支持硬件加速的浏览器。');throw e;}
const background=new BackgroundController(studio,ui.backgroundLayer,ui.background,ui.backgroundError);
studio.scene.add(product.root);
// Conservatively include depth, MSAA and all three retained environment maps.
let glassBytes=0,glassScratch=0,transientReserve=false,budgetResizing=false,glass:ReturnType<typeof createGlassStudio>|undefined;
const glassPolicy=new GlassFramePolicy();
function targetBytes(){return glassBytes+ Object.values(studio.memory()).reduce((a,b)=>a+b,0)+24*1024**2+12*1024**2;}
function updateBudget(transient=false){
 if(transient&&!transientReserve)glass?.releaseScratch();
 transientReserve=transient;
 const exceeds=()=>pool&&(pool.debug().estimatedGpuBytes+targetBytes()+(transient?66*1024**2:0)>pool.maximum||!transient&&!pool.transitioning&&pool.debug().estimatedGpuBytes+targetBytes()-glassScratch>pool.steady);
 if(!budgetResizing&&pool&&glassBytes){
  budgetResizing=true;
  try{while(mobile&&exceeds()&&studio.renderer.getPixelRatio()>1){const ratio=Math.max(1,studio.renderer.getPixelRatio()-.25);studio.renderer.setPixelRatio(ratio);resolution.ratio=ratio;studio.resize();}}finally{budgetResizing=false;}
  if(exceeds())glass?.fallback('graphics-memory-budget');
 }
 pool?.setReserve(targetBytes()+(transient?66*1024**2:0));
}
while(pool&&targetBytes()+24*1024**2>pool.steady&&studio.renderer.getPixelRatio()>1){studio.renderer.setPixelRatio(Math.max(1,studio.renderer.getPixelRatio()-.25));studio.resize();}
updateBudget();
const reflections=createLocalReflections(studio,product,mats.city,[mats.wallPorcelain],updateBudget);
const porcelainControls=[calibratePorcelain(mats.porcelain),calibratePorcelain(mats.city,true),calibratePorcelain(mats.wallPorcelain)];
mats.porcelain.envMap=studio.porcelainEnvironment;
product.root.traverse(o=>{if(o instanceof Mesh)for(const m of (Array.isArray(o.material)?o.material:[o.material]))if(m.name==='knob-striped-porcelain'){m.envMap=studio.porcelainEnvironment;porcelainControls.push(calibratePorcelain(m));}});
const lidReflections=createLidReflections(studio,product,mats.porcelain);
view=new ViewController(studio,()=>product,()=>{if(view){ui.update(view.view,view.auto);invalidate();}});
baselineDensity=density();
const anisotropy=Math.min(8,studio.renderer.capabilities.getMaxAnisotropy());
// Fixed floral lines need the full available anisotropy at the saucer silhouette.
const fixed=new StyleManager(mats,studio.renderer.capabilities.getMaxAnisotropy(),invalidate,pool);city=new CityArtworkManager(mats.city,anisotropy,pool);
let artworkUI:ReturnType<typeof createArtworkPanel>|undefined;
const selection=new SelectionController(async s=>{if(profile==='consumer'){await ensureResources();if(s!==selection.desired||disposed||contextLost)return false;}const cityId=s.variant.replace(/^v6-/, '').replace(/-(gold|red|green|purple|blue)$/, '');if(cityId!==requestedCity){requestedCity=cityId;cityTier='light';}const applied=await applyCityArtwork(resources?resources.cityPack(s,cityTier):artworkPack(s,chinaPack,import.meta.env.BASE_URL));if(applied&&s.variant==='china-gold'&&!s.appearance){city.setRelief(1);if(mode!=='pbr')inspect();}return applied;},()=>{artworkUI?.render();syncLoadingStatus();invalidate();publishDesign();if(assetsReady&&!selection.busy&&!selection.error)warmNeighbors();},profile==='consumer'?v6DefaultSelection:undefined);
const untouchedSelection=selection.desired;
artworkUI=profile==='consumer'?createConsumerPanel(selection,v=>{calibrating=false;view.set(v);}):createArtworkPanel(selection,ui.closePanels);
glass=profile==='consumer'?createGlassStudio({invalidate,admitMemory:(bytes,scratch)=>{
 if(!pool)return true;pool.trimIdle(targetBytes()-glassBytes+bytes-scratch);
 const total=()=>pool.debug().estimatedGpuBytes+targetBytes()-glassBytes+bytes;
 // Preserve the optical material before lowering the model's pixel density.
 while(mobile&&bytes>glassBytes&&(!pool.transitioning&&total()-scratch>pool.steady||total()+(transientReserve?66*1024**2:0)>pool.maximum)&&studio.renderer.getPixelRatio()>1){
  const ratio=Math.max(1,studio.renderer.getPixelRatio()-.25);studio.renderer.setPixelRatio(ratio);resolution.ratio=ratio;studio.resize();
 }
 if(bytes>glassBytes&&(!pool.transitioning&&total()-scratch>pool.steady||total()+(transientReserve?66*1024**2:0)>pool.maximum))return false;
 glassBytes=bytes;glassScratch=scratch;updateBudget(transientReserve);return true;
}}):undefined;
city.onProgress=(done,total)=>{artworkUI?.progress(done,total);if(selection.busy)ui.message(`正在准备 ${variantFor(selection.desired.variant).name} · ${done} / ${total}`,true);};
const handle=product.cup.getObjectByName('wide-ribbon-handle') as Mesh,saucer=product.saucer.children[0] as Mesh;
fixed.fit({body:product.parameters.radius*product.parameters.bandAngle/(product.parameters.height-5.3),handle:handle.geometry.userData.surfaceMetrics.aspect,saucer:saucer.geometry.userData.surfaceMetrics.aspect});
// Until fixed maps are ready, the band uses the same glaze as the adjacent wall.
const wallMaterials=(product.cup.getObjectByName('cup-wall-and-recessed-foot') as Mesh).material as Material[];
wallMaterials[1]=mats.wallPorcelain;
const originals=new Map<Mesh,Material|Material[]>();product.root.traverse(o=>{if(o instanceof Mesh&&o.type!=='Reflector')originals.set(o,o.material);});
let temporary:Material[]=[];
function inspect(){
 invalidate();
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
  if(result!==clay){if(mode==='metalness'&&!result.userData.cityParameterInspection)result.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','diffuseColor.rgb=vec3(diffuseColor.b);\n#include <color_fragment>');};configureFixedAtlas(result,m.userData.fixedAtlas);if(result instanceof MeshStandardMaterial)configurePackedNormals(result as typeof mats.city);temporary.push(result);}lookup.set(m,result);return result;
 };
 for(const[mesh,mat]of originals)mesh.material=Array.isArray(mat)?mat.map(convert):convert(mat);
}
function setCityRelief(value:number){const appearance=selection.desired.appearance;if(appearance&&city.current?.parametric&&value>=0){void selection.select({appearance:{...appearance,relief:value}});}else{city.setRelief(value);inspect();}}
function setFixedRelief(enabled:boolean){fixedReliefEnabled=enabled;for(const m of Object.values(mats.regions)){m.normalScale.setScalar(enabled?RENDER_STANDARD.relief:0);m.clearcoatNormalScale.setScalar(enabled?RENDER_STANDARD.clearcoatRelief:0);}inspect();}
async function applyCityArtwork(pack:CityArtworkPack){const applied=await city.apply(pack);if(applied){invalidate();
 // All city/text material groups belong to the wall excluded from the local
 // probe. Their changes cannot change its image; geometry changes still do.
 if(mode!=='pbr')inspect();if(assetsReady)ui.style(city.current!.name);}return applied;}
// Readiness follows the latest selection, even if the first city was superseded.
function syncLoadingStatus(){
 if(disposed||contextLost)return;
 if(selection.error){if(!assetsReady)entryLoading?.fail('当前城市未能准备好，请重新加载。');ui.message(selection.error);return;}
 if(startupError){entryLoading?.fail(startupError);ui.message(startupError,true);return;}
 if(selection.busy){ui.message('正在准备 · '+variantFor(selection.desired.variant).name,true);return;}
 if(startupPending.size){ui.message('正在载入'+[...startupPending].join('、')+'…',true);return;}
 if(!city.current)return;
 if(!assetsReady){reflections.initialize();assetsReady=true;recovering=false;initializedOnce=true;artworkUI?.ready();invalidate();publishDesign();}
 if(entryLoading)entryLoading.prepared();else {ui.canvas.dataset.ready='true';readiness.publish({phase:'ready'});}ui.style(city.current.name);
}
function trackStartup<T>(stage:string,promise:Promise<T>,generation=initialization){return promise.then(result=>{if(generation===initialization&&!contextLost){startupPending.delete(stage);syncLoadingStatus();}return result;});}
function selectedCity(){return selection.desired.variant.replace(/^v6-/,'').replace(/-(gold|red|green|purple|blue)$/,'');}
function warmNeighbors(){
 if(!resources||!pool||contextLost||disposed)return;const id=selectedCity();if(id===neighborCity)return;
 neighborCity=id;neighborError='';neighborController?.abort();const controller=neighborController=new AbortController(),tier=mobile?'standard':'detail';
 const assets=neighborAssets(resources.manifest,id,tier,cityOrder);
 void (async()=>{await pool.prefetch(assets.slice(0,2),controller.signal);if(!controller.signal.aborted&&selectedCity()===id)scheduleQuality();await pool.prefetch(assets.slice(2),controller.signal);})().catch(e=>{if(!controller.signal.aborted){neighborError=String(e);neighborCity='';}});
}
let markLease:Awaited<ReturnType<ResourcePool['acquire']>>|undefined;
let initializedOnce=false;
async function initialize(){
 const generation=++initialization;
 try{
 entryLoading?.begin();startupError='';for(const stage of ['花纹','杯底标识','背景',...(pool?['城市与文字']:[])])startupPending.add(stage);
 if(profile==='consumer'){await ensureResources();if(generation!==initialization||disposed||contextLost)return;const m=resources!.manifest;pool!.pinFiles([...cityLibrary(m),m.mark,...Object.values(m.fixed).flatMap(region=>[region.light.baseColor,region.light.normal,region.light.orm])]);}
 const markReady=pool&&resources?pool.acquire(resources.manifest.mark).then(lease=>{if(disposed){lease.release();return;}markLease?.release();markLease=lease;mats.mark.map=lease.texture;mats.mark.needsUpdate=true;invalidate();}):loadTexture(`${import.meta.env.BASE_URL}marks/auratic-reference.png`).then(t=>{if(disposed){t.dispose();return;}t.colorSpace=SRGBColorSpace;mats.mark.map=t;mats.mark.needsUpdate=true;invalidate();});
 const initialDesign=resources?validateDesign(resources.bootstrap.defaultDesign,resources.manifest):undefined;
 const initialSelection=initializedOnce?selection.current:selection.desired!==untouchedSelection||!initialDesign?selection.desired:{variant:`v6-${initialDesign.cityId}-${initialDesign.appearance.preset}`,text:initialDesign.sloganId as Selection['text'],appearance:initialDesign.appearance};
 const cityReady=profile==='consumer'?selection.select(initialSelection):applyCityArtwork(chinaPack);
 // Context recovery depends on the pinned low library, never a new HD transfer.
 const restoring=recovering;
 const library=resources?cityLibrary(resources.manifest):[],nearby=resources&&!restoring?neighborAssets(resources.manifest,selectedCity(),mobile?'standard':'detail',cityOrder):[];
 if(resources){const f=resources.fixedPack(fixedTiers);entryLoading?.plan([resources.manifest.mark,...Object.values(f.regions).flatMap(r=>[r.runtime!.baseColor,r.runtime!.normal,r.runtime!.orm]),...library,...nearby]);}
 await Promise.all([trackStartup('花纹',fixed.apply(resources?resources.fixedPack(fixedTiers):defaultPack).then(committed=>{if(!committed)throw Error('固定花纸读取中断');if(!disposed){wallMaterials[1]=mats.regions.body;inspect();}}),generation),cityReady,trackStartup('杯底标识',markReady,generation),trackStartup('背景',profile==='consumer'?background.ready.then(()=>background.select('soft-v3')):background.ready,generation)]);
 if(generation!==initialization||disposed||contextLost)return;
 if(pool&&resources){
  await pool.prefetch([...library,...nearby]);if(generation!==initialization||disposed||contextLost)return;
  const labels=await pool.acquireAll(Object.values(resources.manifest.slogans).map(s=>s.asset));
  if(generation!==initialization||disposed||contextLost){labels.forEach(l=>l.release());return;}
  sloganLeases.forEach(l=>l.release());sloganLeases=labels;for(const lease of labels)studio.renderer.initTexture(lease.texture);
  await (artworkUI as ReturnType<typeof createConsumerPanel>).setThumbnails(Object.fromEntries(Object.entries(resources.manifest.cities).map(([id,c])=>[id,pool!.previewUrl(c.thumbnail)])));
  if(generation!==initialization||disposed||contextLost)return;
  if(!restoring){cityTier=mobile?'standard':'detail';if(!await selection.select({}))throw Error('当前城市高清未准备完成');}
  neighborCity=restoring?'':selectedCity();startupPending.delete('城市与文字');
 }
 syncLoadingStatus();if(restoring)warmNeighbors();
 }catch(error){if(generation!==initialization||disposed||contextLost)return;throw error;}
}
function startupFailed(e:unknown){console.error('Startup failed',e);startupError='部分素材未能载入，请刷新重试。';syncLoadingStatus();if(profile!=='consumer')ui.error(String(e));}
document.querySelector<HTMLAnchorElement>('.entry-reload')?.addEventListener('click',e=>{if(!startupError&&!selection.error)return;e.preventDefault();if(!resources)resourcesPromise=undefined;assetsReady=false;void initialize().catch(startupFailed);});
void initialize().catch(startupFailed);
const authoringFraming=createAuthoringFraming(studio.camera,ui.canvas,profile==='consumer');
const updateClipping=createCameraClipping(studio.camera,product.root);
const resolution=new AdaptiveResolution(studio.renderer.getPixelRatio(),Math.min(devicePixelRatio,2));
function density(){return product.parameters.radius*2*ui.canvas.clientHeight*studio.renderer.getPixelRatio()/(2*studio.camera.position.distanceTo(view.controls.target)*Math.tan(studio.camera.fov*Math.PI/360));}
function scheduleQuality(){clearTimeout(qualityTimer);if(resources&&!contextLost&&!document.hidden)qualityTimer=window.setTimeout(()=>void upgradeQuality(),350);}
async function upgradeQuality(){
 if(!resources||!assetsReady||selection.busy||view.moving||qualityBusy||document.hidden||contextLost)return;
 baselineDensity||=density();const near=['detail','flowers','handle','lid'].includes(view.view)||density()>baselineDensity*1.35;if(!near&&cityTier!=='light')return;
 const tier:Tier=mobile?'standard':density()*3>2048?'detail':'standard';
 qualityBusy=true;qualityError='';
 try{
  // Upgrade the inspected region, not every visible material at once.
  const focus=view.view==='flowers'?'saucer':view.view==='handle'?'handle':view.view==='lid'?'none':'city';
  const next:Record<Region,Tier>={body:'light',handle:'light',saucer:'light'};
  if(focus==='saucer')next.saucer=tier;if(focus==='handle'){next.body=tier;next.handle=tier;}
  const nextCity:Tier=tier;const upgradeCity=selectedCity();
  const cp=resources.cityPack(selection.current,nextCity),fixedPack=resources.fixedPack(next);
  const assets=[cp.runtime!.mask,cp.runtime!.normal,cp.runtime!.label.asset,resources.manifest.mark,...Object.values(fixedPack.regions).flatMap(r=>[r.runtime!.baseColor,r.runtime!.normal,r.runtime!.orm])];
  const labelExtra=Object.values(resources.manifest.slogans).reduce((n,s)=>n+textureBytes(s.asset),0)-textureBytes(cp.runtime!.label.asset);
  const steady=assets.reduce((n,a)=>n+textureBytes(a),0)+labelExtra;
  while(mobile&&steady+targetBytes()>pool!.steady&&resolution.ratio>1){resolution.ratio=Math.max(1,resolution.ratio-.25);studio.renderer.setPixelRatio(resolution.ratio);studio.resize();updateBudget();}
  if(steady+targetBytes()>pool!.steady){qualityError='当前画面达到资源预算，保留现有清晰度';return;}
  if(cityTier!==nextCity){const previous=cityTier;cityTier=nextCity;if(!await selection.select({})&&selectedCity()===upgradeCity)cityTier=previous;if(selectedCity()!==upgradeCity)return;}
  if(JSON.stringify(next)!==JSON.stringify(fixedTiers)&&await fixed.apply(fixedPack)){fixedTiers=next;setFixedRelief(fixedReliefEnabled);}
 }catch(e){qualityError=String(e);}finally{qualityBusy=false;}
}
function frame(now:number){
 raf=0;if(disposed||document.hidden||contextLost||recovering)return;
 const elapsed=now-last,dt=Math.min(.1,elapsed/1000);last=now;
 const moved=!calibrating&&view.update(dt);if(moved){awakeUntil=now+500;scheduleQuality();}
 if(moved||dirty){
  updateBudget();
  if(mobile&&assetsReady&&moved&&resolution.sample(elapsed)){const old=studio.renderer.getPixelRatio();studio.renderer.setPixelRatio(resolution.ratio);studio.resize();updateBudget();if(pool!.debug().estimatedGpuBytes+targetBytes()>pool!.steady){resolution.ratio=old;studio.renderer.setPixelRatio(old);studio.resize();updateBudget();}}
  updateClipping();studio.contact.update(product.root);authoringFraming.apply();
  if(mode==='pbr'){reflections.update(now);lidReflections.update();}
  studio.floor.visible=product.saucer.visible&&product.cup.visible;studio.renderer.render(studio.scene,studio.camera);renderFrames++;glass?.captureModel();
  authoringFraming.restore();if(assetsReady&&(!glass||glass.ready()))entryLoading?.finish(()=>{ui.canvas.dataset.ready='true';});dirty=false;
 }
  if(mobile){const reason=glassPolicy.sample(now,assetsReady&&ui.canvas.dataset.ready==='true'&&!selection.busy&&!qualityBusy&&!pool?.transitioning&&!pool?.debug().decode.active&&(moved||now<awakeUntil));if(reason)glass?.fallback(reason);}
 if(view.moving||now<awakeUntil){if(!raf)raf=requestAnimationFrame(frame);}else scheduleQuality();
}
const controlsChanged=()=>{invalidate();scheduleQuality();};view.controls.addEventListener('change',controlsChanged);view.controls.addEventListener('start',controlsChanged);
const interaction=(event?:Event)=>{if(!event||event.target===ui.canvas)invalidate();else if(!raf&&!document.hidden&&!contextLost)raf=requestAnimationFrame(frame);awakeUntil=performance.now()+1200;scheduleQuality();};
const eventScope=new AbortController();for(const name of ['pointerdown','pointermove','pointerup','keydown'])document.addEventListener(name,interaction,{capture:true,passive:true,signal:eventScope.signal});
ui.canvas.addEventListener('viewport-resize',()=>{if(!budgetResizing)updateBudget(transientReserve);invalidate();},{signal:eventScope.signal});
const panelResize=new ResizeObserver(()=>interaction());panelResize.observe(document.querySelector('#artwork-settings')!);
const visibility=()=>{pool?.pause(document.hidden);glassPolicy.reset();if(document.hidden){cancelAnimationFrame(raf);raf=0;clearTimeout(qualityTimer);}else{last=performance.now();invalidate();}};
document.addEventListener('visibilitychange',visibility,{signal:eventScope.signal});
ui.canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();glass?.fallback('model-context-lost');contextLost=true;recovering=true;assetsReady=false;++initialization;neighborController?.abort();neighborCity='';sloganLeases.forEach(l=>l.release());sloganLeases=[];entryLoading?.begin();document.querySelector<HTMLElement>('#artwork-settings')!.inert=true;ui.canvas.dataset.ready='false';cancelAnimationFrame(raf);raf=0;clearTimeout(qualityTimer);city.resetRuntime();fixed.cancelPending();pool?.clear();studio.releaseContext();reflections.releaseContext();lidReflections.releaseContext();const lostMaterials=new Set<Material>();studio.scene.traverse(o=>{if(o instanceof Mesh){o.geometry.dispose();for(const m of (Array.isArray(o.material)?o.material:[o.material]))lostMaterials.add(m);}});lostMaterials.forEach(m=>m.dispose());ui.message('正在恢复画面…',true);},{signal:eventScope.signal});
ui.canvas.addEventListener('webglcontextrestored',()=>{contextLost=false;cityTier='light';fixedTiers={body:'light',handle:'light',saucer:'light'};studio.rebuildEnvironment();mats.porcelain.envMap=studio.porcelainEnvironment;product.root.traverse(o=>{if(o instanceof Mesh)for(const m of (Array.isArray(o.material)?o.material:[o.material]))if(m.name==='knob-striped-porcelain')m.envMap=studio.porcelainEnvironment;});reflections.invalidate();lidReflections.invalidate();studio.contact.invalidate();void initialize().catch(startupFailed);invalidate();},{signal:eventScope.signal});
ui.canvas.addEventListener('dblclick',()=>{calibrating=false;studio.camera.clearViewOffset();studio.camera.fov=33;studio.camera.updateProjectionMatrix();view.set('hero');},{signal:eventScope.signal});
invalidate();
const debug=()=>({version:'7.1.2',profile,preload:{neighborCity,neighborError,readyCities:resources?Object.values(resources.manifest.cities).filter(c=>pool?.fileReady(c.levels.light.mask)&&pool.fileReady(c.levels.light.normal)).length:0,slogans:sloganLeases.length},entryLoading:entryLoading?.debug(),loading:{pending:[...startupPending],error:startupError},quality:{cityTier,fixedTiers,mobile,upgrading:qualityBusy,error:qualityError,dpr:studio.renderer.getPixelRatio(),renderFrames,contextLost},resources:pool?.debug(),renderTargets:studio.memory(),glass:glass?.debug(),haptics:haptics.debug(),selection:{current:selection.current,desired:selection.desired,busy:selection.busy,error:selection.error},porcelain:PORCELAIN,ready:ui.canvas.dataset.ready==='true',view:view.view,mode,auto:view.auto,camera:studio.camera.position.toArray(),clipping:{near:studio.camera.near,far:studio.camera.far},target:view.controls.target.toArray(),exposure:studio.renderer.toneMappingExposure,background:background.state(),environment:studio.scene.environment?.uuid,parameters:product.parameters,reflections:reflections.debug(),lidReflections:lidReflections.debug(),bottomClearance:view.bottomClearance(),geometries:[...originals.keys()].map(o=>o.geometry.uuid),memory:{...studio.renderer.info.memory,programs:studio.renderer.info.programs?.length},city:city.debug(),fixedFinish:{cleanGoldGround:mats.regions.saucer.userData.cleanGoldGround,enabled:fixedReliefEnabled,normalScale:mats.regions.saucer.normalScale.x,clearcoatNormalScale:mats.regions.saucer.clearcoatNormalScale.x,clearcoat:mats.regions.saucer.clearcoat,specularIntensity:mats.regions.saucer.specularIntensity},fixed:Object.fromEntries(Object.entries(fixed.currentMaps).map(([region,m])=>[region,Object.fromEntries(Object.entries(m).map(([k,t])=>[k,t.uuid]))]))});
Object.assign(window,{cupViewer:{ready:()=>ui.canvas.dataset.ready==='true',whenReady:readiness.whenReady,getLoadState:readiness.get,onLoadStateChange:readiness.subscribe,exportDesign:()=>{if(!resources||!assetsReady||selection.busy)throw Error('作品尚未准备完成');return exportDesign(selection.current,resources.manifest);},importDesign:async(value:unknown)=>{if(!resources||!assetsReady)throw Error('观察器尚未准备完成');const releaseId=(value as DesignConfig)?.resourceReleaseId;const next=releaseId===resources.manifest.releaseId?resources:await loadResources(releaseId);const d=validateDesign(value,next.manifest);if(contextLost||disposed)throw Error('画面正在恢复');if(next!==resources){neighborController?.abort();neighborCity='';resources=next;resourcesPromise=Promise.resolve(next);requestedCity='';const m=next.manifest;pool?.pinFiles([...cityLibrary(m),m.mark,...Object.values(m.fixed).flatMap(r=>[r.light.baseColor,r.light.normal,r.light.orm])]);}return selection.select({variant:`v6-${d.cityId}-${d.appearance.preset}`,text:d.sloganId as Selection['text'],appearance:d.appearance});},onDesignChange:(callback:(design:DesignConfig)=>void)=>{subscribers.add(callback);return ()=>subscribers.delete(callback);},capture:()=>{authoringFraming.apply();studio.renderer.render(studio.scene,studio.camera);authoringFraming.restore();return ui.canvas.toDataURL('image/png');},applyCityArtwork,restore:()=>selection.restore(),selectArtwork:(patch:Partial<Selection>)=>selection.select(patch),setView:(v:View,instant=false)=>{calibrating=false;studio.camera.clearViewOffset();studio.camera.fov=33;studio.camera.updateProjectionMatrix();view.set(v,instant);},setCalibration:(pose:Pose)=>{view.set('hero',true);calibrating=true;product.cup.quaternion.setFromAxisAngle(new Vector3(0,1,0),(pose.cupYaw??0)*Math.PI/180);product.lid.quaternion.copy(product.cup.quaternion);applyPose(studio.camera,pose,ui.canvas.clientWidth,ui.canvas.clientHeight);},setAuto:(v:boolean)=>view.setAuto(v),setRelief:setCityRelief,setLocalReflections:(v:boolean)=>reflections.setEnabled(v),refreshReflections:(options?:{includeHandle?:boolean})=>reflections.refresh(options),setFixedRelief,setCityMetal:(v:boolean)=>{city.setMetal(v);inspect();},setMode:(v:string)=>{mode=v;inspect();},
 setCamera:(camera:[number,number,number],target:[number,number,number])=>{view.set('hero',true);view.controls.dispatchEvent({type:'start'});studio.camera.position.fromArray(camera);view.controls.target.fromArray(target);view.controls.update();},
 setPorcelainEnabled:(v:boolean)=>{porcelainControls.forEach(c=>c.setEnabled(v));reflections.refresh();},
 fixedPrecision:()=>fixed.precision(),
 applyFixedArtwork:async(pack:StylePack)=>{const committed=await fixed.apply(pack);if(committed){reflections.refresh();inspect();}return committed;},
 debug,dispose:()=>{if(disposed)return;disposed=true;++initialization;neighborController?.abort();sloganLeases.forEach(l=>l.release());sloganLeases=[];eventScope.abort();panelResize.disconnect();clearTimeout(qualityTimer);subscribers.clear();cancelAnimationFrame(raf);readiness.dispose();entryLoading?.dispose();glass?.dispose();background.dispose();artworkUI?.dispose();disposeHapticsDiagnostics();haptics.dispose();ui.dispose();lidReflections.dispose();reflections.dispose();city.dispose();fixed.dispose();markLease?.release();pool?.dispose();view.dispose();temporary.forEach(m=>m.dispose());product.dispose();Object.values(mats.regions).forEach(m=>m.dispose());mats.porcelain.dispose();mats.wallPorcelain.dispose();mats.gold.dispose();mats.foot.dispose();mats.mark.map?.dispose();mats.mark.dispose();mats.city.dispose();studio.dispose();}}});
if(profile==='dev')disposeHapticsDiagnostics=createHapticsDiagnostics();
if(import.meta.hot)import.meta.hot.dispose(()=>{(window as any).cupViewer.dispose();});
