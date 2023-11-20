import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { CommunityId } from '@/types';
import { Principal } from '@dfinity/principal';
import { useConnect } from '@connect2ic/react';
import { toast } from 'react-toastify';

export interface CommunityActionProps {
  slug: CommunityId;
}

export function useJoinCommunity() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { activeProvider } = useConnect();
  return useMutation({
    mutationFn: async ({ slug }: CommunityActionProps) => {
      const result = await actor!.join_community(slug);

      if ('Err' in result) {
        throw new Error(result.Err);
      }
      console.log(result, activeProvider?.principal);
      queryClient.setQueryData(
        [`isCommunityMember-${slug}-${activeProvider?.principal}`],
        () => true,
      );
      toast.success('Joined community!');

      return result.Ok;
    },
  });
}

export function useLeaveCommunity() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { activeProvider } = useConnect();
  return useMutation({
    mutationFn: async ({ slug }: CommunityActionProps) => {
      const result = await actor!.leave_community(slug);

      if ('Err' in result) {
        throw new Error(result.Err);
      }

      queryClient.setQueryData(
        [`isCommunityMember-${slug}-${activeProvider?.principal}`],
        () => false,
      );
      return result.Ok;
    },
  });
}

export function useGetIsCommunityMember({
  slug,
  principal,
}: CommunityActionProps & {
  principal?: string;
}) {
  const { actor } = useActor();
  return useQuery({
    queryKey: [actor, `isCommunityMember-${slug}-${principal}`],
    queryFn: async () => {
      const result = await actor!.is_community_member(
        slug,
        Principal.from(principal!),
      );

      return result;
    },
    enabled: !!actor && !!principal,
  });
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
    queryKey: [actor, `isCommunityFollower-${slug}-${principal}`],
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
