# 排查证据与来源

- 用户实机反馈：V5.4 只有第一下有反馈，拖动没有震动。此反馈优先于之前的 Chrome 能力模拟通过结果。
- 上游 movable.ts：https://github.com/samdenty/ios-vibrator-pro-max/blob/032cc0aed2b8097d7d5cd8e286fedd63d5e85d11/src/methods/click-passthrough/movable.ts 。初次按下保留完整目标，发生移动才变换小型开关。
- WebKit 原生实现：https://github.com/WebKit/WebKit/blob/main/Source/WebCore/html/CheckboxInputType.cpp 。touchstart 约 200 ms 后开始 held tracking；touchmove 基于原生渲染器坐标判断开关视觉状态；JavaScript 修改 checked 会终止追踪。代码审查日期 2026-10-16。
- WebKit iOS 主题：https://github.com/WebKit/WebKit/blob/main/Source/WebCore/rendering/ios/RenderThemeIOS.h 。支持原生反馈时 PointerTracking 触发可进入反馈路径；这不证明具体设备实际执行。

可复现的实现差异：

1. 将加强后的测试运行于已发布 V5.4 对应的本地生产构建，旧版在“#color-pad keeps full native target through touchstart”失败：按下请求立即把原生开关缩成 28 × 12.4。
2. 旧代码将 4–8 ms 的请求有效期与每次 pointermove 的奇偶翻转耦合；稀疏刻度与高频事件可能反复采到相同方向，也可能在下一次原生触摸移动前过期。
3. 控件按下后会平移／放大，旧代码直接把屏幕像素当本地 CSS 像素使用。修正后浏览器验证原生目标中心与最初触点误差小于 2 px。

修正方向：刻度请求合并为 pending，在可信 touchmove 中消费一次，交替方向并保持到下一个刻度；按下不缩小；根据当前控件变换换算触点坐标，并在默认触摸处理前刷新小目标几何。没有用 JavaScript checked 切换冒充原生反馈，没有后台定时震动。

本轮仍不能证明真实手机马达已经修复。诊断入口只本地显示／由用户主动复制系统与事件数据，不自动上传。任何实际震感结论以设备复测为准。
