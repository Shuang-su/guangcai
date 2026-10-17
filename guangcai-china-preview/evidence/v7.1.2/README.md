# V7.1.2 资源来源与复核

## 来源与身份

23张原始PNG与用户“23个城市线稿”目录逐字节一致，派生sourceSha256一致。`cities/before.json`保存各城、三级封闭空点及候选坐标；`cities/review.json`保存逐城人工判定和修正理由，`*-review.jpg`是候选放大图。`cities/reference-identities.json`记录21张参考照片的地区身份和哈希。这批是亚太地区杯款，不是23个国内城市逐城照片，故不编造对应；作为填色材质参考，城市几何以原稿为准。

## 字体与版式

字体为用户机器已有的思源宋体CN Bold原件，完整保存于 `assets/source/v7.1.2/fonts/`。weight=700，Version 1.000，SHA256 `04cd127eef790a7bf1b6320586cbd8282a520005f0fcde7296b6612c4c0a6468`。原始许可声明与OFL1.1文件一并保留；官方来源 https://github.com/adobe-fonts/source-han-serif 。未改字体文件，构建缺字体/字形即报错，不fallback。

用户SVG原件 `mastergo-slogan-reference.svg` 内文字已转曲、字框含209×694位图。提取四行实际bbox与字心，导出字体真实轮廓；共同字号105（参考坐标）。边框单独矢量化后与原alpha比较：IoU约0.98069；“开放包容”字形与参考IoU约0.99141。该数值是轮廓重合，不是人工美术验收评分。六组统一位置、字距和字号，菜单不变。放置仍为4096×1783展开图上centerU=.81、topV=.09、heightRatio=.52；裁切288×936、四边4px护边，uvRect见manifest。六张R8含mipmap2,156,544字节；运行时字体下载0字节。详细字体元数据、四行bbox和各母版hash见 `slogans-source.json`。

## 填色判断和隔离

西安右侧城墙有3处4K封闭空点（26、10、4像素），补面含边界1px保护。厦门左侧建筑后树丛开口漏填，4K修正区域[952,1455,1073,1541]，2950像素。分别以独立coverage-correction.svg补G；低/标准/细节各新增覆盖像素为厦门182/742/2950、西安3/18/69。外部天空与建筑间隙保留，不按水平线扫涂。低清扫描的其他黑点经4K原稿复核属于外部边缘或天空，记录并保留。

`resource-validation.json`验证304个原稿/旧版本文件未变、23城法线与缩略图未变、两城三级R/B逐像素未变、G单调增加且局限修正层；其余21城mask哈希未变。新manifest共195项，12个新增文件，其余引用原版本。旧资源和入口不覆盖。

## 制作复现

在应用目录创建项目内Python环境，安装 `tools/requirements-v7-art.txt`；Node依赖按package-lock。执行：

```sh
python tools/v7/audit-city-fill.py --original-dir '<23个城市线稿目录>' --reference-dir '<亚太城市杯参考目录>'
python tools/v7/build-slogan-masters.py
python tools/v7/build-fill-corrections.py
npm run textures:v7-3
npm run check:v7-3
npm run check:v7-assets
```

人工review是本轮确认的坐标与判断，新的源图必须重新审核，不能沿用坐标自动补图。生成器拒绝覆盖内容不同的不可变文件；常规消费者build不运行制作链。审查与开发源字体不进入消费者包。

## 验证边界

本轮浏览器证据在 `qa/`；旧V7.1.1数字在 `evidence/v7-corrections/`，不混称新结果。真机iPhone13mini/iOS18连续30分钟、用户Air/mini6本轮复测、生产COS/账号联调未完成，保持待验收。
