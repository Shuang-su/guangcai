"""Compile supplied closed Xi'an/APEC exports and bounded background cutouts.

Published resources stay immutable. Five background edits affect G only; their
R planes and normal files remain identical. Coordinates are runtime pixels.
"""
from pathlib import Path
import sys, json, io, gzip, struct, importlib.util
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE)); sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location('reviewed_channels', HERE/'compile-city-alignment.py')
m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
prior = ROOT/'public/releases/v7-8'; out = ROOT/'public/releases/v7-9'
old = json.loads((prior/json.loads((prior/'catalog.json').read_text())['manifestUrl']).read_text())
masters = ROOT/'assets/masters/v7.1.11'; sources = ROOT/'assets/source/v7.1.11'
evidence = ROOT/'evidence/v7.1.11'; evidence.mkdir(parents=True, exist_ok=True)
mapping = json.loads((ROOT/'assets/masters/v7.1.7/mapping.json').read_text())
cutouts = json.loads((masters/'background-cutouts.json').read_text())
W, H = mapping['runtime']; s = mapping['scale']/2; dx, dy = mapping['offset']
compiled = {}; report = {'mapping': mapping, 'cities': {}, 'phase2Formal': False}

for c, cfg in cutouts['cities'].items():
    a = np.array(Image.open(prior/old['cities'][c]['levels']['detail']['mask']['url']).convert('RGB'))
    assert m.sha((prior/old['cities'][c]['levels']['detail']['mask']['url']).read_bytes()) == cfg['sourceMaskSha256']
    barrier = Image.fromarray(np.uint8(a[:,:,0] > cutouts['barrierThreshold'])*255)
    barrier = barrier.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))
    core = np.zeros((H,W), bool)
    for region in cfg['regions']:
        flooded = barrier.copy(); ImageDraw.floodfill(flooded, tuple(region['seed']), 128)
        pixels = np.array(flooded) == 128
        assert int(pixels.sum()) == region['pixels'], (c, region)
        assert m.bounds(np.uint8(pixels)*255) == region['bounds']
        core |= pixels
    cut = Image.fromarray(np.uint8(core)*255).filter(ImageFilter.MaxFilter(5))
    cut_bytes = io.BytesIO(); cut.save(cut_bytes, format='PNG')
    m.immutable(masters/(c+'-cutout-mask-'+m.sha(cut_bytes.getvalue())[:16]+'.png'), cut_bytes.getvalue())
    levels = {}; stats = {}; m.OUT = out
    for tier, old_level in old['cities'][c]['levels'].items():
        asset = old_level['mask']; source = (prior/asset['url']).read_bytes()
        before = np.array(Image.open(io.BytesIO(source)).convert('RGB')); after = before.copy()
        mask = np.array(cut.resize((asset['width'], asset['height']), Image.Resampling.LANCZOS))
        after[:,:,1] = np.maximum(before[:,:,0], np.rint(before[:,:,1].astype(float)*(1-mask/255)).astype('uint8'))
        assert np.array_equal(after[:,:,0], before[:,:,0])
        assert np.all(after[:,:,1] >= after[:,:,0])
        assert np.all(after[:,:,1] <= before[:,:,1])
        changed = after[:,:,1] != before[:,:,1]
        assert changed.sum() > 0 and not changed[mask == 0].any()
        levels[tier] = {'mask': m.emit(c+'-'+tier+'-mask', m.webp(Image.fromarray(after)),
                       (asset['width'],asset['height']),source+cut_bytes.getvalue(),2)}
        stats[tier] = {'changedCoveragePixels':int(changed.sum()), 'lineSha256':m.sha(after[:,:,0].tobytes()),
                       'normalSha256':old_level['normal']['sha256'], 'allLineBytesUnchanged':True,
                       'coverageOnlyInsideMask':True, 'coverageReducedByPixels':float((before[:,:,1].astype(float)-after[:,:,1]).sum()/255)}
    compiled[c] = {'levels':levels}
    report['cities'][c] = {'method':'bounded background components; G only','regions':len(cfg['regions']),
                           'maskSha256':m.sha(cut_bytes.getvalue()),'tiers':stats}
    print(c, 'background edited, line and normal unchanged', flush=True)

