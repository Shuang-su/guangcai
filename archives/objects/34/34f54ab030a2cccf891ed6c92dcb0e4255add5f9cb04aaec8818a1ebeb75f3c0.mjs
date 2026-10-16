import sharp from 'sharp';import {stat} from 'node:fs/promises';
for(const name of ['body','handle','saucer'])for(const quality of [90,94,97]){const path=`.codex-work/tmp/load-pan-floral/${name}-q${quality}.webp`;await sharp(`public/fixed/${name}-baseColor.png`).webp({quality,effort:6,smartSubsample:true}).toFile(path);console.log(name,quality,(await stat(path)).size);}
