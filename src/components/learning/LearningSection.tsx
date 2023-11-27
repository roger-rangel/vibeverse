import React from 'react';
import { useModal } from 'react-modal-hook';

import { CreateCourseModal } from './CreateCourseModal';
import { AllCourses } from './AllCourses';

export function LearningSection() {
  const [showModal, hideModal] = useModal(() => (
    <CreateCourseModal isOpen hideModal={hideModal} />
  ));

  return (
    <div className="mx-10">
      <button
        type="button"
        className="m-2 rounded-md border border-emerald-800 p-2 text-white"
        onClick={showModal}
      >
        Create course
      </button>
      <AllCourses />
    </div>
  );
}
