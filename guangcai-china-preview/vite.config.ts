import { defineConfig } from 'vite';
import { wgslVitePlugin } from '@vgpu/wgsl/loader-vite';
export default defineConfig({ base: '/', plugins:[wgslVitePlugin()], cacheDir: '.codex-work/cache/vite', server: { port: 5210, strictPort: true }, build: { chunkSizeWarningLimit: 650,rolldownOptions:{input:['index.html','dev/index.html','audit/index.html','audit/glass.html']} } });
