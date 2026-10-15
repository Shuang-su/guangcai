# 2026-09-21 广彩原始 Git 记录与快照

2026-10-15 用户完成旧 `.git` 下载后，两个原提交的广彩项目快照均已逐文件核验。原Git提交SHA和时间原样保留；本轮补录提交使用实际当前时间。

| 原提交 | 原始时间（UTC+08:00） | 原提交信息 | 当前核验范围 |
|---|---|---|---|
| `a84650f7efe04a789efa9e94c65d0bac138dd117` | 2026-09-21 16:52:48 | feat(guangcai): build interactive ceramic product showcase | 原commit、根树到项目的25个树payload、154个项目文件，47,989,952字节 |
| `40fb17b1e00bf9f5e1f3d2d79d060674ec8eecc0` | 2026-09-21 16:54:10 | docs(guangcai): record validated delivery checkpoint | 原commit、根树到项目的25个树payload、154个项目文件，47,990,111字节 |

两次提交的应用子树均为 `1f62406481598c7dcb6c1dafe97d83af428be295`；唯一文件差别是 `docs/changes/20260921-guangcai-showcase/completion.md` 中两行交付说明，见[初始记录](initial-completion.md)。建筑、源码和素材没有在第二次提交中变化。

[hydrated-manifest.json](hydrated-manifest.json)保存两份快照的树payload、路径、模式、Git blob、SHA-256和仓库内恢复路径。[manifest.json](manifest.json)保留10月14日只确认最终工作区快照时的原记录，不覆盖其历史验证边界。两份 `.commit.txt` 为原始commit payload，可独立重算原SHA。

独立核验无需旧盘，也无需下载New project的其他项目：

```sh
python3 tools/verify-hydrated-legacy-git.py --ref HEAD
python3 -m unittest discover -s tools -p test_hydrated_legacy_git.py
```

原仓库是 `/Users/shuangsu/Documents/New project/.git` 中的混合项目仓库，原分支为 `codex/guangcai-ceramic-showcase`。本归档只恢复 `guangcai-viewer/` 和 `docs/changes/20260921-guangcai-showcase/` 的完整内容。根到项目路径所经过的原树中，其他子树只保留对象ID作为来源证明；不包含无关项目源码或完整祖先链。两份原commit在此作为可验证证据保存，没有把混合分支合入正式main，不能直接把原SHA当作当前仓库可checkout的版本。

源Git检查：395个文件、0个云占位。`fsck --full --no-reflogs`退出0，仍有72个dangling blob及一个文件名末尾带“ 2”的重复对象提示；重复内容逐字节一致。源目录和这些对象没有删除。原22个附件旧路径失效与本次Git下载无关；用户后续确认18项由本人移动、PDF保留无水印版、3张截图不再追查，详见[附件处理记录](../../changes/20261015-attachment-resolution-and-duplicates/report.md)。

旧的 `tools/recover-legacy-guangcai.py` 仅用于保留2026-10-14从原工作区重算最终树的方法；迁移后的ExFAT文件模式不适合盲目重跑。当前可重复采集入口为 `tools/capture-hydrated-legacy-git.py --source-git '/Users/shuangsu/Documents/New project/.git'`，它从真实Git对象读取模式与内容，仅写本仓库的证据文件。验证结果和请求见[本轮记录](../../changes/20261015-legacy-git-completion/completion.md)。
