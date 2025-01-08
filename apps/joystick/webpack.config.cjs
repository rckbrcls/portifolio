const path = require("path");
const webpack = require("webpack");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.js",
    mode: isProduction ? "production" : "development",
    devServer: {
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
      port: 3004,
      hot: true,
      historyApiFallback: true,
    },
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "[name].[contenthash].js" : "bundle.js",
    },
    resolve: {
      extensions: [".js", ".jsx"],
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
          use: [MiniCssExtractPlugin.loader, "style-loader", "css-loader"],
        },
        {
          test: /\.(png|gif|svg|jpe?g|webp)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
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
          use: ["@svgr/webpack"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "JoyStick",
        filename: "index.html",
        templateContent: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>JoyStick</title>
            </head>
            <body>
              <div id="root"></div>
            </body>
          </html>
        `,
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
      new ModuleFederationPlugin({
        name: "joystick",
        library: { type: "var", name: "joystick" },
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App",
        },
      }),
    ],
  };
};
