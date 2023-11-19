import React, { useState } from 'react';
import Image from 'next/image';

// Define the interface for follow states
interface Follow {
  [key: string]: boolean;
}

interface CommunitySectionProps {
  showCreateCommunity: (value: boolean) => void;
}

export function CommunitySection({ showCreateCommunity }: CommunitySectionProps) {
  // Initialize a state object to track the follow state of each community
  const [follow, setFollow] = useState<Follow>({});

  // Function to handle follow/unfollow click
  const handleFollowClick = (source: string) => {
    setFollow(prevStates => ({
      ...prevStates,
      [source]: !prevStates[source]
    }));
  };

  // Function to handle opening the create community modal
  const handleOpenCreateCommunity = () => {
    showCreateCommunity(true);
  };

  const files = [
    {
      type: 'Join',
      source: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/4f2a08b961c6c95bedb5ed4d2cc39513.gif',
      logo: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Curious_Refuge_Logo_White_Flat.png',
      height: 'h-6',
      width: 'w-32',
      rounded: 'rounded',
      border: 'border-none',
      description: "AI Filmmaking School",
      margin: 'mb-2 mr-2',
      difficulty: 'Beginner',
      difficultyColor: 'bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400'
    },
    {
      type: 'Join',
      source: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/dc3694a9a00b8977d0bbd26541ffbe58.gif',
      logo: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Screenshot_2023-08-26_at_5_50_29_PM-removebg-preview.png',
      height: 'h-12',
      width: 'w-24',
      rounded: 'rounded',
      border: 'border-none',
      description: "AI Film Studio",
      difficulty: 'Advanced',
      difficultyColor: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'
    },
    {
      type: 'Create',
      source: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/238bd7250a953bbd9e0387410f462e4a_(1).gif',
      logo: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1169.png',
      height: 'h-10',
      width: 'w-10',
      rounded: 'rounded-none',
      description: "Create My Own",
      margin: 'mb-2 mr-2',
      difficulty: 'New Journey',
      difficultyColor: 'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500'
    },
  // More files...
  ];

  return (
    <div className='mx-10'>
      <div className="pt-6"> 
        <ul role="list" className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 xl:gap-x-8">
          {files.map((file) => (
            <li key={file.source} className="relative">
              <div className='flex items-center justify-center mt-4 mb-2'>
                <button
                  className={`w-full rounded-md ${file.difficultyColor} px-6 py-2 text-sm font-semibold text-white shadow-sm pointer-events-none border`}
                >
                  {file.difficulty}
                </button>
              </div>
              <div className="group relative aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 border-2 border-indigo-500/100">
                <Image src={file.source} alt="" className="pointer-events-none object-cover group-hover:border-2 rounded" width={200} height={200} />
                <div className='flex items-start justify-start mt-4 ml-4 gap-2'>
                  <p className="pointer-events-none block text-base font-medium text-purple-200 ">{file.description}</p> 
                </div>
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
                <div className='flex items-center justify-center mt-4'>
                  {file.type === 'Join' ? (
                    <button
                      onClick={() => handleFollowClick(file.source)}
                      className={`rounded-md px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 bg-indigo-600`}
                    >
                      {follow[file.source] ? <span>Following</span> : 'Follow'}
                    </button>
                  ) : (
                    <button
                      onClick={handleOpenCreateCommunity}
                      className="rounded-md px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 bg-blue-600"
                    >
                  Create
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
