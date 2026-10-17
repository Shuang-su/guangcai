import {Box3,Sphere,type Object3D,type PerspectiveCamera} from 'three';

/** Dolly/pan can put the model beyond the old fixed far plane. Keep the near
 * plane unchanged and expand far only when the complete assembly needs it. */
export function createCameraClipping(camera:PerspectiveCamera,root:Object3D){
 const bounds=new Box3(),sphere=new Sphere();
 return ()=>{
  bounds.setFromObject(root);if(bounds.isEmpty())return;
  bounds.getBoundingSphere(sphere);
  const required=camera.position.distanceTo(sphere.center)+sphere.radius+64;
  const far=Math.max(2500,Math.ceil(required/256)*256);
  if(camera.far!==far){camera.far=far;camera.updateProjectionMatrix();}
 };
}
