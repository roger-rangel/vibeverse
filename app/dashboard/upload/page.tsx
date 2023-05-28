'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import Sign from '@/components/dashboard/shorts/sign';
import Modal_Collection from '@/components/dashboard/upload/modal_collection';
import Create_Collection from '@/components/dashboard/upload/create_collection';
import Create_NFT from '@/components/dashboard/upload/create_NFT';

const uploads = [
  {
    id: 1,
    title: 'Create Collection',
    href: '/dashboard/upload/',
    imageUrl: '/images/dashboard/create_collection.png',
    isModal: true,
  },
  {
    id: 2,
    title: 'Create New Item',
    href: '/dashboard/upload/',
    imageUrl: '/images/dashboard/create_NFT.png',
    isModal: true,
  },
  {
    id: 3,
    title: 'New to Web3?',
    href: '/dashboard/upload/new_to_web3',
    imageUrl: '/images/dashboard/new_to_web3.png',
    isModal: false,
  },
  // More posts...
];

export default function Upload() {
  const [modal, showModal] = useState(false);
  const [createCollection, showCreateCollection] = useState(false);
  const [createNFT, showCreateNFT] = useState(true);

  const handleClick = (upload: {
    id: number;
    title: string;
    href: string;
    imageUrl: string;
    isModal: boolean;
  }) => {
    if (upload.isModal) {
      if (upload.title === 'Create Collection') {
        showModal(true);
      } else if (upload.title === 'Create New Item') {
        showCreateNFT(true);
      } else {
        showModal(true);
      }
    } else {
      window.location.href = upload.href;
    }
  };

  // set overflow-hidden on body when modal is open
  useEffect(() => {
    document.body.style.overflow =
      modal || createCollection || createNFT ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modal, createCollection, createNFT]);

  return (
    <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8 bg-gradient-to-r from-[#8360c3] to-[#2ebf91]">
      <div className="m-auto mt-4 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {uploads.map((upload) => (
          <article
            key={upload.id}
            className="relative isolate flex flex-col justify-center items-center overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 cursor-pointer"
            onClick={() => handleClick(upload)}
          >
            <Image
              src={upload.imageUrl}
              alt=""
              className="absolute inset-0 -z-10 h-full w-full object-cover"
              width={600}
              height={600}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

            <h3 className="absolute mx-4 inset-0 flex text-2xl font-semibold leading-6 text-white items-center justify-center">
              <span className="absolute inset-0 flex justify-center items-center" />
              {upload.title}
            </h3>
          </article>
        ))}
      </div>

      <Sign />

      {modal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Modal_Collection
            showModal={showModal}
            showCreateCollection={showCreateCollection}
          />
        </div>
      )}

      {createCollection && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Create_Collection showCreateCollection={showCreateCollection} />
        </div>
      )}

      {createNFT && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Create_NFT showCreateNFT={showCreateNFT} />
        </div>
      )}
    </div>
  );
}
