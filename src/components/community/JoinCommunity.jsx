import React from 'react';
import dynamic from 'next/dynamic';
import styles from './JoinCommunity.module.scss';
import { classnames } from 'tailwindcss-classnames';

// Dynamically import ReactPlayer with SSR turned off
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function JoinCommunity() {
  return (
    <>
      <main className={classnames(styles.welcome)}>
        <div className="flex xs:flex-col lg:flex-row gap-x-20 gap-y-10">
          <div className="flex flex-col">
            {/* add onClick here to open the next modal where user can choose to join a community (2-4 communities) */}
            <div className={classnames(styles.card, styles.videoWrapper)}>
              <video
                autoPlay
                loop="loop"
                muted
                src="/videos/train.mp4"
                alt="train"
                className={classnames(styles.gif2)}
              ></video>
            </div>
            <button
              type="submit"
              className="rounded-md bg-indigo-500 mt-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Join 
            </button>
          </div>
          <div className="flex flex-col">
            {/* add onClick here to open the next modal where user can choose to join a community (2-4 communities) */}
            <div className={classnames(styles.card_metaverse, styles.videoWrapper)}>
              <video
                autoPlay
                loop="loop"
                muted
                src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/create.mp4"
                alt="train"
                className={classnames(styles.gif2)}
              ></video>
            </div>
            <button
              type="submit"
              className="rounded-md bg-indigo-500 mt-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Create 
            </button> 
          </div>  
        </div>
      </main>
    </>
  );
}