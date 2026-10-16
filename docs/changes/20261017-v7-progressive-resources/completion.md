# V7 阶段记录

## 阶段一：资源和加载基础
- 基线 a2319370175259f1ee22b9ecfd75167041faa91e，开始时工作树干净。
- 生成 23 城、六套裁切祝福语、固定花纸三档、合并 ORM、低分辨率底标；195 个带内容哈希资源，逻辑文件体积 113822458 bytes。
- 默认轻量首屏贴图 2286310 bytes，mipmap 后纹理估算 22085092 bytes；不包含渲染目标、几何、界面，不是真机测量。
- 新增 manifest 类型、Worker 解码、请求队列和按字节资源池；正在接入消费者入口，当前还不是完整可用 V7。
- TypeScript 检查通过。原稿未改写。
- 在本阶段执行期间，另一个 V6 发布归档继续写入原工作区，卷空间从约1.8GiB降至257MiB。后续采用稀疏独立 worktree，保护新 V6 归档，不清理他人文件。
- checkpoint SHA 见 Git 本文件提交历史；后续完成记录补入已生成的前一阶段 SHA，避免自引用。

## 最终实现与验证

资源阶段 checkpoint：`94b5acf4cf9d34ffd086e5f6a68357ce0ad97cb9`。基础任务引用：[Shuang-su/guangcai#27](https://github.com/Shuang-su/guangcai/issues/27)。

按执行期间用户要求，后续在 `/Volumes/Prism/广彩/guangcai-v7-workspace` 的独立稀疏 worktree 完成。迁移对 8499 个文件核对 SHA-256，排除 Finder `.DS_Store` 和 AppleDouble 元数据；原始 worktree 已切回 V6 分支。Git 公共仓库仍在初号機卷，未声称这是脱离原卷的独立备份。

### 实际改动

- 1024/2048/4096 三档资源、23 城、6 套精确裁切字框、按分区重建护边的固定花纸、合并 ORM、RG8 城市遮罩、R8 文字、高精度半浮点法线与低清底标。
- 消费者通过 bootstrap 与 manifest 获取资源。支持独立 CDN、部署子路径、纯静态 bootstrap 和 HTTP mock；消费者构建与开发审计、联调构建分离。
- 两项资源任务＋单 Worker 解码、过期任务取消、按估算字节的缓存和原子切换。近看只提升当前检查部位；移动保守预算不足时降低主画面 DPR 或保持现有清晰度。
- 保留杯壁512和杯盖1024反射；反射生成后释放临时 cubemap/PMREM 缓冲。移动主阴影从2048调整为1024，环境照明、反射分辨率、金线与材质参数保留。
- 静止时停止模型重复绘制，后台暂停队列与模型；WebGL丢失时释放失效GPU对象，恢复时保留作品并从轻量档重建。显式捕获替代常驻 preserveDrawingBuffer。
- 新增 exportDesign/importDesign/onDesignChange/capture；OpenAPI、两类 JSON Schema、数据关系和部署说明；本地合成身份、作品修订、只读分享和撤销样例。不实现公司正式账号、数据库或业务UI。

### 已执行检查

- 两个应用均独立 npm ci。中国杯现有42项测试、V7新增6项测试、原版应用6项测试通过。
- 195个资源逐一核对文件大小、SHA-256、尺寸、HFN半浮点数据；6套字框逐像素对应原展开图，图集护边与通道尺寸通过。
- 最终 Chrome、桌面 WebKit 各83项浏览器检查通过，无未捕获异常。检查375×812移动尺寸和1440×900桌面，包含两轮23城、六祝福语、快速取消/失败回退、提清、预算、反射、静止停止绘制、自动旋转帧合并、WebGL恢复、导入导出、样例保存/匿名分享/撤销。
- `/cup/` 子路径下观察器与模拟保存通过；另一个源提供CDN纹理通过；纯静态服务器读取bootstrap JSON并启动通过。
- 消费者、联调、开发审计构建通过；原版应用构建通过。消费者产物218文件、115173617 bytes，其中195个资产哈希一致，不包含旧版fixed/cities/textures、制作母版、dev/audit和联调入口。
- 最终冷启动：Chrome禁用缓存，10Mbps下载、100ms延迟，3次分别4053/3958/3958ms；传输3689204 bytes（含网络响应开销，约3.52MiB），满足5MiB/6秒目标。
- 默认轻量贴图2286310 bytes（约2.18MiB），GPU贴图估算22085092 bytes（约21.06MiB）；375×812/DPR1.5的模型纹理＋保守渲染缓冲约119.56MiB。近看约123.94MiB；含反射临时缓冲的观测估算峰值199164468 bytes（约189.94MiB），处于128/192MiB预算内。这不是浏览器进程内存或驱动实测。
- 显式模拟 visibilitychange 后模型停止、队列暂停、返回恢复通过。Apple M1 Pro/ANGLE Metal 的桌面Chrome移动视口自动旋转中，120次模型渲染对应约120次刷新，中位及P95帧间隔约16.7ms。不是iPhone帧率证明。
- 原始 assets、public/fixed、public/cities/v6 以及五个触感/输入核心文件相对a231937无改动。

### 发现并修复的失败

- 合并ORM后，旧裸金校正读取R通道会覆盖花纸颜色；已统一读取金属度B通道，加入回归并检查实际画面。
- mock配置使用相对assetBase时，URL二次解析最初失败；已以应用base先解析，子路径和跨源CDN实测通过。
- WebKit强制恢复后清理旧GPU对象曾报告11个INVALID_OPERATION；将释放提前到contextlost，恢复后重建材质、反射、阴影等，最终WebKit无错误。
- 按需渲染中OrbitControls change事件和帧尾曾重复请求RAF，自动旋转压力测试暴露低帧率；已合并为每刷新一次模型绘制，加入计数回归，最终帧间隔16.7ms。
- 初次性能脚本在未限定时长的帧率采样中停留较久；保留冷启动采样后增加采样上限和渲染次数检查，最终完整报告通过。

### 已知边界与交付状态

- iPhone 13 mini / iOS18 连续30分钟、实际设备帧率与物理振动仍待设备验收；不能据自动化宣称旧iPhone崩溃已解决。
- 当前资源版本为v7-1，现有23城/6组文字；未知资源/模型/配方版本明确拒绝，需要新增版本映射后再接入。
- mock仅绑定127.0.0.1，使用演示身份、内存数据，重启清空，不是生产账号或数据库。
- 构建仍提示主JS超过650kB及原库静态/动态导入重叠；外置runtime-config.js的未打包提示为保留部署配置的预期结果。冷启动传输与时间目标已通过。
- 此轮为本地候选，没有推送、PR、合并、tag或生产部署。现有V6发布归档未纳入本任务提交。
- 证据：`guangcai-china-preview/evidence/v7/`；交接：`guangcai-china-preview/integration/README.md`。verification.json记录运行源码哈希，consumer-build.json记录实际产物清单。

## Checkpoint 回读

- 完整运行时、mock、接口契约与验证证据 checkpoint：`c46e3e44efd4385efc44a8721a611d54fbd09701`。
- 对已提交运行源码逐项回读，均匹配 verification.json 的哈希；该提交后工作树干净。
- Prism迁移验证完成后，移除了本任务在系统盘创建的临时副本；不涉及用户既有项目或归档。迁移回执在新worktree的 `.codex-work/tmp/v7-relocation.json`。
- 最终本地页面：http://127.0.0.1:5276/ （纯静态）；联调样例：http://127.0.0.1:5274/integration/ 。
- 本记录的最终提交号由Git历史确定，运行时代码与上述checkpoint一致。
