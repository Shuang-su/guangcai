# 广彩一号杯与中国杯

广彩项目的正式开发仓库，保存完整源码、必要设计素材、工具、修改记录和发布证据。仓库为私有；设计资料不代表公开授权。

## 项目与版本

- `guangcai-viewer/`：原版一号杯，当前发布基线 1.0。
- `guangcai-china-preview/`：中国杯持续开发目录。2.x → 3.0 → 后续版本在同一目录演进，通过功能分支和发布标签定位，不再为每版复制一套长期维护的源码。
- `main`：已验证的完整项目基线。3.0 在 `codex/china-3.0` 开发，完成前通过 Draft PR 跟踪。
- [版本与部署索引](VERSION_HISTORY.md) · [恢复的 16 个历史节点](HISTORY.md) · [开发接入记录](docs/changes/20261013-git-development/completion.md)。

| 已发布版本 | 标签 | 站点 | 部署 ID |
| --- | --- | --- | --- |
| 1.0 | `v1.0` | [原版一号杯](https://guangcai-no1.netlify.app/) | `6abbdf78d912b4b6b1d7c3b9` |
| 2.2 | `v2.2` | [中国杯](https://guangcai-no1-china.netlify.app/) | `6ace111ab0415c9455a3c6f8` |

Git 提交、PR 合并与上线是分别核实的状态。现有站点未连接 Git 自动部署；推送、合并和打标签不会更新线上站点。3.0 按已批准的计划使用独立新网址，旧站继续保留。

## 本地开发

要求 Node.js 22.12+、npm，以及支持 WebGL 2 的浏览器。两个应用均有独立锁文件；首次安装使用各自的 `npm ci`，不依赖外部电脑路径或共享的 node_modules 符号链接。

在仓库根目录执行（中国杯示例）：

```sh
npm --prefix guangcai-china-preview ci --cache .codex-work/cache/npm
npm --prefix guangcai-china-preview test
npm --prefix guangcai-china-preview run build
npm --prefix guangcai-china-preview run dev -- --port 5208
```

原版把命令中的目录改成 `guangcai-viewer`，使用不同端口。几何测试分别为原版 6 项、中国杯 10 项。浏览器回归工具在各应用 `tools/` 下；根据实际运行端口设置 `QA_URL`，运行前确认输出位置，保留本轮结果，不以历史结果代替本轮验证。

中国杯 `prebuild` 会从保存的母版生成 WebP；如产生源码或素材清单差异，先核对原因。原稿及运行所需素材均在项目内；仅历史来源记录可能包含旧电脑绝对路径。

## 开发与发布

1. 开始前检查 Git 根目录、分支、upstream、状态和 diff。每项功能关联 Issue，从 main 建立 `codex/<task>` 分支；存在其他修改时使用独立 worktree。
2. 在本仓库直接修改、验证并形成原子提交，例如 `feat(3.0): add original floral artwork`。根据当前任务授权推送并创建关联 PR；未完成的功能保持 Draft。
3. PR 审查和必要验证通过后按授权合并。原始历史补录已经保留为真实可达提交，不对既有分支强推或重写。
4. 正式版本使用 `v1.0`、`v2.0`、`v2.1`、`v2.2`、`v3.0` 等标签；标签只在对应版本验证完成后创建，不能移动已发布标签。后续使用 3.1、3.2 等产品版本；一个版本可包含多个正常开发提交。
5. 发布仅使用用户已授权的目标站点。从已记录的 Git 提交构建，保存站点 ID、提交 SHA、构建命令、部署 ID、文件哈希及回读结果。`.netlify/` 和凭据只留本地，不入库。

## 历史完整性

```sh
python3 tools/verify-archive.py
python3 tools/test_verify_archive.py
```

核验工具按固定 Git 提交读取历史源码，同时检查工作树中不可变的 `deployments/` 快照，因此不会把正常开发改动误判为旧版损坏。必须使用完整 Git 克隆；浅克隆先运行 `git fetch --unshallow origin`。下载 ZIP 不包含历史对象，工具会明确报告无法完成历史核验。

`docs/archive/`、`docs/history/` 和 `deployments/` 保存旧版本证据；不要覆盖原记录。缓存、临时测试和发布暂存放在 `.codex-work/`，通过 `git rev-parse --git-path info/exclude` 指向的仓库本地 exclude 忽略。安装或复制较大素材前检查磁盘空间。
