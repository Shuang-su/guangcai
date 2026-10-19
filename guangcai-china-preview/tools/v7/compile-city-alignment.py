"""Source-faithful city maps for the local v7-5 candidate (Pillow + NumPy).

Run from any directory. Keep supplied PNGs and published releases immutable.
Only the common source-to-cup placement and bottom registration are normalized.
"""
from pathlib import Path
import gzip
import hashlib
import json
import struct
import subprocess
import io
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from mask_regions import enclosed_mask

ROOT = Path(__file__).resolve().parents[2]
SOURCES = ROOT / 'assets/source/v7.1.4'
OUT = ROOT / 'public/releases/v7-5'
EVIDENCE = ROOT / 'evidence/city-alignment-20261019'
PROVENANCE = json.loads((SOURCES / 'provenance.json').read_text())
W, H = 4096, 1783
SCALE, OFFSET_U = .82, .047


def sha(data):
    return hashlib.sha256(data).hexdigest()


def immutable(path, data):
    if path.exists():
        if path.read_bytes() != data:
            raise ValueError(f'Immutable output differs: {path}')
    else:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)


def webp(image):
    import io
    stream = io.BytesIO()
    image.save(stream, format='WEBP', lossless=True, method=6, exact=True)
    return stream.getvalue()


def emit(ident, data, size, source, channels, encoding='webp', color_space='linear'):
    digest = sha(data)
    url = f'assets/{ident}-{digest[:16]}.{"webp" if encoding == "webp" else "hfn.gz"}'
    immutable(OUT / url, data)
    width, height = size
    decoded = width * height * (channels if encoding == 'webp' else 8)
    return dict(id=ident, url=url, sha256=digest, sourceSha256=sha(source),
                encoding=encoding, width=width, height=height, bytes=len(data),
                decodedBytes=decoded, gpuBytes=(decoded * 4 + 2) // 3,
                channels=channels, colorSpace=color_space)


def normal_vectors(lines):
    # Same line-only relief convention as V6: bottom-up RGBA16F, not byte normals.
    smooth = lines.astype(np.float32) / 255
    x = np.arange(-2, 3)
    kernel = np.exp(-x * x / (2 * .65 ** 2))
    kernel /= kernel.sum()
    for axis in [0, 1]:
        padding = [(0, 0), (0, 0)]
        padding[axis] = (2, 2)
        padded = np.pad(smooth, padding, mode='edge')
        result = np.zeros_like(smooth)
        for i, weight in enumerate(kernel):
            slices = [slice(None), slice(None)]
            slices[axis] = slice(i, i + smooth.shape[axis])
            result += padded[tuple(slices)] * weight
        smooth = result
    gy, gx = np.gradient(smooth)
    vectors = np.stack([-gx * 2.1, gy * 2.1, np.ones_like(smooth)], axis=2)
    vectors /= np.linalg.norm(vectors, axis=2, keepdims=True)
    return vectors


def normal_map(vectors, size):
    width, height = size
    if vectors.shape[:2] != (height, width):
        # Sample four neighbors like resize-hfn.mjs. Pillow.resize's default
        # downsampling widens the filter, spreading relief and download bytes.
        source_h, source_w = vectors.shape[:2]
        transform = (source_w / width, 0, 0, 0, source_h / height, 0)
        vectors = np.stack([np.asarray(Image.fromarray(vectors[:, :, k]).transform(size, Image.Transform.AFFINE, transform, resample=Image.Resampling.BILINEAR)) for k in range(3)], axis=2)
        vectors /= np.linalg.norm(vectors, axis=2, keepdims=True)
    rgba = np.ones((height, width, 4), dtype='<f2')
    rgba[:, :, :3] = vectors * .5 + .5
    raw = b'HFN1' + struct.pack('<III', width, height, 1) + rgba[::-1].tobytes()
    return gzip.compress(raw, compresslevel=9, mtime=0)


