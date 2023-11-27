'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { Modal, ModalProps } from '@/components/Modal';
import { CreateCourseProps, useCreateCourse } from '@/hooks';

const Editor = dynamic(
  () => {
    return import('../Editor');
  },
  { ssr: false },
);

const coursePictures = [
  {
    id: 1,
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1178.png',
    imageBackground:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/83c88415f53b1bc592c530392336465a-sFMpqJS3R.jpg',
  },
  {
    id: 2,
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1177.png',
    imageBackground:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/e264f0b86d899ad3c469d56d61b8c497-VkwXJoQuz.jpg',
  },
  {
    id: 3,
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1181.png',
    imageBackground:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/f6c22935cba32ef32e48ad8e56757616.jpg',
  },
  {
    id: 4,
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1179.png',
    iamgeBackground:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/80699d1d69750ddde1752f7142cb1e33.jpg',
  },
  {
    id: 5,
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1184.png',
    imageBackground:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/64cf8a7ebb224b88b3e0beec885d4a03.jpg',
  },
  {
    id: 6,
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1190.png',
    imageBackground:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/45b36aee37040e503480f0e8df6285cd.jpg',
  },
  {
    id: 7,
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1186.png',
    imageBackground:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/75222219ad2ef64120f2dc792707e955.jpg',
  },
  {
    id: 8,
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1188.png',
    imageBackground:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/b06a37d072f629c20260456d913b5110.jpg',
  },
];

const awardPrictures = [
  'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_3.png',
  'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_5.png',
];

export function CreateCourseModal({ isOpen, hideModal }: ModalProps) {
  const [selectedPicture, setSelectedPicture] = useState<number | undefined>(
    undefined,
  );
  const [selectedAwardPicture, setSelectedAwardPicture] = useState<
    number | undefined
  >(undefined);
  const { register, handleSubmit, setValue } = useForm<CreateCourseProps>();
  const { mutateAsync: createCourse } = useCreateCourse();
  const onSubmit: SubmitHandler<CreateCourseProps> = (data) => {
    console.log(data);
    toast.promise(createCourse(data), {
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
        <div className="flex flex-col gap-4 border-b border-white/10 pb-12 text-black">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-3xl font-semibold leading-7 text-white">
              Create a new AI course
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

          <div className="flex flex-col gap-2 lg:w-3/4">
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="slug" className="text-sm font-medium text-white">
                Course ID
              </label>
              <input
                type="text"
                className="max-w-xs flex-1 rounded-md border-0 bg-white/5 p-2 text-white ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="This is your community unique ID"
                {...register('slug')}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="title" className="text-sm font-medium text-white">
                Title
              </label>
              <input
                type="text"
                className="max-w-xs flex-1 rounded-md border-0 bg-white/5 p-2 text-white ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="This is your Brand Name :)"
                {...register('title')}
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

            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="title" className="text-sm font-medium text-white">
                Level
              </label>
              <select {...register('level')}>
                <option selected>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="about"
              className="block text-sm font-medium leading-6 text-white"
            >
              Choose a logo for this course
            </label>
            <div className="mt-2">
              <ul className="grid grid-cols-1 gap-x-1 gap-y-1 xs:grid-cols-2 sm:grid-cols-4">
                {coursePictures.map((picture) => (
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

          <div className="flex flex-col gap-2 border border-indigo-600 p-4">
            <h4 className="text-white">Badge</h4>
            <div className="flex flex-row items-center justify-start gap-4">
              <label htmlFor="title" className="text-sm font-medium text-white">
                Badge Name
              </label>
              <input
                type="text"
                className="max-w-xs flex-1 rounded-md border-0 bg-white/5 p-2 text-white ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="This is your Brand Name :)"
                {...register('badge.name')}
              />
            </div>
            <ul className="grid grid-cols-1 gap-x-1 gap-y-1 xs:grid-cols-2 sm:grid-cols-4">
              {awardPrictures.map((picture, id) => (
                <li
                  key={id}
                  onClick={() => {
                    setSelectedAwardPicture(id);
                    setValue('badge.image', picture);
                  }}
                >
                  <Image
                    src={picture}
                    alt="Product screenshot"
                    className={`block w-full py-1.5 shadow-sm ring-1 ring-inset hover:cursor-pointer ${
                      selectedAwardPicture === id
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

          <Editor
            placeholder="Place course content here..."
            onChange={(val) => setValue('content', val)}
          />
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
