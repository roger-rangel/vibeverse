'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { Preview } from '@/components/dashboard/home';
import { Mixpanel } from '@/components/Mixpanel';
import Sign from '@/components/dashboard/shorts/sign';
import Header from '@/components/dashboard/aitools/header';

export default function Dashboard() {
  useEffect(() => {
    Mixpanel.track('Dashboard visited');
  }, []);

  return (
    <div className="relative mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <Image
        src="/images/dashboard/magical_castle.png"
        layout="fill"
        objectFit="cover"
        quality={100}
        alt="Background"
      />
      <div className="relative mb-20">
        <Preview />
        <Sign />
        <Header />
      </div>
    </div>
  );
}
