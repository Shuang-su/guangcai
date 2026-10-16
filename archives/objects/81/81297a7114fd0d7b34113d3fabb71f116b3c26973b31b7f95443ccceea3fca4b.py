from pathlib import Path
from PIL import Image,ImageFilter
import numpy as np,json
root=Path('.');out=root/'.codex-work/tmp/relief-separation'
stroke=Image.open('public/china/lines.png')
# Slightly broader rounded shoulders keep the enhanced relief from becoming sharp.
h=np.array(stroke.filter(ImageFilter.GaussianBlur(.65)),dtype=np.float32)*.8+np.array(stroke.filter(ImageFilter.GaussianBlur(1.35)),dtype=np.float32)*.2
Image.fromarray(np.round(h).astype('uint8')).save(out/'height.png')
coverage=np.asarray(stroke.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(.75)),dtype=np.float32)/255
metal=np.asarray(Image.open('public/china/metalness.png'),dtype=np.float32)/255
coverage=np.minimum(1,coverage*1.15)*metal
rough=np.round((.40-(.40-.28)*coverage)*255).astype('uint8')
Image.fromarray(rough).save(out/'roughness.png')
Image.fromarray(np.round(coverage*255).astype('uint8')).save(out/'line-finish.png')
dy,dx=np.gradient(h/255)
for gain in [3.5,5.0,6.5]:
 n=np.stack([-dx*gain,dy*gain,np.ones_like(h)],axis=-1);n/=np.linalg.norm(n,axis=-1,keepdims=True)
 Image.fromarray(np.round((n*.5+.5)*255).astype('uint8')).save(out/f'normal-{gain}.png')
print('Candidates ready')
