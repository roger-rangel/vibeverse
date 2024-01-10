'use client';

import Link from 'next/link';
import { SparklesIcon, HomeIcon, GlobeEuropeAfricaIcon, AcademicCapIcon } from '@heroicons/react/24/solid';

export function Navigation({ children }: React.PropsWithChildren) {

  return (
    <>
      {children} 

      {/* Mobile navigation bar */}
      <div className="fixed inset-x-0 bottom-0 bg-white shadow-lg md:hidden px-4 border-t border-gray-200 "> {/* md:hidden hides the bar on screens larger than Tailwind's 'md' breakpoint */}
        <nav className="flex justify-between items-center h-16 px-4">
          <Link href="/dashboard/learning_test">
            <div className="flex flex-col items-center">
              <HomeIcon className="h-6 w-6 text-blue-500" />
              <span className="text-xs">Home</span>
            </div>
          </Link>
          <Link href="/dashboard/learning_test/courses">
            <div className="flex flex-col items-center">
              <AcademicCapIcon className="h-6 w-6 text-blue-500" />
              <span className="text-xs">Courses</span>
            </div>
          </Link>
          <Link href="/dashboard/learning_test/leagues">
            <div className="flex flex-col items-center">
              <GlobeEuropeAfricaIcon className="h-6 w-6 text-blue-500" />
              <span className="text-xs">Leagues</span>
            </div>
          </Link>
          <Link href="/dashboard/learning_test/more">
            <div className="flex flex-col items-center">
              <SparklesIcon className="h-6 w-6 text-blue-500" />
              <span className="text-xs">More</span>
            </div>
          </Link>
        </nav>
      </div>
    </>
  );
}
