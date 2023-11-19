import React, { useState } from 'react';
import Image from 'next/image';

// Define the interface for follow states
interface Follow {
  [key: string]: boolean;
}

export function AllCommunities() {
  // Initialize a state object to track the follow state of each community
  const [follow, setFollow] = useState<Follow>({});

  // Function to handle follow/unfollow click
  const handleFollowClick = (source: string) => {
    setFollow(prevStates => ({
      ...prevStates,
      [source]: !prevStates[source]
    }));
  };

  const communities = [
    {
      communityID: '1',
      name: "AI Music School",
      description: "AI Musicians from California",
      image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1181.png',
    },
    {
      communityID: '2',
      name: "Virtual Reality Club",
      description: "VR Fanatics using AI tools",
      image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1188.png',
    },
    {
      communityID: '3',
      name: "Sci-FI Movies",
      description: "Sci-Fi Film Lovers",
      image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1184.png',
    },
    {
      communityID: '4',
      name: "Stable Diffusion Fans",
      description: "Stable Diffusion Fan Community",
      image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1190.png',
    },
  // More communities...
  ];

  return (
    <div className='mx-10'>
      <div className="pt-12 pb-20"> 
        <ul role="list" className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-6 xl:gap-x-8">
          {communities.map((file) => (
            <li key={file.communityID} className="relative">
              <div className="group relative aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 border border-green-300">
                <Image src={'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Runway_2023-11-10T12_44_47.434Z_Erase_and_Replace_sky.png'} alt="" className="pointer-events-none object-cover group-hover:border-2 rounded-lg" width={200} height={200} />
                <div className='flex items-start justify-start mt-4 ml-4 gap-2'>
                  <p className="pointer-events-none block text-base font-medium text-purple-200 ">{file.name}</p> 
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-end items-end"> 
                  <Image
                    src={file.image}
                    alt="community"
                    className={`flex mb-2 mr-4 items-center`}
                    width="50"
                    height="50"
                  />
                </div>
                <button type="button" className="absolute inset-0 focus:outline-none">
                  <span className="sr-only">View details for ...</span>
                </button>
              </div>

              <div className={`flex-col items-center gap-2 mt-2 justify-center`}>
                <div className='flex items-center justify-center mt-4'>
                  <button
                    onClick={() => handleFollowClick(file.image)}
                    className={`rounded-md px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 bg-gradient-to-r from-gray-700 via-gray-900 to-black`}
                  >
                    {follow[file.image] ? <span>Following</span> : 'Follow'}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
