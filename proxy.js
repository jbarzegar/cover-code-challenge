const proxy = require("http-proxy-middleware")

module.exports = function(app) {
  app.use(
    "/opencagedata",
    proxy({
      target: "https://api.opencagedata.com/geocode/v1/json",
      changeOrigin: true,
    })
  )
}
