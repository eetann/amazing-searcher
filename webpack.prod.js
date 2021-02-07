const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require("copy-webpack-plugin");
const ZipPlugin = require('zip-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  entry: {
    content: "./src/content-scripts/main.js",
  },
  plugins: [
    new ZipPlugin({
      filename: path.basename(__dirname) + ".zip",
      pathPrefix: path.basename(__dirname)
    }),
    new CopyPlugin([{
      from: 'src/manifest.json',
    },]),
  ]
});
