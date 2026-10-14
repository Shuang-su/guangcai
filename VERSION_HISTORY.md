# 产品版本与发布索引

本仓库按正常开发项目维护；main 已包含原版与中国杯源码。中国杯后续版本在同一 `guangcai-china-preview/` 目录演进，旧版本通过下表的标签、提交与部署定位。

| 版本 | 标签 | 源码提交 | 实际部署 ID | 内容 |
| --- | --- | --- | --- | --- |
| 1.0 | `v1.0` | `152a791b51faaa28e4a565809b3250cf7fc75346` | `6abbdf78d912b4b6b1d7c3b9` | 原版一号杯 |
| 2.0 | `v2.0` | `e50528015a727ea0689a0ca277a0ab2f6731cf8e` | `6acbd24fa545c331cdd20dae` | 中国杯上线基线 |
| 2.1 | `v2.1` | `17e5d12635a0036ade6fcaf42747b525e0daab6f` | `6ace09922a1b2f8945a7a41c` | 花纹布局与饰带宽度 |
| 2.2 | `v2.2` | `b2c2bd4dd0fee80ad073ae34087dfe588a671740` | `6ace111ab0415c9455a3c6f8` | 移动端柔光背景、本地图片预览与响应式修正 |
| 3.0 预览 | `v3.0` | `9400eaf7f65452cbaa68bee563b9793c632d17ae` | `6ace443df7425f433e717eb0` | 原始花纸、白瓷、平盖倒影、新背景；固定纹样高清重建、连续单周图集与高精度凹凸，手动发布 |
| 4.0 预览 | `v4.0` | `6b35efb104019472cea3679ea26cfee1e13ffc8b` | `6aced018c70635a1ad24cbbe` | 中国／深圳九款图样、三种新款材质、可选文字；包含颜色覆盖、旋转方向及杯身接缝修正，手动发布 |
| 4.1 预览 | `v4.1` | `591d8c56b0819143a2bdab454068fd30921a2977` | `6acef244237630dba7fa87fe` | 金底伪高度清理与侧边釉层反光；按用户要求回溯命名，部署时 UI / package 仍为 4.0 / 4.0.0 |
| 4.2 预览 | `v4.2` | `ee6e1aff10bf2f9892babc375e723bf360d9d63e` | `6acefdc52ef3d568cd9acedd` | 独立金底清洗覆盖，保留原始花纹颜色和黄果皮，通道同步；界面/package 4.2/4.2.0 |

旧版本首次入库没有原生 Git 历史；实际修改时间与补录提交时间分开记载。[HISTORY.md](HISTORY.md) 保存恢复的 16 个源码节点，全部已进入 main 的可达历史。表中 1.0/2.0/2.1 使用移除本机依赖链接后的提交，应用源码与各发布基线一致；历史 package.json 的内部编号保留原值，产品版本以本索引为准。3.0 开始同步维护产品 package 版本。

## 查找与继续开发

完整克隆后可用 `git show v2.0:guangcai-china-preview/src/main.ts` 查看旧代码；需要运行旧版时在独立 worktree 检出标签，勿覆盖当前未提交改动。新功能从 main 建功能分支，同一版本可有多个按真实改动划分的 commit，产品版本、源码提交、Git 标签和部署 ID 分别记录。

