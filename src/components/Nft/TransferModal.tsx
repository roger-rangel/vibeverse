'use client';

import { useState } from 'react';
import { Principal } from '@dfinity/principal';

import { Modal, ModalProps } from '@/components/Modal';
import { useActor } from '@/hooks';
import { Nft } from '@/types';

import styles from './Items.module.scss';
import { Player } from '../Player';

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
        className="rounded-3xl border border-indigo-600 bg-[#262626] p-8"
      >
        <h3 className="flex items-center justify-center pb-2 text-zinc-300">
          {nft.name}
        </h3>
        <div className={`${styles.item__item__image}`}>
          <Player
            path={nft.assetUrl || '/images/items/item_1.png'}
            className="rounded-xl object-cover"
            autoPlay
            controls
            width={320}
            height={240}
          />
        </div>

        <div className="pb-6 pt-4 sm:col-span-2">
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
        <div className={`${styles.item__item__cta}`}>
          <button
            onClick={transfer}
            className="rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] px-4 py-2 text-white hover:from-[#4ade80] hover:to-[#3b82f6]"
          >
            Transfer
          </button>
          <button
            onClick={hideModal}
            className="rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] px-4 py-2 text-white hover:from-[#4ade80] hover:to-[#3b82f6]"
          >
            Close
          </button>
        </div>
      </article>
    </Modal>
  );
}
