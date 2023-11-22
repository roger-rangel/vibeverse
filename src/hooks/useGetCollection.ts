import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { BigNumberish, asCollection } from '@/types';

export function useGetCollection({ id }: { id: BigNumberish }) {
  const { actor } = useActor();
  return useQuery({
    queryKey: [actor, 'collection', id],
    queryFn: async () => {
      const collection = await actor!.get_collection(BigInt(id));

      if (collection.length === 0) {
        throw new Error('Not found');
      }

      return asCollection(collection[0]);
    },
    enabled: !!actor,
  });
}
