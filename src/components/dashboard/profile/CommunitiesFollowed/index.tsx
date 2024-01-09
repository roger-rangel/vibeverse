import React from 'react';
import { useConnect } from '@connect2ic/react';

import { useGetCommunitiesFollowed } from '@/hooks';
import { CommunityCard } from '../../../community/CommunityCard';

export function CommunitiesFollowed() {
  const { activeProvider } = useConnect();
  const { data: communities } = useGetCommunitiesFollowed({
    userId: activeProvider?.principal,
  });

  if (communities === undefined || communities.length === 0) return <></>;

  return (
    <div className="m-10">
      <h4>My following communities</h4>
      <div className="px-4 py-2">
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
