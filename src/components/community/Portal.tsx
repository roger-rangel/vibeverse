import React from 'react';
import styles from './Portal.module.scss';
import Link from 'next/link';

interface PortalProps {
  website: string;
  metadata: string[];
}

export default function Portal({ website, metadata }: PortalProps) {
  return (
    <>
      <main className={`${styles.welcome}`}>
        <div className="mt-10 flex gap-x-12 gap-y-10 xs:flex-col lg:flex-row">
          <div className="flex flex-col">
            {/* add onClick here to open the next modal where user can choose to join a community (2-4 communities) */}
            <div className="bg-black">
              <div
                className={`${styles.card} ${styles.videoWrapper} opacity-75`}
              >
                <video
                  autoPlay
                  loop={true}
                  muted
                  src={metadata[0]}
                  className={`${styles.gif2}`}
                ></video>
              </div>
            </div>
            <Link href={website} target="_blank">
              <div className="mt-6 flex items-center justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Start my Journey
              </div>
            </Link>
          </div>
          <div className="flex flex-col">
            <div className="bg-black">
              <div
                className={`${styles.card_metaverse} ${styles.videoWrapper} opacity-75`}
              >
                <video
                  autoPlay
                  loop={true}
                  muted
                  src={metadata[1]}
                  className={`${styles.gif2}`}
                ></video>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Coming soon!
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
