import {references,type ReferenceId} from './reference-views';
import { Box3, MathUtils, Quaternion, Vector3 } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Product } from '../geometry/product';
import type { Studio } from '../studio/studio';
export const viewLabels={hero:'整体',front:'正面',handle:'把手',top:'俯视',bottom:'杯底',saucerBottom:'碟底',exploded:'拆解',lid:'杯盖',detail:'花纹细看'} as const;
export type View=keyof typeof viewLabels;
export class ViewController{
  controls:OrbitControls;view:View='hero';auto=false;
  private active=false;private animateCamera=false; private toCamera=new Vector3();private toTarget=new Vector3();
  private cupPos=new Vector3();private lidPos=new Vector3();private saucerPos=new Vector3();private cupQuat=new Quaternion();private lidQuat=new Quaternion();
  constructor(private studio:Studio,private getProduct:()=>Product,private onChange:()=>void){
    this.controls=new OrbitControls(studio.camera,studio.renderer.domElement);
    this.controls.enableDamping=true;this.controls.dampingFactor=.09;this.controls.enablePan=false;
    this.controls.minDistance=85;this.controls.maxDistance=750;this.controls.minPolarAngle=.035;this.controls.maxPolarAngle=Math.PI-.035;
    this.controls.autoRotateSpeed=.7;this.controls.target.set(7,65,0);
    this.controls.addEventListener('start',()=>{this.animateCamera=false;this.setAuto(false);});
    this.set('hero',true);
  }
  setAuto(v:boolean){this.auto=v;this.controls.autoRotate=v;this.onChange();}
  set(view:View,instant=false){
    this.setAuto(false);this.view=view;this.studio.camera.up.set(0,1,0);
    const p=this.getProduct(),h=p.parameters.height;
    this.cupPos.copy(p.home.cup);this.lidPos.copy(p.home.lid);this.saucerPos.copy(p.home.saucer);this.cupQuat.identity();this.lidQuat.identity();
    p.cup.visible=true;p.lid.visible=true;p.saucer.visible=true;
    this.toTarget.set(7,65,0);let pos=[205,175,285];
    if(view==='front'){pos=[-40,99,340];this.toTarget.set(4,61,0);}
    if(view==='handle'){pos=[65,105,325];this.toTarget.set(17,67,0);}
    if(view==='top'){p.lid.visible=false;pos=[.1,325,1];this.toTarget.set(0,45,0);}
    if(view==='exploded'){this.cupPos.y+=26;this.lidPos.y+=72;pos=[240,205,355];this.toTarget.set(5,103,0);}
    if(view==='bottom'){
      p.lid.visible=false;p.saucer.visible=false;this.cupPos.set(0,h/2+38,0);
      this.cupQuat.setFromAxisAngle(new Vector3(1,0,0),Math.PI);
      pos=[170,300,290];this.toTarget.set(4,h/2+42,0);
    }
    if(view==='saucerBottom'){
      p.cup.visible=false;p.lid.visible=false;pos=[0,-290,50];this.toTarget.set(0,5,0);
    }
    if(view==='lid'){
      p.cup.visible=false;p.saucer.visible=false;this.lidPos.set(0,33,0);
      pos=[68,111,127];this.toTarget.set(0,36,0);
    }
    if(view==='detail'){pos=[170,123,92];this.toTarget.set(46,67,0);}
    const aspect=this.studio.camera.aspect;
    this.toCamera.set(...pos as [number,number,number]);
    if(aspect<.8)this.toCamera.sub(this.toTarget).multiplyScalar(1.4).add(this.toTarget);
    this.active=true;this.animateCamera=true;if(instant)this.update(10);this.onChange();
  }
  update(dt:number){
    if(this.active){
      const p=this.getProduct(),a=1-Math.exp(-dt*7);
      p.cup.position.lerp(this.cupPos,a);p.lid.position.lerp(this.lidPos,a);p.saucer.position.lerp(this.saucerPos,a);
      p.cup.quaternion.slerp(this.cupQuat,a);p.lid.quaternion.slerp(this.lidQuat,a);
      if(this.animateCamera){this.studio.camera.position.lerp(this.toCamera,a);this.controls.target.lerp(this.toTarget,a);}
      if((!this.animateCamera||this.studio.camera.position.distanceTo(this.toCamera)<.005)&&p.cup.position.distanceTo(this.cupPos)<.001&&p.lid.position.distanceTo(this.lidPos)<.001&&p.cup.quaternion.angleTo(this.cupQuat)<.0001)this.active=false;
    }
    this.controls.update();
  }
  reference(id:ReferenceId){
    const pose=references[id];if(!pose)return;
    this.set('hero',true);this.active=false;this.animateCamera=false;this.setAuto(false);
    const p=this.getProduct();p.cup.visible=pose.part==='all'||pose.part==='cup';p.lid.visible=pose.part==='all'||pose.part==='lid';p.saucer.visible=pose.part==='all'||pose.part==='saucer';
    if(pose.part==='lid')p.lid.position.set(0,33,0);
    this.controls.target.fromArray(pose.target);this.studio.camera.position.fromArray(pose.camera);
    this.controls.minDistance=50;this.controls.update();
    // Keep the reference direction, but fit the complete visible piece at any viewport.
    p.root.updateMatrixWorld(true);
    const bounds=new Box3();
    for(const part of [p.cup,p.lid,p.saucer])if(part.visible)bounds.union(new Box3().setFromObject(part));
    for(let iteration=0;iteration<('detail' in pose?0:3);iteration++){
      this.studio.camera.updateMatrixWorld(true);let scale=1;
      for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){
        const v=new Vector3(x,y,z).project(this.studio.camera);scale=Math.max(scale,Math.abs(v.x)/.9,Math.abs(v.y)/.88);
      }
      if(scale<=1.001)break;
      this.studio.camera.position.sub(this.controls.target).multiplyScalar(scale).add(this.controls.target);this.controls.update();
    }
    if(id==='1148'){this.studio.camera.up.set(0,-1,0);this.studio.camera.lookAt(this.controls.target);}
    if(id==='1148'){this.studio.camera.up.set(0,-1,0);this.studio.camera.lookAt(this.controls.target);}
    if(id==='1168'){this.studio.camera.up.set(1,0,0);this.studio.camera.lookAt(this.controls.target);}
    this.onChange();
  }
  bottomClearance(){this.getProduct().root.updateMatrixWorld(true);return new Box3().setFromObject(this.getProduct().cup).min.y;}
  dispose(){this.controls.dispose();}
}
