const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
require("dotenv").config();

const getAbsolutePath = pathDir => path.resolve(__dirname, pathDir);
const CAT_API_KEY = process.env.CAT_API_KEY ?? "";

const PRODUCTION = "production";
const PORT = 8080;

module.exports = (_, { mode }) => {
  const config = {
    name: "cat-photo-gallery",
    mode,
    // https://webpack.js.org/configuration/devtool/
    devtool: mode === PRODUCTION ? "source-map" : "eval-source-map",

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      alias: {
        src: getAbsolutePath("src"),
        api: getAbsolutePath("src/api"),
        assets: getAbsolutePath("src/assets"),
        components: getAbsolutePath("src/components"),
        modules: getAbsolutePath("src/modules"),
        style: getAbsolutePath("src/assets/style"),
        image: getAbsolutePath("src/assets/image"),
      },
    },

    entry: "./src/index.tsx",

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: [
              "@babel/preset-react",
              "@babel/preset-typescript",
              [
                "@babel/preset-env",
                {
                  modules: "auto",
                  targets: {
                    browsers: ["last 2 versions", ">= 5% in KR"],
                  },
                },
              ],
            ],
            plugins:
              mode === PRODUCTION
                ? ["@babel/plugin-transform-runtime"]
                : ["@babel/plugin-transform-runtime", "react-refresh/babel"],
          },
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                fallback: "file-loader",
                name: "images/[name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.png",
        title: "고양이 사진 갤러리",
      }),
    ],

    output: {
      path: getAbsolutePath("build"),
      filename: "[name].[chunkhash].js",
      publicPath: "/",
      clean: true,
    },

    devServer: {
      port: PORT,
      open: true,
      compress: true,
      historyApiFallback: true,
      devMiddleware: {
        publicPath: "/",
      },
      proxy: {
        "/api": "http://localhost:5000",
      },
    },
  };

  // 배포 환경
  if (mode === PRODUCTION && config.plugins) {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.CAT_API_KEY": JSON.stringify(CAT_API_KEY),
        "process.env.REDUX_DEV_TOOL": JSON.stringify(false),
      }),
    );
  }

  // 개발환경
  if (mode !== PRODUCTION && config.plugins) {
    config.plugins.push(new ReactRefreshWebpackPlugin());
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.CAT_API_KEY": JSON.stringify(CAT_API_KEY),
        "process.env.REDUX_DEV_TOOL": JSON.stringify(true),
      }),
    );
  }

  return config;
};
