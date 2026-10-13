# 广彩 · 一号杯三维观察器

> 当前开发：本目录是 Shuang-su/guangcai Git 仓库的一部分，依赖用本目录 `npm ci` 安装。分支、提交、PR、版本及发布流程以[仓库 README](../README.md)为准；以下保留产品说明与操作文档。

可编辑的 Vite + TypeScript + Three.js 本地项目，包含杯、盖、碟、生成花纸、PBR 数据贴图、底款和多角度检查工具。

## 启动

需要 Node.js 22.12+（本机验证使用 26.3.0）和支持 WebGL 2 的浏览器。

```sh
npm ci --cache .codex-work/cache/npm
npm run dev -- --port 5187
```

打开终端给出的本地地址。不要直接双击 `index.html`。本项目不依赖外网贴图、字体或运行时服务。

```sh
npm test
npm run build
npm run preview -- --port 5197
npm run qa
```

`npm run qa` 默认访问 5187，使用本机 Chrome；可设置 `QA_URL=http://127.0.0.1:5197/` 验证构建产物。`dist/` 是构建结果，继续修改请保留 `src/`、`assets/`、`public/`、`tools/` 和锁文件。

## 观察与操作

- 拖拽旋转，滚轮或双指缩放；“自动旋转”“复位”，键盘 R 复位。
- 整体、正面、把手、俯视、杯底、碟底、拆解、杯盖、花纹细看，共 9 个入口。
- 材质面板可切换素瓷、灰模、法线、金属区，彩绘微浮雕固定 1.5、摄影棚亮度固定 1.08；也可选择 22 个参考方向。
- “杯底”“碟底”查看灰色 AURATIC／永丰源标记。只重建底款，模型没有正品溯源贴纸、序列号或二维码。
- “上传一张图片”会按装饰区等比裁切并清除旧法线、粗糙度和金属图；“完整材质包”一次替换所有对齐通道。

## 透明叠图验收

打开观察器的“材质与图案 → 打开实拍叠图校准”，或访问 `/compare.html`。提供 IMG_1221 碟侧缘、IMG_1220 整体和 IMG_1230 碟底三组已保存机位。

- 独立调整俯仰、方位、滚转、距离、视角和取景中心；照片保持原比例。
- 透明度 0–100%，实拍／模型／重叠快捷切换；灰模、青色轮廓、关键交界线辅助检查。
- 修改的机位按照片保存在本浏览器，可恢复默认；PNG 和 JSON 导出可复查。
- 默认机位来自人工标记点与透视相机拟合，仅改变相机，没有拉伸模型或扭曲照片来对齐。误差统计仅针对选定标记点，不能替代完整轮廓或实物测量验收。
- [叠图与标记点记录](../evidence/overlays/index.html) 包含重叠、纯模型图及相机参数。原照片中的溯源贴纸只会出现在实拍背景，纯模型没有贴纸。

## 结构与参考

| 内容 | 位置 |
|---|---|
| 器型参数 | `src/geometry/parameters.ts` |
| 杯、盖、碟剖面与装配 | `src/geometry/product.ts` |
| 把手轮廓与白瓷接头 | `src/geometry/handle.ts` |
| 带状截面与弧长 UV | `src/geometry/ribbon.ts` |
| 金彩、白瓷、花纸材质 | `src/materials/materials.ts` |
| 摄影棚反射与接触阴影 | `src/studio/` |
| 参考机位 | `src/interaction/reference-views.ts` |
| 样式接口与导入 | `src/styles/style-manager.ts` |
| 原始 AI 花纸及提示词 | `assets/masters/`、`assets/prompts.json` |
| 可直接导入的材质包 | `public/artwork/` |
| 可编辑底款 SVG 与跨平台 PNG | `public/marks/` |

[完整照片分组](../evidence/reference-index.html) 收录 87 张照片和 5 段视频；视频各抽查 12 帧，共 60 帧，没有声明逐帧审阅。[22 个方向对照](../evidence/comparison.html) 使用同一几何模型。缩略图随交付保存，原件链接需要原磁盘在线。

IMG_1220 产品图明确给出碟径 **151 mm**、杯的标称容量 **450 ml**。杯半径 43 mm、高度参数 103 mm、壁厚 2.2 mm、把手外伸 35 mm 等是照片比例估计，可调整；容量没有经过实物注水或测量验证，不是生产 CAD。全圆、平滑杯身以本轮实拍为准。

## 花纸、底款与光影的边界

花纸由内置图像生成工具创建，是参考风格的新稿，不是原厂花纹的逐笔复制。三个装饰区拥有独立 UV。所有 PBR 通道在同一像素坐标上生成、裁切、偏移；杯碟沿圆周使用 4 段镜像重复。详见 [ARTWORK.md](ARTWORK.md)。

底款根据 IMG_1229 / IMG_1232 的图形和文字重绘，灰色印在浅凹底面，标记图形宽约 16.5 mm 为推定值。SVG 不是官方矢量文件；运行时使用随附 PNG，不依赖中文字体安装。

