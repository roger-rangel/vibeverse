import Image from 'next/image';

export default function CourseAndTournament() {
  return (
    <div className="mx-auto py-4 lg:py-12 lg:max-w-none">
      <h2 className="pl-1 text-2xl font-bold text-gray-900">Foundations</h2>
      <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
        <div className="group relative">
          <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 border border-gray-200 sm:h-64">
            <Image
              src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/rogerweb3_Fours_friends_on_a_adventure_to_find_the_lost_city_in_5a183371-8cf0-4505-bc4e-62dfed1573d7.png"
              alt="intro"
              layout="fill"
              className="h-full w-full object-cover object-center"
              // width={300}
              // height={300}
            />
            <div className="absolute inset-0 z-10 p-4 flex flex-col justify-between font-mono">
              <div>
                <h1 className="text-center text-white text-4xl lg:text-lg font-black">Introduction to AI</h1>
                <h2 className="text-center text-gray-900 text-sm font-black mt-2">Storytelling</h2>
              </div>
              <div className="self-end w-full">
                <h2 className="flex justify-end text-green-200 text-sm font-black mb-3">32 mini lessons</h2>
                <div className="w-full mb-2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                  <button></button>
                </div>
                <button className="w-full text-sm bg-black text-white py-2 rounded-md font-medium border border-black hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out">
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="group relative">
          <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 border border-gray-200 sm:h-64">

          </div>
        </div>
      </div>
    </div>
  );
}
