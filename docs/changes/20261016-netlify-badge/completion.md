# Netlify 品牌标识遮挡修复

2026-10-16，分支 `codex/hide-netlify-badge`，源码基线 `45f6578`。状态：**线上已生效，目标流程验证通过**。

## 原因与改动

页面的 `Powered by Netlify` 由平台边缘响应注入，手机 DOM 中为固定右下角的 `iframe#nl-badge-frame`，尺寸 202×64 CSS px，z-index 2147483645。代码仓库没有添加该组件。项目配置的 `built_with_badge_enabled` 原为 true。

对站点 `b1fce272-cf28-41e5-8366-024c314b615f` 执行单字段 PATCH：`{"built_with_badge_enabled":false}`。服务端回读为 false，公开 HTML 不再包含 `/.netlify/scripts/hud?variant=public`。这是项目级关闭，对所有访客的下一次页面请求生效。没有设置本机隐藏状态、遮盖 CSS 或改变访问权限。

[Netlify 官方说明](https://docs.netlify.com/manage/projects/powered-by-netlify-badge/)说明此设置无需重新部署。产品仍为 V5.3／5.3.0；发布 ID `6ad1e6cde46366079e077a4c` 与修改前完全相同。应用源码、纹样与材质均未修改；其他项目未操作。

## 验证

Browser 插件不可用，使用现有 Playwright 和已安装 Chrome。目标流程：线上首页 → 页面右下角与底部控件 → 点击“浮雕近看”、返回“建筑面”、切换天津和青绿配色 → 标识持续不存在且操作生效。

- 手机模拟：390×664，iPhone 13 用户代理；桌面：1200×900。两组均为新建浏览器上下文，没有任何事先隐藏徽标的 localStorage。
- 两组标题／页面版本正确，canvas 正常加载，徽标 iframe 与注入脚本均不存在，无框架错误覆盖和意外控制台／运行时错误。
- 底部“浮雕近看”点击后实际视角变为 detail；天津青绿选择正常应用。
- 原稿对照页同样不再注入标识。
- 修改前／修改后截图、配置回执和浏览器结果保存于 evidence。未新增真实手机或 Safari 验证。

本轮为托管设置调整，不重新构建、不新建部署，不执行 push、PR、合并或 tag。任务记录与验证证据保存为本地 checkpoint，其 SHA 在随后的记录提交补记。
