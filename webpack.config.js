const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");

module.exports = {
  entry: ["./src/index.js", "./src/main.css"],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: ["file-loader"],
      }
    ]
  },
  resolve: { 
    extensions: ["*", ".js", ".jsx"],
    alias: { "react-dom": "@hot-loader/react-dom" }
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'GitHub React Issue Search :: By Steven Brand',
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new HtmlWebpackTagsPlugin(
      { 
        tags: [], 
        links: [
          {
            path: "src/main.css",
            publicPath: true,
            attributes: {
              rel: "text/css"
            }
          }
        ],
        append: true 
      }
    )
  ]
};