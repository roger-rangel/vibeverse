'use client';

import React, { useState, useRef } from 'react';
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
  const [reviewPhase, setReviewPhase] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);
  const totalPages = 5;

  // Ref for the container of the pages
  const pagesContainerRef = useRef<HTMLDivElement>(null);

  const handleAnswerSelected = () => {
    // Allow the user to continue after an answer has been selected
    setShowContinue(true);
  };

  const handleStartLesson = () => {
    // Start with the first page
    setActivePages([1]);
    setShowContinue(true);
  };

  const handleContinue = () => {
    setActivePages(prevActivePages => {
      const nextPage = prevActivePages.length + 1;
      if (nextPage < totalPages) {
        setShowContinue(false);
        const updatedPages = [...prevActivePages, nextPage];

        setTimeout(() => {
          const nextSectionId = `page-${nextPage}`;
          const nextSection = document.getElementById(nextSectionId);
          if (nextSection) {
            const offset = 300; // Adjust this value as needed to control scroll amount
            const position = nextSection.offsetTop - offset;
            window.scrollTo({
              top: position,
              behavior: 'smooth'
            });
          }
        }, 0);

        return updatedPages;
      } else {
      // Transition to the review phase when all pages have been visited
        setReviewPhase(true);
        return prevActivePages;
      }
    });
  };



  const handleReviewComplete = () => {
    setLessonComplete(true);
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-white">
      {/* Navigation progress bar */}
      <div className={`fixed top-0 left-0 w-full z-10 shadow-md transition-opacity duration-500 ${lessonComplete ? 'opacity-0 pointer-events-none' : 'bg-white'}`}>
        <div className="flex justify-between max-w-screen-lg mx-auto p-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`h-1 mx-1 rounded-lg transition-colors duration-300 ${
                index < activePages.length ? 'bg-green-500' : 'bg-gray-300'
              }`}
              style={{ flex: index === 0 ? '0 0 5%' : '1' }}
            />
          ))}
        </div>
      </div>

      {/* Container for the pages */}
      <div className="pt-16 flex-grow overflow-auto" ref={pagesContainerRef}>
        {!activePages.length && <IntroPage onIntroComplete={handleStartLesson} />}
        {activePages.includes(1) && <PageOne />}
        {activePages.includes(2) && <PageTwo onAnswerSelected={handleAnswerSelected} />}
        {activePages.includes(3) && <PageThree onAnswerSelected={handleAnswerSelected} />}
        {activePages.includes(4) && <PageFour />}
        {activePages.includes(5) && <PageFive />}
        {reviewPhase && !lessonComplete && <ReviewPage onReviewComplete={handleReviewComplete} />}
        {lessonComplete && <div className="text-center mt-4 text-black">FINAL ANIMATION</div>}
      </div>

      {/* Continue button */}
      {!lessonComplete && !reviewPhase && showContinue && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 w-full max-w-md mx-auto">
          <button onClick={handleContinue} className="w-full py-3 text-center bg-black text-white rounded-lg">
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
