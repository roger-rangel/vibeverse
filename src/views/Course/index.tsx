'use client';

import React from 'react';
import { useSearchParams, notFound } from 'next/navigation';

import { useGetCourse } from '@/hooks';

export default function CourseView() {
  const searchParams = useSearchParams();

  const slug = searchParams.get('slug');
  const { data: course } = useGetCourse({ slug: slug || '', enabled: !!slug });

  if (!slug) {
    notFound();
  }

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