for entry in json.loads((sources/'provenance.json').read_text()):
    c = entry['id']; source = (sources/entry['file']).read_bytes(); assert m.sha(source) == entry['sha256']
    a = np.array(Image.open(io.BytesIO(source)).convert('RGBA'), dtype=np.float32)
    assert a.shape[:2] == (1630,3878)
    ink = np.clip(a[:,:,0]-a[:,:,2],0,255)*a[:,:,3]/255
    support = np.array(Image.fromarray(np.uint8(ink>130)*255).filter(ImageFilter.MaxFilter(3)))>0
    ink[~support] = 0
    left,top,right,bottom = m.bounds(ink)
    barrier = Image.fromarray(np.uint8(np.pad(ink[:bottom]>70,4))*255)
    ImageDraw.Draw(barrier).line([(left+4,bottom+3),(right+3,bottom+3)],fill=255,width=1)
    barrier = barrier.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))
    flooded = barrier.copy(); ImageDraw.floodfill(flooded,(0,0),128)
    fill = np.zeros_like(ink,dtype='uint8'); fill[:bottom] = np.uint8(np.array(flooded)[4:-4,4:-4]!=128)*255
    fill = np.maximum(fill,np.uint8(ink))
    def place(channel):
        padded = np.pad(np.uint8(channel),((0,8),(0,0)),mode='edge')
        return np.array(Image.fromarray(padded).transform((W,H),Image.Transform.AFFINE,
                        (1/s,0,-dx/s,0,1/s,-dy/s),resample=Image.Resampling.BICUBIC))
    lines,coverage = place(ink),place(fill); coverage = np.maximum(coverage,lines)
    vectors = m.normal_vectors(lines); m.OUT = out if c=='xian' else ROOT/'public/dev-assets'
    levels = {}; stats = {}
    for tier,w in [('light',1024),('standard',2048),('detail',4096)]:
        h = round(H*w/W); size = (w,h)
        line = np.array(Image.fromarray(lines).resize(size,Image.Resampling.LANCZOS))
        cover = np.maximum(line,np.array(Image.fromarray(coverage).resize(size,Image.Resampling.LANCZOS)))
        mask = Image.fromarray(np.stack([line,cover,np.zeros_like(line)],axis=2))
        raw = gzip.decompress(m.normal_map(vectors,size))
        planes = np.frombuffer(raw,dtype=np.uint8,offset=16).reshape(-1,8).T.tobytes()
        normal = gzip.compress(raw[:12]+struct.pack('<I',2)+planes,compresslevel=9,mtime=0)
        levels[tier] = {'mask':m.emit(c+'-'+tier+'-mask',m.webp(mask),size,source,2),
                        'normal':m.emit(c+'-'+tier+'-normal',normal,size,source,4,'hfn1-gzip')}
        stats[tier] = {'lineBounds':m.bounds(line),'coverageBounds':m.bounds(cover),'size':list(size)}
    compiled[c] = {'name':'西安' if c=='xian' else '深圳 · 二期 APEC 会场', 'levels':levels}
    if c!='xian':compiled[c].update(cityId='shenzhen',experimental=True,phase=2,rasterWidth=2048,scope='dev-only')
    report['cities'][c] = {'method':'supplied complete PNG with shared PSD matrix','sourceSha256':entry['sha256'],'scope':entry['scope'],'tiers':stats}
    print(c,'supplied export compiled',flush=True)
(ROOT/'.codex-work/tmp/compiled-v7.1.11.json').write_text(json.dumps(compiled,ensure_ascii=False,indent=2)+'\n')
(evidence/'city-derivation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
