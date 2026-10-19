# 广彩：2026-10-19 参考与功能核对

当前版本 Issue #35 已明确 V7.1.3 / v7-4 的实现、独立预览与剩余验收。不能将参考库更新记为新产品发布。

| 维度 | 比较 | 建议与做法 |
|---|---|---|
| 二维控制 | XYSlider 是 SwiftUI 单文件二维控件；归一化坐标和圆点反馈可参考，但不能直接作为 Web 组件使用 | #25 保留真正二维材质与色相/饱和度契约；移植交互思想，独立实现 Web 指针/触摸与可访问性 |
| Liquid Glass | 上游 0.0.2 声明跨浏览器分层、按模块分发及 progressive blur 改进，属于界面玻璃库 | 仅研究 UI。不能替代瓷器、花纸、金属与杯体真实几何/PBR；性能数字是上游自述，未在本项目复现 |
| 加载预算 | #35 的既有证据为约 12.1 MB、13.6 秒；原 5 MiB/6 秒目标仍未通过 | 优先研究启动关键资源与按需分档，保留模型/材质稳定性和后台可还原性，不能改验收线冒充通过 |
| 后台路径 | #33 追问相对 thumbnail 路径来源；#29 承接跨版本后台交接 | 需按生成器、manifest、部署基址及 COS 目录一起解释，不能只把相对 URL 换成绝对字符串 |
| 实物/设备 | 花纹、白瓷连接、历史版本还原与设备稳定性已有独立记录 | 原件及历史资源不变；#35 保持设备与正式后端联调未验收状态 |

旧参考、版本索引、素材原件和部署归档保持不变。

## 固定来源登记（新增）

以下 HEAD 与 release 分别记录；不把 HEAD 冒认为 release 的提交。许可证列为 GitHub 元数据初筛，未知/NOASSERTION 不能作为复制许可。能力判断未特别注明时属于源码文件/官方文档核对，没有重新做产品运行验证。

| 仓库 | 本次固定 HEAD | 最新公开 release | 许可识别 |
|---|---|---|---|
| [Glass-HQ/liquid-glass](https://github.com/Glass-HQ/liquid-glass) | [9f5bfc7daa7b](https://github.com/Glass-HQ/liquid-glass/tree/9f5bfc7daa7be5d20a41b94d841b8f065de655fc) | v0.0.2 | MIT |
| [lushm0nstera/XYSlider](https://github.com/lushm0nstera/XYSlider) | [9f2e92f123f5](https://github.com/lushm0nstera/XYSlider/tree/9f2e92f123f50cf843f15bd08665b71f4a20c9e3) | 无已核实 release | MIT |

## 项目来源与任务

项目远端固定提交：[ccd1edc5118e](https://github.com/Shuang-su/guangcai/tree/ccd1edc5118e4e565d4378fb26fb3b8e9442daa6)。

- [#35 V7.1.3：实拍花纹、白瓷连接与杯碟高清修正](https://github.com/Shuang-su/guangcai/issues/35)：保留现有验收；状态不由版本新旧决定。
- [#33 关于backend-config.json文件中的资源路径问题](https://github.com/Shuang-su/guangcai/issues/33)：保留现有验收；状态不由版本新旧决定。
- [#29 V7 开发交接总入口：后台配置、性能机制与接入验收](https://github.com/Shuang-su/guangcai/issues/29)：保留现有验收；状态不由版本新旧决定。
- [#25 feat(china): 引入 iOS 风格方形调色盘与多参数二维材质面板](https://github.com/Shuang-su/guangcai/issues/25)：保留现有验收；状态不由版本新旧决定。
- [#14 中国杯 V4：城市款式、可选文字与材质对照](https://github.com/Shuang-su/guangcai/issues/14)：保留现有验收；状态不由版本新旧决定。
- [#11 [3.0] 原始花纸、白瓷光效与平盖校准](https://github.com/Shuang-su/guangcai/issues/11)：保留现有验收；状态不由版本新旧决定。

## 执行边界

本记录只新增参考与比较，不覆盖旧登记、源码、素材、版本或验收证据。采用/延后是后续工程建议，不表示产品接入已获验证。未知远端现场与设备状态保持未知；本轮没有发布。

## 本轮已核实的路径解释

资源生成器以编码字节 SHA-256 前16位命名；跨版本通过 path.relative 复用旧资源；后台导出器以 manifestPath 与 previewBase 解析完整地址并核对完整摘要。已在 Issue 33 追加固定源码链接与接入建议，不改变原格式。
