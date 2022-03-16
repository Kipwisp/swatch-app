// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  transpileDependencies: [/\bvue-awesome\b/],
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Color Analysis and Palette Generation - Swatch";
      return args;
    });
  },
};
