# V5.4.1 拖动脉冲修正

状态：**V5.4.1 修正代码已发布并通过线上回归，真实设备连续震感仍待复测**。基线 f16bc5c，分支 codex/ios-drag-pulses，关联 Issue #25。

## 用户反馈与判断

用户报告 V5.4 在真实设备上只有第一下有反馈，后续拖动没有震动。上轮通过的请求计数测试不足以证明硬件效果，本轮把该行为记录为未通过实机验收。

对比上游与 WebKit 源码发现三个实现问题：按下时提前缩小原生开关、4–8 ms 窗口与 pointermove 奇偶翻转耦合、控件放大后的屏幕／本地坐标未换算。加强后的检查对 V5.4 旧生产构建在 touchstart 目标尺寸处失败，保存了回归证据；这证明实现差异，但不能单独证明这些就是用户设备上的全部原因。

## 修改

- iOS 拖动刻度请求保持为 pending，到真实 touchmove 消费一次并交替方向，空闲移动维持方向；不把 Android 的马达时长当作原生 switch 的时间窗口。
- 按下保留完整原生目标，移动后再应用小开关几何；按当前控件缩放计算局部坐标，并在原生默认事件处理前读取几何以更新布局。
- 保留按钮兼容与 Android 路径、真实触摸要求、节流、减少动态效果和取消清理。没有加入定时模拟点击或改变 checked 来假装原生拖动。
- 增加仅由 ?haptics-debug 打开的本地诊断面板，可复制浏览器、能力分支、原生事件与方向变化计数。数据不自动上传，计数明确不等于马达反馈。
- 更新为 V5.4.1／5.4.1；图样、全填色、金线及创作布局不变。

## 验证与边界

Browser plugin not available；采用工程现有 Playwright／Chrome。加强专项覆盖按下保持全尺寸、真实 touchmove、方向交替、放大时触点锚定误差小于 2 px，以及颜色／材质／明度实际变化、取消和销毁。三种能力路径共 70 项检查通过；诊断入口与用户主动复制检查通过。最终生产构建检查与线上结果将在下方补充。

仍未连接真实 iPhone。当前仅能报告修正与事件／几何验证，不报告实际震感已修复。用户补充 iPhone Air／Safari 27.0.1 与 iPhone 16 标准版／Safari 26.6.1；这两个报告版本的分类检查均为 ios-gesture。实机复测仍开放；若仍失败，可用诊断数据区分没有收到触摸、方向未切换与系统未产生反馈。

## 存储

卷空间约 503 MiB，不足新不可变发布快照。逐一核对当前已提交、在 sparse 范围外的 V5.4 归档 1090 个 Git blob 后，仅取消其工作树实体文件，Git 对象完整保留，可从 f16bc5c 精确恢复；没有删除未跟踪内容、源码或素材。恢复收据见 evidence/sparse-snapshot-receipt.json。

生产流水线完成 10 项素材检查、35 项应用测试、TypeScript／Vite 构建及 122 项本地浏览器回归。109 个权威文件摘要与最终源码一致，1087 个预备构建文件封存。所有城市原稿与运行纹理无差异。

最终生产构建另有 70 项触感专项检查通过（原生 API 18、旧 iOS 分支 26、新 iOS 分支 26）；完整回归和专项结果均对应本次构建。源码 checkpoint 为 `e715ed194cee85d635e81d745e15fbff36ab6df9`；发布快照与完成记录由后续独立 checkpoint 保存。

## 发布与回读

- 生产站点：https://guangcai-no1-china-v5.netlify.app/ 。
- 诊断入口：https://guangcai-no1-china-v5.netlify.app/?haptics-debug 。
- 不可变预览：https://6ad1fef61332ac9c795b3c15--guangcai-no1-china-v5.netlify.app/ 。
- 部署 `6ad1fef61332ac9c795b3c15`，源码 `e715ed194cee85d635e81d745e15fbff36ab6df9`，版本 5.4.1。
- 服务端需要 3 个变更内容文件；1088 个发布条目摘要匹配，公开标题／release.json／当前 published_deploy 一致。
- 线上 122 项完整浏览器回归与 70 项加强触感检查通过，无意外应用／着色器错误；这些仍是 Chrome 能力模拟与事件／几何检查。
- 25 套城市图样、26 个选项、全填色与固定金线保持；Netlify badge 为 false，公开 HTML 没有 HUD 注入。旧 V4／V3／早期中国杯发布 ID 不变，Git 自动部署仍关闭。
- 新快照 deployments/guangcai-no1-china-v5/6ad1fef61332ac9c795b3c15/ 已逐一复算 1088 个文件 SHA-256，全部匹配。
- 保留本地 5247 生产预览与原 5236 预览；关闭本轮 5250 测试服务。未 push、PR、合并或打 tag。

本轮发布复用工程已审计的 Netlify 摘要脚本与只在 Node 进程内生效的 DNS 端点修正；没有改变系统设置，也未保存凭据。

[完整线上回归](evidence/online-qa.json) · [触感专项](evidence/haptics-online-qa.json) · [公开回读](evidence/production-readback.json) · [发布回执](evidence/deploy.json) · [归档校验](evidence/archive-validation.json)。

## 用户后续确认与启动延迟（2026-10-16）

用户确认“脉冲已经可以了”，并明确快速拖动时只有震动未跟上、数值正常。此前的“连续脉冲待复测”已收到正向用户反馈，但未获得每台手机分别测得的延迟。WebKit 约 200 ms 识别等待与短视口放大限制另有[诊断记录](../20261016-ios-startup-audit/completion.md)；不将这些边界标为已解决。
