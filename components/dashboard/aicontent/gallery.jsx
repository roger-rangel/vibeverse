'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useEffect } from 'react';
import { Mixpanel } from '@/components/Mixpanel';

import { BsArrowsFullscreen, BsBrushFill } from "react-icons/bs";
import { FaShare } from "react-icons/fa";

const data = [
  {
    id: 1,
    creator: 'Monet',
    title: 'The AI Girl',
    profileImage: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/creator_10.png',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/ai_influencer.png',
    communities: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/white_miorror.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/curious-1.png'],
    awards: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_1.png'],
    ai_tools: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/adobe_cloud.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/chatgpt.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/midjourney_1_1.png'],
    emoticons: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/kirby_dance.gif', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/pink_heart.gif']
  },
  {
    id: 2,
    creator: 'Picasso',
    title: 'Naruto\'s Dream',
    profileImage: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/creator_4.png',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/landscape.png',
    communities: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/white_miorror.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/curious-1.png'],
    awards: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_3.png'],
    ai_tools: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/runway.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/dreamstudio.avif', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/topaz.png'],
    emoticons: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/party-blob.gif', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/psychodelic_hands.gif']
  },
  {
    id: 3,
    creator: 'Van Gogh',
    title: 'Universe Battles',
    profileImage: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/creator_1.png',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/user_3.png ',
    communities: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/white_miorror.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/curious-1.png'],
    awards: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/58gdsfg_A_matte_gold_trophy_icon_smooth_textured_cup_outline_wh_bb101e0d-ac08-4551-a5bb-8e6df892ae8d-removebg-preview.png'],
    ai_tools: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/runway.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/dreamstudio.avif'],
    emoticons: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/psychedelic_heart.gif', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/gradient_donut.gif']
  },
  {
    id: 4,
    creator: 'Monet',
    title: 'Music Album Cover',
    profileImage: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/creator_8.png',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/artworks-000365885514-ln1u97-t500x500.jpeg',
    communities: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/white_miorror.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/curious-1.png'],
    awards: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/58gdsfg_A_matte_gold_trophy_icon_smooth_textured_cup_outline_wh_bb101e0d-ac08-4551-a5bb-8e6df892ae8d-removebg-preview.png'],
    ai_tools: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/adobe_cloud.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/chatgpt.png'],
    emoticons: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/pink_heart.gif', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/naruto.gif']
  },
  {
    id: 5,
    creator: 'Picasso',
    title: 'Secrets of a Geisha',
    profileImage: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/creator_7.png',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/87bf7b08de0782a7ceeb848c8346c955.jpeg',
    communities: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/white_miorror.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/curious-1.png'],
    awards: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/58gdsfg_A_matte_gold_trophy_icon_smooth_textured_cup_outline_wh_bb101e0d-ac08-4551-a5bb-8e6df892ae8d-removebg-preview.png'],
    ai_tools: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/adobe_cloud.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/chatgpt.png'],
    emoticons: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/party-blob.gif', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/pink_heart.gif']
  },
  {
    id: 6,
    creator: 'Van Gogh',
    title: 'Cyborg dilemma',
    profileImage: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/creator_6.png',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/user_2.png',
    communities: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/white_miorror.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/curious-1.png'],
    awards: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_4.png'],
    ai_tools: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/photoshop.webp', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/dreamstudio.avif'],
    emoticons: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/purple_triangle.gif', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/party-blob.gif']
  },
  {
    id: 7,
    creator: 'Monet',
    title: 'Krishna AI Art',
    profileImage: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/creator_3.png',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/krishna.png',
    communities: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/white_miorror.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/curious-1.png'],
    awards: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_4.png'],
    ai_tools: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/hugging.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/kaiber_2.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/ilumine.png'],
    emoticons: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/psychedelic_heart.gif', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/gradient_donut.gif']
  },
  {
    id: 8,
    creator: 'Picasso',
    title: 'Future of the Metaverse',
    profileImage: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/creator_2.png',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/building.png',
    communities: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/white_miorror.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/curious-1.png'],
    awards: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_4.png'],
    ai_tools: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/adobe_cloud.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/chatgpt.png'],
    emoticons: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/watermelon.gif', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/naruto.gif']
  },
  {
    id: 9,
    creator: 'Picasso',
    title: 'New Frontiers',
    profileImage: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/creator_9.png',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/vibeverse.png',
    communities: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/white_miorror.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/curious-1.png'],
    awards: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_5.png'],
    ai_tools: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/photoshop.webp', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/midjourney_1_1.png'],
    emoticons: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/purple_triangle.gif', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/pink_heart.gif']
  },
  {
    id: 10,
    creator: 'Picasso',
    title: 'Last Battle',
    profileImage: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/creator_5.png',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/el_mandaloriano.png',
    communities: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/white_miorror.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/curious-1.png'],
    awards: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_5.png'],
    ai_tools: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/hugging.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/kaiber_2.png'],
    emoticons: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/watermelon.gif', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/pink_heart.gif']
  },
  {
    id: 11,
    creator: 'Picasso',
    title: 'Alien Dreams',
    profileImage: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/creator_11.png',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_2_copy.png',
    communities: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/white_miorror.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/curious-1.png'],
    awards: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_3.png'],
    ai_tools: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/adobe_cloud.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/premiere.png'],
    emoticons: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/pink_heart.gif', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/gradient_donut.gif']
  },
  {
    id: 12,
    creator: 'Picasso',
    title: 'Blue Queen of the Night',
    profileImage: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/creator_12.png',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Lapo_ave_full_body_view_photograph_glinda_detailed_features_hol_a7781e72-8572-441b-b1b0-09c2150e17ad.png',
    communities: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/white_miorror.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/curious-1.png'],
    awards: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_5.png'],
    ai_tools: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/adobe_cloud.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/chatgpt.png'],
    emoticons: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/kirby_dance.gif', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/pink_heart.gif']
  },
  {
    id: 13,
    creator: 'Picasso',
    title: 'Autumn Adventures',
    profileImage: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/creator_13.png',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_1_(1)_copy.png',
    communities: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/white_miorror.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/curious-1.png'],
    awards: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy.png'],
    ai_tools: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/premiere.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/midjourney_1_1.png'],
    emoticons: ['https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/psychedelic_heart.gif', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/naruto.gif']
  },
];

