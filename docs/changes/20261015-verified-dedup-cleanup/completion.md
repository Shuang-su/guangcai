# 已核验重复副本清理

关联Issue #23、PR #24，起点`125f81f9e0883177a12de17ebf1deb0f2cc6d344`，分支`codex/source-consolidation`。

## 删除前核对

- 当前正式北京工作树跟踪状态干净；旧混合仓库存在既有跟踪差异和AppleDouble文件，保存原状态用于清理后比对，不在此任务修复或提交旧现场。
- 5个生成目录与两张外围重复图片合计1,494个内容文件、885,521,127逻辑字节。均已存在于真实可达Git内容；其中47份内容新增到原件索引，保证合并后的来源记录可直接还原完整目录。总档案为3,661份内容、19,534处来源、11个LFS对象。
- 1,603份对应AppleDouble/Finder元数据已压缩到初号機`历史工程/Git元数据/20261015-duplicate-cleanup-metadata.tar.gz`，逐成员与原件回读一致。元数据备份仅本地保存，文件哈希见cleanup-manifest.json。
- 两份图片保留同字节的正式名称/文档包路径。原始PSD、运行资源和当前开发分支继续保留。

本文件先随恢复checkpoint保存，实际删除、验证、提交与远端状态在完成后追加。

## 恢复方法

在包含本次归档的仓库中，使用已有`tools/restore-source-folder.py`。`cleanup-20261015`来源记录清理前真实相对路径；恢复目标必须为空且容量足够。例如：

```sh
python3 tools/restore-source-folder.py cleanup-20261015 /足够空间的空目录 --prefix guangcai-v4-workspace/guangcai-china-preview/dist
python3 tools/restore-source-folder.py cleanup-20261015 /另一个空目录 --prefix 历史工程/h5/dist
```

也可按cleanup-manifest.json逐文件读取archivePath。恢复脚本验证大小及SHA-256，不执行历史安装或部署命令。当前工程新的构建可使用原有npm构建流程生成；旧部署暂存的精确字节以本次归档为准。

## 验证过程说明

5项旧Git双快照边界测试通过。本轮新写记录与脚本的`git diff --cached --check`通过；包含原字节归档时，已有Three.js编译JS触发21处空白告警，该JS按哈希保留原字节，不为格式检查改写历史产物。正式分支没有配置GitHub CI checks，main当前未保护；合并仍按最新head和本轮本地核验结果执行。

删除前完整归档核验通过：3,661内容、19,534来源、11个LFS对象，原3,593云占位全部已核验、剩余0。实际还原历史H5构建150文件/12,570,495字节，逐文件SHA-256一致；临时还原目录验证后删除，恢复数据仍在Git归档中。

恢复checkpoint为`0afcf96d6ad14b8fc7b29abf1c94c9121f617fac`，已推送。执行器第一次verify-only在storage检查处停止：原索引对复用对象使用`existing-git-blob`而非`git-blob`，此前全归档验证已支持该类型。执行器明确接受这两种普通Git blob分类，并仍逐份校验固定checkpoint里的实际字节；停止时没有删除文件。PR范围检查首次把根文档ARCHIVE_INDEX.md当作未知路径，随后直接核对两个应用目录，确认产品目录diff为空。
