'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mixpanel } from '@/components/Mixpanel';
import ImageSlider from '../components/login/imageSlider';
import { Connect2ICProvider } from '@connect2ic/react';
import { useConnect } from '@connect2ic/react';
import { createClient } from '@connect2ic/core';
import { NFID } from '@connect2ic/core/providers/nfid';

const images1 = [
  '/images/imageSlider/1/planets.png',
  '/images/imageSlider/1/morocco.png',
  '/images/imageSlider/1/green.png',
  '/images/imageSlider/1/world.png',
  '/images/imageSlider/1/house_ballons.png',
  '/images/imageSlider/1/fantasy.png',
  '/images/imageSlider/1/italy.png',
  '/images/imageSlider/1/atlantis.png',
];

const images2 = [
  '/images/imageSlider/2/pink.png',
  '/images/imageSlider/2/aztec.png',
  '/images/imageSlider/2/desert.png',
  '/images/imageSlider/2/train.png',
  '/images/imageSlider/2/amazon.png',
  '/images/imageSlider/2/castle.png',
  '/images/imageSlider/2/mystery.png',
];

function Login() {
  useEffect(() => {
    console.log('');
  }, []);

  const { connect } = useConnect({
    onConnect: () => console.log('hello'),
    onDisconnect: () => console.log('bye'),
  });

  return (
    <div className="h-screen bg-slate-950">
      <video
        autoPlay
        loop
        muted
        className="absolute z-1 min-w-full min-h-full object-cover"
        src={'/video/astronaut_kayak.mp4'}
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
          <Link href="/dashboard/aicontent">
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
        <div className="pt-16 sm:pt-24 lg:pt-32">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="lg:max-w-lg items-center">
              <div className="flex text-center justify-center gap-4 mb-4 text-gray-200 items-center text-3xl">
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
              <h1 className="flex text-center justify-center text-5xl font-bold tracking-tight text-gray-200">
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
              <p className="mt-4 text-xl text-gray-200 p-2 pl-4 backdrop-blur rounded-xl">
                Welcome to a vibrant ecosystem where users can seamlessly share,
                discover, and collaborate on AI-generated content in the Film
                Industry and beyond.
              </p>
              <div className="mx-8">
                <button
                  onClick={() => connect(new NFID().meta.id)}
                  className="mt-10 w-full button-signin text-cyan-950 font-bold py-2 rounded-3xl"
                >
                  Sign in
                </button>
                <div className="flex space-x-4">
                  <Link
                    href="/dashboard"
                    className="mt-10 w-full button-guest flex justify-center text-cyan-950 font-bold py-2 rounded-3xl"
                  >
                    Continue as Guest
                  </Link>
                  <Link
                    href="https://discord.gg/HgCafGhHxh"
                    className="mt-10 w-full button-discord flex justify-center text-cyan-950 font-bold py-2 rounded-3xl"
                  >
                    Join Discord
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl "
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8 hidden lg:block">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div
                        className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8 mt-40 overflow-hidden h-screen animation-linear animation-infinite"
                        style={{
                          animationName: 'moveUp',
                          animationDuration: '5s',
                        }}
                      >
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-full">
                          <ImageSlider
                            images={images1}
                            duration={4}
                            startOffset={0}
                          />
                        </div>
                      </div>

                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="absolute left-72 top-1/2 transform -translate-y-1/2 w-full h-full">
                          <ImageSlider
                            images={images2}
                            duration={3}
                            startOffset={-25}
                          />
                        </div>
                      </div>

                      {/* this div should not deleted yet, its keeping the carousel slider working. I will delete later on */}
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/"
                            alt=""
                            className="h-full w-full object-cover object-center hidden"
                            height={100}
                            width={100}
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/"
                            alt=""
                            className="h-full w-full object-cover object-center hidden"
                            height={100}
                            width={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
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
  const client = createClient({ providers: [new NFID()] });

  useEffect(() => {
    Mixpanel.track('Landing page');
  });

  return (
    <Connect2ICProvider client={client}>
      <Login />
    </Connect2ICProvider>
  );
}
