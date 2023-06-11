'use client';

import Image from 'next/image';
import styles from './Items.module.scss';
import { classnames } from 'tailwindcss-classnames';

import IMG from '@/public/images/items/item_1.png';

export default function Modal_Item({ showModal, selectedNft }) {
  return (
    <>
      <div className="">
        <article
          key="1"
          className="bg-[#262626] p-8 rounded-3xl border border-indigo-600"
        >
          <h3 className="flex items-center justify-center text-zinc-300 pb-2">
            {selectedNft.name}
          </h3>
          <div className={classnames(styles.item__item__image)}>
            <Image
              src={selectedNft.asset_url[0] ? selectedNft.asset_url[0] : IMG}
              alt="item"
              width="400"
              height="400"
            />
          </div>

          <div className="sm:col-span-2 pt-4 pb-6">
            <label className="block text-sm font-semibold leading-6 text-white">
              Send it to:
            </label>
            <div className="mt-2.5">
              <input
                type="nft"
                name="nft"
                id="nft"
                autoComplete="nft"
                className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className={classnames(styles.item__item__cta)}>
            <button
              className="py-2 px-4 text-white rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] hover:from-[#4ade80] hover:to-[#3b82f6]"
              target="_blank"
            >
              Transfer
            </button>
            <button
              onClick={() => showModal(false)}
              className="py-2 px-4 text-white rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] hover:from-[#4ade80] hover:to-[#3b82f6]"
              target="_blank"
            >
              Close
            </button>
          </div>
        </article>
      </div>
    </>
  );
}
