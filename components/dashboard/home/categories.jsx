import Image from 'next/image';

const categories = [
  {
    name: 'Mystery',
    href: '#',
    imageSrc: '/images/dashboard/mystery.png',
  },
  {
    name: 'Adventure',
    href: '#',
    imageSrc: '/images/dashboard/adventure.png',
  },
  {
    name: 'Sci-Fi',
    href: '#',
    imageSrc: '/images/dashboard/art.png',
  },
  {
    name: 'Ancient',
    href: '#',
    imageSrc: '/images/dashboard/ancient.png',
  },
  {
    name: 'New ',
    href: '#',
    imageSrc: '/images/dashboard/lion.png',
  },
];

export default function Example() {
  return (
    <div className="">
      <div className="py-10 sm:py-10 xl:mx-auto xl:max-w-7xl xl:px-8">
        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
              <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                {categories.map((category) => (
                  <a
                    key={category.name}
                    href={category.href}
                    className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                  >
                    <span aria-hidden="true" className="absolute inset-0">
                      <Image
                        src={category.imageSrc}
                        alt=""
                        className="h-full w-full object-cover object-center"
                        width={200}
                        height={200}
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                    />
                    <span className="relative mt-auto text-center text-xl font-bold text-white">
                      {category.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-4 sm:hidden">
          <a
            href="#"
            className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
