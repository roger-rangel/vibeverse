import Image from 'next/image';
import Link from 'next/link';

const leagues = [
  'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/chevron_(3).png',
  'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/chevron_(1).png',
  'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/chevron_(2).png',
  'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/chevron.png',
  'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/5362484.png',
];

const players = [
  {
    id: 1,
    profile:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1263.png',
    name: 'Dirk F',
    xp: 1465,
  },
  {
    id: 2,
    profile:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1260_(1).png',
    name: 'Miguel A',
    xp: 1255,
  },
  {
    id: 3,
    profile:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1262_(1).png',
    name: 'Dominika W',
    xp: 1095,
  },
  {
    id: 4,
    profile:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1261_(1).png',
    name: 'Abdul A',
    xp: 900,
  },
  {
    id: 5,
    profile:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1264.png',
    name: 'Alexander C',
    xp: 850,
  },
];

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
        <div className="group relative">
          <h2 className="pb-6 pl-1 font-mono text-2xl font-bold text-gray-900">
            AI League
          </h2>
          <div className="relative h-auto w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-900 sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
            <div className="flex flex-col">
              <div className="flex space-x-4 px-4 pt-3">
                {leagues.map((league, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-center rounded-lg ${
                      index === leagues.length - 1
                        ? 'my-auto h-10 w-10 lg:h-10 lg:w-10'
                        : 'h-16 w-16 lg:h-14 lg:w-14'
                    }`}
                  >
                    <Image
                      src={league}
                      alt={`League ${index + 1}`}
                      width={150}
                      height={150}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center border-b border-gray-600 px-4 py-3">
                <h1 className="text-center text-xl font-black text-gray-200 lg:text-lg">
                  Top players advance to next league
                </h1>
                <h2 className="mt-2 text-center text-sm font-black text-gray-200">
                  16 hours left
                </h2>
              </div>
              <div className="relative overflow-scroll px-4 py-3">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center">
                      {/* Player Rank */}
                      <span className="mr-3 text-sm font-bold text-gray-200">
                        {player.id}
                      </span>
                      {/* Player Profile Picture */}
                      <Image
                        src={player.profile}
                        alt={`${player.name}'s profile`}
                        width={32}
                        height={32}
                        className="h-10 w-10"
                      />
                      {/* Player Name */}
                      <span className="ml-3 text-base font-medium text-gray-200">
                        {player.name}
                      </span>
                    </div>
                    {/* Player XP */}
                    <span className="mr-2 text-base font-medium text-green-200 lg:mr-0">
                      {player.xp} XP
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
