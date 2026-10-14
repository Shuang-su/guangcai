# Color coverage correction

1. Preserve the current deployed V4 and same-camera close-up screenshots.
2. Remove the exporter’s broad rectangular cream-color override below normalized y=0.85, x=0.48. It affects China green/red/purple/blue gold-line variants; other variants do not use this override.
3. Regenerate aligned pigment maps, thumbnails and flat comparison assets. Preserve all coverage, metalness, roughness, clearcoat, float normals, height masters, lines and lettering exactly.
4. Check output-channel identity and pigment saturation in the formerly whitened interior, capture same-camera before/after in three finishes, retain the original-gold baseline. Run relevant tests/build and browser checks.
5. Commit/push to the existing V4 Draft PR and manually update only the V4 Netlify site. Verify serving hashes and public rendering, preserve V3 and no Git auto-deploy. Save a new immutable archive, reusing unchanged immutable files to fit available storage.
