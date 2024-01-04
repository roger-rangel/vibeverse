import React, { useState } from 'react';

import { XMarkIcon } from '@heroicons/react/24/outline';

type PageTwoProps = {
  onAnswerSelected: () => void;
};

export function PageTwo({ onAnswerSelected }: PageTwoProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string>('');
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer); // Track the selected answer for styling
    // Update the response text based on the selected answer
    setResponseText(answer === 'true' ? "Answer of button 1" : "Answer of button 2");
    onAnswerSelected(); // Notify the parent component that an answer has been selected
  };

  const handleWordClick = (word: string) => {
    setActivePopup(activePopup === word ? null : word); // Toggle the active popup
  };

  const handleClosePopup = () => {
    setActivePopup(null);
  };

  // Determine button style based on whether it's selected
  const buttonStyle = (answer: string) =>
    `mr-2 py-2 px-4 text-black border border-neutral-800 rounded ${
      selectedAnswer === answer ? 'bg-gray-200' :
        selectedAnswer !== null ? 'bg-white text-black opacity-50' : 'bg-white text-black'
    }`;

  // Check if any button is selected to disable all buttons
  const isDisabled = selectedAnswer !== null;

  return (
    <div id="page-1" className="mx-10 pt-14 lg:pt-12 text-black bg-white min-h-[75vh]">

      {/* Conditionally render pop-up based on activePopup state */}
      {activePopup && (
        <div className="fixed top-4 left-4 right-4 bg-white p-4 z-10 border border-gray-200 shadow-xl rounded-lg">
          <button 
            onClick={handleClosePopup} 
            className="text-white bg-black rounded-full w-6 h-6 leading-none text-lg flex items-center justify-center absolute top-0 right-0 -m-2"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
          <p>
            {activePopup === 'confrontation' ? (
              <>
                In the context of filmmaking, <strong>confrontation</strong> is the stage where the main characters face their 
                primary conflict or challenge. It&apos;s the central part of the story where tensions rise, obstacles are encountered, 
                and the drama intensifies, driving the plot towards the climax.
              </>
            ) : (
              <>
                <p className="mb-4">
                  The <strong>resolution</strong> is the final part of the story where the main conflicts are resolved, 
                  character arcs are completed, and the audience gets a sense of closure.
                </p>
                <p> 
                  It&apos;s where the storylines converge to tie up loose ends and bring the narrative to a satisfying conclusion.
                </p>
              </>

            )}
          </p>
        </div>
      )}

      <h2 className="text-lg mb-4">
          The first act sets up the story, the second act is 
        <span
          className={`font-bold cursor-pointer ${activePopup === 'confrontation' ? 'bg-blue-500 text-white py-1 px-1.5 rounded-md' : 'border-b-2 border-blue-600 pb-0.5'} ml-1`}
          onClick={() => handleWordClick('confrontation')}
        >
          confrontation
        </span>
          , and the third act is 
        <span
          className={`font-bold cursor-pointer ${activePopup === 'resolution' ? 'bg-blue-500 text-white py-1 px-1.5 rounded-md' : 'border-b-2 border-blue-600 pb-0.5'} ml-1`}
          onClick={() => handleWordClick('resolution')}
        >
          resolution
        </span>.
      </h2>

      <h2 className="pt-4 text-lg mb-4">Can you think of a movie that follows a similar structure?</h2>
      <div className="mb-4">
        <button 
          onClick={() => handleAnswer('true')} 
          className={buttonStyle('true')} 
          disabled={isDisabled}
        >
          Hmmm probably yes
        </button>
        <button 
          onClick={() => handleAnswer('false')} 
          className={buttonStyle('false')}
          disabled={isDisabled}
        >
          I have no clue
        </button>
      </div>
      {/* Display the response text based on the selected answer */}
      {responseText && (
        <div className="my-4">
          <p>{responseText}</p>
        </div>
      )}
    </div>
  );
}
