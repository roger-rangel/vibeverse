import React from 'react';
import Image from 'next/image';
import styles from './About.module.scss';
import { classnames } from 'tailwindcss-classnames';
import { FaAward } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { VscFolderLibrary } from 'react-icons/vsc';
import Link from 'next/link';

const About = () => {
  return (
    <section id="about">
      <div className="pt-8 pb-10">
        <h5 className="text-center text-sm text-gray-200">Creator</h5>
        <h2 className="text-xl text-center text-[#4db5ff]">My Profile</h2>
      </div>

      <div className={classnames(styles.about__container)}>
        <div className={classnames(styles.about__me)}>
          <div className={classnames(styles.about__me_image)}>
            <Image
              src="/images/avatars/avatar_1.svg"
              alt="avatar"
              className="block w-full object-cover"
              width="400"
              height="400"
            />
          </div>
        </div>

        <div className={classnames(styles.about__content)}>
          <div className={classnames(styles.about__cards)}>
            <article className={classnames(styles.about__card)}>
              <VscFolderLibrary className={classnames(styles.about__icon)} />
              <h5>NFTs</h5>
              <small>0</small>
            </article>

            <article className={classnames(styles.about__card)}>
              <FaAward className={classnames(styles.about__icon)} />
              <h5>Rewards</h5>
              <small>0</small>
            </article>

            <article className={classnames(styles.about__card)}>
              <FiUsers className={classnames(styles.about__icon)} />
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
    </section>
  );
};

export default About;
