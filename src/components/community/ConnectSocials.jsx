import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';

import Link from 'next/link';
import Image from 'next/image';

const socials = [
  {
    platform: 'Youtube',
    background: '#dc2626',
    imageUrl:
            'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/youtube.png',
    height: '12',
    width: '12',
    border: 'border-purple-200',
    divide: 'divide-gray-200',
    text: 'text-white',
  },
  {
    platform: 'X',
    background: '#030712',
    imageUrl:
          'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/x-logo-twitter-elon-musk_dezeen_2364_col_0-1-1.webp',
    height: '10',
    width: '16',
    border: 'border-purple-200',
    divide: 'divide-gray-200',
    text: 'text-white',
  },
  {
    platform: 'Instagram',
    background: '#9333ea',
    imageUrl:
          'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/141208164806-instagram-logo.png',
    height: '8',
    width: '8',
    border: 'border-purple-200',
    divide: 'divide-gray-200',
    text: 'text-white',
  },
  {
    platform: 'ArtStation',
    background: '#1b262c',
    imageUrl:
          'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/4844574-1.png',
    height: '8',
    width: '8',
    border: 'border-purple-200',
    divide: 'divide-gray-200',
    text: 'text-gray-100',
  },
  {
    platform: 'TikTok',
    background: '#93c5fd',
    imageUrl:
          'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/65f270d7d57999a5f48b8855d4a181b4.png',
    height: '8',
    width: '8',
    border: 'border-[#db2777]',
    divide: 'divide-[#db2777]',
    text: 'text-black',
  },
  {
    platform: 'TikTok',
    background: '#f9a8d4',
    imageUrl:
          'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Pinterest-Logo-2011.png',
    height: '8',
    width: '12',
    border: 'border-[#db2777]',
    divide: 'divide-gray-200',
    text: 'text-[#db2777]',
  },
  // More socials...
];

export default function ConnectSocials() {
  return (
    <ul role="list" className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {socials.map((social) => (
        <li key={social.platform} className={`col-span-1 divide-y divide-gray-200 rounded-lg shadow border ${social.border}`} style={{ backgroundColor: social.background }}>
          <div>
            <div className={`flex divide-x ${social.divide}`}>
              <div className="flex w-0 flex-1">
                <div
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent text-sm font-semibold text-gray-900"
                >
                  <Image
                    src={social.imageUrl}
                    alt="what_is_nft"
                    className={`flex h-${social.height} w-${social.width} items-center`}
                    width="40"
                    height="40"
                  />
                </div>
              </div>
              <div className="-ml-px flex w-0 flex-1 px-2">
                <div
                  className={`relative inline-flex w-0 flex-1 items-center justify-center gap-x-2 rounded-br-lg border border-transparent py-4 text-xs font-semibold ${social.text}`}
                >
                  <ArrowDownTrayIcon className={`h-5 w-5 ${social.text}`} aria-hidden="true" />
                  Import
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
