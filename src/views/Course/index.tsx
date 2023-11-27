'use client';

import React from 'react';

import { useGetCourse } from '@/hooks';
import { Course } from '@/types';

export default function CourseView(params: Pick<Course, 'slug'>) {
  const { data: course } = useGetCourse({ slug: params.slug });

  return (
    <div>
      {course ? (
        <>
          <h4>{course.title}</h4>
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}
