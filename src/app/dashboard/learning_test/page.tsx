'use client';

import { Roboto } from 'next/font/google';

import { Dashboard } from '@/components/learning';

const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
});

export default function AIContent() {
  return (
    <div
      className={
        roboto.className +
        ` relative mx-auto min-h-[inherit] bg-[url('https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Elias_Nunes_pixar_art_adult_male_age_50_short_black_hair_Europe_0456a681-4d9a-487b-a648-999a308a257b.png')] bg-cover`
      }
    >
      <Dashboard />
    </div>
  );
}
