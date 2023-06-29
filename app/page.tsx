'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mixpanel } from '@/components/Mixpanel';
import { Connect2ICProvider } from '@connect2ic/react';
import { useConnect } from '@connect2ic/react';
import { createClient } from '@connect2ic/core';
import { NFID } from '@connect2ic/core/providers/nfid';
import { AuthClient } from '@dfinity/auth-client';

function Login() {
  const [signedIn, setSignedIn] = useState(false);

  const { connect } = useConnect({
    onConnect: (data) => {
      setSignedIn(true);
      console.log(data);
    },
    onDisconnect: () => console.log('bye'),
  });

  useEffect(() => {
    AuthClient.create().then((authClient: any) => {
      console.log(authClient.getIdentity());
    });
  }, []);

  return (
    <div className="h-screen bg-gradient-to-r from-[#8360c3] to-[#2ebf91]">
      <Image
        src="/images/dashboard/error.png"
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
        <div className=" flex justify-center items-center h-screen">
          <div className="relative mx-auto max-w-9xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="items-center">
              <div className="flex text-center justify-center gap-4 mb-4 text-gray-200 items-center text-3xl backdrop-blur backdrop-brightness-75 p-2 rounded-xl">
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
              <h1 className="flex text-center justify-center text-7xl font-bold tracking-tight text-gray-200 backdrop-blur backdrop-brightness-75 p-2 rounded-xl">
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
              <p className="mt-4 mx-auto xs:text-xl sm:text-2xl text-center text-gray-200 p-2 backdrop-blur backdrop-brightness-75 rounded-xl lg:max-w-2xl ">
                Welcome to a vibrant ecosystem where you can seamlessly share,
                discover, and collaborate on AI-generated content in the Film
                Industry and beyond.
              </p>
              <div className="flex justify-center flex-col lg:max-w-lg mx-auto">
                {signedIn ? (
                  <>
                    <div className="flex space-x-4">
                      <Link
                        href="/dashboard"
                        className="mt-10 w-full button-guest flex justify-center text-cyan-950 font-bold py-2 rounded-3xl"
                      >
                        Go to the dashboard
                      </Link>
                      <Link
                        href="https://discord.gg/HgCafGhHxh"
                        className="mt-10 w-full button-discord flex justify-center text-cyan-950 font-bold py-2 rounded-3xl"
                      >
                        Join Discord
                      </Link>
                    </div>
                    <button
                      onClick={() => {
                        window.indexedDB.deleteDatabase('auth-client-db');
                        window.localStorage.clear();
                        window.location.reload();
                      }}
                      className="mt-10 w-full button-signin text-cyan-950 font-bold py-2 rounded-3xl"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        connect(new NFID().meta.id);
                      }}
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default function LoginPage() {
  const client = createClient({
    providers: [new NFID()],
    globalProviderConfig: {
      dev: false,
    },
  });

  useEffect(() => {
    Mixpanel.track('Landing page');
  });

  return (
    <Connect2ICProvider client={client}>
      <Login />
    </Connect2ICProvider>
  );
}
