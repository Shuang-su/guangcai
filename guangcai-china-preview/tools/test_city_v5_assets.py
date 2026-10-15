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
  samples={'beijing':{'empty':[(195,580),(1300,200)],'filled':[(390,470),(745,620)]},'shenzhen':{'empty':[(925,737),(1500,200)],'filled':[(460,500),(670,600)]}}
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
 def test_landmark_boundaries_and_removed_bridge(self):
  for a in AUDIT:
   mask=np.asarray(Image.open(R/'public/cities/v5'/a['maps']['mask']['file']).convert('RGB'))
   t=a['sourceToMaster'];p=a['placementAppliedOnce']
   def at(x,y,channel=1):
    u=(x*t['scale']+t['offset'][0])/5433;v=(y*t['scale']+t['offset'][1])/2365
    return int(mask[round((v*p['scale']+1-p['scale']-p['offsetV'])*1783),round((u*p['scale']+p['offsetU'])*4096),channel])
   if a['id']=='beijing':
    # Outside both sides of the temple must not become a rectangular fill.
    for x,y in [(1100,400),(500,400),(16,750),(1870,750),(1810,730)]:self.assertLess(at(x,y),5,(x,y))
    # The curved tail still exists near the floor; it was not merely cropped off.
    self.assertGreater(at(1800,754),245)
    # Fill closure below wall is not a visible underline / normal ridge.
    self.assertGreater(at(1300,747),245);self.assertLess(at(1300,747,0),5)
   else:
    for x in range(1380,1881,50):
     for y in range(690,791,20):self.assertLess(at(x,y),5,('removed bridge',x,y))
    # Independent tower bases do not acquire a continuous ground line.
    for x in [205,353]:self.assertLess(at(x,789),5)
 def test_generated_detail_survives_tracing(self):
  for a in AUDIT:
   self.assertEqual(a['authoring']['mode'],'image-trace')
   self.assertGreater(a['traceFidelity']['originalStrokeRecallWithin1px'],.98)
   self.assertGreater(a['traceFidelity']['tracedStrokePrecisionWithin1px'],.99)
 def test_landmark_sources_and_components(self):
  folder=R/'assets/masters/v5/landmarks';manifest=json.loads((folder/'manifest.json').read_text())
  self.assertEqual(manifest['authoringSize'],[1900,828])
  for city,parts in manifest['cities'].items():
   self.assertEqual(len(parts),len({p['id'] for p in parts}))
   for p in parts:
    self.assertEqual(hashlib.sha256((folder/p['file']).read_bytes()).hexdigest(),p['sha256'])
    self.assertFalse(any(n.tag.endswith('image') for n in ET.parse(folder/p['file']).getroot().iter()))
  self.assertNotIn('bridge',[p['id'] for p in manifest['cities']['shenzhen']])
  temple=next(p for p in manifest['cities']['beijing'] if p['id']=='hall-of-prayer')
  self.assertIn(hashlib.sha256((R/'assets/extracted/layer-6-alpha.png').read_bytes()).hexdigest(),temple['source'])
if __name__=='__main__':unittest.main()
