'use client';

import React from 'react';
import { useModal } from 'react-modal-hook';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import classnames from 'tailwindcss-classnames';

import { Nft } from '@/types';

import { TransferModal } from './TransferModal';
import styles from './Items.module.scss';

export function NftCard({ nft }: { nft: Nft }) {
  const [showModal, hideModal] = useModal(
    () => <TransferModal isOpen nft={nft} hideModal={hideModal} />,
    [nft],
  );

  return (
    <article
      key={`${nft.collectionId}-${nft.id}`}
      // @ts-ignore
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

      <div
        // @ts-ignore
        className={classnames(styles.item__item__cta)}
      >
        <button
          onClick={showModal}
          className="py-2 px-4 text-base rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] hover:from-[#4ade80] hover:to-[#3b82f6]"
        >
          Transfer
        </button>
      </div>
    </article>
  );
}
