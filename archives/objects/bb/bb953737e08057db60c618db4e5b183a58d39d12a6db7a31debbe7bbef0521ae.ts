import './ui/styles.css';
import { Material, Mesh, MeshBasicMaterial, MeshNormalMaterial, MeshStandardMaterial, Vector2 } from 'three';
import { defaults } from './geometry/parameters';
import { buildProduct } from './geometry/product';
import { makeMaterials, type MaterialMode } from './materials/materials';
import { createStudio } from './studio/studio';
import { defaultPack, StyleManager, type StylePack } from './styles/style-manager';
import { ViewController, type View } from './interaction/views';
import { createInterface } from './ui/interface';

let mode:MaterialMode='pbr',relief=.65;
const mats=makeMaterials();let product=buildProduct(mats);
let view:ViewController,manager:StyleManager;
const ui=createInterface({
  view:v=>view.set(v),auto:()=>view.setAuto(!view.auto),reset:()=>view.set('hero'),
  mode:v=>{mode=v;inspectMaterial();},relief:v=>{relief=v;setRelief();},exposure:v=>studio.renderer.toneMappingExposure=v,
  flat:async f=>{if(await manager.flatFile(f)){inspectMaterial();ui.style(manager.currentName);}},
  folder:async f=>{if(await manager.folder(f)){inspectMaterial();ui.style(manager.currentName);}},
  restore:async()=>{if(await manager.apply(defaultPack)){inspectMaterial();ui.style(manager.currentName);}},
  dimensions:p=>{
    try{const next=buildProduct(mats,{...product.parameters,...p});restoreMaterials();studio.scene.remove(product.root);product.dispose();product=next;studio.scene.add(product.root);originals.clear();inspectMaterial();view.set('hero');ui.message('已应用推定尺寸');}
    catch(e){ui.message((e as Error).message,true);}
  },
},defaults);
let studio:ReturnType<typeof createStudio>;
try{studio=createStudio(ui.canvas);}catch(e){ui.error('当前浏览器无法启动 WebGL 2。请开启硬件加速，或用支持 WebGL 2 的浏览器打开。');throw e;}
studio.scene.add(product.root);
view=new ViewController(studio,()=>product,()=>{if(view)ui.update(view.view,view.auto);});
const originals=new Map<Mesh,Material|Material[]>();let inspectionMaterials:Material[]=[];
function restoreMaterials(){for(const[mesh,material]of originals)mesh.material=material;inspectionMaterials.forEach(m=>m.dispose());inspectionMaterials=[];}
function inspectMaterial(){
  restoreMaterials();
  product.root.traverse(o=>{if(o instanceof Mesh&&!originals.has(o))originals.set(o,o.material);});
  if(mode==='pbr')return;
  const clay=new MeshStandardMaterial({color:'#b4b2af',roughness:.62});
  const normal=new MeshNormalMaterial();const white=new MeshBasicMaterial({color:0xffffff});const black=new MeshBasicMaterial({color:0x080808});
  inspectionMaterials.push(clay,normal,white,black);
  const metalByMaterial=new Map<Material,Material>();
  Object.values(mats.regions).forEach(m=>{const inspect=new MeshBasicMaterial({map:m.metalnessMap,color:m.metalnessMap?0xffffff:0x080808});metalByMaterial.set(m,inspect);inspectionMaterials.push(inspect);});
  function convert(mat:Material):Material{
    if(mode==='clay')return clay;if(mode==='normal')return normal;
    if(mode==='porcelain')return Object.values(mats.regions).includes(mat as never)?mats.porcelain:mat;
    return metalByMaterial.get(mat)??(mat===mats.gold?white:black);
  }
  for(const[mesh,material]of originals)mesh.material=Array.isArray(material)?material.map(convert):convert(material);
}
function setRelief(){for(const m of Object.values(mats.regions)){m.normalScale.setScalar(relief);m.clearcoatNormalScale.setScalar(relief*.55);}}
manager=new StyleManager(mats,Math.min(8,studio.renderer.capabilities.getMaxAnisotropy()),()=>{setRelief();});
manager.apply(defaultPack).then(()=>{ui.style(manager.currentName);ui.canvas.dataset.ready='true';}).catch(e=>ui.message(e.message,true));
let last=performance.now(),raf=0,disposed=false;
function frame(now:number){if(disposed)return;const dt=Math.min(.1,(now-last)/1000);last=now;view.update(dt);studio.contact.update(product.root);studio.renderer.render(studio.scene,studio.camera);raf=requestAnimationFrame(frame);}
raf=requestAnimationFrame(frame);
ui.canvas.addEventListener('dblclick',()=>view.set('hero'));
// Public, typed API: geometry never changes when swapping a style package.
const api={
  ready:()=>ui.canvas.dataset.ready==='true',
  setView:(v:View)=>view.set(v),setAuto:(v:boolean)=>view.setAuto(v),
  applyStyle:async(pack:StylePack)=>{const applied=await manager.apply(pack);if(applied){inspectMaterial();ui.style(manager.currentName);}return applied;},
  restore:async()=>{const applied=await manager.apply(defaultPack);if(applied){inspectMaterial();ui.style(manager.currentName);}return applied;},
  debug:()=>({view:view.view,mode,style:manager.currentName,auto:view.auto,camera:studio.camera.position.toArray(),target:view.controls.target.toArray(),bottomClearance:view.bottomClearance(),geometries:[...originals.keys()].map(x=>x.geometry.uuid),memory:{...studio.renderer.info.memory},parameters:{...product.parameters},regions:Object.fromEntries(Object.entries(mats.regions).map(([k,m])=>[k,{normal:!!m.normalMap,metal:!!m.metalnessMap,roughness:!!m.roughnessMap,metalness:m.metalness}]))}),
  dispose:()=>{disposed=true;cancelAnimationFrame(raf);manager.dispose();view.dispose();restoreMaterials();product.dispose();Object.values(mats.regions).forEach(m=>m.dispose());mats.porcelain.dispose();mats.gold.dispose();mats.foot.dispose();studio.dispose();},
};
inspectMaterial();
Object.assign(window,{cupViewer:api});
if(import.meta.hot)import.meta.hot.dispose(()=>api.dispose());
