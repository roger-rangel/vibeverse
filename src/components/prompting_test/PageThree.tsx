import Image from 'next/image';
import { useRef, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { XMarkIcon } from '@heroicons/react/24/outline';

const cinematicShots = [
  {
    id: '1',
    name: 'Extreme Wide Shot',
    description:
      'The subject is a speck in the distance, and the landscape dominates the frame.',
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_3-62cYPH6ve.webp',
  },
  {
    id: '2',
    name: 'Wide Shot',
    description:
      'The subject takes up the full frame, or at least as much as comfortably possible.',
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_2-uShjRHMcz.webp',
  },
  {
    id: '3',
    name: 'Medium Shot',
    description:
      'The subject is in the center of the frame, and the shot is taken from a medium distance.',
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_2-1.webp',
  },
  {
    id: '4',
    name: 'Medium Close Up',
    description:
      'The subject fills the frame more than in a medium shot, but not as much as in a close-up.',
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_2-2.webp',
  },
  {
    id: '5',
    name: 'Close Up',
    description: 'The subject takes up the entire frame.',
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Screenshot_2024-01-16_at_7.26.31_PM.png',
  },
  {
    id: '6',
    name: 'Extreme Close Up',
    description:
      'The shot is so tight that only a specific detail of the subject, such as someone&apos;s eyes, can be seen.',
    image:
      'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_1-k0K55M--G.webp',
  },
];

type PageThreeProps = {
  onAnswerSelected: () => void;
};

// PageThree component
export function PageThree({ onAnswerSelected }: PageThreeProps) {
  const [showGoodJob, setShowGoodJob] = useState(false);
  const [showPoints, setShowPoints] = useState(false);
  const [checkClicked, setCheckClicked] = useState(false);
  const endOfPageRef = useRef<HTMLDivElement>(null);
  const [showExplanationPopup, setShowExplanationPopup] = useState(false);

  // Function to toggle the explanation popup
  const toggleExplanationPopup = () => {
    setShowExplanationPopup(!showExplanationPopup);
  };

  const handleCheck = () => {
    setCheckClicked(true);
    setShowGoodJob(true); // Immediately show the Good Job message

    // After 1 second, show the points and call onAnswerSelected
    setTimeout(() => {
      onAnswerSelected();
    }, 500);

    setTimeout(() => {
      setShowPoints(true);
    }, 1000);

    // Scroll to the ref after a short delay
    setTimeout(() => {
      endOfPageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div id="page-3" className="mx-10 -mt-10 bg-white text-black lg:pt-12">
        <h2 className="mb-4 text-lg">
          Before we start with the basics, let&apos;s explore the types of
          cinematic shots so we can start getting familiar with the language of
          film.
        </h2>

        {cinematicShots.map((shot) => (
          <div key={shot.id} className="relative my-8">
            <Image
              width={500}
              height={250}
              src={shot.image}
              alt="Prompt"
              className="h-96 w-full rounded-xl object-cover"
            />
            <h1 className="absolute bottom-0 left-1/2 mb-6 -translate-x-1/2 transform rounded-2xl bg-indigo-500 px-4 py-2 text-xl text-white">
              {shot.name}
            </h1>
          </div>
        ))}

        {!checkClicked && (
          <button
            onClick={handleCheck}
            className="mx-auto mb-4 rounded bg-black px-4 py-2 text-white"
          >
            Check
          </button>
        )}

        <div className="mb-24">
          <div className="mx-auto flex items-center justify-between">
            {showGoodJob && (
              <div className="flex flex-row">
                <h1 className="ml-2 text-lg text-zinc-600">Good job!</h1>
                <Image
                  src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/heart_hands.gif"
                  alt="Good Job"
                  width={50}
                  height={50}
                  className="-mt-2.5 ml-2 h-12 w-20"
                />
              </div>
            )}
            {/* Explanation Popup */}
            {showExplanationPopup && (
              <div className="fixed left-4 right-4 top-4 z-10 rounded-lg border border-gray-200 bg-white p-4 shadow-xl">
                <button
                  onClick={toggleExplanationPopup}
                  className="absolute right-0 top-0 -m-2 flex h-6 w-6 items-center justify-center rounded-full bg-black text-lg leading-none text-white"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
                <div className="mb-1 flex items-center">
                  <h1 className="text-2xl font-bold">Shots in Film</h1>
                  <Image
                    src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_24.png"
                    alt="Good Job"
                    width={50}
                    height={50}
                    className="ml-4 flex h-5 w-6 items-center"
                  />
                </div>
                <p>
                  {/* Your explanation content here */}
                  <br />
                  <strong>Extreme Long Shot (ELS)/Wide Shot</strong> Captures a
                  vast area to set the scene. It&apos;s often used to show
                  landscapes or massive building exteriors.
                  <br />
                  <br />
                  <strong>Long Shot (LS):</strong> Shows the full body of a
                  character (or characters) in relation to their surroundings,
                  without much focus on expressions.
                  <br />
                  <br />
                  <strong>Full Shot:</strong> Similar to a long shot, but
                  focuses more closely on the character, usually framing them
                  from head to toe.
                  <br />
                  <br />
                  <strong>Medium Long Shot (MLS):</strong> Also known as a 3/4
                  shot, it frames the subject from about the knees up, showing
                  some background.
                  <br />
                  <br />
                  <strong>Medium Shot (MS):</strong> Cuts the character at the
                  waist, capturing gestures and facial expressions more clearly.
                  <br />
                  <br />
                  <strong>Medium Close-Up (MCU):</strong> Frames a character
                  from the chest up, balancing facial expressions with some body
                  language.
                  <br />
                  <br />
                  <strong>Close-Up (CU):</strong> Focuses on a character&apos;s
                  face to capture detailed emotions, or on an object to
                  highlight its importance.
                  <br />
                  <br />
                </p>
              </div>
            )}
            {showPoints && (
              <div className="text-md flex animate-slide-up items-center rounded-lg bg-indigo-200 px-1.5 py-0.5 text-indigo-500">
                <Image
                  src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/diamond.png"
                  alt="Good Job"
                  width={50}
                  height={50}
                  className="flex h-6 w-6 items-center"
                />
                {/* <PlusIcon className="h-4 w-4 font-bold" /> */}
                +20
                <h2 className="ml-1">VIBES</h2>
              </div>
            )}
          </div>
          {showGoodJob && (
            <div className="my-4 flex justify-end rounded-lg bg-slate-200 p-4">
              <div className="flex cursor-pointer items-center rounded-lg border border-stone-400 p-2 hover:bg-slate-300">
                <span onClick={toggleExplanationPopup} className="text-md ">
                  Explain it to me
                </span>
                <Image
                  src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/open-book.png"
                  alt="Good Job"
                  width={200}
                  height={200}
                  className="ml-2 h-4 w-4"
                />
              </div>
            </div>
          )}
        </div>

        <div ref={endOfPageRef}></div>
      </div>
    </DndProvider>
  );
}
