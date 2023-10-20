import { Principal } from '@dfinity/principal';
import { Collection as RawCollection } from '@/declarations/vibeverse_backend/vibeverse_backend.did';

export interface Collection {
  id: bigint;
  creator: Principal;
  imageUrl?: string;
  transferable: boolean;
  name: string;
  minted: bigint;
  description: string;
  limit?: bigint;
  category: string;
}

export const asCollection = (c: RawCollection): Collection => {
  const { image_url, ...rest } = c;
  return {
    ...rest,
    imageUrl: image_url[0],
    limit: c.limit[0],
  };
};
