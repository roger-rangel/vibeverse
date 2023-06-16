import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

const imageOptions = [
  { id: 1, title: 'Upload File', value: "upload" },
  { id: 2, title: 'Existing URL', value: "url" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ImgOption({setImageOption}) {
  return (
    <RadioGroup onChange={setImageOption}>
      <RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900">
        Select a mailing list
      </RadioGroup.Label>

      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {imageOptions.map((imageOption) => (
          <RadioGroup.Option
            key={imageOption.id}
            value={imageOption.value}
            className={({ checked, active }) =>
              classNames(
                checked ? 'border-transparent' : 'border-gray-300',
                active ? 'border-indigo-600 ring-2 ring-indigo-600' : '',
                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                      {imageOption.title}
                    </RadioGroup.Label>
                  </span>
                </span>
                <CheckCircleIcon
                  className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-indigo-600' : 'border-transparent',
                    'pointer-events-none absolute -inset-px rounded-lg'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
