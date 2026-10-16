# V5.4 iOS 触感兼容

状态：**V5.4 已发布，线上回归及归档核验通过，真实 iPhone 震感待实机验收**。基线 `32c586f`，任务分支 `codex/ios-haptics`，关联既有 Issue #25。

## 实际改动

读取用户分享对话后，采用其中新版 `ios-vibrator-pro-max` 3.0.4 的原生 switch 手势机制，并保留旧系统按钮兼容路径。原生 `navigator.vibrate` 可用时继续原路径；iOS 18 起且标签仍转发可信事件时，按钮使用同步标签请求；iOS 26.5+、已修复标签信任的平台或未知新版使用真实标签点击。两种 iOS 的持续拖动都使用真实 switch 手势，避免旧标签授权在长拖动中到期。

辅助控件仅附着于色盘、材质盘、明度和原有触感按钮；不重新挂载 body，不改写 navigator 或指针捕获方法，不引入后台弹窗或授权等待循环。保留真实触摸、可见页面、减少动态效果与 55 ms 节流规则，取消／销毁会移除辅助状态。补充旧 Safari MouseEvent 没有 pointerType 时的可信触摸来源记录，键盘和脚本点击不触发请求。金线、全填色、25 套城市构图加中国旧款的 26 个选项不变。产品编号同步为 V5.4／5.4.0。

V5.3 保存的 171 项保护摘要继续作为历史证据；素材测试检查其中 127 项非前端文件，新 UI 以本轮应用与浏览器测试验证，未篡改旧清单。第三方 ISC 声明与上游来源随站点发布。

## 验证

- 10 项素材检查、35 项应用测试、TypeScript 与 Vite 生产构建通过。
- 完整本地浏览器回归 122 项通过，涵盖 25 套构图、换城缓存与失败恢复、全填色、固定材质、桌面及 390／600／844／1280 视口、触摸与相机交互。
- 对最终生产构建运行三种能力分支：原生 Vibration 17 项、旧 iOS 18 项、新 iOS 18 项，总计 53 项全部通过，无应用错误。
- 专项检查按钮单次触发、重复页签静默、键盘静默、超过一秒的颜色／明度拖动、真实参数变化、相机不转动、释放／取消清理、减少动态效果、应用销毁移除辅助控件。
- Browser plugin not available；采用工程现有 Playwright 和已安装 Chrome，模拟 iOS 能力分支与旧标签信任语义，未安装新依赖。最初旧分支测试受到 Chrome 新信任语义影响，已修正能力探针模拟并重跑最终构建，不能把模拟视为真实 WebKit 运行。
- 最终 prepare.json 的 108 项权威源文件摘要均与当前工作树一致，1087 个预备构建文件封存。专项截图目视检查：控件外观和手机布局保留，无新增可见开关或遮挡。

## 存储与恢复

构建前卷剩余约 635 MiB。对 sparse checkout 范围外、已提交的 V5.2 归档逐文件核对 1089 个 Git blob 后，只取消其工作树实体文件，Git 历史与归档对象保留，未删除未跟踪内容。可从 `7fe96a1` 精确恢复；恢复命令和核验字节数见 evidence/sparse-snapshot-receipt.json。新旧原稿与正在运行的原 5236 预览保留。

## 验收边界

没有连接真实 iPhone，自动化确认的是事件、参数、取消和请求路由，不能证明 Taptic Engine 实际工作。iOS switch 是系统原生反馈，不是任意强度／持续时间的网页振动 API；实际效果受系统、设备和触感设置影响。iOS 17.x 或缺少所需能力的平台静默降级，颜色和材质仍可操作。

本轮未 push、创建 PR、合并或打 tag。源码 checkpoint 为 `fb2ce4078d47d618da908348c2d3eaf4a57b65bb`；发布与归档证据随紧接的独立 checkpoint 保存。

## 在线发布与回读

- 站点：https://guangcai-no1-china-v5.netlify.app/ 。
- 本次不可变预览：https://6ad1f73c185ae5e7e363f9b6--guangcai-no1-china-v5.netlify.app/ 。
- 部署 ID `6ad1f73c185ae5e7e363f9b6`，源码 `fb2ce4078d47d618da908348c2d3eaf4a57b65bb`，版本 5.4.0。
- 只上传 6 个内容变化文件；服务端 1088 个发布条目摘要核对通过，published_deploy 与本次部署相同。
- 完整线上浏览器回归 122 项通过；线上触感能力模拟另 53 项全部通过。页面标题、应用内容、截图、实际调色、触摸取消和控制台均已核验；手机视口为 Chrome 模拟。
- 主域公开 release.json、目录 25 套城市图样、V5.4 标题一致；Netlify built_with_badge_enabled 仍为 false，公开页面没有 HUD 注入脚本。
- 旧 V4、V3、早期中国杯站点的 published_deploy 不变，Git 自动部署仍关闭。缺失文件返回 404。
- 不可变发布保存在 deployments/guangcai-no1-china-v5/6ad1f73c185ae5e7e363f9b6/，1088 个文件逐一 SHA-256 复算一致。
- 本地 5247 生产预览保留，原 5236 预览未改。5250 开发测试服务已停止。

沿用工程 Netlify 文件摘要发布脚本与现有登录。api.netlify.com 的本机 DNS 存在合成地址映射，本次先通过公开 DNS 与正常 TLS 验证实际端点，再复用仅当前 Node 进程的 DNS 修正；没有更改系统代理／DNS，也没有保存凭据。日志保留构建工具原始空白；源码与文档 diff 检查通过，不改写原始日志或部署字节。

[发布回执](evidence/deploy.json) · [主域回读](evidence/production-readback.json) · [完整线上检查](evidence/online-qa.json) · [线上触感分支检查](evidence/haptics-online-qa.json) · [归档校验](evidence/archive-validation.json)。
