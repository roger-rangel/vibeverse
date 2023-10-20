'use client';

import React from 'react';
import { Poppins } from 'next/font/google';

import About from '@/components/dashboard/profile/about/about';
import Items from '@/components/dashboard/profile/items/items';

import { useGetPrincipalCollections, useGetPrincipalNfts } from '@/hooks';
import { useConnect } from '@connect2ic/react';

const poppins = Poppins({
  weight: '300',
  subsets: ['latin'],
});

const ProfilePage = () => {
  const { activeProvider } = useConnect();
  const { data: collections } = useGetPrincipalCollections();
  const { data: nfts } = useGetPrincipalNfts();

  // TODO Remove once collection & nft view
  console.log('principal', activeProvider?.principal);
  console.log('collections', collections);
  console.log('nfts', nfts);

  return (
    <div
      className={`${poppins.className} bg-[#1f1f38] text-white m-0 p-0 border-none outline-none box-border list-none no-underline scroll-smooth leading-7 profile`}
    >
      <About />
      {nfts && <Items nfts={nfts.reverse()} />}
    </div>
  );
};

export default ProfilePage;
