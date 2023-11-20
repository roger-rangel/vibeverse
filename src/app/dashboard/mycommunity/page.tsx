'use client';

import { useState, useEffect } from 'react';

import {
  JoinCommunity,
  CommunitySection,
  CreateCommunity,
  AllCommunities,
} from '@/components/community';

export default function MyCommunity() {
  const [introModal, showIntroModal] = useState(true);
  const [createCommunity, showCreateCommunity] = useState(false);
  const [joinCommunity, showJoinCommunity] = useState(false);

  const handleClose = () => {
    showIntroModal(false);
    showCreateCommunity(false);
    showJoinCommunity(false);
  };

  // set overflow-hidden on body when modal is open
  useEffect(() => {
    document.body.style.overflow =
      introModal || createCommunity || joinCommunity ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [introModal, createCommunity, joinCommunity]);

  return (
    <div className="relative min-h-[inherit] bg-[url('https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/blue_sky.png')] bg-cover">
      {createCommunity && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-2xl p-4">
            <CreateCommunity handleClose={handleClose} />
          </div>
        </div>
      )}

      {joinCommunity && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-2xl p-4">
            <JoinCommunity handleClose={handleClose} />
          </div>
        </div>
      )}
      <div>
        {/* Community Section Page */}
        <CommunitySection showCreateCommunity={showCreateCommunity} />
        <AllCommunities />
      </div>
    </div>
  );
}
