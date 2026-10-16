import {createGlassScene,type GlassSceneController,type SurfaceOptions} from '../../vendor/glass-hq/src/dom/index';
import {getMaterialRenderer} from '../../vendor/glass-hq/src/dom/renderer';
import {disposeMaterialRenderer} from '../../vendor/glass-hq/src/webgl2/index';
import {attachInteraction} from '../../vendor/glass-hq/src/dom/interaction';
import {registerShapeContainer} from '../../vendor/glass-hq/src/dom/shape-layout';
import {connectGlassAnimation} from './glass-animation';
import {attachNativeGlass,needsNativeGlass} from './glass-compat';
import {palettes,type Palette} from '../styles/city-appearance';
import '../../vendor/glass-hq/src/styles.css';
import './glass-compat.css';

/** Original Glass-HQ materials on visible UI; input and haptic nodes stay intact. */
export function createGlassStudio(){
 const root=document.querySelector<HTMLElement>('.consumer-scene')!,content=document.querySelector<HTMLElement>('#glass-content')!;
 // WebGL2 map support does not establish SVG/WebGL compositor correctness.
 // Select this before warming maps or applying any full-scene filter.
 if(needsNativeGlass(navigator)){
  root.dataset.glassState='compatible';
  const release=attachNativeGlass(root);
  return {debug:()=>({backend:'native-backdrop',ready:true,maps:0,mapTime:0,error:'',reason:'mobile-webkit-svg-webgl-compositing',optionSurfaces:0}),dispose:release};
 }
 let scene:GlassSceneController|undefined,disposed=false,optionFrame=0,optionObserver:MutationObserver|undefined;
 const optionSurfaces=new Map<HTMLElement,()=>void>();let releaseCityClip=()=>{},releaseAnimation=()=>{};
 const clearOptions=()=>{cancelAnimationFrame(optionFrame);optionObserver?.disconnect();optionObserver=undefined;optionSurfaces.forEach(release=>release());optionSurfaces.clear();releaseCityClip();releaseCityClip=()=>{};releaseAnimation();releaseAnimation=()=>{};};
 let state:{backend:string;ready:boolean;maps:number;mapTime:number;error:string}={backend:'webgl2',ready:false,maps:0,mapTime:0,error:''};
 root.dataset.glassState='preparing';
 const fallback=(e:unknown)=>{if(disposed)return;clearOptions();scene?.dispose();scene=undefined;root.dataset.glassState='fallback';state={...state,backend:'transparent-fallback',ready:false,error:String(e)};};
 void getMaterialRenderer().then(async renderer=>{
  await renderer.warmed;if(disposed)return;
  scene=createGlassScene(root,{maxSurfaces:32,synchronizedMotion:true,onDiagnostic:d=>{if(disposed)return;if(d.error){queueMicrotask(()=>fallback(d.error));return;}state={...state,maps:d.maps,mapTime:d.mapTime,ready:d.maps>0};if(state.ready)root.dataset.glassState='ready';}});
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
 return {debug:()=>({...state,optionSurfaces:optionSurfaces.size}),dispose(){disposed=true;clearOptions();scene?.dispose();scene=undefined;void disposeMaterialRenderer();}};
}
