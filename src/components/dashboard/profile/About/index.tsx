import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useModal } from 'react-modal-hook';
import { FaAward } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { VscFolderLibrary } from 'react-icons/vsc';
import { useConnect } from '@connect2ic/react';

import { EarnedBadgesModal } from '@/components';
import {
  useGetProfile,
  useGetPrincipalNfts,
  useGetEarnedBadges,
} from '@/hooks';

import CallToAction from '../CallToAction';
import ProgressBar from '../ProgressBar';

import styles from './About.module.scss';

const About = () => {
  const { activeProvider } = useConnect();
  const { data: profile } = useGetProfile({
    principal: activeProvider?.principal,
  });
  const { data: nfts } = useGetPrincipalNfts();
  const { data: badges } = useGetEarnedBadges({
    userId: activeProvider?.principal,
  });
  const [showEarnedBadgeModal, hideEarnedBadgeModal] = useModal(
    () => (
      <EarnedBadgesModal
        badges={badges || []}
        isOpen
        hideModal={hideEarnedBadgeModal}
      />
    ),
    [badges],
  );

  if (!profile) {
    return (
      <div>
        <CallToAction />
      </div>
    );
  }

  return (
    <section id="about">
      <div className="pb-10 pt-8">
        <h2 className="text-center text-xl text-[#4db5ff]">Your Profile</h2>
        <h5 className="text-center text-sm text-gray-200">{profile.name}</h5>
        {/* <p className="text-center text-sm text-gray-200">
          Your score: {profile.score.toString()}
        </p> */}
        <ProgressBar profile={profile} />
      </div>
      <div className={styles.about__container}>
        <div className={styles.about__me}>
          <div className={styles.about__me_image}>
            <Image
              src={profile.avatar}
              alt="avatar"
              className="block w-full object-cover"
              width="400"
              height="400"
            />
          </div>
        </div>

        <div className={styles.about__content}>
          <div className={styles.about__cards}>
            <article className={styles.about__card}>
              <VscFolderLibrary className={styles.about__icon} />
              <h5>NFTs</h5>
              <small>{nfts?.length || 0}</small>
            </article>

            <article
              className={styles.about__card}
              onClick={showEarnedBadgeModal}
            >
              <FaAward className={styles.about__icon} />
              <h5>Badges</h5>
              <small>{badges?.length || 0}</small>
            </article>

            <article className={styles.about__card}>
              <FiUsers className={styles.about__icon} />
              <h5>Communities</h5>
              <small>10+ Worldwide</small>
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
    </section>
  );
};

export default About;
