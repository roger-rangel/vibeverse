'use client';

import Loading from './loading';
import { useEffect, useState } from 'react';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
});

const Modal = () => {
  return (
    <div
      className={`${roboto.className} z-50 flex items-center justify-center mx-2 pb-4 border`}
    >
      <div className="absolute bg-gray-900 top-60 xs:w-3/4 md:w-1/2 mx-auto rounded-2xl bg-gradient-to-r from-[#00F260] via-[#c471ed] to-[#0575E6] p-1 hover:border-emerald-200">
        <div className="h-full w-full bg-gray-800 rounded-2xl flex flex-col items-center">
          <h1 className="pt-8 mb-2 sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
            Early Access
          </h1>

          <h2 className="flex text-center items-center -mb-4 pt-2 xs:text-base md:text-md lg:text-base font-semibold text-gray-200">
            signup for exclusive early-bird access
          </h2>

          <div className="flex h-40 w-full flex-row items-center justify-center">
            <div className="animate-border inline-block rounded-full bg-black bg-gradient-to-r hover:from-[#29ffc6] hover:via-[#00c3ff] hover:to-[#ffff1c] from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1">
              <Link
                href="https://discord.gg/HgCafGhHxh"
                className="flex rounded-full bg-slate-900 px-10 py-4 text-center items-center justify-center font-bold text-white text-2xl"
              >
                Join Discord
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AIContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`mx-auto relative`}>
      <div className="h-screen mx-auto bg-gradient-to-r bg-black relative">
        <Image
          src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/rogerweb3_Full_body_Portrait_of_a_holy_knight_wearing_brilliant_a1a93237-61e0-469d-888a-915267415622.png"
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="Background"
        />
      </div>
      <Modal />
    </div>
  );
}
