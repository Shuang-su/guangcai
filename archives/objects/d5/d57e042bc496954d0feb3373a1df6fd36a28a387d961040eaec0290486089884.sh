cat > tools/reference-gallery.mjs <<'EOF'
import sharp from 'sharp';
import {readFile,writeFile,mkdir,stat} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const dir='../evidence',data=JSON.parse(await readFile(`${dir}/reference-index.json`,'utf8'));
if(!data.photos.some(p=>p.file==='IMG_1220.JPG'))data.photos.push({file:'IMG_1220.JPG',path:'/Users/shuangsu/Downloads/IMG_1220.JPG',group:'产品参数与侧面比例',observation:'产品图明确标注托碟 151 mm、杯身 450 ml；其余尺寸仍由照片比例推定。',review:'visual inspection',bytes:(await stat('/Users/shuangsu/Downloads/IMG_1220.JPG')).size});
data.photoCount=data.photos.length;data.note='68 张多角度 JPG + 新增产品参数图；同名 HEIC 不重复计数。托碟直径 151 mm、杯身标称容量 450 ml 来自 IMG_1220；其他尺寸为照片估计。原始文件未修改。';
await mkdir(`${dir}/reference-previews`,{recursive:true});
for(const p of data.photos){p.preview=`reference-previews/${p.file.replace(/\.jpe?g$/i,'.jpg')}`;await sharp(p.path).rotate().resize({width:640,withoutEnlargement:true}).jpeg({quality:82}).toFile(`${dir}/${p.preview}`);}
await writeFile(`${dir}/reference-index.json`,JSON.stringify(data,null,2));
const css=`body{font:16px system-ui;background:#efeeeb;color:#252525;margin:30px auto;padding:0 20px;max-width:1450px;line-height:1.6}h1,h2{font-weight:500}section{margin:48px 0}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px}figure{margin:0}img{width:100%;height:310px;object-fit:contain;background:#dedbd5}figcaption{padding:8px}a{color:#624715}p{max-width:1050px}.pair{display:grid;grid-template-columns:1fr 1fr;gap:16px}.pair img{height:auto;max-height:780px}.bar{position:sticky;top:0;background:#efeeebee;padding:12px 0;backdrop-filter:blur(12px)}button,select{font:inherit;padding:8px 16px;margin-right:8px}`;
let html=`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>一号杯 · 参考分组</title><style>${css}</style><h1>一号杯 · 69 张照片与 5 段视频</h1><p>${data.note}</p><p>缩略图随交付保存；点击照片打开原件，原件所在磁盘须在线。<a href="comparison.html">打开逐角度对照</a></p>`;
for(const group of new Set(data.photos.map(p=>p.group))){const photos=data.photos.filter(p=>p.group===group);html+=`<section><h2>${group} · ${photos.length}</h2><p>${photos[0].observation}</p><div class="grid">${photos.map(p=>`<figure><a href="${pathToFileURL(p.path)}"><img loading="lazy" src="${p.preview}"></a><figcaption>${p.file}</figcaption></figure>`).join('')}</div></section>`;}
for(const v of data.videos){html+=`<section><h2>${v.file} · ${v.subject??v.observation??''}</h2><p>12 个等间隔抽帧，从左到右、从上到下。抽帧覆盖转动过程，不代表逐帧审阅。</p><img style="height:auto" src="video-${v.file.match(/\d+/)[0]}-samples.jpg"></section>`;}
await writeFile(`${dir}/reference-index.html`,html+'</html>');
const ids=['1220','1197','1198','1199','1205','1206','1163','1159','1165','1168','1178','1182','1145','1148','1142'];
const notes={1220:'以 151 mm 托碟为标尺校准相对尺寸。杯身直径 86 mm、高度参数 103 mm 是推定值；相机透视、留白与产品图未作像素级标定。',1163:'检查上臂近水平、圆角方肩、下半段连续回弧，以及白瓷接头。实拍手持器物有倾斜，本视图保留竖直便于检查。',1159:'检查把手宽面、两侧金边和外弧展开；花纸为参考风格生成稿，图案不是原厂一比一复刻。',1165:'检查薄杯口、内腔以及根部所在高度的内壁连续性。',1168:'检查浅凹底与靠近外缘的白瓷圈足。底款文字尚未复刻。',1178:'检查低拱桥钮、白底横向细金线、金色侧边与根部白瓷过渡。',1182:'检查杯盖底面的环形止口及连续圆形轮廓。',1145:'检查外高内低的白瓷环带及低矮金色承杯位。',1148:'从倒置侧面检查大圈足、宽金色下肩、斜花带及薄金色口沿。',1142:'从低角度检查花带高度和底圈结构；实拍透视与手持倾角仅作近似匹配。'};
let comparison=`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>一号杯 · 多角度对照</title><style>${css}</style><h1>一号杯 · 多角度对照</h1><p>左为用户原始照片的缩略图，右为同一模型的参考方向渲染。相机按透视估计，未消除手持旋转与镜头差异；画面构图不作像素一致声明。渲染统一使用可转动观察的摄影棚反射，未复刻办公室全部环境。<a href="reference-index.html">完整分组索引</a> · <a href="http://127.0.0.1:5187/">打开三维观察器</a></p><div class="bar"><label>跳转照片 <select id="jump">${ids.map(id=>`<option>${id}</option>`).join('')}</select></label></div>`;
for(const id of ids){comparison+=`<section id="ref-${id}"><h2>IMG_${id} · ${id==='1220'?'比例标尺':'多角度器型'}</h2><p>${notes[id]??'检查同一几何在另一观察方向上的杯身、把手、盖钮和托碟比例。'}</p><div class="pair"><figure><img loading="lazy" src="reference-previews/IMG_${id}.jpg"><figcaption>参考实拍 / 产品图</figcaption></figure><figure><img loading="lazy" src="matched-views/${id}.png"><figcaption>当前模型 · 推定机位</figcaption></figure></div></section>`;}
comparison+=`<script>document.getElementById('jump').onchange=e=>document.getElementById('ref-'+e.target.value).scrollIntoView({behavior:'smooth'});</script></html>`;
await writeFile(`${dir}/comparison.html`,comparison);
console.log(`Indexed ${data.photoCount} photos and ${data.videos.length} videos; ${ids.length} comparisons.`);
EOF
node tools/reference-gallery.mjs