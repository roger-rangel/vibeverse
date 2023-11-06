'use client';

import Image from 'next/image';
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
    <div className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-5 pt-8 pb-20  min-h-[inherit] bg-cover bg-[url('/images/dashboard/test_background.png')]">
      <div className="relative w-full justify-center items-center mx-auto gap-1">
        <div className="xs:flex xs:flex-wrap min-h-full w-full sm:grid sm:grid-cols-1 sm:grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-1">
          <div className="relative rounded-lg flex flex-col justify-between sm:h-full overflow-hidden">
            <Image
              src="/images/dashboard/gate.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              width={1000}
              height={1000}
            />
            <div className="relative w-full">
              <div className="relative flex justify-center items-center sm:w-full sm:-mb-20 sm:p-12 ">
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
                  <button className="bg-lime-400 px-4 py-2 rounded-full text-lg ">
                    <AiFillStar />
                  </button>
                  <h2 className="ml-2 text-white text-base">
                    Featured Community
                  </h2>
                </div>
                <button className="bg-white hover:bg-black hover:text-white px-4 border py-2 rounded-2xl text-lg">
                  Enter
                </button>
              </div>
            </div>
          </div>

          <div className="h-full w-full grid grid-cols-1 sm:grid-cols-5 xxs:gap-y-1 sm:gap-1 gap-y-2 xxs:mt-1 xs:mt-0">
            <div className=" col-span-1 sm:col-span-1 bg-gradient-to-b from-sky-950 to-violet-400 rounded-xl flex sm:flex-col items-center justify-between overflow-hidden h-full xxs:py-10 sm:py-0 sm:h-auto">
              <Image
                src="/images/dashboard/hand.png"
                alt="Image"
                className="flex xxs:h-32 xs:h-36 object-contain xxs:-ml-10 xs:-ml-8 xxs:-mt-14 xs:-mt-10 sm:ml-0 "
                height={200}
                width={200}
              />
              <div className="flex flex-col">
                <span className="text-white transform sm:-rotate-90 whitespace-nowrap sm:-mb-4 xxs:text-lg xs:text-2xl">
                  Become an AI Artist
                </span>
                <button className="bg-white hover:bg-black hover:text-white px-4 border py-2 rounded-2xl text-lg mt-4 sm:invisible">
                  Take me there
                </button>
              </div>

              <div className="flex flex-col">
                <button className="bg-sky-950 flex items-center justify-center xxs:invisible sm:visible sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-full text-lg xs:-mb-6 sm:-mb-6 lg:-mb-8 z-10 text-white">
                  <BsArrowUp />
                </button>
                <button className="bg-violet-700 xs:invisible sm:visible sm:h-8 sm:w-8  md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-full text-lg sm:mb-4 md:mb-6 lg:mb-8"></button>
              </div>
            </div>

            <div className="col-span-3 sm:col-span-3 rounded-xl grid grid-cols-1 gap-y-1">
              <div
                className="bg-blue-200 rounded-xl h-48 sm:h-full"
                style={{
                  backgroundImage: "url('/images/dashboard/ai_tree.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
              <div
                className="bg-blue-200 rounded-xl h-48 sm:h-full"
                style={{
                  backgroundImage:
                    "url('/images/dashboard/curious_refuge.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="flex flex-col items-center justify-between h-full">
                  <button className="bg-red-400 hover:bg-yellow-500 hover:text-white px-8 border py-2 rounded-2xl text-lg mt-10">
                    AI Film Course
                  </button>
                  <div className="bg-black bg-opacity-40 flex h-12 w-full items-center justify-center">
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

            <div className="grid grid-cols-1 xs:grid-cols-1 gap-1">
              <div className="bg-gradient-to-b from-green-300 via-yellow-300 to-pink-300 rounded-xl h-16 sm:h-full sm:pt-4 flex xs:flex-row xxs:items-center xxs:justify-center items-center sm:flex-col xxs:h-32 xxs:space-x-2 sm:space-x-0">
                {creators.map((item) => (
                  <div key={item.id} className="">
                    <Image
                      className="mx-auto xxs:h-12 xxs:w-12 xs:h-16 xs:w-16 sm:h-12 sm:w-12 rounded-full object-cover xxs:mb-0 sm:mb-2 border border-white"
                      src={item.image}
                      height={200}
                      width={200}
                      alt=""
                    />
                  </div>
                ))}
                <h2 className="flex text-slate-700 items-center justify-center xs:text-5xl sm:text-base xs:pl-2 sm:pl-0 sm:py-4">
                  Creators
                </h2>
              </div>

              <div className="grid grid-rows-3 xxs:hidden sm:grid gap-1">
                <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-400 to-rose-400 rounded-xl h-40 sm:h-full flex justify-center items-center">
                  <h2 className=" text-white text-base py-4">Shorts</h2>
                </div>
                <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 to-emerald-400 rounded-xl h-20 sm:h-full flex justify-center items-center">
                  <h2 className="text-white text-base py-4">Top 10</h2>
                </div>
                <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-300 to-purple-400 rounded-xl h-20 sm:h-full flex justify-center items-center">
                  <h2 className="text-slate-700 text-base py-4">Courses</h2>
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
