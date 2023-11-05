'use client';

import Image from 'next/image';
import { Modal, ModalProps } from '@/components/Modal';
import { Creator, DetailedNft } from '@/types';

export default function DetailedNftModal({
  nft,
  creator,
  isOpen,
  hideModal,
}: { nft: DetailedNft; creator?: Creator | null } & ModalProps) {
  return (
    <Modal isOpen={isOpen} hideModal={hideModal}>
      <article className="bg-[#262626] pt-2 pb-8 sm:pl-6 xs:px-6 sm:px-0 rounded-3xl border border-indigo-600">
        <div className="flex text-blue-200 bottom-0 items-end justify-between pb-2">
          <div className="flex items-center ml-4 py-2">
            <Image
              className="xxs:h-10 xxs:w-10 sm:h-12 sm:w-12 rounded-full object-cover xs:mb-0 sm:mb-2 border border-white"
              src={creator?.avatar || nft.profileImage}
              height={200}
              width={200}
              alt=""
            />
            <div className={`py-2 px-2 rounded-xl pl-4`}>
              <h2 className="text-2xl">{creator?.name || nft.creator}</h2>
            </div>
            <div className="flex items-center ml-4">
              {nft.awards &&
                nft.awards.map((award, index) => (
                  <Image
                    key={index}
                    className="xxs:h-8 xxs:w-8 sm:h-8 sm:w-8 rounded-full object-cover"
                    src={award}
                    height={200}
                    width={200}
                    alt=""
                  />
                ))}
            </div>
          </div>
          <div className="bg-slate-800 xs:-mr-6 sm:-mr-0 pb-6 px-4 rounded-full text-xs">
            <button
              onClick={hideModal}
              className="py-2 px-4 text-white rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] hover:from-[#4ade80] hover:to-[#3b82f6]"
            >
              X
            </button>
          </div>
        </div>
        <div className="sm:grid-cols-2 md:grid-cols-2 grid gap-4">
          <div className="grid gap-y-2">
            <div className="flex flex-col overflow-hidden rounded-3xl max-h-[24rem] relative">
              <Image
                src={nft.assetUrl || '/images/items/item_1.png'}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = '/images/items/item_1.png';
                }}
                alt="item"
                width="400"
                height="600"
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-end justify-end">
                {nft.emoticons &&
                  nft.emoticons.map((emoticon, index) => (
                    <button
                      key={index}
                      className="bg-sky-950 mb-2 mx-1 mr-2 px-2 py-1 flex items-center justify-center rounded-full text-xs z-1 text-stone-300 gap-1 border border-indigo-500"
                    >
                      <Image
                        key={index}
                        className="xxs:h-4 xxs:w-4 sm:h-4 sm:w-4 rounded-full object-cover"
                        src={emoticon}
                        height={200}
                        width={200}
                        alt=""
                      />
                      12
                    </button>
                  ))}
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-tl-lg p-2">
                  <h2 className="text-white text-lg justify-center px-2">
                    100 Views
                  </h2>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#a855f7] to-[#3b82f6] rounded-3xl flex items-center justify-between w-full px-4">
              <div className="flex text-blue-200 m-auto py-2">{nft.name}</div>
            </div>
            <div className="bg-gradient-to-r from-[#a855f7] to-[#3b82f6] rounded-3xl flex items-center justify-between px-6">
              <div className="flex gap-2 items-center my-2 justify-center">
                {nft.communities &&
                  nft.communities.map((community, index) => (
                    <Image
                      key={index}
                      className="xxs:h-6 xxs:w-6 sm:h-6 sm:w-6 rounded-full object-cover border border-white"
                      src={community}
                      height={200}
                      width={200}
                      alt=""
                    />
                  ))}
                <button className="bg-sky-950 flex items-center justify-center rounded-full w-12 h-6 text-xs z-1 text-white">
                  <div className="mr-1">+ 2</div>
                  <div className="">
                    <Image
                      className="xxs:h-4 xxs:w-4 rounded-full object-cover"
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
              <div className="flex gap-2 items-center my-2 justify-center">
                {nft.aiTools &&
                  nft.aiTools.map((tool, index) => (
                    <Image
                      key={index}
                      className="xxs:h-6 xxs:w-6 sm:h-6 sm:w-6 object-cover rounded-md"
                      src={tool}
                      height={200}
                      width={200}
                      alt=""
                    />
                  ))}
                <button className="bg-sky-950 flex items-center justify-center rounded-full w-12 h-6 text-xs z-1 text-white">
                  <div className="mr-1">+ 2</div>
                  <div className="">
                    <Image
                      className="xxs:h-4 xxs:w-4 rounded-full object-cover"
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
          <div className="bg-gradient-to-r from-[#a855f7] to-[#3b82f6] flex-col h-full mr-4 rounded-3xl xs:hidden sm:flex">
            <div className="flex p-6 justify-center">RELATED CONTENT</div>
          </div>
        </div>
      </article>
    </Modal>
  );
}
