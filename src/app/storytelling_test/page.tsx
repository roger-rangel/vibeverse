'use client';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { IntroPage, PageOne, PageTwo, PageThree, PageFour, FinalAnimation } from '@/components/storytelling_test';

// Summary review component with TypeScript type annotations
const ReviewPage = ({
  onReviewComplete,
}: {
  onReviewComplete: () => void;
}) => (
  <div>
    <div className="px-10">
      <Image 
        src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/legolas_aragorn.gif" 
        alt="Descriptive Alt Text" 
        className="h-96 w-full object-cover rounded-xl" 
        width={500}
        height={500}
      />
      <h1 className="text-black text-2xl font-bold my-8 flex justify-center">What a Champ! Excellent job!</h1>
    </div>

    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 w-full max-w-xl mx-auto">
      <button onClick={onReviewComplete} className="w-full py-3 text-center bg-black text-white rounded-lg">
            Finish the Lesson
      </button>
    </div>
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

      // Check if transitioning to the review phase
      if (nextPage > totalPages - 1) {
      // Transition to the review phase
        setReviewPhase(true);
        // Reset activePages to hide all previous pages
        return [];
      } else {
      // Continue showing the next page
        setShowContinue(false);
        const updatedPages = [...prevActivePages, nextPage];

        // Scroll handling for intermediate pages
        if (nextPage < totalPages) {
          setTimeout(() => {
            const nextSectionId = `page-${nextPage}`;
            const nextSection = document.getElementById(nextSectionId);
            if (nextSection) {
              const offset = 300; // Adjust this value as needed
              const position = nextSection.offsetTop - offset;
              window.scrollTo({
                top: position,
                behavior: 'smooth'
              });
            }
          }, 0);
        }

        return updatedPages;
      }
    });
  };


  const handleReviewComplete = () => {
    setLessonComplete(true);
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-white">
      {/* Navigation progress bar */}
      <div className={`fixed top-0 left-0 w-full z-10 shadow-md transition-opacity duration-500 ${reviewPhase || lessonComplete ? 'opacity-0 pointer-events-none' : 'bg-white'}`}>
        <div className="flex justify-between max-w-screen-lg mx-auto p-4 items-center">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`h-1 mx-1 rounded-lg transition-colors duration-300 ${
                index < activePages.length ? 'bg-green-500' : 'bg-gray-300'
              }`}
              style={{ flex: index === 0 ? '0 0 5%' : '1' }}
            />
          ))}
          <Image 
            src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/earth.png" 
            alt="Descriptive Alt Text" 
            className="h-6 w-6 ml-2 cursor-pointer" 
            width={500}
            height={500}
          />
        </div>
      </div>


      {/* Conditional rendering for pages */}
      <div className="pt-8 flex-grow overflow-auto" ref={pagesContainerRef}>
        {!reviewPhase && !activePages.length && <IntroPage onIntroComplete={handleStartLesson} />}
        {!reviewPhase && activePages.includes(1) && <PageOne />}
        {!reviewPhase && activePages.includes(2) && <PageTwo onAnswerSelected={handleAnswerSelected} />}
        {!reviewPhase && activePages.includes(3) && <PageThree onAnswerSelected={handleAnswerSelected} />}
        {!reviewPhase && activePages.includes(4) && <PageFour onAnswerSelected={handleAnswerSelected} />}
        {reviewPhase && !lessonComplete && <ReviewPage onReviewComplete={handleReviewComplete} />}
        {lessonComplete && <FinalAnimation />}
      </div>

      {/* Continue button */}
      {!lessonComplete && !reviewPhase && showContinue && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 w-full max-w-xl mx-auto">
          <button onClick={handleContinue} className="w-full py-3 text-center bg-black text-white rounded-lg">
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
