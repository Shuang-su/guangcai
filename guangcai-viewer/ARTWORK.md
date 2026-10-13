# 花纸与 PBR 资产

`assets/masters/body-generated.png` 和 `band-generated.png` 来自内置 image_gen；完整提示词见 `assets/prompts.json`。没有从照片抠出高光作为花纸。花纸是参考广彩花果蝶叶的新稿，非原版一比一重绘。

`public/artwork/` 是可选入观察器的完整包：选择这一目录即可读取 `style.json`。三个 region 为 `body`、`handle`、`saucer`。每区要求 `baseColor`，可附 `normal`、`metalness`、`roughness`、`height`；同一区通道必须有相同像素宽高。

```json
{
  "name": "自定义款式",
  "regions": {
    "body": {"baseColor": "body.png"},
    "handle": {"baseColor": "handle.png"},
    "saucer": {"baseColor": "saucer.png"}
  }
}
```

用包内相对路径，不接受上级目录或外部 URL。上传单图时采用等比覆盖裁切，若图案横竖比例与装饰区差别很大会裁掉很多内容；精确布局应按以下物理展开尺寸制作独立通道。

| 装饰区 | 展开宽 × 长 / mm | 用法 |
|---|---|---|
| 杯身 | 45.0295 × 97.7 | 杯身把手一侧约 60° 弧带 |
| 把手 | 11.9 × 115.9754 | 圆角之间的外弧宽面，V 沿真实外弧累计距离 |
| 底碟 | 113.4115 × 11.1427 | 圆周四分之一，四段镜像衔接 |

生成数据贴图：`npm run textures`。`tools/surface-metrics.ts` 从几何取得展开尺度，`tools/derive-pbr.mjs` 从生成母版制作 15 张对齐 PNG：

- BaseColor 是 sRGB；其余为数据颜色空间。
- 以金地的赭色色相分割金属区，花瓣叶片保持非金属。
- Roughness 随金属／彩釉区域变化；Height 根据彩绘边界与深色轮廓派生后平滑，Normal 来自这个微起伏场。
- 这组 Height / Normal 是艺术近似，不是实测表面扫描，也没有用颜色亮暗直接当作器型高度。Height 保留为源数据，运行时只用微法线，不改变轮廓。
- 运行时各区的全部通道共享 repeat / offset；尺寸变更与换款复用对应 UV，不把花纹直接拉满整个把手。

`public/artwork/manifest.json` 记录分辨率、母版裁切、展开尺寸和逐图 SHA-256。`public/marks/auratic-reference.svg` 是底款参考重绘文件，PNG 为固定渲染版本；不包含正品溯源贴纸。

此程序会保留成功载入的现有款式，直到新包所有图片解码并通过尺寸检查。失败不会留下新旧混用的通道；同时提交多次换款时，以最后一次请求为准。

## 2026-09-29 新增两套纹理（恢复原版提示词与裁切）

“牡丹玉兰”侧重珊瑚红牡丹、白玉兰与翠叶；“莲荷双蝶”侧重粉莲、青绿荷叶与彩蝶，并保留原版丰富的小花、果实与枝叶。最终四张母版通过内置 image_gen 引用原有母版重新生成；完整原始提示词逐字保留在前缀，题材变化仅作为附加说明。原始提示词见 `assets/prompts.json`，本轮完整最终提示词见 `assets/variant-prompts.json` 和 `assets/variant-prompts-dense-v3.json`。

恢复原版确定性布局：杯身使用完整竖向母版；把手从竖向母版 x=47%～63%、y=7%～89% 裁切；底碟从横幅 y=38%～63% 裁切，再按目标尺寸等比覆盖。全部 PBR 通道从同一最终像素图派生，保持完全对齐。底碟上下金边之间保持花叶满铺，运行时沿圆周四段镜像衔接。已撤回初稿的稀疏单排花带和缩小延续排版。

每款交付杯身 1024 × 2222、把手 320 × 3119、底碟 2172 × 213 的 BaseColor、Normal、Roughness、Metalness、Height，共 15 张 PNG。母版重采样不会增加真实细节；工具实际母版尺寸、提示词目标与裁切记录均在标准页和 manifest 中呈现。

固定法线强度 1.5、清漆法线强度 0.825、曝光 1.08；同一光照与 ACES 映射，角度变化仍会改变反射。Height 是艺术近似，无几何位移。金属遮罩采用赭金色域估计，近色枝干与花芯可能误判；这不是人工逐瓣分割或实测材质。

`tools/texture-density.mjs` 用原有金地遮罩粗估彩绘覆盖和上下 20% 边缘覆盖，以辅助比较原版与新图，不能代替视觉验收。第一版稀疏提示词存放于 `assets/drafts/sparse-v1-prompts.json`，首轮母版也保留为历史草稿；当前款式只引用 dense-v3 母版的派生贴图。
