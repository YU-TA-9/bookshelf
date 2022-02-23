import { css } from '@emotion/react';
import * as React from 'react';
import { ModalPortal } from '../../logics/ModalPortal';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const modalWrap = css`
  z-index: 10001;
  position: fixed;
  min-width: 450px;
  margin: 1.5em auto 0;
  padding: 24px;
  border: 2px solid #aaa;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const overlay = css`
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
`;

export const Modal = ({ children, isOpen, onClose }: Props) => {
  return (
    isOpen && (
      <ModalPortal>
        <div css={modalWrap}>{children}</div>
        <div css={overlay} onClick={onClose} />
      </ModalPortal>
    )
  );
};
