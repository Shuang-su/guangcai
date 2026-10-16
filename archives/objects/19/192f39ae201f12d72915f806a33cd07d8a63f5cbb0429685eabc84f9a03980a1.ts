import { defineConfig } from 'vite';
export default defineConfig({ base: './', cacheDir: '.codex-work/cache/vite', server: { port: 5187, strictPort: true }, build: { chunkSizeWarningLimit: 650, rollupOptions: {input: {main:'index.html',compare:'compare.html'}} } });
