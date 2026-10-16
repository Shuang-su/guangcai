import './ui/compare.css';
import {BufferGeometry,Group,LineLoop,LineBasicMaterial,Material,Mesh,MeshBasicMaterial,MeshStandardMaterial,SRGBColorSpace,TextureLoader,Vector3} from 'three';
import {buildProduct} from './geometry/product';
import {makeMaterials} from './materials/materials';
import {createStudio} from './studio/studio';
import {defaultPack,StyleManager} from './styles/style-manager';
import {applyPose,calibrations,type Pose} from './interaction/calibration';

const fields:[keyof Pose,string,number,number,number][]=[['pitch','俯仰 / °',-90,90,.05],['yaw','朝向 / °',-180,180,.1],['roll','画面倾斜 / °',-180,180,.05],['distance','距离 / mm',90,900,.25],['fov','垂直视角 / °',10,90,.1],['cx','水平中心 / 画幅',-2,2,.001],['cy','垂直中心 / 画幅',-1,2,.001]];
document.querySelector('#app')!.innerHTML=`<main><aside><a href="./">← 三维观察器</a><h1>实拍叠图校准</h1><p>同一器型、同一相机。调整机位后，用透明叠加与显隐切换检查轮廓。</p><label>参考照片<select id="reference">${Object.entries(calibrations).map(([id,c])=>`<option value="${id}">${c.label}</option>`).join('')}</select></label><label>模型显示<select id="mode"><option value="pbr">实际材质</option><option value="clay">中性灰器型</option><option value="silhouette">青色轮廓</option><option value="rings">关键交界线</option></select></label><label>模型不透明度 <output id="opacity-value">50%</output><input id="opacity" type="range" min="0" max="1" step=".01" value=".5"></label><div class="buttons"><button id="photo-only">只看实拍</button><button id="model-only">只看模型</button><button id="overlay">重叠对比</button></div><label class="check"><input id="show-photo" type="checkbox" checked>显示实拍</label><details open><summary>精调相机</summary><div class="fields">${fields.map(([id,label,min,max,step])=>`<label>${label}<input id="${id}" type="number" min="${min}" max="${max}" step="${step}"></label>`).join('')}</div><button id="reset-pose">恢复校准机位</button></details><div class="buttons"><button id="save-image">保存叠图 PNG</button><button id="save-pose">保存机位 JSON</button></div><p id="state" role="status">载入中…</p><p class="note">照片保留原始比例，不作透视拉伸。机位和器型尺寸均为照片估计；151 mm 碟径来自产品参数。金彩使用统一摄影棚反射，花纸是参考风格生成稿。</p></aside><section class="workspace"><div id="frame"><img id="photo" alt="用于器型对比的用户实拍"><canvas id="model" aria-label="与实拍共用画幅的三维模型"></canvas></div></section></main>`;
const $=<T extends HTMLElement>(id:string)=>document.getElementById(id) as T;
const photo=$<HTMLImageElement>('photo'),canvas=$<HTMLCanvasElement>('model'),frame=$('frame');
const mats=makeMaterials(),product=buildProduct(mats),studio=createStudio(canvas,true);
studio.scene.add(product.root);studio.floor.visible=false;
const manager=new StyleManager(mats,8,()=>{});
manager.fit({body:product.parameters.radius*product.parameters.bandAngle/(product.parameters.height-5.3),handle:(product.cup.getObjectByName('wide-ribbon-handle') as Mesh).geometry.userData.surfaceMetrics.aspect,saucer:(product.saucer.children[0] as Mesh).geometry.userData.surfaceMetrics.aspect});
const originals=new Map<Mesh,Material|Material[]>();product.root.traverse(o=>{if(o instanceof Mesh)originals.set(o,o.material);});
const silhouette=new MeshBasicMaterial({color:'#00d7ee'}),clay=new MeshStandardMaterial({color:'#a5b7bd',roughness:.65});
const depthOnly=new MeshBasicMaterial({colorWrite:false});
const lines=new Group(),lineMaterial=new LineBasicMaterial({color:'#00efff',depthTest:true});lines.renderOrder=2;
for(const[r,y]of [[75.5,17.35],[70.2,5.9],[70.4,4.8],[65.4,3.7],[63.1,1],[62.7,0]])lines.add(new LineLoop(new BufferGeometry().setFromPoints(Array.from({length:512},(_,i)=>{const a=i/512*Math.PI*2;return new Vector3(r*Math.cos(a),y,r*Math.sin(a));})),lineMaterial));
for(const child of lines.children)child.userData.part='saucer';
for(const[r,y]of [[45.7,109],[40.3,107.4],[39.2,104.7]]){const line=new LineLoop(new BufferGeometry().setFromPoints(Array.from({length:512},(_,i)=>{const a=i/512*Math.PI*2;return new Vector3(r*Math.cos(a),y,r*Math.sin(a));})),lineMaterial);line.userData.part='lid';lines.add(line);}
studio.scene.add(lines);lines.visible=false;
let id='1221',pose:Pose={...calibrations[id].pose},ready=false,disposed=false;
function controls(){for(const[key]of fields)$<HTMLInputElement>(key).value=String(pose[key]);}
function render(){
 if(disposed)return;const w=photo.naturalWidth||1368,h=photo.naturalHeight||1824;
 applyPose(studio.camera,pose,w,h);studio.renderer.render(studio.scene,studio.camera);
}
function presentation(){canvas.style.opacity=$<HTMLInputElement>('opacity').value;$('opacity-value').textContent=`${Math.round(Number(canvas.style.opacity)*100)}%`;photo.style.visibility=$<HTMLInputElement>('show-photo').checked?'visible':'hidden';render();}
function setMode(mode:string){
 for(const [mesh,material]of originals)mesh.material=mode==='silhouette'?silhouette:mode==='clay'?clay:mode==='rings'?depthOnly:material;
 product.root.visible=true;lines.visible=mode==='rings';for(const child of lines.children)child.visible=child.userData.part===(calibrations[id].part==='lid'?'lid':'saucer');render();
}
async function select(next:string,reset=false){
 id=next;$<HTMLSelectElement>('reference').value=id;const c=calibrations[id];pose={...c.pose};
 if(!reset){try{const saved=JSON.parse(localStorage.getItem(`guangcai-calibration-${id}`)||'null');if(saved&&Object.keys(pose).every(k=>Number.isFinite(saved[k])))pose=saved;}catch{}}
 product.cup.visible=c.part==='all';product.lid.visible=c.part==='all'||c.part==='lid';product.saucer.visible=c.part!=='lid';
 lines.visible=$<HTMLSelectElement>('mode').value==='rings';for(const child of lines.children)child.visible=child.userData.part===(c.part==='lid'?'lid':'saucer');
 photo.src=`${import.meta.env.BASE_URL}references/${id}.jpg`;await photo.decode();frame.style.aspectRatio=`${photo.naturalWidth}/${photo.naturalHeight}`;controls();studio.resize();render();
 $('state').textContent=`IMG_${id} · 已载入校准机位，可继续微调`;
}
for(const[key]of fields)$<HTMLInputElement>(key).oninput=()=>{const value=+$<HTMLInputElement>(key).value;if(Number.isFinite(value)){pose[key]=value;localStorage.setItem(`guangcai-calibration-${id}`,JSON.stringify(pose));render();$('state').textContent='机位修改已保存在此浏览器';}};
$<HTMLSelectElement>('reference').onchange=e=>void select((e.target as HTMLSelectElement).value);
$<HTMLSelectElement>('mode').onchange=e=>setMode((e.target as HTMLSelectElement).value);
$<HTMLInputElement>('opacity').oninput=presentation;$<HTMLInputElement>('show-photo').onchange=presentation;
$('photo-only').onclick=()=>{$<HTMLInputElement>('opacity').value='0';$<HTMLInputElement>('show-photo').checked=true;presentation();};
$('model-only').onclick=()=>{$<HTMLInputElement>('opacity').value='1';$<HTMLInputElement>('show-photo').checked=false;presentation();};
$('overlay').onclick=()=>{$<HTMLInputElement>('opacity').value='.5';$<HTMLInputElement>('show-photo').checked=true;presentation();};
$('reset-pose').onclick=()=>{localStorage.removeItem(`guangcai-calibration-${id}`);void select(id,true);};
function state(){return{id,pose:{...pose},photoSize:[photo.naturalWidth,photo.naturalHeight],mode:$<HTMLSelectElement>('mode').value,opacity:Number(canvas.style.opacity||.5),parameters:product.parameters,renderStandard:{exposure:studio.renderer.toneMappingExposure,normalScales:Object.values(mats.regions).map(m=>m.normalScale.toArray())}};}
function download(href:string,name:string){const a=document.createElement('a');a.href=href;a.download=name;a.click();}
function capture(){render();const output=document.createElement('canvas');output.width=photo.naturalWidth;output.height=photo.naturalHeight;const c=output.getContext('2d')!;c.fillStyle='#e6e5e3';c.fillRect(0,0,output.width,output.height);if($<HTMLInputElement>('show-photo').checked)c.drawImage(photo,0,0);c.globalAlpha=Number(canvas.style.opacity||.5);c.drawImage(canvas,0,0,output.width,output.height);return output.toDataURL('image/png');}
$('save-image').onclick=()=>download(capture(),`IMG_${id}-overlay.png`);
$('save-pose').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(state(),null,2)],{type:'application/json'}));download(url,`IMG_${id}-camera.json`);setTimeout(()=>URL.revokeObjectURL(url),1000);};
const observer=new ResizeObserver(()=>render());observer.observe(canvas);
Object.assign(window,{cupCompare:{ready:()=>ready,state,select,setPose:(p:Partial<Pose>)=>{Object.assign(pose,p);controls();render();},setMode,capture,render}});
Promise.all([manager.apply(defaultPack),new TextureLoader().loadAsync(`${import.meta.env.BASE_URL}marks/auratic-reference.png`).then(t=>{t.colorSpace=SRGBColorSpace;mats.mark.map=t;mats.mark.needsUpdate=true;}),select((new URLSearchParams(location.search).get('ref')??'') in calibrations?new URLSearchParams(location.search).get('ref')!:'1221')]).then(()=>{ready=true;presentation();}).catch(e=>$('state').textContent=e.message);
if(import.meta.hot)import.meta.hot.dispose(()=>{disposed=true;observer.disconnect();manager.dispose();product.dispose();lines.children.forEach(o=>(o as LineLoop).geometry.dispose());lineMaterial.dispose();depthOnly.dispose();clay.dispose();silhouette.dispose();mats.mark.map?.dispose();[mats.porcelain,mats.gold,mats.foot,mats.mark,...Object.values(mats.regions)].forEach(m=>m.dispose());studio.dispose();});
