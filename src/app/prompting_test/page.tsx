'use client';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import {
  IntroPage,
  PageOne,
  PageTwo,
  PageThree,
  PageFour,
  FinalAnimation,
} from '@/components/prompting_test';

// Summary review component with TypeScript type annotations
const ReviewPage = ({ onReviewComplete }: { onReviewComplete: () => void }) => (
  <div>
    <div className="px-10">
      <Image
        src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/barbie.gif"
        alt="Descriptive Alt Text"
        className="h-96 w-full rounded-xl object-cover"
        width={500}
        height={500}
      />
      <h1 className="my-8 flex justify-center text-2xl font-bold text-black">
        Go Girl! You did great!
      </h1>
    </div>

    <div className="fixed bottom-4 left-1/2 mx-auto w-full max-w-md -translate-x-1/2 transform p-4">
      <button
        onClick={onReviewComplete}
        className="w-full rounded-lg bg-black py-3 text-center text-white"
      >
        Finish the Lesson
      </button>
    </div>
  </div>
);

export default function PromptingTest() {
  const [showContinue, setShowContinue] = useState(false);
  const [activePages, setActivePages] = useState<number[]>([]);
  const [reviewPhase, setReviewPhase] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);
  const totalPages = 5;

  const bottomMarkerRef = useRef(null); // Ref for the bottom marker in PageOne

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        const entry = entries[0];
        if (entry.isIntersecting && activePages.includes(1)) {
          setShowContinue(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      },
      { threshold: 1.0 },
    );

    if (bottomMarkerRef.current) {
      observer.observe(bottomMarkerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [bottomMarkerRef, activePages]);

  // Ref for the container of the pages
  const pagesContainerRef = useRef<HTMLDivElement>(null);

  const handleAnswerSelected = () => {
    // Allow the user to continue after an answer has been selected
    setShowContinue(true);
  };

  const handleStartLesson = () => {
    // Start with the first page
    setActivePages([1]);
    setShowContinue(false);
  };

  const handleContinue = () => {
    setActivePages((prevActivePages) => {
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
                behavior: 'smooth',
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
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-between bg-white">
      {/* Navigation progress bar */}
      <div
        className={`fixed left-1/2 top-0 z-10 mx-auto w-full max-w-md -translate-x-1/2 shadow-md transition-opacity duration-500 ${
          reviewPhase || lessonComplete
            ? 'pointer-events-none opacity-0'
            : 'bg-white'
        }`}
      >
        <div className="mx-auto flex max-w-screen-lg items-center justify-between p-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`mx-1 h-1 rounded-lg transition-colors duration-300 ${
                index < activePages.length ? 'bg-indigo-500' : 'bg-gray-300'
              }`}
              style={{ flex: index === 0 ? '0 0 5%' : '1' }}
            />
          ))}
          <Image
            src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/earth.png"
            alt="Descriptive Alt Text"
            className="ml-2 h-6 w-6 cursor-pointer"
            width={500}
            height={500}
          />
        </div>
      </div>

      {/* Conditional rendering for pages */}
      <div className="flex-grow overflow-auto pt-8" ref={pagesContainerRef}>
        {!reviewPhase && !activePages.length && (
          <IntroPage onIntroComplete={handleStartLesson} />
        )}
        {!reviewPhase && activePages.includes(1) && (
          <PageOne bottomMarkerRef={bottomMarkerRef} />
        )}
        {!reviewPhase && activePages.includes(2) && (
          <PageTwo onAnswerSelected={handleAnswerSelected} />
        )}
        {!reviewPhase && activePages.includes(3) && (
          <PageThree onAnswerSelected={handleAnswerSelected} />
        )}
        {!reviewPhase && activePages.includes(4) && (
          <PageFour onAnswerSelected={handleAnswerSelected} />
        )}
        {reviewPhase && !lessonComplete && (
          <ReviewPage onReviewComplete={handleReviewComplete} />
        )}
        {lessonComplete && <FinalAnimation />}
      </div>

      {/* Continue button */}
      {!lessonComplete && !reviewPhase && showContinue && (
        <div className="fixed bottom-4 left-1/2 mx-auto w-full max-w-md -translate-x-1/2 transform p-4">
          <button
            onClick={handleContinue}
            className="w-full rounded-lg bg-black py-3 text-center text-white"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
