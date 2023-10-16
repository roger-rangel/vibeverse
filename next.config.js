/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');

function initCanister() {
  let localCanisters, prodCanisters;

  try {
    localCanisters = require(path.resolve(
      '.dfx',
      'local',
      'canister_ids.json',
    ));
  } catch (error) {
    console.log('No local canister_ids.json found. Continuing production');
  }
  try {
    prodCanisters = require(path.resolve('canister_ids.json'));
  } catch (error) {
    console.log('No production canister_ids.json found. Continuing with local');
  }

  const network =
    process.env.DFX_NETWORK ||
    (process.env.NODE_ENV === 'production' ? 'ic' : 'local');

  console.info(`Using DFX NETWORK: ${network}`);

  const canisters = network === 'local' ? localCanisters : prodCanisters;

  const env = {
    DFX_NETWORK: network,
  };

  // Note: canister environment variable will be standardized as process.env.CANISTER_ID_<CANISTER_NAME_UPPERCASE>
  for (const canister in canisters) {
    env[`CANISTER_ID_${canister.toUpperCase()}`] = canisters[canister][network];
  }

  const envPlugin = new webpack.EnvironmentPlugin({
    ...env,
  });

  return envPlugin;
}

// Make DFX_NETWORK available to Web Browser with default "local" if DFX_NETWORK is undefined

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  webpack: (config) => {
    const plugin = initCanister();
    // Plugin
    config.plugins.push(plugin);

    // Important: return the modified config
    return config;
  },
  output: 'export',
  images: { unoptimized: true },
};
