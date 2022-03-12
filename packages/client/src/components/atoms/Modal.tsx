import { css } from '@emotion/react';
import * as React from 'react';
import { MAX_WIDTH_SP } from '../../styles/media';
import { ModalPortal } from '../customs/ModalPortal';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const modalWrap = css`
  z-index: 10001;
  position: fixed;
  min-width: 480px;
  margin: auto 16px;
  padding: 24px;
  border: 4px solid #aaa;
  border-radius: 10px;
  background: #fffffe;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: ${MAX_WIDTH_SP}) {
    min-width: auto;
    left: 0;
    transform: translate(0, -50%);
  }
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
