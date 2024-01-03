'use client';

import { useState } from 'react';
import { PageOne, PageTwo, PageThree, PageFour, PageFive, IntroPage } from '@/components/storytelling_test';

// Summary review component with TypeScript type annotations
const ReviewPage = ({
  onReviewComplete,
}: {
  onReviewComplete: () => void;
}) => (
  <div>
    <h2>Review and Reflect</h2>
    {/* Summary content goes here */}
    <button onClick={onReviewComplete} className="mt-4">Finish Lesson</button>
  </div>
);

export default function StorytellingTest() {
  const [showContinue, setShowContinue] = useState(false);
  const [activePages, setActivePages] = useState<number[]>([]);
  const [introComplete, setIntroComplete] = useState(false);
  const [reviewPhase, setReviewPhase] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);
  const totalPages = 5;

  const handleAnswerSelected = () => {
    setShowContinue(true);
  };

  const handleStartLesson = () => {
    setIntroComplete(true);
    setActivePages([0]);
  };

  const handleContinue = () => {
    if (!introComplete) {
      return;
    }
    setActivePages((prevActivePages) => {
      const nextPage = prevActivePages.length;
      if (nextPage === totalPages - 1) {
        setReviewPhase(true);
      }
      return nextPage < totalPages ? [...prevActivePages, nextPage] : prevActivePages;
    });
  };

  const handleReviewComplete = () => {
    setLessonComplete(true);
  };

  const renderPages = () => {
    if (!introComplete) {
      return <IntroPage onIntroComplete={handleStartLesson} />;
    }

    if (introComplete && activePages.includes(0)) {
      return <PageOne key="page1" />;
    }
    return activePages.map((page) => {
      switch (page) {
      case 0:
        return <PageOne key={page} />;
      case 1:
        return <PageTwo key={page} onAnswerSelected={handleAnswerSelected} />;
      case 2:
        return <PageThree key={page} />;
      case 3:
        return <PageFour key={page} />;
      case 4:
        return <PageFive key={page} />;
      default:
        return null;
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-white">
      <div className={`fixed top-0 left-0 w-full z-10 shadow-md transition-opacity duration-500 ${lessonComplete ? 'opacity-0 pointer-events-none' : 'bg-white'}`}>
        <div className="flex justify-between max-w-screen-lg mx-auto p-4">
          <div className={`h-1 mx-1 rounded-lg transition-colors duration-300 ${introComplete ? 'bg-blue-500' : 'bg-gray-300'}`} style={{ flex: '0 0 5%' }}></div>
          {Array.from({ length: totalPages - 1 }).map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-1 mx-1 rounded-lg transition-colors duration-300 ${
                index < activePages.length - 1 ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="pt-16 flex-grow">
        {renderPages()}
        {reviewPhase && !lessonComplete && <ReviewPage onReviewComplete={handleReviewComplete} />}
        {lessonComplete && <div className="text-center mt-4 text-black">FINAL ANIMATION</div>}
      </div>

      {!lessonComplete && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 w-full px-4">
          {!reviewPhase && activePages.length === 1 && showContinue && (
            <button onClick={handleContinue} className="w-full py-4 text-center bg-black rounded-2xl">
              Continue
            </button>
          )}
          {reviewPhase && (
            <button onClick={handleReviewComplete} className="w-full py-4 text-center bg-black rounded-2xl">
              Review and Reflect
            </button>
          )}
        </div>
      )}
    </div>
  );
}
