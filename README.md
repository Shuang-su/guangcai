# 广彩一号杯：两个已上线版本的源码归档

此仓库保存一号杯原版与中国杯预览版的完整前端源码、运行素材、生成母版、校验工具、历史变更记录和部署证据。仓库为私有，原始设计资料不作为公开授权素材。

## 版本与部署

| 版本 | 源码目录 | 现有线上站点 | 本次核验的部署 ID |
| --- | --- | --- | --- |
| **1.0 一号杯原版** | `guangcai-viewer/` | https://guangcai-no1.netlify.app/ | `6abbdf78d912b4b6b1d7c3b9` |
| **2.0 中国杯基线** | `guangcai-china-preview/` @ `b86503c` | [历史固定部署](https://6acbd24fa545c331cdd20dae--guangcai-no1-china.netlify.app/) | `6acbd24fa545c331cdd20dae` |
| **2.1 中国杯布局修订** | `guangcai-china-preview/` 当前目录 | https://guangcai-no1-china.netlify.app/ | `6ace09922a1b2f8945a7a41c` |

两个项目在首次入库前都没有 `.git`、提交历史或远端。此次 Git 历史从 2026-10-13 的真实导入开始；不能据此还原过去每次编辑的提交顺序。旧请求、计划、完成记录、素材版本和中间截图作为历史文件原样保留，其时间以文件内记录为准。

两个目录同时保留，因为它们对应两个独立运行的站点；不把原版覆盖成中国杯版，也不提前抽取公共代码。中国杯原有校验脚本还引用相邻原版的文件摘要。导入采用相承的 PR：1.0 原版先导入，2.0 中国杯以 1.0 为基线，2.1 布局修订再以 2.0 为基线。各自的 issue 记录来源和验收证据。`main` 初始只含归档说明，待审查合并后才包含源码；完整双版本快照位于 [`codex/import-2.1`](https://github.com/Shuang-su/guangcai/tree/codex/import-2.1)。详细版本索引见 [VERSION_HISTORY.md](https://github.com/Shuang-su/guangcai/blob/codex/import-2.1/VERSION_HISTORY.md)。

**版本约定：** 已上线原版为 1.0，已上线中国杯为 2.0；后续各自用 1.1、1.2… 和 2.1、2.2… 记录可审查改动。提交与 issue/PR 的编号表示代码进度，只有部署回读通过才标记“已上线”。历史 `package.json` 和素材清单的内部编号保持原样，产品版本以版本索引为准。

**本仓库没有连接 Netlify、配置部署工作流或保存部署凭据。推送和 PR 不更新现有站点。** 归档期间另一任务独立完成了中国杯 2.1 的发布，本仓库据此追加真实代码差异与 131 个发布文件。此前 2.0 仍可由 Git 提交或固定部署查看。两个目录中的 `netlify.toml` 与历史发布命令仅作为原项目资料保留；后续发布仍需要用户明确授权。

## 保存范围

- 两个项目的 TypeScript / Three.js 源码、HTML、样式、锁文件、配置和全部工具。
- 完整 `assets/` 与 `public/`：PBR 通道、生成母版、提示词、中国杯 PSD / PDF / JPG 原稿副本、图层提取结果及历史纹样。
- 原版公共 `evidence/`、中国杯 `evidence/` / `output/` / `out/`、全部 `docs/changes/`，包括已记录的失败与中间版本。
- `deployments/<站点名>/<部署 ID>/`：按原发布清单核验的实际发布文件快照。清单外未发布的文件留在各自源码目录中。
- `docs/archive/`：首次导入清单、文件摘要、版本边界、部署关联和本轮验证记录。

不纳入 `node_modules/`、`.codex-work/`、`.netlify/`、可再构建的 `dist/`、系统索引与 AppleDouble 文件。源码外的原始拍摄照片和视频不复制；项目使用的参考图、预览、索引及中国杯设计原稿副本已随项目保留。绝对路径仍保留在历史记录中表示来源，不能假定别的电脑有这些路径。

## 使用与校验

两个项目分别安装依赖，运行命令见各自历史 README。新克隆中执行 `npm ci`；不要复制其他电脑的 `node_modules` 链接。纹样重生成可能改写导出图及时间戳，应与原始归档分开进行。

```sh
python3 tools/verify-archive.py
cd guangcai-viewer
npm ci
npm test
npm run build
```

中国杯使用相同的 `npm ci` / `npm test` / `npm run build` 流程；其 `prebuild` 会重新生成 WebP。离线核验部署快照不需要安装 Node 依赖：`python3 tools/verify-archive.py` 会核对入库文件和实际发布文件的 SHA-256。

本仓库的本机工作目录使用 `.codex-work/` 存放缓存和验证输出，并通过 `.git/info/exclude` 排除。新克隆开始工作前同样配置本地 exclude。首次导入记录见 `docs/changes/20261013-github-archive/`。

## 会话历史恢复

已补建原版 4 个、中国杯 9 个基线前源码节点，并串联 1.0、2.0、2.1；完整源码可按 commit 检出。查看 [开发历史和验证记录](HISTORY.md)。这些是真实源码操作的当前补录，提交日期未倒签；不会触发线上发布。
