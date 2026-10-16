import unittest
import numpy as np
from floral_relief import derive_relief

class FloralReliefTests(unittest.TestCase):
 def test_gold_grain_is_not_relief(self):
  rgb=np.full((128,256,3),[.8,.65,.03],np.float32);metal=np.ones((128,256),np.float32)
  rgb[60:63,70:73]=.18;metal[60:63,70:73]=0
  height,normal,stats=derive_relief(rgb,metal,256)
  self.assertEqual(stats['removedIsolatedPixels'],9)
  self.assertEqual(stats['flatGoldMaxSlope'],0)
  np.testing.assert_array_equal(normal,np.broadcast_to([.5,.5,1],normal.shape))
 def test_flower_border_reaches_texture_edges(self):
  rgb=np.full((128,256,3),[.8,.65,.03],np.float32);metal=np.ones((128,256),np.float32)
  rgb[:,90:150]=[.7,.16,.24];metal[:,90:150]=0
  h,n,stats=derive_relief(rgb,metal,256)
  # No blanket top/bottom fade: the same flower edge survives at both trims.
  self.assertGreater(float(np.abs(n[0,:,0]-.5).max()),.01)
  np.testing.assert_allclose(n[0],n[64],atol=1e-7)
  np.testing.assert_allclose(n[-1],n[64],atol=1e-7)
 def test_periodic_relief_is_invariant_to_seam_position(self):
  rgb=np.full((128,256,3),[.8,.65,.03],np.float32);metal=np.ones((128,256),np.float32)
  rgb[20:100,:20]=[.6,.12,.3];metal[20:100,:20]=0
  rgb[20:100,-20:]=[.6,.12,.3];metal[20:100,-20:]=0
  _,a,_=derive_relief(rgb,metal,256,True)
  _,b,_=derive_relief(np.roll(rgb,80,1),np.roll(metal,80,1),256,True)
  np.testing.assert_allclose(a,np.roll(b,-80,1),atol=1e-7)

if __name__=='__main__':unittest.main()
