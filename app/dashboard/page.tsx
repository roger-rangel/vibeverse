'use client';

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
    <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8 bg-gradient-to-r from-[#8360c3] to-[#2ebf91] ">
      <Preview />
      <Sign />
      <Header />
    </div>
  );
}
