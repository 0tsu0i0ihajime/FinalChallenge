const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  publicPath:"./",
  assetsDir:"",
  outputDir:"docs",
  devServer: {
    host:"localhost"
  }
};
