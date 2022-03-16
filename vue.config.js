// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  transpileDependencies: [/\bvue-awesome\b/],
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Image Palette Generation and Color Analysis - Swatch";
      return args;
    });
  },
};
