'use client';

import React from 'react';
import { useModal } from 'react-modal-hook';
import classnames from 'tailwindcss-classnames';

import { Nft } from '@/types';

import { TransferModal } from './TransferModal';
import styles from './Items.module.scss';
import { Player } from '../Player';

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
      <Player
        path={nft.assetUrl || '/images/items/item_1.png'}
        className="rounded-xl object-cover"
        autoPlay
        controls
        width={320}
        height={240}
      />
      <h3>{nft.name}</h3>

      <div
        // @ts-ignore
        className={classnames(styles.item__item__cta)}
      >
        <button
          onClick={showModal}
          className="rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] px-4 py-2 text-base hover:from-[#4ade80] hover:to-[#3b82f6]"
        >
          Transfer
        </button>
      </div>
    </article>
  );
}
