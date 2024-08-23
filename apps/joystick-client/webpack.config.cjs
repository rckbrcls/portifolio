const path = require("path");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    static: {
      directory: path.join(__dirname, "public"), // Servir arquivos estáticos da pasta "public"
      watch: true, // Assistir mudanças nos arquivos estáticos
    },
    port: 3004,
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
      index: "/",
    },
    allowedHosts: "all",
    server: {
      type: "http", // Pode usar "https" se necessário, e configurar com certificados
      options: {
        key: path.resolve(__dirname, "certs/server.key"),
        cert: path.resolve(__dirname, "certs/server.crt"),
        // Isso se aplica somente se você estiver usando HTTPS e tiver os certificados
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
      name: "joystick",
      library: { type: "var", name: "joystick" },
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
