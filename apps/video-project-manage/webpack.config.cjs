const path = require("path");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
        directory: path.join(__dirname, "public"),
        watch: true,
      },
      port: 3005,
      hot: true,
      historyApiFallback: {
        disableDotRule: true,
        index: "/",
      },
      allowedHosts: "all",
      server: {
        type: "http",
        options: {
          key: path.resolve(__dirname, "certs/server.key"),
          cert: path.resolve(__dirname, "certs/server.crt"),
        },
      },
      client: {
        overlay: {
          errors: true, // Exibir overlay de erros no navegador
          warnings: false, // Ignorar avisos
        },
      },
    },
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
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
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "video_project_manage",
        library: { type: "var", name: "video_project_manage" },
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App",
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"), // Usar o index.html da pasta "public"
      }),
    ],
  };
};
