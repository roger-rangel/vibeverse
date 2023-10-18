import { Nft as RawNft } from '@/declarations/vibeverse_backend/vibeverse_backend.did';

export interface Nft {
  collectionId: bigint;
  id: bigint;
  name: string;
  description: string;
  assetUrl?: string;
}

export const asNft = (nft: RawNft): Nft => {
  return {
    collectionId: nft.id[0],
    id: nft.id[1],
    name: nft.name,
    description: nft.description,
    assetUrl: nft.asset_url[0],
  };
};
