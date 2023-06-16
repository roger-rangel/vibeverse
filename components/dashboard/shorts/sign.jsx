import Image from 'next/image';
import Link from 'next/link';

export default function Sign() {
  return (
    <div className="h-full pt-4">
      <div className="mx-auto py-6 sm:px-0 sm:py-6">
        <div className="bg-gradient-to-r from-[#ee9ca7] to-[#ffdde1] p-1 rounded-lg">
          <div className="relative overflow-hidden rounded-lg lg:h-96 ">
            <div className="absolute inset-0">
              <Image
                src="/images/dashboard/magical_place.png"
                alt="header"
                className="h-full w-full object-cover object-center"
                sizes="100vw"
                width={0}
                height={0}
              />
            </div>
            <div
              aria-hidden="true"
              className="relative h-96 w-full lg:hidden"
            />
            <div
              aria-hidden="true"
              className="relative h-32 w-full lg:hidden"
            />
            <div className="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-br-none lg:rounded-tl-lg">
              <div>
                <h2 className="text-xl font-bold text-white">New AI Tools</h2>
                <p className="mt-1 text-sm text-gray-300">
                  Upgrade your creative skills and discover the hottest AI tools
                  this summer. Updated weekly.
                </p>
              </div>
              <Link
                href="/dashboard/aitools"
                className="mt-6 flex flex-shrink-0 items-center justify-center rounded-md border border-white border-opacity-25 bg-white bg-opacity-0 px-4 py-3 text-base font-medium text-white hover:bg-opacity-10 sm:ml-8 sm:mt-0 lg:ml-0 lg:w-full"
              >
                View the collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
