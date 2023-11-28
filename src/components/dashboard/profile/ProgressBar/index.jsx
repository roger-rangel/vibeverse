import React from 'react';

export default function ProgressBar({ profile }) {
  return (
    <div className="px-20">
      <h4 className="sr-only">Status</h4>
      <p className="text-center text-sm font-medium text-gray-200 pt-4">Your score: {profile.score.toString()} </p>
      <div className="mt-6" aria-hidden="true">
        <div className="overflow-hidden rounded-full bg-gray-200">
          <div className="h-2 rounded-full bg-indigo-600" style={{ width: '37.5%' }} />
        </div>
        <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
          <div className="text-indigo-600">Beginner</div>
          <div className="text-center text-indigo-600">Intermediate</div>
          <div className="text-center">Advanced</div>
          <div className="text-right">Superstar</div>
        </div>
      </div>
    </div>
  );
}
