cat > tools/overlay-report.mjs <<'EOF'
import {readFile,writeFile} from 'node:fs/promises';
const notes={1221:'侧缘：上金口沿、外撇花带、内收金肩及较窄白瓷足。比修改前收掉了底部凸鼓；口沿和底足仍可见小范围错位。',1220:'整体：用碟外径和盖缘椭圆校准构图，再检查同一模型的杯身、把手和盖钮。把手局部及碟后缘仍有轻微重影。',1230:'碟底：检查圈足相对外径及灰色底款。照片中的溯源贴纸保留在参考背景；纯模型里没有贴纸。'};
let html=`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>实拍叠图 · 校准记录</title><style>body{font:16px/1.65 system-ui;color:#292a26;background:#f2f0ec;max-width:1300px;margin:35px auto;padding:0 24px}h1,h2{font-weight:550}a{color:#765d20}section{margin:42px 0}img{display:block;width:100%;height:auto;background:#ddd}.pair{display:grid;grid-template-columns:1fr 1fr;gap:18px}figure{margin:0}figcaption{margin:8px 0}p{max-width:1080px}.preview{position:relative;aspect-ratio:2.3;overflow:hidden}.preview img{position:absolute;width:100%;top:-64%}table{border-collapse:collapse}td,th{border-bottom:1px solid #cbc7be;padding:8px 16px;text-align:left}button,select{font:inherit;padding:6px 10px}@media(max-width:650px){.pair{grid-template-columns:1fr}}</style><h1>实拍叠图 · 校准记录</h1><p><a href="http://127.0.0.1:5187/compare.html">打开可调机位与透明度的实时叠图</a> · <a href="../reference-index.html">85 张照片分组</a> · <a href="../comparison.html">22 个观察方向</a> · <a href="../saucer-correction/profile.svg">修改前后剖面</a></p><p>3 组图使用同一份三维器型。以手工选取的轮廓标记点拟合透视相机，调整俯仰、滚转、距离、视角及画面中心；未对照片或渲染做非等比拉伸。下图为 50% 模型覆盖实拍。</p><p>标记点有人工误差，镜头畸变及实物尺寸没有实测；所列 RMS 仅说明这些标记点的拟合残差，不代表完整轮廓或整件产品已精确复原。金彩高光与办公室实拍仍存在差异，生成花纸也不是原厂逐笔复刻。</p>`;
for(const id of ['1221','1220','1230']){
 const f=JSON.parse(await readFile(id==='1221'?'../evidence/saucer-correction/calibration-fit.json':`../evidence/overlays/${id}-fit.json`,'utf8'));
 html+=`<section><h2>IMG_${id}</h2><p>${notes[id]}</p><p>选取 ${f.landmarks.length} 个标记点；${f.photoSize.join(' × ')} 像素画幅；RMS ${f.rmsPx.toFixed(1)} px。<a href="${id}-camera.json">保存的相机参数</a> · <a href="${id==='1221'?'../saucer-correction/calibration-fit.json':id+'-fit.json'}">标记点与逐点误差</a></p>`;
 if(id==='1221')html+=`<figure class="preview"><img src="${id}-pbr.png"></figure><p>上方仅通过页面裁窗放大关注区域；<a href="${id}-pbr.png">查看完整叠图</a>。</p>`;
 html+=`<div class="pair"><figure><img loading="lazy" src="${id}-pbr.png"><figcaption>50% 材质叠图：能看到色彩／高光及轮廓差异</figcaption></figure><figure><img loading="lazy" src="${id}-model.png"><figcaption>同一相机 · 纯模型：确认器型和模型底款</figcaption></figure></div><p><a href="${id}-silhouette.png">青色轮廓叠图</a> · <a href="${id}-rings.png">交界线叠图</a></p></section>`;
}
await writeFile('../evidence/overlays/index.html',html+'</html>');console.log('Overlay report saved');
EOF
python3 - <<'PY'
from pathlib import Path
p=Path('tools/reference-gallery.mjs');s=p.read_text().replace("await sharp(p.path).rotate().resize", "try{await stat(`${dir}/${p.preview}`);continue;}catch{}await sharp(p.path).rotate().resize")
s=s.replace('<p><a href="saucer-correction/profile.svg">','<p><a href="overlays/index.html">3 组精调机位透明叠图</a> · <a href="saucer-correction/profile.svg">');p.write_text(s)
PY
node tools/reference-gallery.mjs && node tools/overlay-report.mjs