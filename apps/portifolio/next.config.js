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
            alan_turing: "alan_turing@http://localhost:3002/remoteEntry.js",
            secret_santa: "secret_santa@http://localhost:3003/remoteEntry.js",
            joystick: "joystick@http://localhost:3004/remoteEntry.js",
            video_project_manage:
              "video_project_manage@http://localhost:3005/remoteEntry.js",
            electoral_system:
              "electoral_system@http://localhost:3006/remoteEntry.js",
          },
          filename: "static/chunks/remoteEntry.js",
        })
      );
    }

    return config;
  },
};
