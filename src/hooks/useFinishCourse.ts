import { useMutation } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { CommunityId } from '@/types';

export interface FinishCourseProps {
  slug: CommunityId;
}

export function useFinishCourse() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({ slug }: FinishCourseProps) => {
      const result = await actor!.finish_course(slug);

      if ('Err' in result) {
        throw new Error(result.Err);
      }

      return result.Ok;
    },
  });
}
