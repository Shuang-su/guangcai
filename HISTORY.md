# 补建的开发历史

> 更新：历史恢复 PR #8 已合入 main；后续 2.2 已按正常开发接入。以下验证与边界保留原恢复时的事实，当前版本状态见 [VERSION_HISTORY.md](VERSION_HISTORY.md)。

## 9月21日原始Web3D试验记录

2026-10-15已直接从恢复下载的旧Git核验 `a84650f` → `40fb17b` 两个原提交：各154个广彩文件、25个树payload，应用子树一致；只有完成记录两行不同。原始commit payload和根树证明见[9月21日记录](docs/history/20260921-original-git/README.md)。这是早于下表的独立试验工程，原SHA作为证据保存，未将混合仓库完整祖先链合入本仓库。

[三类工程说明](PROJECTS.md)区分早期Web3D、流程H5与正式Git产品开发。H5当前按文件归档，不虚构其逐轮Git历史。

## 9月29日起恢复的16个源码节点

本分支从两次原始开发会话的真实文件写入、补丁和保留快照恢复了 **16 个源码节点**：13 个基线前开发节点，以及 1.0、2.0、2.1。补录提交使用 2026-10-13 的真实提交时间；原修改时间只作为来源元数据，不伪造当时已有 Git 的历史。

`1.0` / `2.0` 继续代表本次约定的上线基线，`2.1` 是其后的布局修订。`pre.N` 仅表示早于该编号基线；其中一些节点当时也上线过，是否发布以下方清单为准。以后正常开发继续按 1.1、1.2 / 2.2、2.3 等编号。

