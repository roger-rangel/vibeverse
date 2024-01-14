import React from 'react';
import Image from 'next/image';

import { type Badge, type Creator } from '@/types';

export type AvatarSize = 'sm' | 'md' | 'lg';

export function Badge({
  badge: { image, name },
  size = 'sm',
  className = '',
}: {
  badge: Badge;
  size?: AvatarSize;
  className?: string;
}) {
  const getBadgeStyle = () => {
    switch (size) {
      case 'sm':
        return 'w-5 h-5';
      case 'md':
        return 'w-10 h-10';
      case 'lg':
        return 'w-16 h-16';
    }
  };

  return (
    <Image
      src={image}
      alt={name}
      className={getBadgeStyle() + ' ' + className}
      width={40}
      height={40}
    />
  );
}

export function Avatar({
  profile: { name, avatar, badge },
  showBadge = true,
  showName = false,
  size = 'sm',
  className = '',
}: {
  profile: Creator;
  showBadge?: boolean;
  showName?: boolean;
  size?: AvatarSize;
  className?: string;
}) {
  const getAvatarStyle = () => {
    switch (size) {
      case 'sm':
        return 'w-12 h-12 rounded-full';
      case 'md':
        return 'w-32 h-32 rounded-md';
      case 'lg':
        return 'w-64 h-64 rounded-lg';
    }
  };

  const getBadgeStyle = () => {
    switch (size) {
      case 'sm':
        return '-top-1 -right-1';
      case 'md':
        return '-top-4 -right-4';
      case 'lg':
        return '-top-6 -right-6';
    }
  };

  return (
    <div className={'flex flex-row items-center gap-2 ' + className}>
      <div className="relative">
        <Image
          src={avatar}
          alt={name}
          className={getAvatarStyle()}
          width={200}
          height={200}
        />
        {showBadge && (
          <Badge
            badge={badge}
            className={'absolute ' + getBadgeStyle()}
            size={size}
          />
        )}
      </div>
      {showName && <p className="text-md">{name}</p>}
    </div>
  );
}
