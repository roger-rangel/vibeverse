import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { BigNumberish, PaginationParams, asNft } from '@/types';

export function useGetCollectionNfts({
  collectionId,
  page,
  limit,
}: {
  collectionId: BigNumberish;
} & PaginationParams) {
  const { actor } = useActor();
  return useQuery({
    queryKey: [actor, 'nfts', collectionId, page, limit],
    queryFn: async () => {
      const nfts = await actor!.nfts(
        BigInt(collectionId),
        [BigInt(page)],
        [BigInt(limit)],
      );

      return nfts.map(asNft);
    },
    enabled: !!actor,
  });
}
