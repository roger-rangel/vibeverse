'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import classnames from 'tailwindcss-classnames';

import { Nft } from '@/types';

import { TransferModal } from './TransferModal';
import styles from './Items.module.scss';

export function NftCard({ nft }: { nft: Nft }) {
  const [modal, showModal] = useState(false);

  return (
    <>
      <article
        key={`${nft.collectionId}-${nft.id}`}
        className={classnames(styles.item__item)}
      >
        <div className={classnames(styles.item__item__image)}>
          <Image
            src={nft.assetUrl || '/images/items/item_1.png'}
            alt={nft.name}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = '/images/items/item_1.png';
            }}
            width="400"
            height="400"
            className="min-h-[300px] object-cover"
          />
        </div>
        <h3>{nft.name}</h3>
        <div className={classnames(styles.item__item__cta)}>
          <button
            onClick={() => {
              showModal(true);
            }}
            className="py-2 px-4 text-base rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] hover:from-[#4ade80] hover:to-[#3b82f6]"
          >
            Transfer
          </button>
        </div>
      </article>

      {modal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <TransferModal nft={nft} showModal={showModal} />
        </div>
      )}
    </>
  );
}
