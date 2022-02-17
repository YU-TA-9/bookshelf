import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { HeaderText } from '../atoms/HeaderText';
import { Link } from 'react-router-dom';
import * as sampleLogo from '../../assets/title_logo_example.png';
import { userState } from '../../states/atoms/user';
import * as React from 'react';
import { UserMenu } from '../molecules/UserMenu';
import { Overlay } from '../../logics/Overlay';

const header = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #094067;
`;

const titleArea = css`
  display: flex;
  width: 100%;
`;

const userArea = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const logoWrap = css`
  width: 80px;
  height: 80px;
  margin-left: 16px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const headerTextWrap = css`
  margin-left: 16px;
`;

const userInfo = css`
  color: #ffffff;
  float: right;
  margin-right: 16px;
  line-height: 40px;
`;

const iconWrap = css`
  float: right;
  margin-right: 16px;
`;

const icon = css`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const userMenu = css`
  z-index: 10001;
  position: absolute;
  top: 100px;
  right: 38px;
`;

export const Header = () => {
  const user = useRecoilValue(userState);

  const [showUserMenu, setShowUserMenu] = React.useState<boolean>(false);

  const handleUserMenu = () => {
    setShowUserMenu(true);
  };

  const handleHideMenu = () => {
    setShowUserMenu(false);
  };

  return (
    <div css={header}>
      <div css={titleArea}>
        <div css={logoWrap}>
          <Link to="/">
            <img alt="logo" src={sampleLogo}></img>
          </Link>
        </div>
        <div css={headerTextWrap}>
          <HeaderText text="Bookshelf"></HeaderText>
        </div>
      </div>
      <div css={userArea}>
        <p css={userInfo}>{`${user.lastName} ${user.firstName}`}</p>
        <div css={iconWrap}>
          <img
            css={icon}
            onClick={handleUserMenu}
            alt="icon"
            src={user.iconUrl}
          ></img>
        </div>
        {showUserMenu && (
          <Overlay handleHide={handleHideMenu}>
            <div css={userMenu}>
              <UserMenu />
            </div>
          </Overlay>
        )}
      </div>
    </div>
  );
};
