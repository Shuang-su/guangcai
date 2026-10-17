# 广彩一号杯与中国杯

广彩项目的正式开发仓库，保存完整源码、必要设计素材、工具、修改记录和发布证据。仓库为私有；设计资料不代表公开授权。

## 当前开发交付候选：V7.1.1

[V7 用户预览](https://guangcai-no1-china-v7.netlify.app/) · [开发交接文档](guangcai-china-preview/integration/README.md) · [逐项性能机制](guangcai-china-preview/integration/PERFORMANCE.md) · [V7 Issue #29](https://github.com/Shuang-su/guangcai/issues/29) · [验证与完成记录](docs/changes/20261017-v7-v6-sync-handoff/completion.md)

V7.1.1 同步 V6.0.4 的独立液态折射、收起动画和持续下载修正，保留杯壁/杯盖反射、金线、字形与既有触感路径。进入设计前准备全部23城低清、当前及相邻高清、6组裁切文字和固定花纸；显示实际进度、速率及应用资源估算。仅按需解码/绘制，预算和持续帧耗超限时回退磨砂，Safari 缺少内存接口不会直接降级。

交付内容包括版本化资源、OpenAPI、JSON Schema、公司账号/作品/修订/分享关系说明，以及独立可运行的保存/还原/分享 mock。正式身份、数据库、业务后端和COS发布由公司接入；mock仅使用本地合成用户，不用于生产。

```sh
cd guangcai-china-preview
npm ci --cache .codex-work/cache/npm
npm run dev                     # http://127.0.0.1:5270/
npm run build                   # .codex-work/deploy/v7-build/
npm run build:integration
npm run mock:v7                 # http://127.0.0.1:5271/integration/
```

[应用说明](guangcai-china-preview/README.md) · [OpenAPI](guangcai-china-preview/integration/contracts/openapi.json) · [作品格式](guangcai-china-preview/integration/contracts/design.schema.json) · [资源格式](guangcai-china-preview/integration/contracts/resource-manifest.schema.json) · [版本索引](VERSION_HISTORY.md)

V7.1.1 补充：当前深圳高清实际显示后才进入，稳定切城自动提清、左右邻城动态预载；正常材质替换按峰值额度核算，不因新旧图短暂叠加误降级。西安内部填色补齐为 v7-2，v7-1 保留回放。法线保留半浮点 X/Y、运行时重建 Z，环境反射释放用完的深度缓冲。每项触发条件、缓存、取消、预算、失败处理及测试见性能文档。

最新验证以完成记录和 evidence/v7-corrections 为准；此前V7.1.0自动化没有覆盖切城后实际高清及玻璃保留，不能用旧通过记录代替本次复核。iPhone13mini/iOS18连续30分钟、实际触感，以及Air/mini6上的V7视觉复测仍待用户验收。原5MiB/6秒目标未通过，不将桌面浏览器结果写成真机验收。

## V6 与历史站点

[V6 用户页](https://guangcai-no1-china-v6.netlify.app/) · [V6 开发工作台](https://guangcai-no1-china-v6.netlify.app/dev/) · [V6 对比审计](https://guangcai-no1-china-v6.netlify.app/audit/)

V6.0.4 发布源码 `833a8b3`，部署 `6ad314a2a5e661a14e469026`。[PR #28](https://github.com/Shuang-su/guangcai/pull/28) 已先合并。用户确认 iPhone Air/iOS27.0.1、iPad mini6/iPadOS16.6.1 在V6正常渲染折射；性能/触感与V7验收分开记录。本轮V7发布没有重发V6。

[V5 历史预览](https://guangcai-no1-china-v5.netlify.app/)和[V4 历史预览](https://guangcai-no1-china-v4.netlify.app/)继续保留；仓库未连接 Netlify Git 自动部署，Git合并与线上发布分别记录。

## 原件与旧工作区

[原件分类与下载索引](docs/changes/20261014-source-consolidation/source-index.md) · [来源与哈希](docs/changes/20261014-source-consolidation/source-manifest.json) · [范围和缺口](docs/changes/20261014-source-consolidation/completion.md) · [整理任务 #23](https://github.com/Shuang-su/guangcai/issues/23)。

已补录原始PSD、线稿、文档、照片视频、会话附件和旧工程产物，共3,661份去重内容、19,534处来源，11个大文件使用Git LFS。`archives/`保存实际对象，原文件名和各来源路径在索引中。已核验的重复工作区完成迁移与清理，原件和历史工程集中保留在初号機盘，恢复方法见[位置说明](WORKSPACE_LOCATIONS.md)。

北京工作区此前3593个云占位已全部按字节核验；2026-10-15旧 `New project/.git` 的云占位也清零，9月21日两个原提交的完整广彩项目快照均已校验，各154个文件、25个树payload。新增初始完成记录原字节保存在[原始Git证据](docs/history/20260921-original-git/README.md)，其余内容复用档案。此项补录与既有16个源码恢复节点互补，不整条导入混合仓库其他项目历史。

原22个失效附件路径现已按用户确认处理：17张照片与1份PSD为用户移动，PDF保留无水印版，3张旧临时截图不再追查。19份保留文件均与Git归档SHA-256一致；旧路径失效事实保留，不把无水印PDF或放弃追查的截图写成原字节找回。[附件处理与内部查重](docs/changes/20261015-attachment-resolution-and-duplicates/report.md)记录1,205组完全相同的内容及用途，其中素材原件内部仅2组重复。该次盘点仅查重；随后按用户明确授权完成[核对与实际去重](docs/changes/20261015-verified-dedup-cleanup/completion.md)：删除5处已归档构建／部署暂存和2张重复图片，共1,494个内容文件及1,603份配套元数据，初号機净回收约1.47 GiB。该次清理时应用的1,136份受保护文件与保留图片哈希不变；有运行、制作或验收用途的相同内容继续保留。

首次克隆资料库需要安装Git LFS；空间有限时可先用 `GIT_LFS_SKIP_SMUDGE=1 git clone`，再选择所需档案下载。LFS指针不是原文件，读取时应确认真实内容已取回。

V4 经 [PR #15](https://github.com/Shuang-su/guangcai/pull/15) 汇入开发分支，再由 [PR #13](https://github.com/Shuang-su/guangcai/pull/13) 合入 `main`；杯身饰带旁釉面接缝修正由 [PR #16](https://github.com/Shuang-su/guangcai/pull/16) 合入。当前发布记录包含颜色覆盖、自动旋转方向和接缝修正。

## 三类工程

| 工程 | 用途 | 当前状态 |
|---|---|---|
| 早期Web3D试验 | 最初杯、盖、碟展示，验证器型、材质与交互 | 历史工程及原始Git证据，保留可恢复来源 |
| 广彩流程H5 | 为APEC添彩：开场、五步选择、海报、成果与榜单框架 | 独立非Git工程，文件已归档；尚未作为正式应用接入本仓库 |
| 正式Git产品工程 | 一号杯和中国杯的持续开发 | 本仓库；两个应用分别为 `guangcai-viewer/`、`guangcai-china-preview/` |

[工程关系、磁盘位置与还原方法](PROJECTS.md)。三类用途不等于三个Git工作树；开发与资料核验工作树共用本仓库。早期试验版与后来发布的一号杯也不是同一个发布版本。

## 项目与版本

- `guangcai-viewer/`：原版一号杯，当前发布基线 1.0。
- `guangcai-china-preview/`：中国杯持续开发目录。2.x → 3.0 → 4.0 → 后续版本在同一目录演进，通过功能分支和发布标签定位，不再为每版复制一套长期维护的源码。
- `main`：按合并顺序保留原版、中国杯及后续版本链；源码、发布、验收状态以版本索引和对应PR为准。
- [版本与部署索引](VERSION_HISTORY.md) · [恢复的 16 个历史节点](HISTORY.md) · [开发接入记录](docs/changes/20261013-git-development/completion.md)。

| 已发布版本 | Git 标签 | 站点 | 部署 ID |
| --- | --- | --- | --- |
| 1.0 | `v1.0` | [原版一号杯](https://guangcai-no1.netlify.app/) | `6abbdf78d912b4b6b1d7c3b9` |
| 2.2 | `v2.2` | [中国杯](https://guangcai-no1-china.netlify.app/) | `6ace111ab0415c9455a3c6f8` |
| 3.0 预览 | `v3.0` | [高清中国杯 V3](https://guangcai-no1-china-v3.netlify.app/) | `6ace443df7425f433e717eb0` |
| 4.0 预览 | `v4.0` | [主题与釉彩 V4](https://guangcai-no1-china-v4.netlify.app/) | `6aced018c70635a1ad24cbbe` |
| 4.1 预览 | `v4.1` | [纹饰凹凸修复](https://guangcai-no1-china-v4.netlify.app/) | `6acef244237630dba7fa87fe` |
| 4.2 预览 | `v4.2` | [花纹金底清洗](https://guangcai-no1-china-v4.netlify.app/) | `6acefdc52ef3d568cd9acedd` |
| 4.3 预览 | `v4.3` | [北京主题与五款配色](https://guangcai-no1-china-v4.netlify.app/) | `6acf18984f3abc04fe3cab18` |
| 5.4.2 独立预览 | 未打标签，源码 `156dc368` | [城市与自由创作 V5](https://guangcai-no1-china-v5.netlify.app/) | `6ad20c45a7780e55fedba3d7` |

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

原版把命令中的目录改成 `guangcai-viewer`，使用不同端口。中国杯测试覆盖几何、浮点法线、固定图集、城市选择、二维控件与触感映射；V5.4.2 的 35 项应用测试、构建和浏览器检查见[完成记录](docs/changes/20261016-short-screen-lift/completion.md)。浏览器回归工具在各应用 `tools/` 下；根据实际运行端口设置 `QA_URL`，运行前确认输出位置，保留本轮结果，不以历史结果代替本轮验证。

V7 常规构建不会重新生成母版资源；只有资源变动时才显式运行 `npm run textures:v7`，并核对来源哈希与派生物差异。原稿及运行所需素材均在项目内；仅历史来源记录可能包含旧电脑绝对路径。

## 开发与发布

1. 开始前检查 Git 根目录、分支、upstream、状态和 diff。每项功能关联 Issue，从 main 建立 `codex/<task>` 分支；存在其他修改时使用独立 worktree。
2. 在本仓库直接修改、验证并形成原子提交，例如 `fix(china): align porcelain at artwork boundary`。根据当前任务授权推送并创建关联 PR；未完成的功能保持 Draft。
3. PR 审查和必要验证通过后按授权合并。原始历史补录已经保留为真实可达提交，不对既有分支强推或重写。
4. 版本标签只在对应版本验证完成且获得授权后创建，不能移动已发布标签。现有标签为 `v1.0`、`v2.0`、`v2.1`、`v2.2`、`v3.0`、`v4.0`、`v4.1`、`v4.2`、`v4.3`；产品版本与普通开发提交分别管理，一个版本可包含多个提交。
5. 发布仅使用用户已授权的目标站点。从已记录的 Git 提交构建，保存站点 ID、提交 SHA、构建命令、部署 ID、文件哈希及回读结果。`.netlify/` 和凭据只留本地，不入库。

## 历史完整性

```sh
python3 tools/verify-source-collection.py HEAD
python3 tools/verify-hydrated-legacy-git.py --ref HEAD
python3 tools/verify-archive.py
python3 tools/test_verify_archive.py
```

核验工具按固定 Git 提交读取历史源码，同时检查工作树中不可变的 `deployments/` 快照，因此不会把正常开发改动误判为旧版损坏。必须使用完整 Git 克隆；浅克隆先运行 `git fetch --unshallow origin`。下载 ZIP 不包含历史对象，工具会明确报告无法完成历史核验。

`docs/archive/`、`docs/history/` 和 `deployments/` 保存旧版本证据；不要覆盖原记录。缓存、临时测试和发布暂存放在 `.codex-work/`，通过 `git rev-parse --git-path info/exclude` 指向的仓库本地 exclude 忽略。安装或复制较大素材前检查磁盘空间。

4.2 保留原始颜色图、花果晕染与描线，用独立空白金底范围清理杂点和拖痕；对齐金属、粗糙度和凹凸，界面与 package 同步递增。[请求、验证与发布记录](docs/changes/20261014-floral-cleanup-4.2/completion.md)。

4.3 [北京主题的请求、素材与验证记录](docs/changes/20261014-beijing-4.3/completion.md)，关联 [Issue #21](https://github.com/Shuang-su/guangcai/issues/21)。


