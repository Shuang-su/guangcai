# 来源与实现边界

- 用户分享：https://chatgpt.com/share/6ad1ec23-41bc-83ee-ae5b-d0cb4110588b 。读取公开页面的序列化文本后确认新版方案指向 ios-vibrator-pro-max；对话还说明 iOS 18 开始原生开关触感。
- WebKit Safari 18：https://webkit.org/blog/15865/webkit-features-in-safari-18-0/ 。原生 switch 触感的官方依据。
- WebKit 修复：https://github.com/WebKit/WebKit/commit/fc1ef83eae10068fe468587d959e868041ddfe03 。脚本 label.click 不应转成可信点击。
- 新版实现：https://github.com/samdenty/ios-vibrator-pro-max ，审查版本 3.0.4，源树 `032cc0aed2b8097d7d5cd8e286fedd63d5e85d11`。`movable.ts` 展示实际触摸下的 switch 方向／位置调整；作者报告不是本任务真机证据。
- 原库会覆盖 document.body、重新挂载全页面、替换部分控件指针捕获并运行授权等待循环。本项目只局部适配核心控件机制，没有导入这些全局行为。ISC 声明及署名保存在 public/third-party/ios-vibrator-pro-max-NOTICE.txt。
- 标签按钮参考：https://github.com/tijnjh/ios-haptics 。直接触摸标签的默认激活与脚本点击是不同路径。

自动化模拟旧版标签信任语义与原生 switch 能力，仅用于检查分支和事件路由。未在真实 iOS 18／26.5／27 手机验证马达，不能把请求成功或 checked 改变描述为真实震动已验收。
