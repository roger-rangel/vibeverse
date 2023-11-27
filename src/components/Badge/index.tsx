import React from 'react';
import Image from 'next/image';

import { Badge } from '@/types';

export default function BadgeComponent({
  badge: { name, image },
}: {
  badge: Badge;
}) {
  return (
    <div className="inline-flex w-20 flex-col items-center justify-center gap-1 rounded-xl border border-yellow-400 p-1">
      <Image
        src={image}
        alt=""
        className="pointer-events-none rounded object-cover group-hover:border-2"
        width={40}
        height={40}
      />
      <p className="text-sm">{name}</p>
    </div>
  );
}
