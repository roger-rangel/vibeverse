'use client';

import { useState } from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: '300',
  subsets: ['latin'],
});

import About from '@/components/dashboard/profile/about/about';
import Items from '@/components/dashboard/profile/items/items';
import Modal_Item from '@/components/dashboard/profile/items/modal_item';

const ProfilePage = () => {
  const [modal, showModal] = useState(false);

  return (
    <>
      <div className={`${poppins.className} bg-[#1f1f38] text-white m-0 p-0 border-none outline-none box-border list-none no-underline scroll-smooth leading-7 profile`}>
        <About />
        <Items showModal={showModal} />
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
