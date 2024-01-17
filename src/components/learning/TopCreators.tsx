import Image from 'next/image';

import { useGetTopNCreators } from '@/hooks';

const leagues = [
  'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/chevron_(3).png',
  'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/chevron_(1).png',
  'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/chevron_(2).png',
  'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/chevron.png',
  'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/5362484.png',
];

export function TopCreators() {
  const { data: creators } = useGetTopNCreators({});

  console.log(creators);

  return (
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
          <div className="relative overflow-y-auto px-4 py-3">
            {creators?.map(({ userId, creator }, id) => (
              <div
                key={`top-n-${userId}`}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center">
                  {/* Player Rank */}
                  <span className="mr-3 text-sm font-bold text-gray-200">
                    {id + 1}
                  </span>
                  {/* Player Profile Picture */}
                  <Image
                    src={creator.avatar}
                    alt={`${creator.name}'s profile`}
                    width={32}
                    height={32}
                    className="h-10 w-10 rounded-md"
                  />
                  {/* Player Name */}
                  <span className="ml-3 text-base font-medium text-gray-200">
                    {creator.name}
                  </span>
                </div>
                {/* Player XP */}
                <span className="mr-2 text-base font-medium text-green-200 lg:mr-0">
                  {creator.score.toString()} XP
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
