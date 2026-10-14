# 广彩工程与原件位置

2026-10-14 完成已核验旧工作区的磁盘整理。后续编辑、构建与部署暂存均使用初号機上的正式仓库；新开发仍沿用同一仓库与版本历史。

| 用途 | 位置 |
|---|---|
| 当前正式 Git 仓库 | `/Volumes/Prism_初号機/广彩/guangcai-v4-workspace` |
| 本机归档分支工作树 | 正式仓库内 `.codex-work/archive-index/` |
| 中国杯应用 | 正式仓库内 `guangcai-china-preview/` |
| 原始 PSD、花纸、线稿、照片视频与文档 | `/Volumes/Prism_初号機/广彩/素材原件/` |
| 旧 h5 工程 | `/Volumes/Prism_初号機/广彩/历史工程/h5/` |
| 9月早期杯子工程 | `/Volumes/Prism_初号機/广彩/历史工程/GuangcaiCeramic/` |
| 旧正式库完整 Git 元数据备份 | `/Volumes/Prism_初号機/广彩/历史工程/Git元数据/` |
| 本地会话摘录与旧站点绑定 | `/Volumes/Prism_初号機/广彩/历史工程/本地恢复资料/`，仅本地保存 |
| 原路径、文件哈希、恢复入口 | [来源索引](docs/changes/20261014-source-consolidation/source-index.md)与[本轮清理记录](docs/changes/20261014-workspace-cleanup/completion.md) |

Prism旧正式库、9月viewer输出、原型输出、内盘北京4.3副本及旧非Git 3.0副本中的已核验内容，均由Git/Git LFS归档恢复。内盘4.3工作树已注销，分支与原提交保留。旧依赖可按对应锁文件重新安装。

按原文件名恢复旧目录：在归档分支运行 `python3 tools/restore-source-folder.py --list` 查询来源；然后运行 `python3 tools/restore-source-folder.py prism-viewer /足够空间的空目录`。恢复过程核验每份文件哈希，不执行历史脚本。可用 `--prefix` 选择来源内的子目录。大文件需有真实Git LFS对象，不能仅下载指针。

素材原件是在同一卷内改名归位，保留原始字节；历史索引仍记录原始路径。实际位置变化见[迁移映射](docs/changes/20261014-workspace-cleanup/relocations.json)。

仍独立保留的边界：`/Users/shuangsu/Documents/New project/.git`是含其他项目的混合仓库，尚有早期云占位对象待下载，未删除也未整体迁移。22个失效历史附件路径继续保留缺口；本次整理不等于这些缺口已找回。Git归档PR与产品分支、线上发布分别管理。
