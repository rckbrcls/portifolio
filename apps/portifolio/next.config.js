const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "host",
          remotes: {
            lojinha_simples:
              "lojinha_simples@http://localhost:3001/remoteEntry.js",
          },
          filename: "static/chunks/remoteEntry.js",
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
    }

    return config;
  },
};
