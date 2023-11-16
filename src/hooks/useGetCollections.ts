import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { BigNumberish, PaginationParams, asCollection } from '@/types';

export function useGetCollections({
  collectionId,
  page,
  limit,
}: {
  collectionId: BigNumberish;
} & PaginationParams) {
  const { actor } = useActor();
  return useQuery({
    queryKey: [actor, 'collections', collectionId, page, limit],
    queryFn: async () => {
      const collections = await actor!.collections(
        [BigInt(page)],
        [BigInt(limit)],
      );

      return collections.map(asCollection);
    },
    enabled: !!actor,
  });
}
