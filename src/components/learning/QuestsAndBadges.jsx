import Image from 'next/image';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';

const sections = [
  {
    id: 1,
    title: 'Current',
    menu_item: 'Join',
    name: 'Daily Quests',
    imageUrl: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/map.png',
    icons: [ 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/dragon.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/dragon_(2).png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/dragon_(1).png'],
    iconMessages: ['AI Music', 'AI Artwork', 'AI Video'],
  },
  {
    id: 2,
    title: 'Claim now',
    menu_item: 'Earn',
    name: 'Tokens',
    imageUrl: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/coin.png',
    icons: [ 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/coin_(1).png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/coin_(2).png'],
    iconMessages: ['+20', '+30'],
  },
  {
    id: 3,
    title: 'Recent',
    menu_item: 'Claim',
    name: 'Awards',
    imageUrl: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/badge.png',
    icons: [ 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/key.png', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/diamond.gif', 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/blue_ball.gif'],
    iconMessages: ['Premiuim Access', 'New Rank', 'New Skill'],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function QuestsAndBadges() {
  return (
    <ul role="list" className="hidden lg:grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {sections.map((section) => (
        <li key={section.id} className="rounded-xl border border-gray-200">
          <div className="flex items-center gap-x-4 rounded-t-xl border-b border-gray-900/5 bg-gray-900 p-2">
            <Image
              src={section.imageUrl}
              alt={section.name}
              className="h-8 w-8 p-1 flex-none rounded-lg object-cover ring-1 ring-gray-900/10"
              width={48}
              height={48}
            />
            <div className="text-sm font-medium leading-6 text-gray-100">{section.name}</div>
            <Menu as="div" className="relative ml-auto">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open options</span>
                <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-gray-900 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none border border-gray-200">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-800' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-200'
                        )}
                      >
                        View<span className="sr-only">, {section.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-800' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-200'
                        )}
                      >
                        {section.menu_item}<span className="sr-only">, {section.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <dl className="divide-y divide-gray-100 px-6 py-2 text-sm leading-6 bg-black bg-opacity-30 rounded-b-xl">
            <div className="flex items-center justify-between gap-x-4 py-3">
              <dt className="text-white">{section.title}</dt>
              <dd className="text-white flex items-center justify-end gap-x-2">
                {section.icons.map((icon, index) => (
                  <div key={icon} className="relative group">
                    <Image
                      src={icon}
                      alt=""
                      className="h-8 w-8 p-1 flex rounded-lg bg-slate-400 object-cover ring-1 ring-gray-900/10"
                      width={24}
                      height={24}
                    />
                    <span className="absolute hidden group-hover:block w-auto p-2 m-2 min-w-max left-0 top-full transform -translate-y-1 bg-black text-white text-xs rounded-md shadow-sm">
                      {section.iconMessages[index]}
                    </span>
                  </div>
                ))
                }
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
