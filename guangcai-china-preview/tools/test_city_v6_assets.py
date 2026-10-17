"""Verify supplied sources, aligned channels, full-fill and line-only normals."""
from pathlib import Path
import unittest,json,gzip,struct,hashlib,xml.etree.ElementTree as ET
import numpy as np
from PIL import Image,ImageFilter,ImageDraw
R=Path(__file__).resolve().parents[1]
AUDIT=json.loads((R/'evidence/city-v6/derivation.json').read_text())['cities']
class V6Assets(unittest.TestCase):
 def test_sources_and_editable_masters(self):
  self.assertEqual(len(AUDIT),23);self.assertEqual(len({a['id'] for a in AUDIT}),23)
  for a in AUDIT:
   self.assertEqual(hashlib.sha256((R/a['source']).read_bytes()).hexdigest(),a['sourceSha256'])
   master=R/f'assets/masters/v6/{a["id"]}.svg';self.assertEqual(hashlib.sha256(master.read_bytes()).hexdigest(),a['masterSha256'])
   tree=ET.fromstring(master.read_text());self.assertEqual(tree.get('viewBox'),'0 0 5433 2365');self.assertFalse(any(x.tag.endswith('image') for x in tree.iter()))
   self.assertEqual(a['holeSeeds'],[]);self.assertEqual(a['holePolygons'],[])
   with Image.open(R/f'public/cities/v6/{a["id"]}-choice.webp') as choice:
    self.assertEqual(choice.mode,'RGBA');self.assertLessEqual(choice.width,560);self.assertLessEqual(choice.height,236);self.assertEqual(choice.getchannel('A').getextrema()[0],0);self.assertGreater(choice.getchannel('A').getextrema()[1],0)
 def test_all_aligned_channels_and_flat_background(self):
  for a in AUDIT:
   mask=np.asarray(Image.open(R/'public/cities/v6'/a['maps']['mask']['file']).convert('RGB'))
   self.assertEqual(mask.shape,(1783,4096,3));line=mask[:,:,0];cover=mask[:,:,1];self.assertTrue(np.all(cover>=line));self.assertEqual(int(mask[:150].max()),0)
   raw=gzip.decompress((R/'public/cities/v6'/a['maps']['normal']['file']).read_bytes());self.assertEqual(raw[:4],b'HFN1');self.assertEqual(struct.unpack('<III',raw[4:16]),(4096,1783,1))
   normal=np.frombuffer(raw[16:],dtype='<f2').reshape((1783,4096,4))[::-1];self.assertTrue(np.isfinite(normal).all())
   support=np.asarray(Image.fromarray(np.uint8(line>0)*255).filter(ImageFilter.MaxFilter(9)))>0
   self.assertTrue(np.all(normal[~support,:3]==[.5,.5,1]),a['id'])
   # No enclosed blank pixels remain inside the silhouette.
   fill=Image.fromarray(np.uint8(cover>127)*255).copy();ImageDraw.floodfill(fill,(0,0),128)
   self.assertEqual(int((np.asarray(fill)==0).sum()),0,a['id'])
 def test_six_official_font_masks(self):
  data=json.loads((R/'evidence/city-v6/slogans.json').read_text());self.assertEqual(len(data['slogans']),6)
  for label in data['slogans']:
   f=R/'public/cities/v6'/label['file'];
   with Image.open(f) as image:self.assertEqual(image.size,(4096,1783))
   self.assertEqual(hashlib.sha256(f.read_bytes()).hexdigest(),label['sha256']);self.assertTrue(label['formatsMatch']);self.assertEqual(label['fontWeight'],400)
   self.assertEqual(len(label['glyphs']),4)
if __name__=='__main__':unittest.main()
