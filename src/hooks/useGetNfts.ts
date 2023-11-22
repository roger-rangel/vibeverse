import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { PaginationParams, asDetailedNft } from '@/types';

// TODO Remove this hook once we have collection view
export function useGetNfts({ page, limit }: PaginationParams) {
  const { actor } = useActor();
  return useQuery({
    queryKey: [actor, 'all-nfts', page, limit],
    queryFn: async () => {
      const nfts = await actor!.all_nfts([BigInt(page)], [BigInt(limit)]);

      return nfts.map(asDetailedNft);
    },
    enabled: !!actor,
  });
}
