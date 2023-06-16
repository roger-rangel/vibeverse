'use client';

import Image from 'next/image';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
});

const Modal = () => {
  return (
    <div
      className={`${roboto.className} z-50 flex items-center justify-center mx-2 pb-4 border`}
    >
      <div className="absolute bg-gray-900 top-20 xs:w-3/4 md:w-1/2 mx-auto rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 hover:border-emerald-200">
        <div className="h-full w-full bg-gray-800 rounded-2xl flex flex-col items-center">
          <h1 className="pt-8 mb-2 sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
            Early Access
          </h1>

          <h2 className="flex text-center items-center -mb-4 pt-2 xs:text-base md:text-md lg:text-base font-semibold text-gray-200">
            signup for exclusive early-bird access
          </h2>

          <div className="flex h-40 w-full flex-row items-center justify-center">
            <button className="animate-border inline-block rounded-full bg-black bg-gradient-to-r hover:from-[#29ffc6] hover:via-[#00c3ff] hover:to-[#ffff1c] from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1">
              <span className="flex rounded-full bg-slate-900 px-10 py-4 text-center items-center justify-center font-bold text-white text-2xl">
                Join Discord
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AITools() {
  return (
    <div className={`mx-auto relative`}>
      <div className="h-screen mx-auto bg-gradient-to-r bg-black relative">
        <Image
          src="/images/dashboard/magical_place.png"
          alt=""
          className="h-full w-full object-cover object-center"
          height={1000}
          width={1000}
        />
      </div>
      <Modal />
    </div>
  );
}
