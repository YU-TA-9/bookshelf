import { css } from '@emotion/react';
import { api } from '../../api/apiFactory';
import { SITE_MENU } from '../../constants/menu';
import { LinkText } from '../atoms/Link';

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
        {SITE_MENU.map((e) => (
          <li css={item}>
            <LinkText isReactRouter text={e.label} to={e.to} />
          </li>
        ))}
      </ul>
    </div>
  );
};
