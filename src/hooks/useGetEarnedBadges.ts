import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { UserId, asBadge } from '@/types';
import { Principal } from '@dfinity/principal';

export function useGetEarnedBadges({
  userId,
  enabled = true,
}: {
  userId?: string | UserId;
  enabled?: boolean;
}) {
  const { actor } = useActor();
  return useQuery({
    queryKey: [actor, 'earned-badges', userId],
    queryFn: async () => {
      const badges = await actor!.get_earned_badges(Principal.from(userId));

      if ('Err' in badges) {
        throw new Error(badges.Err);
      }

      return badges.Ok.map(asBadge);
    },
    enabled: !!actor && enabled && !!userId,
  });
}
