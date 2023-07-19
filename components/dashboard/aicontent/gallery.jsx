'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { Mixpanel } from '@/components/Mixpanel';


const data = [
  {
    id: 1,
    creator: 'Monet',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/ai_influencer.png',
  },
  {
    id: 2,
    creator: 'Picasso',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/landscape.png',
  },
  {
    id: 3,
    creator: 'Van Gogh',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/user_3.png ',
  },
  {
    id: 4,
    creator: 'Monet',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/artworks-000365885514-ln1u97-t500x500.jpeg',
  },
  {
    id: 5,
    creator: 'Picasso',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/87bf7b08de0782a7ceeb848c8346c955.jpeg',
  },
  {
    id: 6,
    creator: 'Van Gogh',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/user_2.png',
  },
  {
    id: 7,
    creator: 'Monet',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/krishna.png',
  },
  {
    id: 8,
    creator: 'Picasso',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/building.png',
  },
  {
    id: 9,
    creator: 'Picasso',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/vibeverse.png',
  },
  {
    id: 10,
    creator: 'Picasso',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/el_mandaloriano.png',
  },
  {
    id: 11,
    creator: 'Picasso',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_2_copy.png',
  },
  {
    id: 12,
    creator: 'Picasso',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Lapo_ave_full_body_view_photograph_glinda_detailed_features_hol_a7781e72-8572-441b-b1b0-09c2150e17ad.png',
  },
  {
    id: 13,
    creator: 'Picasso',
    image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_1_(1)_copy.png',
  },
];

export default function Gallery() {
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
          <div className="columns-2 md:columns-3 lg:columns-4 gap-1">
            {data.map((item) => (
              <div key={item.id} className="pb-1">
                <Image
                  src={item.image}
                  layout="responsive"
                  width={500}
                  height={500}
                  objectFit="cover"
                  quality={1000}
                  alt="Background"
                  className="rounded-xl w-full"
                /> 
              </div>
            ))}     
          </div>
        </div>                
      </div>
    </div>
  );

}