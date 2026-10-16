"""Validate source alignment, clean relief and legacy texture preservation."""
from pathlib import Path
import json,gzip,struct,hashlib,subprocess,unittest
import numpy as np
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
class BeijingAssets(unittest.TestCase):
 def test_source_strokes_preserved(self):
  a=np.array(Image.open(ROOT/'assets/source/beijing/beijing-lines-original.png'))[:,:,3]
  b=np.array(Image.open(ROOT/'assets/masters/beijing-4.3/source-ink-clean.png'))
  self.assertTrue(np.array_equal(a[a>=128],b[a>=128]))
 def test_maps_shared_and_sized(self):
  c=json.loads((ROOT/'src/styles/city-catalog.json').read_text());vs=[v for v in c['variants'] if v['theme']=='beijing']
  self.assertEqual(len(vs),5)
  for k in ['coverage','normal']:self.assertEqual(len({v['maps'][k] for v in vs}),1)
  for v in vs:
   for k,p in v['maps'].items():
    f=ROOT/'public/cities/v4'/p
    self.assertTrue(f.is_file())
    if k!='normal':
     with Image.open(f) as im:self.assertEqual(im.size,(4096,1783))
  a=json.loads((ROOT/'evidence/beijing-4.3/derivation.json').read_text())
  self.assertTrue(a['sourceToRuntime']['isotropic']);self.assertFalse(a['imagegen']['accepted'])
 def test_unpainted_regions_flat_and_fill_present(self):
  ink=np.array(Image.open(ROOT/'assets/masters/beijing-4.3/beijing-lines-4k.png'))
  coverage=np.array(Image.open(ROOT/'assets/masters/beijing-4.3/beijing-coverage-4k.png'))
  height=np.array(Image.open(ROOT/'assets/masters/beijing-4.3/beijing-height16.png'))
  self.assertEqual(int(height[:350].max()),0)
  self.assertEqual(int(coverage[:350].max()),0)
  self.assertGreater(int(((coverage>250)&(ink<5)).sum()),700000)
  # Sky, foreground cloud, building wall, roof and stairs in source coordinates.
  a=json.loads((ROOT/'evidence/beijing-4.3/derivation.json').read_text())['sourceToRuntime'];s=a['scale'];ox,oy=a['paste']
  for x,y in [(1700,260),(100,40),(200,782),(1160,781)]:
   xx,yy=round(ox+x*s),round(oy+y*s)
   self.assertLess(coverage[yy,xx],8,(x,y))
  for x,y in [(700,630),(730,710),(690,337),(270,435)]:
   xx,yy=round(ox+x*s),round(oy+y*s)
   self.assertGreater(coverage[yy,xx],240,(x,y))
  c=json.loads((ROOT/'src/styles/city-catalog.json').read_text());v=next(v for v in c['variants'] if v['theme']=='beijing')
  raw=gzip.decompress((ROOT/'public/cities/v4'/v['maps']['normal']).read_bytes())
  self.assertEqual(raw[:4],b'HFN1');self.assertEqual(struct.unpack('<III',raw[4:16]),(4096,1783,1))
  normal=np.frombuffer(raw[16:],dtype='<f2').reshape(1783,4096,4)[::-1]
  self.assertTrue(np.isfinite(normal).all());self.assertTrue(np.all(normal[:350,:,:3]==[.5,.5,1]))
 def test_old_catalog_and_assets_unchanged(self):
  old=json.loads(subprocess.check_output(['git','show','origin/main:guangcai-china-preview/src/styles/city-catalog.json'],cwd=ROOT))
  new=json.loads((ROOT/'src/styles/city-catalog.json').read_text())
  for v in old['variants']:
   self.assertEqual(v,next(x for x in new['variants'] if x['id']==v['id']))
   for p in [v['thumbnail'],*v['maps'].values()]:
    expected=subprocess.check_output(['git','show','origin/main:guangcai-china-preview/public/cities/v4/'+p],cwd=ROOT)
    self.assertEqual(hashlib.sha256(expected).digest(),hashlib.sha256((ROOT/'public/cities/v4'/p).read_bytes()).digest())
if __name__=='__main__':unittest.main()
