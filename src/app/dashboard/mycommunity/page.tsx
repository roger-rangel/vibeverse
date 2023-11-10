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
        " relative min-h-[inherit] bg-[url('https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Runway_2023-11-10T12_44_47.434Z_Erase_and_Replace_sky.png')] bg-cover"
      }
      onClick={handleClose}
    >
      {show && (
        <div className="flex items-center justify-center p-12 opacity-75">
          <div className="rounded-2xl p-4">
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
