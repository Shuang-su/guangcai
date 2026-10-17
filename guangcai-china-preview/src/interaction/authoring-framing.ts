import {Matrix4,type PerspectiveCamera} from 'three';

/** Reframe the projected scene, never the canvas: close-ups keep the full viewport. */
export function createAuthoringFraming(camera:PerspectiveCamera,canvas:HTMLCanvasElement,consumer=false){
 const saved=new Matrix4(),framing=new Matrix4();let applied=false;
 return {
  apply(){
   if(consumer){
    const width=canvas.clientWidth,height=canvas.clientHeight,panel=document.querySelector<HTMLElement>('#artwork-settings')?.getBoundingClientRect();if(!panel)return;
    const landscape=height<=520,scale=landscape?.8:width<=700?.94:.88;
    const center=landscape?.5:Math.min(.44,Math.max(.32,(panel.top+40)/height*.5));
    saved.copy(camera.projectionMatrix);framing.set(scale,0,0,landscape?-330/width:-.045,0,scale,0,landscape?0:1-2*center-.14*scale,0,0,1,0,0,0,0,1);
    camera.projectionMatrix.premultiply(framing);camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();applied=true;return;
   }
   if(!canvas.closest('main')?.classList.contains('artwork-open'))return;
   const width=canvas.clientWidth,height=canvas.clientHeight;
   const sheet=width<=700&&height>520,scale=sheet?.55:height<=520?.8:.83;
   saved.copy(camera.projectionMatrix);
   framing.set(scale,0,0,sheet?0:-(height<=520?310:340)/width,0,scale,0,sheet?.48:0,0,0,1,0,0,0,0,1);
   camera.projectionMatrix.premultiply(framing);camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();applied=true;
  },
  restore(){if(applied){camera.projectionMatrix.copy(saved);camera.projectionMatrixInverse.copy(saved).invert();applied=false;}}
 };
}
