import React from 'react';
import styles from './Portal.module.scss';
import Link from 'next/link';

interface PortalProps {
  website: string;
}

export default function Portal({ website }: PortalProps) {

  return (
    <>
      <main
        className={`${styles.welcome}`}>
        <div className="flex xs:flex-col lg:flex-row gap-x-12 gap-y-10 mt-10">
          <div className="flex flex-col">
            {/* add onClick here to open the next modal where user can choose to join a community (2-4 communities) */}
            <div className='bg-black'>
              <div
                className={`${styles.card} ${styles.videoWrapper} opacity-75`}>
                <video
                  autoPlay
                  loop={true}
                  muted
                  src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/vaporwave_room.mp4"
                  className={`${styles.gif2}`}
                ></video>
              </div>
            </div>
            <Link href={website} target='_blank'>
              <div
                className="flex items-center justify-center rounded-md bg-indigo-500 mt-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
              Start my Journey 
              </div>
            </Link>
          </div>
          <div className="flex flex-col">
            <div className='bg-black'>
              <div className={`${styles.card_metaverse} ${styles.videoWrapper} opacity-75`}>
                <video
                  autoPlay
                  loop={true}
                  muted
                  src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/cyborg_creationmp4.mp4"
                  className={`${styles.gif2}`}
                ></video>
              </div>
            </div>
            <button
              type="submit"
              className="rounded-md bg-green-500 mt-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Coming soon!
            </button> 
          </div>  
        </div>
      </main>  
    </>
  );
}