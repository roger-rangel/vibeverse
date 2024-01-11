'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { Mixpanel } from '@/components/Mixpanel';

import Gallery from '../../../components/dashboard/aicontent/gallery';

import { AiFillStar } from 'react-icons/ai';
import { BsArrowUp } from 'react-icons/bs';

const creators = [
  {
    id: 1,
    creator: 'Monet',
    image: 'https://pbs.twimg.com/media/F70cK39W4AExd1F?format=jpg&name=large',
  },
  {
    id: 2,
    creator: 'Picasso',
    image: 'https://pbs.twimg.com/media/F7m2u04WwAAsx2E?format=jpg&name=large',
  },
  {
    id: 3,
    creator: 'Van Gogh',
    image: 'https://pbs.twimg.com/media/F7ShNV8XQAA1qMt?format=jpg&name=large',
  },
];

export default function Dashboard() {
  useEffect(() => {
    Mixpanel.track('Browsing page visited');
  }, []);

  return (
    <div className="mx-auto flex min-h-[inherit] flex-col gap-5 bg-[url('https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/blue_sky.png')] bg-cover px-4 pb-20  pt-8 sm:px-6 lg:px-8">
      <div className="relative mx-auto w-full items-center justify-center gap-1">
        <div className="min-h-full w-full gap-1 xs:flex xs:flex-wrap sm:grid sm:grid-cols-1 sm:grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
          <div className="relative flex flex-col justify-between overflow-hidden rounded-lg sm:h-full">
            <Image
              src="/images/dashboard/gate.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              width={1000}
              height={1000}
            />
            <div className="relative w-full">
              <div className="relative flex items-center justify-center sm:-mb-20 sm:w-full sm:p-12 ">
                <Image
                  src="/images/logos/white.png"
                  alt=""
                  className="h-32 w-64 object-cover object-center"
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
            <div className="relative w-full p-8 sm:p-12">
              <div className="mb-4">
                <h2 className="text-6xl text-white">Weekly AI TOP charts</h2>
              </div>
              <div className="flex justify-between pt-6">
                <div className="flex items-center">
                  <button className="rounded-full bg-lime-400 px-4 py-2 text-lg ">
                    <AiFillStar />
                  </button>
                  <h2 className="ml-2 text-base text-white">
                    Featured Community
                  </h2>
                </div>
                <Link
                  href="/dashboard/communities/white-mirror"
                  className="rounded-2xl border bg-white px-4 py-2 text-lg hover:cursor-pointer hover:bg-black hover:text-white"
                >
                  Enter
                </Link>
              </div>
            </div>
          </div>

          <div className="grid h-full w-full grid-cols-1 gap-y-2 xxs:mt-1 xxs:gap-y-1 xs:mt-0 sm:grid-cols-5 sm:gap-1">
            <div className=" col-span-1 flex h-full items-center justify-between overflow-hidden rounded-xl bg-gradient-to-b from-sky-950 to-violet-400 xxs:py-10 sm:col-span-1 sm:h-auto sm:flex-col sm:py-0">
              <Image
                src="/images/dashboard/hand.png"
                alt="Image"
                className="flex object-contain xxs:-ml-10 xxs:-mt-14 xxs:h-32 xs:-ml-8 xs:-mt-10 xs:h-36 sm:ml-0 "
                height={200}
                width={200}
              />
              <div className="flex flex-col">
                <span className="transform whitespace-nowrap text-white xxs:text-lg xs:text-2xl sm:-mb-4 sm:-rotate-90">
                  Become an AI Artist
                </span>
                <button className="mt-4 rounded-2xl border bg-white px-4 py-2 text-lg hover:bg-black hover:text-white sm:invisible">
                  Take me there
                </button>
              </div>

              <div className="flex flex-col">
                <button className="z-10 flex items-center justify-center rounded-full bg-sky-950 text-lg text-white xxs:invisible xs:-mb-6 sm:visible sm:-mb-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:-mb-8 lg:h-12 lg:w-12">
                  <BsArrowUp />
                </button>
                <button className="rounded-full bg-violet-700 text-lg xs:invisible sm:visible  sm:mb-4 sm:h-8 sm:w-8 md:mb-6 md:h-10 md:w-10 lg:mb-8 lg:h-12 lg:w-12"></button>
              </div>
            </div>

            <div className="col-span-3 grid grid-cols-1 gap-y-1 rounded-xl sm:col-span-3">
              <div
                className="h-48 rounded-xl bg-blue-200 sm:h-full"
                style={{
                  backgroundImage: "url('/images/dashboard/ai_tree.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
              <div
                className="h-48 rounded-xl bg-blue-200 sm:h-full"
                style={{
                  backgroundImage:
                    "url('/images/dashboard/curious_refuge.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="flex h-full flex-col items-center justify-between">
                  <button className="mt-10 rounded-2xl border bg-red-400 px-8 py-2 text-lg hover:bg-yellow-500 hover:text-white">
                    AI Film Course
                  </button>
                  <div className="flex h-12 w-full items-center justify-center bg-black bg-opacity-40">
                    <Image
                      src="/images/logos/curious.png"
                      alt="Image"
                      className="flex h-12 object-contain"
                      height={200}
                      width={200}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1 xs:grid-cols-1">
              <div className="flex h-16 items-center rounded-xl bg-gradient-to-b from-green-300 via-yellow-300 to-pink-300 xxs:h-32 xxs:items-center xxs:justify-center xxs:space-x-2 xs:flex-row sm:h-full sm:flex-col sm:space-x-0 sm:pt-4">
                {creators.map((item) => (
                  <div key={item.id} className="">
                    <Image
                      className="mx-auto rounded-full border border-white object-cover xxs:mb-0 xxs:h-12 xxs:w-12 xs:h-16 xs:w-16 sm:mb-2 sm:h-12 sm:w-12"
                      src={item.image}
                      height={200}
                      width={200}
                      alt=""
                    />
                  </div>
                ))}
                <h2 className="flex items-center justify-center text-slate-700 xs:pl-2 xs:text-5xl sm:py-4 sm:pl-0 sm:text-base">
                  Creators
                </h2>
              </div>

              <div className="grid grid-rows-3 gap-1 xxs:hidden sm:grid">
                <div className="flex h-40 items-center justify-center rounded-xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-400 to-rose-400 sm:h-full">
                  <h2 className=" py-4 text-base text-white">Shorts</h2>
                </div>
                <div className="flex h-20 items-center justify-center rounded-xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 to-emerald-400 sm:h-full">
                  <h2 className="py-4 text-base text-white">Top 10</h2>
                </div>
                <div className="flex h-20 items-center justify-center rounded-xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-300 to-purple-400 sm:h-full">
                  <h2 className="py-4 text-base text-slate-700">Courses</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* second row */}

      <Gallery />
    </div>
  );
}
