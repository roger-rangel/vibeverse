'use client';

import { useEffect } from 'react';
import Preview from '../../components/dashboard/home/preview';
import Categories from '../../components/dashboard/home/categories';
import { Mixpanel } from '@/components/Mixpanel';

export default function Dashboard() {
  useEffect(() => {
    Mixpanel.track('Dashboard visited');
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 bg-gradient-to-r from-[#8360c3] to-[#2ebf91] ">
      <Preview />
      <Categories />
    </div>
  );
}
