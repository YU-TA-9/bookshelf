import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { HeaderText } from '../atoms/HeaderText';
import { Link } from 'react-router-dom';
import * as Logo from '../../assets/bookshelf_logo.png';
import { userState } from '../../states/atoms/user';
import * as React from 'react';
import { UserMenu } from '../molecules/UserMenu';
import { MAX_WIDTH_SP } from '../../styles/media';
import { SiteMenuIcon } from '../atoms/SiteMenuIcon';
import { SiteMenu } from '../molecules/SIteMenu';

const header = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #094067;
  padding: 8px;
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
  width: 64px;
  height: 64px;
  margin: auto 0 auto 16px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const headerTextWrap = css`
  margin-left: 16px;

  @media (max-width: ${MAX_WIDTH_SP}) {
    display: none;
  }
`;

const userInfo = css`
  color: #fffffe;
  float: right;
  margin: auto 16px auto 0;

  @media (max-width: ${MAX_WIDTH_SP}) {
    display: none;
  }
`;

const iconWrap = css`
  float: right;
  margin: auto 16px auto 0;
`;

const icon = css`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const menuSP = css`
  display: none;

  @media (max-width: ${MAX_WIDTH_SP}) {
    display: block;
  }
`;

export const Header = () => {
  const user = useRecoilValue(userState);

  const [showUserMenu, setShowUserMenu] = React.useState<boolean>(false);
  const [showSiteMenu, setShowSiteMenu] = React.useState<boolean>(false);

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
            <img alt="logo" src={Logo} />
          </Link>
        </div>
        <div css={headerTextWrap}>
          <HeaderText text="Bookshelf" />
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
          />
          <UserMenu isShow={showUserMenu} handleHide={handleHideMenu} />
        </div>
        <div css={menuSP}>
          <SiteMenuIcon
            onClick={() => {
              setShowSiteMenu(true);
            }}
          />
          <SiteMenu
            isShow={showSiteMenu}
            onClose={() => {
              setShowSiteMenu(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};
