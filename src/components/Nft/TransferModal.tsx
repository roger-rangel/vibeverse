'use client';

import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Principal } from '@dfinity/principal';
import { classnames } from 'tailwindcss-classnames';

import { Modal, ModalProps } from '@/components/Modal';
import { useActor } from '@/hooks';
import { Nft } from '@/types';

import styles from './Items.module.scss';

export function TransferModal({
  nft,
  isOpen,
  hideModal,
}: { nft: Nft } & ModalProps) {
  const [receiver, setReceiver] = useState('');
  const { actor } = useActor();
  const transfer = async () => {
    if (!actor) {
      alert('Please sign in');
      return;
    }

    const result = await actor.transfer_nft(
      nft.collectionId, // collectionId
      nft.id, // nftId
      Principal.from(receiver),
    );

    if ('Err' in result) {
      alert(`Error: ${result.Err}`);
    } else {
      alert('Successfully transferred');
    }
  };

  return (
    <Modal isOpen={isOpen} hideModal={hideModal}>
      <article
        key="1"
        className="bg-[#262626] p-8 rounded-3xl border border-indigo-600"
      >
        <h3 className="flex items-center justify-center text-zinc-300 pb-2">
          {nft.name}
        </h3>
        <div
          // @ts-ignore
          className={classnames(styles.item__item__image)}
        >
          <LazyLoadImage
            src={nft.assetUrl || '/images/items/item_1.png'}
            effect="blur"
            width="350"
            height="350"
            alt={nft.name}
            className="rounded-2xl object-cover w-[350px] h-[350px]"
          />
        </div>

        <div className="sm:col-span-2 pt-4 pb-6">
          <label className="block text-sm font-semibold leading-6 text-white">
            Send it to:
          </label>
          <div className="mt-2.5">
            <input
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              type="text"
              name="receiver"
              id="receiver"
              autoComplete="receiver"
              className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div
          // @ts-ignore
          className={classnames(styles.item__item__cta)}
        >
          <button
            onClick={transfer}
            className="py-2 px-4 text-white rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] hover:from-[#4ade80] hover:to-[#3b82f6]"
          >
            Transfer
          </button>
          <button
            onClick={hideModal}
            className="py-2 px-4 text-white rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] hover:from-[#4ade80] hover:to-[#3b82f6]"
          >
            Close
          </button>
        </div>
      </article>
    </Modal>
  );
}
