'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { Mixpanel } from '@/components/Mixpanel';

// Dynamically import ReactPlayer with SSR turned off
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function Preview() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
        <div
          onClick={() => window.open('https://kaiber.ai/', '_blank')}
          className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2 border-4 border-[#38ef7d]"
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="relative top-20">
              <Image
                src={'/images/dashboard/lion.png'}
                alt={'kaiber'}
                className="h-full w-full object-cover object-center"
                width={200}
                height={200}
              />
            </div>
          </div>
          <div
            aria-hidden="true"
            className="bg-gradient-to-b from-transparent to-black opacity-50"
          />
          <div className="flex items-end p-6">
            <div>
              <p aria-hidden="true" className="mt-1 text-sm text-white">
                Creative AI Tools
              </p>
              <h3 className="font-semibold text-white">
                <a href="#">
                  <span className="absolute inset-0" />
                  New Arrivals
                </a>
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 rounded-lg">
          <div
            onClick={() =>
              window.open('https://www.whitemirror.xyz/', '_blank')
            }
            className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full"
          >
            <div className="h-full w-full bg-gray-800">
              <ReactPlayer
                url="https://player.vimeo.com/826634628"
                playing
                loop
                muted // Add the "muted" prop to mute the video
                style={{ position: 'absolute', top: 0, left: 0 }}
                config={{
                  vimeo: {
                    playerOptions: {
                      background: true,
                      muted: true,
                      autopause: false,
                      controls: false,
                      responsive: true,
                    },
                  },
                }}
              />
            </div>
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  White Mirror
                </p>
                <h3 className="font-semibold text-white">
                  <a
                    href="#"
                    onClick={() => {
                      Mixpanel.track('White Mirror join a community');
                    }}
                  >
                    <span className="absolute inset-0" />
                    Join a Community
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#89fffd] to-[#ef32d9] p-1 rounded-lg">
          <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
            <ReactPlayer
              url="https://player.vimeo.com/826638350"
              playing
              loop
              muted // Add the "muted" prop to mute the video
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0 }}
              config={{
                vimeo: {
                  playerOptions: {
                    background: true,
                    muted: true,
                    autopause: false,
                    controls: false,
                    responsive: true,
                  },
                },
              }}
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Weekly AI Talk Shows
                </p>
                <h3 className="font-semibold text-white">
                  <Link href="/dashboard/aicontent">
                    <span className="absolute inset-0" />
                    Explore AI Content
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
