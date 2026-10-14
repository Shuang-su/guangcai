cat > src/interaction/reference-views.ts <<'EOF'
/** Approximate camera matches, inferred from rim ellipse and visible handle width.
 * No claim of calibrated lens or pixel-perfect pose from unmeasured photos. */
export const references={
  '1197':{label:'1197 · 侧前方整体',part:'all',camera:[155,174,335],target:[7,65,0]},
  '1198':{label:'1198 · 把手正对',part:'all',camera:[360,202,32],target:[9,64,0]},
  '1199':{label:'1199 · 整体高俯视',part:'all',camera:[287,385,50],target:[8,67,0]},
  '1205':{label:'1205 · 整体低机位',part:'all',camera:[80,73,-370],target:[7,70,0]},
  '1206':{label:'1206 · 另一侧整体',part:'all',camera:[170,208,-350],target:[7,65,0]},
  '1163':{label:'1163 · 把手侧面',part:'cup',camera:[100,127,365],target:[12,62,0]},
  '1159':{label:'1159 · 把手宽面',part:'cup',camera:[350,106,1],target:[12,64,0]},
  '1165':{label:'1165 · 杯内',part:'cup',camera:[50,385,130],target:[0,62,0]},
  '1168':{label:'1168 · 杯底浅圈足',part:'cup',camera:[1,-260,80],target:[0,60,0]},
  '1178':{label:'1178 · 盖钮近景',part:'lid',camera:[8,75,170],target:[0,34,0]},
  '1182':{label:'1182 · 杯盖底面',part:'lid',camera:[1,-150,40],target:[0,33,0]},
  '1145':{label:'1145 · 托碟上表面',part:'saucer',camera:[0,300,50],target:[0,6,0]},
  '1148':{label:'1148 · 托碟底圈',part:'saucer',camera:[0,-130,255],target:[0,6,0]},
  '1142':{label:'1142 · 托碟截面',part:'saucer',camera:[0,30,280],target:[0,6,0]},
} as const;
export type ReferenceId=keyof typeof references;
EOF
python3 - <<'PY'
from pathlib import Path
p=Path('src/interaction/views.ts');s=p.read_text();s="import {references,type ReferenceId} from './reference-views';\n"+s
s=s.replace("  bottomClearance(){",'''  reference(id:ReferenceId){
    const pose=references[id];if(!pose)return;
    this.set('hero',true);this.active=false;this.animateCamera=false;this.setAuto(false);
    const p=this.getProduct();p.cup.visible=pose.part==='all'||pose.part==='cup';p.lid.visible=pose.part==='all'||pose.part==='lid';p.saucer.visible=pose.part==='all'||pose.part==='saucer';
    if(pose.part==='lid')p.lid.position.set(0,33,0);
    this.controls.target.fromArray(pose.target);this.studio.camera.position.fromArray(pose.camera);
    this.controls.minDistance=50;this.controls.update();this.onChange();
  }
  bottomClearance(){''');p.write_text(s)
p=Path('src/ui/interface.ts');s=p.read_text();s="import {references,type ReferenceId} from '../interaction/reference-views';\n"+s
s=s.replace(' view:(v:View)=>void;',' reference:(v:ReferenceId)=>void;view:(v:View)=>void;')
s=s.replace('<section><label class="field-label" for="material-mode">','<section><label class="field-label" for="reference-view">照片对应机位</label><select id="reference-view"><option value="">选择参考照片</option>${Object.entries(references).map(([id,p])=>`<option value="${id}">${p.label}</option>`).join(\'\')}</select><p class="note">依据照片透视估计，保留自由旋转。原照片分组与对照图见交付目录。</p></section><section><label class="field-label" for="material-mode">')
s=s.replace("  $('#auto').onclick=actions.auto;","  $<HTMLSelectElement>('#reference-view').onchange=e=>{actions.reference((e.target as HTMLSelectElement).value as ReferenceId);setPanel(false);};\n  $('#auto').onclick=actions.auto;")
s=s.replace('花纸为参考重建；未添加不确定的底款。','花纸为 AI 生成的参考风格重建，非原版花纸。尺寸由照片推定。')
p.write_text(s)
p=Path('src/main.ts');s=p.read_text();s="import type {ReferenceId} from './interaction/reference-views';\n"+s
s=s.replace('  view:v=>view.set(v),','  reference:id=>view.reference(id),view:v=>view.set(v),')
s=s.replace('  setView:(v:View)', '  reference:(id:ReferenceId)=>view.reference(id),\n  setView:(v:View)');p.write_text(s)
PY
node tools/snapshot.mjs