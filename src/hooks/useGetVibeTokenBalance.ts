import { useQuery } from '@tanstack/react-query';

import { tokenActor } from '@/config';
import { Principal } from '@dfinity/principal';

export function useGetVibeTokenBalance({ principal }: { principal?: string }) {
  return useQuery({
    queryKey: ['vibe-balance', principal],
    queryFn: async () => {
      const balance = await tokenActor!.icrc1_balance_of({
        owner: Principal.from(principal),
        subaccount: [],
      });

      return balance;
    },
    enabled: !!principal,
  });
}
