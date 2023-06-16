'use client';

import Image from 'next/image';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import About from '../profile/about/about';

export default function Nav_User() {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="-m-1.5 flex items-center p-1.5">
        <span className="sr-only">Open user menu</span>
        <Image
          className="h-8 w-8 rounded-full bg-gray-800"
          src="/images/avatars/avatar_nav_right.png"
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
        <Menu.Items className="absolute right-0 xs:-right-4 sm:-right-6 md:right-0 mt-4 pb-20 lg:pr-10 w-screen max-w-3xl origin-top-right rounded-3xl bg-gray-900 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none border border-emerald-300">
          <Menu.Item className="flex relative justify-center align-middle ">
            <About />
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
