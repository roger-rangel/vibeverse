import Image from 'next/image';
import Link from 'next/link';

import { TopCreators } from './TopCreators';

export default function CourseAndTournament() {
  return (
    <div className="mx-auto pb-24 lg:max-w-none lg:pb-4 lg:pt-2">
      <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
        <div className="group relative">
          <h2 className="pb-6 pl-1 font-mono text-2xl font-bold text-gray-900">
            Foundations
          </h2>
          <div className="relative h-80 w-full overflow-hidden rounded-lg border border-gray-200 bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
            <Image
              src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/rogerweb3_Fours_friends_on_a_adventure_to_find_the_lost_city_in_5a183371-8cf0-4505-bc4e-62dfed1573d7.png"
              alt="intro"
              layout="fill"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 z-0 flex flex-col justify-between p-4 font-mono">
              <div>
                <h1 className="text-center text-4xl font-black text-white lg:text-2xl">
                  Introduction to AI
                </h1>
                <h2 className="mt-2 text-center text-sm font-black text-gray-900">
                  Storytelling
                </h2>
              </div>
              <div className="w-full self-end">
                <h2 className="mb-3 flex justify-end text-sm font-black text-green-200">
                  32 mini lessons
                </h2>
                <div className="mb-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-2.5 rounded-full bg-green-500"
                    style={{ width: '25%' }}
                  ></div>
                  <button></button>
                </div>
                <Link href="/storytelling_test">
                  <button className="w-full rounded-md border border-black bg-black py-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:border-green-500 focus:outline-none">
                    Continue Learning
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="group relative">
          <h2 className="pb-6 pl-1 font-mono text-2xl font-bold text-gray-900">
            Foundations
          </h2>
          <div className="relative h-80 w-full overflow-hidden rounded-lg border border-gray-200 bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
            <Image
              src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/rogerweb3_Fours_friends_on_a_adventure_to_find_the_lost_city_in_5a183371-8cf0-4505-bc4e-62dfed1573d7.png"
              alt="intro"
              layout="fill"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 z-0 flex flex-col justify-between p-4 font-mono">
              <div>
                <h1 className="text-center text-4xl font-black text-white lg:text-2xl">
                  What is prompt?
                </h1>
                <h2 className="mt-2 text-center text-sm font-black text-gray-900">
                  Prompt test
                </h2>
              </div>
              <div className="w-full self-end">
                <h2 className="mb-3 flex justify-end text-sm font-black text-green-200">
                  7 mini lessons
                </h2>
                <div className="mb-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-2.5 rounded-full bg-green-500"
                    style={{ width: '15%' }}
                  ></div>
                  <button></button>
                </div>
                <Link href="/prompting_test">
                  <button className="w-full rounded-md border border-black bg-black py-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:border-green-500 focus:outline-none">
                    Continue Learning
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <TopCreators />
      </div>
    </div>
  );
}
