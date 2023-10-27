type NETWORK_TYPE = 'local' | 'ic';

export const DFX_NETWORK = (process.env.DFX_NETWORK || 'local') as NETWORK_TYPE;

export const II_CANISTER_ID = process.env.CANISTER_ID_INTERNET_IDENTITY;
