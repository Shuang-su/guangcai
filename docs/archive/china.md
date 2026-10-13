# 2.0 中国杯已上线基线归档

- 原项目：`/Volumes/Prism/Codex/guangcai-viewer-20260929/outputs/guangcai-china-preview`。
- 线上： https://guangcai-no1-china.netlify.app/ 。部署 ID：`6acbd24fa545c331cdd20dae`。
- 与 1.0 采用同仓库的独立目录，保留原版旁边的 `guangcai-china-preview/` 布局。
- 完整源码、锁文件、PSD / PDF / JPG 原稿副本、纹样母版、提示词、PBR 源图、WebP、历史变更和证据，以及 122 个实际发布文件均保留。
- 导入时来源目录正在另一任务中进行后续 2.1 布局修改。初次构建通过，但与已上线包有 4 个文件差异。已依据真实的修改前 before 文件和发布快照恢复 2.0；恢复路径、摘要及排除的进行中内容见 `china-2.0-recovery.json`。
- 恢复后重新运行 7 项几何测试、WebP 生成、TypeScript 检查和 Vite 构建，全部通过；122 个发布文件 SHA-256 全部与原发布清单一致。
- 3 份原稿副本与原始摘要一致；相邻原版 104 个保护文件与中国杯创建时的基线一致。
- 历史证据包含多个迭代，非发布路径的截图不能单独用作 2.0 发布证明。2.0 的准确信息以冻结部署目录、发布清单和本次重新构建对照为准。
- 来源目录仍由原任务维护，本次没有修改、初始化 Git 或重新发布该目录。本机捕获的 2.1 工作留在隔离暂存中，不冒充已上线版本。

文件清单见 `china-inventory.json`，验证见 `china-validation.json`；初次发现差异的记录为 `china-validation-initial-working-copy.json`。
