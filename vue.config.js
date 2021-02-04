const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const path = require('path');

module.exports = {
  productionSourceMap: false,
  pages: {
    content: {
      entry: "src/content-scripts/main.js",
    }
  },
  css: {extract: true},
  configureWebpack: {
    optimization: {
      minimize: false
    },
    plugins: [
      new WebpackManifestPlugin({
        seed: {
          "manifest_version": 2,
          "name": "AmazingSearcher",
          "version": "0.1.0",
          "description": "Add useful infomation at result of Google Search",
          "icons": {},
          "author": "eetann",
          "content_scripts": [
            {
              "matches": ["https://www.google.com/search?*"],
              "css": [
              ],
              "js": [
                "chuck-vendors.js", "main.js"
              ]
            }
          ],
        },
        generate: (seed, _, entrypoints) => {
          let newSeed = seed;
          entrypoints.content.filter(fileName => {
            if (fileName.match(/chunk.*js$/)) {
              newSeed["content_scripts"][0]["js"][0] = fileName;
            }
            else if (fileName.match(/content.*js$/)) {
              newSeed["content_scripts"][0]["js"][1] = fileName;
            }
            else if (fileName.match(/content.*css$/)) {
              newSeed["content_scripts"][0]["css"][0] = fileName;
            }
          }
          );
          return newSeed;
        },
      }),
      new CleanWebpackPlugin(),
    ]
  },
  filenameHashing: false,
  chainWebpack: config => {
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  }
}
