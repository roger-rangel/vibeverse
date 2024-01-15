import React, { useCallback } from 'react';
import Link from 'next/link';
import { formatFixed } from '@ethersproject/bignumber';
import { FiUsers } from 'react-icons/fi';
import { VscFolderLibrary } from 'react-icons/vsc';
import { useConnect } from '@connect2ic/react';

import {
  useGetProfile,
  useGetPrincipalNfts,
  useGetCommunitiesFollowed,
  useClaimRewards,
  useGetVibeTokenInfo,
} from '@/hooks';

import CallToAction from '../CallToAction';
// import ProgressBar from '../ProgressBar';
import { Avatar, Badge } from '../../../Avatar';

import styles from './About.module.scss';
import { useGetVibeTokenBalance } from '@/hooks/useGetVibeTokenBalance';
import { toast } from 'react-toastify';

const About = () => {
  const { activeProvider } = useConnect();
  const { data: profile } = useGetProfile({
    principal: activeProvider?.principal,
  });
  const { data: nfts } = useGetPrincipalNfts();
  const { data: communities } = useGetCommunitiesFollowed({
    userId: activeProvider?.principal,
  });
  const { data: vibeBalance } = useGetVibeTokenBalance({
    principal: activeProvider?.principal,
  });
  const { data: tokenInfo } = useGetVibeTokenInfo();

  const { mutateAsync: claimRewards } = useClaimRewards();

  const handleClaimRewards = useCallback(async () => {
    if (!profile) {
      toast.error('You need to login first');
    }

    await claimRewards({});
  }, [claimRewards, profile]);

  if (!profile) {
    return (
      <div>
        <CallToAction />
      </div>
    );
  }

  return (
    <section id="about">
      <div className={styles.about__container}>
        <div className=" mt-20 rounded-lg border border-sky-500 ">
          <Avatar profile={profile} size="lg" showBadge={false} />
        </div>

        <div className={styles.about__content}>
          <div className="flex flex-row items-center justify-center gap-4 pb-10 pt-8">
            <h2 className="-ml-64 text-center text-3xl text-[#4db5ff]">
              {profile.name}
            </h2>
            <Badge badge={profile.badge} size="sm" className="-ml-4 -mt-8" />
            <div className="my-2 text-sm">
              Your score: {profile.score.toString()}
            </div>
          </div>
          <div className={styles.about__cards}>
            <article className={styles.about__card}>
              <VscFolderLibrary className={styles.about__icon} />
              <h5>NFTs</h5>
              <small>{nfts?.length || 0}</small>
            </article>

            <article className={styles.about__card}>
              <FiUsers className={styles.about__icon} />
              <h5>Communities followed</h5>
              <small>{communities?.length || 0}</small>
            </article>
          </div>

          <div className="mt-10 flex justify-center gap-6 text-base lg:justify-start">
            <Link
              href="#settings"
              className="rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] px-4 py-2 hover:from-[#4ade80] hover:to-[#3b82f6]"
            >
              Settings
            </Link>
            <Link
              href="/dashboard/upload"
              className="rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] px-4 py-2 hover:from-[#4ade80] hover:to-[#3b82f6]"
            >
              Create
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] px-4 py-2 hover:from-[#4ade80] hover:to-[#3b82f6]"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
      <div className="ml-28 flex flex-col items-start justify-center gap-2">
        {tokenInfo ? (
          <>
            {vibeBalance !== undefined && (
              <div className="my-2 mt-10 text-sm">
                VIBE tokens: {formatFixed(vibeBalance, tokenInfo.decimals)}
              </div>
            )}
            <div className="mb-12 flex flex-row items-center gap-6">
              <p className="text-base">
                New Tokens:{' '}
                {formatFixed(profile.claimableRewards, tokenInfo.decimals)}
              </p>
              <button
                onClick={handleClaimRewards}
                disabled={profile.claimableRewards === BigInt(0)}
                className="cursor-pointer rounded-lg bg-gradient-to-r from-[#4ade80] to-[#3b82f6] px-4 py-2 text-base hover:from-[#FDFC47] hover:to-[#4ade80] hover:text-zinc-800"
              >
                Claim
              </button>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default About;
