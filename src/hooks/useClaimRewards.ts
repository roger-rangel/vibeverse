import { useMutation } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClaimRewardsProps {}

export function useClaimRewards() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({}: ClaimRewardsProps) => {
      const result = await actor!.claim_rewards();

      if ('Err' in result) {
        throw new Error(result.Err);
      }

      return result.Ok;
    },
  });
}
