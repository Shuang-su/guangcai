# V6 城市母版

唯一正式来源是 `assets/source/v6/` 中保留的本次 23 城稿件，逐项来源和 SHA-256 见 provenance.json。原始目录不被生成器修改。旧款保留在 v4/v5 目录及 dev 选择器中。

`cities.json` 固定 5433×2365 母版与 4096×1783 运行输出。结构线和闭合填面独立；全填色不增加镂空。原稿已有的山线、桥和底线按来源保留，V4 缩放偏移只在运行输出应用一次。

`compile-city-v6.py` 提取白底金线、矢量化轮廓、生成独立 RG 结构/填色遮罩与线条法线。城市选卡使用同一结构线生成透明 RGBA 缩略图，裁去外部留白；不会改动杯身通道。源图和完整可编辑 SVG 仍可在 audit 逐城检查。

`slogan-frame.svg` 根据原 PNG alpha 轮廓矢量化，双线和卷纹保留。`compile-slogans-v6.mjs` 等待官方 FontFace 完成加载，用 Regular/400 生成六套独立文字框遮罩；WOFF/WOFF2 分开渲染并对照，不允许系统字体替代。

`review.json` 的 agent-reviewed 表示来源及实现审核；不等于用户视觉批准或可制造性认证。真实制作尺寸仍需另做工艺确认。

Python 依赖见 `tools/requirements-v6.txt`，Node/sharp/Playwright 使用项目 lockfile。运行前确认磁盘空间，缓存放 `.codex-work/`。不要在尚未核对的新稿上覆盖旧证据或使用旧审核哈希。
