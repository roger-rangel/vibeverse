'use client';

import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
import { toast } from 'react-toastify';
import { useSearchParams, notFound } from 'next/navigation';

import { useFinishCourse, useGetCourse } from '@/hooks';

export default function CourseView() {
  const searchParams = useSearchParams();

  const slug = searchParams.get('slug');
  const { data: course } = useGetCourse({ slug: slug || '', enabled: !!slug });
  const { mutateAsync: finishCourse } = useFinishCourse();

  if (!slug) {
    notFound();
  }

  const handleFinishCourse = async () => {
    if (!slug) return;

    toast.promise(finishCourse({ slug: slug || '' }), {
      pending: 'Finishing course...',
      error: 'Error',
      success: `Finished ${course?.title} course!`,
    });
  };

  return (
    <div className="p-2 lg:p-8">
      {course ? (
        <div className="text-white">
          <h4 className="my-4 text-4xl">{course.title}</h4>
          <p className="text-md my-2">{course.description}</p>
          <div className="my-4 rounded-2xl border border-cyan-700 p-4">
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
            >
              {course.content}
            </Markdown>
          </div>
          <button type="button" onClick={handleFinishCourse}>
            Finish course
          </button>
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}
