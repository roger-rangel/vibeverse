'use client';

import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google';

import About from '@/components/dashboard/profile/about/about';
import Items from '@/components/dashboard/profile/items/items';
import Modal_Item from '@/components/dashboard/profile/items/modal_item';
import BackendActor from '@/components/BackendActor';

const poppins = Poppins({
  weight: '300',
  subsets: ['latin'],
});

const ProfilePage = () => {
  const [modal, showModal] = useState(false);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const actor = new BackendActor();
    actor.getNfts('2vxsx-fae').then(result => {
      console.log(result);
      setNfts(result);
    });
  }, []);

  return (
    <>
      <div className={`${poppins.className} bg-[#1f1f38] text-white m-0 p-0 border-none outline-none box-border list-none no-underline scroll-smooth leading-7 profile`}>
        <About />
        <Items showModal={showModal} nfts={nfts.reverse()} />
      </div>

      {modal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Modal_Item showModal={showModal}/>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
