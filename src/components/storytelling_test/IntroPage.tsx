// Note: Page One Component for Storytelling Test
import Image from 'next/image';

type IntroPageProps = {
  onIntroComplete: () => void;
};

export function IntroPage({ onIntroComplete } : IntroPageProps ) {

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white text-black">
      <Image 
        src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_3_(2).webp" 
        alt="Descriptive Alt Text" 
        className="h-96 w-full object-cover" 
        width={500}
        height={500}
      />
      <h1 className="text-2xl font-bold my-4">Storytelling 101</h1>
      <p className="text-base mb-4">
        In this lesson, we&apos;ll take a look at how filmmakers tell stories. 
        If you are new to the world of filmmaking, prepare for unlimited possibilities with the power of Artificial Intelligence.
      </p>
      <button 
        onClick={onIntroComplete}
        className="bg-black text-white py-2 px-4 rounded-full w-full mt-4"
      >
        Start Lesson
      </button>
    </div>
  );
}
