import React from 'react';
import styles from './IntroCommunity.module.scss';
import { classnames } from 'tailwindcss-classnames';

export default function IntroCommunity({ handleClose, showIntroModal, showCreateCommunity, showJoinCommunity }) {

  const handleCreate = () => {
    showIntroModal(false);
    showCreateCommunity(true);
  };

  const handleJoin = () => {
    showIntroModal(false);
    showJoinCommunity(true);
  };

  return (
    <>
      <main className={classnames(styles.welcome)}>
        <div className="flex xs:flex-col lg:flex-row gap-x-12 gap-y-10 ">
          <div className="flex flex-col">
            {/* add onClick here to open the next modal where user can choose to join a community (2-4 communities) */}
            <div className='bg-black'>
              <div className={classnames(styles.card, styles.videoWrapper, 'opacity-75')}>
                <video
                  autoPlay
                  loop="loop"
                  muted
                  src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/vaporwave_room.mp4"
                  alt="train"
                  className={classnames(styles.gif2)}
                ></video>
              </div>
            </div>
            <button
              type="submit"
              className="rounded-md bg-indigo-500 mt-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={handleJoin}
            >
              Join 
            </button>
          </div>
          <div className="flex flex-col">
            {/* add onClick here to open the next modal where user can choose to join a community (2-4 communities) */}
            <div className='bg-black'>
              <div className={classnames(styles.card_metaverse, styles.videoWrapper, 'opacity-75')}>
                <video
                  autoPlay
                  loop="loop"
                  muted
                  src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/cyborg_creationmp4.mp4"
                  alt="train"
                  className={classnames(styles.gif2)}
                ></video>
              </div>
            </div>
            <button
              type="submit"
              className="rounded-md bg-indigo-500 mt-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={handleCreate}
            >
              Create 
            </button> 
          </div>  
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-green-500 mt-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={handleClose}
        >
          Do This Later 
        </button> 
      </main>
      
    </>
  );
}