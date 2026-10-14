import unittest,runpy
from pathlib import Path
import numpy as np
clean=runpy.run_path(str(Path(__file__).with_name('clean-fixed-gold.py')))['clean_gold_mask']
class GoldCleanupTests(unittest.TestCase):
 def test_gold_texture_noise_is_removed_without_erasing_paint(self):
  rng=np.random.default_rng(3);metal=rng.uniform(.55,1,(128,256)).astype(np.float32)
  metal[20:100,70:120]=0;metal[55:58,185:188]=0
  cleaned,support=clean(metal)
  self.assertTrue(np.all(cleaned[25:95,75:115]==0))
  self.assertTrue(np.all(cleaned[:,150:]==1))
  self.assertTrue(np.all(support[20:100,70:120]))
 def test_yellow_fruit_is_not_bare_gold(self):
  metal=np.ones((128,256),np.float32)
  rgb=np.full((128,256,3),[.8,.64,.02],np.float32)
  rgb[20:100,60:180]=[.9,.80,.15]
  result,_=clean(metal,rgb=rgb)
  self.assertTrue(np.all(result[30:90,70:170]==0))
  self.assertTrue(np.all(result[:,210:]==1))
 def test_white_attachment_cutouts_stay_nonmetal(self):
  metal=np.ones((128,256),np.float32);paper=np.zeros_like(metal,dtype=bool);paper[20:50,80:180]=True
  result,_=clean(metal,paper=paper)
  self.assertTrue(np.all(result[paper]==0))
 def test_clean_mask_preserves_periodic_seam(self):
  m=np.ones((128,256),np.float32);m[20:100,:20]=0;m[20:100,-20:]=0
  a,_=clean(m,True);b,_=clean(np.roll(m,80,1),True)
  np.testing.assert_array_equal(a,np.roll(b,-80,1))
if __name__=='__main__':unittest.main()
