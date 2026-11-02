# V7.1.12 花纹主动提清与正式主页交付

2026-10-20。产品7.1.12 / 资源v7-9，分支codex/next-version-20261020；实现与打包来源 checkpoint：`006e32681b686ed161b2aa710a67831e9b3bc9b3`。本完成记录另作文档checkpoint。上一轮七视角保留。

## 实际修正

附图的“套杯”自由放大仍模糊，原因是旧策略把该状态归为城市升级，固定花纹仍可停在light；手机近看限制standard。此外，350ms防抖会在持续旋转/缩放中不断延后。

- 改为120ms节流，移动期间可开始准备；手动放大门槛从1.35倍调到1.15倍CSS投影密度，判定与DPR分离。
- 常态尝试可见花纹standard，明确花纹/杯碟视角与自由放大优先detail色图；按焦点排序候选，避免把预算用在隐藏部件。
- 色图与法线/ORM可分别选档。杯碟4096×576彩色可配2048×288法线/ORM；归一化图集护边相同比例后才允许组合，light护边不同则拒绝混用。杯身/把手无图集，预算紧时也优先彩色。
- 原16位法线、作品格式、城市稿、字框、几何、UV、花纹图像与材质参数保持原数据。没有运行素材生成器。
- 保留手机128/192MiB和桌面256/384MiB常态/峰值预算；不为升级花纹回退当前城市高清。近看有需要时DPR按0.25下降至最低1；本轮模拟手机从1.5调到1.25后容纳4K花纹，城市仍standard。
- 颜色档位参与导入、回滚、上下文恢复状态；debug增加实际贴图尺寸，检查应用后的纹理，而不只看下载成功。

主要代码：src/resources/fixed-quality.ts、client.ts、src/main.ts；style-manager.ts增加实际颜色尺寸诊断。交接PERFORMANCE.md同步阈值和预算流程。

## 验证

- `npm test`：48/48通过，包括新增自由缩放候选、隐藏部件预算和全部9个资源版本的atlas兼容检查。
- 最终消费者构建一次：`npm run build -- --outDir <task scratch>/build --emptyOutDir`，TypeScript和Vite通过；既有650kB chunk提示仍存在。
- `BUILD_ROOT=… node tools/v7/check-build.mjs`：196资源通过；新建空暂存树1248文件、518530977字节（含build-source.json）。没有复用旧线上构建。
- 源码预览 `http://127.0.0.1:5299/`：51项通过；浏览器为已有Chrome/Playwright，Browser插件未提供。
- 从实际静态压缩包解出后在 `http://127.0.0.1:5300/`：51项通过、控制台/运行错误0。检查桌面1440×1000和模拟手机390×844；默认2048、自由滚轮放大4096、花纹和杯碟4096、真实纹理尺寸、稳态/峰值预算、显隐/复位、选择保持、同版本作品导入、无溢出和无框架错误覆盖。
- 额外模拟手机单件检查：杯身色图850×2048、把手色图352×4096，保留RG16F法线。全部截图和JSON保存在任务scratch；精简证据在evidence目录。
- 人工检查打包页面的桌面与手机花纹截图，花纹线条清晰，无可见图集接缝。手机与桌面截图见evidence/mobile-flowers.webp、desktop-flowers.webp。没有新实体手机验收结论。

过程中先修正了测试读取不存在的manifest固定名（实际由catalog给出哈希路径）和诊断字段TypeScript类型；首次混合通道探针发现atlas校验仍用低档像素尺寸，改用彩色色图的atlas参数后通过。归一化坐标相同，法线/ORM仍正确对齐。失败探针原始记录保留在scratch，没有标为通过。

## 正式主页交付

目录：`/Volumes/Prism/广彩交付/中国杯-V7.1.12-正式主页-花纹提清`。

| 文件 | 字节 | 用途 |
| --- | ---: | --- |
| source-main.tar.gz | 662226666 | 可维护源码、运行资源、必要原件及测试；不含node_modules、Git历史或凭据 |
| production-main.tar.gz | 369883765 | 当前7.1.12静态主页，可托管；不是旧线上7.1.11快照 |

两包保留已发布资源以兼容旧作品。源码包对package.json、vite.config.ts、tsconfig.json作已记录的交付范围覆盖，构建仅index.html。静态包仅1个HTML入口index.html，无dev/compare/coverage/bezier-lab/APEC二期页面；正式深圳保留原稿。

打包命令：`python3 -B tools/package-china-main.py <new output> --build-root <validated build>`。打包器核对当前干净提交、build-source.json、版本和资源bootstrap；旧线上模式必须与当前源码版本相同，否则拒绝混用。

归档校验：source 1016成员（1012清单文件+4生成说明），静态656成员（655清单文件+HANDOFF）；逐成员SHA-256与字节数全部一致，压缩包整体SHA-256与receipt一致。静态回读直接使用解包后的文件，没有再次构建或安装依赖。完整摘要在交付目录的verification.json与package-receipt.json。

- source SHA-256：`456276ef5f8a3883367118f30e4d34c1f68435db6c767eb5d810775aaf6ce75a`
- static SHA-256：`df9881d9928a8a4115025d4aac1eb455cfc7a66bb650256022f65d0a6b6c2ef4`

包内README-开发交付.md说明npm命令、静态根目录、同源配置、版本来源及未部署状态。线上仍为前序7.1.11，本轮未推送、远端合并、打标签或部署。

## 暂存清理与交付状态

停止5300验包服务器后，仅删除本轮精确生成的build和package-check两个目录，合计900486372逻辑字节；清理回执见evidence/cleanup.json。交付包、小型证据及源码预览缓存保留，5299源码预览继续运行。没有删除历史deployments、素材原件、依赖或其他工作树。

功能/打包实现提交前后源码干净；本记录及必要证据作为后续文档提交。版本Issue仍使用7.1.12本地待建草稿，GitHub恢复后按发布授权另行推进。用户可直接取得当前两个交付包；本地构建、包验证和实体/线上验收分别记录。
