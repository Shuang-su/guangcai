# 从正式 Git 取回旧版与历史源文件

用户最终选择不保留本地恢复包。`历史工程/`、旧V4/V6目录和内盘恢复目录已清理；不要再按中间阶段的tar恢复命令寻找文件。

## 已发布产品版本

在当前仓库先确认状态；从已保存标签或提交建立新的空工作树，例如：

```sh
python3 -B tools/git-exfat.py fetch origin --tags
python3 -B tools/git-exfat.py worktree add --detach /绝对路径/新的V4工作目录 v4.0
```

`v4.0`是发布基线；后续版本和对应源码见根 `VERSION_HISTORY.md`。当前目录有未提交工作时，不通过强制checkout切回旧版。也可从 GitHub 重新克隆；ZIP没有完整历史。项目已使用Git LFS，需要时安装Git LFS并按资源范围拉取真实对象，不能将指针当作原件。

## H5与早期非正式工程

来源清单和恢复脚本均在正式仓库。稀疏检出时先展开文档与工具；恢复目标必须为空且空间足够：

```sh
python3 -B tools/git-exfat.py sparse-checkout add tools docs/changes/20261014-source-consolidation docs/history/20260921-original-git
python3 tools/restore-source-folder.py --list
python3 tools/restore-source-folder.py original-materials /绝对路径/新的H5目录 --prefix h5
python3 tools/restore-source-folder.py prism-ceramic /绝对路径/新的早期杯子目录 --prefix guangcai-viewer
```

恢复脚本按来源清单核对真实文件哈希，不执行旧脚本。某些文件需要Git LFS时，先执行 `git lfs fetch origin main --include='archives/lfs/**'`，再恢复。普通非稀疏检出无需执行 sparse-checkout 命令。ExFAT上Git命令使用配套包装工具，具体见根工具说明。

早期9月21日两份原commit仅保存广彩范围的树证明及各154个文件，原混合祖先链没有导入正式库；不能在正式库直接checkout `40fb17b`。完整来源边界见 `docs/history/20260921-original-git/README.md`。H5按文件保存，不虚构原本没有的逐轮提交历史。

## 本次远端核验

GitHub固定main `73fe5ae70eb9c5199d93412f2a120cc4fab6f86c`：3,661项归档路径及全部blob/pointer ID匹配，其中3,650普通Git对象、11个LFS指针。11个LFS原文件总计1,121,252,021字节均完整流式下载、SHA-256一致，未重复存储媒体。H5来源索引687条路径，早期两份154文件快照的归档对象均在远端。

`git lfs ls-files --all`及按HEAD扫描在本机部分克隆中遇到missing object并返回非零，本次未把它当作成功；改用固定清单、GitHub目录树、LFS batch与实际下载核验。远端可恢复性与本机扫描工具失败分别记录。

旧本机绑定、缓存、操作系统元数据和未提交的临时下载状态不属于Git恢复范围，已按本次明确选择清理。素材原件和当前主仓库仍在本机。
