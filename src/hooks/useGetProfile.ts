/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useConnect } from '@connect2ic/react';
import { Principal } from '@dfinity/principal';
import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { asCreator } from '@/types';

export function useGetProfile() {
  const { actor } = useActor();
  const { activeProvider } = useConnect();
  return useQuery({
    queryKey: [actor, 'profile', activeProvider],
    queryFn: async () => {
      const profile = await actor!.creator_metadata(
        Principal.from(activeProvider!.principal!),
      );

      if (profile.length === 0) {
        return undefined;
      }

      return asCreator(profile[0]);
    },
    enabled: !!actor && !!activeProvider?.principal,
  });
}
