import { css } from '@emotion/react';
import { Link } from '../atoms/Link';

const sidebar = css`
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  background: #d8eefe;
  height: 100%;
  width: 302px;
`;

const itemList = css`
  position: absolute;
  list-style: none;
  padding: 0;
  height: 100%;
  width: 100%;
  top: 124px;
  overflow: hidden;
`;

const item = css`
  text-align: center;
  margin-bottom: 16px;
`;

export const Sidebar = () => {
  return (
    <div css={sidebar}>
      <ul css={itemList}>
        <li css={item}>
          <Link text="登録" href="/test"></Link>
        </li>
        <li css={item}>
          <Link text="ログイン" href="/login"></Link>
        </li>
      </ul>
    </div>
  );
};
