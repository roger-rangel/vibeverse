'use client';

import { CommunitySection, AllCommunities } from '@/components/community';

export default function MyCommunity() {
  return (
    <div className="relative min-h-[inherit] bg-[url('https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/blue_sky.png')] bg-cover">
      <CommunitySection />
      <AllCommunities />
    </div>
  );
}
