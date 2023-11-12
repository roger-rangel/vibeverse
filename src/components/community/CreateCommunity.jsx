import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useConnect } from '@connect2ic/react';
import { Actor } from '@dfinity/agent';
import { AssetManager } from '@dfinity/assets';
import { Principal } from '@dfinity/principal';

import { DFX_NETWORK } from '@/config';
import { useActor } from '@/providers/ActorProvider';
import { canisterId } from '@/declarations/vibeverse_assets';

import ConnectSocials from '../../components/community/ConnectSocials';
import Categories from '../../components/community/Categories';

export default function CreateCommunity({ handleClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [imageOption, setImageOption] = useState('upload');
  const [mintOption, setMintOption] = useState('self');
  const [receiver, setReceiver] = useState('');
  const { actor, assetActor } = useActor();
  const { activeProvider } = useConnect();
  const [selectedPicture, setSelectedPicture] = useState(null);

  const handlePictureClick = (picture) => {
    setSelectedPicture(picture);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!actor) {
      alert('Actor not found');
      return;
    }

    console.log('Minting a New Communtity');

    let actualReceiver = receiver;
    if (mintOption == 'self') {
      actualReceiver = '2vxsx-fae';
      if (activeProvider && activeProvider.principal) {
        actualReceiver = activeProvider.principal;
      }
    }

    let finalUrl = imageUrl;
    if (imageOption == 'url') {
      finalUrl = customImageUrl;
    }

    const result = await actor.mint_nft(
      BigInt(collection.id),
      Principal.from(actualReceiver),
      name,
      description,
      [finalUrl],
    );
    if ('Err' in result) {
      alert(result.Err);
      return;
    }
    console.dir(result, { depth: null });
    alert(`Minted successfuly`);
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

  const community_pictures = [
    { id: 1, image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1178.png'},
    { id: 2, image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1177.png' },
    { id: 3, image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1181.png' },
    { id: 4, image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1179.png' },
    { id: 5, image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1184.png' },
    { id: 6, image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1190.png' },
    { id: 7, image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1186.png' },
    { id: 8, image: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1188.png' },
  ];

    
  const uploadPhoto = async (e) => {
    const assetManager = await getAssetManager();
    const file = e.target.files[0];

    const fileName = 'nft-' + Date.now() + '.' + file.type.split('/')[1];
    const blob = file.slice(0, file.size, 'image/*');

    const renamedFile = new File([blob], fileName, { type: 'image/*' });
    const key = await assetManager.store(renamedFile);

    let imageUrl = '';
    if (isLocal) {
      imageUrl = `http://localhost:4943${key}?canisterId=${canisterId}`;
    } else {
      imageUrl = `https://${canisterId}.icp0.io${key}`;
    }

    console.log(imageUrl);
    setImageUrl(imageUrl);
  };

  const getAssetManager = async () => {
    const agent = Actor.agentOf(assetActor);

    if (DFX_NETWORK === 'local') {
      agent.fetchRootKey();
    }
    const assetManager = new AssetManager({
      canisterId,
      agent,
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
                  Create Your Community
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center mt-4">
                <Image
                  src={`/images/dashboard/what_is_nft.png`}
                  alt="what_is_nft"
                  className={`flex h-8 w-8 rounded-full items-center`}
                  width="40"
                  height="40"
                />
                <p className="ml-2 text-sm leading-6 text-gray-400 items-center">
                  What is a Community?{' '}
                  <Link
                    className="text-blue-400 underline"
                    href="https://medium.com/ai-vanguard/top-ai-communities-in-2023-403254cb05f1"
                    target="_blank"
                  >
                    Learn more
                  </Link>
                </p>
              </div>

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
                        placeholder="This is your Brand Name :)" 
                      />
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                      * This can be changed later on Settings {'  '}
                    <Link href="/roadmap">
                      <button className="text-indigo-500 hover:text-indigo-600"> 2024 Roadmap</button>
                    </Link>
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Choose an Image for your Community
                  </label>
                  <div className="mt-2">
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-y-1 gap-x-1">
                      {community_pictures.map((picture) => (
                        <div key={picture.id} onClick={() => handlePictureClick(picture)}>
                          <Image
                            src={picture.image}
                            alt="Product screenshot"
                            className={`block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ${
                              selectedPicture?.id === picture.id ? 'ring-indigo-500' : 'ring-white/10'
                            } focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                            width={1000}
                            height={1000}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <div className='flex items-center gap-x-2 flex-col md:flex-row'>
                    <div className='flex items-center'>
                      <Image
                        src={`https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/120430.webp`}
                        alt="what_is_nft"
                        className={`flex h-8 w-8 rounded-full items-center`}
                        width="40"
                        height="40"
                      />
                      <label
                        htmlFor="about"
                        className="block text-base font-medium leading-6 text-white pl-2"
                      >
                        Coming soon!
                      </label>
                    </div>
                    
                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-purple-300"
                      >
                    Import your followers or link your socials
                      </label>
                    </div>
                  </div>

                  <div className="mt-4">
                    <ConnectSocials />
                  </div>

                  <div className="mt-16">
                    <Categories />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                
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
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Create New Community
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}