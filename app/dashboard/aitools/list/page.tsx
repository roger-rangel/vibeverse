'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const posts = [
  {
    id: 1,
    title: 'AI Video Generation',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    videoURL: '830146900',
    rating: '⭐️⭐️⭐️⭐️⭐️',
    author: {
      name: 'Kaiber',
      imageUrl: '/images/logos/kaiber.jpeg',
    },
  },
  {
    id: 1,
    title: 'AI Magic Tools Platform',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    videoURL: '830162386',
    rating: '⭐️⭐️⭐️⭐️⭐️',
    author: {
      name: 'Runway',
      imageUrl: '/images/logos/runway.png',
    },
  },
  {
    id: 1,
    title: 'Open Source Software',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    videoURL: '830159528',
    rating: '⭐️⭐️⭐️⭐️⭐️',
    author: {
      name: 'Stable Diffusion',
      imageUrl: '/images/logos/stable.webp',
    },
  },
  // More posts...
];

export default function Collection() {
  return (
    <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8 bg-gradient-to-r from-[#8360c3] to-[#2ebf91]">
      <div className="mx-auto mt-18 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-0 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
          >
            {/* <Image src={post.imageUrl} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" width="300" height="600" /> */}
            <ReactPlayer
              url={`https://player.vimeo.com/${post.videoURL}`}
              playing
              loop
              muted // Add the "muted" prop to mute the video
              style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
                zIndex: -10,
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
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
              <p className="mr-8">{post.rating}</p>
              <div className="-ml-4 flex items-center gap-x-4">
                <svg
                  viewBox="0 0 2 2"
                  className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <div className="flex gap-x-2.5">
                  <Image
                    src={post.author.imageUrl}
                    alt=""
                    className="h-6 w-6 flex-none rounded-full bg-white/10"
                    width="100"
                    height="100"
                  />
                  {post.author.name}
                </div>
              </div>
            </div>
            <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
              <a href={post.href}>
                <span className="absolute inset-0" />
                {post.title}
              </a>
            </h3>
          </article>
        ))}
      </div>

      <div className="mx-auto px-0 py-10 sm:px-0 sm:py-8 ">
        <div className="relative overflow-hidden rounded-lg lg:h-96">
          <div className="absolute inset-0">
            <Image
              src="/images/dashboard/wizard.png"
              alt=""
              className="h-full w-full object-cover object-center"
              width="900"
              height="300"
            />
          </div>
          <div aria-hidden="true" className="relative h-96 w-full lg:hidden" />
          <div aria-hidden="true" className="relative h-32 w-full lg:hidden" />
          <div className="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-br-none lg:rounded-tl-lg">
            <div>
              <h2 className="text-xl font-bold text-white">
                Don&apos;t know where to start?
              </h2>
              <p className="mt-1 text-sm text-gray-300">
                Don&apos;t worry, we&apos;ve got you covered. Our learning
                center is a great place to start.
              </p>
            </div>
            <a
              href="#"
              className="mt-6 flex flex-shrink-0 items-center justify-center rounded-md border border-white border-opacity-25 bg-white bg-opacity-0 px-4 py-3 text-base font-medium text-white hover:bg-opacity-10 sm:ml-8 sm:mt-0 lg:ml-0 lg:w-full"
            >
              View Learning Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
