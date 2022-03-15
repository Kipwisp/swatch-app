// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  transpileDependencies: [/\bvue-awesome\b/],
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Swatch!";
      return args;
    });
  },
  devServer: {
    port: 8080,
    host: "0.0.0.0",
    disableHostCheck: true,
  },
};
