const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/testapi', {
      target: 'https://m.toutiao.com',
      changeOrigin: true,
      pathRewrite:{
        '^/testapi':'/'
      }
    })
  )
}