def bounds(a):
    y, x = np.where(a > 70)
    return [int(x.min()), int(y.min()), int(x.max() + 1), int(y.max() + 1)]


def fill_correction(ident):
    config = ROOT / 'assets/masters/v7.1.4/fill-preservation.json'
    spec = json.loads(config.read_text()) if config.exists() else {}
    if ident not in spec:
        return None, b''
    svg = (ROOT / spec[ident]['file']).read_bytes()
    js = "import sharp from 'sharp';let b=[];for await(const x of process.stdin)b.push(x);process.stdout.write(await sharp(Buffer.concat(b)).png().toBuffer());"
    result = subprocess.run(['node','--input-type=module','-e',js],input=svg,stdout=subprocess.PIPE,cwd=ROOT,check=True)
    return np.asarray(Image.open(io.BytesIO(result.stdout)).convert('RGBA'))[:,:,3], svg


def register_solid_bottom(line, fill, normal_bytes):
    h, w = line.shape
    gap = h - (np.where(line > 127)[0].max() + 1)
    if not gap:
        return line, fill, normal_bytes, 0
    def shift(channel):
        out = np.zeros_like(channel)
        out[gap:] = channel[:h-gap]
        return out
    raw = gzip.decompress(normal_bytes)
    normal = np.frombuffer(raw, dtype='<f2', offset=16).reshape(h,w,4)[::-1]
    shifted = np.empty_like(normal); shifted[:] = [.5,.5,1,1]
    shifted[gap:] = normal[:h-gap]
    normal_bytes = gzip.compress(raw[:16] + shifted[::-1].tobytes(), compresslevel=9, mtime=0)
    return shift(line), shift(fill), normal_bytes, int(gap)


def align_existing(entry, source):
    # Fourteen supplied originals are byte-identical. Translate their already
    # reviewed maps together, retaining fine contours and the approved fill fixes.
    old_root = ROOT / 'public/releases/v7-4'
    catalog = json.loads((old_root / 'catalog.json').read_text())
    prior = json.loads((old_root / catalog['manifestUrl']).read_text())['cities'][entry['id']]
    city = {'name': entry['name'], 'levels': {}}
    tiers = {}
    for tier, level in prior['levels'].items():
        mask = np.asarray(Image.open(old_root / level['mask']['url']).convert('RGB'))
        h, w = mask.shape[:2]
        # Register the solid stroke, not its faint antialias fringe. Otherwise
        # low tiers retain an apparently white final row despite nonzero alpha.
        last = np.where(mask[:, :, 0] > 127)[0].max() + 1
        gap = h - last
        aligned = np.zeros_like(mask)
        aligned[gap:] = mask[:h-gap] if gap else mask
        raw = gzip.decompress((old_root / level['normal']['url']).read_bytes())
        normal = np.frombuffer(raw, dtype='<f2', offset=16).reshape(h,w,4)[::-1]
        shifted = np.empty_like(normal)
        shifted[:] = [.5,.5,1,1]
        shifted[gap:] = normal[:h-gap] if gap else normal
        normal_bytes = gzip.compress(raw[:16] + shifted[::-1].tobytes(), compresslevel=9, mtime=0)
        city['levels'][tier] = {
            'mask': emit(f'{entry["id"]}-{tier}-mask', webp(Image.fromarray(aligned)), (w,h), source, 2),
            'normal': emit(f'{entry["id"]}-{tier}-normal', normal_bytes, (w,h), source, 4, 'hfn1-gzip')}
        tiers[tier] = dict(size=[w,h], lineBounds=bounds(aligned[:,:,0]),
                           coverageBounds=bounds(aligned[:,:,1]), bottomGap=0, translatedRows=int(gap))
    import os
    city['thumbnail'] = {**prior['thumbnail'], 'url': os.path.relpath((old_root / prior['thumbnail']['url']).resolve(), OUT)}
    return city, dict(id=entry['id'], name=entry['name'], sourceSha256=sha(source), sourceChanged=entry['sourceChanged'],
                      method='translate reviewed line/fill/normal together; source ink geometry identical', tiers=tiers)


