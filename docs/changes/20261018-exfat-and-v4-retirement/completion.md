# ExFAT 维护与历史目录清理完成记录

日期：2026-10-18。产品仍为 V7.1.3 / v7-4；维护基线 main `73fe5ae70eb9c5199d93412f2a120cc4fab6f86c`（PR #39）。本轮变更工具、文档和本机目录，没有重建或部署应用。

## 最终结果

用户在旧V4归档完成后明确选择“有需要从Git拉取”，并逐项指定历史工程及内盘recovery目录。因此中间归档包也已清理，最终以正式Git/Git LFS保存的源码与资源为恢复来源。不能再使用早前阶段文档中的本地tar路径。

- 已清理旧 `guangcai-v4-workspace` 及全部 `历史工程/`，后者包括旧V4恢复包、两个Prism归档目录、Git元数据、本地恢复资料、历史H5/Ceramic空壳及其README。
- 已清理 `/Users/shuangsu/Codex/guangcai-v6-recovery` 的三份未完成无索引Git pack及附属记录，约3.28GiB；没有工作源码或有效Git检出。
- 当前 `guangcai-main`、稳定入口 `guangcai-repo`、素材原件保留。当前Git独立、无alternates依赖，旧目录移除后连通性检查通过。
- 旧Ceramic只剩目录、DS_Store、AppleDouble和Git指针；注销它自己的工作树登记。所属混合仓库HEAD `29a5a371bef481d6ecc5664193d89ae6f01e23ae`、原分支tip `40fb17b1e00bf9f5e1f3d2d79d060674ec8eecc0` 与其他工作树均保持不变。
- 旧V6异常SVG待提交字节已由PR #38保存；源/历史部署未被本次工具或清理修改。

最后一阶段共核对并删除321个文件（含压缩包及元数据），逻辑字节13,211,733,703。外盘净释放 `9,793,699,840` 字节（9.12GiB），内盘净释放 `3,525,836,800` 字节（3.28GiB）。删除后外盘可用17.54GiB，内盘可用16.71GiB；实时空间会随其他应用变化。[完整删除回执](history-cleanup.json)。

## 删除前的远端核验

- 固定GitHub main `73fe5ae70eb9c5199d93412f2a120cc4fab6f86c`，归档目录树不截断；3,661项路径全部存在，3,650普通Git对象及11个LFS指针的blob ID全部匹配来源清单。[远端内容核验](remote-content-verification.json)。
- H5来源索引含687条路径；早期两份快照各154个项目文件的归档对象匹配GitHub。H5以文件归档，不虚构提交历史；早期混合祖先链未导入正式库。
- 旧V6、旧V7、V7.1.2、异常SVG保存及前次清理所用5个关键提交均是GitHub main祖先，远端 `v4.0` 标签存在。[远端版本核验](remote-history-refs.json)。
- 11个LFS原文件共1,121,252,021字节，从GitHub返回的下载入口完整流式读取并核对SHA-256，全部通过，没有重复保存媒体文件。[LFS下载与哈希](remote-lfs-verification.json)。
- 本机 `git lfs ls-files --all` 和按HEAD扫描在部分克隆中报missing object并非零退出；未掩盖失败，改用固定清单、GitHub树、LFS batch和实际下载验证远端。
- 旧机器绑定、调试缓存、会话恢复副本、OS元数据和下载残包不属于Git产品历史，按用户不再保留本地恢复套件的选择移除；不声称每一份被删的本机状态都已在Git。当前源码和素材原件不在删除范围。

## 旧V4退役及磁盘中断

依赖目录先按锁文件可重建原则清理，4,975份文件，回执见 [依赖清理](v4-node-cleanup.json)。剩余2,693项文件（全部Git/LFS、嵌套archive-index和本地恢复资料）先完整归档、逐文件校验，再移除旧工作区。

外盘压缩两次遇到 `Device not configured`，均未进入源目录删除。其间短暂自动重新挂载后再次不可用，一次内盘任务在源目录存在性断言处停止。用户重新接稳后继续，未强制挂载、格式化或修复文件系统。重新核对2,693项原文件和三份迁移包均一致；最终改用内盘暂存，压缩包 `4,051,674,055` 字节、SHA-256 `19f5d8a3db17a5ad339d7bc898462d453cf14a44f65e902eef3ca8f53d108650`，包内逐文件、源目录复查及搬回外盘完整读回均通过后才删除源目录。

该包随后又按用户最终选择删除，以上哈希仅记录已完成的中间核验，不是仍然存在的备份。[旧V4阶段回执](v4-retirement.json)的状态应结合最终 [历史目录删除回执](history-cleanup.json)阅读。部分xattr API查询失败，但普通文件及AppleDouble原始字节当时均已核验；不声称完整xattr查询成功。磁盘断开原因未确定。

本轮内盘归档暂存已清理，详见 [暂存回执](internal-staging-cleanup.json)。其中“archiveRetained”描述当时阶段，随后已由最终历史目录清理移除。旧回执保留真实时序。

## 工具与文档

新增 `tools/git-exfat.py`：Git前后严格校验名称、真实对应包和AppleDouble格式；备份并读回后只删除合法伴随文件。保留真正包/索引、Git非零退出码和真实错误；成功时只归并明确指向本次已核验清理元数据的诊断。未知内容、符号链接、备份不一致或并发变化即停止。主仓库与`.git`仍是ExFAT普通目录，不设置全局Git配置。见 [使用说明](../../../tools/README-exfat.md)。

9项单元测试通过；真实filtered fetch返回0，4份伴随元数据备份、pack目录余量0，1份真实索引通过 `git verify-pack -s`。[集成证据](exfat-wrapper-integration.json)。主仓库connectivity检查在重连后及旧V4移除后通过。实际出现的LFS扫描非零退出也被原样保留。

根README、AGENTS、WORKSPACE_LOCATIONS、PROJECTS以及本机项目入口已更新为最终Git恢复方案。10份Markdown中的65个本地链接及本轮JSON解析通过，稀疏路径按Git对象核对；`git diff --check`通过。旧产品/迁移记录继续描述各自当时状态；[最终恢复方法](restore-v4.md)、[已清理目录索引](history-directory-index.md)说明当前状态。没有重新运行无关前端测试；历史浏览器结果和待完成真机/COS验收维持原证据边界。

## 提交与同步

分支 `codex/exfat-maintenance`。本轮checkpoint SHA在验证提交后补录；按既有授权推送、PR合并到main并回读，Issue #35同步维护入口。无产品版本号变化和新部署。
