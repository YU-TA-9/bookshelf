import { css } from '@emotion/react';
import { Card } from '../atoms/Card';
import { LinkText } from '../atoms/Link';
import { Title } from '../atoms/Title';
import { LoginForm } from '../molecules/LoginForm';
import { NotUserTemplate } from '../templates/NotUserTemplate';

const loginWrap = css`
  width: 50%;
  padding: 20px;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform: translateY(-50%) translateX(-50%);
`;

const titleWrap = css`
  margin-bottom: 16px;
  text-align: center;
`;

export const Login = () => {
  return (
    <NotUserTemplate>
      <div css={loginWrap}>
        <div css={titleWrap}>
          <Title text="Bookshelf" />
        </div>
        <Card>
          <LoginForm title="ログイン" />
        </Card>
      </div>
    </NotUserTemplate>
  );
};
