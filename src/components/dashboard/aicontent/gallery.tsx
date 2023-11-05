'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';

import { Mixpanel } from '@/components/Mixpanel';
import { DetailedNftCard } from '@/components/Nft';
import { useGetNfts } from '@/hooks/useGetNfts';

export default function Gallery() {
  useEffect(() => {
    Mixpanel.track('AI Gallery Viewed');
  }, []);

  const { data: nfts } = useGetNfts({ page: 0, limit: 1000 });

  return (
    <div className="h-screen mx-auto relative">
      <div className="mx-auto bg-gradient-to-r bg-black relative rounded-xl">
        <Image
          src="/images/dashboard/test_background.png"
          layout="fill"
          objectFit="cover"
          quality={1000}
          alt="Background"
        />
        <div className="relative w-full justify-center items-center mx-auto px-4  pt-8 sm:px-6 lg:px-8 gap-1">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-1">
            {nfts?.map((nft) => (
              <DetailedNftCard
                key={`${nft.collectionId}-${nft.id}`}
                nft={nft}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
