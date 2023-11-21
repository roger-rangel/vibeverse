import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function LearningSection() {

  const learning_modules = [
    {
      path: '/dashboard/modules/1',
      image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/54a531d62eb7d502cf4977391769fca0.jpg',
      title: 'The Current State of AI',
    }
  ];

  return (
    <div className="mx-10">
      <div className="pt-6">
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 xl:gap-x-8"
        >
          {learning_modules.map((file) => (
            <li key={file.image} className="relative">
              <div className="group aspect-h-7 aspect-w-10 relative block w-full overflow-hidden rounded-lg border-2 border-indigo-500/100 bg-gray-100">
                <Image
                  src={file.image}
                  alt=""
                  className="pointer-events-none rounded object-cover group-hover:border-2"
                  width={200}
                  height={200}
                />
                <div className="ml-4 mt-4 flex items-center justify-center gap-2">
                  <p className="pointer-events-none block text-3xl font-black text-purple-100">
                    {file.title}
                  </p>
                </div>
                <Link href={file.path}>
                  <div className="absolute inset-0 focus:outline-none">
                    <span className="sr-only">View details for {file.title}</span>
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
