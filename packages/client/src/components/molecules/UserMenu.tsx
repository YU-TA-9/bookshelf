import { css } from '@emotion/react';
import { Popup } from '../atoms/Popup';
import { UserMenuElement } from '../atoms/UserMenuElement';

type Props = {
  top: number;
  right: number;
  handleHide: () => void;
};

type Menu = {
  to: string;
  label: string;
};

const menus: Menu[] = [{ to: '/user/profile', label: 'プロフィール' }];

export const UserMenu = ({ top, right, handleHide }: Props) => {
  return (
    <Popup
      position="fixed"
      width={180}
      top={top}
      right={right}
      handleHide={handleHide}
    >
      {menus.map((e, i) => (
        <UserMenuElement key={i} to={e.to} label={e.label} />
      ))}
    </Popup>
  );
};
