/** Approximate camera matches, inferred from rim ellipse and visible handle width.
 * No claim of calibrated lens or pixel-perfect pose from unmeasured photos. */
export const references={
  '1221-detail':{label:'1221 · 侧缘轮廓放大',part:'saucer',camera:[69,9.5,82],target:[69,9,0],detail:true},
  '1221':{label:'1221 · 底碟外撇与下肩',part:'saucer',camera:[0,12,405],target:[0,8,0]},
  '1225':{label:'1225 · 承杯金圈',part:'saucer',camera:[0,145,270],target:[0,7,0]},
  '1229':{label:'1229 · 杯底灰色底款',part:'cup',camera:[0,-290,20],target:[0,45,0]},
  '1230':{label:'1230 · 碟底与底款',part:'saucer',camera:[0,-310,30],target:[0,4,0]},
  '1237':{label:'1237 · 盖钮与白瓷过渡',part:'lid',camera:[30,43,210],target:[0,36,0]},
  '1236':{label:'1236 · 盖钮宽面',part:'lid',camera:[210,44,0],target:[0,36,0]},
  '1220':{label:'1220 · 产品侧面比例',part:'all',camera:[-8,139,465],target:[13,57,0]},
  '1197':{label:'1197 · 侧前方整体',part:'all',camera:[155,174,335],target:[7,65,0]},
  '1198':{label:'1198 · 把手正对',part:'all',camera:[360,202,32],target:[9,64,0]},
  '1199':{label:'1199 · 整体高俯视',part:'all',camera:[287,385,50],target:[8,67,0]},
  '1205':{label:'1205 · 整体低机位',part:'all',camera:[80,73,-370],target:[7,70,0]},
  '1206':{label:'1206 · 另一侧整体',part:'all',camera:[170,208,-350],target:[7,65,0]},
  '1163':{label:'1163 · 把手侧面',part:'cup',camera:[100,127,365],target:[12,62,0]},
  '1159':{label:'1159 · 把手宽面',part:'cup',camera:[350,106,1],target:[12,64,0]},
  '1165':{label:'1165 · 杯内',part:'cup',camera:[50,385,130],target:[0,62,0]},
  '1168':{label:'1168 · 杯底浅圈足',part:'cup',camera:[1,-260,80],target:[0,60,0]},
  '1178':{label:'1178 · 盖钮近景',part:'lid',camera:[8,88,215],target:[0,34,0]},
  '1182':{label:'1182 · 杯盖底面',part:'lid',camera:[1,-150,40],target:[0,33,0]},
  '1145':{label:'1145 · 托碟上表面',part:'saucer',camera:[0,300,50],target:[0,6,0]},
  '1148':{label:'1148 · 托碟底圈',part:'saucer',camera:[0,-55,405],target:[0,6,0]},
  '1142':{label:'1142 · 托碟截面',part:'saucer',camera:[0,-75,405],target:[0,6,0]},
} as const;
export type ReferenceId=keyof typeof references;
