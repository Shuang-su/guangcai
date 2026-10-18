# 广彩工程与原件位置

三类工程的用途、Git归属和还原方法见[工程关系](PROJECTS.md)。

2026-10-18更新：当前维护main的独立交付仓库位于Prism。旧V6未提交SVG字节已单独提交为恢复证据；旧V6检出收窄为根目录说明文件并detach，删除已合并V6分支，保留共享Git数据与本地恢复资料，供旧V7和archive-index工作树使用。[保存与清理记录](docs/changes/20261018-v6-local-state-preservation/completion.md)。

2026-10-14的整理采用初号機上的主仓库；下表已同步本轮实际位置，历史记录中的当时路径仍保留。

| 用途 | 位置 |
|---|---|
| 当前main维护仓库 | `/Volumes/Prism/广彩/guangcai-v7.1.3-delivery`，独立Git元数据，无对旧仓库的alternates依赖 |
| 旧V6共享Git与最小检出 | `/Volumes/Prism_初号機/广彩/guangcai-v4-workspace`，保留`.git`与`.codex-work`恢复资料；不作为当前开发目录 |
| 本机资料归档核验工作树 | 旧V6目录内 `.codex-work/archive-index/`，其Git依赖保留 |
| 旧V7交接工作树 | `/Volumes/Prism/广彩/guangcai-v7-workspace`，仍依赖旧V6共享Git，不整体删除 |
| 中国杯应用 | 当前main维护仓库内 `guangcai-china-preview/` |
| 原始 PSD、花纸、线稿、照片视频与文档 | `/Volumes/Prism_初号機/广彩/素材原件/` |
| 旧 h5 工程 | `/Volumes/Prism_初号機/广彩/历史工程/h5/` |
| 9月早期杯子工程 | `/Volumes/Prism_初号機/广彩/历史工程/GuangcaiCeramic/` |
| 旧正式库完整 Git 元数据备份 | `/Volumes/Prism_初号機/广彩/历史工程/Git元数据/` |
| 本地会话摘录与旧站点绑定 | `/Volumes/Prism_初号機/广彩/历史工程/本地恢复资料/`，仅本地保存 |
| 原路径、文件哈希、恢复入口 | [来源索引](docs/changes/20261014-source-consolidation/source-index.md)与[本轮清理记录](docs/changes/20261014-workspace-cleanup/completion.md) |

Prism旧正式库、9月viewer输出、原型输出、内盘北京4.3副本及旧非Git 3.0副本中的已核验内容，均由Git/Git LFS归档恢复。内盘4.3工作树已注销，原提交保留在正式 Git 历史；已合并的旧分支名称于 2026-10-16 整理。旧依赖可按对应锁文件重新安装。

按原文件名恢复旧目录：在包含归档的工作树运行 `python3 tools/restore-source-folder.py --list` 查询来源；然后运行 `python3 tools/restore-source-folder.py prism-viewer /足够空间的空目录`。恢复过程核验每份文件哈希，不执行历史脚本。可用 `--prefix` 选择来源内的子目录。大文件需有真实Git LFS对象，不能仅下载指针。

素材原件是在同一卷内改名归位，保留原始字节；历史索引仍记录原始路径。实际位置变化见[迁移映射](docs/changes/20261014-workspace-cleanup/relocations.json)。

恢复旧V6检出：在保留的旧目录核对HEAD为`5a2d7e47354854de418b83915ec081081d0486c9`，按需要扩大sparse checkout，例如`git sparse-checkout set --cone docs/changes guangcai-china-preview tools`。先核算磁盘；旧目录中的原始未提交差异由本轮`.svg.bin`保存，不能作为有效SVG运行资源。Git/LFS对象仍保留，未删除源照片或制作原稿。

2026-10-15更新：`/Users/shuangsu/Documents/New project/.git` 的395个文件已全部本地可读，云占位为0。两个9月21日原始广彩提交的项目内容与树证明已补齐，见[原始Git记录](docs/history/20260921-original-git/README.md)。该目录仍是含其他项目的混合仓库，原目录、无关历史及未引用对象没有删除或整体迁移；早期GuangcaiCeramic工作树仍使用其Git元数据。

原22个失效附件路径已按2026-10-15用户确认处理：17张照片及1份PSD为用户移动，保留无水印PDF，3张旧截图停止追查。19份保留文件与Git归档哈希一致；保留旧路径失效的历史事实，不宣称水印版或截图原字节已找回。详见[附件处理与内部查重](docs/changes/20261015-attachment-resolution-and-duplicates/report.md)。该次查重先记录完全相同内容和各副本用途；用户随后授权删除，执行结果见[核对与实际去重](docs/changes/20261015-verified-dedup-cleanup/completion.md)。

H5文件已归档，但H5本身仍是非Git历史工程。Git归档PR与产品分支、线上发布分别管理。

2026-10-15去重收尾：删除当前中国杯`dist/`和`.codex-work/deploy/v4-final/`、旧H5的`dist/`、早期Web3D的`dist/`和`.codex-work/tmp/verified-delivery/`，以及两张外围重复图片，共1,494个内容文件及1,603份配套元数据。删除内容已纳入`cleanup-20261015`恢复来源；元数据备份在`历史工程/Git元数据/20261015-duplicate-cleanup-metadata.tar.gz`。初号機可用空间从约2.65 GiB增至4.12 GiB（净增加约1.47 GiB，测量时点见结果文件）。

文档配图保留在`素材原件/文档/五次添彩_东方雅韵版_V1/03_万彩落于白瓷.png`；另一图片保留为`素材原件/一号杯2/IMG_1226.jpg`。原始PSD、制作母版、运行资源和验收证据保持用途对应。该次删除时，当前与旧工作树的HEAD及原有跟踪状态不变；该阶段没有切换开发分支。
