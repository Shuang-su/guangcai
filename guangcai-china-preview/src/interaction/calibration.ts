import {PerspectiveCamera,Vector3,MathUtils} from 'three';
export interface Pose {yaw:number;pitch:number;roll:number;distance:number;fov:number;cx:number;cy:number;targetY:number}
export const calibrations:Record<string,{label:string;part:'all'|'saucer'|'lid';pose:Pose}>={
 '1238':{label:'1238 · 盖片与盖把侧面',part:'lid',pose:{"yaw": 0, "pitch": 2.469329694742335, "roll": 90.0086517880859, "distance": 186.38023902495297, "fov": 35, "cx": 0.5629832664266305, "cy": 0.5511243300743722, "targetY": 109}},
 '1236':{label:'1236 · 盖片厚度与盖把宽面',part:'lid',pose:{"yaw": 90, "pitch": 3.263230933212226, "roll": 90.01134281885084, "distance": 179.19230012600545, "fov": 35, "cx": 0.5112196649252497, "cy": 0.47204706950120995, "targetY": 109}},
 '1221':{label:'1221 · 碟侧缘与底足',part:'saucer',pose:{"yaw": 0, "pitch": -1.7971666625948788, "roll": 1.2190101205938397, "distance": 133.35205484567967, "fov": 63.81898551326694, "cx": -0.07755731964449633, "cy": 0.5235097707814265, "targetY": 9}},
 '1220':{label:'1220 · 整体比例',part:'all',pose:{"yaw": 0, "pitch": 12.417810088827615, "roll": 9.773764508092875e-07, "distance": 642.7882843703896, "fov": 22.029328932761093, "cx": 0.49097304055724805, "cy": 0.5586560516095467, "targetY": 57}},
 '1230':{label:'1230 · 碟底与圈足',part:'saucer',pose:{"yaw": 0, "pitch": -87.91348993385893, "roll": 1.0145281995962279, "distance": 258.4986466384489, "fov": 43.67505936270134, "cx": 0.5057672952436242, "cy": 0.4892837257461798, "targetY": 4}},
};
/** Lens framing, not an image warp. All modes use the identical 3D geometry. */
export function applyPose(camera:PerspectiveCamera,p:Pose,width:number,height:number){
 const yaw=MathUtils.degToRad(p.yaw),pitch=MathUtils.degToRad(p.pitch),target=new Vector3(0,p.targetY,0);
 camera.position.set(Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch)).multiplyScalar(p.distance).add(target);
 camera.up.set(0,1,0);camera.lookAt(target);camera.rotateZ(MathUtils.degToRad(p.roll));
 camera.fov=p.fov;camera.aspect=width/height;
 camera.setViewOffset(width,height,(.5-p.cx)*width,(.5-p.cy)*height,width,height);
 camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
}
