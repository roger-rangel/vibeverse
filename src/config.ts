import { canisterId, createActor } from '@/declarations/vibeverse_backend';
import {
  canisterId as tokenCanisterId,
  createActor as tokenCreateActor,
} from '@/declarations/vibeverse_token';

type NETWORK_TYPE = 'local' | 'ic';

export const DFX_NETWORK = (process.env.DFX_NETWORK || 'local') as NETWORK_TYPE;

export const II_CANISTER_ID = process.env.CANISTER_ID_INTERNET_IDENTITY;

export const host =
  DFX_NETWORK === 'local' ? 'http://localhost:4943' : 'https://ic0.app';

export const anonymousActor = createActor(canisterId, {
  agentOptions: {
    host,
  },
});

export const tokenActor = tokenCreateActor(tokenCanisterId, {
  agentOptions: {
    host,
  },
});
