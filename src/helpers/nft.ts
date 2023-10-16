import { Nft } from '@/declarations/vibeverse_backend/vibeverse_backend.did';

export const getNftKey = (nft: Nft): string => {
  return `${nft.id[0]}-${nft.id[1]}`;
};
