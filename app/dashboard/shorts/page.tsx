import { Trending, Header } from '@/components/dashboard/shorts';

export default function Shorts() {
  return (
    <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8 bg-gradient-to-r from-[#8360c3] to-[#2ebf91]">
      <Trending />
      <Header />
    </div>
  );
}
