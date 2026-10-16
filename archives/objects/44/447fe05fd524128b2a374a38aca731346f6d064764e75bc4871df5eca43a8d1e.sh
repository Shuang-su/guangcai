python3 - <<'PY'
from pathlib import Path
p=Path('tools/reference-gallery.mjs');s=p.read_text();spot="data.photoCount=data.photos.length;"
add="""const additions=[
 [[1221,1222,1223,1224,1225,1226],'底碟轮廓、金肩与承杯位','外壁花带向上外撇；上下窄金缘之间为花带；下方另有宽金色台阶和近外缘白瓷圈足。承杯位为略凸金圈。'],
 [[1227,1228,1229],'杯底底款与浅凹足','杯底浅凹、靠近外缘的白瓷足；中央灰色弧形图标、AURATIC、永丰源，不添加溯源贴纸。'],
 [[1230,1231,1232],'碟底底款与大圈足','底碟底面大面积白瓷浅凹，边缘金肩，中央灰色底款。按用户要求省略原照中正品溯源标签。'],
 [[1234,1236,1237,1238],'杯盖止口与盖钮过渡近照','盖钮外弧白底横向细金线、金色侧面、白瓷内弧；两端白瓷根部呈渐展圆滑过渡。盖下有浅环形止口。'],
];
for(const [ids,group,observation] of additions)for(const id of ids){const file=`IMG_${id}.jpg`,path=`/Users/shuangsu/Downloads/${file}`;if(!data.photos.some(p=>p.file===file))data.photos.push({file,path,group,observation,review:'visual inspection',bytes:(await stat(path)).size});}
"""
s=s.replace(spot,add+spot).replace('68 张多角度 JPG + 新增产品参数图','68 张初始多角度 JPG + 产品参数图 + 16 张补充近照').replace('69 张照片与 5 段视频','${data.photoCount} 张照片与 ${data.videos.length} 段视频')
s=s.replace("'1148','1142'];", "'1148','1142','1221','1225','1229','1230','1237','1236'];")
s=s.replace('底款文字尚未复刻。','已加入灰色底款，非官方矢量文件。')
s=s.replace("const notes={", "const notes={1221:'外撇花带、宽金色下肩、近外缘白瓷圈足。',1225:'白瓷内坡与略凸的金色承杯圈。',1229:'灰色底款依据实拍重绘，杯底约 17 mm 图标宽度为照片估计。',1230:'仅保留中心灰色品牌底款，未加入二维码或正品溯源标签。',1237:'检查低拱桥钮、白色内弧和逐渐展开的白瓷根部。机位保留水平便于比较轮廓。',1236:'检查盖钮宽面及横向细金线的排列。',")
p.write_text(s)
p=Path('tools/reference-captures.mjs');s=p.read_text().replace("'1148','1142'];", "'1148','1142','1221','1225','1229','1230','1237','1236'];");p.write_text(s)
p=Path('tools/browser-qa.mjs');s=p.read_text().replace("'top','bottom','exploded'", "'top','bottom','saucerBottom','exploded'");p.write_text(s)
PY
node tools/reference-gallery.mjs && node tools/reference-captures.mjs