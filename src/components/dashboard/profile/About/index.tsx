import React from 'react';
import Link from 'next/link';

import { FiUsers } from 'react-icons/fi';
import { VscFolderLibrary } from 'react-icons/vsc';
import { useConnect } from '@connect2ic/react';

import {
  useGetProfile,
  useGetPrincipalNfts,
  useGetCommunitiesFollowed,
} from '@/hooks';

import CallToAction from '../CallToAction';
import ProgressBar from '../ProgressBar';
import { Avatar, Badge } from '../../../Avatar';

import styles from './About.module.scss';

const About = () => {
  const { activeProvider } = useConnect();
  const { data: profile } = useGetProfile({
    principal: activeProvider?.principal,
  });
  const { data: nfts } = useGetPrincipalNfts();
  const { data: communities } = useGetCommunitiesFollowed({
    userId: activeProvider?.principal,
  });
  if (!profile) {
    return (
      <div>
        <CallToAction />
      </div>
    );
  }

  return (
    <section id="about">
      <div className="flex flex-row items-center justify-center gap-4 pb-10 pt-8">
        <h2 className="text-center text-3xl text-[#4db5ff]">{profile.name}</h2>
        <Badge badge={profile.badge} size="md" />
      </div>
      <div className="my-2 w-full text-center text-sm">
        Your score {profile.score.toString()}
      </div>
      <div className={styles.about__container}>
        <Avatar profile={profile} size="lg" showBadge={false} />

        <div className={styles.about__content}>
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
    </section>
  );
};

export default About;
