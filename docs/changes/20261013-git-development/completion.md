# 广彩 Git 开发接入完成记录

## 实际完成

Shuang-su/guangcai 已作为持续开发仓库。主分支包含完整原版和中国杯 2.2；原开发会话「更新中国杯留白图样规则」已在正式 Git 工作目录的 codex/china-3.0 分支继续修改并推送，3.0 保持 Draft PR，视觉与新站发布仍在进行。

- 按顺序保留提交合并 PR #4、#5、#6、#8，16 个恢复源码节点全部可达；未强推、重写或倒签历史。
- 2.2 背景功能通过 PR #10 合入，主线接入基线为 `99e26b079ce546fcc4943525b7f72034262a90db`。新增44、修改21、删除0个应用文件，保存135个真实发布文件。
- 2.2 源码 checkpoint：`b2c2bd4dd0fee80ad073ae34087dfe588a671740`；开发规则 checkpoint：`eacadc390571c26ac6740b24103bf6d5e0225dee`；首轮远端核验记录 checkpoint：`2a4dd52`。
- v1.0、v2.0、v2.1、v2.2 附注标签已推送并核对指向。标签创建时间是本次接入时间，原实际发布时间由部署记录表达。
- README、AGENTS、版本索引及两应用说明更新为正常项目流程。中国杯在同一源码目录演进，Issue→功能分支→原子提交→PR；Git 合并与部署分别验证。
- 历史核验按固定提交读取源码、素材和证据，并检查工作树中不可变部署；缺少版本清单或历史对象时明确失败。

## 开发会话接入证据

- 正式根目录：`/Volumes/Prism/Codex/guangcai-github-20261013`；远端：`https://github.com/Shuang-su/guangcai.git`；中国杯目录：`guangcai-china-preview/`。
- 分支：`codex/china-3.0`；[Issue #11](https://github.com/Shuang-su/guangcai/issues/11)；[Draft PR #13](https://github.com/Shuang-su/guangcai/pull/13)。
- 接入提交：`17bd92f34adb580d8b83adabe17eef8282856db6`。85 个文件 / 82,438,632 字节从保存的旧副本与 Git 提交逐一交叉核对，全部一致，无业务文件删除。两个证据路径调整单独记录。2.2 是接入提交的祖先，原版源码与旧部署目录未变。
- 接入后的真实开发提交：`de4e366f64c859b4d07af2848e3506f904d23c3a`，继续校准花带定位、整理可复现素材工具和杯盖对照；已经 push 并通过 GitHub PR head 与文件对象回读。
- 旧非 Git 副本保留作备份。当前正式分支继续有后续开发工作，不把正在修改的现场当作需要清理的脏文件。
- 迁移由原开发会话独占完成；本会话仅在另一个已有 worktree 更新全局接入记录和原版 README，没有并行改动中国杯运行源码。

## 验证

- 两应用分别 npm ci 安装锁定依赖，原版6项、中国杯10项测试及 TypeScript/Vite 构建通过。
- 重新构建的原版78个、2.2的135个发布文件与实际清单 SHA-256 逐项一致。
- 16个历史提交可达，4份版本清单共2993条记录核验通过；该数字含不同历史版本共用文件。
- 新增5项核验工具边界测试通过：必需清单缺失、版本错误、历史对象缺失、允许当前源码修改、禁止修改冻结部署。
- GitHub main 初次接入的1721个文件对象与本地对应树一致；后续3.0分支文件对象另行完整核对。node_modules、.netlify、.codex-work、.env 未入库。
- GitHub 渲染 README 已确认是正常开发入口，版本表可见。PR与标签状态均回读。
- 两旧站合并后仍 ready，原版部署 `6abbdf78d912b4b6b1d7c3b9`，中国杯2.2部署 `6ace111ab0415c9455a3c6f8`，Git绑定仍为空。

## 处理、风险与工作边界

- 2.0和历史恢复合并仅有 README 文字冲突，保留双方版本和来源信息后解决；应用代码无合并冲突。
- GitHub 在推送后短暂返回合并状态未就绪，回读头提交及可合并状态后完成，未绕过保护或检查。
- 全量空白检查命中已发布压缩 JS、原始 before 和历史 patch 中的空白。为保持哈希与来源原样保留；当前源码、工具和新文档空白检查通过。
- 起始磁盘约2GB可用，因此使用既有工作目录、控制复制量，不复制缓存或旧依赖，不删除源文件及其他项目。
- Git 接入本身没有发布、回滚或连接 Netlify 自动部署。3.0视觉、交互、真实手机验收及独立新站发布由原开发会话继续处理；此记录不宣称3.0已完成或已上线。
- 详细证据：baseline-validation.json、history-verification.json、github-main-readback.json、v3-migration-independent-check.json、v3-github-readback.json、sites-after-main-integration.json。
