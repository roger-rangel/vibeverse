import { useQuery } from '@tanstack/react-query';
import { Principal } from '@dfinity/principal';

import { useActor } from '@/providers/ActorProvider';
import { asCollection } from '@/types';

export function useGetCollectionsCreatedByPrincipal({
  principal,
}: {
  principal?: unknown;
}) {
  const { actor } = useActor();
  return useQuery({
    queryKey: [actor, 'collections', principal],
    queryFn: async () => {
      const collections = await actor!.collections_created_by(
        Principal.from(principal!),
      );

      return collections.map(asCollection);
    },
    enabled: !!actor && !!principal,
  });
}
