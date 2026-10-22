# V7.1.13 / v7-10 固定祝福语

作品数据仍为schemaVersion 1。新增sloganId：

| ID | 面板文字 |
| --- | --- |
| love-city | 我爱＋当前城市完整名称 |
| city-luck | 满城好运 |
| happy-cup | 快乐满杯 |
| color-luck | 彩运连连 |
| blooming-path | 一路生花 |
| color-energy | 彩气满满 |

原open、innovation、cooperation、sharing、together、ocean保留。默认作品为深圳／love-city；打开保存作品不覆盖其sloganId。恢复默认API读取当前bootstrap并原子还原。

`love-city`是城市相关的固定选择，读取`manifest.cities[cityId].slogans['love-city']`。顶层同名记录用于选项注册并引用深圳资源，但不能作为其他城市缺失时的默认贴图。有效性必须同时检查城市和对应label。未知组合在导入前拒绝，当前作品保持。

原资源版本只展示其支持的六句；旧作品继续按固定resourceReleaseId加载。JSON Schema枚举同步更新，运行时仍需结合清单校验城市/选项组合。历史后台Excel/JSON导出不代表本版本清单，请读取v7-10目录与本文。

新文案均为离线蒙版，无运行时字体下载。启动下载当前城市的12个选项；城市附近预载包含其专属文字。切城替换当前驻留文字，不把全部23张城市文字加入首屏门槛。GPU与文件缓存预算沿用现有设置。

五字（哈尔滨、石家庄、景德镇）和六字（乌鲁木齐、呼和浩特）为本次追加并经用户确认的排版：字号64/62，框高480/536，原四字字号66/框高423。只延长框中间直边，框底映射不变，用户已在2026-10-22确认并授权上线。

重现素材：使用已归档字体（SHA见`evidence/v7.1.2/slogans-source.json`），安装fontTools 4.60.1，执行`python tools/v7/build-city-blessings.py --font <字体文件>`，随后`node tools/v7/compile-city-blessings.mjs`。输出SVG母版、来源/字形边界、不可变蒙版、资源清单及bootstrap。不要对已经发布的资源版本重跑覆盖；后续变更应新建资源版本。
