import React from 'react';

import { useGetCourses } from '@/hooks';
import { CourseCard } from './CourseCard';

export function AllCourses() {
  const { data: courses } = useGetCourses({});
  console.log(courses);
  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 xl:gap-x-8"
      >
        {courses?.map((course) => (
          <CourseCard key={`course-${course.slug}`} course={course} />
        ))}
      </ul>
    </div>
  );
}
