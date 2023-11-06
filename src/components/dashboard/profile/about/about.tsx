import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaAward } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { VscFolderLibrary } from 'react-icons/vsc';
import { useConnect } from '@connect2ic/react';

import styles from './About.module.scss';
import { useGetProfile, useGetPrincipalNfts } from '@/hooks';

import CallToAction from '../callToAction/callToAction';

const About = () => {
  const { activeProvider } = useConnect();
  const { data: profile } = useGetProfile({
    principal: activeProvider?.principal,
  });
  const { data: nfts } = useGetPrincipalNfts();

  
  if (!profile) {
    return (
      <div>
        <CallToAction />
      </div>

    );
  }

  return (
    <section id="about">
      <div className="pt-8 pb-10">
        <h2 className="text-xl text-center text-[#4db5ff]">Your Profile</h2>
        <h5 className="text-center text-sm text-gray-200">
          {profile ? profile.name : 'Creator'}
        </h5>
      </div>
      {profile && (
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

              <article className={styles.about__card}>
                <FaAward className={styles.about__icon} />
                <h5>Rewards</h5>
                <small>0</small>
              </article>

              <article className={styles.about__card}>
                <FiUsers className={styles.about__icon} />
                <h5>Communities</h5>
                <small>10+ Worldwide</small>
              </article>
            </div>

            <div className="flex gap-6 justify-center lg:justify-start mt-10 text-base">
              <Link
                href="#settings"
                className="py-2 px-4 rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] hover:from-[#4ade80] hover:to-[#3b82f6]"
              >
                Settings
              </Link>
              <Link
                href="/dashboard/upload"
                className="py-2 px-4 rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] hover:from-[#4ade80] hover:to-[#3b82f6]"
              >
                Create
              </Link>
              <Link
                href="/dashboard"
                className="py-2 px-4 rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] hover:from-[#4ade80] hover:to-[#3b82f6]"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
