'use client';

import { useEffect } from 'react';
import { useModal } from 'react-modal-hook';
import { useConnect } from '@connect2ic/react';

import AvatarModal from '@/components/dashboard/home/AvatarModal';
import { useGetProfile } from '@/hooks';

export function Onboarding() {
  const { isConnected } = useConnect();
  const { data: profile, isLoading } = useGetProfile();

  const [showModal, hideModal] = useModal(
    () => (
      <AvatarModal
        isOpen
        hideModal={hideModal}
        shouldCloseOnOverlayClick={false}
        preventScroll
      />
    ),
    [],
  );

  useEffect(() => {
    if (isConnected && !isLoading && profile === undefined) {
      showModal();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, profile]);

  return <></>;
}
