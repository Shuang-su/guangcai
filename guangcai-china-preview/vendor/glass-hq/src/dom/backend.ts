// Choice is immutable for this document; audit frames isolate maps and stores.
export const materialBackend=typeof location!=='undefined'&&location.pathname.startsWith('/audit/')&&new URLSearchParams(location.search).get('backend')==='webgpu'?'webgpu':'webgl2';
