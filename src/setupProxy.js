const proxy = require("http-proxy-middleware")

module.exports = function(app) {
  app.use(
    "/opencagedata",
    proxy({
      target: "https://api.opencagedata.com/geocode/v1/json",
      changeOrigin: true,
    })
  )

  app.use(
    "/marketcheck",
    proxy({
      target: "https://marketcheck-prod.apigee.net/v1",
      changeOrigin: true,
    })
  )
}
