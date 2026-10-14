python3 - <<'PY'
from pathlib import Path
import json,shutil
out=Path('outputs/evidence'); d=json.loads((out/'reference-index.json').read_text());d['videos']=[]
for n,duration,subject in [(1153,15.298345,'托碟翻转：承杯位、外斜壁、大底圈'),(1171,21.733333,'杯身翻转：把手宽面、根部、杯内与杯底'),(1188,18.433333,'杯盖翻转：低拱桥钮与底面止口'),(1207,17.5817,'整套环绕：侧面、背面、俯视、低机位'),(1209,7.248345,'釉彩近景：高光沿花瓣和金带移动')]:
 shutil.copy2(f'work/video-review/{n}.jpg',out/f'video-{n}-samples.jpg')
 d['videos'].append({'file':f'IMG_{n}.MOV','durationSeconds':duration,'subject':subject,'review':'12 evenly spaced decoded frames visually inspected; not continuous playback','sampleSeconds':[round((i+.5)*duration/12,3) for i in range(12)],'sheet':f'video-{n}-samples.jpg'})
(out/'reference-index.json').write_text(json.dumps(d,ensure_ascii=False,indent=2))
s=''.join(f'<section><h2>{v["file"]} · {v["subject"]}</h2><p>12 个等间隔抽帧，时间从左至右、从上至下。时间点：{v["sampleSeconds"]} 秒。原视频时长 {v["durationSeconds"]:.2f} 秒。此记录是序列抽帧观察，不是逐帧审阅。</p><img style="height:auto;max-width:1000px" src="{v["sheet"]}"></section>' for v in d['videos'])
with (out/'reference-index.html').open('a') as f:f.write('<h1>5 段视频 · 转动序列</h1>'+s)
print('68 photos + 5 videos / 60 samples indexed')
PY