export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Try to serve the static asset
    const asset = await env.ASSETS.fetch(request);
    
    // If asset exists (like JS, CSS, images), return it
    if (asset.status !== 404) {
      return asset;
    }
    
    // For all other routes (SPA routing), serve index.html
    const indexUrl = new URL(url);
    indexUrl.pathname = '/index.html';
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};
