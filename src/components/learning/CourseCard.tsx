import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Course } from '@/types';

export function CourseCard({
  course: { logo, title, slug },
}: {
  course: Course;
}) {
  return (
    <div className="group aspect-h-7 aspect-w-10 relative block w-full overflow-hidden rounded-lg border-2 border-indigo-500/100 bg-gray-100">
      <Image
        src={logo}
        alt=""
        className="pointer-events-none rounded object-cover group-hover:border-2"
        width={200}
        height={200}
      />
      <div className="ml-4 mt-4 flex items-center justify-center gap-2">
        <p className="pointer-events-none block text-3xl font-black text-purple-100">
          {title}
        </p>
      </div>
      <Link href={`/dashboard/course?slug=${slug}`}>
        <div className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {title}</span>
        </div>
      </Link>
    </div>
  );
}
