# 产品版本与发布索引

本仓库按正常开发项目维护；main 已包含原版与中国杯源码。中国杯后续版本在同一 `guangcai-china-preview/` 目录演进，旧版本通过下表的标签、提交与部署定位。

| 版本 | 标签 | 源码提交 | 实际部署 ID | 内容 |
| --- | --- | --- | --- | --- |
| 1.0 | `v1.0` | `152a791b51faaa28e4a565809b3250cf7fc75346` | `6abbdf78d912b4b6b1d7c3b9` | 原版一号杯 |
| 2.0 | `v2.0` | `e50528015a727ea0689a0ca277a0ab2f6731cf8e` | `6acbd24fa545c331cdd20dae` | 中国杯上线基线 |
| 2.1 | `v2.1` | `17e5d12635a0036ade6fcaf42747b525e0daab6f` | `6ace09922a1b2f8945a7a41c` | 花纹布局与饰带宽度 |
| 2.2 | `v2.2` | `b2c2bd4dd0fee80ad073ae34087dfe588a671740` | `6ace111ab0415c9455a3c6f8` | 移动端柔光背景、本地图片预览与响应式修正 |
| 3.0 预览 | 视觉验收后创建 | `073167bed69ae46eb716e13bc9ad2de0bfea0084` | `6ace32284a3c8d9e272b18ad` | 原始花纸、白瓷、平盖倒影、新背景；高精度花纹及连续接缝修订，手动发布 |

旧版本首次入库没有原生 Git 历史；实际修改时间与补录提交时间分开记载。[HISTORY.md](HISTORY.md) 保存恢复的 16 个源码节点，全部已进入 main 的可达历史。表中 1.0/2.0/2.1 使用移除本机依赖链接后的提交，应用源码与各发布基线一致；历史 package.json 的内部编号保留原值，产品版本以本索引为准。3.0 开始同步维护产品 package 版本。

## 查找与继续开发

完整克隆后可用 `git show v2.0:guangcai-china-preview/src/main.ts` 查看旧代码；需要运行旧版时在独立 worktree 检出标签，勿覆盖当前未提交改动。新功能从 main 建功能分支，同一版本可有多个按真实改动划分的 commit，后续产品版本按 3.1、3.2 等递增。

[Issue #1](https://github.com/Shuang-su/guangcai/issues/1)、[#2](https://github.com/Shuang-su/guangcai/issues/2)、[#3](https://github.com/Shuang-su/guangcai/issues/3)、[#7](https://github.com/Shuang-su/guangcai/issues/7) 对应 1.0、2.0、2.1 和历史恢复；PR #4、#5、#6、#8 已按依赖顺序合入 main。[Issue #9](https://github.com/Shuang-su/guangcai/issues/9) 跟踪 2.2 与持续开发接入。

## 验证与部署边界

1.0 与 2.2 本次分别重新安装锁定依赖，6/10 项几何测试及 TypeScript/Vite 构建通过；重新构建的 78/135 个发布文件与当时清单逐个匹配。2.0 的 122 项、2.1 的 131 项发布一致性证据及中途源码验证见历史记录。本次未重跑全部旧版浏览器或真机验收。

实际发布字节保存在 `deployments/<站点>/<部署 ID>/`。`docs/archive/*-inventory.json` 固定到源码提交；`tools/verify-archive.py` 同时检查历史对象及工作树发布快照。旧站保持现有部署，不连接 Git 自动发布。Git 标签与上线记录分别核实，不以 PR 合并推断线上已更新。

3.0 正在同一源码目录持续开发：[Issue #11](https://github.com/Shuang-su/guangcai/issues/11) · [Draft PR #13](https://github.com/Shuang-su/guangcai/pull/13)。[独立 3.0 预览](https://guangcai-no1-china-v3.netlify.app/) 已手动发布，108 个文件与公网逐一 SHA-256 匹配；源码固定到上表提交。新旧站均未连接 Git 自动部署。PR 保持 Draft，正式标签等待视觉验收。[本次精度修订发布记录](guangcai-china-preview/docs/changes/20261013-v3-floral-hq/release.json) · [首次 3.0 发布记录](guangcai-china-preview/docs/changes/20261013-v3/release.json)。
