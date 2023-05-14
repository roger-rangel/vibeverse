import Image from 'next/image';

import Preview from '../../components/dashboard/preview';
import Categories from '../../components/dashboard/categories';

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-gray-800">
      {/* <Image src="/next.svg" width={200} height={200} alt="Next" /> */}
      <Preview />
      <Categories />
    </div>
  );
}
