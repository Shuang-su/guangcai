# 归档入口

所有版本都在同一个私有仓库 `Shuang-su/guangcai`。当前 `main` 提供入口，源码已推送到相承的 PR 分支，等待审查合并。

- [完整源码与归档版本索引](https://github.com/Shuang-su/guangcai/tree/codex/import-2.1)：包含原版 1.0 和中国杯 2.1 归档，2.0 在 Git 历史中。
- [1.0 原版独立源码](https://github.com/Shuang-su/guangcai/tree/codex/import-1.0/guangcai-viewer) · [issue #1](https://github.com/Shuang-su/guangcai/issues/1) · [PR #4](https://github.com/Shuang-su/guangcai/pull/4)
- [2.0 中国杯上线基线](https://github.com/Shuang-su/guangcai/tree/codex/import-2.0/guangcai-china-preview) · [issue #2](https://github.com/Shuang-su/guangcai/issues/2) · [PR #5](https://github.com/Shuang-su/guangcai/pull/5)
- [2.1 中国杯已发布布局修订](https://github.com/Shuang-su/guangcai/tree/codex/import-2.1/guangcai-china-preview) · [issue #3](https://github.com/Shuang-su/guangcai/issues/3) · [PR #6](https://github.com/Shuang-su/guangcai/pull/6)

- [历史提交索引：16 个可检出源码节点](https://github.com/Shuang-su/guangcai/blob/codex/reconstruct-history/HISTORY.md) · [完整恢复分支](https://github.com/Shuang-su/guangcai/tree/codex/reconstruct-history) · [Issue #7](https://github.com/Shuang-su/guangcai/issues/7) · [PR #8](https://github.com/Shuang-su/guangcai/pull/8)。该 PR 接在 #6 后，旧提交与导入分支保留。

1.0 / 2.0 均由完整源码重新构建，分别有 78 / 122 个发布文件逐字节匹配历史部署。归档期间另一任务发布了 2.1，随后追加归档，131 个发布文件也全部匹配。完整源码、PSD / PDF / JPG 设计副本、生成母版、运行贴图、历史证据与冻结部署文件均已保留。

本次归档没有重新部署或连接 Netlify Git 自动发布。历史补录已覆盖 16 个构建，8 组历史发布共 841 项文件逐字节一致，23 份 before 源码一致。原版当前仍为 1.0；另一会话于 2026-10-13 19:08 发布的背景功能 `6ace111ab0415c9455a3c6f8` 超出本批截止 2.1 的归档范围，不能把此归档称为当前中国杯线上源码。后续修改使用对应系列的 x.1 / x.2 编号，代码进度与部署状态分别记录。
