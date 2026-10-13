# 广彩开发约定

- 正式远端为 `https://github.com/Shuang-su/guangcai.git`。编辑、测试、Git 操作在实际 Git 工作目录执行；开始前检查根目录、分支、upstream、状态与 diff，保护既有修改。
- 原版在 `guangcai-viewer/`；中国杯在 `guangcai-china-preview/` 持续演进。2.x 与 3.x 使用同一源码目录，通过功能分支、提交和版本标签保存旧版。不要继续在旧的非 Git 副本开发，不自动抽取公共代码。
- 每项功能关联 Issue，使用 `codex/<task>` 分支或独立 worktree，形成可审查的原子提交。按当前用户授权推送、创建 PR 和合并；未完成的开发保持 Draft。PR 合并与部署分别核实。
- 1.0/2.0/2.1/2.2 是已发布版本；3.0 完成后建立对应发布记录，之后按 3.1/3.2 演进。提交说明写实际改动，不伪造历史拆分或倒签日期。已发布标签不可移动。
- 两个应用各自 `npm ci`、`npm test`、`npm run build`；浏览器回归按改动选择。不要沿用旧结果声称新代码已通过。不要提交 node_modules 或外部机器依赖链接。
- `deployments/` 是按部署 ID 保存的不可变发布文件；新发布新增目录。历史源码核验固定到相应 commit，不限制当前源代码演进。`python3 tools/verify-archive.py` 需要完整 Git 历史；`python3 tools/test_verify_archive.py` 验证核验工具边界。
- 当前 Git 仓库不连接 Netlify 自动部署。仅按用户对目标站点的明确授权发布；现有站点不因 Git 接入而重发或回滚。3.0 沿用用户已批准的独立新站方案。
- `.netlify/`、凭据、登录配置、私钥和 `.env` 不得入库，也不得保存到缓存。发布记录写站点、版本、源码 SHA、命令、部署 ID 与结果，不写秘密。
- 缓存和暂存放在本项目 `.codex-work/`，通过 Git 本地 exclude 忽略。安装和复制前检查容量；只转移必要素材，不复制缓存和依赖目录。原稿与旧工作区保留；大文件按 GitHub 限制采用 Git LFS，不能只留下外部磁盘路径。
- 大变动在 `docs/changes/<日期>-<主题>/` 保留完整请求、最终计划、完成记录、验证与 checkpoint SHA。来源记录和历史证据保持真实，明确剩余视觉或设备验收边界。
