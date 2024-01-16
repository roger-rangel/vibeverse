// Note: Page Four Component for Storytelling Test
import { useRef, useState } from 'react';
import Image from 'next/image';

type PageFourProps = {
  onAnswerSelected: () => void;
};

export function PageFour({ onAnswerSelected }: PageFourProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string>('');
  const endOfPageRef = useRef<HTMLDivElement>(null);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer); // Track the selected answer for styling

    // Update the response text based on the selected answer
    let response;
    if (answer === 'Act 1') {
      response =
        "A high angle shot looks down on the subject from above, often to make them appear vulnerable or insignificant. However, this image is not a high angle shot since it's not looking down on the subject.";
    } else if (answer === 'Act 3') {
      response =
        "A Dutch angle shot is a shot that is tilted sideways on the horizontal axis. This image is not a Dutch angle shot since it's not tilted sideways.";
    } else if (answer === 'Act 2') {
      response =
        "A POV shot shows the perspective of a scene from a character's viewpoint. This image seems to be a POV shot, as it's taken from the cyclist's perspective, making the audience see through the cyclist's eyes.";
    } else {
      response = 'Please select an option to continue.';
    }
    setResponseText(response);

    onAnswerSelected(); // Notify the parent component that an answer has been selected

    // Scroll to the ref after a short delay
    setTimeout(() => {
      endOfPageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Determine button style based on whether it's selected
  const buttonStyle = (answer: string) => {
    const baseStyle = 'mr-2 py-2 px-4 text-black border border-neutral-800 rounded';
    if (selectedAnswer === answer) {
      return `${baseStyle} ${answer === 'Act 2' ? 'bg-indigo-200' : 'bg-gray-300'}`;
    }
    return `${baseStyle} ${selectedAnswer ? 'opacity-50' : 'bg-white'}`;
  };

  // Check if any button is selected to disable all buttons
  const isDisabled = selectedAnswer !== null;

  return (
    <div
      id="page-4"
      className="mx-10 min-h-[75vh] bg-white pb-32 pt-6 text-black lg:pt-12"
    >
      <h2 className="my-8 text-lg">
        Now let&rsquo;s try to guess a new type of shot in film.
        <br />
        <br />
        What type of shot do you think this is?
      </h2>

      <Image
        src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_2-llVe8T3si.webp"
        alt="Descriptive Alt Text"
        className="mx-auto h-80 w-full rounded-2xl object-cover"
        width={500}
        height={500}
      />

      <div className="mt-10 mb-4">
        <button
          onClick={() => handleAnswer('Act 1')}
          className={buttonStyle('Act 1')}
          disabled={isDisabled}
        >
          High Angle
        </button>
        <button
          onClick={() => handleAnswer('Act 2')}
          className={buttonStyle('Act 2')}
          disabled={isDisabled}
        >
          POV (Point of View)
        </button>
        <button
          onClick={() => handleAnswer('Act 3')}
          className={buttonStyle('Act 3')}
          disabled={isDisabled}
        >
          Dutch Angle
        </button>
      </div>

      {responseText && (
        <div className="mb-4 mt-8">
          <p>{responseText}</p>
        </div>
      )}

      <div ref={endOfPageRef}></div>
    </div>
  );
}
