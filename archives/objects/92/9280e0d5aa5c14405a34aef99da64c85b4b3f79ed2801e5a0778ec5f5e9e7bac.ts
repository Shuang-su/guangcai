import { defineConfig } from 'vite';
export default defineConfig({ base: './', cacheDir: '.codex-work/cache/vite', server: { port: 5210, strictPort: true }, build: { chunkSizeWarningLimit: 650 } });
