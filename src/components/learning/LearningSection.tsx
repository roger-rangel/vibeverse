import React from 'react';
import { useModal } from 'react-modal-hook';

import { CreateCourseModal } from './CreateCourseModal';
import { AllCourses } from './AllCourses';

export function LearningSection() {
  const [showModal, hideModal] = useModal(() => (
    <CreateCourseModal isOpen hideModal={hideModal} />
  ));

  return (
    <div className="mx-10 pt-8">
      <div className="flex justify-end">
        <button
          type="button"
          className="mt-2 text-base rounded-2xl border border-emerald-800 p-4 text-white hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 hover:text-zinc-800 hover:font-bold"
          onClick={showModal}
        >
        Create a course
        </button>
      </div>

      <AllCourses />
    </div>
  );
}
