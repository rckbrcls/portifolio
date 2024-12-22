const path = require("path");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.tsx",
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
      port: 3006,
      hot: true,
      historyApiFallback: true,
    },
    output: {
      publicPath: "http://localhost:3006/",
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ["*", ".ts", ".tsx", ".js", ".jsx"],
      // Add support for TypeScripts fully qualified ESM imports.
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
          use: ["style-loader", "css-loader"],
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
          resourceQuery: /url/, // *.svg?url
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
          use: ["@svgr/webpack", "url-loader", "file-loader"],
        },
      ],
    },
    plugins: [
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
