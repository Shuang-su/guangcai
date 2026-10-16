"""Render the review gallery from the same registry as the runtime city selector."""
import json
from html import escape

def write_review(root, spec, audits):
 version='.'.join(json.loads((root/'package.json').read_text())['version'].split('.')[:2])
 by_id={a['id']:a for a in audits}
 style='''*{box-sizing:border-box}body{margin:0;background:#f5f3ee;color:#292a27;font:15px/1.75 system-ui}main{max-width:1360px;margin:auto;padding:32px 24px}a{color:#775b2c}h1{font-size:28px;font-weight:550;margin:12px 0}h2{font-size:20px;margin-top:36px}p{max-width:960px}nav,.links{display:flex;gap:16px;flex-wrap:wrap}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}figure{margin:0;background:#fff;border:1px solid #dedbd2;border-radius:10px;overflow:hidden}figure img{display:block;width:100%;aspect-ratio:2.297;object-fit:contain;background:#fff}figcaption{padding:12px 16px;border-top:1px solid #e8e5dd}.note{padding:14px 20px;background:#e9e4d9;border-radius:8px}@media(max-width:800px){main{padding:20px 14px}.grid{grid-template-columns:1fr}h1{font-size:23px}}'''
 html=f'''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>V{version} · 城市图样原稿与填色</title><style>{style}</style><main><nav><a href="../../">← 三维预览</a><a href="../../evidence.html">历史版本对照</a></nav><h1>{len(spec['cities'])} 个城市图样 · 原稿与填色复核</h1><p>原有图样继续保留。北京 2、深圳 2、天津 2、青岛 2 是同城的独立构图；选项编号不写到杯面城市名称中。桥、地景和底线沿用各自源稿。本批新增透明黑线稿按用户要求填满闭合区域，不额外处理镂空。</p><p class="note">每组依次展示原稿、可编辑结构母版、金线与青绿填色。源稿可以是黑线或橙金线，杯面统一使用固定金线。填色通过五种预设、颜色与材质面板调整。本页用于创作预览复核，尚不代表工厂制造验收。</p><p><a href="template.svg" download>下载 5433 × 2365 坐标模板</a></p><nav class="links">'''
 html+=''.join(f'<a href="#{c["id"]}">{escape(c["name"])}</a>' for c in spec['cities'])+'</nav>'
 for city in spec['cities']:
  ident=city['id'];name=escape(city['name']);a=by_id[ident]
  source=ident+('-source.png' if city.get('batch') else '-black.png')
  kind={'orange-ink':'白底橙金线','black-ink-alpha':'透明黑线','black-ink-white':'白底黑线'}.get(city['extraction'],'原稿')
  origin='用户提供' if city.get('batch') else '既有生成样板'
  w,h=a['sourceSize']
  html+=f'<section id="{ident}"><h2>{name}</h2><p>{origin} · {kind} · {w} × {h} · <a href="{ident}.svg" download>下载结构母版</a></p><div class="grid">'
  for file,caption in [(source,'原稿'),(ident+'.svg','结构线与独立填面'),(ident+'-flat.png','金线与填色')]:
   html+=f'<figure><img loading="lazy" src="{file}" alt="{name}：{caption}"><figcaption>{caption}</figcaption></figure>'
  html+='</div></section>'
 html+='<h2>尺寸与处理</h2><p>源稿按原比例放入 5433 × 2365 母版，不做横纵拉伸。运行通道为 4096 × 1783，既有杯面放置只应用一次。结构线与填色分别保存，旧款的孔洞方案保留；新增透明黑线稿不额外挖空；填面辅助边界不产生新的金线或浮雕。</p></main></html>'
 (root/'public/review/v5/index.html').write_text(html)
