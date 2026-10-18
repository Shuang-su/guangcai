# 主仓库迁回初号機与Prism清理

## 结果与位置

迁移基线为已合并PR #38的main：`29b7670cbbda6f1a44523864aefa8eedd18b61c0`。当前主仓库位于`/Volumes/Prism_初号機/广彩/guangcai-main`；稳定入口`/Volumes/Prism_初号機/广彩/guangcai-repo`已从旧共享仓库改为指向`guangcai-main`。

`/Volumes/Prism/广彩`已在复制/归档/再次校验全部通过后移除。原始素材和历史工程保留；旧V6共享Git及archive-index工作树仍在初号機。旧V7关联工作树已用Git注销，其已合并本地分支也已清理。

## 校验与恢复包

主仓库1,818个文件（包含独立Git对象和本地回执）完成源与目标逐字节SHA-256检查，无alternates依赖；目标HEAD一致、工作树干净、`git fsck --connectivity-only --no-dangling`通过。复制后Git配置与索引因文件系统适配单独记录，其余源文件再次验证一致。

本地归档根目录：`/Volumes/Prism_初号機/广彩/历史工程/Prism清理归档/20261018-v7-main-migration/`。

| 归档 | 校验文件数 | 压缩包字节 | SHA-256 |
| --- | --- | --- | --- |
| `guangcai-v7-workspace.tar.gz` | 6,109 | 2,815,641,679 | `1a9e2066874d3ec18877f775f78539723a3b956ac92632dd5fd9416038ee40b8` |
| `guangcai-v7.1.2-delivery.tar.gz` | 444 | 180,930,239 | `e1e7cd48539305ce54cce306e76bdaa8a9f79c96e77992e06d1cd502ba7dbbc1` |
| `prism-root-recovery.tar.gz` | 14 | 2,251,060 | `90c166977702b7bb8e1b66d3e1746f4bcd11bb0439b7bd92e88faf7b05a3f165` |

压缩包逐成员解压为数据流后与清单比对，删除前又核对包摘要与源文件。旧V7只排除3处node_modules：根`.codex-work/tmp/backend-handoff/`及两应用下的依赖目录；其他源码、部署归档、忽略的本地恢复资料均保留。旧V7.1.2独立仓库包含其Git数据。包与详细扩展属性记录仅留本地，不上传GitHub；本仓库只提交摘要回执。

## 文件系统适配与异常处理

macOS复制到ExFAT时生成`._`AppleDouble伴随文件，使Git把`._pack-*.idx`误识别为包索引；同时ExFAT权限表现触发模式差异。所有真实文件已按字节核对，没有把这些错误解释成源码或Git包损坏。新增的739个Git伴随文件及1,412个其他伴随文件分别归档并校验后移除；源文件中原有的同名文件不在清理范围。源扩展属性另存十六进制清单。设置本机`core.filemode=false`后状态干净，实际Git包与消费者资源字节不变。

最初脚本尝试使用当前Python未提供的`os.listxattr`时停止，源目录未改；后改用macOS自带xattr命令保存属性。完成复制和归档前没有删除源文件。

## 空间与恢复

清理Prism前后可用空间从936,935,424增至6,571,986,944字节，净增加5,635,051,520字节（约5.25GiB）。迁移及归档完成时初号機剩余6,562,250,752字节（约6.11GiB）。这些是测量时点值，不是持续剩余容量承诺。详见`verification.json`。

恢复具体旧版本时先校验包SHA-256，并按归档目录README操作。旧V7包中的`.git`是原工作树指针，不能解包后直接沿用：需从保留历史重新创建对应提交的独立worktree，再在解包时排除旧`.git`。原指针仍按原字节归档。独立V7.1.2副本可恢复到空目录后核对其HEAD；ExFAT上仍须处理伴随文件和权限模式。

本轮没有产品代码、资源或Netlify部署变化，也没有重跑应用构建；V7.1.3真机/COS和性能目标待验收状态继续保留。当前变更仅用于保存、迁移、清理和位置说明。最终main合并与远端分支回读以本轮PR及Issue #35的收尾记录为准。
