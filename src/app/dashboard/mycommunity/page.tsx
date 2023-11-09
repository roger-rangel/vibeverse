'use client';

import { useState } from 'react';
import { Roboto } from 'next/font/google';

import JoinCommunity from '../../../components/community/JoinCommunity';

const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
});

export default function MyCommunity() {
  const [show, setShow] = useState(true); // set initial state based on login status

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div
      className={
        roboto.className +
        " relative min-h-[inherit] bg-[url('/images/dashboard/sofa.png')] bg-cover"
      }
      onClick={handleClose}
    >
      {show && (
        <div className="fixed top-0 left-0 w-full h-full opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4">
            <JoinCommunity />
          </div>
        </div>
      )}
      <div>
        {/* rest of the component */}
      </div>
    </div>
  );
}
