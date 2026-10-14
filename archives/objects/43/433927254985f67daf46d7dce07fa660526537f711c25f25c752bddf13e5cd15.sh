python3 - <<'PY'
from pathlib import Path
import json
root=Path('.')
regions=['body','handle','saucer'];channels=['baseColor','normal','roughness','metalness','height']
(root/'public/artwork/style.json').write_text(json.dumps({'name':'花蝶 · 金地','regions':{r:{c:f'{r}-{c}.png' for c in channels} for r in regions}},ensure_ascii=False,indent=2))
p=root/'src/interaction/views.ts';s=p.read_text().replace('multiplyScalar(1.4)', 'multiplyScalar(1.6)').replace('if(aspect<.8)this.toCamera.sub(this.toTarget).multiplyScalar(1.6).add(this.toTarget);','if(aspect<1.05)this.toCamera.sub(this.toTarget).multiplyScalar(aspect<.8?1.6:1.17).add(this.toTarget);');p.write_text(s)
p=root/'tools/geometry.test.ts';s=p.read_text();s+='''
test('bottom marks face outward, sit below the recessed base and share physical scale',()=>{
  const product=buildProduct(makeMaterials());
  const normals=[];
  for(const [part,name,recess] of [[product.cup,'cup-bottom-mark',2.5-defaults.height/2],[product.saucer,'saucer-bottom-mark',2.25]] as const){
    const mark=part.getObjectByName(name) as Mesh;
    assert.ok(mark.position.y<recess&&recess-mark.position.y<.02);
    normals.push(new Vector3(0,0,1).applyQuaternion(mark.quaternion));
    mark.geometry.computeBoundingBox();assert.equal(mark.geometry.boundingBox!.max.x-mark.geometry.boundingBox!.min.x,20);
  }
  assert.ok(normals.every(n=>n.y<-.999));product.dispose();
});
''';p.write_text(s)
PY
cat > README.md <<'EOF'
# 广彩 · 一号杯三维观察器

可编辑的 Vite + TypeScript + Three.js 本地项目，包含杯、盖、碟、生成花纸、PBR 数据贴图、底款和多角度检查工具。

## 启动

需要 Node.js 22.12+（本机验证使用 26.3.0）和支持 WebGL 2 的浏览器。

```sh
npm ci --cache .codex-work/cache/npm
npm run dev -- --port 5187
```

打开终端给出的本地地址。不要直接双击 `index.html`。本项目不依赖外网贴图、字体或运行时服务。

```sh
npm test
npm run build
npm run preview -- --port 5197
npm run qa
```

`npm run qa` 默认访问 5187，使用本机 Chrome；可设置 `QA_URL=http://127.0.0.1:5197/` 验证构建产物。`dist/` 是构建结果，继续修改请保留 `src/`、`assets/`、`public/`、`tools/` 和锁文件。

## 观察与操作

- 拖拽旋转，滚轮或双指缩放；“自动旋转”“复位”，键盘 R 复位。
- 整体、正面、把手、俯视、杯底、碟底、拆解、杯盖、花纹细看，共 9 个入口。
- 材质面板可切换素瓷、灰模、法线、金属区，调整微浮雕和亮度；也可选择 21 个参考方向。
- “杯底”“碟底”查看灰色 AURATIC／永丰源标记。只重建底款，模型没有正品溯源贴纸、序列号或二维码。
- “上传一张图片”会按装饰区等比裁切并清除旧法线、粗糙度和金属图；“完整材质包”一次替换所有对齐通道。

## 结构与参考

| 内容 | 位置 |
|---|---|
| 器型参数 | `src/geometry/parameters.ts` |
| 杯、盖、碟剖面与装配 | `src/geometry/product.ts` |
| 把手轮廓与白瓷接头 | `src/geometry/handle.ts` |
| 带状截面与弧长 UV | `src/geometry/ribbon.ts` |
| 金彩、白瓷、花纸材质 | `src/materials/materials.ts` |
| 摄影棚反射与接触阴影 | `src/studio/` |
| 参考机位 | `src/interaction/reference-views.ts` |
| 样式接口与导入 | `src/styles/style-manager.ts` |
| 原始 AI 花纸及提示词 | `assets/masters/`、`assets/prompts.json` |
| 可直接导入的材质包 | `public/artwork/` |
| 可编辑底款 SVG 与跨平台 PNG | `public/marks/` |

