/// <reference types="@webgpu/types" />
declare module '*.wgsl' { const source: import('vgpu').ShaderSource; export default source; }
declare module '*?worker&inline' { const worker: {new(): Worker}; export default worker; }
