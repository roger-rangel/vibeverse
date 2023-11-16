import { useConnect } from '@connect2ic/react';
import { Principal } from '@dfinity/principal';
import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { useMemo } from 'react';
import { asCollection } from '@/types';

export function useGetPrincipalCollections(props?: { principal?: string }) {
  const { actor } = useActor();
  const { activeProvider } = useConnect();

  const principal = useMemo(() => {
    return props?.principal || activeProvider?.principal;
  }, [activeProvider?.principal, props?.principal]);

  return useQuery({
    queryKey: [actor, 'collections', principal],
    queryFn: async () => {
      const collections = await actor!.collections_created_by(
        Principal.from(principal),
      );

      return collections.map(asCollection);
    },
    enabled: !!actor && !!principal,
  });
}
