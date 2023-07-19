'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { Mixpanel } from '@/components/Mixpanel';

import Gallery from '../../../components/dashboard/aicontent/gallery';

import { AiFillStar } from "react-icons/ai";
import { BsArrowUp } from "react-icons/bs";

import { Wallpoet } from 'next/font/google';

const wallpoet = Wallpoet({
  subsets: ['latin'],
  weight: ['400'],
});

const data = [
  {
    id: 1,
    creator: 'Monet',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/user_1.png',
  },
  {
    id: 2,
    creator: 'Picasso',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/user_2.png',
  },
  {
    id: 3,
    creator: 'Van Gogh',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/user_3.png',
  },
];

export default function Dashboard() {
  useEffect(() => {
    Mixpanel.track('AI Content Test visited');
  }, []);

  return (
    <div className="h-screen mx-auto relative">
      <div className=" mx-auto bg-gradient-to-r  relative rounded-xl">
        <Image
          src="/images/dashboard/test_background.png"
          layout="fill"
          objectFit="cover"
          quality={1000}
          alt="Background"
        /> 
        <div className="relative w-full justify-center items-center mx-auto px-4  pt-8 sm:px-6 lg:px-8 gap-1">
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
                  <h2 className="text-6xl text-white">weekly ai top charts</h2>
                </div>
                <div className="flex justify-between pt-6">
                  <div className="flex items-center">
                    <button className="bg-lime-400 px-4 py-2 rounded-full text-lg "><AiFillStar /></button>
                    <h2 className="ml-2 text-white text-base">Featured Community</h2>
                  </div>
                  <button className="bg-white hover:bg-black hover:text-white px-4 border py-2 rounded-2xl text-lg">Enter</button>           

                </div>
              </div>
            </div>

            <div className="h-full w-full grid grid-cols-1 sm:grid-cols-5 xs:gap-y-1 sm:gap-1 gap-y-2">
              <div className=" col-span-1 sm:col-span-1 bg-gradient-to-b from-sky-950 to-violet-400 rounded-xl flex sm:flex-col items-center justify-between overflow-hidden h-full xs:py-10 sm:py-0 sm:h-auto"> 
                <Image
                  src="/images/dashboard/hand.png"
                  alt="Image"
                  className="flex h-36 object-contain sm:-mt-8 xs:-ml-8 sm:ml-0 xs:-mt-14"
                  height={200}
                  width={200}
                />
                <div className="flex flex-col">
                  <span className="text-white transform sm:-rotate-90 whitespace-nowrap sm:-mb-4">Become an AI Artist</span>
                  <button className="bg-white hover:bg-black hover:text-white px-4 border py-2 rounded-2xl text-lg mt-4 sm:invisible">Take me there</button>     
                </div>
      
                <div className="flex flex-col">   
                  <button className="bg-sky-950 flex items-center justify-center xs:invisible sm:visible sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-full text-lg xs:-mb-6 sm:-mb-6 lg:-mb-8 z-10 text-white"><BsArrowUp /></button>
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
                    backgroundRepeat: 'no-repeat'
                  }}
                ></div>
                <div 
                  className="bg-blue-200 rounded-xl h-48 sm:h-full" 
                  style={{ 
                    backgroundImage: "url('/images/dashboard/curious_refuge.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <div className="flex flex-col items-center justify-between h-full">
                    <button className="bg-red-400 hover:bg-yellow-500 hover:text-white px-8 border py-2 rounded-2xl text-lg mt-10">AI Film Course</button>  
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
                <div className="bg-gradient-to-b from-green-300 via-yellow-300 to-pink-300 rounded-xl h-16 sm:h-full sm:pt-4 flex xs:flex-row xs:items-center xs:justify-center items-center sm:flex-col xs:h-32 xs:space-x-2 sm:space-x-0">
                  {data.map((item) => (
                    <div key={item.id} className="">
                      <Image
                        className="mx-auto xs:h-16 xs:w-16 sm:h-12 sm:w-12 rounded-full object-cover xs:mb-0 sm:mb-2 border border-white"
                        src={item.image}
                        height={200}
                        width={200}
                        alt=""
                      />          
                    </div>
                  ))}
                  <h2 className="flex text-slate-700 items-center justify-center xs:text-5xl sm:text-base xs:pl-2 sm:pl-0 sm:py-4">Creators</h2>
                </div>

                <div className="grid grid-rows-3 xs:hidden sm:grid gap-1">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 sm:px-6 lg:px-8 gap-1 pt-1 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            <div className="col-span-1">
              <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black relative flex justify-between items-center rounded-lg h-full sm:h-48">
                <Image
                  className="max-w-[60%]"
                  src={'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/NFT_ticket-removebg-preview.png'}
                  height={200}
                  width={200}
                  alt=""
                />  
                <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mx-auto xs:h-16 xs:w-16 sm:h-14 sm:w-14 rounded-full object-cover border border-white flex items-center justify-center text-white text-base sm:text-sm xs:text-2xl">
                  NFT
                </span>     
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-gradient-to-l from-pink-300 via-purple-300 to-indigo-400 relative flex flex-col rounded-lg h-full sm:h-48 items-center justify-center">
                {/* <span className="bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700 text-9xl xs:h-16 xs:w-16 sm:h-32 sm:w-32 rounded-full border-white flex items-center justify-center text-white xs:text-2xl">
                  <BsArrowDown />
                </span>      */}
                <Image
                  className="max-w-[80%]"
                  src={'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_5.png'}
                  height={200}
                  width={200}
                  alt=""
                />  
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            <div className="col-span-1">
              <div
                className="bg-gradient-to-r from-fuchsia-600 to-pink-600 relative flex flex-col items-center justify-center rounded-lg h-full sm:h-48"
                style={{ 
                  backgroundImage: "url('https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trailer.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}>
                <h2 className={`${wallpoet.className} text-white xs:text-4xl sm:text-base md:text-lg bg-black bg-opacity-40 w-full flex items-center justify-center py-8`}>AI CHALLENGES</h2>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-gradient-to-r from-rose-100 to-teal-100 relative flex flex-col items-center justify-center rounded-lg h-full sm:h-48 overflow-hidden">
                <Image
                  className="max-w-[80%] rounded-2xl "
                  src={'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/image.png'}
                  height={200}
                  width={200}
                  alt=""
                />  
              </div>
            </div>
          </div>
        </div>

        {/* third row */}

        <Gallery />


                  
      </div>
    </div>
  );

}

