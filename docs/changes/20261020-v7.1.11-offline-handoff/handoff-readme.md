# 城市共彩 V7.1.11 开发交付

资源版本 **v7-9**。SOURCE_REVISION.json 区分本次源码快照 commit 与已上线源码 commit。生产部署固定为 **6ad6fcdcf1f9e6ca6c7c5330**，原生产源码 **cd8159b3c93b4b7083526f521d5a4c01e919219d**。

固定线上预览：https://6ad6fcdcf1f9e6ca6c7c5330--guangcai-no1-china-v7.netlify.app/

## 文件用途

| 文件 | 内容 |
| --- | --- |
| source.tar.gz | 当前可读已提交源码、依赖锁文件、vendor、v7-1～v7-9、PSD/已展开母版、新西安/深圳原稿、报告/dev、验证记录 |
| production.tar.gz | 与已上线版本对应的静态 site/、原部署清单和验证记录，可用于静态托管及回退 |
| CURRENT-RESOURCES.json | 实际 bootstrap/catalog/manifest 导出；23 城、6 祝福语、196 个正式资源描述（含成都专用字框） |
| source-files.json / production-files.json | 每文件字节数与 SHA-256；源码另含 Git blob ID |
| SOURCE_REVISION.json / package-receipt.json | 源码、资源、部署、压缩包身份 |
| unavailable-history.json | 稀疏检出中未展开的历史文件清单，未在 GitHub 暂停时尝试取回 |
| verification/ | 本次解包、安装、测试、构建及校验结果，区别于包内历史验证 |
| SHA256SUMS | 交付文件的总校验清单 |

## 开发启动

需要 Node.js（Vite 要求 ^20.19.0 或 >=22.12.0）和 Python 3。本次工具链为 Node 26.3.0 / npm 11.16.0。Python 图像再生成还需 Pillow、NumPy；普通运行与构建不需要它们。

```sh
shasum -a 256 -c SHA256SUMS
# 解压到一个新的目录
tar -xzf source.tar.gz
cd source/guangcai-china-preview
npm ci --cache .codex-work/cache/npm
npm run dev
```

开发入口通常为 http://127.0.0.1:5270/ 。依赖安装使用 npm registry，不需要 GitHub；包内不含 node_modules，首次安装需要网络，不是完全断网的安装包。实际端口以 Vite 输出为准。

```sh
npm test
npm run build:integration
npm run test:v7
npm run build
BUILD_REPORT=.codex-work/consumer-build.json node tools/v7/check-build.mjs
npm run preview -- --port 4173
```

消费者构建输出：`.codex-work/deploy/v7-build/`。联调入口和数据契约见 `integration/README.md`；`npm run mock:v7` 用于本地模拟后端。生产账号、COS、数据库映射仍需接手方配置及验收。

## 静态包查看

```sh
tar -xzf production.tar.gz
python3 -m http.server 4174 --directory production/site
```

访问 http://127.0.0.1:4174/ ，不要以 file:// 打开。production/site/ 是可独立静态托管的产物；包内命令不会自行部署或覆盖线上站点。

## 当前包含的更新

西安闭合版修复填色破洞；重庆来福士三处楼间隙、北京 CCTV 中空、青岛两处建筑间隙、南昌/天津摩天轮内部按指定范围镂空，座舱、轮圈、轮毂与支架保留填色。

正式主页深圳仍为原稿。二期 APEC 深圳只在 `/artwork-dev/?art=phase2`；`/label-compare/` 主基线为 V7.1.4 → 当前，另有 V7.1.10 → V7.1.11 六城专项对比。`/artwork-dev/` 与 `/bezier-lab/` 保留可切换开发入口，独立于正式主页。

## 交接边界与待办

- GitHub 账号暂停：既有 PR #58、Issue #57 尚待同步；源码含本地后续提交，不代表已合并 main。本包未发送给其他人，也没有重新部署。
- **PSD / 杯体重新标定尚未实施**。当前城市面 300°、花纸约 57°、白瓷余带约 3°，顶部额外约 3.46mm 是当前映射结果，需要裁切线、出血/搭接余量与实物尺寸继续确认，不能当作已认可生产尺寸。
- 模型仍使用现有照片估算参数。PSD 展开图不能独立确定杯盖、杯脚、把手与壁厚；不要靠拉伸贴图掩盖几何尺寸偏差。
- `integration/backend-handoff` 的旧 Excel/JSON 是历史 v7-4（195 项），未在本轮更新；当前正式资源以 CURRENT-RESOURCES.json 和 public/api/v1/bootstrap.json 为准。
- 本包是当前中国杯开发快照，**不是完整 Git 仓库或全部项目备份**。不含 .git、另一应用、全部旧部署和未展开稀疏历史；当前开发/测试/构建在独立目录核验，旧资源重生成或完整历史审计可能仍需 unavailable-history.json 中的历史文件。
- 随包包含当前 PSD、实际已展开母版与新西安/深圳原稿；其他磁盘上的完整设计工作目录不属于本次源码快照。
- 真机 iPhone / iPad 和生产后端仍待验收；包内既有浏览器结果不代表本次新增真机验证。
- 不包含凭据、.env、.netlify、node_modules、缓存或本机登录状态；接手方自行配置部署账号。
