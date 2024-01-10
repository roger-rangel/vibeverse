import Image from 'next/image';

export function FinalAnimation() {
  return (
    <div className="fixed inset-0 z-50">
      <Image
        src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/forest_background.jpeg"
        layout="fill"
        objectFit="cover"
        alt="Forest Background"
        className="object-cover"
      />
      <div className="relative z-10 text-white flex flex-col justify-center items-center h-full">
        {/* Place your content here */}
        <p className="mb-6 font-bold text-5xl">LESSON COMPLETE</p>
        <div className="flex gap-x-4">
          <div className="text-md bg-green-200 text-green-500 rounded-lg animate-slide-up py-0.5 px-1.5 flex items-center">
            <Image 
              src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/diamond.png"
              alt="Good Job"
              width={50}
              height={50}
              className="flex items-center h-6 w-6"
            />
            {/* <PlusIcon className="h-4 w-4 font-bold" /> */}
              +10
            <h2 className="ml-1">VIBES</h2>
          </div> 
          <div className="text-md bg-green-200 text-green-500 rounded-lg animate-slide-up py-0.5 px-1.5 flex items-center">
            <Image 
              src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/mobile_vibeverse.png"
              alt="Good Job"
              width={50}
              height={50}
              className="flex items-center h-3 w-4 mr-2"
            />
            {/* <PlusIcon className="h-4 w-4 font-bold" /> */}
              +50
            <h2 className="ml-1">EXP</h2>
          </div> 
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 w-full max-w-xl mx-auto">
        <button className="w-full py-3 text-center bg-black text-white rounded-lg">
            Continue
        </button>
        <button className="mt-2 w-full py-3 text-center bg-white text-black rounded-lg">
            Redo Lesson
        </button>
      </div>
    </div>
  );
}