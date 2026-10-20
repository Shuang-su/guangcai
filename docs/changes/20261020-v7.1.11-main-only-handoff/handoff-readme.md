# 城市共彩 V7.1.11 正式主页开发交付

**仅交付无后缀的正式主页 `/`**。正式深圳保留原稿，二期 APEC 深圳不包含在本包。

| 文件 | 用途 |
| --- | --- |
| source-main.tar.gz | 正式主页源码、锁文件、vendor、正式运行资产、PSD/当前可读制作资产、45 项基础测试 |
| production-main.tar.gz | 从现有 V7.1.11 固定生产归档筛出的正式主页静态文件，可独立托管 |
| CURRENT-RESOURCES.json | 当前 v7-9 bootstrap、catalog、manifest；23 城、6 祝福语、196 个正式资源描述 |
| SOURCE_REVISION.json | 原产品源码与打包快照的 commit、范围和仅用于交付的构建配置调整 |
| source-files.json / production-files.json | 每文件大小与 SHA-256；源码标注三个交付配置覆盖项 |
| verification/ | 该正式主页包自己的解包、构建、浏览器和文件核验结果 |
| SHA256SUMS | 总校验清单 |

本包排除 artwork-dev、label-compare、city-compare、bezier-lab、coverage、integration、audit、dev 独立页面及其专属公共资源；没有 APEC 二期贴图。正式运行所需的历史 v7-1～v7-9 releases 是内部资源路径，保留用于既有设计恢复，不代表交付其他后缀产品。

## 开发

需要 Node.js（Vite 要求 ^20.19.0 或 >=22.12.0）及 npm；本次使用 Node 26.3.0 / npm 11.16.0。不依赖 GitHub，但第一次安装需要 npm registry 网络。

```sh
shasum -a 256 -c SHA256SUMS
tar -xzf source-main.tar.gz
cd source/guangcai-china-preview
npm ci --cache .codex-work/cache/npm
npm test
npm run build
npm run dev
```

开发地址为 http://127.0.0.1:5270/ 。构建输出 `.codex-work/deploy/v7-build/`；`npm run preview -- --port 4173` 可预览。

交付副本只收拢了三个配置：package.json 的命令入口、tsconfig.json 的源码范围、vite.config.ts 的单主页输入与正式资源复制列表。业务 src、正式深圳、城市线稿、字框、杯体几何和材质仍沿用生产源码，未因打包调整。

随附 PSD / 已展开制作资产供接手参考；本包不含完整资产再生成工作流、旧版完整 Git 历史或 GitHub 元数据。前端继续开发、测试和构建不依赖它们。当前正式资源以 CURRENT-RESOURCES.json 为准，未放入旧后台 Excel 冒充当前配置。

## 静态使用

```sh
tar -xzf production-main.tar.gz
python3 -m http.server 4174 --directory production/site
```

访问 http://127.0.0.1:4174/ 。应使用 HTTP 服务，不以 file:// 打开。production/site/ 只有一个 HTML 入口 index.html；其文件逐一核对固定部署 6ad6fcdcf1f9e6ca6c7c5330 的原始 SHA-256。包内命令不自动部署、不修改已有线上站点。

## 已知边界

- 当前正式版本仍是 V7.1.11 / v7-9；生产原源码 cd8159b3c93b4b7083526f521d5a4c01e919219d。GitHub 暂停，合并/后续同步仍待恢复；这个包不代表 main 已合并，也没有外部发送。
- PSD 与杯体几何 / UV 重新标定尚未实施，现有白瓷余带与顶部映射差异仍保留，不能把本包当作尺寸重标定结果。
- npm 审计的 sharp@0.34.5、source-map-js@1.2.1 两项开发依赖 high 风险保留为待办；未自动升级依赖锁文件。
- iPhone / iPad 真机与生产后端账号、COS、数据库联调仍待验收；本包不含后端服务、凭据、.env、.netlify 或 node_modules。
- 正式城市资源包含本轮西安闭合版与五城指定内部镂空；摩天轮座舱、轮圈、轮毂、支架保留填色。深圳继续使用原正式稿。
