
import Image from 'next/image';

export default function CreateCommunity({ handleClose }) {

  const files = [
    {
      title: 'IMG_4985.HEIC',
      size: 'Curious Refuge',
      source:
              'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
      logo: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/curious.png'
    },
    {
      title: 'IMG_4985.HEIC',
      size: 'White Mirror',
      source:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
      logo: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Screenshot_2023-08-26_at_5_50_29_PM.png'
    },
    {
      title: 'IMG_4985.HEIC',
      size: 'New Community',
      source:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
      logo: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy.png'
    },
  // More files...
  ];

    
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto z-50 ">
      <div className="bg-gray-900 rounded-lg overflow-y-auto max-h-[calc(100%-2rem)] p-8 w-full max-w-2xl mx-4 my-8 border border-indigo-600">
        <form>
          <div className="space-y-12 ">
            <div className="border-b border-white/10 pb-12">
              <div className="flex justify-between mb-4 items-center">
                <h2 className="text-3xl font-semibold leading-7 text-white">
                  Join a Community
                </h2>
                <button
                  onClick={handleClose}
                  type="button"
                  class="rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span class="sr-only">Close menu</span>

                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-10"> 
                <ul role="list" className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 xl:gap-x-8">
                  {files.map((file) => (
                    <li key={file.source} className="relative">
                      <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                        <Image src={file.source} alt="" className="pointer-events-none object-cover group-hover:opacity-75" width={200} height={200} />
                        <button type="button" className="absolute inset-0 focus:outline-none">
   
                          <span className="sr-only">View details for {file.title}</span>
                        </button>
                      </div>
                      <div className='flex items-center gap-2 mt-2'>
                        <Image
                          src={file.logo}
                          alt="community"
                          className={`flex h-8 w-16 items-center`}
                          width="40"
                          height="40"
                        />
                        <p className="pointer-events-none block text-sm font-medium text-gray-500">{file.size}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={handleClose}
              type="button"
              className="text-sm font-semibold leading-6 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Join
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}