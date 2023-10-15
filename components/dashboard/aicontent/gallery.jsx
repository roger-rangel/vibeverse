'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useEffect } from 'react';
import { Mixpanel } from '@/components/Mixpanel';
import Modal_Content from './modal_content';
import { FaShare } from 'react-icons/fa';

const randomBackground = [
  'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-white',
  'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white',
  'bg-gradient-to-r from-orange-300 to-rose-300 text-stone-700',
  'bg-gradient-to-r from-emerald-500 to-lime-600 text-white',
  'bg-gradient-to-r from-gray-100 to-gray-300 text-stone-700',
  'bg-gradient-to-tr from-green-300 via-blue-500 to-purple-600 text-white',
  'bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-stone-700',
  'bg-gradient-to-r from-cyan-200 to-cyan-400 text-stone-700',
  'bg-gradient-to-r from-teal-200 to-lime-200 text-stone-700',
  'bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r text-white',
  'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white',
  'bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-300 via-green-400 to-rose-700 text-stone-700',
];

const data = [
  {
    id: 1,
    creator: 'Monet',
    title: 'Krishna AI Art',
    views: 750,
    profileImage:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/creator_3.png',
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/krishna.png',
    communities: [
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/white_miorror.png',
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/curious-1.png',
    ],
    awards: [
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_4.png',
    ],
    ai_tools: [
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/hugging.png',
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/kaiber_2.png',
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/ilumine.png',
    ],
    emoticons: [
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/psychedelic_heart.gif',
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/gradient_donut.gif',
    ],
  },
];

