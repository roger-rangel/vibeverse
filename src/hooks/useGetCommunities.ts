import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { asCommunity } from '@/types';

export function useGetCommunities() {
  const { actor } = useActor();

  return useQuery({
    queryKey: [actor, 'communities'],
    queryFn: async () => {
      const communities = await actor!.get_communities([], []);

      return communities.map(asCommunity);
    },
    enabled: !!actor,
  });
}
