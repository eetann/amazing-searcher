const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require("copy-webpack-plugin");
const ExtensionReloader = require('./extension-reloader');
common.entry['reload'] = "./src/background/reload.js";

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    publicPath: false
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'src/manifest.json',
        transform: (content) => {
          return JSON.stringify(
            Object.assign({}, JSON.parse(content.toString()), {
              "background": {"service_worker": "reload.js"},
            }), null, ' ');
        },
      },
      {
        context: 'public',
        from: 'imgs/*',
      }
    ]),
    new ExtensionReloader(),
  ]
});
