'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { notFound, useSearchParams } from 'next/navigation';

import { Mixpanel } from '@/components/Mixpanel';
import CommunityPage from '@/components/community/Page';
import { useGetCommunity } from '@/hooks';

export default function Community() {
  const parms = useSearchParams();
  const { data: community } = useGetCommunity({
    slug: parms.get('slug') || '',
  });

  useEffect(() => {
    Mixpanel.track('Curious Refuge visited');
  }, []);

  if (community === null) {
    return notFound();
  }

  return (
    <div className="relative mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <Image
        src="/images/dashboard/magical_castle.png"
        layout="fill"
        objectFit="cover"
        quality={1000}
        alt="Background"
      />
      <div className="relative mb-20">
        {community && <CommunityPage community={community} />}
      </div>
    </div>
  );
}
