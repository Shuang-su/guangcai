# V6 工作记录

关联 Issue： https://github.com/Shuang-su/guangcai/issues/27 。起点 f0c0cc3；分支 codex/v6-webgl2-studio。

## 第一阶段：玻璃后端

已保存 Glass-HQ 9f5bfc7 的 108 个上游文件与 MIT 许可，并实现与原接口兼容的 WebGL2 材质图后端。原 GPU 文件保持原样；迁移补丁记录见 vendor/glass-hq/PATCHES.md。

验证：141 项上游 core/DOM 测试通过；本机 Chrome 中 28 组 WebGPU/WebGL2 输入输出全部逐字节一致，包括两张平面。材质图证据为 evidence/glass-v6/parity-initial.json。第一次上游测试因 ExFAT 的 AppleDouble 文件被误收集而失败，改用排除 ._ 的明确文件清单后通过，没有改写测试逻辑。

仍在进行：消费者界面、素材编译与组合、缓存拆分、完整回归、独立发布和远端合并。此记录不代表整个 V6 已完成。

首个 checkpoint SHA 由下一阶段记录补入，避免提交自引用。

## 用户中途反馈

2026-10-17：用户指出 slogan-open-proof.webp “字重不对好像”，提供同一金字参考图。确认 FontFace 已加载官方子集，weight=400；六套 WOFF/WOFF2 输出一致，没有合成加粗。首版字号占边框宽度 0.56、末字触及下卷纹，现改为 0.44，并调整四字中心与留白。原始字体未改写。此项排版修订不宣称与参考图笔画完全一致，待用户视觉反馈。
