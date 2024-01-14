/* eslint-disable @next/next/no-img-element */

import React from 'react';
import Link from 'next/link';

import { Community } from '@/types';
import { useGetProfile } from '@/hooks';

export function CommunityCard({
  community: { slug, name, creator, heroImage },
}: {
  community: Community;
}) {
  const { data } = useGetProfile({ principal: creator.toString() });

  return (
    <div>
      <div className="group aspect-h-7 aspect-w-10 relative block w-full overflow-hidden rounded-lg border border-green-300 bg-gray-100">
        <img
          src={heroImage}
          alt={name}
          className="pointer-events-none rounded-lg group-hover:border-2"
          width={200}
          height={200}
        />
        <div className="ml-4 mt-4 flex items-start justify-start gap-2">
          <p className="pointer-events-none block text-base font-medium text-purple-200 ">
            {name}
          </p>
        </div>
        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 transform items-end justify-end">
          <img
            src={data?.avatar || ''}
            alt="community"
            className={`mb-2 mr-4 flex h-8 w-8 items-center rounded-md`}
            width="50"
            height="50"
          />
        </div>
        <Link
          href={`/dashboard/communities/browse?slug=${slug}`}
          className="absolute inset-0 focus:outline-none"
        >
          <span className="sr-only">View details for ...</span>
        </Link>
      </div>
    </div>
  );
}
