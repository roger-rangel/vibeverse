import { useState } from 'react';
import Image from 'next/image';
import { RadioGroup } from '@headlessui/react';

const settings = [
  {
    name: 'Deploy to the Internet Computer',
    description: 'Drop your collection in order to monetize your content',
    logo: 'icp_logo.png',
    height: '4',
  },
  {
    name: 'Coming Soon',
    description:
      'This feature is currently in development and will be available soon',
    logo: 'btc_logo.gif',
    height: '8',
    disabled: true,
  },
];

function className(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ModalCollection({ showModal, showCreateCollection }) {
  const [selected, setSelected] = useState(settings[0]);

  const handleClose = () => {
    showModal(false);
  };

  const handleCreate = () => {
    showCreateCollection(true);
    handleClose();
  };

  return (
    <div className="flex flex-col">
      <RadioGroup value={selected} onChange={setSelected}>
        <RadioGroup.Label className="sr-only">
          Collection setting
        </RadioGroup.Label>
        <div className="-space-y-px rounded-md bg-gray-900 p-8 border border-indigo-600">
          <div className="flex justify-between mb-4 items-center">
            <h2 className="text-xl font-semibold text-gray-200">
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {settings.map((setting, settingIdx) => (
            <RadioGroup.Option
              key={setting.name}
              value={setting}
              disabled={setting.disabled}
              className={({ checked }) =>
                className(
                  settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                  settingIdx === settings.length - 1
                    ? 'rounded-bl-md rounded-br-md'
                    : '',
                  checked
                    ? 'z-10 border-indigo-200 bg-indigo-200'
                    : 'border-gray-200',
                  'relative flex cursor-pointer border p-4 focus:outline-none',
                  setting.disabled ? 'opacity-50 cursor-not-allowed' : '',
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <Image
                    src={`/images/logos/${setting.logo}`}
                    alt=""
                    className={`flex h-${setting.height} w-8 rounded-full items-center`}
                    width="40"
                    height="40"
                  />
                  <span className="flex-grow flex flex-col ml-3">
                    <RadioGroup.Label
                      as="span"
                      className={className(
                        checked ? 'text-indigo-900' : 'text-gray-100',
                        'block text-sm font-medium',
                      )}
                    >
                      {setting.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className={className(
                        checked ? 'text-indigo-700' : 'text-gray-500',
                        'block text-sm',
                      )}
                    >
                      {setting.description}
                    </RadioGroup.Description>
                  </span>
                  <span
                    className={className(
                      checked
                        ? 'bg-indigo-600 border-transparent'
                        : 'bg-white border-gray-300',
                      active ? 'ring-2 ring-offset-2 ring-indigo-600' : '',
                      setting.disabled
                        ? 'hidden'
                        : 'bg-blue-500 border-transparent',
                      'h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center ml-10',
                    )}
                    aria-hidden="true"
                  >
                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                  </span>
                </>
              )}
            </RadioGroup.Option>
          ))}
          <div>
            <button
              onClick={handleCreate}
              className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 mt-8 rounded w-full"
            >
              Confirm
            </button>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
}
