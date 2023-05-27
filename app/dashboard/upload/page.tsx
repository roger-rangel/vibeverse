import Image from 'next/image';
import Link from 'next/link';

import Sign from '@/components/dashboard/shorts/sign';

const uploads = [
  {
    id: 1,
    title: 'Create Collection',
    href: '#',
    imageUrl:
      '/images/dashboard/create_collection.png',
  },
  {
    id: 1,
    title: 'Create New Item',
    href: '#',
    imageUrl:
      '/images/dashboard/create_item.png',
  },
  {
    id: 1,
    title: 'New to Web3?',
    href: '#',
    imageUrl:
      '/images/dashboard/new_to_web3.png',
  },
  // More posts...
];


export default function Upload() {
  return (
    <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8 bg-gradient-to-r from-[#8360c3] to-[#2ebf91]">  
      <div className="m-auto mt-4 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {uploads.map((upload) => (
          <article
            key={upload.id}
            className="relative isolate flex flex-col justify-center items-center overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
          >
            <Image src={upload.imageUrl} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" width={600} height={600}/>
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

            <h3 className="absolute mx-4 inset-0 flex text-2xl font-semibold leading-6 text-white items-center justify-center">
              <Link href={upload.href}>
                <span className="absolute inset-0 flex justify-center items-center" />
                {upload.title}
              </Link>
            </h3>
          </article>
        ))}
      </div>
      <Sign />
    </div>
  );
}

