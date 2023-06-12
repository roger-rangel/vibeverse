'use client';

import { useState, useEffect } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import BackendActor from '@/components/BackendActor';
import { AssetManager } from '@dfinity/assets';
import { canisterId } from '@/declarations/vibeverse_assets';
import { HttpAgent } from '@dfinity/agent';

import { Connect2ICProvider, useConnect } from '@connect2ic/react';
import { createClient } from '@connect2ic/core';
import { NFID } from '@connect2ic/core/providers/nfid';
import { Mixpanel } from '@/components/Mixpanel';

function CreateCollection({ showCreateCollection }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [limit, setLimit] = useState('');
  const [activeProvider, setActiveProvider] = useState(null);
  const { } = useConnect({
    onConnect: (data) => {
      console.log(data);
      setActiveProvider(data.activeProvider);
    },
  });

  const isLocal = !window.location.host.endsWith('icp0.io');

  useEffect(() => {
    console.log('');
  }, []);

  const handleClose = () => {
    showCreateCollection(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(activeProvider);
    console.log('Creating a collection');
    const actor = new BackendActor();
    const result = await actor.createCollection(
      activeProvider,
      name,
      description,
      imageUrl,
      Number(limit),
    );
    alert(result);
  };

  const tryUploadPhoto = async (e) => {
    try {
      await uploadPhoto(e);
    } catch (err) {
      if (err.message.includes('Caller is not authorized')) {
        alert('Caller is not authorized');
      } else {
        throw err;
      }
    }
  };

  const uploadPhoto = async (e) => {
    const assetManager = getAssetManager();
    const file = e.target.files[0];

    const fileName = 'collection-' + Date.now() + file.type.split('/')[1];
    const blob = file.slice(0, file.size, 'image/*');

    const renamedFile = new File([blob], fileName, { type: 'image/*' });
    const key = await assetManager.store(renamedFile);

    if (isLocal) {
      setImageUrl(
        `http://${window.location.host}${key}?canisterId=${canisterId}`,
      );
    } else {
      setImageUrl(
        `https://${window.location.host}${key}?canisterId=${canisterId}`,
      );
    }

    console.log(imageUrl);
  };

  const getAssetManager = () => {
    console.log('Principal: ');
    console.log(activeProvider.principal);
    const agent = new HttpAgent({
      host: isLocal
        ? `http://127.0.0.1:${window.location.port}`
        : `https://ic0.app`,
      principal: activeProvider.principal,
    });
    agent.fetchRootKey();

    const assetManager = new AssetManager({
      canisterId,
      agent,
      provider: activeProvider,
    });

    return assetManager;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto z-50">
      <div className="bg-gray-900 rounded-lg overflow-y-auto max-h-[calc(100%-2rem)] p-8 w-full max-w-2xl mx-4 my-8 border border-indigo-600">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-white/10 pb-12">
              <div className="flex justify-between mb-4 items-center">
                <h2 className="text-3xl font-semibold leading-7 text-white">
                  Create Collection
                </h2>
                <button
                  onClick={handleClose}
                  type="button"
                  class="rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span class="sr-only">Close menu</span>

                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <p className="mt-1 text-sm leading-6 text-gray-400">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Collection Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                      <span className="flex select-none items-center pl-3 px-3 text-gray-500 sm:text-sm">
                        vibeverse.com/
                      </span>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        autoComplete="title"
                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="my_collection"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    Write a few sentences about what you are creating.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-500"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-400">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            onChange={tryUploadPhoto}
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-white/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-white">
                Mint Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Maximum number of nfts in a collection, can be unlimited
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Max. amount of NFTs
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      onChange={(e) => setLimit(e.target.value)}
                      value={limit}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={handleClose}
              type="button"
              className="text-sm font-semibold leading-6 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Create Collection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CreateCollectionWrapped({ showCreateCollection }) {
  const client = createClient({
    providers: [new NFID()],
    globalProviderConfig: {
      dev: false,
    },
  });

  useEffect(() => {
    Mixpanel.track('Creating a collection');
  }, []);

  return (
    <Connect2ICProvider client={client}>
      <CreateCollection showCreateCollection={showCreateCollection} />
    </Connect2ICProvider>
  );
}