| 节点 | 原修改时间（北京时间） | 实际修改 | 恢复 commit | 本次验证 |
| --- | --- | --- | --- | --- |
| 1.0-pre.1 | 09-29 20:16 | 初始参数化杯盖碟与 PBR | [5e94cd22](https://github.com/Shuang-su/guangcai/commit/5e94cd22949b94e490dccdca6f4d4532ef51143a) | 构建通过；运行素材由历史脚本重派生 |
| 1.0-pre.2 | 09-29 21:11 | 把手净空、UV 与参考器型修订 | [2c74efb6](https://github.com/Shuang-su/guangcai/commit/2c74efb6fde4bd36da5e6b2ff8976dd4541e26d5) | 构建通过；运行素材由历史脚本重派生 |
| 1.0-pre.3 | 09-29 22:08 | 底碟剖面与实拍叠图 | [8c078aec](https://github.com/Shuang-su/guangcai/commit/8c078aec9719adeba92cac8ae1aaad47f0ff0013) | 构建通过；运行素材由历史脚本重派生 |
| 1.0-pre.4 | 09-29 22:47 | 把手独立内外轮廓与盖把校准 | [d5f6ad59](https://github.com/Shuang-su/guangcai/commit/d5f6ad5982ed17548504492d930a7a915385cc83) | 构建通过；运行素材由历史脚本重派生 |
| 1.0 | 09-30 00:03 | 统一材质与密铺花纸，原版上线基线 | [8c7ad0b7](https://github.com/Shuang-su/guangcai/commit/8c7ad0b70d6a643e86aba303a91384c830321599) | 78 / 78 发布文件一致 |
| 2.0-pre.1 | 10-11 22:40 | 中国线稿金属面与城市图样 | [c5320ee1](https://github.com/Shuang-su/guangcai/commit/c5320ee1a02c012416870931c5eecf38bb5188b1) | 构建通过；运行素材由历史脚本重派生 |
| 2.0-pre.2 | 10-11 22:56 | 图样延伸至杯身底缘 | [2faa4db6](https://github.com/Shuang-su/guangcai/commit/2faa4db6c7b32bb1cd1a706cbad1902eacd73c54) | 构建通过；运行素材由历史脚本重派生 |
| 2.0-pre.3 | 10-11 23:10 | 金属哑光与柔和反光 | [e6eae6d5](https://github.com/Shuang-su/guangcai/commit/e6eae6d506df74774e82ab9ef80c19f4e7ebb50a) | 构建通过；运行素材由历史脚本重派生 |
| 2.0-pre.4 | 10-11 23:21 | 线条和金属底面参数分离 | [3d207e04](https://github.com/Shuang-su/guangcai/commit/3d207e0486971e43620e3975cc16cb235ad170ff) | 构建通过；运行素材由历史脚本重派生 |
| 2.0-pre.5 | 10-11 23:48 | 恢复线条层次并加入邻近部件反射 | [fd536a77](https://github.com/Shuang-su/guangcai/commit/fd536a775b3b860a6d64ad2983a87f52cec6c0cc) | 82 / 82 发布文件一致 |
| 2.0-pre.6 | 10-12 00:25 | WebP 与纹理加载重试 | [36a2ba73](https://github.com/Shuang-su/guangcai/commit/36a2ba73495d8822618caa6b10190efabd8a6f0b) | 98 / 98 发布文件一致 |
| 2.0-pre.7 | 10-12 01:34 | 首屏优化、右键双指平移与浓彩花鸟 | [667d6a5b](https://github.com/Shuang-su/guangcai/commit/667d6a5b2470661926da9323c4b9ebe34b713818) | 103 / 103 发布文件一致 |
| 2.0-pre.8 | 10-12 01:55 | 按效果图局部重建花鸟纹样并定位 | [4b283cc2](https://github.com/Shuang-su/guangcai/commit/4b283cc29a991a0eac1671305c0caf1f916a1b68) | 106 / 106 发布文件一致 |
| 2.0-pre.9 | 10-12 02:10 | 彩色花纹浅起伏与独立检查开关 | [c2115573](https://github.com/Shuang-su/guangcai/commit/c2115573a8752e842672bf00823cc268bf40d643) | 121 / 121 发布文件一致 |
| 2.0 | 10-12 02:18 | 加深彩色描线起伏，中国杯上线基线 | [23c23e33](https://github.com/Shuang-su/guangcai/commit/23c23e3353188a57153555c21ef0f19642c93361) | 122 / 122 发布文件一致 |
| 2.1 | 10-13 18:38 | 杯碟周向排列和把手侧饰带宽度 | [ea96b852](https://github.com/Shuang-su/guangcai/commit/ea96b85295f2ee26ae2fd1cb599495d3ca2f3e63) | 131 / 131 发布文件一致 |

## 如何找到和运行某个版本

直接打开表中的 commit，可查看当时完整源码及相邻节点差异。在独立检出目录中使用相应 SHA：

```sh
git clone git@github.com:Shuang-su/guangcai.git
git switch --detach <表中的完整 commit SHA>
cd guangcai-viewer # 中国杯使用 guangcai-china-preview
npm ci
npm run build
npm run dev
```

如果已有本地修改，先保留现场，使用另外的工作目录或 worktree，不要强制切换。这里的源码恢复与构建不触发任何线上发布。

## 来源与验证边界

- 原版会话 `01a0ed06-5ea9-7532-a412-9c5a7a53716e`，中国杯会话 `01a12b50-f453-7bb0-b232-93ddb671fa2c`。源码操作按原顺序在内存文件系统回放；实际历史 shell、部署、安装和清理命令未重放。这里只执行了独立副本内已审阅的素材派生、构建及几何测试。
- 16 个节点均通过 TypeScript / Vite 构建；已有几何测试的 15 个节点全部通过。8 个节点对应的发布目录共核对 841 项文件，SHA-256 全部一致。23 份独立保存的修改前源码也全部匹配。
- 原版最终恢复的源码和工具与 1.0 归档一致；中国杯最终源码、配置和工具与 2.1 归档一致。最终工作树重新汇入完整归档后，1421 个项目、证据和部署文件与 `codex/import-2.1 @ 17e5d12` 一致。
- `assets/` 保存补录时汇总的素材全集，包含各节点尚未使用的后续备选。实际运行引用由各节点源码和派生脚本决定。早期运行贴图使用保留母版或 PSD 与历史脚本重新导出，未宣称这些重新导出字节就是当时文件。
- 原版旧 Documents 目录的首次依赖锁曾因云端占位而不可读，2026-09-29 已重新生成现有外置盘锁；本次使用这份保留锁对应的安装依赖。当前验证环境 Node v26.3.0 / npm 11.16.0。本次没有对每个旧节点新增浏览器或实体手机视觉验收。
- 没有恢复每一次临时试调、仅浏览器内注入的候选、失败命令产生的半成品或未保存的编辑状态。保留的会话能证明本次列出的完整源码阶段，但不能证明不存在其他中间状态。
- 加载优化首次比对选中了名字带 `final` 的较早目录，JS 和 HTML 有两处差异；真实发布清单指向 `china-20261012-network`，改按该目录后 98 / 98 一致。首次差异记录仍保留，未通过修改源码掩盖差异。

详细记录：[各节点来源与文件哈希](docs/history/checkpoints/)、[本次构建和测试日志](docs/history/validation/)、[独立快照交叉核对](docs/history/snapshot-checks.json)、[完整归档端点核验](docs/history/source-endpoint-verification.json)。原始会话未上传；未包含隐藏推理、系统信息或凭据。

## 线上状态与补录范围

本次补录到 2.1（部署 `6ace09922a1b2f8945a7a41c`）为止。19:14 回读时，另一会话已于 19:08 独立发布后续背景功能 `6ace111ab0415c9455a3c6f8`；该新增功能尚未包含在本次历史链中，不将此分支称为当前中国杯线上源码。原版仍为 `6abbdf78d912b4b6b1d7c3b9`。

两个站点的 Git 关联仍为空。本次恢复没有执行 Netlify 发布、回滚、Git 自动部署绑定、PR 合并或 tag。回读见 [站点记录](docs/history/site-readback.json)。

历史补录审查：[Issue #7](https://github.com/Shuang-su/guangcai/issues/7) · [PR #8](https://github.com/Shuang-su/guangcai/pull/8)（基于 `codex/import-2.1`，未合并）。

[历史部署与源码对应表](docs/history/deployment-map.json) · [GitHub 分支、文件与 16 个 commit 回读](docs/history/github-readback.json)。
