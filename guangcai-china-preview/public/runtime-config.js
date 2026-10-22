// Deployment configuration. Public addresses only; never put credentials here.
window.GUANGCAI_CONFIG = window.GUANGCAI_CONFIG || {};
// Example: { bootstrapUrl: '/api/v1/bootstrap', assetBase: 'https://cdn.example.com/cup/', apiBase: '/api/v1/' }

// Keep the separately published lab on its original resource release.
if (document.documentElement.dataset.labPreview === 'true') {
  window.GUANGCAI_CONFIG.bootstrapUrl ??= new URL('api/v1/bootstrap-v7-9.json', document.currentScript.src).href;
}
