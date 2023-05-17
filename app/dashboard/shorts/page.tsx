import Trending from '../../../components/dashboard/shorts/trending';
import Header from '../../../components/dashboard/shorts/sign'; 

export default function Shorts() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 bg-gradient-to-r from-[#8360c3] to-[#2ebf91]">
      <Trending />
      <Header />
    </div>
  );
}
