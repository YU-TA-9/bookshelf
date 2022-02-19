import { css } from '@emotion/react';
import { api } from '../../api/apiFactory';
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
  const handleLogout = async () => {
    try {
      await api.authControllerLogout();
      localStorage.clear();
      window.location.reload();
    } catch (e) {}
  };

  return (
    <div css={sidebar}>
      <ul css={itemList}>
        <li css={item}>
          <LinkText isReactRouter text="登録" to="/register"></LinkText>
        </li>
        <li css={item}>
          <LinkText isReactRouter text="カテゴリー" to="/category"></LinkText>
        </li>
        <li css={item}>
          <LinkText text="ログアウト" to="#" onClick={handleLogout}></LinkText>
        </li>
      </ul>
    </div>
  );
};
