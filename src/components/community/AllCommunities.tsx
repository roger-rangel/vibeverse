import React from 'react';

import { useGetCommunities } from '@/hooks';
import { CommunityCard } from './CommunityCard';

export function AllCommunities() {
  const { data: communities } = useGetCommunities();

  return (
    <div className="mx-10">
      <div className="pb-20 pt-12">
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {communities?.map((c) => (
            <CommunityCard key={c.slug} community={c} />
          ))}
        </ul>
      </div>
    </div>
  );
}
