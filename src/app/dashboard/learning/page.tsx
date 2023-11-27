'use client';

import { Roboto } from 'next/font/google';

import { LearningSection } from '@/components/learning';

const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
});

export default function AIContent() {
  return (
    <div
      className={
        roboto.className +
        ` relative mx-auto min-h-[inherit] bg-[url('https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Runway_2023-11-10T12_44_47.434Z_Erase_and_Replace_sky.png')] bg-cover`
      }
    >
      <LearningSection />
    </div>
  );
}
