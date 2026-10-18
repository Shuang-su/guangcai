# 旧V6本地差异保全

## 发现与处理边界

旧工作区唯一差异是历史部署`6ad30bc420f569fd63dd9068`的`site/review/v6/hohhot.svg`。前后均846,805字节，只有偏移839688、839696、839704、839708的4字节不同，位于异常二进制区域。HEAD与待提交文件均不能解析为有效XML。HEAD字节已与GitHub blob `20f8d888665de36c0769849828a592bf8952eebb`逐字节核对一致，因此不能将这处差异称为已验证的SVG兼容修正，也不能归因于本次磁盘断连。

用户要求先提交再清理，故将未提交字节原样保存为`hohhot-worktree.svg.bin`，SHA-256为`766daa88e5b78acf0088bae1da9b197ae466f0ae0fc34745bc4a08f74241311a`。`.bin`明确该文件只是恢复证据，不作为浏览器运行资源。`preservation.json`记录全部来源、哈希、差异和XML解析结果。原发布归档路径与内容不在本轮修改范围；当前V6部署`6ad314a2a5e661a14e469026`及V7部署不重发。

如需还原用户当时的工作区差异，将此`.bin`复制回`preservation.json.originalPath`即可获得相同字节；不得把它作为有效SVG上线。历史归档无效XML的问题保留为发现，不伪造修复结果。

## 清理

恢复证据checkpoint：`40ce0a6d18a96f2c070663b01e9b1f6f438a7608`。已推送，GitHub blob `b1858c934f2248a7164865506254675fb087cd3c`回读846,805字节与本地原待提交内容完全一致。之后才将旧工作区该文件精确恢复为原HEAD字节；原归档哈希匹配，工作树干净。

旧V6保持原HEAD `5a2d7e47354854de418b83915ec081081d0486c9`，已切为detached并删除本地`codex/v6-webgl2-studio`。sparse checkout收窄为README、AGENTS、WORKSPACE_LOCATIONS及两份根Git规则文件，清除9,105个可由Git恢复的展开文件，逻辑大小5,094,635,552字节。初号機可用空间从4,245,946,368增加到12,082,479,104字节，约增加7.30GiB；具体测量记录见`cleanup.json`。

共享`.git`、`.codex-work`中的恢复/QA资料、旧V7及archive-index关联工作树保留。三个工作区均能读取HEAD且status干净，未注销或改动共享Git指向。清理后没有需要另行处理的已移除文件AppleDouble伴随项，没有创建空的元数据归档。没有删除素材原件、历史工程或现有V7交付目录。

仓库WORKSPACE_LOCATIONS及两盘项目入口文档同步当前main开发目录与旧V6最小检出状态；原入口符号链接继续指向旧共享仓库，标明其历史用途，未冒充当前开发目录。外部入口文档前后哈希保存在`cleanup.json`，原文备份在当前交付目录`.codex-work/receipts/project-entry-before-*.md`。

验证包括原始字节GitHub回读、前后哈希、XML解析边界、精确还原、Git状态、分支删除及关联工作树连通。`git diff --check`对文本通过；二进制恢复文件用本目录`.gitattributes`明确标记binary，保留原字节，不为通过空白检查修改它。没有运行或发布异常SVG，也没有重跑应用构建。
