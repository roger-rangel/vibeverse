import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { asCommunity, Community } from '@/types';

export function useGetCommunity({ slug }: { slug: Community['slug'] }) {
  const { actor } = useActor();

  return useQuery({
    queryKey: [actor, 'community', slug],
    queryFn: async () => {
      const communities = await actor!.get_community(slug);

      if (communities.length === 0) {
        return null;
      }

      return asCommunity(communities[0]);
    },
    enabled: !!actor,
  });
}
