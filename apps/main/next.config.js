const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "host",
          remotes: {
            lojinha_simples: `lojinha_simples@${process.env.LOJINHA_SIMPLES_URL}/remoteEntry.js`,
            alan_turing: `alan_turing@${process.env.ALAN_TURING_URL}/remoteEntry.js`,
            secret_santa: `secret_santa@${process.env.SECRET_SANTA_URL}/remoteEntry.js`,
            joystick: `joystick@${process.env.JOYSTICK_URL}/remoteEntry.js`,
            video_project_manage: `video_project_manage@${process.env.VIDEO_PROJECT_MANAGE_URL}/remoteEntry.js`,
            electoral_system: `electoral_system@${process.env.ELECTORAL_SYSTEM_URL}/remoteEntry.js`,
          },
          filename: "static/chunks/remoteEntry.js",
        })
      );
    }

    return config;
  },
  experimental: {
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  swcMinify: true,
  images: {
    unoptimized: false,
    formats: ["image/webp", "image/avif"],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
