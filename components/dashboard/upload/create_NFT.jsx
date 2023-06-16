import { useState, useEffect } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';

import Mint_Option from './mint_option.jsx';
import Img_Option from './img_option.jsx';

import BackendActor from '@/components/BackendActor';
import Dropdown from '@/components/dashboard/upload/dropdown';
import { AssetManager } from '@dfinity/assets';
import { canisterId } from '@/declarations/vibeverse_assets';
import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

import { Connect2ICProvider, useConnect } from '@connect2ic/react';
import { createClient } from '@connect2ic/core';
import { NFID } from '@connect2ic/core/providers/nfid';
import { Mixpanel } from '@/components/Mixpanel';

function CreateNFT({ showCreateNFT }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [collection, setCollection] = useState({ name: 'Options', id: -1 });
  const [imageOption, setImageOption] = useState('upload');
  const [mintOption, setMintOption] = useState('self');
  const { activeProvider } = useConnect();

  const isLocal = !window.location.host.endsWith('ic0.app');

  const handleClose = () => {
    showCreateNFT(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(activeProvider);
    console.log('Minting an NFT');
    const actor = new BackendActor();

    // TODO: don't hardcode the receiver!
    const receiver = Principal.from('2vxsx-fae');

    const result = await actor.mintNft(
      activeProvider,
      collection.id,
      receiver,
      name,
      description,
      imageUrl,
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
    let principal = '2vxsx-fae';
    if (activeProvider) {
      principal = activeProvider.principal;
    }

    console.log('Principal: ');
    console.log(principal);

    const agent = new HttpAgent({
      host: isLocal
        ? `http://127.0.0.1:${window.location.port}`
        : `https://ic0.app`,
      principal,
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
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto z-50 ">
      <div className="bg-gray-900 rounded-lg overflow-y-auto max-h-[calc(100%-2rem)] p-8 w-full max-w-2xl mx-4 my-8 border border-indigo-600">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12 ">
            <div className="border-b border-white/10 pb-12">
              <div className="flex justify-between mb-4 items-center">
                <h2 className="text-3xl font-semibold leading-7 text-white">
                  Create NFT
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
              <div className="flex items-center mt-4">
                <Image
                  src={`/images/dashboard/what_is_nft.gif`}
                  alt=""
                  className={`flex h-8 w-8 rounded-full items-center`}
                  width="40"
                  height="40"
                />
                <p className="ml-2 text-sm leading-6 text-gray-400 items-center">
                  What is an NFT?{' '}
                  <Link
                    className="text-blue-400 underline"
                    href="https://nftnow.com/guides/what-is-nft-meaning/"
                    target="_blank"
                  >
                    Learn more
                  </Link>
                </p>
              </div>
              <p className="mt-1 text-sm leading-6 text-purple-200 px-2">
                An NFT is a digital item that shows you own something cool and
                unique online.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Purple Monkey "
                      />
                    </div>
                  </div>
                </div>

                <Dropdown
                  setCollection={setCollection}
                  collection={collection}
                  className="block"
                />

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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    Write a few sentences about your new NFT.
                  </p>
                </div>

                <div className="col-span-full">
                  <Img_Option setImageOption={setImageOption} />
                  <label
                    htmlFor="cover-photo"
                    className="block mt-4 text-sm font-medium leading-6 text-white"
                  >
                    Attach Asset
                  </label>
                  {imageOption == 'upload' ? (
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
                  ) : (
                    <div className="mt-4">
                      <input
                        type="text"
                        name="existing_url"
                        id="existing_url"
                        placeholder="add link to your asset here :)"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <Mint_Option setMintOption={setMintOption} />
                {mintOption == 'other' && (
                  <div className="mt-4">
                    <input
                      type="text"
                      name="wallet_receiver"
                      id="wallet_receiver"
                      placeholder="who will receive the NFT? put their wallet ID here :)"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
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
              Create New NFT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CreateNFTWrapped({ showCreateNFT }) {
  const client = createClient({ providers: [new NFID()] });

  useEffect(() => {
    Mixpanel.track('Creating an NFT');
  }, []);

  return (
    <Connect2ICProvider client={client}>
      <CreateNFT showCreateNFT={showCreateNFT} />
    </Connect2ICProvider>
  );
}
