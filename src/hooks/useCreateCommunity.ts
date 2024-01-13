import { useMutation } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { CommunityId } from '@/types';

export interface CreateCommunityProps {
  slug: CommunityId;
  name: string;
  description: string;
  logo: string;
}

export function useCreateCommunity() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      slug,
      name,
      description,
      logo,
    }: CreateCommunityProps) => {
      const result = await actor!.create_community(
        slug,
        name,
        description,
        logo,
        '',
        [],
        '',
      );

      if ('Err' in result) {
        throw new Error(result.Err);
      }

      return result.Ok;
    },
  });
}
