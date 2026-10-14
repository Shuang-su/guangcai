# 中国杯 4.2：城市主题与固定花纹金底清洗

[打开 V4](https://guangcai-no1-china-v4.netlify.app/) · [素材与对照](https://guangcai-no1-china-v4.netlify.app/evidence.html#v4) · [版本与部署索引](../VERSION_HISTORY.md)

本目录是 [Shuang-su/guangcai](https://github.com/Shuang-su/guangcai) 的中国杯应用，2.x、3.x、4.x 沿用同一源码目录。当前源码版本 **4.2.0**；发布与合并状态以末尾记录和根目录版本索引为准，开发与发布遵循[仓库约定](../AGENTS.md)。站点手动发布，不随代码推送或 PR 合并自动更新。

## 主题、款式与文字

- **中国七款：** 原版纯金、青绿金线、红金、紫金、蓝金、蓝色线描、紫色线描。
- **深圳两款：** 红金、青蓝金线。
- **新款三种材质：** 彩釉金线、彩色金属、轻浮雕彩绘；原版纯金保留 3.0 基准参数。
- **文字独立可选：** 随款式、主题名称、不显示；深圳另可选择“和合共彩”或“共创美好”及对应边框。文字颜色随款式，原版纯金仍为金色。

首次打开为中国原版纯金。新款按需加载，换款保留相机、缩放和背景；“复位”恢复观察视角，“恢复默认款”恢复中国纯金。“不显示文字”可跨主题保持，刷新后恢复默认款。

V4 沿用 3.0 的固定高清广彩花纹、连续单周图集、白瓷补光、平盖及盖钮倒影。城市图样、文字与固定装饰独立管理；颜色覆盖和杯身饰带旁釉面接缝已修正。素材来源及重建边界见下方记录。

## 本地运行

```sh
npm ci
npm run dev -- --port 5210
npm test
npm run build
```

打开 http://127.0.0.1:5210/ 。右上角“素材与对照”查看原图、同机位滑杆、叠图与局部细节。

```sh
QA_URL=http://127.0.0.1:5210/ npm run qa
npm run qa:background
npm run qa:v4
# 需要复查 3.0 机位时：npm run evidence:v3
```

浏览器脚本使用已安装的 Chrome 与 Playwright。手机视口和多点触摸模拟不等于真机或 Safari 验收。

## 原稿与导出

- `assets/source/floral-export.psd`：原始 CMYK 花纸，嵌入 Japan Color 2001 Coated。
- `assets/masters/floral-source-v3-srgb.png`：经嵌入 ICC 转换的 sRGB 母版。
- `assets/masters/v3/`：3.0 原稿裁切／弧长展开记录；后续高清重建及连续图集见 `docs/changes/20261013-v3-restored/`。
- `public/fixed/`：对齐的颜色、法线、高度、金属度和粗糙度；高度源保留，不做几何位移。
- `public/china/`：原版纯金城市与文字材质源。
- `public/cities/v4/catalog.json`：八款新图样目录；运行通道为 4096 × 1783，包含独立覆盖、颜色、金属度、粗糙度、清漆和高精度法线。文字独立保存。
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
