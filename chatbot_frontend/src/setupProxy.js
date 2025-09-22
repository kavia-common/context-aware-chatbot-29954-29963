const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * This file is loaded by CRA's dev server at startup.
 * We use it to:
 * - Proxy API routes to the backend (default: http://localhost:8000)
 * - Emit a console message confirming the dev server picked up runtime config
 *
 * Note: Host header validation is controlled by CRA/webpack-dev-server.
 * Using HOST=0.0.0.0 and DANGEROUSLY_DISABLE_HOST_CHECK=true in .env (or via start script)
 * is the primary way to allow preview hosts without ejecting.
 */
module.exports = function(app) {
  const target = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

  // Visible console message to verify this file was loaded by the dev server
  // and that environment variables are being read.
  // You should see this in the terminal where npm start runs.
  // If you do not see it, the dev server process may not be starting from this folder,
  // or .env and runtime files are not being picked up by the preview runner.
  // eslint-disable-next-line no-console
  console.log('[setupProxy] Loaded. Proxying /api ->', target);
  // eslint-disable-next-line no-console
  console.log('[setupProxy] HOST=%s, PORT=%s, DANGEROUSLY_DISABLE_HOST_CHECK=%s',
    process.env.HOST, process.env.PORT, process.env.DANGEROUSLY_DISABLE_HOST_CHECK);

  app.use(
    '/api',
    createProxyMiddleware({
      target,
      changeOrigin: true,
      // In some previews, forwarded proto/host differ; this helps avoid 400 from backend
      xfwd: true,
      ws: true,
      logLevel: 'warn',
    })
  );
};
