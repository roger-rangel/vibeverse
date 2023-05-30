/* eslint-disable @typescript-eslint/no-var-requires */
const DFXWebPackConfig = require('./webpack.config');
DFXWebPackConfig.initCanisterIds();

const webpack = require('webpack');

// Make DFX_NETWORK available to Web Browser with default "local" if DFX_NETWORK is undefined
const EnvPlugin = new webpack.EnvironmentPlugin({
  DFX_NETWORK: 'local',
});

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Plugin
    config.plugins.push(EnvPlugin);

    // Important: return the modified config
    return config;
  },
  output: 'export',
};
