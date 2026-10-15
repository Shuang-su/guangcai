# V5 城市生图与发布流程

当前以 `assets/source/v5/generated-detail/*-white.png` 为建筑形态的权威原稿。用户否定上一轮程序化 SVG 的过度简化，故 `landmarks/` 与 `build-city-landmarks.py` 只保留为历史实验，不再覆盖当前母版。

## 图样与尺寸

北京源图 1899×828、深圳 1900×828，均由内置 ImageGen 产生。北京保留详细祈年殿、央视与中国尊，右侧长城使用两座可见城楼并自然下降；没有贯穿右侧的地平线。深圳保留原有塔楼与市民中心细节，去掉右桥。白底是源稿背景，不直接用透明度当建筑覆盖。

原 PSD 城市外框为 5433×2365（600 ppi，777,2243–6210,4608），作为统一母版坐标。运行通道为4096×1783；V4的 .82/.047/0 放置只应用一次。输出像素不代表生图原生4K。

编译器从黑线提取像素轮廓并局部拟合曲线，不重新设计建筑。SVG分为lines/fill/holes/guides，可编辑已有轮廓。普通编译保留SVG；显式`--trace`才按已审核源图重新提取。原稿、提示词、失败研究稿和哈希均保存。

填色与金线分别处理：`fillClosures`只封闭填色区域；`holeSeeds`定位真实开口。辅助闭合绝不写入line通道，法线只从line派生。北京市台和墙体的可见分界仍是原图线条。每次生图后需重新检查种子和闭合位置，不复用不匹配的旧坐标。

## 流水线

先使用内置ImageGen生成/局部修订，查看原图与填色效果；在`assets/source/v5/generated-detail/review.json`记录图像哈希、逐项检查与审查者。Agent检查与用户最终视觉确认明确分开；流程不会伪造用户批准。

```sh
# CITY_PYTHON可指定已安装Pillow、NumPy、vtracer的解释器；依赖见tools/requirements-v5.txt。
# PYTHONPATH仅在本机复用已有vtracer缓存时需要。
npm run pipeline:v5
# 有意从已审核新原稿重提取SVG时：
npm run pipeline:v5 -- --trace
# 检查并提交本轮源码与证据后：
npm run deploy:v5
```

准备阶段依次执行原稿哈希/视觉记录检查、编译、素材测试、应用测试、构建、临时预览和45项浏览器检查，保存输出摘要。发布阶段要求干净Git checkpoint、准备结果通过且源码/构建哈希未变；仅允许发布独立`guangcai-no1-china-v5`站点，显式保护V4/V3/原版，不重绑现有`.netlify/state.json`，不启用Git自动部署。

部署使用Netlify官方文件摘要API，复用进程环境中的NETLIFY_AUTH_TOKEN或本机已有Netlify登录；凭据不写入源码、缓存或记录。采用API是因为本轮CLI临时安装在ExFAT卷触发空间不足，失败安装新建的临时文件已精确清理，避免再次安装庞大CLI依赖。

线上ready后检查当前部署ID、全部上传文件SHA-1、公开release.json、真实404、旧站点部署未变，并再次运行浏览器测试。每次成功部署保存独立不可变的`deployments/<site>/<deployId>/site/`快照与摘要。只创建独立预览，不能把技术通过当作制造验收。

## 验收边界

五色、HSL、固定金线、彩釉/金属滑杆、0–2倍法线强度继续沿用V5。逐像素相似度用于发现提取阶段丢线，不代表建筑测绘精度或审美合格。工厂线宽、间距、真实手机与Safari另行验收。