export default function Gallery() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [modal, showModal] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    Mixpanel.track('AI Gallery Viewed');
  }, []);

  return (
    <>
      <div className="h-screen mx-auto relative">
        <div className="mx-auto bg-gradient-to-r bg-black relative rounded-xl">
          <Image
            src="/images/dashboard/test_background.png"
            layout="fill"
            objectFit="cover"
            quality={1000}
            alt="Background"
          />
          <div className="relative w-full justify-center items-center mx-auto px-4  pt-8 sm:px-6 lg:px-8 gap-1">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-1">
              {data.map((item, index) => {
                const randomIndex = Math.floor(
                  Math.random() * randomBackground.length,
                );
                item.randomIndex = randomIndex;
                return (
                  <div
                    key={item.id}
                    className="pb-1 relative cursor-pointer"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => {
                      setSelected(item);
                      showModal(true);
                    }}
                  >
                    <Image
                      src={item.image}
                      layout="responsive"
                      width={500}
                      height={500}
                      quality={1000}
                      alt="Background"
                      className="rounded-xl w-full object-cover xxs:min-h-[400px] xxs:max-h-[580px]  lg:min-h-[200px]"
                    />

                    <div className="absolute inset-0 mb-1">
                      <div className="flex flex-col justify-between h-full">
                        <div className="w-full flex justify-between p-3">
                          <Image
                            className="xxs:h-16 xxs:w-16 sm:h-12 sm:w-12 rounded-full object-cover xs:mb-0 sm:mb-2 border border-white"
                            src={item.profileImage}
                            height={200}
                            width={200}
                            alt=""
                          />
                          {hoveredItem === item.id && (
                            <button className="bg-sky-950 flex items-center justify-center xxs:invisible md:visible sm:h-12 sm:w-12 rounded-full text-lg xs:-mb-6 sm:-mb-6 lg:-mb-8 z-10 text-white border-2 border-green-500/100">
                              <FaShare />
                            </button>
                          )}
                        </div>
                        {/* bg-black, next div */}
                        <div className="w-full flex flex-col justify-between px-3 bottom-0">
                          <div className="flex text-blue-200 bottom-0 items-end justify-between pb-2">
                            <div
                              className={`${
                                randomBackground[
                                  index % randomBackground.length
                                ]
                              } py-2 px-4 rounded-xl`}
                            >
                              <h2 className="text-base">{item.title}</h2>
                            </div>

                            <div className="bg-slate-800 py-2 px-4 rounded-full text-xs">
                              {item.views} Views
                            </div>
                          </div>
                          <div className="flex justify-between bg-black bg-opacity-40 px-2 rounded-t-lg">
                            {/* bg-red-300 side, next div */}
                            <div className="flex flex-col items-start py-2">
                              <div className="flex gap-2 items-center mb-2 justify-center ml-1">
                                {item.communities &&
                                  item.communities.map((community, index) => (
                                    <Image
                                      key={index}
                                      className="xxs:h-10 xxs:w-10 sm:h-6 sm:w-6 rounded-full object-cover border border-white"
                                      src={community}
                                      height={200}
                                      width={200}
                                      alt=""
                                    />
                                  ))}
                                <button className="bg-sky-950 flex items-center justify-center rounded-full w-12 h-6 text-xs z-1 text-white">
                                  <div className="mr-1">+ 2</div>
                                  <div className="">
                                    <Image
                                      className="xxs:h-4 xxs:w-4 rounded-full object-cover"
                                      src={
                                        'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/community.png'
                                      }
                                      height={200}
                                      width={200}
                                      alt=""
                                    />
                                  </div>
                                </button>
                              </div>
                              <div className="flex items-center">
                                {item.awards &&
                                  item.awards.map((award, index) => (
                                    <Image
                                      key={index}
                                      className="xxs:h-12 xxs:w-12 sm:h-8 sm:w-8 rounded-full object-cover"
                                      src={award}
                                      height={200}
                                      width={200}
                                      alt=""
                                    />
                                  ))}
                                <button className="bg-sky-950 flex items-center justify-center rounded-full w-12 h-6 text-xs z-1 text-white">
                                  <div className="mr-1">+ 4</div>
                                  <div className="">
                                    <Image
                                      className="xxs:h-4 xxs:w-4 rounded-full object-cover"
                                      src={
                                        'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/winner.png'
                                      }
                                      height={200}
                                      width={200}
                                      alt=""
                                    />
                                  </div>
                                </button>
                              </div>
                            </div>
                            {/* bg-green-300 side, next div */}
                            <div className=" py-2 flex flex-col justify-between">
                              <div className="flex gap-1 items-center justify-end">
                                {item.ai_tools &&
                                  item.ai_tools.map((tool, index) => (
                                    <Image
                                      key={index}
                                      className="xxs:h-10 xxs:w-10 sm:h-6 sm:w-6 object-cover"
                                      src={tool}
                                      height={200}
                                      width={200}
                                      alt=""
                                    />
                                  ))}
                                <button className="bg-sky-950 flex items-center justify-center rounded-full w-12 h-6 text-xs z-1 text-white">
                                  <div className="mr-1">+ 2</div>
                                  <div className="">
                                    <Image
                                      className="xxs:h-4 xxs:w-4 rounded-full object-cover"
                                      src={
                                        'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/magic-wand.png'
                                      }
                                      height={200}
                                      width={200}
                                      alt=""
                                    />
                                  </div>
                                </button>
                              </div>
                              <div className="flex gap-1 items-center justify-end">
                                {item.emoticons &&
                                  item.emoticons.map((emoticon, index) => (
                                    <button
                                      key={index}
                                      className="bg-sky-950 px-2 py-1 flex items-center justify-center rounded-full text-xs z-1 text-stone-300 gap-1 border border-indigo-500"
                                    >
                                      <Image
                                        key={index}
                                        className="xxs:h-6 xxs:w-6 sm:h-4 sm:w-4 rounded-full object-cover"
                                        src={emoticon}
                                        height={200}
                                        width={200}
                                        alt=""
                                      />
                                      12
                                    </button>
                                  ))}
                                <button className="bg-sky-950 flex items-center justify-center rounded-full w-6 h-6 text-xs z-1 text-white pb-0.5">
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Modal_Content selected={selected} showModal={showModal} />
        </div>
      )}
    </>
  );
}