def compile_city(entry):
    ident = entry['id']
    source = (SOURCES / entry['file']).read_bytes()
    if sha(source) != entry['sha256']:
        raise ValueError(f'Source changed: {ident}')
    if not entry['sourceChanged'] or entry.get('reuseReviewedGeometry'):
        if not entry.get('reuseReviewedGeometry') and entry['sha256'] != entry['previousSourceSha256']:
            raise ValueError(f'Cannot reuse maps for changed source: {ident}')
        if entry.get('reuseReviewedGeometry'):
            a = np.asarray(Image.open(SOURCES/entry['file']).convert('RGBA'),dtype=np.float32)
            geometry = np.uint8((np.maximum(a[:,:,0]-a[:,:,2],0)*a[:,:,3]/255)>70)
            if sha(geometry.tobytes()) != entry['reviewedInkSha256']:
                raise ValueError(f'Reviewed ink geometry changed: {ident}')
        return align_existing(entry, source)
    a = np.asarray(Image.open(SOURCES / entry['file']).convert('RGBA'), dtype=np.float32)
    if list(a.shape[:2][::-1]) != [3878, 1630]:
        raise ValueError(f'Unexpected source frame: {ident}')
    ink = np.clip(a[:, :, 0] - a[:, :, 2], 0, 255) * a[:, :, 3] / 255
    solid = ink > 70
    support = np.asarray(Image.fromarray(np.uint8(ink > 130) * 255).filter(ImageFilter.MaxFilter(3))) > 0
    ink[~support] = 0
    solid &= support
    left, top, right, bottom = bounds(ink)
    # Close fill only at the source's existing bottom. Never draw a new gold baseline.
    barrier = Image.fromarray(np.uint8(np.pad(solid[:bottom], 4)) * 255)
    ImageDraw.Draw(barrier).line([(left + 4, bottom + 3), (right + 3, bottom + 3)], fill=255, width=1)
    barrier = barrier.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))
    flooded = barrier.copy()
    ImageDraw.floodfill(flooded, (0, 0), 128)
    cover = (np.asarray(flooded)[4:-4, 4:-4] != 128).astype('uint8') * 255
    # All internal faces stay filled; exterior sky remains reachable by the flood.
    cover = np.maximum(cover, np.uint8(ink[:bottom]))
    scale = W * SCALE / a.shape[1]
    dx, dy = W * OFFSET_U, H - bottom * scale

    def place(channel):
        # Repeat the final source row outside the frame so filtering cannot create
        # a pale seam at the geometry boundary. No nonuniform city scaling.
        padded = np.pad(channel[:bottom], ((0, 8), (0, 0)), mode='edge')
        image = Image.fromarray(np.uint8(padded))
        return np.asarray(image.transform((W, H), Image.Transform.AFFINE,
                          (1 / scale, 0, -dx / scale, 0, 1 / scale, -dy / scale),
                          resample=Image.Resampling.BICUBIC))

    lines, coverage = place(ink), place(cover)
    coverage = np.maximum(coverage, lines)
    correction, correction_svg = fill_correction(ident)
    correction = place(correction) if correction is not None else None
    vectors = normal_vectors(lines)
    city = {'name': entry['name'], 'levels': {}}
    tiers = {}
    for tier, width in [('light', 1024), ('standard', 2048), ('detail', 4096)]:
        height = round(H * width / W)
        line = np.asarray(Image.fromarray(lines).resize((width, height), Image.Resampling.LANCZOS))
        fill = np.maximum(np.asarray(Image.fromarray(coverage).resize((width, height), Image.Resampling.LANCZOS)), line)
        if correction is not None:
            fill = np.maximum(fill,np.asarray(Image.fromarray(correction).resize((width,height),Image.Resampling.LANCZOS)))
            # Joining the approved facade faces can enclose tiny AA pockets.
            # Full-fill policy applies to these too; never touch the ink channel.
            fill = np.where(enclosed_mask(fill),255,fill).astype('uint8')
        line, fill, normal_bytes, registered_rows = register_solid_bottom(line, fill, normal_map(vectors, (width,height)))
        mask = np.stack([line, fill, np.zeros_like(line)], axis=2)
        city['levels'][tier] = {
            'mask': emit(f'{ident}-{tier}-mask', webp(Image.fromarray(mask)), (width, height), source+correction_svg, 2),
            'normal': emit(f'{ident}-{tier}-normal', normal_bytes, (width, height), source, 4, 'hfn1-gzip')}
        if not np.any(line[-1] > 127) or not np.any(fill[-1] > 127):
            raise ValueError(f'{ident}/{tier}: bottom seam')
        tiers[tier] = dict(size=[width, height], lineBounds=bounds(line), coverageBounds=bounds(fill), bottomGap=0, solidBaselineAdjustment=registered_rows)
    alpha = Image.fromarray(lines)
    choice = Image.new('RGBA', alpha.size, (180, 132, 52, 0))
    choice.putalpha(alpha)
    choice = choice.crop(alpha.getbbox())
    choice.thumbnail((560, 236), Image.Resampling.LANCZOS)
    city['thumbnail'] = emit(f'{ident}-thumbnail', webp(choice), choice.size, source, 4, color_space='srgb')
    report = dict(id=ident, name=entry['name'], sourceSha256=sha(source), sourceChanged=entry['sourceChanged'],
                  sourceBounds=[left, top, right, bottom], sourceBottomGap=1630-bottom,
                  uniformScale=scale, offset=[dx, dy], baseline=H, tiers=tiers)
    print(ident, 'source changed' if entry['sourceChanged'] else 'same source', flush=True)
    return city, report


