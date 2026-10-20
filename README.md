# 广彩一号杯与中国杯

2026-10-20：V7.1.10 / v7-8 已合并上线：前后对比改为V7.1.4与当前，compare与独立dev新增实际城市曲面图案/白瓷占比、PSD与模型尺寸差异、三部件花纸尺寸与接缝说明、3D可贴面高亮。默认深圳＋拥抱瀚海图案25.94%、白瓷74.06%；现有约2.56%的UV宽高比差明确披露，正式资源与几何映射未改。[Issue #53](https://github.com/Shuang-su/guangcai/issues/53) · [本轮记录](docs/changes/20261020-v7.1.10-coverage-report/completion.md)。PR #54/#55/#56，部署 `6ad6c3ad0d1a73552408b968`；公网占比57项、核心30项通过，1187发布与归档文件核验一致。

2026-10-20：V7.1.9 / v7-8 已合并上线，修复23城卡片线稿不完整：完整R通道先缩小，再按相同目标尺寸组装金色透明图。城市69档、字框及PSD映射沿用v7-7原数据。[Issue #51](https://github.com/Shuang-su/guangcai/issues/51) · [本轮记录](docs/changes/20261020-v7.1.9-city-thumbnails/completion.md)。部署 `6ad6af47aa240e6a1c47b305`，线上23城卡片及4个独立视口92项通过。

2026-10-20：V7.1.8 / v7-7 已合并上线：统一正式页/开发iframe加载版本标识；PSD整版设计沿用已发布的V7.1.7。

2026-10-20：V7.1.7 / v7-7 已合并上线：按PSD有效框5433×2365等比映射蓝湖23城整版，取消额外82%缩放，城市和字框共用矩阵；报告及独立开发页同步修正。详见[本轮记录](docs/changes/20261020-v7.1.7-psd-layout/completion.md)。

2026-10-20：V7.1.6 / v7-6 已合并上线，修复独立开发页在持续慢下载时的错误总超时；字框、报告及实验素材沿用已发布的V7.1.5 / v7-6。

2026-10-20：V7.1.5 / v7-6 已合并发布，服务端文件核验完成。统一23城字框，成都文字6px归一；新增 [字框对比](https://guangcai-no1-china-v7.netlify.app/label-compare/) 和 [独立开发预览](https://guangcai-no1-china-v7.netlify.app/artwork-dev/)。正式城市描线沿用V7.1.4，实验页加入蓝湖当前稿与两城贝塞尔SVG。PR #44；冷加载开发页问题转V7.1.6修复，详情见本轮记录。

2026-10-19：V7.1.4 / v7-5 已合并并上线，更新23城描线与底部对齐，文字及字框沿用V7.1.3。新增 [逐城对比](https://guangcai-no1-china-v7.netlify.app/city-compare/) 与 [独立闭合建筑SVG试绘](https://guangcai-no1-china-v7.netlify.app/bezier-lab/)；发布核验以本轮完成记录为准。后台Excel/JSON仍为v7-4历史导出。

广彩项目的正式开发仓库，保存完整源码、必要设计素材、工具、修改记录和发布证据。仓库为私有；设计资料不代表公开授权。

本机当前主仓库为 `/Volumes/Prism_初号機/广彩/guangcai-main/`，稳定入口为同盘的 `guangcai-repo/`。旧工作区、历史工程恢复包及内盘失败下载包已按用户选择清理；源码和资源从正式 Git / Git LFS 按需取回，素材原件继续保留。位置与方法见[工作区说明](WORKSPACE_LOCATIONS.md)、[Git恢复说明](docs/changes/20261018-exfat-and-v4-retirement/restore-v4.md)及[最终清理回执](docs/changes/20261018-exfat-and-v4-retirement/completion.md)。这些路径描述本机布局，不是安装或部署前置条件。

本机继续使用 ExFAT 普通目录；Git 拉取建议使用 `python3 -B tools/git-exfat.py fetch origin main`，详见[伴随文件维护说明](tools/README-exfat.md)。

## 当前发布批次：V7.1.10 / v7-8

**后台配置入口：[Excel 数据表](guangcai-china-preview/integration/backend-handoff/V7后台配置数据表.xlsx) · [同源 JSON](guangcai-china-preview/integration/backend-handoff/backend-config.json) · [字段、录入步骤与扩展边界](guangcai-china-preview/integration/backend-handoff/README.md)。** 包含23城、五套配色、材质二维参数、六组祝福语及195项资源；说明城市拓展JSON、深浅HEX/HSL数组和应保存的作品参数。性能文档逐项说明12项机制及后续修正。V7.1.3按手机实拍修正三部分花纹方向、侧花纹底边和两个贴图白洞，补足上连接白瓷下沿，并修复杯碟近看高清被预算阻挡的问题。

[V7 用户预览](https://guangcai-no1-china-v7.netlify.app/) · [固定 V7.1.3 预览](https://6ad4995927bf346abcf5fcf4--guangcai-no1-china-v7.netlify.app/) · [V7.1.3 版本 Issue #35](https://github.com/Shuang-su/guangcai/issues/35) · [开发交接总入口 #29](https://github.com/Shuang-su/guangcai/issues/29) · [实现 PR #34](https://github.com/Shuang-su/guangcai/pull/34) · [验证与交付记录](docs/changes/20261018-v7.1.3-floral-correction/completion.md)

[接口与部署文档](guangcai-china-preview/integration/README.md) · [逐项性能机制](guangcai-china-preview/integration/PERFORMANCE.md) · [实拍对照与把手尺寸](guangcai-china-preview/evidence/v7.1.3/README.md)。资源默认 `v7-8`，保留 `v7-1`～`v7-7`；通过可选 `fixedMapping` 记录映射差异，作品字段不变。跨版本还原整套准备后提交，失败保留原作品。

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

V7.1.3发布验证：45项基础测试、33项V7测试，Chrome/WebKit消费者各85检查、花纸事务各44检查、城市各24轮及四版本还原通过；追加白瓷与杯碟高清问题各7检查、公网7检查通过。250个发布文件摘要和9个新资源下载哈希一致。10Mbps/100ms冷缓存三轮13.572～13.772秒、12,110,057字节，**原5MiB/6秒目标仍未达到**。iPhone13mini/iOS18连续30分钟、实际触感、Air/mini6上的V7视觉复测及正式COS接入待验收。各结果属于本次V7.1.3发布验证，后续文档修改不代表重新运行测试。

## V6 与历史站点

[V6 用户页](https://guangcai-no1-china-v6.netlify.app/) · [V6 开发工作台](https://guangcai-no1-china-v6.netlify.app/dev/) · [V6 对比审计](https://guangcai-no1-china-v6.netlify.app/audit/)

V6.0.4 发布源码 `833a8b3`，部署 `6ad314a2a5e661a14e469026`。[PR #28](https://github.com/Shuang-su/guangcai/pull/28) 已先合并。用户确认 iPhone Air/iOS27.0.1、iPad mini6/iPadOS16.6.1 在V6正常渲染折射；性能/触感与V7验收分开记录。本轮V7发布没有重发V6。

[V5 历史预览](https://guangcai-no1-china-v5.netlify.app/)和[V4 历史预览](https://guangcai-no1-china-v4.netlify.app/)继续保留；仓库未连接 Netlify Git 自动部署，Git合并与线上发布分别记录。

## 原件与旧工作区

[原件分类与下载索引](docs/changes/20261014-source-consolidation/source-index.md) · [来源与哈希](docs/changes/20261014-source-consolidation/source-manifest.json) · [范围和缺口](docs/changes/20261014-source-consolidation/completion.md) · [整理任务 #23](https://github.com/Shuang-su/guangcai/issues/23)。

已补录原始PSD、线稿、文档、照片视频、会话附件和旧工程产物，共3,661份去重内容、19,534处来源，11个大文件使用Git LFS。`archives/`保存实际对象，原文件名和各来源路径在索引中。已核验的重复工作区完成迁移与清理，原件保留在初号機盘，历史源码通过Git归档按需恢复，恢复方法见[位置说明](WORKSPACE_LOCATIONS.md)。

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

[工程关系、磁盘位置与还原方法](PROJECTS.md)。三类用途不等于三个Git工作树；当前主仓库独立维护，旧资料核验工作树与本地恢复包已清理，历史内容按Git索引取回。早期试验版与后来发布的一号杯也不是同一个发布版本。

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
| 6.0.4 独立预览 | 未新增标签，源码 `833a8b3` | [V6 固定预览](https://6ad314a2a5e661a14e469026--guangcai-no1-china-v6.netlify.app/) | `6ad314a2a5e661a14e469026` |
| 7.1.2 独立预览 | 未新增标签，源码 `6a9c4d3` | [V7.1.2 固定预览](https://6ad3be04e1ca085185e3e395--guangcai-no1-china-v7.netlify.app/) | `6ad3be04e1ca085185e3e395` |
| 7.1.3 独立预览 | 未新增标签，源码 `3283d27` | [V7.1.3 固定预览](https://6ad4995927bf346abcf5fcf4--guangcai-no1-china-v7.netlify.app/) | `6ad4995927bf346abcf5fcf4` |

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

V7 常规构建使用已生成的版本化资源，不重新生成母版。资源变动使用对应新版本的生成器；V7.1.3 / v7-4 为 `node tools/v7/compile-v7-4.mjs`，随后运行 `node tools/v7/validate-v7-4.mjs`，并核对来源哈希与派生物差异。历史 `textures:v7` 属于v7-1制作流程，不要用它覆盖已发布资源。原稿及运行所需素材均在项目内；仅历史来源记录可能包含旧电脑绝对路径。

## 开发与发布

1. 开始前检查 Git 根目录、分支、upstream、状态和 diff。每项功能关联 Issue，每个准备发布的小版本建立独立版本 Issue；从 main 建立 `codex/<task>` 分支，存在其他修改时使用独立 worktree。
2. 在本仓库直接修改、验证并形成原子提交，例如 `fix(china): align porcelain at artwork boundary`。根据当前任务授权推送并创建关联 PR；未完成的功能保持 Draft。
3. PR 审查和必要验证通过后按授权合并。原始历史补录已经保留为真实可达提交，不对既有分支强推或重写。
4. 版本标签只在对应版本验证完成且获得授权后创建，不能移动已发布标签。现有标签为 `v1.0`、`v2.0`、`v2.1`、`v2.2`、`v3.0`、`v4.0`、`v4.1`、`v4.2`、`v4.3`；产品版本与普通开发提交分别管理，一个版本可包含多个提交。
5. 发布仅使用用户已授权的目标站点。从已记录的 Git 提交构建，保存站点 ID、提交 SHA、构建命令、部署 ID、文件哈希及回读结果。`.netlify/` 和凭据只留本地，不入库。

## 版本 Issue 与交接索引

每个准备发布的小版本保留一个版本 Issue，标题采用 `V7.1.x：本版主题`，使用[版本记录模板](.github/ISSUE_TEMPLATE/version-release.md)。一个版本可关联多个功能/缺陷 Issue、提交和 PR。发布后的新修复进入下一版；原版本记录保留当时的范围、固定预览和验证结果。

| 入口 | 记录内容 |
| --- | --- |
| [V7.1.3 版本 Issue #35](https://github.com/Shuang-su/guangcai/issues/35) | 本版需求、实际改动、资源版本、关联PR、源码/部署/交付SHA、固定预览、验证和待验收项 |
| [开发交接总入口 #29](https://github.com/Shuang-su/guangcai/issues/29) | 后台配置、12项性能机制、接口/COS/身份接入责任和各版本入口；更新公共说明时保留历史版本证据链接 |
| [版本索引](VERSION_HISTORY.md) | 按版本查找Issue、PR、源码和实际部署；已发布记录不覆盖 |

PR使用 `Refs #35` 这样的引用关联对应版本Issue。完成代码合并与部署后，补齐线上回读和设备验收结果；未完成项验证通过，或明确转入关联后续Issue并说明接收责任与验收条件后，再关闭版本Issue。不要让PR的自动关闭关键字提前结束仍待验收的版本记录。

发布时同步仓库首页、应用README和版本索引。此前版本继续保留原PR和完成记录；若补建历史Issue，明确标注“历史补录”及补录日期，不倒签日期或用新结果替代当时证据。

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



## V7.1.4 描线与素材查看

新资源保留原PNG导出缩放，23城三级实色描线均贴到底部。9个文件像素有变化，其中景德镇5像素、郑州6像素不改变二值金线，复用已审核几何；14个文件完全相同。西安保留已批准的建筑填色。六组文字、字框、固定花纸与底印保持v7-4。

`/city-compare/` 提供23城逐项对比；`/bezier-lab/` 是另一个聊天最新两城独立闭合SVG试绘，含22个独立对象，不替换应用图案。

[V7.1.4 Issue #41](https://github.com/Shuang-su/guangcai/issues/41) · [本轮完成记录](docs/changes/20261019-v7.1.4-city-comparison-publish/completion.md)。当前后台表格为v7-4导出；接入v7-5时以更新后的bootstrap、catalog、manifest和JSON Schema为准。

V7.1.4实际发布：源码 `5991ec274757b984b2b19873d254027829bf2e48`，[PR #42](https://github.com/Shuang-su/guangcai/pull/42)，[固定预览](https://6ad61f84c8773f7fd5ee6756--guangcai-no1-china-v7.netlify.app/)；769份服务器摘要、195项公网资源，以及杯身40/对比35/SVG19项检查通过。六组旧文字字框保留，SVG单独审阅。
