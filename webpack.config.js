const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: "./index.jsx",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.EnvironmentPlugin(['URL']),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.jsx$/, loader: "babel" },
      { test: /\.json$/, loader: "json" }
    ]
  }
};
