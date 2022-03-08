import { handleLogout } from '../../logics/logout';
import { Popup } from '../atoms/Popup';
import { UserMenuElement } from '../atoms/UserMenuElement';

type Props = {
  isShow: boolean;
  handleHide: () => void;
};

type Menu = {
  to: string;
  label: string;
  onClick?: () => void;
};

const menus: Menu[] = [
  { to: '/user/profile', label: 'プロフィール' },
  { to: '#', label: 'ログアウト', onClick: handleLogout },
];

export const UserMenu = ({ isShow, handleHide }: Props) => {
  return (
    isShow && (
      <Popup
        position="absolute"
        width={180}
        top={0}
        right={0}
        handleHide={handleHide}
      >
        {menus.map((e, i) => (
          <UserMenuElement
            key={i}
            to={e.to}
            label={e.label}
            onClick={e.onClick}
          />
        ))}
      </Popup>
    )
  );
};