export default function Gallery() {
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    Mixpanel.track('AI Gallery Viewed');
  }, []);

  return (
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
            {data.map((item) => (
              <div
                key={item.id}
                className="pb-1 relative cursor-pointer"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}>
                <Image
                  src={item.image}
                  layout="responsive"
                  width={500}
                  height={500}
                  quality={1000}
                  alt="Background"
                  className="rounded-xl w-full object-cover xxs:min-h-[400px] xxs:max-h-[580px]  lg:min-h-[200px]"
                />
                {/* {hoveredItem === item.id && ( */}
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
                      <button className="bg-sky-950 flex items-center justify-center xxs:invisible md:visible sm:h-12 sm:w-12 rounded-full text-lg xs:-mb-6 sm:-mb-6 lg:-mb-8 z-10 text-white"><BsArrowsFullscreen /></button>
                    </div>
                    {/* bg-black, next div */}
                    <div className="w-full flex flex-col justify-between px-3 bottom-0">
                      <div className="flex text-blue-200 bottom-0 items-center justify-between pb-2 pr-2">

                        <div className="bg-slate-800 py-2 px-4 rounded-xl">
                          <h2 className="text-white text-base" >{item.title}</h2>
                        </div>
 
                        <div className="bg-slate-800 p-2 rounded-full">
                          <FaShare />
                        </div>
                      </div>
                      <div className="flex justify-between bg-black bg-opacity-40 px-2 rounded-t-lg">
                        {/* bg-red-300 side, next div */}
                        <div className="flex flex-col items-start py-2">
                          <div className="flex gap-2 items-center mb-2 justify-center ml-1">
                            {item.communities && item.communities.map((community, index) => (
                              <Image
                                key={index}
                                className="xxs:h-10 xxs:w-10 sm:h-6 sm:w-6 rounded-full object-cover border border-white"
                                src={community}
                                height={200}
                                width={200}
                                alt=""
                              />
                            ))}
                            <button className="bg-sky-950 flex items-center justify-center rounded-full xxs:h-10 xxs:w-10 sm:h-6 sm:w-6 text-xs z-1 text-white">+ 2</button>
                          </div>
                          <div className="flex gap-1 items-center"> 
                            {item.awards && item.awards.map((award, index) => (
                              <Image
                                key={index}
                                className="xxs:h-12 xxs:w-12 sm:h-8 sm:w-8 rounded-full object-cover"
                                src={award}
                                height={200}
                                width={200}
                                alt=""
                              />
                            ))}   
                            <button className=" flex items-center justify-center rounded-full xxs:h-12 xxs:w-12 sm:h-6 sm:w-6 text-xs z-1 text-white pb-0.5">+ 4</button>
                          </div>
                        </div>
                        {/* bg-green-300 side, next div */}
                        <div className=" py-2 flex flex-col justify-between">
                          <div className="flex gap-1 items-center justify-end">
                            {item.ai_tools && item.ai_tools.map((tool, index) => (
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
                              <div className='mr-1'>
                                + 2
                              </div>
                              <div className=''>
                                <Image
                                  className="xxs:h-4 xxs:w-4 rounded-full object-cover"
                                  src={'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/magic-wand.png'}
                                  height={200}
                                  width={200}
                                  alt=""
                                />
                              </div> 
                            </button>
                          </div>
                          <div className="flex gap-1 items-center justify-end">
                            {item.emoticons && item.emoticons.map((emoticon, index) => (
                              <button key={index} className="bg-sky-950 px-2 py-1 flex items-center justify-center rounded-full text-xs z-1 text-stone-300 gap-1 border border-white">
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
                            <button className="bg-sky-950 flex items-center justify-center rounded-full w-6 h-6 text-xs z-1 text-white pb-0.5">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* )} */}
              </div>
            ))}     
          </div>
        </div>                
      </div>
    </div>
  );

}