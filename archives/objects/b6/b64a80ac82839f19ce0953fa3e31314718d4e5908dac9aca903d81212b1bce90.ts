import { CatmullRomCurve3, Group, Mesh, MeshPhysicalMaterial, PlaneGeometry, Vector3, type Material } from 'three';
import { arc, revolve, type ProfilePoint } from './surface';
import { ribbon } from './ribbon';
import { handlePath, handleCollar, knobFoot } from './handle';
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
  const lidProfile:ProfilePoint[]=[[0,-1.3],[r-7,-1.3],[r-5,-1.5],[r-4.5,-3.3],[r-3.8,-3.7],[r-3,-3.45],[r-2.7,-1.0],[lr-1,-.35],[lr,-.1],[lr+.3,.6],[lr,1.35],[lr-1,1.65],[r-2,1.9],[r-10,2.65],[14,3.25],[0,3.35]];
  mesh('lid-double-sided-with-seat',revolve(lidProfile,240,{material:j=>j>=8&&j<=10?1:0}),[m.porcelain,m.gold],lid);
  const knobPath=new CatmullRomCurve3(Array.from({length:81},(_,i)=>{
    const a=Math.PI-i/80*Math.PI;return new Vector3(Math.cos(a)*12.8,3.3+Math.sin(a)*10.2,0);
  }));
  const knob=ribbon(knobPath,9.5,4.4,440);
  const striped=new MeshPhysicalMaterial({color:'#f3f2ed',roughness:.16,clearcoat:1,clearcoatRoughness:.06,metalness:0});
  // Stripes belong to the bridge surface itself; no floating decal planes.
  const oldIndex=knob.index!,kuv=knob.getAttribute('uv'),ki:number[]=[],kb=[[],[],[]] as number[][];
  for(const group of knob.groups)for(let i=group.start;i<group.start+group.count;i+=3){
    const ids=[oldIndex.getX(i),oldIndex.getX(i+1),oldIndex.getX(i+2)];
    const v=ids.reduce((sum,id)=>sum+kuv.getY(id),0)/3;
    const material=group.materialIndex===2&&((v*22)%1)<.14?1:group.materialIndex!;
    kb[material].push(...ids);
  }
  knob.clearGroups();kb.forEach((data,m)=>{knob.addGroup(ki.length,data.length,m);for(const index of data)ki.push(index);});knob.setIndex(ki);
  mesh('arched-bridge-knob',knob,[m.porcelain,m.gold,striped],lid);
  for(const x of [-12.8,12.8]){
    const collar=knobFoot(9.5,4.4);collar.translate(x,3.22,0);
    mesh('knob-porcelain-fillet',collar,m.porcelain,lid);
  }
  const sr=p.saucerRadius;
  // IMG_1142/1148/1203: broad near-edge white foot + gold lower shoulder,
  // conical flower wall, thin upper lip, white sloping annulus and low seat ring.
  const sp:ProfilePoint[]=[
    [0,2.25],[sr-13,2.25],[sr-10.8,2.05],[sr-9.7,1.4],[sr-9.4,.45],[sr-9,0],
    [sr-7.4,0],[sr-6.9,.4],[sr-6.6,1.0],
    [sr-5.6,1.35],[sr-4.6,1.75],[sr-4.2,2.35],[sr-4.4,3.1],[sr-4.6,3.5],
    [sr-4.1,4.15],[sr-3.75,4.7],
    [sr-1.15,15.1],[sr-.65,16.3],
    [sr-.05,16.8],[sr,17.25],[sr-.15,17.7],[sr-.65,17.75],
    [sr-1.2,17.3],[sr-2.25,15.5],[sr-4.0,12.7],[sr-6.8,10],[sr-10.3,7.6],[r+8,6.25],
    [r+4,6.05],[r+2.65,6.45],[r+2.0,7.0],[r+1.15,7.08],[r+.4,6.65],[r-.4,6.12],[r-2,6.0],[0,6.0]
  ];
  const sideLength=Math.hypot(2.6,10.4);
  const sg=revolve(sp,320,{
    material:j=>j===15?2:j>=8&&j<=14||j>=16&&j<=20||j>=29&&j<=32?1:j===5?3:0,
    uv:(rr,y,theta)=>[theta/(Math.PI*2)*4,(y-4.7)/10.4],
  });
  sg.userData.surfaceMetrics={width:(sr-2.45)*2*Math.PI/4,length:sideLength,aspect:(sr-2.45)*2*Math.PI/4/sideLength};
  mesh('saucer-bowl-and-continuous-rim',sg,[m.porcelain,m.gold,m.regions.saucer,m.foot],saucer);
  // A glaze-thin print on the recessed underside; no paper, border or QR label.
  for(const [parent,y,name] of [[cup,2.5-h/2,'cup-bottom-mark'],[saucer,2.25,'saucer-bottom-mark']] as const){
    const mark=new Mesh(new PlaneGeometry(20,14),m.mark);mark.name=name;mark.rotation.x=Math.PI/2;mark.position.y=y-.012;parent.add(mark);
  }
  cup.position.set(0,6+h/2,0);lid.position.y=6+h-.6;
  root.updateMatrixWorld(true);
  return {root,cup,lid,saucer,parameters:p,home:{cup:cup.position.clone(),lid:lid.position.clone(),saucer:saucer.position.clone()},dispose(){
    root.traverse(o=>{if(o instanceof Mesh)o.geometry.dispose();});striped.dispose();
  }};
}
export type Product=ReturnType<typeof buildProduct>;
