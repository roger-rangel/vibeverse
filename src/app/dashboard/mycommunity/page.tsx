'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Roboto } from 'next/font/google';
import { Mixpanel } from '@/components/Mixpanel';

const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
});

export default function MyCommunity() {
  return (
    <div
      className={
        roboto.className +
        " relative min-h-[inherit] bg-[url('/images/dashboard/sofa.png')] bg-cover"
      }
    >
      <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute bg-gray-900 xs:w-3/4 md:w-1/2 mx-auto rounded-2xl bg-gradient-to-r from-[#29ffc6] via-[#00c3ff] to-yellow-200 p-1 hover:border-emerald-200">
        <div className="h-full w-full bg-gray-800 rounded-2xl flex flex-col items-center">
          <Image
            src="/images/logos/white.png"
            alt=""
            width={200}
            height={200}
          />
          <h2 className="flex text-center items-center -mb-4 pt-2 px-8 xs:text-base md:text-2xl lg:text-2xl font-semibold text-gray-300">
            Join the White Mirror community and push the limits of AI in content
            creation.
          </h2>

          <div className="flex h-40 w-full flex-row items-center justify-center">
            <div className="animate-border inline-block rounded-full bg-black bg-gradient-to-r hover:from-[#29ffc6] hover:via-[#00c3ff] hover:to-[#ffff1c] from-purple-500 via-purple-100 to-blue-500 bg-[length:400%_400%] p-1">
              <Link
                onClick={() => {
                  Mixpanel.track('Getting redirected to White Mirror discord');
                }}
                href="https://discord.gg/yRNSEWxEUM"
                className="flex rounded-full bg-slate-900 px-10 py-4 text-center items-center justify-center font-bold text-white text-2xl"
              >
                Join now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
