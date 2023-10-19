import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { useConnect } from '@connect2ic/react';
import { useGetCollectionsCreatedByPrincipal } from '@/hooks';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown({ setCollection, collection }) {
  const { activeProvider } = useConnect();
  const { data: collections } = useGetCollectionsCreatedByPrincipal({
    principal: activeProvider?.principal,
  });

  return (
    <Menu as="div" className="relative flex text-left">
      <div>
        <label
          htmlFor="about"
          className="block text-sm font-medium leading-6 text-white"
        >
          Collection
        </label>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 mt-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {collection.name}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-56 origin-top-right mt-20 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {collections?.map((collection) => (
              <Menu.Item key={`${collection.id}`}>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => {
                      setCollection({
                        name: collection.name,
                        id: collection.id,
                      });
                    }}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    )}
                  >
                    {collection.name}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
