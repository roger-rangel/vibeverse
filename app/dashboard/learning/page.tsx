'use client';

import { Roboto } from 'next/font/google';
import Link from 'next/link';

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
            <Link
              href="https://discord.gg/HgCafGhHxh"
              className="flex rounded-full bg-slate-900 px-10 py-4 text-center items-center justify-center font-bold text-white text-2xl"
            >
              Join Discord
            </Link>
          </div>
          <h1 className="text-base text-white">
            Open Beta Coming Soon | Free for Everybody
          </h1>
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
          src={'/video/learning.mp4'}
        />
      </div>
      <Modal />
    </div>
  );
}
