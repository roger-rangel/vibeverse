import React from 'react';
import { useModal } from 'react-modal-hook';

import { CreateCommunityModal } from './CreateCommunityModal';

export function CommunitySection() {
  const [showModal, hideModal] = useModal(
    () => <CreateCommunityModal isOpen hideModal={hideModal} />,
    [],
  );

  return (
    <div className="mx-10 flex flex-row items-center justify-between">
      <h4 className="text-3xl text-white">
        Explorer <b>Communities</b>
      </h4>
      <button
        type="button"
        className="my-5 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-2 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300"
        onClick={showModal}
      >
        Create Community
      </button>
    </div>
  );
}
