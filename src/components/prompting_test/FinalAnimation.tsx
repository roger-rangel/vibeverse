import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function FinalAnimation() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50">
      {/* Earth Image in the top right corner */}
      <div className="absolute right-0 top-0 z-50 p-4">
        <Image
          src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/earth.png"
          alt="Earth"
          width={24} // Adjust the size as needed
          height={24} // Adjust the size as needed
          className="h-8 w-8 cursor-pointer"
        />
      </div>
      <Image
        src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/forest_background.jpeg"
        layout="fill"
        objectFit="cover"
        alt="Forest Background"
        className="object-cover"
      />
      <div className="absolute right-1/2 top-1/2 z-10 flex -translate-y-1/2 translate-x-1/2 flex-col items-center justify-center text-white">
        {/* Place your content here */}
        <p className="mb-8 text-center text-5xl font-bold">LESSON COMPLETE</p>
        <div className="flex gap-x-4">
          <div className="text-md flex animate-slide-up items-center rounded-lg bg-green-200 px-1.5 py-0.5 text-green-500">
            <Image
              src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/diamond.png"
              alt="Good Job"
              width={50}
              height={50}
              className="flex h-6 w-6 items-center"
            />
            {/* <PlusIcon className="h-4 w-4 font-bold" /> */}
            +10
            <h2 className="ml-1">VIBES</h2>
          </div>
          <div className="text-md flex animate-slide-up items-center rounded-lg bg-green-200 px-1.5 py-0.5 text-green-500">
            <Image
              src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/mobile_vibeverse.png"
              alt="Good Job"
              width={50}
              height={50}
              className="mr-2 flex h-3 w-4 items-center"
            />
            {/* <PlusIcon className="h-4 w-4 font-bold" /> */}
            +50
            <h2 className="ml-1">EXP</h2>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 mx-auto w-full max-w-xl -translate-x-1/2 transform p-4">
        <button
          className="w-full rounded-lg bg-black py-3 text-center text-white"
          onClick={() => router.push('/dashboard')}
        >
          Continue
        </button>
        <button className="mt-2 w-full rounded-lg bg-white py-3 text-center text-black">
          Redo Lesson
        </button>
      </div>
    </div>
  );
}
