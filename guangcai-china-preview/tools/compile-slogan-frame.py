"""Trace the supplied frame into editable contours; preserve the PNG untouched."""
from pathlib import Path
import io,json,hashlib,xml.etree.ElementTree as ET
import numpy as np
from PIL import Image
import vtracer
root=Path(__file__).resolve().parents[1]
source=root/'assets/source/v6/slogan-frame.png'
im=Image.open(source).convert('RGBA');alpha=im.getchannel('A');bbox=alpha.getbbox()
mask=np.asarray(alpha.crop(bbox));binary=Image.fromarray(np.uint8(mask<96)*255)
buf=io.BytesIO();binary.save(buf,format='PNG')
svg=vtracer.convert_raw_image_to_svg(buf.getvalue(),img_format='png',colormode='binary',mode='spline',filter_speckle=4,corner_threshold=60,length_threshold=2,path_precision=3)
tree=ET.fromstring(svg);w,h=binary.size;tree.set('viewBox',f'0 0 {w} {h}');tree.set('width',str(w));tree.set('height',str(h))
ET.register_namespace('','http://www.w3.org/2000/svg')
for i,path in enumerate(tree):
 if path.tag.endswith('path'):path.set('id',f'frame-contour-{i}');path.set('fill','#dcb251')
body=ET.tostring(tree,encoding='unicode')
for dest in ['assets/masters/v6/slogan-frame.svg','public/cities/v6/slogan-frame.svg']:(root/dest).write_text(body+'\n')
audit={'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'sourceSize':im.size,'alphaBounds':bbox,'viewBox':[0,0,w,h],'method':'source contour tracing; paths remain editable; no reconstruction of geometry'}
(root/'evidence/city-v6/frame.json').write_text(json.dumps(audit,indent=2)+'\n')
print(json.dumps(audit))
