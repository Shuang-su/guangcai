# 拖动脉冲修正计划

基线 f16bc5c，分支 codex/ios-drag-pulses，关联既有 Issue #25。

1. 对比 ios-vibrator-pro-max 的 movable.ts 与 WebKit CheckboxInputType.cpp，区分点击反馈、可信 touchmove 下的开关追踪和 JavaScript 请求计数。
2. 保留原生 switch 的按下初始化；将 iOS 刻度作为待消费请求保持到真实 touchmove，再交替方向；不把 4–8 ms 的 Android 马达持续时间当作 iOS 开关激活窗口。
3. 去掉空闲事件反复重写方向的逻辑，让同方向拖动、稀疏刻度和不同事件频率仍可形成交替的原生目标状态。释放、取消与隐藏时清理。
4. 增加原生触摸移动／方向切换证据和按需诊断视图；强化浏览器检查到控件几何及方向，不再把请求次数作为震动成立的证据。
5. 运行构建、相应测试与线上回归，发布 V5.4.1 预览并保留 checkpoint。未获真实设备反馈前，只报告修正已接入，不报告震感已验收。
