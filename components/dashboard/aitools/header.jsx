'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const product = {
  images: [
    {
      src: '/images/dashboard/aitools_0.png',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: '/images/dashboard/',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: '/',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: '/images/dashboard/aitools_1.png',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
};

export default function Example() {
  return (
    <div className="">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              className="h-full w-full object-cover object-center"
              width={200}
              height={200}
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <ReactPlayer
                url="https://player.vimeo.com/830130000"
                playing
                loop
                muted // Add the "muted" prop to mute the video
                style={{
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                  top: '50%',
                  left: '50%',
                }}
                config={{
                  vimeo: {
                    playerOptions: {
                      background: true,
                      muted: true,
                      autopause: false,
                      controls: false,
                    },
                  },
                }}
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <ReactPlayer
                url="https://player.vimeo.com/827650727"
                playing
                loop
                muted // Add the "muted" prop to mute the video
                style={{
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                  top: '50%',
                  left: '50%',
                }}
                config={{
                  vimeo: {
                    playerOptions: {
                      background: true,
                      muted: true,
                      autopause: false,
                      controls: false,
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <Image
              src={product.images[3].src}
              alt={product.images[3].alt}
              className="h-full w-full object-cover object-center"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
