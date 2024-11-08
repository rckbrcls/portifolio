const path = require("path");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/main.tsx",
    output: {
      publicPath: isProduction ? "/" : "http://localhost:3001/",
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.tsx?$/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "lojinha_simples",
        library: { type: "var", name: "lojinha_simples" },
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App",
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: "^18.2.0",
          },
          "react-dom": {
            singleton: true,
            requiredVersion: "^18.2.0",
          },
        },
      }),
    ],
    ...(isProduction
      ? {}
      : {
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
            port: 3001,
            hot: true,
            historyApiFallback: true,
          },
        }),
  };
};
