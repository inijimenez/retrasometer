const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/v1",
    createProxyMiddleware({
      target: "https://data.renfe.com/api/3/action/datastore_search",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/v2",
    createProxyMiddleware({
      target: "https://horarios.renfe.com/cer/HorariosServlet",
      changeOrigin: true,
    })
  );
};
