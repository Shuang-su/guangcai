# 2026-09-21 广彩原始 Git 记录与快照

这份记录核对真实原提交与现存文件，不倒签当前提交，不把过滤后的新提交冒充原 SHA。

| 原提交 | 原始时间（UTC+08:00） | 原提交信息 | 核验范围 |
|---|---|---|---|
| `a84650f7efe04a789efa9e94c65d0bac138dd117` | 2026-09-21 16:52:48 | feat(guangcai): build interactive ceramic product showcase | 原始 commit payload 与 SHA；此提交完整树仍待云端下载 |
| `40fb17b1e00bf9f5e1f3d2d79d060674ec8eecc0` | 2026-09-21 16:54:10 | docs(guangcai): record validated delivery checkpoint | 原始 commit payload、根树、154 个广彩项目文件与对应归档内容 |

原仓库位于 `/Users/shuangsu/Documents/New project/.git`，分支为 `codex/guangcai-ceramic-showcase`。2026-10-14 复核时部分对象仍为 iCloud 占位；两个 commit payload 已可读取。把现存 `/Volumes/Prism/GuangcaiCeramic` 按 Git 的文件模式、文件名排序与树编码重算，得到根树 `43f3b0d8370c4ceb376b6854a6547c94dd65f251`，与 `40fb17b` 内记录完全一致。广彩应用子树为 `1f62406481598c7dcb6c1dafe97d83af428be295`。

[manifest.json](manifest.json) 保存可独立重算的 25 个树 payload、154 个项目文件的原路径、模式、Git blob、SHA-256 与已有 archives 恢复路径。项目内容合计 47,990,111 字节，复用已入库内容，不重复展开约 48 MB 文件。两份 `.commit.txt` 为解压后的原始 commit payload，其 Git 对象哈希可重算为上述原 SHA。

原仓库的祖先还包括其他项目，本记录只引用 `guangcai-viewer/` 和 `docs/changes/20260921-guangcai-showcase/` 的文件。根树到项目的路径保留其他子树的对象 ID 作为来源证明，没有导入无关项目的整条提交链。`a84650f` 的初始完整树与后续完整父链仍未声称恢复；当前归档快照也不等于将原分支合入 main。

核验命令（在归档分支根目录执行）：

```sh
python3 tools/verify-legacy-source.py
```

只有原盘材料仍在时才需运行恢复生成器 `tools/recover-legacy-guangcai.py`；上面的核验器只依赖当前仓库归档和已保存的 payload。
