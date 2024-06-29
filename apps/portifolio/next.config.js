const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  webpack: (config, { isServer }) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };

    if (!isServer) {
      config.output.publicPath = "http://localhost:3000/_next/";
    }

    config.plugins.push(
      new ModuleFederationPlugin({
        name: "shell",
        remotes: {
          lojinha_simples:
            "lojinha_simples@http://localhost:3001/remoteEntry.js",
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
      })
    );

    return config;
  },
};
