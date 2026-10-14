# 中国杯 3.0 三维预览

本目录是 [Shuang-su/guangcai](https://github.com/Shuang-su/guangcai) 的中国杯应用，2.x 和 3.x 沿用同一源码目录。开发、PR 与发布遵循[仓库约定](../AGENTS.md)。3.0 的接入分支为 `codex/china-3.0`，关联 Issue #11；验收期间保持 Draft，现有两个站点不随代码推送自动发布。

3.0 使用原始 450 ml 杯窄饰带、独立把手花条和 151 碟弧花带。白瓷单独补光；杯盖主体按单杯参考压平，保留外缘卷口与底部止口。盖钮倒影由真实几何的平面捕获产生。城市图样与文字沿用原 PSD，金色和固定花纹的凹凸保持独立。

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
npm run evidence:v3
```

浏览器脚本使用已安装的 Chrome 与 Playwright。手机视口和多点触摸模拟不等于真机或 Safari 验收。

## 原稿与导出

- `assets/source/floral-export.psd`：原始 CMYK 花纸，嵌入 Japan Color 2001 Coated。
- `assets/masters/floral-source-v3-srgb.png`：经嵌入 ICC 转换的 sRGB 母版。
- `assets/masters/v3/`：三处原稿裁切／弧长展开，原排列不重画。
- `public/fixed/`：对齐的颜色、法线、高度、金属度和粗糙度；高度源保留，不做几何位移。
- `public/china/`：城市与文字材质源；3.0 未修改这些文件。
- `public/textures/`：内容哈希 WebP；固定颜色质量 94，数据通道无损。运行时只请求当前清单中的 16 张。
- `evidence/source-floral-v3.json`：裁切、极坐标展开和来源哈希。

重新导出原始花纸需要 Python 3、Pillow（含 LittleCMS）和 NumPy，依赖见 `tools/requirements-assets.txt`。可设 `PYTHON` 为已安装这些模块的解释器。

```sh
npm run textures:fixed
npm run textures:web
```

从城市 PSD 重新导出使用 `tools/china-assets.py`；正式修订前先保留当前城市包，不能用 RGB 明暗替代线条透明度。

## 接口与固定参数

`window.cupViewer.applyCityArtwork(pack)` 继续使用 `blank-300deg-v1`，对齐通道先完整解码再原子切换，失败保留当前版本，连续请求以最后一次为准，旧纹理释放。文字颜色固定，城市包版本号与产品版本 3.0.0 分别管理。

固定花纸包可选 `mapping: 'source-layout-v3'`，使用 UV2，一条原始碟花带绕一周。旧包省略该字段时继续使用旧 UV0 映射；城市始终使用 UV1。全局曝光 1.08，固定花纹法线 4.4、釉层法线 2.4，城市法线 0.7。凹凸是视觉近似，不是制造深度。

桌面自动背景为灰色；手机自动背景为“柔光背景 3.0”。保留旧柔光、灰色与本地上传。背景只影响底图，不修改三维灯光或材质。支持左键／单指旋转、右键／双指平移、滚轮／捏合缩放。

## 发布与历史

- 中国杯 2.2 保留在 https://guangcai-no1-china.netlify.app/ ，已发布部署 ID `6ace111ab0415c9455a3c6f8`。
- 3.0 目标独立站为 https://guangcai-no1-china-v3.netlify.app/ ，实际发布状态、源码提交和部署 ID 以本次完成记录为准。
- 原版站与历史发布对应关系见仓库 `VERSION_HISTORY.md` 和 `deployments/`。
- 早期非 Git 开发、122 文件的旧发布记录等属于 2026-10-11/12 历史状态，原文保留在各日期的 `docs/changes/`；不代表当前开发状态。

3.0 请求、计划和完成记录位于 `docs/changes/20261013-v3/`；Git 迁移清单位于仓库根目录 `docs/changes/20261013-v3-git-integration/`。非 Git 原副本保留作迁移前备份，后续编辑、测试和提交均在本仓库进行。

## 视觉边界

参考图中的空白杯身用于器型、白瓷和机位校准；城市图样按原双杯参考和 PSD 检查。参考图会等比缩小，不进行透视变形。机位残差只描述选取的盖沿与碟沿边界，不能代表整件逐像素一致。保留的差异包括盖钮轮廓、较薄的碟侧、实时高光与离线效果图的差别、单条原始花带两端的构图接缝，以及 PSD 的 CHINA 大小写。正式工艺厚度、最终城市稿和真实设备验收仍须单独确认。
