'use client';

import { useCallback } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useConnect } from '@connect2ic/react';

import {
  useFollowCommunity,
  useGetIsCommunityFollower,
  useGetProfile,
  useUnfollowCommunity,
} from '@/hooks';
import { Community } from '@/types';

import { Avatar } from '../Avatar';
import Portal from './Portal';

export default function CommunityPage({
  community: { slug, creator: creatorId, name, logo, socials, metadata },
}: {
  community: Community;
}) {
  const { activeProvider, isConnected } = useConnect();
  const { data: creator } = useGetProfile({
    principal: creatorId.toString(),
  });
  const { data: isFollower, isLoading: isLoadingFollower } =
    useGetIsCommunityFollower({
      slug,
      principal: activeProvider?.principal,
    });
  const { mutateAsync: followCommunity } = useFollowCommunity();
  const { mutateAsync: unfollowCommunity } = useUnfollowCommunity();

  const handleFollowClick = useCallback(() => {
    if (isLoadingFollower) return;

    if (isFollower) {
      toast.promise(unfollowCommunity({ slug }), {
        pending: 'Unfollowing community....',
        error: 'Error',
        success: 'Unfollowed community',
      });
    } else {
      toast.promise(followCommunity({ slug }), {
        pending: 'Following community....',
        error: 'Error',
        success: 'Followed community',
      });
    }
  }, [isFollower, isLoadingFollower, followCommunity, unfollowCommunity, slug]);

  return (
    <div>
      <div className="flex items-center justify-between rounded-2xl bg-slate-600 p-4">
        <div className="flex min-w-0 items-center justify-center gap-4">
          <Image
            src={logo}
            alt={name}
            width={50}
            height={50}
            className="mt-2 flex"
          />
          <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
            {name}
          </h2>
        </div>
        <div className="mt-0 flex md:ml-4">
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={handleFollowClick}
            disabled={isLoadingFollower || !isConnected}
          >
            {isFollower ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>
      {creator && (
        <Avatar
          className="my-4 justify-center text-white"
          profile={creator}
          showBadge
          showName
        />
      )}
      <Portal website={socials.home} metadata={metadata} />
    </div>
  );
}
