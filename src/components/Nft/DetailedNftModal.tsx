'use client';

import Image from 'next/image';
import { Modal, ModalProps } from '@/components/Modal';
import { Creator, DetailedNft, NftMetadata } from '@/types';
import { Reactions } from '../Emoji';
import { Player } from '../Player';

export default function DetailedNftModal({
  nft,
  creator,
  metadata,
  isOpen,
  hideModal,
}: {
  nft: DetailedNft;
  creator?: Creator | null;
  metadata?: NftMetadata | null;
} & ModalProps) {
  return (
    <Modal isOpen={isOpen} hideModal={hideModal}>
      <article className="rounded-3xl border border-indigo-600 bg-[#262626] pb-8 pt-2 xs:px-6 sm:px-0 sm:pl-6">
        <div className="bottom-0 flex items-end justify-between pb-2 text-blue-200">
          <div className="ml-4 flex items-center py-2">
            <Image
              className="rounded-full border border-white object-cover xxs:h-10 xxs:w-10 xs:mb-0 sm:mb-2 sm:h-12 sm:w-12"
              src={creator?.avatar || nft.profileImage}
              height={200}
              width={200}
              alt=""
            />
            <div className={`rounded-xl px-2 py-2 pl-4`}>
              <h2 className="text-2xl">{creator?.name || nft.creator}</h2>
            </div>
            <div className="ml-4 flex items-center">
              {nft.awards &&
                nft.awards.map((award, index) => (
                  <Image
                    key={index}
                    className="rounded-full object-cover xxs:h-8 xxs:w-8 sm:h-8 sm:w-8"
                    src={award}
                    height={200}
                    width={200}
                    alt=""
                  />
                ))}
            </div>
          </div>
          <div className="rounded-full bg-slate-800 px-4 pb-6 text-xs xs:-mr-6 sm:-mr-0">
            <button
              onClick={hideModal}
              className="rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] px-4 py-2 text-white hover:from-[#4ade80] hover:to-[#3b82f6]"
            >
              X
            </button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2">
          <div className="grid gap-y-2">
            <div className="relative flex max-h-[24rem] flex-col overflow-hidden rounded-3xl">
              <Player
                path={nft.assetUrl || '/images/items/item_1.png'}
                className="rounded-xl object-cover"
                autoPlay
                controls
              />
              <div className="absolute bottom-0 right-0 flex flex-row gap-1">
                <Reactions
                  collectionId={nft.collectionId}
                  nftId={nft.id}
                  reactions={metadata?.reactions || []}
                />
                <div className="rounded-tl-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2">
                  <h2 className="justify-center px-2 text-lg text-white">
                    100 Views
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-between rounded-3xl bg-gradient-to-r from-[#a855f7] to-[#3b82f6] px-4">
              <div className="m-auto flex py-2 text-blue-200">{nft.name}</div>
            </div>
            <div className="flex items-center justify-between rounded-3xl bg-gradient-to-r from-[#a855f7] to-[#3b82f6] px-6">
              <div className="my-2 flex items-center justify-center gap-2">
                {nft.communities &&
                  nft.communities.map((community, index) => (
                    <Image
                      key={index}
                      className="rounded-full border border-white object-cover xxs:h-6 xxs:w-6 sm:h-6 sm:w-6"
                      src={community}
                      height={200}
                      width={200}
                      alt=""
                    />
                  ))}
                <button className="z-1 flex h-6 w-12 items-center justify-center rounded-full bg-sky-950 text-xs text-white">
                  <div className="mr-1">+ 2</div>
                  <div className="">
                    <Image
                      className="rounded-full object-cover xxs:h-4 xxs:w-4"
                      src={
                        'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/community.png'
                      }
                      height={200}
                      width={200}
                      alt=""
                    />
                  </div>
                </button>
              </div>
              <div className="my-2 flex items-center justify-center gap-2">
                {nft.aiTools &&
                  nft.aiTools.map((tool, index) => (
                    <Image
                      key={index}
                      className="rounded-md object-cover xxs:h-6 xxs:w-6 sm:h-6 sm:w-6"
                      src={tool}
                      height={200}
                      width={200}
                      alt=""
                    />
                  ))}
                <button className="z-1 flex h-6 w-12 items-center justify-center rounded-full bg-sky-950 text-xs text-white">
                  <div className="mr-1">+ 2</div>
                  <div className="">
                    <Image
                      className="rounded-full object-cover xxs:h-4 xxs:w-4"
                      src={
                        'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/magic-wand.png'
                      }
                      height={200}
                      width={200}
                      alt=""
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="mr-4 h-full flex-col rounded-3xl bg-gradient-to-r from-[#a855f7] to-[#3b82f6] xs:hidden sm:flex">
            <div className="flex justify-center p-6">RELATED CONTENT</div>
          </div>
        </div>
      </article>
    </Modal>
  );
}
