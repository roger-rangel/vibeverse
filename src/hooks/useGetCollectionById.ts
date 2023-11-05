/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { asCollection } from '@/types';

export function useGetCollectionById({ id }: { id: bigint }) {
  const { actor } = useActor();
  return useQuery({
    queryKey: [actor, 'collections', id],
    queryFn: async () => {
      const collection = await actor!.get_collection(id);

      if (collection.length === 0) {
        return null;
      }

      return asCollection(collection[0]);
    },
    enabled: !!actor,
  });
}
