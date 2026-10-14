# V4 source-aligned artwork

Eight reference images and hashes: `../../source/v4/`.
Creative outputs and full prompts: `generation.json`, `*-ornaments.png`, `shenzhen-lines-generated.png`.
China architecture: existing original `assets/source/china-lines.psd` and its previously verified `public/china/lines.png` / `metalness.png` masks. Architecture was not redrawn by imagegen.
Shenzhen: one generated structural master for both colors; original generated alpha retains opaque building interiors and transparent background.

`tools/compile-city-v4.py` compiles every new artwork to 4096 × 1783 with V3 placement baked into every channel. It reserves the label area and fixed floral boundaries. Pigment fills use controlled reference palettes and broad unlit washes, with imagegen ornaments as separate layers. This is a reconstruction, not exact reproduction of the provided illustrations.

High-precision flow: source alpha → floating Gaussian smoothing → floating placement → float gradients → RGBA16F normal. The saved 16-bit heights contain over 64,000 distinct values (see `precision.json`), not merely an 8-bit field in a 16-bit container. Height is a visual approximation, not a manufacturing dimension.

Run the compiler with Python + Pillow + NumPy, then `node tools/city-manifest.mjs`. The latter hashes output paths and shares identical channels. Label font sources are recorded in provenance. China uses original PSD alpha; Shenzhen uses checked Unicode text in Songti and Arial, with a separately authored border. Text and frame share an independent mask and disappear together.

Generated outputs are natively 1900 × 828; runtime alignment does not create missing source detail. Source PSD remains at original resolution. All original masters remain unchanged. No Photoshop or external AI API key was used.
