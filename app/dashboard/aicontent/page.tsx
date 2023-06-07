'use client';

import Image from 'next/image';

import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: '300',
  subsets: ['latin'],
});

const Modal = () => {
  return (
    <div
      className={`${poppins.className} z-50 flex items-center justify-center mx-2 pb-4 border`}
    >
      <div className="absolute bg-gray-900 top-20 px-8 sm:w-3/4 md:w-1/2 mx-auto rounded-2xl flex flex-col items-center border-4 border-indigo-500/75 hover:border-emerald-200">
        <h1 className="pt-8 mb-4 sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
          Early Access
        </h1>

        <h2 className="flex text-center items-center mt-4 -mb-4 pt-2 xs:text-base md:text-base lg:text-2xl font-semibold text-gray-200">
          signup for exclusive early-bird access
        </h2>

        <div className="flex h-40 w-full flex-row items-center justify-center">
          <button className="animate-border inline-block rounded-full bg-black bg-gradient-to-r hover:from-[#29ffc6] hover:via-[#00c3ff] hover:to-[#ffff1c] from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1">
            <span className="flex rounded-full bg-slate-900 px-5 py-3 text-center items-center justify-center font-bold text-white text-base">
              count me in
              <Image
                className="h-8 w-8 ml-2.5 -mr-2.5 rounded-full"
                aria-hidden="true"
                src="/images/dashboard/potion.gif"
                alt="logo"
                width={50}
                height={50}
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AIContent() {
  return (
    <div className={`mx-auto relative`}>
      <div className="h-screen mx-auto bg-gradient-to-r bg-black relative">
        <video
          autoPlay
          loop
          muted
          className="absolute z-1 min-w-full min-h-full object-cover"
          src={'/video/aicontent.mp4'}
        />
      </div>
      <Modal />
    </div>
  );
}
