# ExFAT 上的 Git 维护

本机主仓库仍是 `/Volumes/Prism_初号機/广彩/guangcai-main` 的普通目录，`.git` 也在其中。此工具只处理 macOS 在 ExFAT 上产生的 Git 包伴随文件。

## 使用

在仓库根目录运行，Python 3.9+：

```sh
python3 -B tools/git-exfat.py                       # 只检查、归档并清理合法伴随文件
python3 -B tools/git-exfat.py status --short --branch
python3 -B tools/git-exfat.py fetch origin main
python3 -B tools/git-exfat.py pull --ff-only
python3 -B tools/git-exfat.py push origin main      # 仍须有本次推送授权
python3 -B tools/test_git_exfat.py
```

参数原样交给 Git，没有自动重试、强推或绕过钩子。普通 Git 仍可运行；若 fetch 产生 `error: non-monotonic index .../._pack-*.idx`，先使用此工具检查。不要直接批量删除所有 `._*`。

## 处理范围与失败边界

- 在 Git 命令前后检查真实 common Git 目录的 `objects/pack`，兼容标准 checkout 和 worktree 的 `gitdir`/`commondir` 指针。
- 只接受 `._pack-<40至64位十六进制>.<idx|pack|rev|promisor|keep|bitmap|mtimes>`，并要求对应真实文件存在且不是符号链接。
- 校验 AppleDouble magic/version/entry 范围，拒绝符号链接、超过 16 MiB 的文件和未知内容。任何拒绝均停止，不猜测修复真实 Git 对象。
- 伴随文件按 SHA-256 保存到当前工作树 `.codex-work/receipts/git-appledouble/`，写入后 fsync 并读回；确认原始包大小/修改时间、伴随字节都没变化后才删除伴随文件，保留 JSON 回执。
- 真实 `.pack`、`.idx` 及其他 Git 文件从不删除。备份不一致、文件并发改变或卷不可读时失败退出。
- stdout 原样保留，支持二进制 `git show`。Git 原始非零退出码与 stderr 保留；命令成功时，只归并明确指向本次已核验清理伴随文件的 `non-monotonic index` 消息。真实索引错误、未知路径和其他警告照常显示。后处理失败也保留 Git stderr，并由脚本返回 2。
- 不能据此宣称磁盘健康、修复文件系统或避免 USB 断开。出现 `Device not configured` 时停止写入，先恢复连接与核对文件。

清理回执属于本机资料，`.codex-work/` 通过 Git 本地 exclude 忽略。不要为了安静日志删掉未知文件，也不要将全盘 `._*`、素材元数据或其他项目纳入范围。ExFAT 本机 `core.filemode=false` 仅适配权限表示，不修改提交中的文件模式。此工具不设置全局 Git 配置。

## 本轮验证

9 项单元测试通过，覆盖合法元数据、未知内容、符号链接、缺少对应包、坏备份、真实索引保护、Git 失败返回值、消息归并及真实索引诊断保留。真实 filtered fetch 返回 0，备份 4 份伴随元数据，剩余包伴随文件 0，1 份真实包索引通过 `git verify-pack -s`。主仓库 connectivity 检查通过。

记录与实际清理结果见 [完成记录](../docs/changes/20261018-exfat-and-v4-retirement/completion.md)。
