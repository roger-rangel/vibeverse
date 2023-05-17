'use client';

import dynamic from 'next/dynamic';

// Dynamically import ReactPlayer with SSR turned off
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const products = [
  {
    id: 1,
    name: 'Ayahuasca',
    videoSrc: '164916743'
  },
  {
    id: 2,
    name: 'Trippy balls',
    videoSrc: '824480109'
  },
  {
    id: 3,
    name: 'Space',
    videoSrc: '815628905'
  },
  {
    id: 4,
    name: 'Leather Long Wallet',
    videoSrc: '815580171'
  },
  // More products...
];

export default function Trending() {
  return (
    <div className="">
      <div className="py-2 sm:py-2 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
          <h2 className="text-4xl font-bold tracking-tight text-slate-200">Trending this week</h2>
        </div>

        <div className="relative mt-8">
          <div className="relative -mb-6 w-full overflow-x-auto pb-6">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
            >
              {products.map((product) => (
                <li key={product.id} className="inline-flex w-64 flex-col text-center lg:w-auto">
                  <div className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200" style={{ paddingBottom: '56.25%' }}>
                      <ReactPlayer
                        url={`https://player.vimeo.com/${product.videoSrc}`}
                        playing
                        loop
                        muted // Add the "muted" prop to mute the video
                        height="100%"
                        width="100%"
                        className='absolute top-0 left-0'
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
                  </div>               
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
