import { useMutation } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { Course, asRawCourseLevel } from '@/types';

export type CreateCourseProps = Course;

export function useCreateCourse() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      slug,
      title,
      description,
      level,
      logo,
      content,
      badge,
    }: CreateCourseProps) => {
      const result = await actor!.create_course(
        slug,
        title,
        description,
        asRawCourseLevel(level),
        logo,
        content,
        badge.name,
        badge.image,
      );

      if ('Err' in result) {
        throw new Error(result.Err);
      }

      return result.Ok;
    },
  });
}
