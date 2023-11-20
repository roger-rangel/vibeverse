import Image from 'next/image';
import Portal from './Portal';

const community = {
  creatorName: 'Ricardo Cooper',
  avatar:
        'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1184.png',
  creatorImage: 
        'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Alexandria_royal_guard_Star_Wars_red_1220c4a4-195a-4ba6-9189-b9ec16bbf76f.png',
};

export default function CommunityPage() {
  return (
    <div>
      <div className="flex items-center justify-between bg-slate-600 p-4 rounded-2xl">
        <div className="min-w-0 flex items-center justify-center gap-4">
          <Image
            src={community.avatar}
            alt="Product screenshot"
            width={50}
            height={50}
            className='flex mt-2'
          />
          <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
          Curious Refuge
          </h2>
        </div>
        <div className="flex md:ml-4 mt-0">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
          >
          Join
          </button>
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
          Follow
          </button>
        </div>        
      </div>
      <div className="min-w-0 flex items-center justify-center gap-4 mt-4">
        <Image
          src={community.creatorImage}
          alt="Product screenshot"
          width={50}
          height={50}
          className='flex rounded-full'
        />
        <h2 className="text-2xl leading-7 text-white sm:truncate sm:text-2xl sm:tracking-tight">
          {community.creatorName} 
        </h2>
      </div>
    </div>
  );
}