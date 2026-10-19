"""Publish the user-selected independent SVG review without changing its geometry."""
from pathlib import Path
import hashlib,json,shutil,html,os
ROOT=Path(__file__).resolve().parents[2]
SOURCE=Path(os.environ.get('BEZIER_SOURCE','/Volumes/Prism_初号機/广彩/城市线稿SVG试绘/20261019-深圳-北京-独立闭合版'))
OUT=ROOT/'public/bezier-lab'
def sha(b):return hashlib.sha256(b).hexdigest()
original=json.loads((SOURCE/'delivery-manifest.json').read_text())
expected={r['path']:r for r in original['files']}
files=[]
for p in sorted(SOURCE.rglob('*')):
    if not p.is_file() or p.name.startswith('._'):continue
    rel=p.relative_to(SOURCE);s=rel.as_posix()
    if not (s in ['深圳-独立闭合.svg','北京-独立闭合.svg','查看独立建筑.html'] or s.startswith('buildings/') or s.startswith('review/') or s in ['source-reference/深圳@2x.png','source-reference/北京@2x.png']):continue
    b=p.read_bytes();assert s in expected and sha(b)==expected[s]['sha256'],s
    target=OUT/('index.html' if s=='查看独立建筑.html' else s);target.parent.mkdir(parents=True,exist_ok=True)
    if s=='查看独立建筑.html':
        text=b.decode();text=text.replace('</h1>','</h1><p><a href="../">城市共彩</a> · <a href="../city-compare/">23城描线对比</a> · <a href="downloads.html">总图和单栋SVG下载</a> · <a href="README.md">绘制说明</a></p>',1)
        b=text.encode()
    target.write_bytes(b);assert sha(target.read_bytes())==sha(b)
    files.append({'path':str(target.relative_to(OUT)),'sourcePath':s,'sourceSha256':expected[s]['sha256'],'sha256':sha(b),'bytes':len(b),'geometryUnchanged':s!='查看独立建筑.html'})
svgs=[f for f in files if f['path'].endswith('.svg') and not f['path'].startswith('review/')]
links=''.join('<li><a download href="'+html.escape(f['path'])+'">'+html.escape(f['path'])+'</a></li>' for f in svgs)
(OUT/'downloads.html').write_text('<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>独立建筑 SVG 下载</title><style>body{font:16px system-ui;max-width:900px;margin:40px auto;padding:0 20px;line-height:1.8}a{color:#087e96}</style><h1>总图与单栋 SVG</h1><p><a href="./">返回独立建筑查看器</a> · <a href="../city-compare/">23城描线对比</a></p><p>本轮试绘深圳、北京两城，保持3878 × 1630画布、透明背景与可编辑路径。</p><ul>'+links+'</ul></html>')
(OUT/'README.md').write_text('''# 深圳、北京：独立建筑闭合贝塞尔试绘

2026-10-19。来自“用贝塞尔曲线描摹线稿”的最新独立闭合版，本页仅发布查看器与素材，未替换杯身应用中的23城PNG描线。

高楼两侧使用连续长曲线；古建筑屋檐在尖端闭合，天坛按中轴镜像；长城垛口按连续墙身的弧长规律排列。外轮廓和实体构件闭合，内部杆件保留独立描边。总图和22个独立对象均保留3878 × 1630画布、透明背景与原有金橙色；SVG无内嵌位图或字体依赖。

查看器支持城市、单栋、聚焦、矢量/原稿/叠加/填色、控制柄、400%/800%和点击笔画调线宽；预览修改仅存于当前页面内存。原稿PNG用于叠加对比。下载入口见downloads.html，原交付的几何、编辑与浏览器检查见review/中的verification.json、editing-verification.json及browser-verification.json。

这是建筑逻辑优先的试绘；前景遮挡的楼底做了结构补全，窗格和栏杆经过规则化，不代表建筑实测复原。只有深圳、北京两城，不能称23城均已矢量重绘。发布时保持SVG字节和单栋结构，添加站内导航，并在本站重新验证交互。PSD原件、图层审计和本机依赖没有部署。
''')
receipt={'date':'2026-10-19','sourceTitle':'用贝塞尔曲线描摹线稿 / 最新独立闭合版','sourceManifestSha256':sha((SOURCE/'delivery-manifest.json').read_bytes()),'route':'/bezier-lab/','files':files,'independentObjects':sum(f['path'].startswith('buildings/') for f in svgs),'geometryFilesByteIdentical':True}
(ROOT/'evidence/v7.1.4/bezier-import.json').write_text(json.dumps(receipt,ensure_ascii=False,indent=2)+'\n')
(OUT/'files.json').write_text(json.dumps(receipt,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'passed':True,'files':len(files),'bytes':sum(f['bytes'] for f in files),'objects':receipt['independentObjects']}))