[Issue #1](https://github.com/Shuang-su/guangcai/issues/1)、[#2](https://github.com/Shuang-su/guangcai/issues/2)、[#3](https://github.com/Shuang-su/guangcai/issues/3)、[#7](https://github.com/Shuang-su/guangcai/issues/7) 对应 1.0、2.0、2.1 和历史恢复；PR #4、#5、#6、#8 已按依赖顺序合入 main。[Issue #9](https://github.com/Shuang-su/guangcai/issues/9) 跟踪 2.2 与持续开发接入。

## 验证与部署边界

历史迁移验证中，1.0 与 2.2 分别重新安装锁定依赖，6/10 项几何测试及 TypeScript/Vite 构建通过；重新构建的 78/135 个发布文件与当时清单逐个匹配。2.0 的 122 项、2.1 的 131 项发布一致性证据及中途源码验证见历史记录。该轮未重跑全部旧版浏览器或真机验收；这些结果不代表当前代码的重新验证。

实际发布字节保存在 `deployments/<站点>/<部署 ID>/`。`docs/archive/*-inventory.json` 固定到源码提交；`tools/verify-archive.py` 同时检查历史对象及工作树发布快照。旧站保持现有部署，不连接 Git 自动发布。Git 标签与上线记录分别核实，不以 PR 合并推断线上已更新。

## 3.0 与 4.0 当前状态（2026-10-14）

- **源码已合并：** V4 [PR #15](https://github.com/Shuang-su/guangcai/pull/15) 先合入 `codex/china-3.0`；[PR #13](https://github.com/Shuang-su/guangcai/pull/13) 随后合入 `main`，合并提交 `408d68cf763762f64e6fa893988eb47426e01485`。后续接缝修正 [PR #16](https://github.com/Shuang-su/guangcai/pull/16) 也已合入 `main`，合并提交 `4e6566d56d0a1cb7e2b4495078551e554f37cd86`。
- **独立站已发布：** [3.0 高清预览](https://guangcai-no1-china-v3.netlify.app/) 和 [4.0 主题预览](https://guangcai-no1-china-v4.netlify.app/) 分别使用上表的部署；没有连接 Git 自动部署。
- **标签已补齐：** 2026-10-14 按用户要求补建并推送 annotated tags `v3.0`、`v4.0`，分别指向表中已部署的源码提交，未移动历史标签或重新部署。该次补标签时的中国杯 `package.json` 为 `4.0.0`。

3.0 高清重建发布保存了 147 个上传文件；当时公网 145 个文件 SHA-256 一致，2 个 HTML 扣除已知 Netlify 后处理后匹配。[高清重建发布记录](guangcai-china-preview/docs/changes/20261013-v3-restored/release.json) · [上一版精度修订记录](guangcai-china-preview/docs/changes/20261013-v3-floral-hq/release.json) · [首次 3.0 发布记录](guangcai-china-preview/docs/changes/20261013-v3/release.json)。

V4 最新接缝修正完成 20 项测试、构建及公网浏览器回归；408 个发布文件经清单核对。测试范围与限制以原始记录为准，浏览器模拟不等于真实设备验收。本次文档同步未重跑应用测试或重新部署。

- [V4 请求、计划与完成记录](docs/changes/20261014-v4/) · [Issue #14](https://github.com/Shuang-su/guangcai/issues/14)
- [旋转方向修正记录](docs/changes/20261014-v4-rotation/)
- [杯身接缝修正记录](docs/changes/20261014-v4-body-seam/completion.md) · [部署清单与公网复核](docs/changes/20261014-v4-body-seam/deployment.json)
- [线上素材与对照](https://guangcai-no1-china-v4.netlify.app/evidence.html#v4) · [颜色覆盖对照](https://guangcai-no1-china-v4.netlify.app/evidence.html#color-coverage) · [杯身接缝对照](https://guangcai-no1-china-v4.netlify.app/evidence.html#body-seam)

## 4.1：纹饰凹凸与侧边反光修正

源码 `591d8c56b0819143a2bdab454068fd30921a2977`，手动部署 `6acef244237630dba7fa87fe`。固定花纹去除金底伪高度、改善侧边釉层反光，法线强度维持 4.4／2.4。`v4.0` 仍指向此前发布基线，不移动标签。

[请求、计划、验证与完成记录](docs/changes/20261014-fixed-relief-alignment/completion.md) · [线上对照](https://guangcai-no1-china-v4.netlify.app/evidence.html#fixed-relief-alignment)。

## 4.2：固定花纹金底清洗

原始颜色母图不改写；独立金底清洗遮罩保护黄果皮和花瓣，金属度、粗糙度和高精度法线同步。UI/package 已同步为 4.2/4.2.0。20 项应用测试、7 项 Python 材质测试、构建、公网桌面/手机视口与交互回归通过；466 个应用文件哈希一致。手机为浏览器模拟，未声称真机验收。

Netlify CLI 末尾返回 422，但服务端显示对应命名部署 ready；逐文件 SHA-1、公网页面版本与实际渲染均独立回读确认，未重复部署。V3 不变，两站无 Git 自动部署。

[完成记录](docs/changes/20261014-floral-cleanup-4.2/completion.md) · [部署回读](docs/changes/20261014-floral-cleanup-4.2/deployment.json) · [4.2 对照](https://guangcai-no1-china-v4.netlify.app/evidence.html#floral-cleanup-4.2)。

## 4.3：北京主题（开发验证完成，发布核验中）

基于4.2新增北京纯金、青绿金线、红金、紫金、蓝金，共13种有效材质组合。原1942×810透明线稿等比放大为4096×1783通道，16位高度和RGBA16F法线共用结构；生成式候选改变建筑，未采用。全站三个主题十四款，默认中国纯金不变。

21项应用、4项素材、76项浏览器、24项背景和17项生产预览检查通过，生产构建成功。浏览器模拟手机，尚未真机验收。来源、对照与实际发布状态见[完成记录](docs/changes/20261014-beijing-4.3/completion.md)。
