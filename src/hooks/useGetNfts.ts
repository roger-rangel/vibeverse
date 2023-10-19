/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { PaginationParams, asDetailedNft } from '@/types';

// TODO Remove this hook once we have collection view
export function useGetNfts({ page, limit }: PaginationParams) {
  const { actor } = useActor();
  return useQuery({
    queryKey: [actor, 'all-nfts', page, limit],
    queryFn: async () => {
      const nfts0 = await actor!.nfts(
        BigInt(0),
        [BigInt(page)],
        [BigInt(limit)],
      );

      const nfts1 = await actor!.nfts(
        BigInt(1),
        [BigInt(page)],
        [BigInt(limit)],
      );

      // const nfts2 = await actor!.nfts(
      //   BigInt(2),
      //   [BigInt(page)],
      //   [BigInt(limit)],
      // );

      // const nfts3 = await actor!.nfts(
      //   BigInt(3),
      //   [BigInt(page)],
      //   [BigInt(limit)],
      // );

      // const nfts4 = await actor!.nfts(
      //   BigInt(4),
      //   [BigInt(page)],
      //   [BigInt(limit)],
      // );
      return nfts0.concat(nfts1).map(asDetailedNft);
    },
    enabled: !!actor,
  });
}
