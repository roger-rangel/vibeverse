import React, { useCallback } from 'react';
import { useModal } from 'react-modal-hook';
import { useQueryClient } from '@tanstack/react-query';

import { useActor } from '@/hooks';
import { Reactions } from '@/types';

import { Emoji } from './Emoji';
import { AddEmojiModal } from './AddEmojiModal';

export function Reactions({
  collectionId,
  nftId,
  reactions,
}: {
  collectionId: bigint;
  nftId: bigint;
  reactions: Reactions;
}) {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const handle = useCallback(
    async (emoji: string) => {
      if (!actor) return;

      const result = await actor.add_remove_reaction(
        collectionId,
        nftId,
        emoji,
      );
      queryClient.invalidateQueries({
        queryKey: [`nft-metadata-${collectionId}-${nftId}`],
      });

      console.log(result);
    },
    [actor, collectionId, nftId, queryClient],
  );
  const [showModal, hideModal] = useModal(() => (
    <AddEmojiModal isOpen react={handle} hideModal={hideModal} />
  ));

  return (
    <div className="flex gap-1 items-center justify-end">
      {reactions.map((reaction) => (
        <Emoji
          key={reaction.emoji}
          emoji={reaction.emoji}
          reactions={reaction.reactors.length}
          onClick={() => handle(reaction.emoji)}
        />
      ))}
      <button
        className="bg-sky-950 flex items-center justify-center rounded-full w-6 h-6 text-xs z-1 text-white pb-0.5"
        onClick={showModal}
      >
        +
      </button>
    </div>
  );
}
