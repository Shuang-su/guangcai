# 中国杯临时稿三维预览

当前城市包为版本 3：以用户选中的早期金属层次为基准，分离线条与底面粗糙度，减轻深暗反光、提亮高光，并纳入真实把手等部件的局部反射。将中国 PSD 原线稿变成留白区域的金属浅浮雕，同时固定杯身纵向饰带、把手装饰面和杯碟外圈。城市图样落到杯身底缘；金属按反馈保留清楚层次与柔和反光。这是可修订的本地视觉预览，城市选择及换色 UI 留到下一轮。

## 线上地址（2026-10-12 验证）

- 中国杯：<https://guangcai-no1-china.netlify.app/>
- 素材与对照：<https://guangcai-no1-china.netlify.app/evidence.html#floral-update>
- 本次固定版本：<https://6acbd24fa545c331cdd20dae--guangcai-no1-china.netlify.app/>
- 原版继续位于 <https://guangcai-no1.netlify.app/>，新旧为独立站点。
- 新项目 ID：`8d9dfdb3-270a-46c5-9dde-0fe4ddc2662f`；部署 ID：`6acbd24fa545c331cdd20dae`。

本次使用现有 Netlify CLI 登录，直接发布构建后的静态文件，未连接 Git 自动部署。`.netlify/state.json` 关联新站，`.netlify` 已排除；没有初始化 Git。

发布目录为 `.codex-work/deploy/china-20261012-floral-relief-deeper/site`，包含当前两个 HTML 入口及 `assets/`、`china/`、`fixed/`、`marks/`、`reference/`、`review/`、`textures/`。`dist` 中留存的旧花纸与旧标准页未纳入新站。122 个文件共 40,995,573 字节，逐文件清单在 `evidence/deployment/release-manifest.json`。源 PSD、PDF 与完整生成资料保留本地。

后续更新需先构建、重新制作暂存与清单，再明确指定新站 ID 发布；不应沿用旧站 ID。线上检查：

```sh
QA_URL=https://guangcai-no1-china.netlify.app/ node tools/china-online-qa.mjs
```

部署、远端状态回读、哈希和浏览器证据位于 `evidence/deployment/`，本轮完成记录位于 `docs/changes/20261012-floral-relief-calibration/`；前轮加载与花纸记录位于 `docs/changes/20261012-load-pan-floral/`，初次上线记录保留于 `docs/changes/20261011-china-deployment/`。

## 打开

```sh
npm run dev -- --port 5208
```

打开 <http://127.0.0.1:5208/>，右上角“素材与对照”进入证据页。生产构建可运行：

```sh
npm run build # 自动生成高质量颜色与无损数据 WebP，验证尺寸和编码
npm run preview -- --port 5209
```

当前 `node_modules` 只读复用相邻原项目的依赖，通过符号链接连接。源代码、资产、缓存、构建和证据均在本目录。迁移到别的电脑时，在没有这个链接的新副本中运行 `npm ci` 即可安装锁定依赖；需要 Node.js 22.12+，浏览器支持 WebGL 2。不要在当前链接上运行会修改相邻项目依赖的安装命令。

本目录不是 Git 仓库，没有初始化 Git 或创建提交。原项目位于相邻的 `guangcai-viewer`，没有修改。

## 资产分工

| 位置 | 内容 |
|---|---|
| `assets/source/` | 原 PSD、原效果图与背景 PDF 的副本 |
| `assets/extracted/` | PSD 图层的原生分辨率透明度及原图层坐标 |
| `assets/masters/china-fixed-*.png` | 新生成固定广彩平面花纸母版，含上一版花带留档 |
| `assets/fixed-prompts.json`、`assets/fixed-band-v2-prompt.json` | 完整生成提示词和工具来源 |
| `public/fixed/` | 三处固定装饰的像素对齐颜色、金属、粗糙度、法线和高度源 |
| `public/china/` | 城市金属、线条、高度、法线、粗糙度、色值与独立文字 |
| `public/review/` | 原参考裁切、实际 WebGL 渲染、并排图、50% 叠图、参数与检查记录 |
| `output/playwright/china/` | 桌面、手机模拟、各视角与材质状态的原始浏览器截图 |
| `docs/changes/20261011-china-relief/` | 完整请求、有效计划、补充反馈、完成记录 |

旧项目的其他源码、老花纸及工具作为历史基础保留。当前入口只使用 `src/main.ts`、`public/fixed/`、`public/china/` 与新版证据页。旧 `compare.html` 不进入当前生产构建。

