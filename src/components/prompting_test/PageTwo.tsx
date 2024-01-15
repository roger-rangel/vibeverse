import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import the Image component from the appropriate package

type PageTwoProps = {
  onAnswerSelected: () => void;
};

export function PageTwo({ onAnswerSelected }: PageTwoProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // New state for loading

  useEffect(() => {
    if (selectedAnswer === 'true') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000); //
    }
  }, [selectedAnswer]);

  const handleAnswer = (answer: string) => {
    // Scroll to the bottom of the page

    setSelectedAnswer(answer); // Track the selected answer for styling
    onAnswerSelected(); // Notify the parent component that an answer has been selected

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth', // Optional: Adds a smooth scrolling effect
    });
  };

  // Determine button style based on whether it's selected
  const buttonStyle = (answer: string) =>
    `mr-2 py-2 px-4 text-black border border-neutral-800 rounded ${
      selectedAnswer === answer
        ? 'bg-indigo-200'
        : selectedAnswer !== null
          ? 'bg-white text-black opacity-50'
          : 'bg-white text-black'
    }`;

  // Check if any button is selected to disable all buttons
  const isDisabled = selectedAnswer !== null;

  return (
    <div
      id="page-2"
      className="mx-10 mb-24 min-h-[75vh] bg-white text-black lg:pt-12"
    >
      <h2 className="mb-4 text-lg">
        Remember, prompting is a new type of creative artform. So if you&apos;re
        having trouble getting your creative vision together, don&apos;t worry,
        it&apos;s a part of the process.
      </h2>

      <h2 className="mb-4 pt-4 text-lg">
        Submit this prompt to see how it&apos;s done:
      </h2>

      {/* Prompt */}

      <div className="mt-2">
        <div className="flex rounded-md border border-indigo-500 bg-gray-200">
          <div
            className="text-grey flex-1 border-0 bg-transparent py-1.5 pl-4 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Purple Monkey "
          >
            a cinematic still of a female robot with her dog
          </div>
        </div>
      </div>

      <div className="my-4">
        <button
          onClick={() => handleAnswer('true')}
          className={buttonStyle('true')}
          disabled={isDisabled}
        >
          Check
        </button>
      </div>
      {selectedAnswer === 'true' && (
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Image
                src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_24.png"
                alt="Loading"
                width={100}
                height={100}
                className="mt-20 h-6 w-8 animate-bounce" // TailwindCSS bounce animation
              />
            </div>
          ) : (
            <Image
              width={500}
              height={250}
              src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_3-2.webp"
              alt="Prompt"
              className="h-96 w-full rounded-xl object-cover"
            />
          )}
        </div>
      )}
    </div>
  );
}
