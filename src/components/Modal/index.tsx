import React from 'react';
import ReactModal, { Styles } from 'react-modal';

export { useModal } from 'react-modal-hook';

const customStyles: Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'unset !important',
    border: 'unset !important',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 100,
  },
};

export interface ModalProps {
  isOpen: boolean;
  hideModal: () => void;
}

export function Modal({
  children,
  isOpen,
  hideModal,
}: React.PropsWithChildren<ModalProps>) {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={hideModal} style={customStyles}>
      {children}
    </ReactModal>
  );
}
