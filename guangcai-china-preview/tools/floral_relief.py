"""Derive relief from the fixed restored master, without treating gold grain as ink.
Colour/UVs are unchanged. All filters use periodic U for the saucer.
"""
import numpy as np
from scipy import ndimage as ndi

def smooth(a,b,x):
 t=np.clip((x-a)/(b-a),0,1);return t*t*(3-2*t)

def derive_relief(rgb,metal,native_width,periodic=False,paper=None):
 mode=('nearest','wrap' if periodic else 'nearest')
 blur=lambda a,s:ndi.gaussian_filter(a.astype(np.float32),s,mode=mode,truncate=3)
 # Small disconnected non-gold islands in the gold ground are paint grain, not
 # flower contours. Work with a halo so periodic components stay connected.
 halo=32 if periodic else 0
 paint=metal<.5
 padded=np.pad(paint,((0,0),(halo,halo)),mode='wrap') if periodic else paint
 labels,n=ndi.label(padded);sizes=np.bincount(labels.ravel())
 keep=sizes>=36;keep[0]=False
 clean=keep[labels];clean=clean[:,halo:-halo] if halo else clean
 removed=paint&~clean
 # A binary semantic surface flattens gold interiors; soft opacity variations
 # inside the original gold classification no longer become bumps.
 enamel=clean.astype(np.float32)
 luma=rgb@np.array([.2126,.7152,.0722],np.float32);near=blur(luma,3)
 contrast=np.maximum(0,near-luma)/np.maximum(.10,near)
 ink=np.maximum(smooth(.13,.38,contrast),(1-smooth(.36,.76,rgb.max(2)))*.92)*enamel
 ink=ndi.maximum_filter(ink,size=5,mode=mode)
 ink=ndi.minimum_filter(ink,size=5,mode=mode)
 # Restrict the closed ink to the true enamel support, so closing cannot bridge
 # empty gold gaps. Fine colour shading stays in the colour map only.
 stroke=blur((ink>.16)*enamel,1.25)
 if paper is not None:enamel[paper]=0;stroke[paper]=0
 height=blur((92+blur(enamel,2.4)*10+stroke*24+blur(stroke,2.8)*8)/255,1.15)
 h,w=height.shape
 dx=(np.roll(height,-1,1)-np.roll(height,1,1))*1.6*w/native_width
 dy=(np.roll(height,-1,0)-np.roll(height,1,0))*1.6*w/native_width
 if not periodic:dx[:,0]=dx[:,1];dx[:,-1]=dx[:,-2]
 dy[0]=dy[1];dy[-1]=dy[-2]
 length=np.sqrt(dx*dx+dy*dy+1)
 normal=np.stack([(-dx/length+1)/2,(dy/length+1)/2,(1/length+1)/2],2)
 # Empty gold well away from contours must have exactly neutral normal.
 far=ndi.minimum_filter((~clean).astype(np.uint8),size=35,mode=mode)>0
 stats={'removedIsolatedPixels':int(removed.sum()),'flatGoldPixels':int(far.sum()),'flatGoldMaxSlope':float(np.hypot(dx,dy)[far].max()) if far.any() else 0,'normalMaxSlope':float(np.hypot(dx,dy).max())}
 return height,normal,stats
