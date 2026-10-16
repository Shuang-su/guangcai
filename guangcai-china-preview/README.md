# 中国杯 V5：城市母版与自由创作

本目录继续承载中国杯的版本演进。本功能分支基于 **5.1.0**，新增 Issue #25 的方形调色盘与二维材质控制；本轮改动仅完成本地实现和验证，未发布。线上历史由 [版本索引](../VERSION_HISTORY.md) 单独记录。

- 13 套 V5 城市图样各有纯金、青绿、朱红、紫、蓝五个配色预设；源结构和法线每城只存一套。
- “颜色／材质”切换共享方形点阵控制区。颜色盘控制色相与饱和度，保持当前明度；材质盘联动金属度、粗糙度和清漆层，金线独立固定。
- 鼠标／单指点击或拖动选点，方向键调整位置，Shift 加方向键精细调整，Home 回到面板中心；读屏提供等价双轴控件。手机及窄窗口采用底部面板，城市入口默认折叠。
- 新面板不提供浮雕调节，保留原有效果。底层 0–2 倍法线强度接口继续兼容，不改变真实几何；旧 paint 参数归一为彩釉。
- 换城保留创作参数、相机、背景与文字隐藏状态；选择配色预设恢复该预设参数。中国原版及既有配色继续兼容，默认仍为中国原版纯金。
- 城市包按需加载，最多保留两个；拖动仅更新着色器 uniform，不重建纹理或反射环境。
- 北京以原 PSD 天坛层作线条参考，去除前景波浪并让建筑直接到底线。当前为可继续调整的图样候选，真实工艺与设备验收单列。

