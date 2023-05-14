import Image from 'next/image';
import Item_3D from '../components/3D/Item_3D'; 
import { item } from '../constants';

import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, count: '5', current: true },
  { name: 'Shorts', href: '#', icon: UsersIcon, current: false },
  { name: 'AI Tools', href: '#', icon: FolderIcon, count: '12', current: false },
  { name: 'AI Content', href: '#', icon: CalendarIcon, count: '20+', current: false },
  { name: 'Upload', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Community', href: '#', icon: ChartPieIcon, current: false },
];
const user = [
  { id: 1, name: 'Profile', href: '#', initial: 'P', current: false },
  { id: 2, name: 'My Tools', href: '#', initial: 'T', current: false },
  { id: 3, name: 'My Content', href: '#', initial: 'C', current: false },
  { id: 4, name: 'Favorites', href: '#', initial: 'F', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
      <div className="flex h-16 shrink-0 items-center">
        <div className="-ml-6 -mt-1">
          <Item_3D item={item[0].logo_3D} scale={0.8} />
        </div>
        <div className="-ml-4 mt-8">
          <h1 className="text-white text-2xl font-semibold ml-2">Vibeverse</h1>
        </div>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                    {item.count ? (
                      <span
                        className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
                        aria-hidden="true"
                      >
                        {item.count}
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">MY VIBE</div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {user.map((section) => (
                <li key={section.name}>
                  <a
                    href={section.href}
                    className={classNames(
                      section.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                      {section.initial}
                    </span>
                    <span className="truncate">{section.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
            >
              <Image
                className="h-8 w-8 rounded-full bg-gray-800"
                src="/images/avatar.png"
                alt=""
                width={32}
                height={32}
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Roger Rangel</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
