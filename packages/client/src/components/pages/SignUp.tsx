import { css } from '@emotion/react';
import { Card } from '../atoms/Card';
import { Title } from '../atoms/Title';
import { SignUpForm } from '../molecules/SignUpForm';
import { NotUserTemplate } from '../templates/NotUserTemplate';

const userRegisterWrap = css`
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

export const SignUp = () => {
  return (
    <NotUserTemplate>
      <div css={userRegisterWrap}>
        <div css={titleWrap}>
          <Title text="Bookshelf" />
        </div>
        <Card>
          <SignUpForm title="ユーザー登録" />
        </Card>
      </div>
    </NotUserTemplate>
  );
};
