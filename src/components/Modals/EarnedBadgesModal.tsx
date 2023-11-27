'use client';

import { Modal, ModalProps, ModalHeader } from '@/components/Modal';
import { Badge } from '@/types';
import BadgeComponent from '../Badge';

export function EarnedBadgesModal({
  badges,
  isOpen,
  hideModal,
}: { badges: Badge[] } & ModalProps) {
  return (
    <Modal isOpen={isOpen} hideModal={hideModal}>
      <div className="rounded-lg border border-indigo-600 bg-gray-900">
        <ModalHeader title="Earned Badges" hideModal={hideModal} />
        <div className="flex w-full max-w-xs flex-wrap gap-4 p-2 lg:max-w-3xl">
          {badges.map((b) => (
            <BadgeComponent key={`badge-${b.name}`} badge={b} />
          ))}
        </div>
      </div>
    </Modal>
  );
}
