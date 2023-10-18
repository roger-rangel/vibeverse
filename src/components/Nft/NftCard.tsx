'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import classnames from 'tailwindcss-classnames';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Nft } from '@/types';

import { TransferModal } from './TransferModal';
import styles from './Items.module.scss';

export function NftCard({ nft }: { nft: Nft }) {
  const [modal, showModal] = useState(false);

  return (
    <>
      <article
        key={`${nft.collectionId}-${nft.id}`}
        className={classnames(styles.item__item, 'flex flex-col items-center')}
      >
        <LazyLoadImage
          src={nft.assetUrl || '/images/items/item_1.png'}
          effect="blur"
          width="350"
          height="350"
          alt={nft.name}
          className="rounded-2xl object-cover w-[350px] h-[350px]"
        />
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
