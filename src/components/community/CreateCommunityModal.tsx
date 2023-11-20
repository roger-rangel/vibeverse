import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Modal, ModalProps } from '@/components/Modal';
import { useCreateCommunity, CreateCommunityProps } from '@/hooks';
import ConnectSocials from './ConnectSocials';
import Categories from './Categories';

const community_pictures = [
  {
    id: 1,
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1178.png',
  },
  {
    id: 2,
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1177.png',
  },
  {
    id: 3,
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1181.png',
  },
  {
    id: 4,
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1179.png',
  },
  {
    id: 5,
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1184.png',
  },
  {
    id: 6,
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1190.png',
  },
  {
    id: 7,
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1186.png',
  },
  {
    id: 8,
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1188.png',
  },
];

export function CreateCommunityModal({ isOpen, hideModal }: ModalProps) {
  const [selectedPicture, setSelectedPicture] = useState<number | undefined>(
    undefined,
  );
  const { register, handleSubmit, setValue } = useForm<CreateCommunityProps>();
  const { mutateAsync: createCommunity } = useCreateCommunity();
  const onSubmit: SubmitHandler<CreateCommunityProps> = (data) => {
    console.log(data);
    toast.promise(createCommunity(data), {
      pending: 'Creating community....',
      error: 'Error',
      success: {
        render: (slug) => {
          hideModal();
          return `Created community with slug ${slug.data}`;
        },
      },
    });
  };

  return (
    <Modal isOpen={isOpen} hideModal={hideModal}>
      <form
        className="max-h-[calc(100vh-2rem)] w-full max-w-2xl items-center justify-center overflow-y-auto rounded-lg border border-indigo-600 bg-gray-900 p-8 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="border-b border-white/10 pb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-3xl font-semibold leading-7 text-white">
              Create Your Community
            </h2>
            <button
              onClick={hideModal}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-1 text-gray-400 hover:bg-purple-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Close menu</span>

              <svg
                className="h-6 w-6"
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

          <div className="mt-4 flex items-center">
            <Image
              src={`/images/dashboard/what_is_nft.png`}
              alt="what_is_nft"
              className={`flex h-8 w-8 items-center rounded-full`}
              width="40"
              height="40"
            />
            <p className="ml-2 items-center text-sm leading-6 text-gray-400">
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
          <div className="my-6 flex w-3/4 flex-col gap-4">
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="slug" className="text-sm font-medium text-white">
                Community ID
              </label>
              <input
                type="text"
                className="max-w-xs flex-1 rounded-md border-0 bg-white/5 p-2 text-white ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="This is your community unique ID"
                {...register('slug')}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="name" className="text-sm font-medium text-white">
                Name
              </label>
              <input
                type="text"
                className="max-w-xs flex-1 rounded-md border-0 bg-white/5 p-2 text-white ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="This is your Brand Name :)"
                {...register('name')}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-white"
              >
                Description
              </label>
              <input
                type="text"
                className="max-w-xs flex-1 rounded-md border-0 bg-white/5 p-2 text-white ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="This is your community description"
                {...register('description')}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              * This can be changed later on Settings {'  '}
              <Link href="/roadmap">
                <button className="text-indigo-500 hover:text-indigo-600">
                  {' '}
                  2024 Roadmap
                </button>
              </Link>
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-white"
              >
                Choose an Image for your Community
              </label>
              <div className="mt-2">
                <ul className="grid grid-cols-1 gap-x-1 gap-y-1 xs:grid-cols-2 sm:grid-cols-4">
                  {community_pictures.map((picture) => (
                    <li
                      key={picture.id}
                      onClick={() => {
                        setSelectedPicture(picture.id);
                        setValue('logo', picture.image);
                      }}
                    >
                      <Image
                        src={picture.image}
                        alt="Product screenshot"
                        className={`block w-full py-1.5 shadow-sm ring-1 ring-inset hover:cursor-pointer ${
                          selectedPicture === picture.id
                            ? 'ring-indigo-500'
                            : 'ring-white/10'
                        } focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                        width={1000}
                        height={1000}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-center gap-x-2 md:flex-row">
              <div className="flex items-center">
                <Image
                  src={`https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/120430.webp`}
                  alt="what_is_nft"
                  className={`flex h-8 w-8 items-center rounded-full`}
                  width="40"
                  height="40"
                />
                <label
                  htmlFor="about"
                  className="block pl-2 text-base font-medium leading-6 text-white"
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
            <div className="col-span-full opacity-10">
              <div className="mt-4">
                <ConnectSocials />
              </div>

              <div className="mt-16">
                <Categories />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={hideModal}
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
    </Modal>
  );
}
