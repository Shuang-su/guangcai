import {Matrix4,type PerspectiveCamera} from 'three';

/** Reframe the projected scene, never the canvas: close-ups keep the full viewport. */
export function createAuthoringFraming(camera:PerspectiveCamera,canvas:HTMLCanvasElement){
 const saved=new Matrix4(),framing=new Matrix4();let applied=false;
 return {
  apply(){
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
