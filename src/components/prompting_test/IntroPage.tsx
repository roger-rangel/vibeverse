// Note: Page One Component for Storytelling Test
import Image from 'next/image';

type IntroPageProps = {
  onIntroComplete: () => void;
};

export function IntroPage({ onIntroComplete }: IntroPageProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-white px-6 py-12 text-black">
      <Image
        src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_0-47mL_EnLN.webp"
        alt="Descriptive Alt Text"
        className="h-96 w-full object-cover"
        width={500}
        height={500}
      />
      <h1 className="mt-6 mb-8 text-2xl font-bold">The Magic of Algorithms</h1>
      <p className="mb-4 text-xl">
        Midjourney is the best prompt-to-image tool out there and it&apos;s not
        even close. In this lesson, we&apos;ll explain why we will use
        Midjourney to create our images.
      </p>
      <button
        onClick={onIntroComplete}
        className="mt-8 w-full rounded-full bg-black px-4 py-2 text-white"
      >
        Start Lesson
      </button>
    </div>
  );
}
