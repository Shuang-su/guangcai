import { CatmullRomCurve3, Float32BufferAttribute, Group, Mesh, MeshPhysicalMaterial, PlaneGeometry, Vector3, type Material } from 'three';
import { arc, revolve, type ProfilePoint } from './surface';
import { ribbon } from './ribbon';
import { handlePath, handleRails, handleCollar, knobFoot } from './handle';
import { defaults, validateDimensions, type Dimensions } from './parameters';
import type { Materials } from '../materials/materials';
import fixedLayout from '../styles/fixed-layout.json';

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
  // Crop only the floral material. Keep the reserved 60-degree sector and city UV1
  // intact so the buildings and lettering cannot move when this band is narrowed.
  const visibleBandSegments=Math.round(bandSegments*(.5+fixedLayout.body.visibleEndFraction));
  const body=mesh('cup-wall-and-recessed-foot',revolve(profile,n,{
    start:-actualBand/2,
    material:(j,i)=>j>=6&&j<=10?(i<bandSegments?(j>=9&&i<visibleBandSegments?1:0):3):j===5?2:0,
    uv:(_rr,y,theta)=>[(theta+actualBand/2)/actualBand,(y-3)/(h-5.3)],
  }),[m.porcelain,m.regions.body,m.foot,m.city],cup,-h/2);
  body.userData={circleRadius:r,bandRadians:actualBand,visibleBandRadians:visibleBandSegments/n*2*Math.PI,wallThickness:w};
  // A second UV set maps ONLY the white exterior, with upright non-mirrored text.
  const cityUv:number[]=[];
  for(let i=0;i<=n;i++)for(const [,y] of profile)cityUv.push((n-i)/(n-bandSegments),(y-.12)/(h-2.42));
  body.geometry.setAttribute('uv1',new Float32BufferAttribute(cityUv,2));
  const bodyUV=body.geometry.getAttribute('uv'),sourceBodyUV=[];
  for(let i=0;i<bodyUV.count;i++)sourceBodyUV.push(bodyUV.getX(i)/(.5+fixedLayout.body.visibleEndFraction),bodyUV.getY(i));
  body.geometry.setAttribute('uv2',new Float32BufferAttribute(sourceBodyUV,2));
  const {path,upper,lower}=handlePath(p);
  mesh('wide-ribbon-handle',ribbon(path,p.handleWidth,p.handleThickness,192,true,handleRails(p)),[m.porcelain,m.gold,m.regions.handle],cup,-h/2);
  for(const y of[upper,lower])mesh('porcelain-handle-root',handleCollar(r,p.handleWidth,p.handleThickness,y===upper?2.5:0),m.porcelain,cup,y-h/2);
  const handleMesh=cup.getObjectByName('wide-ribbon-handle') as Mesh;
  handleMesh.geometry.setAttribute('uv2',handleMesh.geometry.getAttribute('uv').clone());
  const lr=r+p.lidOverhang;
  // 3.0 single-cup references: planar central glaze; rolled edge and underside seat retained.
  const lidProfile:ProfilePoint[]=[[0,-1.3],[r-7,-1.3],[r-5,-1.5],[r-4.5,-3.3],[r-3.8,-3.7],[r-3,-3.45],[r-2.7,-1.0],[lr-1,-.35],[lr,-.1],[lr+.3,.6],[lr,1.35],[lr-1,1.65],[r-2,1.9],[r-10,1.9],[14,1.9],[0,1.9]];
  const lidPlate=mesh('lid-double-sided-with-seat',revolve(lidProfile,240,{material:j=>j>=8&&j<=10?1:0}),[m.porcelain,m.gold],lid);
  lidPlate.userData.topHeight=1.9;
  const knobPath=new CatmullRomCurve3(Array.from({length:81},(_,i)=>{
    const a=Math.PI-i/80*Math.PI;return new Vector3(Math.cos(a)*12.8,1.95+Math.sin(a)*11.7,0);
  }));
  const knob=ribbon(knobPath,10.5,4.4,440);
  const striped=m.porcelain.clone();striped.name='knob-striped-porcelain';
  // Stripes belong to the bridge surface itself; no floating decal planes.
  const oldIndex=knob.index!,kuv=knob.getAttribute('uv'),ki:number[]=[],kb=[[],[],[]] as number[][];
  for(const group of knob.groups)for(let i=group.start;i<group.start+group.count;i+=3){
    const ids=[oldIndex.getX(i),oldIndex.getX(i+1),oldIndex.getX(i+2)];
    const v=ids.reduce((sum,id)=>sum+kuv.getY(id),0)/3;
    const atPorcelainRoot=ids.reduce((sum,id)=>sum+knob.getAttribute('position').getY(id),0)/3<3.50;
    const material=atPorcelainRoot?0:group.materialIndex===2&&((v*22)%1)<.14?1:group.materialIndex!;
    kb[material].push(...ids);
  }
  knob.clearGroups();kb.forEach((data,m)=>{knob.addGroup(ki.length,data.length,m);for(const index of data)ki.push(index);});knob.setIndex(ki);
  mesh('arched-bridge-knob',knob,[m.porcelain,m.gold,striped],lid);
  for(const x of [-12.8,12.8]){
    const collar=knobFoot(10.5,4.4);collar.translate(x,1.87,0);
    mesh('knob-porcelain-fillet',collar,m.porcelain,lid);
  }
  const sr=p.saucerRadius;
  // IMG_1221 annotated correction + IMG_1148: 125 mm white foot, recessed gold shoulder,
  // more outward-flared flower wall, thin upper lip, white sloping annulus and low seat ring.
  const sp:ProfilePoint[]=[
    [0,2.25],[sr-19,2.25],[sr-15.3,2.05],[sr-14.3,1.4],[sr-14.3,.45],[sr-14.1,0],
    [sr-12.8,0],[sr-12.45,.4],[sr-12.4,1.0],
    [sr-12.2,1.6],[sr-11.3,2.7],[sr-10.1,3.7],[sr-8.5,4.0],[sr-5.9,4.15],
    [sr-5.1,4.8],[sr-5.3,5.9],
    [sr-1.3,16.3],[sr-.65,16.7],
    [sr-.15,16.95],[sr,17.35],[sr-.15,17.9],[sr-.65,18.0],
    [sr-1.2,17.5],[sr-2.2,15.5],[sr-3.6,13.4],[sr-6.8,9.3],[sr-11.2,7.5],[r+8,6.25],
    [r+4,6.05],[r+2.65,6.45],[r+2.0,7.0],[r+1.15,7.08],[r+.4,6.65],[r-.4,6.12],[r-2,6.0],[0,6.0]
  ];
  const sideLength=Math.hypot(4.0,10.4);
  const sg=revolve(sp,320,{
    material:j=>j===15?2:j>=8&&j<=14||j>=16&&j<=20||j>=29&&j<=32?1:j===5?3:0,
    // A smooth periodic phase adjustment aligns the two observed faces independently.
    // It stays monotonic and closes over 360 degrees; every PBR channel shares this UV.
    uv:(_rr,y,theta)=>[theta/(Math.PI*2)*4+fixedLayout.saucer.phaseBalance*Math.sin(theta),(y-5.9)/10.4],
  });
  sg.userData.surfaceMetrics={width:(sr-3.3)*2*Math.PI/4,length:sideLength,aspect:(sr-3.3)*2*Math.PI/4/sideLength};
  sg.userData.profile=sp;
  const sourceSaucerUV:number[]=[];
  for(let i=0;i<=320;i++)for(const [,y]of sp)sourceSaucerUV.push(i/320,(y-5.9)/10.4);
  sg.setAttribute('uv2',new Float32BufferAttribute(sourceSaucerUV,2));
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
