import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import {
  AssetType,
  PaginationParams,
  asDetailedNft,
  asRawAssetType,
} from '@/types';

// TODO Remove this hook once we have collection view
export function useGetNfts({
  assetType,
  page,
  limit,
}: PaginationParams & { assetType?: AssetType }) {
  const { actor } = useActor();

  return useQuery({
    queryKey: [actor, 'all-nfts', assetType, page, limit],
    queryFn: async () => {
      const nfts = await actor!.all_nfts(
        assetType !== undefined ? [asRawAssetType(assetType)] : [],
        [BigInt(page)],
        [BigInt(limit)],
      );

      return nfts.map(asDetailedNft);
    },
    enabled: !!actor,
  });
}
