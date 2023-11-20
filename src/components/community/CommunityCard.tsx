/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { Community } from '@/types';
import { useGetProfile } from '@/hooks';

// 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Runway_2023-11-10T12_44_47.434Z_Erase_and_Replace_sky.png'

export function CommunityCard({
  community: { name, logo, creator },
}: {
  community: Community;
}) {
  const { data } = useGetProfile({ principal: creator.toString() });
  return (
    <div>
      <div className="group aspect-h-7 aspect-w-10 relative block w-full overflow-hidden rounded-lg border border-green-300 bg-gray-100">
        <img
          src={logo}
          alt=""
          className="pointer-events-none rounded-lg object-cover group-hover:border-2"
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
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for ...</span>
        </button>
      </div>
      <div className={`mt-2 flex-col items-center justify-center gap-2`}>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            className={`rounded-md bg-gradient-to-r from-gray-700 via-gray-900 to-black px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500`}
          >
            Join
          </button>
          <button
            className={`rounded-md bg-gradient-to-r from-gray-700 via-gray-900 to-black px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500`}
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
