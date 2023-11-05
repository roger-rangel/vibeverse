'use client';

import React, { useEffect } from 'react';

import { Mixpanel } from '@/components/Mixpanel';
import { DetailedNftCard } from '@/components/Nft';
import { useGetNfts } from '@/hooks/useGetNfts';

export default function Gallery() {
  useEffect(() => {
    Mixpanel.track('AI Gallery Viewed');
  }, []);

  const { data: nfts } = useGetNfts({ page: 0, limit: 1000 });

  return (
    <div className="mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {nfts?.map((nft) => (
        <DetailedNftCard key={`${nft.collectionId}-${nft.id}`} nft={nft} />
      ))}
    </div>
  );
}
