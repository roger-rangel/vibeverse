import { useConnect } from '@connect2ic/react';
import { Principal } from '@dfinity/principal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { CommunityId } from '@/types';

export interface CommunityActionProps {
  slug: CommunityId;
}

export function useFollowCommunity() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { activeProvider } = useConnect();
  return useMutation({
    mutationFn: async ({ slug }: CommunityActionProps) => {
      const result = await actor!.follow_community(slug);

      if ('Err' in result) {
        throw new Error(result.Err);
      }
      queryClient.invalidateQueries({
        queryKey: [`isCommunityFollower-${slug}-${activeProvider?.principal}`],
      });

      return result.Ok;
    },
  });
}

export function useUnfollowCommunity() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { activeProvider } = useConnect();
  return useMutation({
    mutationFn: async ({ slug }: CommunityActionProps) => {
      const result = await actor!.unfollow_community(slug);

      if ('Err' in result) {
        throw new Error(result.Err);
      }
      queryClient.invalidateQueries({
        queryKey: [`isCommunityFollower-${slug}-${activeProvider?.principal}`],
      });

      return result.Ok;
    },
  });
}

export function useGetIsCommunityFollower({
  slug,
  principal,
}: CommunityActionProps & {
  principal?: string;
}) {
  const { actor } = useActor();
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [`isCommunityFollower-${slug}-${principal}`],
    queryFn: async () => {
      const result = await actor!.is_community_follower(
        slug,
        Principal.from(principal!),
      );

      return result;
    },
    enabled: !!actor && !!principal,
  });
}
