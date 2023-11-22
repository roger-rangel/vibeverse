import React, { useState } from 'react';
import { useModal } from 'react-modal-hook';
import Image from 'next/image';
import Link from 'next/link';

import { CreateCommunityModal } from './CreateCommunityModal';

// Define the interface for follow states
interface Follow {
  [key: string]: boolean;
}

export function CommunitySection() {
  // Initialize a state object to track the follow state of each community
  const [follow, setFollow] = useState<Follow>({});

  // Function to handle follow/unfollow click
  const handleFollowClick = (source: string) => {
    setFollow((prevStates) => ({
      ...prevStates,
      [source]: !prevStates[source],
    }));
  };

  const [showModal, hideModal] = useModal(
    () => <CreateCommunityModal isOpen hideModal={hideModal} />,
    [],
  );

  const files = [
    {
      type: 'Join',
      path: '/dashboard/curious-refuge',
      source:
        'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/4f2a08b961c6c95bedb5ed4d2cc39513.gif',
      logo: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Curious_Refuge_Logo_White_Flat.png',
      height: 'h-6',
      width: 'w-32',
      rounded: 'rounded',
      border: 'border-none',
      description: 'AI Filmmaking School',
      margin: 'mb-2 mr-2',
      difficulty: 'Beginner',
      difficultyColor: 'bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400',
    },
    {
      type: 'Join',
      path: '/dashboard/white-mirror',
      source:
        'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/dc3694a9a00b8977d0bbd26541ffbe58.gif',
      logo: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Screenshot_2023-08-26_at_5_50_29_PM-removebg-preview.png',
      height: 'h-12',
      width: 'w-24',
      rounded: 'rounded',
      border: 'border-none',
      description: 'AI Film Studio',
      difficulty: 'Advanced',
      difficultyColor:
        'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
    },
    {
      type: 'Create',
      path: null, // No redirection for this item
      source:
        'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/238bd7250a953bbd9e0387410f462e4a_(1).gif',
      logo: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1169.png',
      height: 'h-10',
      width: 'w-10',
      rounded: 'rounded-none',
      description: 'Create My Own',
      margin: 'mb-2 mr-2',
      difficulty: 'New Journey',
      difficultyColor:
        'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500',
    },
    // More files...
  ];

  return (
    <div className="mx-10">
      <div className="pt-6">
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 xl:gap-x-8"
        >
          {files.map((file) => (
            <li key={file.source} className="relative">
              <div className="mb-2 mt-4 flex items-center justify-center">
                <button
                  className={`w-full rounded-md ${file.difficultyColor} pointer-events-none border px-6 py-2 text-sm font-semibold text-white shadow-sm`}
                >
                  {file.difficulty}
                </button>
              </div>
              <div className="group aspect-h-7 aspect-w-10 relative block w-full overflow-hidden rounded-lg border-2 border-indigo-500/100 bg-gray-100">
                <Image
                  src={file.source}
                  alt=""
                  className="pointer-events-none rounded object-cover group-hover:border-2"
                  width={200}
                  height={200}
                />
                <div className="ml-4 mt-4 flex items-start justify-start gap-2">
                  <p className="pointer-events-none block text-base font-medium text-purple-200 ">
                    {file.description}
                  </p>
                </div>
                {file.path ? (
                  <Link href={file.path}>
                    <div className="absolute inset-0 focus:outline-none">
                      <span className="sr-only">View details for {file.description}</span>
                    </div>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="absolute inset-0 focus:outline-none"
                    onClick={showModal}
                  >
                    <span className="sr-only">Create Community</span>
                  </button>
                )}
              </div>

              <div
                className={`mt-2 flex-col items-center justify-center gap-2`}
              >
                <div className="mt-4 flex items-center justify-center">
                  {file.type === 'Join' ? (
                    <button
                      onClick={() => handleFollowClick(file.source)}
                      className={`rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500`}
                    >
                      {follow[file.source] ? <span>Following</span> : 'Follow'}
                    </button>
                  ) : (
                    <button
                      onClick={showModal}
                      className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
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
