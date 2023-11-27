import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { Course, asCourse } from '@/types';

export function useGetCourse({ slug }: Pick<Course, 'slug'>) {
  const { actor } = useActor();
  return useQuery({
    queryKey: [actor, 'course', slug],
    queryFn: async () => {
      const course = await actor!.get_course(slug);

      if (course.length === 0) {
        throw new Error('Not found');
      }

      return asCourse(course[0]);
    },
    enabled: !!actor,
  });
}
