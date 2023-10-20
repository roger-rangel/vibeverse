'use client';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  AcademicCapIcon,
  Bars3Icon,
  BellIcon,
  BuildingStorefrontIcon,
  DocumentDuplicateIcon,
  FilmIcon,
  HomeIcon,
  PaintBrushIcon,
  XMarkIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useConnect, useDialog } from '@connect2ic/react';
import Image from 'next/image';
import Link from 'next/link';

import Nav_User from './nav_user';

import { Banner } from '@/components/dashboard/home';

const navigation = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: HomeIcon,
    current: true,
    color: 'bg-pink-400',
  },
  {
    name: 'AI Tools',
    href: '/dashboard/aitools',
    icon: PaintBrushIcon,
    color: 'bg-orange-400',
  },
  {
    name: 'AI Content',
    href: '/dashboard/browse',
    icon: FilmIcon,
    color: 'bg-blue-400',
  },
  {
    name: 'Upload',
    href: '/dashboard/upload',
    icon: DocumentDuplicateIcon,
    color: 'bg-green-400',
  },
];
const user = [
  {
    id: 1,
    name: 'Profile',
    href: '/dashboard/profile',
    icon: UserCircleIcon,
    initial: 'P',
    current: false,
  },
  {
    name: 'My Community',
    href: '/dashboard/mycommunity',
    icon: BuildingStorefrontIcon,
    initial: 'C',
    current: false,
  },
  {
    name: 'Learning Center',
    href: '/dashboard/learning',
    icon: AcademicCapIcon,
    initial: 'L',
    current: false,
  },
];

function className(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navigation({ children }: React.PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentNavIndex, setCurrentNavIndex] = useState(0);
  const [currentUserIndex, setCurrentUserIndex] = useState(-1);
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  const { isConnected } = useConnect();
  const dialog = useDialog();

  useEffect(() => {
    navigation.forEach((nav, index) => {
      if (isSelected(nav)) {
        setCurrentNavIndex(index);
      }
    });
  }, []);

  function isSelected(item: any) {
    const parts = window.location.href.split('/');
    const path = parts[parts.length - 1];
    return item.href.endsWith(path);
  }

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>
            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5 -ml-32"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component */}
                  <div className="flex grow z-100 flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center ml-8 mt-2 -mb-4">
                      <Image
                        src="/images/logos/vibeverse.png"
                        alt="logo"
                        width={150}
                        height={75}
                      />
                    </div>
                    <nav className="flex flex-1 flex-col mt-2">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item, index) => (
                              <li key={item.name}>
                                <Link
                                  onClick={() => {
                                    setCurrentUserIndex(-1);
                                    setCurrentNavIndex(index);
                                  }}
                                  href={item.href}
                                  className={className(
                                    currentNavIndex == index
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            MY VIBE
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {user.map((section, index) => (
                              <li key={section.name}>
                                <Link
                                  href={section.href}
                                  onClick={() => {
                                    setCurrentNavIndex(-1);
                                    setCurrentUserIndex(index);
                                  }}
                                  className={className(
                                    currentNavIndex == index
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {section.initial}
                                  </span>
                                  <span className="truncate">
                                    {section.name}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 sm:z-10 lg:z-40 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 border-r-2 border-indigo-500/75">
            <div className="flex items-center">
              <div className="-ml-2 mt-2 -mb-2">
                <Image
                  src="/images/logos/vibeverse.png"
                  alt="logo"
                  width={150}
                  height={75}
                  className="w-32 h-auto sm:w-40 md:w-48 lg:w-56"
                />
              </div>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item, index) => (
                      <li key={item.name}>
                        <Link
                          onClick={() => {
                            setCurrentUserIndex(-1);
                            setCurrentNavIndex(index);
                          }}
                          href={item.href}
                          className={className(
                            currentNavIndex == index
                              ? `${item.color} text-white`
                              : 'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    MY VIBE
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {user.map((section, index) => (
                      <li key={section.name}>
                        <Link
                          href={section.href}
                          onClick={() => {
                            setCurrentNavIndex(-1);
                            setCurrentUserIndex(index);
                          }}
                          className={className(
                            currentUserIndex == index
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            <section.icon
                              className="h-3 w-3 shrink-0"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="truncate">{section.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 flex h-16 z-40 shrink-0 items-center gap-x-4 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 bg-gray-900 border-b-2 border-indigo-500/75">
            <Image
              src="/images/logos/vibe_mobile.png"
              alt="logo"
              width={30}
              height={30}
              className="lg:hidden mr-2"
            />
            <button
              type="button"
              className="-m-6 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 z-1">
              <div className="relative flex flex-1 text-white font-bold py-4 px-4">
                {/* TODO : add demo button */}
              </div>
              {/* TODO SUMMER: ADD FORM HERE FOR SEARCH BAR */}
              <div className="flex items-center gap-x-4 lg:gap-x-4">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}

                {isConnected ? (
                  <Nav_User />
                ) : (
                  <button
                    className="button-gradient text-white font-bold py-2 px-4 rounded-3xl"
                    onClick={() => dialog.open()}
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>

          <main className="w-full text-2xl font-semibold text-gray-900">
            {children}
          </main>
        </div>
      </div>
      {isBannerOpen && <Banner setIsBannerOpen={setIsBannerOpen} />}
    </>
  );
}
