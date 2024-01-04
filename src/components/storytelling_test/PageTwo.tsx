// Note: Page Two Component for Storytelling Test
import { useState } from 'react';

export function PageTwo( { onAnswerSelected } ) {
  const [answer, setAnswer] = useState('');

  const handleAnswer = (selectedAnswer) => {
    setAnswer(selectedAnswer);
    onAnswerSelected(); // Notify the parent component that an answer has been selected
  };

  return (
    <div id="page-1" className="mx-10 pt-14 lg:pt-12 text-black bg-white min-h-screen">
      PAGE TWO

      <h2 className="text-lg font-bold mb-4">Is the sky blue?</h2>
      <div className="mb-4">
        <button onClick={() => handleAnswer('true')} className="mr-2 py-2 px-4 bg-blue-500 text-white rounded">
          True
        </button>
        <button onClick={() => handleAnswer('false')} className="py-2 px-4 bg-red-500 text-white rounded">
          False
        </button>
      </div>
      {answer && (
        <div className="my-4">
          <p>Your answer is: {answer}</p>
          
        </div>
      )} 
    </div>
  );
}