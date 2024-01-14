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
    profile: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1263.png',
    name: 'Dirk F',
    xp: 1465,
  },
  {
    id: 2,
    profile: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1260_(1).png',
    name: 'Miguel A',
    xp: 1255,
  },
  {
    id: 3,
    profile: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1262_(1).png',
    name: 'Dominika W',
    xp: 1095,
  },
  {
    id: 4,
    profile: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1261_(1).png',
    name: 'Abdul A',
    xp: 900,
  },
  {
    id: 5,
    profile: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1264.png',
    name: 'Alexander C',
    xp: 850,
  },
];

export default function CourseAndTournament() {
  return (
    <div className="mx-auto pb-24 lg:pt-2 lg:max-w-none lg:pb-4">
      <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
        <div className="group relative">
          <h2 className="pl-1 pb-6 text-2xl font-bold text-gray-900 font-mono">Foundations</h2>
          <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 border border-gray-200 sm:h-64">
            <Image
              src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/rogerweb3_Fours_friends_on_a_adventure_to_find_the_lost_city_in_5a183371-8cf0-4505-bc4e-62dfed1573d7.png"
              alt="intro"
              layout="fill"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 z-0 p-4 flex flex-col justify-between font-mono">
              <div>
                <h1 className="text-center text-white text-4xl lg:text-2xl font-black">Introduction to AI</h1>
                <h2 className="text-center text-gray-900 text-sm font-black mt-2">Storytelling</h2>
              </div>
              <div className="self-end w-full">
                <h2 className="flex justify-end text-green-200 text-sm font-black mb-3">32 mini lessons</h2>
                <div className="w-full mb-2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                  <button></button>
                </div>
                <Link href="/storytelling_test">
                  <button className="w-full text-sm bg-black text-white py-2 rounded-md font-medium border border-black hover:border-green-500 focus:outline-none transition duration-150 ease-in-out">
                    Continue Learning
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="group relative">
          <h2 className="pl-1 pb-6 text-2xl font-bold text-gray-900 font-mono">AI League</h2>
          <div className="relative h-auto w-full overflow-hidden rounded-lg bg-gray-900 sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 border border-gray-200 sm:h-64">
            <div className="flex flex-col">
              <div className="flex pt-3 space-x-4 px-4">              
                {leagues.map((league, index) => (
                  <div key={index} className={`flex items-center justify-center rounded-lg ${index === leagues.length - 1 ? 'w-10 h-10 lg:w-10 lg:h-10 my-auto' : 'w-16 h-16 lg:w-14 lg:h-14'}`}>
                    <Image src={league} alt={`League ${index + 1}`} width={150} height={150} />
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center px-4 py-3 border-b border-gray-600">
                <h1 className="text-center text-gray-200 text-xl lg:text-lg font-black">Top players advance to next league</h1>
                <h2 className="text-center text-gray-200 text-sm font-black mt-2">16 hours left</h2>
              </div>
              <div className="relative px-4 py-3 overflow-scroll">
                {players.map((player) => (
                  <div key={player.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      {/* Player Rank */}
                      <span className="text-sm text-gray-200 font-bold mr-3">{player.id}</span>
                      {/* Player Profile Picture */}
                      <Image
                        src={player.profile}
                        alt={`${player.name}'s profile`}
                        width={32}
                        height={32}
                        className="h-10 w-10"
                      />
                      {/* Player Name */}
                      <span className="text-base text-gray-200 ml-3 font-medium">{player.name}</span>
                    </div>
                    {/* Player XP */}
                    <span className="text-base text-green-200 mr-2 lg:mr-0 font-medium">{player.xp} XP</span>
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
