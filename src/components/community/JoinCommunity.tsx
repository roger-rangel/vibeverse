
import Image from 'next/image';

interface JoinCommunityProps {
  handleClose: () => void;
}

export function JoinCommunity({ handleClose }: JoinCommunityProps) {

  const files = [
    {
      size: '',
      source: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/4f2a08b961c6c95bedb5ed4d2cc39513.gif',
      logo: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Curious_Refuge_Logo_White_Flat.png',
      height: 'h-6',
      width: 'w-32',
      rounded: 'rounded',
      border: 'border-none',
      description: "AI Filmmaking School",
      margin: 'mb-2 mr-2',
      difficulty: 'Beginner'
    },
    {
      size: '',
      source: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/dc3694a9a00b8977d0bbd26541ffbe58.gif',
      logo: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Screenshot_2023-08-26_at_5_50_29_PM-removebg-preview.png',
      height: 'h-12',
      width: 'w-24',
      rounded: 'rounded',
      border: 'border-none',
      description: "AI Film Studio",
      difficulty: 'Advanced'
    },
    {
      size: 'Create',
      source: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/238bd7250a953bbd9e0387410f462e4a_(1).gif',
      logo: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1169.png',
      height: 'h-10',
      width: 'w-10',
      rounded: 'rounded-none',
      description: "Create My Own",
      margin: 'mb-2 mr-2',
      difficulty: 'New Journey'
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
                  className="rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-purple-300 focus:ring-indigo-500"
                >
                  <span className="sr-only">Close menu</span>

                  <svg
                    className="h-6 w-6"
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
                      <div className="group relative aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500">
                        <Image src={file.source} alt="" className="pointer-events-none object-cover group-hover:border-2 rounded-lg" width={200} height={200} />
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-end items-end">
                          <Image
                            src={file.logo}
                            alt="community"
                            className={`flex ${file.height} ${file.width} ${file.rounded} ${file.border} ${file.margin} items-center`}
                            width="40"
                            height="40"
                          />
                        </div>
                        <button type="button" className="absolute inset-0 focus:outline-none">
                          <span className="sr-only">View details for ...</span>
                        </button>
                      </div>

                      <div className={`flex-col items-center gap-2 mt-2 justify-center`}>

                        <div className='flex items-center justify-center'>
                          <p className="pointer-events-none block text-base font-medium text-purple-300 mt-2 mb-4">{file.description}</p> 
                        </div>
                        <div className='flex items-center justify-center'>
                          <button
                            className={`rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm pointer-events-none`}
                          >
                            {file.difficulty}
                          </button>
                        </div>
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