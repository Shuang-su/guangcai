mkdir -p public/marks
cat > public/marks/auratic-reference.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="448" viewBox="0 0 640 448">
  <title>AURATIC 永丰源 底款参考重绘</title>
  <desc>依据用户 IMG_1229、IMG_1232 重新绘制；非官方矢量文件，不含正品溯源标签。</desc>
  <g fill="#72746f">
    <path d="M64 76 C160 158 480 158 576 76 C583 70 590 78 585 88 C490 184 156 184 58 88 C50 78 57 70 64 76Z"/>
    <path d="M239 191 C266 197 358 194 386 199 C399 202 400 218 386 224 C355 227 272 226 253 215 C242 209 233 199 239 191Z"/>
    <text x="324" y="291" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" letter-spacing="7">AURATIC</text>
    <text x="329" y="365" text-anchor="middle" font-family="Songti SC, STSong, serif" font-size="66" letter-spacing="18">永丰源</text>
  </g>
</svg>
EOF
node --input-type=module -e 'import sharp from "sharp"; await sharp("public/marks/auratic-reference.svg",{density:192}).png().toFile("public/marks/auratic-reference.png");'
python3 - <<'PY'
from pathlib import Path
p=Path('src/interaction/views.ts');s=p.read_text().replace("bottom:'杯底',exploded", "bottom:'杯底',saucerBottom:'碟底',exploded")
s=s.replace("if(view==='lid'){", "if(view==='saucerBottom'){\n      p.cup.visible=false;p.lid.visible=false;pos=[0,-290,50];this.toTarget.set(0,5,0);\n    }\n    if(view==='lid'){")
p.write_text(s)
p=Path('src/interaction/reference-views.ts');s=p.read_text().replace("  '1220':", "  '1221':{label:'1221 · 底碟外撇与下肩',part:'saucer',camera:[0,12,405],target:[0,8,0]},\n  '1225':{label:'1225 · 承杯金圈',part:'saucer',camera:[0,145,270],target:[0,7,0]},\n  '1229':{label:'1229 · 杯底灰色底款',part:'cup',camera:[0,-290,20],target:[0,45,0]},\n  '1230':{label:'1230 · 碟底与底款',part:'saucer',camera:[0,-310,30],target:[0,4,0]},\n  '1237':{label:'1237 · 盖钮与白瓷过渡',part:'lid',camera:[30,43,210],target:[0,36,0]},\n  '1236':{label:'1236 · 盖钮宽面',part:'lid',camera:[210,44,0],target:[0,36,0]},\n  '1220':")
p.write_text(s)
p=Path('src/ui/interface.ts');s=p.read_text().replace('尺寸由照片推定。','碟径 151 mm 来自产品参数，其余尺寸由照片推定。').replace('按照片比例推定，非实测。更多结构参数见源码。','杯身尺寸按照片比例推定，非实测。底碟直径 151 mm 来自产品参数。');p.write_text(s)
p=Path('src/ui/styles.css');s=p.read_text().replace('grid-template-columns:repeat(4,1fr);width:100%', 'grid-template-columns:repeat(3,1fr);width:100%').replace('.gesture-hint{bottom:112px;', '.gesture-hint{bottom:151px;').replace('.open-settings{bottom:127px;', '.open-settings{bottom:167px;').replace('#status{bottom:167px;', '#status{bottom:203px;');p.write_text(s)
PY
npm test && npm run build