const {
  createProxyMiddleware
} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://[::1]:3001/',
      secure: false,
      changeOrigin: true
    })
  );
};