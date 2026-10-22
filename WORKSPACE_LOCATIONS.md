# 广彩工程、原件与历史恢复位置

更新：2026-10-20。按用户最终选择，只保留当前主仓库与素材原件；旧版本通过正式 Git / Git LFS 按需取回。迁移过程中生成的恢复包已在远端核验后清理，不再保留一层本地归档套件。[本轮清理与验证](docs/changes/20261018-exfat-and-v4-retirement/completion.md)。

| 用途 | 当前位置 |
|---|---|
| 当前维护仓库 | `/Volumes/Prism_初号機/广彩/guangcai-main/`，独立Git元数据，不依赖其他旧目录 |
| 稳定入口 | `/Volumes/Prism_初号機/广彩/guangcai-repo/` → `guangcai-main` |
| 中国杯应用 | 主仓库内 `guangcai-china-preview/`，本地及正式主页 V7.1.13 / v7-10 |
| 原始 PSD、花纸、城市线稿、照片视频与文档 | `/Volumes/Prism_初号機/广彩/素材原件/` |
| 项目临时文件与回执 | 当前仓库 `.codex-work/`，仅按用途保留，通过本地exclude忽略 |
| 旧产品版本、历史源码与资源 | `https://github.com/Shuang-su/guangcai` 的提交、标签、`archives/`、来源清单与 Git LFS |

## 2026-10-20 本地开发状态

- 本地 `main` 已从 `85998a9c` 快进至 `9c072032`，整合 V7.1.11 和交付收尾的 8 个现有提交；没有生成内容合并提交，也没有删除原任务分支。
- 下一版本在同一仓库的 `codex/next-version-20261020` 开发，起点为上述已完成基线；本地产品 V7.1.12 已完成七视角调整与必要验证，正式主页已发布V7.1.12，后缀页保留原内容。[本轮记录](docs/changes/20261020-v7.1.12-seven-views/completion.md)。
- `origin/main` 的本地跟踪引用仍是 `85998a9c`；GitHub 暂停期间未推送、未远端合并，不把本地快进当作 GitHub PR #58 已合并。
- 参考审计工作树 `.codex-work/worktrees/reference-audit-20261019/` 及其独立提交 `a13ba1b8` 保留，不并入本轮产品基线。
- 用户明确授权后，正式主页临时交付、被替代完整包、两类解包暂存及可再生成 npm/Vite/图像缓存已按精确清单移除。此前交付包链接不再有效；打包脚本、receipt 和小型验证摘要仍在 Git 中，可按固定提交重新生成。
- 源码、原稿、固定部署 `deployments/`、`node_modules`、蓝湖原始下载、PSD/镂空诊断和 Git 元数据回执保留。前序整理未安装依赖、未重复测试或构建、未部署；后续 V7.1.12 的新代码验证另记，不改变前序清理范围。

清理清单、保留边界和结果见 [本轮整理记录](docs/changes/20261020-next-version-prep/completion.md)。

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

## V7.1.12 当前交付与发布

正式主页已发布至 https://guangcai-no1-china-v7.netlify.app/ ，部署6ad76b8796b6f32499d6fa63，源码006e3268。原临时交付目录 `/Volumes/Prism/广彩交付/中国杯-V7.1.12-正式主页-花纹提清/` 在部署准备期间不再存在，卷挂载正常且定向查找未发现移动副本；旧包链接不再作为当前交付入口。原打包回执、源码和验证记录仍在Git。

本次以相同已验证应用树重建静态产物并差量发布，没有重建交付压缩包。新增deployments/guangcai-no1-china-v7/6ad76b8796b6f32499d6fa63/site快照以Git对象复用保存，本机不展开整站副本；详细位置与恢复说明见[发布记录](docs/changes/20261020-v7.1.12-netlify/completion.md)。

## 2026-10-22 V7.1.13

当前开发分支codex/city-blessings-20261022。新增城市祝福语与5/6字长框已发布，部署6ad9e0c4e4871da75c6b4316，源码78530b7e。旧后缀页面保留，dev固定v7-9。发布树按Git对象归档，未展开完整副本。[发布记录](docs/changes/20261022-city-blessings/completion.md)。
