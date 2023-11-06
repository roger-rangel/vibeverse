/* eslint-disable @next/next/no-img-element */
import React from 'react';

export function Emoji({
  emoji,
  reactions,
  onClick,
}: {
  emoji: string;
  reactions: number;
  onClick?: () => void;
}) {
  if (reactions === 0) return null;

  return (
    <button
      className="bg-sky-950 px-2 py-1 flex items-center justify-center rounded-full text-xs z-1 text-stone-300 gap-1 border border-indigo-500"
      onClick={onClick}
    >
      <img
        className="xxs:h-6 xxs:w-6 sm:h-4 sm:w-4 rounded-full object-cover"
        src={emoji}
        height={200}
        width={200}
        alt=""
      />
      {reactions}
    </button>
  );
}
