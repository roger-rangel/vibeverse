import { useQuery } from '@tanstack/react-query';

import { useActor } from '@/providers/ActorProvider';
import { PaginationParams, asCourse } from '@/types';

export function useGetCourses({ page, limit }: Partial<PaginationParams>) {
  const { actor } = useActor();
  return useQuery({
    queryKey: [actor, 'courses', page, limit],
    queryFn: async () => {
      const courses = await actor!.get_courses(
        page ? [BigInt(page)] : [],
        limit ? [BigInt(limit)] : [],
      );

      return courses.map(asCourse);
    },
    enabled: !!actor,
  });
}
