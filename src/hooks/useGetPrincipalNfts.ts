import { useMemo } from 'react';
import { useConnect } from '@connect2ic/react';
import { Principal } from '@dfinity/principal';
import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { asNft } from '@/types';

export function useGetPrincipalNfts(props?: { principal?: string }) {
  const { actor } = useActor();
  const { activeProvider } = useConnect();

  const principal = useMemo(() => {
    return props?.principal || activeProvider?.principal || '';
  }, [activeProvider?.principal, props?.principal]);

  return useQuery({
    queryKey: [actor, 'nfts', principal],
    queryFn: async () => {
      const nfts = await actor!.nfts_of_user(Principal.from(principal));
      return nfts.map(asNft);
    },
    enabled: !!actor,
  });
}
