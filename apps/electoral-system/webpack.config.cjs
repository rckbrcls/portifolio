const path = require("path");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.tsx",
    devServer: !isProduction && {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
      static: {
        directory: path.join(__dirname, "dist"),
      },
      port: 3006,
      hot: true,
      historyApiFallback: true,
    },
    output: {
      publicPath: isProduction ? "/" : "http://localhost:3006/",
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    resolve: {
      extensions: ["*", ".ts", ".tsx", ".js", ".jsx"],
      extensionAlias: {
        ".js": [".js", ".ts"],
        ".cjs": [".cjs", ".cts"],
        ".mjs": [".mjs", ".mts"],
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "solid",
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.([cm]?ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        },
        {
          test: /\.(png|jpg|gif|jpeg)$/i,
          type: "asset/resource",
        },
        {
          test: /\.svg$/i,
          type: "asset",
          resourceQuery: /url/,
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: [/url/] },
          use: ["@svgr/webpack", "url-loader", "file-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Electoral System App",
        filename: "index.html",
        templateContent: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Electoral System App</title>
              <link rel="stylesheet" href="main.css">
            </head>
            <body>
              <div id="root"></div>
            </body>
          </html>
        `,
      }),
      new MiniCssExtractPlugin({
        filename: "main.css",
      }),
      new ModuleFederationPlugin({
        name: "electoral_system",
        library: { type: "var", name: "electoral_system" },
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App",
        },
      }),
    ],
  };
};
