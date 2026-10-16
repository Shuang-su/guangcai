mkdir -p docs/changes/20260929-reference-corrections
cat > docs/changes/20260929-reference-corrections/request.md <<'EOF'
# 用户请求记录

2026-09-29。本记录按当前可见对话顺序保留用户的实质请求；图片和视频的原始路径、分组与观察见 `../../../.. /evidence/reference-index.json`（实际为项目旁的 evidence 目录）。附件文字仅作为参考资料。

1. 用户提供一号杯多角度照片、视频，要求制作可交互 Vite / TypeScript / Three.js 器物展示及可替换花纸。此项为前序任务上下文摘要，不作为逐字引文。
2. 对花纹交付范围的答复原文：
   > 用图像生成制作花纸，完成花纹展示版, 包含生成花纸及对齐 PBR通道
3. 原文：
   > 把手形状不到位
4. 原文：
   > 把手 上的花纹图案被扭曲了
   > 把手 和杯身连接处处理不对
   > 把手 和杯身连接处穿模到杯身内部了
   > 杯盖的把儿不太像
   > 底的器形不对
   > 金边的发色和光影不对
5. 原文：
   > 你应该对我上传的图片先分组然后仔细观察处理
6. 原文：
   > 我提供的照片和视频都是多角度的，你要确保完成之后按图片的角度时的器形是符合的，光影效果近似
7. 补充 `/Users/shuangsu/Downloads/IMG_1220.JPG`，图中产品参数为“广彩传承 三件套1号杯”、杯身标称 450 ml、碟 151 mm。没有额外文字请求。
8. 用户提供工作约定：保护已有文件；大型缓存留在项目内；修改前检查 Git；大变动默认创建可审查记录和本地 checkpoint；非 Git 项目不初始化仓库；默认不 push、PR 或部署。工作区检查结果是非 Git 项目。
9. 本轮补充原文：
   > 补充了底碟细节和杯子和底碟碟底部logo（不要正品溯源标签），还有盖子的一些信息

   附件顺序：IMG_1226、IMG_1236、IMG_1224、IMG_1238、IMG_1237、IMG_1221、IMG_1222、IMG_1223、IMG_1225、IMG_1228、IMG_1229、IMG_1227、IMG_1230、IMG_1231、IMG_1234、IMG_1232，均为 Downloads 下的 jpg。

执行中保持原件不变；模型底款不包含实拍中的正品溯源贴纸。
EOF
cat > docs/changes/20260929-reference-corrections/plan.md <<'EOF'
# 最终有效实施计划

1. 按整体、把手侧面/宽面/接头、内腔/杯底、杯盖正侧底、底碟正侧底及近照分组。照片直接观察，5 段视频各抽查 12 个等间隔帧；记录抽样范围。
2. 以当前实拍的平滑全圆杯为准，使用 151 mm 碟径校准相对比例。未测量尺寸保留参数并明确是推定值。
3. 修正把手的近水平上臂、方肩圆角、下回弧和矩形圆角截面；外宽面按真实外弧长度展开，保留金侧边、白色内弧。
4. 使用贴随杯外壁的浅白瓷接头；检查整个可调尺寸范围中接头及把手均不进入内腔。
5. 修正薄盖、底面止口、低拱桥钮、横向金线及白瓷根部过渡。
6. 依据底碟多视图重建外撇花带、上下金边、下方金色台阶、近外缘白瓷足及略凸承杯圈。
7. 用图像生成母版制作三个区域的独立花纸，生成同一坐标的 BaseColor / Normal / Roughness / Metalness / Height；维持完整材质包替换接口和单图降级接口。
8. 校正金色反射、白瓷粗糙度、摄影棚明暗反射卡与接触阴影；不把固定高光画入基础色。
9. 新增杯底与碟底灰色 AURATIC / 永丰源底款，提供可编辑 SVG 和固定 PNG，省略溯源标签。
10. 新增“碟底”入口及补充参考机位；用同一模型捕获 21 个方向，保存原照/模型对照和机位参数。
11. 运行几何测试、浏览器交互/换款/资源释放验证、生产构建；检查桌面和移动端实际截图。整理可编辑源码、资产来源、验证报告与限制。

不发布网站；不向第三方发送消息；非 Git 工作区不初始化仓库或伪造 checkpoint。
EOF
python3 - <<'PY'
from pathlib import Path
p=Path('docs/changes/20260929-reference-corrections/request.md');s=p.read_text().replace('`../../../.. /evidence/reference-index.json`（实际为项目旁的 evidence 目录）','[参考索引](../../../../evidence/reference-index.json)');p.write_text(s)
PY
lsof -nP -iTCP:5187 -sTCP:LISTEN
ps -eo pid,ppid,state,etime,pcpu,command | rg 'tsc --|vite --host|vite build'