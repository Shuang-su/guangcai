# 三类工程与开发入口

核对日期：2026-10-18。这里按用途和开发阶段区分三类工程；这不是三个独立Git仓库，也不是三个当前Git工作树。

| 工程 | 用途与内容 | 现在的管理方式 |
|---|---|---|
| 早期Web3D试验 | 9月21日的陶瓷杯、盖、碟参数化展示；验证材质、观察、开盖、换款和交互。另保留后续prototype/viewer试验产物 | 历史来源。`GuangcaiCeramic`旧工作树已注销，本地空壳已清理；两份真实广彩提交的项目快照与SHA证明已保存到本仓库。不是当前正式一号杯的同一发布版本 |
| 广彩流程H5 | “为APEC添彩”的开场、首页、五步选择、生成海报、成果展示和榜单框架，内部复用三维观察器 | 独立的非Git历史工程，源码、素材和制作/构建证据已按文件归档；没有在这里初始化新Git，也没有作为根目录第三个正式应用接入。现有README记载为本地前端演示，后端与3DGS未接入 |
| 正式Git产品工程 | 一号杯和中国杯持续开发；中国杯包含高清纹饰、城市主题、配色、材质与 V7.1.3 渐进加载和触控面板 | `Shuang-su/guangcai` 是正式仓库。原版在 `guangcai-viewer/`，中国杯在 `guangcai-china-preview/`。分支、提交、标签与部署分别记录 |

## 当前磁盘位置

- 早期工程：从本仓库历史源码归档取回，旧本机工作树已注销。
- 流程H5：从本仓库来源索引取回，旧本机目录已清理。
- 正式仓库：`/Volumes/Prism_初号機/广彩/guangcai-main/`，稳定入口 `guangcai-repo/`。
- PSD、线稿、花纸与其他原件：`/Volumes/Prism_初号機/广彩/素材原件/`。它们是制作来源，不是第四套应用。

正式仓库在 `main` 持续开发，当前产品基线 V7.1.3 / v7-4。当前 Git 对象库独立，不依赖旧 V4/V6 目录。旧 `guangcai-v4-workspace` 和嵌套 archive-index 已在完整核验后移除；用户随后选择从Git恢复，临时恢复包也已清理。分支名称和工作树用途不是独立产品；稀疏检出中未展开的应用、资料或部署目录仍在 Git 历史中。具体位置与恢复说明见 [工作区说明](WORKSPACE_LOCATIONS.md)。

## 历史与归档的关系

1. 9月21日是真实旧Git记录：`a84650f` → `40fb17b`。两份原commit payload、根到项目的树证明和154份项目文件均可在本仓库独立核验。原混合仓库还包含其他项目，完整父链未导入；原SHA在这里作为来源证据保存，不作为可直接checkout的正式分支。见[原始Git记录](docs/history/20260921-original-git/README.md)。
2. 9月29日起的一号杯、中国杯历史按原会话和文件恢复为16个源码节点，随后进入正常Git开发。这组恢复与9月21日原始试验记录互补，不能混作同一批历史。见[历史索引](HISTORY.md)。
3. H5及旧工作区使用 `archives/` 内容哈希归档：实际文件可恢复，原路径、原文件名和来源在清单中。文件归档不是H5的逐轮Git提交历史，不能虚构原来没有的commit。

## 查找或还原

[来源索引](docs/changes/20261014-source-consolidation/source-index.md)与[位置/迁移说明](WORKSPACE_LOCATIONS.md)提供入口。还原前选择空间充足的空目录，在包含本归档的分支执行：

```sh
# 列出来源分类
python3 tools/restore-source-folder.py --list
# 还原早期项目文件（不含原混合Git元数据）
python3 tools/restore-source-folder.py prism-ceramic /绝对路径/空目录/web3d
# 还原H5文件；原历史根目录下的h5前缀会被去掉
python3 tools/restore-source-folder.py original-materials /绝对路径/空目录/h5 --prefix h5
# 核对两份9月21日快照，无需原磁盘
python3 tools/verify-hydrated-legacy-git.py --ref HEAD
```

工具不运行历史脚本，不还原凭据或node_modules。大文件需要下载真实Git LFS对象。H5后续若重新开展开发，应另行确定正式仓库内的接入路径和基线；本轮只整理说明与历史，没有改变其产品流程。

历史补录记录：[原始快照补全](docs/changes/20261015-legacy-git-completion/completion.md)。当前本地清理与Git恢复：[2026-10-18完成记录](docs/changes/20261018-exfat-and-v4-retirement/completion.md)。
