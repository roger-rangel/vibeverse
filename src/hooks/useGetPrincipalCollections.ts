/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useConnect } from '@connect2ic/react';
import { Principal } from '@dfinity/principal';
import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { useMemo } from 'react';

export function useGetPrincipalCollections(props?: { principal?: string }) {
  const { actor } = useActor();
  const { activeProvider } = useConnect();

  const principal = useMemo(() => {
    return props?.principal || activeProvider?.principal || '';
  }, [activeProvider?.principal, props?.principal]);

  return useQuery({
    queryKey: [actor, 'collections', principal],
    queryFn: () => actor!.collections_created_by(Principal.from(principal)),
    enabled: !!actor,
  });
}
