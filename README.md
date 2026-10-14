# 广彩一号杯与中国杯

广彩项目的正式开发仓库，保存完整源码、必要设计素材、工具、修改记录和发布证据。仓库为私有；设计资料不代表公开授权。

## main 基线 4.2；4.3 预览待视觉验收

[打开 V4 三维预览](https://guangcai-no1-china-v4.netlify.app/) · [4.2 金底清洗对照](https://guangcai-no1-china-v4.netlify.app/evidence.html#floral-cleanup-4.2) · [应用说明](guangcai-china-preview/README.md)

中国杯当前产品版本为 **4.2 / 4.2.0**，代码已合入 `main`。提供中国、深圳两个主题共九款图样；八款新图样支持彩釉金线、彩色金属、轻浮雕彩绘三种材质，文字可随款式、按主题或隐藏。首次打开仍为原版纯金。固定高清广彩花纹、白瓷、结构金边、背景上传及观察交互继续保留。

以上是当前 `main` 的代码基线。V4 网址另已发布北京主题 **4.3 预览**，源码标签 `v4.3` 指向 `8d54f7e`、部署 `6acf18984f3abc04fe3cab18`；[PR #22](https://github.com/Shuang-su/guangcai/pull/22) 仍为 Draft，建筑填色与线稿视觉复核尚未完成，不能将“已发布预览”当作“已合并／已验收”。

## 原件与旧工作区

[原件分类与下载索引](docs/changes/20261014-source-consolidation/source-index.md) · [来源与哈希](docs/changes/20261014-source-consolidation/source-manifest.json) · [范围和缺口](docs/changes/20261014-source-consolidation/completion.md) · [整理任务 #23](https://github.com/Shuang-su/guangcai/issues/23)。

已补录原始PSD、线稿、文档、照片视频、会话附件和旧工程产物，共3,223份去重内容、14,524处来源。`archives/`以内容哈希保存实际对象，原文件名和各来源路径在索引中；10个大文件使用Git LFS。旧目录仍保留。北京工作区此前3593个云占位已全部下载并按字节核验；9月旧仓库仍有未下载Git对象，失效附件路径继续单列。此资料补录与既有16个源码恢复节点互补。

首次克隆资料库需要安装Git LFS；空间有限时可先用 `GIT_LFS_SKIP_SMUDGE=1 git clone`，再选择所需档案下载。LFS指针不是原文件，读取时应确认真实内容已取回。

V4 经 [PR #15](https://github.com/Shuang-su/guangcai/pull/15) 汇入开发分支，再由 [PR #13](https://github.com/Shuang-su/guangcai/pull/13) 合入 `main`；杯身饰带旁釉面接缝修正由 [PR #16](https://github.com/Shuang-su/guangcai/pull/16) 合入。当前发布记录包含颜色覆盖、自动旋转方向和接缝修正。

## 项目与版本

- `guangcai-viewer/`：原版一号杯，当前发布基线 1.0。
- `guangcai-china-preview/`：中国杯持续开发目录。2.x → 3.0 → 4.0 → 后续版本在同一目录演进，通过功能分支和发布标签定位，不再为每版复制一套长期维护的源码。
- `main`：包含已合并的 3.0 高清基础、V4 主题选择及后续修正；未完成的新功能另建分支。
- [版本与部署索引](VERSION_HISTORY.md) · [恢复的 16 个历史节点](HISTORY.md) · [开发接入记录](docs/changes/20261013-git-development/completion.md)。

| 已发布版本 | Git 标签 | 站点 | 部署 ID |
| --- | --- | --- | --- |
| 1.0 | `v1.0` | [原版一号杯](https://guangcai-no1.netlify.app/) | `6abbdf78d912b4b6b1d7c3b9` |
| 2.2 | `v2.2` | [中国杯](https://guangcai-no1-china.netlify.app/) | `6ace111ab0415c9455a3c6f8` |
| 3.0 预览 | `v3.0` | [高清中国杯 V3](https://guangcai-no1-china-v3.netlify.app/) | `6ace443df7425f433e717eb0` |
| 4.0 预览 | `v4.0` | [主题与釉彩 V4](https://guangcai-no1-china-v4.netlify.app/) | `6aced018c70635a1ad24cbbe` |
| 4.1 预览 | `v4.1` | [纹饰凹凸修复](https://guangcai-no1-china-v4.netlify.app/) | `6acef244237630dba7fa87fe` |
| 4.2 预览 | `v4.2` | [花纹金底清洗](https://guangcai-no1-china-v4.netlify.app/) | `6acefdc52ef3d568cd9acedd` |

Git 提交、PR 合并、版本标签与上线分别记录。3.0、4.0 已手动发布，`v3.0`、`v4.0` 标签指向各自已发布源码；后续修复使用新的 commit，不移动已有标签。现有站点未连接 Git 自动部署；推送、合并和打标签不会更新线上站点。V3、V4 使用独立网址，旧站继续保留。`v4.0` 固定在表中发布基线；后续纹饰修正对应源码 `591d8c56b0819143a2bdab454068fd30921a2977`、部署 `6acef244237630dba7fa87fe`，详见[部署与公网复核记录](docs/changes/20261014-fixed-relief-alignment/deployment.json)及[凹凸对照](https://guangcai-no1-china-v4.netlify.app/evidence.html#fixed-relief-alignment)。

## 本地开发

要求 Node.js 22.12+、npm，以及支持 WebGL 2 的浏览器。两个应用均有独立锁文件；首次安装使用各自的 `npm ci`，不依赖外部电脑路径或共享的 node_modules 符号链接。

在仓库根目录执行（中国杯示例）：

```sh
npm --prefix guangcai-china-preview ci --cache .codex-work/cache/npm
npm --prefix guangcai-china-preview test
npm --prefix guangcai-china-preview run build
npm --prefix guangcai-china-preview run dev -- --port 5208
```

原版把命令中的目录改成 `guangcai-viewer`，使用不同端口。中国杯测试覆盖几何、浮点法线、固定图集及款式选择；V4 接缝修正记录中为 20 项通过。浏览器回归工具在各应用 `tools/` 下；根据实际运行端口设置 `QA_URL`，运行前确认输出位置，保留本轮结果，不以历史结果代替本轮验证。

中国杯 `prebuild` 会从保存的母版生成 WebP；如产生源码或素材清单差异，先核对原因。原稿及运行所需素材均在项目内；仅历史来源记录可能包含旧电脑绝对路径。

## 开发与发布

1. 开始前检查 Git 根目录、分支、upstream、状态和 diff。每项功能关联 Issue，从 main 建立 `codex/<task>` 分支；存在其他修改时使用独立 worktree。
2. 在本仓库直接修改、验证并形成原子提交，例如 `fix(china): align porcelain at artwork boundary`。根据当前任务授权推送并创建关联 PR；未完成的功能保持 Draft。
3. PR 审查和必要验证通过后按授权合并。原始历史补录已经保留为真实可达提交，不对既有分支强推或重写。
4. 版本标签只在对应版本验证完成且获得授权后创建，不能移动已发布标签。现有标签为 `v1.0`、`v2.0`、`v2.1`、`v2.2`、`v3.0`、`v4.0`、`v4.1`、`v4.2`；产品版本与普通开发提交分别管理，一个版本可包含多个提交。
5. 发布仅使用用户已授权的目标站点。从已记录的 Git 提交构建，保存站点 ID、提交 SHA、构建命令、部署 ID、文件哈希及回读结果。`.netlify/` 和凭据只留本地，不入库。

## 历史完整性

```sh
python3 tools/verify-archive.py
python3 tools/test_verify_archive.py
```

核验工具按固定 Git 提交读取历史源码，同时检查工作树中不可变的 `deployments/` 快照，因此不会把正常开发改动误判为旧版损坏。必须使用完整 Git 克隆；浅克隆先运行 `git fetch --unshallow origin`。下载 ZIP 不包含历史对象，工具会明确报告无法完成历史核验。

`docs/archive/`、`docs/history/` 和 `deployments/` 保存旧版本证据；不要覆盖原记录。缓存、临时测试和发布暂存放在 `.codex-work/`，通过 `git rev-parse --git-path info/exclude` 指向的仓库本地 exclude 忽略。安装或复制较大素材前检查磁盘空间。

4.2 保留原始颜色图、花果晕染与描线，用独立空白金底范围清理杂点和拖痕；对齐金属、粗糙度和凹凸，界面与 package 同步递增。[请求、验证与发布记录](docs/changes/20261014-floral-cleanup-4.2/completion.md)。
