"""Check supplied-source registration, decoded bottoms, and normal orientation."""
from pathlib import Path
import gzip
import hashlib
import json
import struct
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[2]
RELEASE = ROOT / 'public/releases/v7-5'
SOURCE = ROOT / 'assets/source/v7.1.4'
OUT = ROOT / os.environ.get('CITY_ALIGNMENT_OUT', 'evidence/city-alignment-20261019')


def load(root):
    catalog = json.loads((root / 'catalog.json').read_text())
    return json.loads((root / catalog['manifestUrl']).read_text())


def signature(value):
    # Rebased immutable references must still resolve to the same encoded bytes.
    if isinstance(value, dict):
        return {k: signature(v) for k, v in value.items() if k != 'url'}
    return value


def enclosed_pixels(coverage):
    # Scanline flood avoids Python sets for millions of exterior sky pixels.
    wall = np.pad(coverage > 127, 1)
    seen = np.zeros_like(wall)
    queue = [(0, 0)]
    while queue:
        y, x = queue.pop()
        if wall[y,x] or seen[y,x]:
            continue
        blocked = wall[y] | seen[y]
        previous = np.flatnonzero(blocked[:x])
        following = np.flatnonzero(blocked[x:])
        left = int(previous[-1]+1) if len(previous) else 0
        right = int(x+following[0]) if len(following) else wall.shape[1]
        seen[y,left:right] = True
        for ny in [y-1,y+1]:
            if 0 <= ny < wall.shape[0]:
                available = ~(wall[ny,left:right] | seen[ny,left:right])
                starts = np.flatnonzero(available & np.r_[True, ~available[:-1]])
                queue.extend((ny, int(left+start)) for start in starts)
    return int(np.count_nonzero(~wall[1:-1,1:-1] & ~seen[1:-1,1:-1]))


def main():
    manifest = load(RELEASE)
    old = load(ROOT / 'public/releases/v7-4')
    assert signature(manifest['fixed']) == signature(old['fixed'])
    assert signature(manifest['slogans']) == signature(old['slogans'])
    assert signature(manifest['mark']) == signature(old['mark'])
    source = json.loads((SOURCE / 'provenance.json').read_text())
    assert len(source['cities']) == len(manifest['cities']) == 23
    rows = []
    font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Songti.ttc', 22)
    sheet = Image.new('RGB', (1600, 6 * 220), '#faf6ef')
    draw = ImageDraw.Draw(sheet)
    for i, entry in enumerate(source['cities']):
        ident = entry['id']
        data = (SOURCE / entry['file']).read_bytes()
        assert hashlib.sha256(data).hexdigest() == entry['sha256']
        a = np.asarray(Image.open(SOURCE / entry['file']).convert('RGBA'), dtype=np.float32)
        original = (a[:, :, 0] - a[:, :, 2]) * a[:, :, 3] / 255
        ys, xs = np.where(original > 130)
        bottom = np.where(original > 70)[0].max() + 1
        scale = 4096 * .82 / a.shape[1]
        row = {'id': ident, 'name': entry['name'], 'tiers': {}}
        for tier, level in manifest['cities'][ident]['levels'].items():
            asset = level['mask']
            mask = np.asarray(Image.open(RELEASE / asset['url']).convert('RGB'))
            h, w = mask.shape[:2]
            assert np.any(mask[-1, :, 0] > 127), (ident, tier, 'solid line bottom')
            assert np.any(mask[-1, :, 1] > 127), (ident, tier, 'fill bottom')
            assert np.all(mask[:, :, 1] >= mask[:, :, 0]), (ident, tier, 'coverage misses line')
            # Source sample locations predict where strokes must appear on the cup.
            # A two-pixel neighborhood allows AA and the three texture resolutions.
            xx = np.rint(((xs[::13] + .5) * scale + 4096 * .047) * w / 4096 - .5).astype(int)
            yy = np.rint(((ys[::13] + .5) * scale + 1783 - bottom * scale) * h / 1783 - .5).astype(int)
            support = np.asarray(Image.fromarray(mask[:, :, 0]).filter(ImageFilter.MaxFilter(5)))
            recall = float(np.mean(support[np.clip(yy, 0, h-1), np.clip(xx, 0, w-1)] > 40))
            assert recall > .99, (ident, tier, recall)
            normal = level['normal']
            raw = gzip.decompress((RELEASE / normal['url']).read_bytes())
            assert raw[:4] == b'HFN1' and struct.unpack('<III', raw[4:16]) == (w, h, 1)
            assert len(raw) == 16 + w*h*8
            vectors = np.frombuffer(raw, dtype='<f2', offset=16).reshape(h,w,4)[::-1,:,:3].astype(np.float32)*2-1
            assert np.isfinite(vectors).all()
            error = float(np.max(np.abs(np.linalg.norm(vectors, axis=2)-1)))
            assert error < .002
            if tier == 'detail':
                gy, gx = np.gradient(mask[:, :, 0].astype(np.float32))
                active = (np.abs(gx) + np.abs(gy)) > 20
                dot = -gx[active]*vectors[:,:,0][active] + gy[active]*vectors[:,:,1][active]
                assert float(np.mean(dot >= 0)) > .99, ident + ' normal direction'
                # Every enclosed city face is full-fill; all empty pixels connect to sky.
                holes = enclosed_pixels(mask[:,:,1])
                assert holes == 0, (ident, 'unfilled enclosed pixels', holes)
                thumb = Image.new('RGB',(w,h),'#fffdf7')
                thumb.paste('#4e8a76',(0,0,w,h),Image.fromarray(mask[:,:,1]))
                thumb.paste('#c5993c',(0,0,w,h),Image.fromarray(mask[:,:,0]))
                thumb.thumbnail((386,178), Image.Resampling.LANCZOS)
                x,y=(i%4)*400+7,(i//4)*220+35
                sheet.paste(thumb,(x,y));draw.text((x,y-29),entry['name'],font=font,fill='#3b3025')
            row['tiers'][tier] = {'size':[w,h], 'bottomGap':0, 'sourceStrokeRecallWithin2px':recall, 'maxNormalLengthError':error}
        rows.append(row)
        print(ident, 'source registration and bottom passed', flush=True)
    OUT.mkdir(parents=True, exist_ok=True)
    report = dict(passed=True, cities=23, tiers=69, sourceChanged=sum(e['sourceChanged'] for e in source['cities']),
                  fixedAndSlogansUnchanged=True, checks=rows)
    (OUT / 'validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    sheet.save(OUT / 'cities-contact.jpg',quality=95)
    print(json.dumps({k:v for k,v in report.items() if k!='checks'}))


if __name__ == '__main__':
    main()
