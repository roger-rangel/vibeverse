'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Image from 'next/image';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={`mx-auto relative`}>
      <div className="h-screen mx-auto bg-gradient-to-r bg-black relative flex items-center justify-center">
        <Image
          src="/images/dashboard/error.png"
          alt=""
          className="h-full w-full object-cover object-center"
          height={1000}
          width={1000}
        />
        <div className="absolute top-32 justify-center items-center rounded-2xl ">
          <div className="h-full w-full rounded-2xl flex flex-col justify-center items-center gap-4">
            <h2 className="text-grey-700 p-2 pl-4 backdrop-blur rounded-lg">
              Holy Moly! Something went wrong :(
            </h2>
            <button
              className="animate-border inline-block rounded-full bg-black bg-gradient-to-r hover:from-[#29ffc6] hover:via-[#00c3ff] hover:to-[#ffff1c] from-purple-500 via-purple-100 to-blue-500 bg-[length:400%_400%] p-1"
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
            >
              <span className="flex rounded-full bg-slate-900 px-10 py-4 text-center items-center justify-center font-bold text-white text-2xl">
                Try Again
              </span>
            </button>
            <button className="animate-border inline-block rounded-full bg-black bg-gradient-to-r hover:from-[#29ffc6] hover:via-[#00c3ff] hover:to-[#ffff1c] from-purple-500 via-purple-100 to-blue-500 bg-[length:400%_400%] p-1">
              <span className="flex rounded-full bg-slate-900 px-10 py-4 text-center items-center justify-center font-bold text-white text-2xl">
                Go to Home Page
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
