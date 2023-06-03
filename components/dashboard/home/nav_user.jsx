'use client';

import Image from 'next/image';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import About from '../profile/about';

export default function Nav_User() {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="-m-1.5 flex items-center p-1.5">
        <span className="sr-only">Open user menu</span>
        <Image
          className="h-8 w-8 rounded-full bg-gray-800"
          src="/images/dashboard/avatar.png"
          alt=""
          width={32}
          height={32}
        />
        <span className="hidden lg:flex lg:items-center">
          <span
            className="ml-4 text-sm font-semibold leading-6 text-green-400"
            aria-hidden="true"
          >
            Ragnar
          </span>
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
        <Menu.Items className="absolute right-0 xs:-right-4 sm:-right-6 md:right-0 mt-4 pb-20 lg:pr-10 w-screen max-w-3xl origin-top-right rounded-3xl bg-gray-900 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          {/* {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={[
                    active ? 'bg-gray-50' : '',
                    'block px-3 py-1 text-sm leading-6 text-gray-900',
                  ]}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))} */}

          <Menu.Item className="flex relative z-[max] justify-center align-middle">
            <About />
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
