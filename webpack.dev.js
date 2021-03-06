const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require("copy-webpack-plugin");
const ExtensionReloader = require('./extension-reloader');

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
  entry: {
    content: "./src/content-scripts/main.js",
    reload: "./src/background/reload.js",
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'src/manifest.json',
        transform: (content) => {
          return JSON.stringify(
            Object.assign({}, JSON.parse(content.toString()), {
              "permissions": ["tabs", "alarms"],
              "background": {"service_worker": "reload.js"},
              "content_security_policy": {
                "extension_pages": "script-src 'self'; object-src 'self'"
              },
            }), null, ' ');
        },
      },
      {
        context: 'public',
        from: '**/*',
      }
    ]),
    new ExtensionReloader(),
  ]
});
