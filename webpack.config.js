const webpack = require('webpack');

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
    new webpack.EnvironmentPlugin(['URL', 'NODE_ENV'])
  ],
  module: {
    loaders: [
      { test: /\.jsx$/, loader: "babel" },
      { test: /\.json$/, loader: "json" }
    ]
  }
};
