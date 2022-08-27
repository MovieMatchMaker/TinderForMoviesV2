const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://[::1]:8080/',
      secure: false,
      changeOrigin: true
    })
    );
  };
  
  