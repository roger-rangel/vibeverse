import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { UserId, asCommunity } from '@/types';
import { Principal } from '@dfinity/principal';

export function useGetCommunitiesFollowed({
  userId,
}: {
  userId?: string | UserId;
}) {
  const { actor } = useActor();

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['communities-followed'],
    queryFn: async () => {
      const communities = await actor!.get_communities_followed(
        Principal.from(userId),
      );

      return communities.map(asCommunity);
    },
    enabled: !!actor && !!userId,
  });
}