[完整照片分组](../evidence/reference-index.html) 收录 85 张照片和 5 段视频；视频各抽查 12 帧，共 60 帧，没有声明逐帧审阅。[21 个方向对照](../evidence/comparison.html) 使用同一几何模型。缩略图随交付保存，原件链接需要原磁盘在线。

IMG_1220 产品图明确给出碟径 **151 mm**、杯的标称容量 **450 ml**。杯半径 43 mm、高度参数 103 mm、壁厚 2.2 mm、把手外伸 33 mm 等是照片比例估计，可调整；容量没有经过实物注水或测量验证，不是生产 CAD。全圆、平滑杯身以本轮实拍为准。

## 花纸、底款与光影的边界

花纸由内置图像生成工具创建，是参考风格的新稿，不是原厂花纹的逐笔复制。三个装饰区拥有独立 UV。所有 PBR 通道在同一像素坐标上生成、裁切、偏移；杯碟沿圆周使用 4 段镜像重复。详见 [ARTWORK.md](ARTWORK.md)。

底款根据 IMG_1229 / IMG_1232 的图形和文字重绘，灰色印在浅凹底面，标记图形宽约 16.5 mm 为推定值。SVG 不是官方矢量文件；运行时使用随附 PNG，不依赖中文字体安装。

光影使用自建摄影棚环境及随视角改变的金属反射。相机按照片推估，未做镜头和像素级姿态标定；没有重建办公室全部灯光、桌面和反射物，因此高光位置与每张实拍并不完全一致。

## 验证与记录

几何测试检查内腔净距、弧长 UV、法线朝向、足圈和底款位置；浏览器测试覆盖视角、材质、款式原子替换、失败回退、尺寸更新、移动端布局及资源释放。当前实测报告在 [evidence](../evidence/)；变更记录见 [docs/changes/20260929-reference-corrections](docs/changes/20260929-reference-corrections/)。

此目录不是 Git 仓库，没有初始化仓库、创建提交、推送或部署。
EOF
cat > ARTWORK.md <<'EOF'
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
| 把手 | 11.9 × 113.3214 | 圆角之间的外弧宽面，V 沿真实外弧累计距离 |
| 底碟 | 114.7467 × 10.7201 | 圆周四分之一，四段镜像衔接 |

生成数据贴图：`npm run textures`。`tools/surface-metrics.ts` 从几何取得展开尺度，`tools/derive-pbr.mjs` 从生成母版制作 15 张对齐 PNG：

- BaseColor 是 sRGB；其余为数据颜色空间。
- 以金地的赭色色相分割金属区，花瓣叶片保持非金属。
- Roughness 随金属／彩釉区域变化；Height 根据彩绘边界与深色轮廓派生后平滑，Normal 来自这个微起伏场。
- 这组 Height / Normal 是艺术近似，不是实测表面扫描，也没有用颜色亮暗直接当作器型高度。Height 保留为源数据，运行时只用微法线，不改变轮廓。
- 运行时各区的全部通道共享 repeat / offset；尺寸变更与换款复用对应 UV，不把花纹直接拉满整个把手。

`public/artwork/manifest.json` 记录分辨率、母版裁切、展开尺寸和逐图 SHA-256。`public/marks/auratic-reference.svg` 是底款参考重绘文件，PNG 为固定渲染版本；不包含正品溯源贴纸。

此程序会保留成功载入的现有款式，直到新包所有图片解码并通过尺寸检查。失败不会留下新旧混用的通道；同时提交多次换款时，以最后一次请求为准。
EOF