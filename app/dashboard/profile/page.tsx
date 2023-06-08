'use client';

import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: '300',
  subsets: ['latin'],
});

import About from '@/components/dashboard/profile/about';

const ProfilePage = () => {

  return (
    <>
      <div
        className={`${poppins.className} bg-[#1f1f38] text-white m-0 p-0 border-none outline-none box-border list-none no-underline scroll-smooth leading-7 profile`}
      >
        <About />

   
      </div>
    </>
  );
};

export default ProfilePage;
