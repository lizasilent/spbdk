/* eslint-disable no-undef */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: "./index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
    publicPath: "",
  },
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    open: true,
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      inject: "body",
    }),

    new HtmlWebpackPlugin({
      filename: "card.html",
      template: "./card.html",
      inject: "body",
    }),

    new HtmlWebpackPlugin({
      filename: "search-results.html",
      template: "./search-results.html",
      inject: "body",
    }),

    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],

};
