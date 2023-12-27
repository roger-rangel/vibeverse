'use client';

import Image from 'next/image';
import { Fragment } from 'react';
import { useConnect } from '@connect2ic/react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { useGetProfile } from '@/hooks';

export default function Nav_User() {
  const { activeProvider, disconnect } = useConnect();
  const { data: profile } = useGetProfile({
    principal: activeProvider?.principal,
  });

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="-m-1.5 flex items-center p-1.5">
        <span className="sr-only">Open user menu</span>
        <Image
          className="h-8 w-8 rounded-full bg-gray-800"
          src={
            profile ? profile.avatar : '/images/avatars/avatar_nav_right.png'
          }
          alt=""
          width={50}
          height={50}
        />
        <span className="hidden lg:flex lg:items-center">
          <ChevronDownIcon
            className="ml-2 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
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
        <Menu.Items className="absolute right-0 mt-4 flex w-60 origin-top-right flex-col gap-2 rounded-lg border border-indigo-600 bg-gray-900 py-2 shadow-lg ring-1 ring-gray-900/5 xs:-right-4 sm:-right-6 md:right-0">
          <Menu.Item className="">
            <div className="mx-auto py-4">
              <Image
                className="mx-auto h-10 w-10 my-4 rounded-full bg-gray-800"
                src={
                  profile ? profile.avatar : '/images/avatars/avatar_nav_right.png'
                }
                alt=""
                width={50}
                height={50}
              />
              <button
                className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={disconnect}
              >
              Disconnect
              </button>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
