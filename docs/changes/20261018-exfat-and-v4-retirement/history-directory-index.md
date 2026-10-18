# 已清理历史目录索引

2026-10-18 用户最终选择从 Git / Git LFS 取回旧版本，不保留本地恢复套件。以下目录已移除，不能再按早前文档所述路径寻找压缩包。

| 原目录 | 清理前内容 | 后续来源 |
|---|---|---|
| 旧V4恢复归档 | 本轮中间生成并验证的完整工作区包 | 正式Git版本；未提交异常SVG字节已由PR #38保存 |
| Prism清理归档 | 旧V7/V7.1.2、迁移恢复包和元数据 | 相关提交均在main历史中，旧机器状态不再保留 |
| Prism临时与恢复归档 | V6临时QA、旧交付包 | 正式提交、部署和交付记录；旧缓存可按需重建 |
| Git元数据 | 旧Git副本与AppleDouble备份 | 正式Git；OS元数据不再保留 |
| 本地恢复资料 | 旧会话摘录、机器绑定、重复清理记录 | 正式Git保留源码/来源；本地独有恢复状态按本次决定移除 |
| h5 | 源文件先前已归档，实际只剩目录与AppleDouble | Git来源索引 `original-materials` / `h5` |
| GuangcaiCeramic | 空目录、DS_Store、AppleDouble和旧工作树指针 | 两份154文件快照；只注销本工作树，所属混合Git库及历史分支保留 |
| 历史工程README | 本轮整理说明 | 当前根README、WORKSPACE_LOCATIONS与本记录 |
| 内盘guangcai-v6-recovery | 三份无索引的未完成临时Git pack及记录 | 直接重新拉取正式Git，无独有工作源码 |

远端3,661项归档、11个LFS原文件与版本关键提交已验证；[完整删除回执](history-cleanup.json)与[远端内容核对](remote-content-verification.json)保留具体边界。这里的“Git恢复”不包含旧机器绑定、缓存、OS元数据和原混合仓库的其他项目。
