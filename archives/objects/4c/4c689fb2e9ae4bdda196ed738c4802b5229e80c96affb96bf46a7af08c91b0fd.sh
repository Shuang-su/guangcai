python3 - <<'PY'
from pathlib import Path
import json,html
root=Path('/Volumes/Prism_初号機/广彩/一号杯');out=Path('outputs/evidence');out.mkdir(exist_ok=True)
groups=[('托碟上表面与承杯位',[1135,1144,1145,1149,1151,1152],'中央承杯位约占外径六成；白瓷环带内低外高，内圈金线略凸。'),('托碟底圈与侧壁',[1136,1137,1139,1140,1141,1142,1146,1147,1148,1150],'大直径底圈接近外缘，外斜壁有花带，下沿有宽金色台阶；不能使用小底圈浅碗截面。'),('杯身与把手轮廓',[1154,1155,1156,1158,1162,1163],'上臂接近水平、上肩小圆角，外臂转入下部连续回弧；截面为宽扁带，侧金面有圆润起伏。'),('把手花纹与根部',[1157,1159,1160],'外面是连续窄幅花纸，尺寸沿外侧弧长展开；白瓷根部为薄而外扩的圆角过渡，不能穿入杯内。'),('杯口、内壁与杯底',[1161,1164,1165,1166,1167,1168,1169,1170],'内壁连续光滑；杯底近外缘浅圈足，中心浅凹；没有高底座。'),('盖钮与盖面',[1172,1173,1174,1175,1176,1177,1178,1186],'较宽的低拱桥钮，侧面宽金带，外弧白底细金条，根部有柔和白瓷过渡。'),('杯盖底面与止口',[1179,1180,1181,1182,1183,1184,1185,1187],'近乎平盖，边缘金圈，底部独立一圈内嵌止口；保持盖板与止口厚度。'),('整套多角度与反光',list(range(1189,1207)),'侧面、俯视、仰视同时约束器形；金面存在明亮黄白反射与深色环境条带，不能做成均匀棕黄漆。'),('釉彩微表面',[1208],'花瓣与线条有微弱釉上起伏；金地反射不能烘焙在彩色花纸中。')]
records=[];sections=[]
for title,ids,note in groups:
 cards=[]
 for n in ids:
  p=root/f'IMG_{n}.jpg';assert p.is_file();records.append({'file':p.name,'path':str(p),'group':title,'observation':note,'review':'visual inspection','bytes':p.stat().st_size})
  cards.append(f'<figure><a href="{p.as_uri()}"><img loading="lazy" src="{p.as_uri()}"></a><figcaption>{p.name}</figcaption></figure>')
 sections.append(f'<section><h2>{title} · {len(ids)}</h2><p>{note}</p><div class="grid">'+''.join(cards)+'</div></section>')
actual={p.name for p in root.glob('IMG_*.jpg')};assert {r['file'] for r in records}==actual and len(records)==68
(out/'reference-index.json').write_text(json.dumps({'source':str(root),'photoCount':len(records),'note':'JPG是查看代表，同名HEIC不重复计数；原始文件未修改。数值尺寸为照片估计，不是测量值。','photos':records},ensure_ascii=False,indent=2))
(out/'reference-index.html').write_text('<!doctype html><meta charset="utf-8"><title>一号杯 · 参考分组</title><style>body{font:16px system-ui;background:#efeeeb;color:#222;margin:40px;max-width:1500px}h1{font-weight:500}section{margin:50px 0}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:16px}figure{margin:0}img{width:100%;height:320px;object-fit:contain;background:#dedbd5}figcaption{padding:8px}p{max-width:1000px;line-height:1.7}</style><h1>一号杯 · 68 张照片参考索引</h1><p>按观察目标分为九组。点击图片打开原件。同名 HEIC 不重复计数；原始照片保持不变。图片从原磁盘读取，磁盘须在线。</p>'+''.join(sections))
print('Indexed',len(records),'photographs in',len(groups),'groups')
PY