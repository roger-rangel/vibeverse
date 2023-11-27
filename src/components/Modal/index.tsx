/* eslint-disable @typescript-eslint/ban-ts-comment */
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

export interface CloseableModalProps {
  hideModal: () => void;
}

export interface ModalProps
  extends Omit<Props, 'children'>,
    CloseableModalProps {}

export function Modal({
  children,
  hideModal,
  ...rest
}: React.PropsWithChildren<ModalProps>) {
  return (
    // @ts-ignore
    <ReactModal
      style={customStyles}
      onRequestClose={hideModal}
      ariaHideApp={false}
      {...rest}
    >
      {/* @ts-ignore */}
      {children}
    </ReactModal>
  );
}

export function ModalHeader({
  title,
  className,
  hideModal,
}: CloseableModalProps & { title: string; className?: string }) {
  return (
    <div
      className={
        'flex min-w-[320px] flex-row items-center justify-between rounded-lg bg-gray-900 px-2 py-4  ' +
        className
      }
    >
      <div>{title}</div>
      <button type="button" onClick={hideModal}>
        Close
      </button>
    </div>
  );
}
