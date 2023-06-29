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
      <div className="absolute bottom-32 xs:w-3/4 md:w-1/2 mx-auto rounded-2xl ">
        <div className="h-full w-full flex flex-col items-center">
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
          <h1 className="text-base text-white mb-12">
            Open Beta Coming Soon | Free for Everybody
          </h1>
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
          src="/images/dashboard/learning_background.png"
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
