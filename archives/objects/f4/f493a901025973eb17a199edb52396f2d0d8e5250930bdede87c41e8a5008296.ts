import { CatmullRomCurve3, Group, Mesh, MeshPhysicalMaterial, PlaneGeometry, Vector3, type Material } from 'three';
import { arc, revolve, type ProfilePoint } from './surface';
import { ribbon } from './ribbon';
import { handlePath, handleCollar } from './handle';
import { defaults, validateDimensions, type Dimensions } from './parameters';
import type { Materials } from '../materials/materials';

export function buildProduct(m: Materials,p:Dimensions={...defaults}){
  validateDimensions(p);
  const root=new Group(),cup=new Group(),lid=new Group(),saucer=new Group();
  root.add(cup,lid,saucer);
  const mesh=(name:string,g:ReturnType<typeof revolve>,mat:Material|Material[],parent:Group,offsetY=0)=>{
    const object=new Mesh(g,mat);object.name=name;object.position.y=offsetY;object.castShadow=true;object.receiveShadow=true;parent.add(object);return object;
  };
  const r=p.radius,h=p.height,w=p.wall;
  const profile:ProfilePoint[]=[
    [0,2.5],[r-8,2.5],[r-5,2.4],[r-3.8,1.8],[r-3.6,.6],
    [r-3.1,.12],[r-1.7,.12],[r-.8,.45],[r-.2,1.1],[r,2.8],
    [r,5],[r,h-2.3],
    ...arc(r-w/2,h-2.3,w/2,0,Math.PI,16).slice(1),
    [r-w,12],[r-w-.25,9],[r-w-1.1,7.2],[r-w-3.5,p.bottom+.5],
    [r-w-6,p.bottom],[0,p.bottom],
  ];
  const n=240,bandSegments=Math.round(p.bandAngle/(2*Math.PI)*n), actualBand=bandSegments/n*2*Math.PI;
  const body=mesh('cup-wall-and-recessed-foot',revolve(profile,n,{
    start:-actualBand/2,
    material:(j,i)=>j>=9&&j<=10&&i<bandSegments?1:j===5?2:0,
    uv:(_rr,y,theta)=>[(theta+actualBand/2)/actualBand,(y-3)/(h-5.3)],
  }),[m.porcelain,m.regions.body,m.foot],cup,-h/2);
  body.userData={circleRadius:r,bandRadians:actualBand,wallThickness:w};
  const {path,upper,lower}=handlePath(p);
  mesh('wide-ribbon-handle',ribbon(path,p.handleWidth,p.handleThickness,192),[m.porcelain,m.gold,m.regions.handle],cup,-h/2);
  for(const y of[upper,lower])mesh('porcelain-handle-root',handleCollar(r,p.handleWidth,p.handleThickness),m.porcelain,cup,y-h/2);
  const lr=r+p.lidOverhang;
  const lidProfile:ProfilePoint[]=[[0,-1.5],[r-7,-1.5],[r-5,-1.65],[r-4.5,-3.3],[r-3.8,-3.8],[r-3,-3.6],[r-2.7,-1.1],[lr-1,-.35],[lr,-.1],[lr+.3,.6],[lr,1.5],[lr-1,1.9],[r-2,2.15],[r-10,3.1],[12,4.4],[0,4.5]];
  mesh('lid-double-sided-with-seat',revolve(lidProfile,240,{material:j=>j>=8&&j<=10?1:0}),[m.porcelain,m.gold],lid);
  const knobPath=new CatmullRomCurve3(Array.from({length:41},(_,i)=>{
    const a=Math.PI-i/40*Math.PI;return new Vector3(Math.cos(a)*12,4+Math.sin(a)*12,0);
  }));
  const knob=ribbon(knobPath,7,3.3,96);
  // Fine transverse gold stripes on the exterior of the arched bridge only.
  const striped=new MeshPhysicalMaterial({color:'#f4f1e7',roughness:.22,clearcoat:1,metalness:0});
  mesh('arched-bridge-knob',knob,[m.porcelain,m.gold,striped],lid);
  for(let i=1;i<24;i++){
    const a=Math.PI-i/24*Math.PI;
    const stripe=new Mesh(new PlaneGeometry(.23,4.75),m.gold);
    stripe.name='knob-fine-gilded-line';stripe.position.set(Math.cos(a)*13.67,4+Math.sin(a)*13.67,0);
    stripe.up.set(0,0,1);stripe.lookAt(stripe.position.x+Math.cos(a),stripe.position.y+Math.sin(a),0);lid.add(stripe);
  }
  const sr=p.saucerRadius;
  const sp:ProfilePoint[]=[[0,2.7],[r-12,2.7],[r-10,2.5],[r-9,.3],[r-8,0],[r-6,0],[r-5.3,2.6],[sr-8,3.4],[sr-5,4.5],[sr-2.1,7.2],[sr-.45,10.1],[sr,11.4],[sr-.2,12.2],[sr-1,12.5],[sr-2.2,11.8],[sr-5,9.3],[sr-10,7.2],[r+7,6.2],[r+3.1,6.3],[r+2.4,7.15],[r+1.3,7.35],[r+.55,6.9],[r-.3,6.25],[r-2,6],[0,6]];
  mesh('saucer-bowl-and-continuous-rim',revolve(sp,320,{
    material:j=>j>=8&&j<=10?2:j===11||j===12||j===7||j>=18&&j<=20?1:0,
    uv:(_rr,y,theta)=>[theta/(Math.PI*2)*4,(y-4.5)/6.9],
  }),[m.porcelain,m.gold,m.regions.saucer],saucer);
  cup.position.set(0,6+h/2,0);lid.position.y=6+h-.6;
  root.updateMatrixWorld(true);
  return {root,cup,lid,saucer,parameters:p,home:{cup:cup.position.clone(),lid:lid.position.clone(),saucer:saucer.position.clone()},dispose(){
    root.traverse(o=>{if(o instanceof Mesh)o.geometry.dispose();});striped.dispose();
  }};
}
export type Product=ReturnType<typeof buildProduct>;
