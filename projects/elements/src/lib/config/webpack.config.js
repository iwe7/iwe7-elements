const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const entrys = require("./entrys/index.js");
module.exports = {
  entry: {
    app: "./.tmp/src/app/element.app.js",
    ...entrys,
    angular: [
      "@angular/core",
      "@angular/platform-browser",
      "@angular/common",
      "@angular/common/http",
      "@angular/router",
      "@angular/elements",
      "@angular/forms",
      "iwe7-elements",
      "rxjs"
    ],
    polyfills: ["./.tmp/src/polyfills.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        commons: {
          name: "angular",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  plugins: [],
  devServer: {
    contentBase: "./dist",
    hot: false,
    port: 3000
  }
};
