import Image from 'next/image';
import { StarIcon } from '@heroicons/react/20/solid';
import { videos } from '../../../constants';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Content() {
  return (
    
    <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">

      <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
        {videos.map((video) => (
          <div key={video.id} className="group relative border-t border-b border-r border-gray-200 p-4 sm:p-6">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
              <Image
                src={video.imageSrc}
                alt={video.imageAlt}
                className="h-full w-full object-cover object-center"
                width={600}
                height={600}
              />
              <div className="flex flex-col items-center justify-end">
                <p className="sr-only">{video.rating} out of 5 stars</p>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        video.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-gray-500">{video.reviewCount} reviews</p>
              </div>
            </div>
            <div className="pb-4 pt-4 text-center">
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-sm font-medium text-gray-900 justify-center ">
                  <a href={video.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {video.name}
                  </a>   
                </h3>
                <Image
                  className="h-8 w-8 rounded-full bg-gray-800"
                  src={`/images/dashboard/${video.userImageSrc}`}
                  alt=""
                  width={32}
                  height={32}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
   
  );
}
