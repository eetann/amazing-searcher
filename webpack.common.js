const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
// const {manifest} = require('./manifest.js');
const path = require('path');

module.exports = {
  entry: {
    content: "./src/content-scripts/main.js",
    reload: "./src/background/reload.js",
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
  },
  optimization: {
    minimize: false,
    splitChunks: {
      name: 'chunk',
      chunks: 'initial',
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: '/images/',
          emitFile: true,
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    // new WebpackManifestPlugin({
    //   seed: manifest,
    //   generate: (seed, _, entrypoints) => {
    //     let newSeed = JSON.parse(JSON.stringify(seed));
    //     // console.log(entrypoints);
    //     entrypoints.content.filter(fileName => {
    //       if (fileName.match(/chunk.*js$/)) {
    //         newSeed["content_scripts"][0]["js"].unshift(fileName);
    //       }
    //       else if (fileName.match(/content.*js$/)) {
    //         newSeed["content_scripts"][0]["js"].push(fileName);
    //       }
    //       else if (fileName.match(/content.*css$/)) {
    //         newSeed["content_scripts"][0]["css"].push(fileName);
    //       }
    //     });
    //     return newSeed;
    //   }
    // }),
    new CopyPlugin(
      [
        {from: 'src/manifest.json'},
      ]),
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
  ]
}