## 从 PSD 重做城市资产

不调用 Photoshop，不上传 PSD。Python 需要 Pillow、NumPy：

```sh
python3 tools/china-assets.py
```

脚本从 `assets/source/china-lines.psd` 直接读取 PSD 层记录与透明度通道，支持该稿的 PackBits 压缩。当前稿的展开框为 `(777, 2243, 6210, 4608)`；5 个建筑图层和文字层按保存坐标合成。外框、背景和图层组标记不进入材质。没有从白底预览抠图，没有让图像生成重画建筑。

- 城市线条：保留 alpha ≥ 128 的全部有效像素；只清理低透明度远端残点。清理差异图与各层计数写入 `evidence/psd-audit.json`。
- 金属覆盖：逐建筑依据外轮廓独立闭合，长城按列闭合至原基线；这是视觉重建，不是 PSD 原有面数据。不会跨越建筑之间的空白填满整张图。
- 下沿：删掉外框下方 5 个透明像素，城市所有通道使用同一裁切。金属底面最后 10 个源像素列向下补齐抗锯齿余隙，原线条保持不变。城市材质覆盖到杯体外壁圆角 `y = 0.12`；不会贴进杯底支承面或内腔。
- 高度：原线条经 0.65 px Gaussian 圆滑生成高度；金属填充不参与。导出 4096 × 1783 法线和高度源，运行时只用法线，不使用几何位移。
- 金属层次：底面粗糙度 0.26，线条及侧边依据 `line-finish.png` 平滑过渡到 0.22；清漆覆盖 26/255。恢复早期法线梯度增益 2.1 与运行时强度 ±0.70。默认凸纹，可关闭或反向比较。
- 杯身反射：专用环境将深暗卡片抬到线性强度 0.045，大柔光源乘 1.65、房间底色 0.42；不改颜色贴图。512 像素 CubeCamera 捕获真实把手、盖、碟，经 PMREM 按粗糙度过滤。杯壁在捕获时隐藏，避免自我反馈；把手方向做有限范围视差校正。它是单探针局部近似，不是离线光追。捕获在部件位置稳定后更新，纯相机旋转复用纹理。材质校准中的“邻近部件反射”可切回只有环境光的对照。
- 文字：原稿“中国 / CHINA”，文字遮罩、色值 `#ddb538`、粗糙度 66/255 和清漆覆盖 26/255 固定，不随城市包颜色改变。

导出地图保持同一坐标。当前运行时将城市组整体等比缩放 0.82，水平偏移 0.047，垂直贴底，作为参考机位下的大小校准；建筑内部比例不改，文字单独保持 PSD 原位置。`placement.scale = 1` 可显示完整源展开比例。

新的 PSD 若沿用当前图层名称与外框可重复导出；若改变名称、画布或展开框，需要先更新脚本中的图层选择和 FRAME。脚本不是任意 PSD 的通用导入器；本轮没有浏览器 PSD 上传功能。

固定花纸重新派生：

```sh
npm run textures:fixed
```

这只根据保存的固定母版重新生成通道，不重新调用图像生成。母版无烘焙摄影高光，反光由三维环境产生。把手 UV 按弧长展开，杯碟镜像重复闭合；可见花纹及遮挡部分均标为参考重建，不能作为生产花纸复原证明。

## 城市替换接口

```ts
interface CityArtworkPack {
  id: string;
  version: number;
  name: string;
  layout: 'blank-300deg-v1';
  placement?: { scale: number; offsetU: number; offsetV: number };
  baseColor: string;
  normal: string;
  roughness: string;
  metalness: string;
  height?: string; // 保留为派生源；此版本不加载为几何位移
}
```

`window.cupViewer.applyCityArtwork(pack)` 返回 `Promise<boolean>`。`true` 表示整个包已经生效，`false` 表示请求被较新的请求取代；读取或规范错误会 reject，同时保留当前版本。四个运行时通道必须同尺寸、≤8192 像素、符合展开长宽比。原始 `city.json` 的通道路径相对清单文件；加载时解析为 URL：

```js
const manifestURL = new URL('./china/city.json', location.href);
const response = await fetch(manifestURL);
if (!response.ok) throw new Error('城市包清单读取失败');
const pack = await response.json();
for (const channel of ['baseColor', 'normal', 'roughness', 'metalness', 'height']) {
  if (pack[channel]) pack[channel] = new URL(pack[channel], manifestURL).href;
}
await window.cupViewer.applyCityArtwork(pack);
```

