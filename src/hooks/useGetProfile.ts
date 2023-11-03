/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Principal } from '@dfinity/principal';
import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { asCreator } from '@/types';

export function useGetProfile({ principal }: { principal?: string }) {
  const { actor } = useActor();

  return useQuery({
    queryKey: [actor, 'profile', principal],
    queryFn: async () => {
      const profile = await actor!.creator_metadata(Principal.from(principal!));

      if (profile.length === 0) {
        return null;
      }

      return asCreator(profile[0]);
    },
    enabled: !!actor && !!principal,
  });
}
