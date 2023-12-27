'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useConnect, useDialog } from '@connect2ic/react';

import { Mixpanel } from '@/components/Mixpanel';

function Login() {
  const { isConnected, disconnect } = useConnect();
  const dialog = useDialog();

  return (
    <div className="h-screen bg-gradient-to-r from-[#8360c3] to-[#2ebf91]">
      <Image
        src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/login_background_copy.png"
        layout="fill"
        objectFit="cover"
        quality={100}
        alt="Background"
      />
      <header className="h-screen relative overflow-hidden">
        {/* Hero section */}
        <div className="flex absolute gap-4 left-2 top-2 -z-10">
          <Link href="/dashboard">
            <p className="flex ml-2 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit static w-auto rounded-xl lg:border bg-gray-200 xs:p-4 xs:py-2 lg:p-4 lg:py-2">
              1
            </p>
          </Link>
          <Link href="/dashboard/aitools">
            <p className="flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit static w-auto rounded-xl lg:border bg-gray-200 xs:p-4 xs:py-2 lg:p-4 lg:py-2">
              2
            </p>
          </Link>
          <Link href="/dashboard/browse">
            <p className="flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit static w-auto rounded-xl lg:border bg-gray-200 xs:p-4 xs:py-2 lg:p-4 lg:py-2">
              3
            </p>
          </Link>
          <Link href="/dashboard/upload">
            <p className="flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit static w-auto rounded-xl lg:border bg-gray-200 xs:p-4 xs:py-2 lg:p-4 lg:py-2">
              4
            </p>
          </Link>
          <Link href="/dashboard/mycommunity">
            <p className="flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit static w-auto rounded-xl lg:border bg-gray-200 xs:p-4 xs:py-2 lg:p-4 lg:py-2">
              5
            </p>
          </Link>
          <Link href="/dashboard/profile">
            <p className="flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit static w-auto rounded-xl lg:border bg-gray-200 xs:p-4 xs:py-2 lg:p-4 lg:py-2">
              6
            </p>
          </Link>
        </div>
        <div className=" flex justify-center items-center h-screen">
          {/* <div className="relative mx-auto max-w-9xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="items-center">
              <div className="flex text-center justify-center gap-4 mb-4 text-gray-200 items-center text-3xl backdrop-blur backdrop-brightness-75 p-2 rounded-xl border">
                <Image
                  src="/images/logos/vibeverse.png"
                  alt="logo"
                  width={150}
                  height={50}
                />
                +{' '}
                <Image
                  src="/images/logos/segenie.png"
                  alt="logo"
                  width={150}
                  height={150}
                  className="ml-2"
                />
              </div>
              <h1 className="flex text-center justify-center text-7xl font-bold tracking-tight text-gray-200 backdrop-blur backdrop-brightness-75 p-2 rounded-xl border">
                Creative AI + Web3
              </h1>
              <div className="relative lg:hidden mt-6">
                <Image
                  src="/images/dashboard/magical_place.png"
                  alt="logo"
                  className="h-44 w-full rounded-2xl object-cover mb-10"
                  width={1000}
                  height={100}
                />
              </div>
              <p className="mt-4 mx-auto xs:text-xl sm:text-2xl text-center text-gray-200 p-2 backdrop-blur backdrop-brightness-75 rounded-xl lg:max-w-2xl border">
                Welcome to a vibrant ecosystem where you can seamlessly share,
                discover, and collaborate on AI-generated content in the Film
                Industry and beyond.
              </p>
              <div className="flex justify-center flex-col  mx-auto">
                {isConnected ? (
                  <>
                    <div className="flex space-x-4">
                      <Link
                        href="/dashboard"
                        className="mt-10 w-full button-guest flex justify-center text-emerald-800 font-bold py-2 rounded-3xl border"
                      >
                        Go to the dashboard
                      </Link>
                      <Link
                        href="https://discord.gg/HgCafGhHxh"
                        className="mt-10 w-full button-discord flex justify-center text-teal-300 font-bold py-2 rounded-3xl border"
                      >
                        Join Discord
                      </Link>
                    </div>
                    <button
                      onClick={() => {
                        disconnect();
                        dialog.close();
                      }}
                      className="mt-10 w-full button-signin text-cyan-950 font-bold py-2 rounded-3xl border"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => dialog.open()}
                      className="mt-10 w-full button-signin text-stone-100 font-bold py-2 rounded-3xl border "
                    >
                      Sign in
                    </button>

                    <div className="flex space-x-4">
                      <Link
                        href="/dashboard"
                        className="mt-10 w-full button-guest flex justify-center text-emerald-800 font-bold py-2 rounded-3xl border"
                      >
                        Continue as Guest
                      </Link>
                      <Link
                        href="https://discord.gg/HgCafGhHxh"
                        className="mt-10 w-full button-discord flex justify-center text-teal-300 font-bold py-2 rounded-3xl border"
                      >
                        Join Discord
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div> */}
          <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute bg-gray-900 max-w-xs md:max-w-lg w-full mx-auto rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 hover:border-emerald-200">
            <div className="h-full w-full bg-gray-800 rounded-2xl flex flex-col items-center">
              <h1 className="pt-8 mb-2 sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
            Welcome
              </h1>

              <h2 className="flex text-center items-center -mb-4 pt-2 xs:text-base md:text-md lg:text-base font-semibold text-gray-200">
            Early entry to next-gen AI creative learning.
              </h2>

              <div className="flex h-40 w-full flex-row items-center justify-center">
                <div className="animate-border inline-block rounded-full bg-black bg-gradient-to-r hover:from-[#29ffc6] hover:via-[#00c3ff] hover:to-[#ffff1c] from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1">
                  <Link
                    href="https://www.vibeverse.ai"
                    className="flex rounded-full bg-slate-900 px-10 py-4 text-center items-center justify-center font-bold text-white text-2xl"
                  >
                Enter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default function LoginPage() {
  useEffect(() => {
    Mixpanel.track('Landing page');
  });

  return <Login />;
}
