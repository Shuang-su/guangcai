mkdir -p work/video-review
python3 - <<'PY'
import subprocess, json
from pathlib import Path
root=Path('/Volumes/Prism_初号機/广彩/一号杯')
for n in [1153,1171,1188,1207,1209]:
 p=root/f'IMG_{n}.MOV'
 duration=float(json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','json',str(p)]))['format']['duration'])
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-i',str(p),'-vf',f'fps={12/duration},scale=300:-2,tile=4x3:padding=3:margin=3','-frames:v','1','-y',f'work/video-review/{n}.jpg'],check=True)
 print(n,duration)
PY