def main():
    old_root = ROOT / 'public/releases/v7-4'
    catalog = json.loads((old_root / 'catalog.json').read_text())
    manifest = json.loads((old_root / catalog['manifestUrl']).read_text())

    def rebase(value):
        if isinstance(value, dict):
            if 'url' in value and 'sha256' in value:
                import os
                value['url'] = os.path.relpath((old_root / value['url']).resolve(), OUT)
            else:
                for child in value.values():
                    rebase(child)
    rebase(manifest)
    manifest['releaseId'] = 'v7-5'
    reports = []
    for entry in PROVENANCE['cities']:
        manifest['cities'][entry['id']], report = compile_city(entry)
        reports.append(report)
    data = (json.dumps(manifest, ensure_ascii=False, indent=2) + '\n').encode()
    name = f'manifest-{sha(data)[:16]}.json'
    immutable(OUT / name, data)
    catalog.update(releaseId='v7-5', manifestUrl=name,
                   cities={k: {'name': v['name'], 'thumbnail': v['thumbnail']['url']} for k, v in manifest['cities'].items()})
    immutable(OUT / 'catalog.json', (json.dumps(catalog, ensure_ascii=False, indent=2) + '\n').encode())
    EVIDENCE.mkdir(parents=True, exist_ok=True)
    immutable(EVIDENCE / 'derivation.json', (json.dumps(dict(releaseId='v7-5', sourceFrame=[3878, 1630],
              runtimeFrame=[W,H], bottomRegistration='source last ink row to geometry uv1.y=0',
              cities=reports), ensure_ascii=False, indent=2) + '\n').encode())
    # Activate only in this local candidate. Published bootstrap is a separate deployment.
    bootstrap = json.loads((ROOT / 'public/api/v1/bootstrap.json').read_text())
    bootstrap.update(releaseId='v7-5', catalogUrl='releases/v7-5/catalog.json', manifestUrl='releases/v7-5/' + name)
    bootstrap['defaultDesign']['resourceReleaseId'] = 'v7-5'
    (ROOT / 'public/api/v1/bootstrap.json').write_text(json.dumps(bootstrap, ensure_ascii=False, indent=2) + '\n')


if __name__ == '__main__':
    main()
