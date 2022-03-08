import { css, keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';
import { SITE_MENU } from '../../constants/menu';
import { fontSize } from '../../styles/fontSize';
import { fontWeight } from '../../styles/fontWeight';

type Props = {
  isShow: boolean;
  onClose: () => void;
};

const show = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const siteMenu = css`
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #094067;
  opacity: 0.8;
  padding: 16px;

  animation-name: ${show};
  animation-duration: 0.3s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-direction: alternate;
`;

const closeButton = css`
  position: absolute;
  cursor: pointer;
  top: 24px;
  right: 24px;
  font-size: 48px;
  color: #fffffe;
  text-align: right;
`;

const menu = css`
  display: flex;
  height: 100%;
  color: #fffffe;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const item = css`
  margin-bottom: 16px;
`;

const link = css`
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.large};
  color: #fffffe;
`;

export const SiteMenu = ({ isShow, onClose }: Props) => {
  return (
    isShow && (
      <div css={siteMenu}>
        <div css={closeButton} onClick={onClose}>
          ×
        </div>
        <nav css={menu}>
          <ul>
            {SITE_MENU.map((e) => (
              <li css={item}>
                <Link css={link} to={e.to}>
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    )
  );
};
