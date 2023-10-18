'use client';

import { useState } from 'react';
import { Poppins } from 'next/font/google';

import About from '@/components/dashboard/profile/about/about';
import Items from '@/components/dashboard/profile/items/items';
import Modal_Item from '@/components/dashboard/profile/items/modal_item';
import { useGetPrincipalCollections, useGetPrincipalNfts } from '@/hooks';
import { useConnect } from '@connect2ic/react';

const poppins = Poppins({
  weight: '300',
  subsets: ['latin'],
});

const ProfilePage = () => {
  const [modal, showModal] = useState(false);
  const [selectedNft, setSelectedNft] = useState({});
  const { activeProvider } = useConnect();
  const { data: collections } = useGetPrincipalCollections();
  const { data: nfts } = useGetPrincipalNfts();

  console.log('principal', activeProvider?.principal);
  console.log('collections', collections);
  console.log('nfts', nfts);

  return (
    <>
      <div
        className={`${poppins.className} bg-[#1f1f38] text-white m-0 p-0 border-none outline-none box-border list-none no-underline scroll-smooth leading-7 profile`}
      >
        <About />
        {nfts && (
          <Items
            showModal={showModal}
            setSelectedNft={setSelectedNft}
            nfts={nfts.reverse()}
          />
        )}
      </div>

      {modal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Modal_Item selectedNft={selectedNft} showModal={showModal} />
        </div>
      )}
    </>
  );
};

export default ProfilePage;
