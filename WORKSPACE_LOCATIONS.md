# 广彩工程、原件与历史恢复位置

更新：2026-10-18。按用户最终选择，只保留当前主仓库与素材原件；旧版本通过正式 Git / Git LFS 按需取回。迁移过程中生成的恢复包已在远端核验后清理，不再保留一层本地归档套件。[本轮清理与验证](docs/changes/20261018-exfat-and-v4-retirement/completion.md)。

| 用途 | 当前位置 |
|---|---|
| 当前维护仓库 | `/Volumes/Prism_初号機/广彩/guangcai-main/`，独立Git元数据，不依赖其他旧目录 |
| 稳定入口 | `/Volumes/Prism_初号機/广彩/guangcai-repo/` → `guangcai-main` |
| 中国杯应用 | 主仓库内 `guangcai-china-preview/`，产品基线 V7.1.3 / v7-4 |
| 原始 PSD、花纸、城市线稿、照片视频与文档 | `/Volumes/Prism_初号機/广彩/素材原件/` |
| 项目临时文件与回执 | 当前仓库 `.codex-work/`，仅按用途保留，通过本地exclude忽略 |
| 旧产品版本、历史源码与资源 | `https://github.com/Shuang-su/guangcai` 的提交、标签、`archives/`、来源清单与 Git LFS |

## 已清理的旧位置

`/Volumes/Prism/广彩/`、初号機上的 `guangcai-v4-workspace/`、整个 `历史工程/` 及内盘 `/Users/shuangsu/Codex/guangcai-v6-recovery/` 均已移除。前者迁移为当前主仓库；后者主要是恢复包、旧Git副本、下载残包、机器绑定与元数据。

历史 `h5` 和 `GuangcaiCeramic` 的源码早前已归档，本轮检查仅剩目录及元数据。旧Ceramic工作树登记已注销；它所属的 `/Users/shuangsu/Codex/New project` 混合仓库、原分支及其他工作树保留，未整体迁移或清理。

旧V6未提交SVG的异常字节已由 [PR #38 对应记录](docs/changes/20261018-v6-local-state-preservation/completion.md)保存为 `.svg.bin`；这不是可运行SVG。旧工作区被删除前，所有文件先完整归档并核验；用户随后决定不保留恢复包，因此这些包也已删除。前序迁移和归档文档描述当时步骤，不能当作当前路径清单。

## 从 Git 取回

- 已发布产品：从提交/标签新建工作树或检出旧版本，例如 `v4.0`；版本与部署的对应见 [版本索引](VERSION_HISTORY.md)。不要在有未提交工作的当前目录强制切版本。
- 非Git历史H5与来源文件：用 [来源清单](docs/changes/20261014-source-consolidation/source-manifest.json)和 `tools/restore-source-folder.py`，恢复到空目录。具体命令见 [Git恢复说明](docs/changes/20261018-exfat-and-v4-retirement/restore-v4.md)。
- 9月21日早期试验：两份原commit及各154份广彩文件快照的证明保留在 [原始Git记录](docs/history/20260921-original-git/README.md)。原混合仓库祖先链没有合入正式库，原SHA不能直接当成正式库checkout版本。
- 大文件：需要 Git LFS 原文件，不能只取得指针；本轮11个LFS文件均从GitHub完整下载并核对SHA-256，通过后未重复落盘。

旧本机绑定、缓存、历史展开状态和操作系统元数据随恢复目录移除，不宣称这些都能从Git恢复。源码内容、版本和已归档制作资源才是Git恢复的范围。

## ExFAT 日常维护

主仓库与 `.git` 保留普通ExFAT目录，本机 `core.filemode=false` 适配其权限表示。使用 `python3 -B tools/git-exfat.py <Git参数>` 处理macOS产生的Git包伴随元数据，例如 `python3 -B tools/git-exfat.py fetch origin main`。工具先严格校验、备份并读回合法 `._pack-*`，再清理伴随文件；保留真实包和实际错误。详见 [工具说明](tools/README-exfat.md)。磁盘断开时停止写入，恢复并核对后继续。

[工程关系](PROJECTS.md) · [主仓库迁移记录](docs/changes/20261018-main-migration/completion.md) · [远端核验与最终删除回执](docs/changes/20261018-exfat-and-v4-retirement/history-cleanup.json)。
