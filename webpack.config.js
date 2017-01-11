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
    new webpack.EnvironmentPlugin(['URL', 'NODE_ENV'])
  ],
  externals: [
    {
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel" },
      { test: /\.jsx$/, loader: "babel" },
      { test: /\.json$/, loader: "json" }
    ]
  }
};
