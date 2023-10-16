type NETWORK_TYPE = 'local' | 'ic';

export const DFX_NETWORK = (process.env.DFX_NETWORK || 'local') as NETWORK_TYPE;
