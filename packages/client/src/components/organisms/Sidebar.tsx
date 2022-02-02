import { css } from '@emotion/react';
import { Link } from '../atoms/Link';

const sidebar = css`
  background: #d8eefe;
  height: 100%;
  width: 100%;
  padding: 16px;
`;

const itemList = css`
  padding: 0;
  height: 100%;
  width: 100%;
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
          <Link text="登録" href="/register"></Link>
        </li>
        <li css={item}>
          <Link text="ログイン" href="/login"></Link>
        </li>
      </ul>
    </div>
  );
};
