const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  // Generate sourcemaps for proper error messages
  devtool: "source-map",
  // Since "aws-sdk" is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  plugins: [
    new Dotenv()
  ],
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  resolve: {
    extensions: [ ".ts", ".js", ".json", ".graphql"]
  },
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts(x?)$/,
        loader: "ts-loader"
      },
      {
        exclude: /node_modules/,
        test: /\.graphql$/,
        loader: "graphql-import-loader"
      }
    ]
  }
};
