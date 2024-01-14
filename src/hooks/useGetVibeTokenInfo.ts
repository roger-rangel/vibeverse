import { useQuery } from '@tanstack/react-query';

import { tokenActor } from '@/config';

export function useGetVibeTokenInfo() {
  return useQuery({
    queryKey: ['vibe'],
    queryFn: async () => {
      const name = await tokenActor!.icrc1_name();
      const symbol = await tokenActor!.icrc1_symbol();
      const decimals = await tokenActor!.icrc1_decimals();
      const totalSupply = await tokenActor!.icrc1_total_supply();

      return { name, symbol, decimals, totalSupply };
    },
  });
}
