import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useModal } from 'react-modal-hook';
import { CreateCourseModal } from './CreateCourseModal';
import { AllCourses } from './AllCourses';

export function LearningSection() {
  const learning_modules = [
    {
      path: '/dashboard/modules/1',
      image:
        'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/54a531d62eb7d502cf4977391769fca0.jpg',
      title: 'The Current State of AI',
    },
  ];
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
