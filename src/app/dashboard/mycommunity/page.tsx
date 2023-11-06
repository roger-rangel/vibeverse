'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Roboto } from 'next/font/google';
import { Mixpanel } from '@/components/Mixpanel';

const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
});

export default function MyCommunity() {
  return (
    <div
      className={
        roboto.className +
        " relative min-h-[inherit] bg-[url('/images/dashboard/sofa.png')] bg-cover"
      }
    >
      <div>
        
      </div>
    </div>
  );
}
