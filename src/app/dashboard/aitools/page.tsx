'use client';

import { Roboto } from 'next/font/google';
import Link from 'next/link';

const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
});

export default function AITools() {
  return (
    <div
      className={
        roboto.className +
        " relative min-h-[inherit] bg-[url('https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/tools_background_copy.png')] bg-cover"
      }
    >
      <div className="top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute bg-gray-900 max-w-xs md:max-w-lg w-full mx-auto rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-2 hover:border-emerald-200">
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
}
