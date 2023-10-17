/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useConnect } from '@connect2ic/react';
import { Principal } from '@dfinity/principal';
import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { useMemo } from 'react';

export function useGetPrincipalNfts(props?: { principal?: string }) {
  const { actor } = useActor();
  const { activeProvider } = useConnect();

  const principal = useMemo(() => {
    return props?.principal || activeProvider?.principal || '';
  }, [activeProvider?.principal, props?.principal]);

  return useQuery({
    queryKey: [actor, 'nfts', principal],
    queryFn: () => actor!.nfts_of_user(Principal.from(principal)),
    enabled: !!actor,
  });
}
