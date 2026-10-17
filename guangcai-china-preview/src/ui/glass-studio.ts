import {configureGlassBudget,glassMemory} from '../../vendor/glass-hq/src/dom/resource-budget';
import {clearMaterialMapCache,releaseDecodedMaps} from '../../vendor/glass-hq/src/dom/maps';
import {createGlassScene,type GlassSceneController,type SurfaceOptions} from '../../vendor/glass-hq/src/dom/index';
import {getMaterialRenderer} from '../../vendor/glass-hq/src/dom/renderer';
import {disposeMaterialRenderer} from '../../vendor/glass-hq/src/webgl2/index';
import {attachInteraction} from '../../vendor/glass-hq/src/dom/interaction';
import {registerShapeContainer} from '../../vendor/glass-hq/src/dom/shape-layout';
import {connectGlassAnimation} from './glass-animation';
import {attachNativeGlass,needsIsolatedGlass} from './glass-compat';
import {createRasterGlass} from './glass-raster';
import {palettes,type Palette} from '../styles/city-appearance';
import '../../vendor/glass-hq/src/styles.css';
import './glass-compat.css';

/** Original Glass-HQ materials on visible UI; input and haptic nodes stay intact. */
export function createGlassStudio(options:{admitMemory?:(bytes:number,scratch:number)=>boolean;invalidate?:()=>void}={}){
 configureGlassBudget(options.admitMemory??(()=>true));
 const root=document.querySelector<HTMLElement>('.consumer-scene')!,content=document.querySelector<HTMLElement>('#glass-content')!;
 // Engine-specific composition, not GPU capability filtering: both paths
 // retain WebGL2 maps. Native frosting is only an actual failure fallback.
 const isolated=needsIsolatedGlass(navigator);
 root.dataset.glassCompositor=isolated?'webgl2':'svg';
 let compositor:ReturnType<typeof createRasterGlass>|undefined,releaseFallback=()=>{};
 let firstComposite=false;
 let scene:GlassSceneController|undefined,disposed=false,optionFrame=0,optionObserver:MutationObserver|undefined;
 const optionSurfaces=new Map<HTMLElement,()=>void>();let releaseCityClip=()=>{},releaseAnimation=()=>{};
 const clearOptions=()=>{cancelAnimationFrame(optionFrame);optionObserver?.disconnect();optionObserver=undefined;optionSurfaces.forEach(release=>release());optionSurfaces.clear();releaseCityClip();releaseCityClip=()=>{};releaseAnimation();releaseAnimation=()=>{};};
 let state:{backend:string;ready:boolean;maps:number;mapTime:number;error:string}={backend:isolated?'webgl2-isolated':'webgl2',ready:false,maps:0,mapTime:0,error:''};
 root.dataset.glassState='preparing';
 const fallback=(e:unknown)=>{if(disposed||state.backend==='native-backdrop')return;state={...state,backend:'native-backdrop',ready:true,error:String(e)};clearOptions();scene?.dispose();scene=undefined;compositor?.dispose();compositor=undefined;root.dataset.glassState='compatible';releaseFallback=attachNativeGlass(root);state={...state,backend:'native-backdrop',ready:true,error:String(e)};releaseDecodedMaps();clearMaterialMapCache();void disposeMaterialRenderer().catch(()=>{});options.invalidate?.();};
 void getMaterialRenderer().then(async renderer=>{
  await renderer.warmed;if(disposed||state.backend==='native-backdrop')return;
  if(isolated)compositor=createRasterGlass(root,e=>queueMicrotask(()=>fallback(e)),()=>{if(!firstComposite){firstComposite=true;options.invalidate?.();}});
  scene=createGlassScene(root,{layers:compositor,maxSurfaces:32,synchronizedMotion:true,onDiagnostic:d=>{if(disposed)return;if(d.error){queueMicrotask(()=>fallback(d.error));return;}const wasReady=state.ready;state={...state,maps:d.maps,mapTime:d.mapTime,ready:d.maps>0};if(state.ready&&!wasReady)options.invalidate?.();if(state.ready)root.dataset.glassState='ready';}});
  scene.setContent(content);releaseAnimation=connectGlassAnimation(scene);scene.addAnimator(attachInteraction(document.querySelector<HTMLElement>('.panel-handle')!,()=> 'reduced'));
  // The panel owns its DOM height transition. A second layout spring would
  // restart against every intermediate height and keep the optical frame chasing it.
  // Register the content container, so nested lenses are true descendants.
  // A decorative sibling background is a foreground lens to upstream's compositor.
  scene.addSurface(document.querySelector<HTMLElement>('#artwork-settings')!,{material:'clear',radius:28});
  const tabs=document.querySelector<HTMLElement>('.creator-tabs')!,indicator=document.querySelector<HTMLElement>('.creator-indicator')!;
  scene.addSurface(tabs,{material:'regular',radius:'capsule',refraction:18,interactive:true});
  scene.addSurface(indicator,{material:'regular',radius:'capsule',refraction:12});
  for(const button of document.querySelectorAll<HTMLElement>('.consumer-actions button,#view-trigger'))scene.addSurface(button,{material:'regular',radius:'capsule',interactive:true,refraction:14});
  releaseCityClip=registerShapeContainer(document.querySelector<HTMLElement>('.city-cards')!,0);
  const candidates:Array<[HTMLElement,SurfaceOptions]>=[
   [document.querySelector<HTMLElement>('.handle-glass')!,{material:'clear',radius:'capsule',refraction:12,tint:'#d5c5a4'}],
   [document.querySelector<HTMLElement>('#view-menu')!,{material:'regular',radius:24,refraction:16,morphFrom:()=>document.querySelector('#view-trigger'),morph:'detach',neck:36}],
   [document.querySelector<HTMLElement>('.open-palette-editor')!,{material:'regular',radius:'capsule',refraction:14,interactive:true}],
   ...Array.from(document.querySelectorAll<HTMLElement>('[data-palette],[data-palette-copy]'),tile=>[tile.querySelector<HTMLElement>('.palette-swatch')!,{material:'clear',radius:13,tint:palettes[(tile.dataset.palette??tile.dataset.paletteCopy) as Palette].dark,refraction:26,clipTo:()=>tile.closest<HTMLElement>('.palette-viewport')}] as [HTMLElement,SurfaceOptions]),
   ...Array.from(document.querySelectorAll<HTMLElement>('.city-card,.slogan-grid button'),element=>[element,{material:'regular',radius:13,refraction:14,...(element.classList.contains('city-card')?{clipTo:()=>document.querySelector<HTMLElement>('.city-cards')}:{interactive:true})}] as [HTMLElement,SurfaceOptions])
  ];
  const syncOptions=()=>{
   optionFrame=0;if(!scene||disposed)return;
   const visible=new Set(candidates.filter(([element])=>!element.closest('[hidden]')&&(!element.classList.contains('city-card')||element.getAttribute('data-glass-near')==='true')).map(([element])=>element));
   for(const [element,release] of optionSurfaces)if(!visible.has(element)){release();optionSurfaces.delete(element);}
   for(const [element,options] of candidates)if(visible.has(element)&&!optionSurfaces.has(element))optionSurfaces.set(element,scene.addSurface(element,options));
  };
  optionObserver=new MutationObserver(()=>{if(!optionFrame)optionFrame=requestAnimationFrame(syncOptions);});
  optionObserver.observe(root,{subtree:true,attributes:true,attributeFilter:['aria-hidden','data-glass-near','hidden','data-pane','data-level','data-collapsed']});syncOptions();
  // The three-slot ring uses the same upstream Spring, with a fixed central lens.
 }).catch(fallback);
 return {releaseScratch:()=>compositor?.releaseScratch(),captureModel:()=>compositor?.captureModel(),render:()=>compositor?.render(),ready:()=>state.ready&&(!compositor||firstComposite),fallback,debug:()=>({...state,optionSurfaces:optionSurfaces.size,memory:glassMemory(),deviceMemoryGiB:(navigator as Navigator&{deviceMemory?:number}).deviceMemory??null,compositor:compositor?.debug()}),dispose(){disposed=true;clearOptions();scene?.dispose();scene=undefined;compositor?.dispose();releaseFallback();releaseDecodedMaps();clearMaterialMapCache();void disposeMaterialRenderer().catch(()=>{});}};
}
