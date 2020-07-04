
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  devServer: {
    /* 跨域代理 */
    proxy: {
      "/api": {
        /* 目标代理服务器地址 */
        target: "http://m260048y71.zicp.vip", //
        // target: "http://192.168.1.102:8888", //
        /* 允许跨域 */
        changeOrigin: true,
        ws: true
      }
    }
  }
}