这个接口只更新留白材质。原文字遮罩按固定位置合成，固定花纸和结构金边不参与替换；不会重建模型。颜色贴图为 sRGB，数据通道为线性数据，全部使用独立 UV1。加载阶段先完成所有通道解码与尺寸核验，再一次性切换；旧 GPU 纹理会释放。

调试接口：`ready()`、`restore()`、`setView(name)`、`setAuto(bool)`、`setRelief(-1|0|1)`、`setCityMetal(bool)`、`setLocalReflections(bool)`、`setMode('pbr'|'clay'|'relief'|'metalness')`、`debug()`、`dispose()`。`setCityMetal` 是材质诊断开关，不是下一轮的城市配色 UI。

## 验证与证据再生成

```sh
npm test
npm run build
npm run qa                 # 默认 http://127.0.0.1:5208/
node tools/reflections-qa.mjs # 真实把手参与反射的遮蔽对照
npm run evidence           # 需要本地服务和 QA 截图，随后再 build 更新 dist 证据页
node tools/verify-delivery.mjs
```

QA 使用本机 Chrome 的无头浏览器（项目原有 Playwright），不安装新浏览器。可用 `QA_URL` 指定生产预览 URL。浏览器记录 53 项，包含页面交互、通道分离、蓝色城市包替换、文字像素比较、损坏图片、错尺寸、定位越界、快速切换、五次换包纹理计数、局部反射开关与拆解跟随、五次反射开关资源稳定、桌面与模拟手机触摸。手机模拟不等于真实设备或 Safari 验收。

参考对照的机位通过杯盖与杯碟的手工边界点拟合，RMS 仅衡量这些边界；不代表完整形状或花纹逐像素匹配。当前 PSD 的塔楼／天坛高度关系和文字字形与效果图存在差异，按源文件保留。盖钮、把手和隐藏结构沿用旧实拍基础；最终工艺方向、真实凸起高度与正式城市稿仍待下一阶段。

本次线条层次修订的请求、参数选择、候选截图和验证记录在 `docs/changes/20261011-relief-separation/`；上一轮记录保留为历史。

公网加载使用内容摘要命名的 WebP：固定花纸颜色质量 94；其他材质通道无损编码。杯碟原尺寸、城市 4096 × 1783 不变；杯身带与把手分别回到接近母版原生裁切的 820 和 142 像素宽，避免下载放大插值像素。源 PNG 与生成母版保留。构建前自动导出 `src/styles/web-textures.json`，仅当前 16 张运行时贴图进入发布包，共 5,364,256 bytes（优化前 10,399,564，减少约 48.4%）。纹理文件名随内容更新，使用一年 immutable 缓存；HTML 和源下载仍重新验证。并发 4、最多三次失败重试沿用。全部素材就绪后才显示已载入。

固定花纸 v4 使用原效果图三处直接裁切作为图像生成参考，未输入旧生成母版。裁切坐标见 `assets/reference-crops/crops.json`，提示词见 `assets/fixed-v4-crop-prompts.json`。长尾鸟、斑蝶、卷瓣花和叶脉来自这些局部的视觉重建；完整周向和遮挡处不是精确复原。固定包可选 `offsetU` 同步调整所有通道，当前杯碟为 0.5；城市替换接口不变。

交互支持左键/单指旋转、右键/触屏双指拖移、滚轮/捏合缩放、复位。浏览器检查采用真实鼠标事件与 CDP 多点触摸模拟，不等于真机 Safari 检查。

本轮记录位于 `docs/changes/20261012-load-pan-floral/`。原项目仍为非 Git 目录，没有初始化或创建提交。

最终公网冷启动 7,833 ms，有缓存刷新 1,108 ms（本机当时网络）。前版本轮复测 53,564 ms，历史 103,806 ms。详细传输与检查记录见 `evidence/deployment/online-qa.json` 及 `cold-load-resources.json`。


## 彩色花纹起伏加深（2026-10-12）

v4 颜色母版保持；固定高度/法线补充局部彩色细描线。最终彩绘法线 4.4、釉层法线 2.4，釉层覆盖 0.75、粗糙度 0.14；城市材质独立。新增花纹近看、彩色花纹起伏开关和中性灰花纹检查。最终验证：53 项本地检查、22 项线上检查、35 张证据图解码。请求、快照、参数、失败修复与完成记录见 `docs/changes/20261012-floral-relief-calibration/`。
