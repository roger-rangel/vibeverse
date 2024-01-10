'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

export default function SearchBar() {

  return (
    <div className="flex flex-1 justify-center px-2 lg:justify-end items-center">
      <div className="w-full max-w-lg lg:max-w-xs">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative text-gray-400">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="search"
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-white focus:ring-2 border-pink-300 focus:ring-offset-indigo-600 sm:text-sm sm:leading-6 bg-white/5"
            placeholder="Search"
            type="search"
            name="search_randomstring"
            autocomplete="off"
          />
        </div>
      </div>
    </div>
  );
}