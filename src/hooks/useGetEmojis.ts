/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';

export function useGetEmojis() {
  const { actor } = useActor();

  return useQuery({
    queryKey: [actor, 'emojis'],
    queryFn: async () => {
      const emojis = await actor!.get_emojis();

      return emojis;
    },
    enabled: !!actor,
  });
}
