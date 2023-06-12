import { useState, useEffect, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import BackendActor from '@/components/BackendActor';

import { Connect2ICProvider, useConnect } from '@connect2ic/react';
import { createClient } from '@connect2ic/core';
import { NFID } from '@connect2ic/core/providers/nfid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Dropdown({ setCollection, collection }) {
  const [collections, setCollections] = useState([]);
  const [activeProvider, setActiveProvider] = useState(null);
  const { } = useConnect({
    onConnect: (data) => {
      console.log(data);
      setActiveProvider(data.activeProvider);
    },
  });

  const fetch = async () => {
      const actor = new BackendActor();
      console.log(activeProvider);
      let principal = activeProvider ? activeProvider.principal : '2vxsx-fae';

      const result = await actor.collectionsCreatedBy(principal);
      setCollections(result);
  };

  console.log(collections);

  return (
    <Menu as="div" className="relative flex text-left">
      <div>
        <label
          htmlFor="about"
          className="block text-sm font-medium leading-6 text-white"
        >
          Collection
        </label>
        <Menu.Button onClick={fetch} className="inline-flex w-full justify-center gap-x-1.5 mt-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
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
            {collections.map((collection) => (
              <Menu.Item key={collection.id}>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={(e) => {
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

export default function DropdownWrapper({ setCollection, collection }) {
  const client = createClient({
    providers: [new NFID()],
    globalProviderConfig: {
      dev: false,
    },
  });

  useEffect(() => {
    console.log('');
  }, []);

  return (
    <Connect2ICProvider client={client}>
      <Dropdown setCollection={setCollection} collection={collection} />
    </Connect2ICProvider>
  );
}
