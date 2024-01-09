/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import React, { useEffect, useState } from 'react';

import { Mixpanel } from '@/components/Mixpanel';
import { DetailedNftCard } from '@/components/Nft';
import { useGetNfts } from '@/hooks/useGetNfts';
import { AssetType } from '@/types';

const gradients = [
  'bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl',
  'bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl',
  'bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl',
  'bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l',
  'bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl',
  'bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200',
  'bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl',
];

export default function Gallery() {
  const [selectedAssetType, setSelectedAssetType] = useState<
    AssetType | undefined
  >(undefined);

  useEffect(() => {
    Mixpanel.track('AI Gallery Viewed');
  }, []);

  const { data: nfts } = useGetNfts({
    assetType: selectedAssetType,
    page: 0,
    limit: 1000,
  });

  const assetTypes = Object.keys(AssetType)
    // @ts-ignore
    .map((key) => AssetType[key])
    .filter((value) => typeof value === 'string') as string[];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-2">
        <button
          onClick={() => setSelectedAssetType(undefined)}
          className={`${
            gradients[gradients.length - 1]
          } min-w-[80px] rounded-lg p-2 text-white`}
        >
          All
        </button>
        {assetTypes.map((type, i) => (
          <button
            key={type}
            // @ts-ignore
            onClick={() => setSelectedAssetType(AssetType[type])}
            className={`${gradients[i]} min-w-[80px] rounded-lg p-2 text-white`}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {nfts?.map((nft) => (
          <DetailedNftCard key={`${nft.collectionId}-${nft.id}`} nft={nft} />
        ))}
      </div>
    </div>
  );
}
