# 中国杯 V7.1.1：渐进资源与开发交接

[V7 在线预览](https://guangcai-no1-china-v7.netlify.app/) · [开发交接主文档](integration/README.md) · [逐项性能机制](integration/PERFORMANCE.md) · [Issue #29](https://github.com/Shuang-su/guangcai/issues/29) · [本轮验证](../docs/changes/20261017-v7-v6-sync-handoff/completion.md)

V7.1.1 基于V7.0.4，同步V6.0.4的独立液态折射、底部收起锚点和无进度下载超时。进入前显示真实加载指标，完整预加载23城低清、当前及相邻高清、六组文字和花纸；当前城市高清真正显示后进入，切城后自动提清；按需解码与绘制。文字使用已裁切R8遮罩，切换无需重新绘制整张4K图。保留金线、配色和杯壁/杯盖反射。预算或持续帧耗不足时回退磨砂；Safari读不到机器RAM不直接降级。

| 命令 | 用途 |
| --- | --- |
| `npm ci --cache .codex-work/cache/npm` | 按锁文件安装 |
| `npm run dev` | 127.0.0.1:5270 本地开发，HFN按原始字节分发 |
| `npm run build` | 消费者静态产物 `.codex-work/deploy/v7-build/` |
| `npm run build:integration`、`npm run mock:v7` | 127.0.0.1:5271/integration/ 本地模拟保存/还原/分享 |
| `npm test`、`npm run test:v7` | 基础与V7契约测试（完整仓库） |
| `npm run qa:v7-split` | 三个Origin及 `/cup/` 子路径联调验证 |
| `npm run check:v7-assets` | 检查195资源与裁切文字 |
| `npm run build:audit` | 单独构建历史开发/审计入口，不进入消费者包 |
| `node tools/v7/package-handoff.mjs` | 从干净提交生成带哈希清单的消费者/源码交接包 |

资源默认 v7-2（西安全填色），保留 v7-1 不可变目录和旧作品回放。性能文档详细说明每个加载、缓存、预算、降级与恢复条件。

API与资源地址通过公开 `runtime-config.js` 配置；公司身份、数据库和真实业务后端不由mock承担。完整接口、Schema、数据关系、CORS/COS及部署步骤见交接主文档。消费者包不包含母版和历史审计素材，资源变动才运行生成器。

本轮是开发交付候选。iPhone13mini/iOS18连续30分钟、实体触感及真实COS线路待验收；用户确认的Air/iOS27.0.1与mini6/iPadOS16.6.1正常折射属于V6基线，V7需要复测。Git提交、PR合并、预览发布和真机验收分别记录。

以下为保留的 V6 素材及开发说明。

# 中国杯 V6：城市共彩创作预览

V6 使用一套模型、城市材质与创作状态，分为三个入口：

- `/`：消费者页面。23 城、六组东方大楷祝福语、五个配色预设及自由颜色／明度／质感调整；默认深圳＋同心金＋开放包容。
- `/dev/`：完整开发工作台。保留原 26 个图样选项和所有调试、背景、材质及视角功能，另加 23 城新稿。
- `/audit/`：Glass-HQ WebGL2／原 WebGPU 对比、23 城原稿／SVG／填色，以及六组字框证明图。

当前源码关联 [Issue #27](https://github.com/Shuang-su/guangcai/issues/27)，发布状态以 [版本索引](../VERSION_HISTORY.md) 和 [完成记录](../docs/changes/20261017-v6-webgl2-studio/completion.md) 为准。V5 独立站保留历史部署，不由本次构建重发。

## 创作交互

底部四个分类（城市、色彩、质感、祝福语）双向循环，每次显示三个；顶部短横杆可点击或上下滑动收起／展开。城市居中选择，三张完整卡片和两侧半张共五张可见，缩略图仅透明金色描线。

五个方形配色同时显示并循环；点击当前色块或“自定义”进入二级调色盘。返回保持当前配色，重置恢复配色预设。色相与饱和度用方形点阵控制，明度用右侧滑杆；界面不展示数值读数。质感控制延续既有二维材质参数。原生触摸节点、iOS 脉冲路径和短屏按压放大保持 V5.4.2 实现。

城市结构与文字分别缓存；切换祝福语不重复加载城市法线，调色和质感只更新着色器参数。线条、文字和边框固定金色，建筑内部全填色，天空保留白瓷。

## 液态玻璃

上游 `Glass-HQ/liquid-glass` 固定到 `9f5bfc7daa7be5d20a41b94d841b8f065de655fc`，来源与 MIT 许可位于 `vendor/glass-hq/`。WGSL 材质图公式逐项迁移为 GLSL ES 3.00；独立 WebGL2 上下文、RGBA8 输出、只读轮廓纹理、PBO/fence 回读。原 SVG 合成、几何和动效源码保留。消费者默认 WebGL2，失败时透明玻璃降级；原 WebGPU 仅供审计。

消费者外框由页面高度动画统一驱动，避免同时启用 `fluid` 布局弹簧产生重复回弹。审计页仍保留上游 fluid 示例。WebGL2 不消除 Safari 的 SVG 合成开销，真实设备性能和触觉验收单独记录。

## 本地运行与验证

```sh
npm ci
npm run dev -- --port 5260
npm test
npm run build
QA_URL=http://127.0.0.1:5260/ npm run qa:v6
```

打开 `http://127.0.0.1:5260/`，开发及审计入口分别为 `/dev/`、`/audit/`。测试需要已安装的 Chrome；浏览器模拟不证明真实 iPhone 震动。

`npm run pipeline:v6` 校验原稿审核哈希、城市／字框资产、正式构建和浏览器行为，产物只写 `.codex-work/`。可用 `CITY_PYTHON` 指定已具备 Pillow、NumPy 的 Python；生成 SVG 还需 `tools/requirements-v6.txt` 中的 vtracer。`npm run deploy:v6` 只允许独立 V6 站点，并校验干净提交、构建哈希、线上文件和旧站未变；不会连接 Git 自动部署或重写现有 `.netlify` 链接。

## V6 原稿与生成

- `assets/source/v6/`：23 城原始 PNG、官方原样 WOFF/WOFF2、原边框和 UI 参考；哈希来源记录一同保存。
- `assets/masters/v6/`：5433×2365 可编辑 SVG、配置、审核与编译记录。
- `public/cities/v6/`：4096×1783 结构和法线、六套独立字框、透明选择缩略图。
- `evidence/city-v6/`、`evidence/glass-v6/`、`evidence/ui-v6/`：来源、字体、材质一致性和界面证据。
- 生成顺序：`python3 tools/compile-city-v6.py`、`python3 tools/compile-slogan-frame.py`、`node tools/compile-slogans-v6.mjs`。常规 UI 修改无需重新生成这些资产。

以下保留固定花纸及历史技术记录，当前页面入口以上文为准。

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
