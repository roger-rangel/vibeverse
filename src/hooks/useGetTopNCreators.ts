import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { asCreator } from '@/types';

export function useGetTopNCreators({ n = 5 }: { n?: number }) {
  const { actor } = useActor();

  return useQuery({
    queryKey: [actor, `top-${n}`],
    queryFn: async () => {
      const creators = await actor!.top_n_creators(n);
      console.log(creators);
      return creators.map(([userId, c, b]) => ({
        userId,
        creator: asCreator(c, b),
      }));
    },
    enabled: !!actor,
  });
}
