'use client';

import { FormEventHandler, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Modal, ModalProps } from '@/components/Modal';
import { avatars } from '@/constants';
import { useActor } from '@/hooks';
import { toast } from 'react-toastify';

export default function AvatarModal(props: ModalProps) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const { actor } = useActor();
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!actor) return;

    await actor.set_creator_metadata(name, avatar);
    toast.success("Profile created! Let's go 🚀");
    props.hideModal();
    router.push('/dashboard');
  };

  return (
    <Modal {...props}>
      <div className="bg-gray-900 rounded-lg overflow-y-auto max-h-[calc(100%-2rem)] p-8 w-full max-w-2xl border border-indigo-600">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12 ">
            <div className="border-white/10 pb-6">
              <div className="flex justify-between mb-4 items-center">
                <h2 className="text-3xl font-semibold leading-7 text-white">
                  LET&apos;S GET STARTED
                </h2>
                <button
                  onClick={props.hideModal}
                  type="button"
                  className="rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
                        className="flex-1 border-0 bg-transparent py-1.5 px-2 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Choose a cool name  🦜"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <label
            htmlFor="avatar"
            className="block text-sm font-medium text-white mb-4"
          >
            Choose an Avatar
          </label>

          <div className="overflow-y-auto h-60">
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 p-2"
            >
              {avatars.map((avatar) => (
                <li
                  key={avatar.source}
                  value={avatar.source}
                  className="relative"
                  onClick={() => setAvatar(avatar.source)}
                >
                  <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 ">
                    <Image
                      src={avatar.source}
                      alt=""
                      width={200}
                      height={200}
                      className="pointer-events-none object-cover group-hover:opacity-75"
                    />
                    <button
                      type="button"
                      className="absolute inset-0 focus:outline-none"
                    >
                      <span className="sr-only">
                        View details for {avatar.title}
                      </span>
                    </button>
                  </div>
                  <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                    {avatar.title}
                  </p>
                  <p className="pointer-events-none block text-sm font-medium text-gray-500">
                    {avatar.size}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={props.hideModal}
              type="button"
              className="text-sm font-semibold leading-6 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
