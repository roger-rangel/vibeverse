/* eslint-disable @next/next/no-img-element */
'use client';

import { Modal, ModalProps } from '@/components/Modal';
import { useGetEmojis } from '@/hooks';

export function AddEmojiModal({
  isOpen,
  react,
  hideModal,
}: { react: (emoji: string) => void } & ModalProps) {
  const { data: emojis } = useGetEmojis();

  return (
    <Modal isOpen={isOpen} hideModal={hideModal} shouldCloseOnOverlayClick>
      <div className="flex flex-wrap gap-2">
        {emojis?.map((e) => (
          <button
            key={e}
            className="bg-sky-950 flex items-center justify-center rounded-full w-20 h-20 text-xs z-1 text-white pb-0.5"
            onClick={() => {
              react(e);
              hideModal();
            }}
          >
            <img
              className="xxs:h-20 xxs:w-20 sm:h-12 sm:w-12 rounded-full object-cover"
              src={e}
              height={200}
              width={200}
              alt=""
            />
          </button>
        ))}
      </div>
    </Modal>
  );
}
