# 合并与清理回执

## 合并

[PR #36](https://github.com/Shuang-su/guangcai/pull/36) 已于2026-10-18 18:28:48（Asia/Shanghai）合并。远端main读回为 `7b0f1e3fbdad4d3ff0230e305891c32c4d2014f0`，包含文档checkpoint `3df7543` 和记录提交 `b96f869f66031b913da6bd1831e86f7bc2fbf4c2`。产品实现PR #34此前已合并，本轮未新增产品版本或部署。

## 分支

清理前6条远端开发分支均无独立于main的提交，无未完成PR且不受保护；删除前逐条再次检查tip未变化。使用原子删除，一次移除6条，服务器回读只剩main。详见`branches-before.json`和`branches-after.json`，保留原分支名、tip与main祖先关系，可从主线历史重新建分支。

当前独立交付目录中的3条已合并本地分支通过`git branch -d`安全删除：`codex/v7-version-issue-index`、`codex/v7.1.2-font-fill`、`codex/v7.1.3-floral-correction`。其他历史工作区仍保留其检出分支和文件，未重置或删除工作区。

另清理旧仓库3条未被工作区占用的本地分支：旧主仓库中的`codex/v7-progressive-resources`与`codex/v7-v6-sync-handoff`、V7.1.2交付副本中的`codex/v6-webgl2-studio`，各tip均已在最新远端main中。第一条在旧V6检出点上执行`branch -d`被拒绝，随后重新验证当前main祖先关系，并用带预期SHA的`update-ref -d`精确删除该引用；未重置旧工作区或改写提交。删除结果见`historical-inactive-branches.json`。旧仓库同步清除服务器已不存在的远端跟踪引用，当前检出分支继续保留。

## 本地缓存

精确删除以下3处无进程占用的可再生缓存，保留完整文件清单在当前交付目录`.codex-work/receipts/local-cache-cleanup.json`，提交摘要见`local-cache-cleanup.json`：

- `/Volumes/Prism/广彩/.codex-work/cache/v6-webkit`：旧测试浏览器缓存。
- `/Volumes/Prism/广彩/guangcai-v7-workspace/guangcai-china-preview/.codex-work/cache/vite`：Vite缓存。
- `/Volumes/Prism/广彩/guangcai-v7-workspace/guangcai-china-preview/.codex-work/cache/npm`：npm下载缓存。

共7,056个缓存文件，逻辑字节373,066,137；清理前后Prism可用空间从552,325,120到941,850,624字节，净增加389,525,504字节（约371.5MiB）。空间会随其他进程活动变化，不作为持久剩余量承诺。后续安装时缓存按锁文件依赖和对应Playwright版本重新生成。

原始素材、不可变部署归档、QA证据、Git历史及历史工作区均保留。旧V6工作区仅有已知`hohhot.svg`未提交修改，清理前后SHA-256 `766daa88e5b78acf0088bae1da9b197ae466f0ae0fc34745bc4a08f74241311a`一致；两个旧V7工作区保持干净。V7.1.3内置临时构建目录已在上一轮清除，本轮未重建。

## 最终同步

本回执随独立文档提交推送并通过PR合入main后，当前工作目录将切至main、精确匹配远端并移除本轮记录分支；最终SHA与服务器分支回读记录在关联PR和版本Issue #35。仅维护记录，无应用代码、资源或部署变化。
