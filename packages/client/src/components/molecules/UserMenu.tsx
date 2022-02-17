import { css } from '@emotion/react';
import { UserMenuElement } from '../atoms/UserMenuElement';

type Props = {};

type Menu = {
  to: string;
  label: string;
};

const userMenu = css`
  width: 180px;
  background: #d8eefe;
  box-shadow: 0 0 8px gray;
  border-radius: 10px;
  padding: 8px 0;
`;

const menus: Menu[] = [{ to: '/user/profile', label: 'プロフィール' }];

export const UserMenu = ({}: Props) => {
  return (
    <div css={userMenu}>
      {menus.map((e, i) => (
        <UserMenuElement key={i} to={e.to} label={e.label} />
      ))}
    </div>
  );
};
