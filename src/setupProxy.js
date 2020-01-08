const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://service.inswindows.com/',
      changeOrigin: true,
      pathRewrite: {
        // '^/api': ''
      }
    })
  )
}