光影使用自建摄影棚环境及随视角改变的金属反射。3 张重点图以人工轮廓标记点拟合相机，其他方向按照片推估；没有镜头实测标定，也没有重建办公室全部反射物，因此高光位置与实拍仍有差异。

## 验证与记录

几何测试检查内腔净距、弧长 UV、法线朝向、足圈和底款位置；浏览器测试覆盖视角、材质、款式原子替换、失败回退、尺寸更新、移动端布局及资源释放。当前实测报告在 [evidence](../evidence/)；变更记录见 [docs/changes/20260929-reference-corrections](docs/changes/20260929-reference-corrections/)。

首次交付时原工作目录尚未接入 Git。当前目录已在 Shuang-su/guangcai 中正常开发，1.0 源码与部署通过 v1.0 定位；分支、提交和发布流程见仓库根 README。


## 本轮把手与杯盖校准

首次交付时的工作副本与构建位于外置盘 `/Volumes/Prism/Codex/guangcai-viewer-20260929/outputs/guangcai-viewer/`，`dist/` 为静态构建。原 Documents 目录保留。补充原照现位于 `/Volumes/Prism_初号機/广彩/一号杯2/`。

- 把手内外边界分别建模，上端由较厚的三角根部收向水平上臂，外折角收紧；花纹仍按外弧真实距离展开。
- 盖片中心厚度约 4.35 mm，边缘金口厚度约 1.75 mm；底面止口单独建模，不将其算成整片盖厚度。
- 盖把跨度约 30 mm，条纹宽面 10.5 mm，最高点比盖片中心高约 13.9 mm。以上为多图比例推定，非卡尺实测值。
- [实时叠图](http://127.0.0.1:5187/compare.html?ref=1238) 新增盖把侧面和宽面。照片与模型同画幅，支持机位、透明度、显隐及 PNG/JSON 导出。
- [把手局部叠图](../evidence/handle-correction/index.html) 与 [5 组叠图记录](../evidence/overlays/index.html) 保留可见偏差，不能用构建成功代替实物验收。

源文件恢复说明：旧目录部分文件处于云端占位且读取超时，本副本从本任务已保存的写入/补丁记录恢复源码，再使用外置盘上的可读资产重新构建。原目录没有被覆盖；旧锁文件不可读，新副本根据已有 package.json 重新安装并生成锁文件，验证结果针对这个新副本。

## 新花纸与统一生成标准

新增“牡丹玉兰 · 金地”“莲荷双蝶 · 金地”，保留“花蝶 · 金地”。在“材质与图案”中点击缩略卡切换，或访问 `/texture-standards.html` 查看同机位渲染、各区域五通道、完整提示词与输出规格。默认记住上一次成功选用的内置款；`?style=peony-magnolia` 或 `?style=lotus-butterfly` 可直接打开指定款。

微浮雕 1.5 和曝光 1.08 由共享常量固定；导入、换款及实拍叠图均使用一致设定。1.5 是无量纲法线强度，不是毫米位移。

- 原始新母版：`assets/masters/peony-magnolia/`、`assets/masters/lotus-butterfly/`，最终四张 *-dense-v3.png 是按原版完整提示词重新生成的母版；初稿保留但不启用。
- 完整提示词：`assets/variant-prompts.json`。
- 完整 PBR 包：`public/artwork/peony-magnolia/`、`public/artwork/lotus-butterfly/`，各 15 张 PNG 及 style.json。
- 确定性派生与标准页：`npm run textures:variants`；浏览器验证与预览更新：`npm run qa:textures`。先运行开发服务，再生成预览，最后执行构建。
- 本轮记录：`docs/changes/20260929-texture-variants/`；验证：`../evidence/textures/texture-qa.json`。

## 线上版本与更新

- 生产站点：https://guangcai-no1.netlify.app/
- 花纸与标准：https://guangcai-no1.netlify.app/texture-standards.html
- 实拍叠图：https://guangcai-no1.netlify.app/compare.html?ref=1238
- Netlify 管理：https://app.netlify.com/projects/guangcai-no1
- 项目 ID：`cdc49df3-1e59-4e37-99ac-962584f050a6`；本地关联在 `.netlify/state.json`，不包含凭据。

此项目采用本地构建后发布，没有连接 Git 自动部署。后续确认修改并完成本地验证后，在本项目目录执行：

```sh
PATH=/opt/homebrew/bin:/usr/bin:/bin npm run build
PATH=/opt/homebrew/bin:/usr/bin:/bin npm exec --cache .codex-work/cache/npm --yes --package netlify-cli -- netlify deploy --dir dist --no-build --prod
```

`netlify.toml` 保留三个 HTML 入口，缺失资源返回 404；Vite 哈希文件长缓存，固定文件名花纸重新验证。部署证据见 `../evidence/deployment/`，线上专项验证用 `QA_URL=https://guangcai-no1.netlify.app/ node tools/online-qa.mjs`。该验证依赖已保存的发布清单；重新发布前需更新清单。
