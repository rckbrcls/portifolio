const { withModuleFederation } = require("@module-federation/nextjs-mf");
const deps = require("./package.json").dependencies;

const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  webpack(config, options) {
    // Adiciona a configuração do Module Federation
    withModuleFederation({
      name: "main_app",
      library: { type: "var", name: "main_app" },
      remotes: {
        lojinha_simples: "lojinha_simples@http://localhost:3001/remoteEntry.js",
      },
      shared: {
        ...deps,
      },
    })(config, options);

    // Outras configurações de Webpack, se necessário
    return config;
  },
};

module.exports = nextConfig;