运行后打开 `/review/v5/index.html` 查看 13 套图样的原稿、SVG 与填面检查；页面提供模板和各城 SVG 下载。[制作规范](assets/masters/v5/README.md) · [原 V5 制作记录](../docs/changes/20261015-city-v5/) · [Issue #25 请求、计划与完成记录](../docs/changes/20261016-xy-color-material/)。

## 本地运行

```sh
npm ci
npm run dev -- --port 5210
npm test
npm run build
```

打开 http://127.0.0.1:5210/ 。右上角“素材与对照”打开 V5 母版审阅页；历史对照保留在 evidence.html。

```sh
QA_URL=http://127.0.0.1:5210/ npm run qa:v5
npm run qa:background
npm run qa:v4
# 需要复查 3.0 机位时：npm run evidence:v3
```

浏览器脚本使用已安装的 Chrome 与 Playwright。手机视口和多点触摸模拟不等于真机或 Safari 验收。

仅调整控制与材质参数时，复用已验证的纹理并直接运行 `npx tsc --noEmit`、`npx vite build --outDir ../.codex-work/tmp/xy-controls/build`；常规 `npm run build` 的 prebuild 会重新生成纹理与清单。输出、浏览器截图和缓存放在项目 `.codex-work/`。

`Appearance.material` 保持为纵轴，新增可选 `materialX`（默认 `0.5`）。旧单参数材质曲线完整保留为中间一列；`finish` 兼容输入恢复原端点和横轴中值。SwiftUI 点阵反馈参考与 MIT 声明保存在本轮记录的 `references/`，分发许可见 `public/third-party/xy-slider-LICENSE.txt`。

## 原稿与导出

- `assets/source/floral-export.psd`：原始 CMYK 花纸，嵌入 Japan Color 2001 Coated。
- `assets/masters/floral-source-v3-srgb.png`：经嵌入 ICC 转换的 sRGB 母版。
- `assets/masters/v3/`：3.0 原稿裁切／弧长展开记录；后续高清重建及连续图集见 `docs/changes/20261013-v3-restored/`。
- `public/fixed/`：对齐的颜色、法线、高度、金属度和粗糙度；高度源保留，不做几何位移。
- `public/china/`：原版纯金城市与文字材质源。
- `public/cities/v4/catalog.json`：十三款编译图样目录（另有原版中国纯金包）；运行通道为 4096 × 1783，包含独立覆盖、颜色、金属度、粗糙度、清漆和高精度法线。文字独立保存。
- `public/textures/`：内容哈希运行资产；颜色与数据通道分开编码，高精度法线通过浮点编码加载。具体文件以当前清单为准。
- `evidence/source-floral-v3.json`：裁切、极坐标展开和来源哈希。

当前 `textures:fixed` 使用高清重建流程；历史原始花纸导出入口为 `textures:fixed:legacy`。Python 依赖见 `tools/requirements-assets.txt`，历史 CMYK 导出需要 Pillow（含 LittleCMS）和 NumPy。重导出前保留当前母版及清单，并检查差异。

```sh
npm run textures:fixed
npm run textures:web
```

从城市 PSD 重新导出使用 `tools/china-assets.py`；正式修订前先保留当前城市包，不能用 RGB 明暗替代线条透明度。

## 接口与固定参数

`window.cupViewer.applyCityArtwork(pack)` 继续使用 `blank-300deg-v1`，对齐通道先完整解码再原子切换，失败保留当前版本，连续请求以最后一次为准，旧纹理释放。V4 增加独立覆盖遮罩、清漆通道、法线编码和文字描述；旧包缺省字段仍兼容。款式、材质和文字整组成功后提交，城市包版本号与产品版本 4.2.0 分别管理。

固定花纸包可选 `mapping: 'source-layout-v3'`，使用 UV2，一条原始碟花带绕一周。旧包省略该字段时继续使用旧 UV0 映射；城市始终使用 UV1。全局曝光 1.08，固定花纹法线 4.4、釉层法线 2.4，原版纯金城市法线 0.7；新款按所选材质应用参数。凹凸是视觉近似，不是制造深度。

桌面自动背景为灰色；手机自动背景为“柔光背景 3.0”。保留旧柔光、灰色与本地上传。背景只影响底图，不修改三维灯光或材质。支持左键／单指旋转、右键／双指平移、滚轮／捏合缩放。

## 发布与历史

- 中国杯 2.2 保留在 https://guangcai-no1-china.netlify.app/ ，已发布部署 ID `6ace111ab0415c9455a3c6f8`。
- [3.0 高清预览](https://guangcai-no1-china-v3.netlify.app/) 已发布，部署 ID `6ace443df7425f433e717eb0`，继续保留。
- [4.2 主题预览](https://guangcai-no1-china-v4.netlify.app/) 当前部署 ID `6acefdc52ef3d568cd9acedd`，源码 `ee6e1aff10bf2f9892babc375e723bf360d9d63e`。两站均未连接 Git 自动部署；`v3.0`、`v4.0` Git 标签固定在各自发布基线；上一轮纹饰修正已回溯标为 `v4.1`，本轮金底清洗标为 `v4.2`，旧部署字节与标签均保留。
- 原版站与历史发布对应关系见仓库 `VERSION_HISTORY.md` 和 `deployments/`。
- 早期非 Git 开发、122 文件的旧发布记录等属于 2026-10-11/12 历史状态，原文保留在各日期的 `docs/changes/`；不代表当前开发状态。

V4 记录位于仓库根目录 [docs/changes/20261014-v4/](../docs/changes/20261014-v4/)，最新[接缝修正与公网复核](../docs/changes/20261014-v4-body-seam/)分别记录源码与实际部署。

3.0 请求、计划和完成记录位于 `docs/changes/20261013-v3/`；Git 迁移清单位于仓库根目录 `docs/changes/20261013-v3-git-integration/`。非 Git 原副本保留作迁移前备份，后续编辑、测试和提交均在本仓库进行。

## 视觉边界

参考图中的空白杯身用于器型、白瓷和机位校准；城市图样按原双杯参考和 PSD 检查。参考图会等比缩小，不进行透视变形。机位残差只描述选取的盖沿与碟沿边界，不能代表整件逐像素一致。保留的差异包括盖钮轮廓、较薄的碟侧、实时高光与离线效果图的差别、原稿与高清重建纹样的细节差异，以及 PSD 的 CHINA 大小写。正式工艺厚度、最终城市稿和真实设备验收仍须单独确认。

V4 六款中国新图样共用 PSD 建筑结构，深圳两款共用母稿；花云鸟等点缀属于参考重建。高精度凹凸仍为实时材质近似，不能视作原稿真实三维高度或生产尺寸。

[固定纹饰凹凸修正](../docs/changes/20261014-fixed-relief-alignment/completion.md)：清理金底伪高度，固定釉层覆盖 0.40／粗糙度 0.22；保持正常线条深浅，法线不改变几何剪影。

## 4.2 金底清洗

原始颜色母图保持不变。`tools/clean-fixed-gold.py` 从保存的 4.1 金属/粗糙度母版生成清洗范围及对齐通道；`src/materials/fixed-gold-ground.ts` 仅在确认的金底上统一底色，实际反光继续使用 PBR。黄花与果皮受更严格的范围保护，不对整图降噪或重画。

固定包新增可选 `cleanGoldGround: true`：metalnessMap 的 R 通道记录金底清洗覆盖、B 通道保留金属度（G 与 B 一致）。旧包默认关闭，仍按原逻辑显示。清洗开启与整包纹理原子切换，失败保留原包。颜色、法线、金属、粗糙度同 UV/图集；法线强度仍 4.4/2.4。

生成样张和未采用原因见 `evidence/floral-cleanup-4.2/imagegen-note.md`；局部生成改变了描线，因此只作对照，未接入生产纹样。与描线相连的细小色痕仍可能保留。

复核：`python3 tools/test_gold_cleanup.py`、`python3 tools/test_floral_relief.py`、`python3 tools/verify-gold-cleanup.py`，需要 `tools/requirements-assets.txt` 的依赖。浏览器使用 `QA_PHASE=after node tools/floral-cleanup-review.mjs`（默认 5212）。历史核验脚本按其对应版本标签使用，不应以新版本材质通道去断言旧版通道不变。

## 4.3 北京主题

北京四个彩色款沿用中国对应配色与三种材质，纯金采用固定基准参数。新增独立“北京 / BEIJING”文字资产；“祈年殿”牌匾属于建筑，不受文字开关影响。主题目录集中定义默认款、名称与标语能力，`applyCityArtwork(pack)` 继续兼容旧包。

`assets/source/beijing/` 保存用户原图；`assets/masters/beijing-4.3/` 保存高清线条、覆盖、高度与超分候选；`tools/compile-beijing.py` 生成独立对齐通道。生成式超分候选被拒绝，最终保留原稿构图；4096×1783 是等比放大的运行尺寸，不代表新增真实细节。

```sh
npm run textures:beijing  # 需要 Pillow / NumPy，增量保留旧款
python3 tools/test_beijing_assets.py
QA_URL=http://127.0.0.1:5216/ npm run qa:beijing
```

[本轮请求、计划与完成记录](../docs/changes/20261014-beijing-4.3/) · [北京同机位对照](https://guangcai-no1-china-v4.netlify.app/evidence.html#beijing-4.3)。
