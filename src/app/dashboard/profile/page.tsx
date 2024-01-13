'use client';

import React from 'react';
import { Poppins } from 'next/font/google';

import About from '@/components/dashboard/profile/About';
import Items from '@/components/dashboard/profile/Items';
import { CommunitiesFollowed } from '@/components/dashboard/profile/CommunitiesFollowed';

import { useGetPrincipalNfts } from '@/hooks';

const poppins = Poppins({
  weight: '300',
  subsets: ['latin'],
});

const ProfilePage = () => {
  const { data: nfts } = useGetPrincipalNfts();

  return (
    <div
      className={`${poppins.className} profile m-0 box-border min-h-[inherit] list-none scroll-smooth border-none bg-[#1f1f38] p-0 leading-7 text-white no-underline outline-none`}
    >
      <About />
      <CommunitiesFollowed />
      {nfts && <Items nfts={nfts.reverse()} />}
    </div>
  );
};

export default ProfilePage;
