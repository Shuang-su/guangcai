"""Source/UV/topology/precision checks for compiled V5 city packages."""
from pathlib import Path
import unittest,json,gzip,struct,hashlib,xml.etree.ElementTree as ET
import numpy as np
from PIL import Image,ImageFilter
R=Path(__file__).resolve().parents[1]
AUDIT=json.loads((R/'evidence/city-v5/derivation.json').read_text())['cities']
class CityAssets(unittest.TestCase):
 def test_editable_master_and_provenance(self):
  for a in AUDIT:
   src=R/a['source'];self.assertEqual(hashlib.sha256(src.read_bytes()).hexdigest(),a['sourceSha256'])
   master=R/f'assets/masters/v5/{a["id"]}.svg';self.assertEqual(hashlib.sha256(master.read_bytes()).hexdigest(),a['masterSha256'])
   tree=ET.fromstring(master.read_text());self.assertEqual(tree.get('viewBox'),'0 0 5433 2365')
   groups={g.get('id'):g for g in tree if g.tag.endswith('g')}
   self.assertTrue(all(x in groups for x in ['fill','holes','lines','guides']))
   self.assertFalse(any(n.tag.endswith('image') for n in tree.iter()))
   self.assertGreater(len(list(groups['holes'])),0)
 def test_channels_aligned_and_background_flat(self):
  for a in AUDIT:
   mask=np.asarray(Image.open(R/'public/cities/v5'/a['maps']['mask']['file']).convert('RGB'))
   self.assertEqual(mask.shape,(1783,4096,3));line=mask[:,:,0];coverage=mask[:,:,1]
   self.assertTrue(np.all(coverage>=line));self.assertEqual(int(mask[:150].max()),0)
   raw=gzip.decompress((R/'public/cities/v5'/a['maps']['normal']['file']).read_bytes())
   self.assertEqual(raw[:4],b'HFN1');self.assertEqual(struct.unpack('<III',raw[4:16]),(4096,1783,1))
   normal=np.frombuffer(raw[16:],dtype='<f2').reshape((1783,4096,4))[::-1].astype('float32')
   self.assertTrue(np.isfinite(normal).all());self.assertGreaterEqual(float(normal.min()),0);self.assertLessEqual(float(normal.max()),1)
   support=np.asarray(Image.fromarray(np.uint8(line>0)*255).filter(ImageFilter.MaxFilter(9)))>0
   self.assertTrue(np.all(normal[~support,:3]==[.5,.5,1]))
   height=np.asarray(Image.open(R/f'assets/masters/v5/{a["id"]}-height16.png'))
   self.assertGreater(len(np.unique(height)),256)
 def test_architectural_voids_and_sky_remain_unpainted(self):
  samples={'beijing':{'empty':[(195,580),(1300,200)],'filled':[(390,470),(745,620)]},'shenzhen':{'empty':[(953,735),(1500,200)],'filled':[(498,500),(685,600)]}}
  for a in AUDIT:
   mask=np.asarray(Image.open(R/'public/cities/v5'/a['maps']['mask']['file']).convert('RGB'));t=a['sourceToMaster'];p=a['placementAppliedOnce']
   def point(pos):
    x,y=pos;x=(x*t['scale']+t['offset'][0])/5433;y=(y*t['scale']+t['offset'][1])/2365
    return round((x*p['scale']+p['offsetU'])*4096),round((y*p['scale']+1-p['scale']-p['offsetV'])*1783)
   for group,coords in samples[a['id']].items():
    for pos in coords:
     x,y=point(pos);value=int(mask[y,x,1])
     if group=='empty':self.assertLess(value,5,(a['id'],pos,value))
     else:self.assertGreater(value,245,(a['id'],pos,value))
 def test_runtime_files_match_manifest(self):
  for a in AUDIT:
   for v in a['maps'].values():self.assertEqual(hashlib.sha256((R/'public/cities/v5'/v['file']).read_bytes()).hexdigest(),v['sha256'])
if __name__=='__main__':unittest.main()
