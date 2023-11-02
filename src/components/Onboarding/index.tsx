'use client';

import { useEffect } from 'react';
import { useModal } from 'react-modal-hook';
import { useConnect } from '@connect2ic/react';

import AvatarModal from '@/components/dashboard/home/AvatarModal';
import { useGetProfile } from '@/hooks';

export function Onboarding() {
  const { isConnected, activeProvider } = useConnect();
  const { data: profile, isLoading } = useGetProfile({
    principal: activeProvider?.principal,
  });

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
    if (isConnected && !isLoading && profile === null) {
      showModal();
    }
  }, [isConnected, isLoading, profile, showModal]);

  return <></>;
}
