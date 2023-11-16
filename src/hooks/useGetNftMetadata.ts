import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { asNftMetadata } from '@/types';

export function useGetNftMetadata({
  collectionId,
  nftId,
}: {
  collectionId: bigint;
  nftId: bigint;
}) {
  const { actor } = useActor();

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [`nft-metadata-${collectionId}-${nftId}`],
    queryFn: async () => {
      const metadata = await actor!.get_nft_metadata(collectionId, nftId);

      if (metadata.length === 0) {
        return null;
      }

      return asNftMetadata(metadata[0]);
    },
    enabled: !!actor,
  });
}
