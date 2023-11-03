import React from 'react';
import ReactModal, { Styles, Props } from 'react-modal';

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

export interface ModalProps extends Props {
  hideModal: () => void;
}

export function Modal({
  children,
  ...rest
}: React.PropsWithChildren<ModalProps>) {
  return (
    <ReactModal style={customStyles} ariaHideApp={false} {...rest}>
      {children}
    </ReactModal>
  );
}
