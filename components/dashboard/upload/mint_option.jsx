import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';

const receiverOptions = [
  { name: 'Myself', receiver: true },
  { name: 'Fren', receiver: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Mint_Option() {
  const [receiver, setReceiver] = useState(receiverOptions[2]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mt-8 text-sm font-medium leading-6 text-white">Send to:</h2>
      </div>

      <RadioGroup value={receiver} onChange={setReceiver} className="mt-2">
        <RadioGroup.Label className="sr-only">Choose the receiver</RadioGroup.Label>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {receiverOptions.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active, checked }) =>
                classNames(
                  option.receiver ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-25',
                  active ? 'ring-2 ring-indigo-600 ring-offset-2' : '',
                  checked
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                    : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                  'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1'
                )
              }
              disabled={!option.receiver}
            >
              <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

