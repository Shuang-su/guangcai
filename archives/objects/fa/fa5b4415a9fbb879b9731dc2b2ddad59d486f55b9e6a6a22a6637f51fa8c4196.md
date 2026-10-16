# 中国杯独立站部署完成记录

开始：2026-10-11。完成：2026-10-12（Asia/Shanghai）。用户授权：搞定就上线，并询问新域名是否在旧名称后添加后缀。

## 已发布地址

- 新版三维预览：https://guangcai-no1-china.netlify.app/
- 素材与对照：https://guangcai-no1-china.netlify.app/evidence.html#relief-update
- 固定版本：https://6acbb71a68f1fd6c5f369182--guangcai-no1-china.netlify.app/
- 管理页面：https://app.netlify.com/projects/guangcai-no1-china
- 项目 ID：8d9dfdb3-270a-46c5-9dde-0fe4ddc2662f
- 最终部署 ID：6acbb71a68f1fd6c5f369182
- Netlify 回读：ready，production，error_message 为 null，published_at 为 2026-10-11T16:19:41.478Z。

命名是在旧站名 guangcai-no1 后添加 -china，位于 .netlify.app 前面。这是独立站点，没有另购自定义域名。旧站 https://guangcai-no1.netlify.app/ 保持项目 cdc49df3-1e59-4e37-99ac-962584f050a6 和部署 6abbdf78d912b4b6b1d7c3b9，已在发布后回读核对。

## 实际操作

1. 读取旧项目部署记录与远端项目，核对现有 Netlify CLI 登录和 shuang-su 团队；创建新站并关联当前预览副本。
2. 保持非 Git 状态，未初始化 Git、连接 CI、push、创建 PR 或修改旧站。`.netlify` 已忽略；项目 ID 关联保存在当前目录 `.netlify/state.json`。
3. 以当前构建制作发布目录 `.codex-work/deploy/china-20261012-network/site`。98 个文件共 40,201,772 字节，源 PSD、PDF、完整生成资料和旧花纸母版不在发布目录。保存不可变逐文件 SHA-256、SHA-1 和大小清单。
4. 新站初始浮动 Netlify 角标会干扰手机按钮，按旧站设置关闭 built_with_badge_enabled，公网确认没有 HUD 注入脚本。没有变更套餐、计费或账号安全设置。
5. 首轮公网图像传输慢，并出现 HTTP/2 中断，未把平台 ready 直接当作完成。追加无损传输优化与可恢复加载，再向前发布到同一新站。
6. 16 张运行时贴图使用无损 WebP，16,796,918 字节降至 10,399,564 字节，约减少 38%。每张解码为 RGBA 后均与原 PNG 完全一致。PNG、高度源和原素材保持原样。固定花纸初始只加载实际渲染使用的四种通道，未使用的高度源继续保存供制作与下载。
7. 新增 `src/styles/load-texture.ts`，限制并发为 4，单次超时 120 秒，HTTP(S) 请求最多尝试 3 次。重试使用新的查询参数；data/blob 等本地来源不重试。首次全部资产与反射就绪后才显示“已载入”，未完成时持续显示加载提示。
8. 构建前自动执行 `tools/web-textures.mjs`，生成并逐像素校验副本。新增可重复制备发布目录的 `tools/prepare-china-release.mjs` 与公网验证 `tools/china-online-qa.mjs`。

## 验证结果

- 构建：TypeScript 与 Vite 通过，最终 JS 为 assets/index-CBUn9qKs.js。
- 本地完整回归：43 项通过，错误 0，文字换色测试局部像素差均值 0；损坏通道、尺寸／定位异常、快速切换和 GPU 计数稳定检查通过。此回归在生产预览上执行，避开开发热更新干扰。
- 故障注入：主动中断第一次固定花纸请求，第二次请求自动恢复，完整模型 ready，错误面板未显示。
- 源文件保护：33 个受保护文件 SHA-256 完全不变；原项目 104 个源码／素材文件、3 份源资料、11 个城市图通道及 15 个固定通道均核验通过。
- 公网：19 项验收通过。公开 HTTPS 无需登录；版本 3 城市与固定材质完整；邻近几何反射、开关恢复、文字面、拆解跟随、手机视口、校准面板通过。
- 对照页：24 张实际图像全部 decode 成功，手机无水平溢出，参考滑杆通过真实键盘输入改变裁切位置。
- 路由与缓存：缺失贴图真实返回 404；哈希 JS 使用 immutable；稳定名称贴图使用 must-revalidate。
- 发布一致性：Netlify 当前部署的文件索引中 98 个发布文件 SHA-1 与大小全部匹配暂存清单。API 将文件名规范化为小写，比较时仅折叠文件名大小写，hash 与字节数不改；保留原始索引。另对两个 HTML 与构建 JS／CSS 核对公开响应 SHA-256，仅移除已观察到的固定 Netlify 托管说明注释。
- 页面／着色器运行错误 0。模型检查与对照页检查分两段进行；前段结果保留在 online-model-stage.json，最终合并证据在 online-qa.json。对照页验证没有跳过隐藏图片。
- 冷启动：本机当时公网网络下，完整模型首次加载约 103.8 秒。它是实测网络限制，不是通用速度保证；首页有持续加载提示和有界重试。手机检查为 Chrome 视口模拟，不是真实手机或 Safari 实机验收。

## 过程中的失败和修正

- 初次生产发布已 ready，但浏览器 60 秒等待失败；真实图像请求出现 HTTP/2 中断，截图记录的是未完整加载状态，没有把它当作最终交付。
- 无损 WebP 后，45 秒单次超时仍会取消较慢的大图请求。最终改为并发 4 与单次 120 秒，公网完整模型随后实测成功。
- 新 Texture 辅助函数最初遗漏图片源泛型导致 TypeScript 类型检查失败，已显式使用 HTMLImageElement 后通过。
- 一次本地 QA 与开发热更新重叠，视角断言中断；随后使用固定生产构建重新执行 43 项全部通过。
- 对照页最初的 goto 等待 load 超过 60 秒；已改为先等 DOM，再明确等待全部图像解码，完成后复测滑杆、缓存及资源一致性。

## 证据及后续更新

`evidence/deployment/` 保存部署回执、远端状态、源素材保护、完整发布清单、原始文件索引、首轮失败、最终 19 项检查及 desktop/detail/text-face/mobile/evidence 截图。`README.md` 已更新线上入口、最终部署 ID、无损贴图流程与重新发布命令。

新域名不依赖本机预览服务器或外置盘在线。后续修改应构建并生成新暂存目录，明确指定新站 ID 发布；旧站继续保留。本目录不是 Git 仓库，因此没有 checkpoint commit。

## 面向用户回复摘要

已上线，域名采用旧站名后加 -china 的独立新站。提供新版与对照页链接，说明旧站保留、全量线上检查通过，以及当前网络下首次完整加载偏慢。原图像素与视觉参数保持一致。
