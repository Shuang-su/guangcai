# 后台配置与交接补全记录

## 实际交付

- 数据基线：V7.1.1，v7-2，main合并提交 `ec6f9bb0b606f319435f57dc18fbc6375ed6566a`；来源文件哈希逐项核对。
- `integration/backend-handoff/`：六张工作表的Excel、同源JSON、后台录入说明、验证JSON。包含23城、五套颜色、九个材质参考采样、固定金线、六祝福语、195资源和完整默认作品。
- `tools/v7/export-backend-data.ts` 从实际源码提取数据，核对源提交与资源字节；`export-backend-workbook.mjs` 生成并读回Excel；`verify-backend-handoff.ts` 进行独立数值与模拟接口验证。npm增加两个命令，不增加消费者依赖。
- PERFORMANCE原12节保留，每节增加触发、流程、数据、阈值、失败/诊断、源码、历史验证、接入责任核对表。README三个入口同步，解释静态白名单和扩展步骤。
- 城市拓展对象使用manifest与资源ID引用完整描述；颜色深浅HEX、HSL和RGB明确区分；材质保存二维参数与配方版本。当前公共Schema/API、src、public资源不变。

## 本轮验证

- JSON再次提取与来源完全一致；195个文件逐项长度和SHA-256通过；23城×5色作品通过现有验证器。
- 六张Excel表导出后重新打开，表格单元格与原数据逐项相等；完整城市/appearance JSON可解析，默认作品完整保留。
- 五套HSL对照独立整数RGB算法，九个材质采样对照端点插值；非法范围、未知城市和多余字段被拒绝，契约明度0/100合法。
- 从Excel读回西安、开放蓝和自定义材质，真实调用本地mock保存、GET还原，DesignConfig相等；Bob读取Alice作品为404。测试服务器已关闭。
- 六张表及长JSON/URL区域渲染目视检查；六张原生Excel Table、六个筛选、冻结前三列/前五行已核对XML。材质参考点显示六位小数，底层数值和JSON保持完整精度。
- `npm run test:v7` 31/31通过；`npm test` 45/45通过；`tsc --noEmit`、`git diff --check`通过。
- README链接检查同时使用工作区与Git树，52个相对链接全部有目标；其中15个历史目标未在稀疏工作区展开。第一次仅按文件存在检查产生的15个误报已通过Git对象核验消除，未改写历史资料。

## 边界与存储

本次为数据/文档交付，不重发V6/V7，不将历史浏览器数据称为新性能验收。公司后台模板尚未提供，导出是字段映射参考而非公司专用导入格式。实体iPhone13mini/iOS18连续30分钟、触感、Air/mini6的V7复测和正式COS/后端联调继续待验。

缓存与预览仅在项目 `.codex-work/`。未创建大型内置盘构建目录。Prism约270MiB、初号機约6.8MiB可用时完成导出；Git checkpoint使用已有的受验证打包写入工具，防止ExFAT大量小对象耗尽空间。保护原V6工作区和索引。

## 提交与远端

独立分支 `codex/v7-backend-config-handoff`，数据/文档checkpoint为 `d7dd1f9de61cd342dbb2d9165c1dacd5d140fc85`，已推送并创建 [PR #31](https://github.com/Shuang-su/guangcai/pull/31)。本条记录提交补充checkpoint与远端核验；其后按用户授权合并，合并SHA和最终远端状态另回读记录到Issue。

[Issue #29](https://github.com/Shuang-su/guangcai/issues/29) 已更新为“V7.1.1 后台配置数据表、开发交接与真机验收”。顶部包含固定提交下载、数据含义、深圳引用JSON与接入步骤；正文完整保留新版12节性能机制。更新后回读26,623字符与准备正文完全一致。

通过GitHub Contents API读取checkpoint中的Excel、JSON、交接README、验证JSON，均与本地逐字节一致。Excel为55,132字节，SHA-256 `429a6f8c44ed7c035bf048a2342ff86fa81f269994ac41f2aa6ebed616713174`；配置JSON为241,449字节，SHA-256 `8ca17a0ccd306c5bb13ec1f60d1448f8fff092b804dee2274fbc71b35a3c4a95`。

第一次暂存因新增记录目录在稀疏检出定义外而被Git拒绝；仅对本次明确路径启用git add --sparse后正常提交。临时Git对象已打包校验并回存原对象库，临时alternate移除，原V6索引哈希不变。没有跳过钩子、重写历史或清理其他工作。

补写完成记录时原卷剩余3.8MiB，小于本worktree索引4,590,225字节的临时写入需求，git add因磁盘不足失败且未产生新提交。将本worktree索引逐字节备份到Prism，用GIT_INDEX_FILE在Prism暂存并正常提交，提交后核验复制回原索引；对象打包流程相同。原V6索引独立保留，未修改全局临时目录或删除用户文件。
