// create a simple join community function
import React from 'react';

export default function JoinCommunity() {
  return (
    <>
      <main className="welcome">
        <h1
          className={`pb-6 text-[#e6e6e6] text-3xl font-bold flex justify-center font-raleway`}
        >
          Welcome to Vibeverse
        </h1>
        <div className="flex pt-10 space-x-20">
          <div className="flex flex-col">
            {/* add onClick here to open the next modal where user can choose to join a community (4 options) */}
            <div className="card">
              <video
                autoPlay
                loop="loop"
                muted
                src="./videos/train.mp4"
                alt="train"
                className="gif"
              ></video>
            </div>
            <a className="mt-8 text-[#e6e6e6] flex justify-center font-raleway cursor-pointer">
              Join a Community
            </a>
          </div>

          <div className="flex flex-col ">
            <div className="card_metaverse">
              <video
                autoPlay
                loop="loop"
                muted
                src="./videos/cyberpunk.mp4"
                alt="cyberpunk"
                className="gif"
              ></video>
            </div>
            <a className="mt-8 text-[#e6e6e6] flex justify-center font-raleway cursor-pointer">
              New Community
            </a>
          </div>
        </div>
      </main>
    </>
  );
}