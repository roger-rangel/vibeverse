'use client';

import React from 'react';
import { Poppins } from 'next/font/google';

import About from '@/components/dashboard/profile/about/about';
import Items from '@/components/dashboard/profile/items/items';

import { useGetPrincipalNfts } from '@/hooks';

const poppins = Poppins({
  weight: '300',
  subsets: ['latin'],
});

const ProfilePage = () => {
  const { data: nfts } = useGetPrincipalNfts();

  return (
    <div
      className={`${poppins.className} min-h-[inherit] bg-[#1f1f38] text-white m-0 p-0 border-none outline-none box-border list-none no-underline scroll-smooth leading-7 profile`}
    >
      <About />
      {nfts && <Items nfts={nfts.reverse()} />}
    </div>
  );
};

export default ProfilePage;
