import { useConnect } from '@connect2ic/react';
import { HttpAgent } from '@dfinity/agent';
import { AssetManager } from '@dfinity/assets';

import { DFX_NETWORK } from '@/config';
import { canisterId } from '@/declarations/vibeverse_assets';

// TODO: Check file upload logic works well
export function useAssetManager() {
  const { activeProvider } = useConnect();

  const agent = new HttpAgent({
    host: DFX_NETWORK === 'local' ? 'http://localhost:4943' : 'https://ic0.app',
  });

  const assetManager = new AssetManager({
    canisterId,
    agent,
    // provider: activeProvider,
  });

  return assetManager;
}
