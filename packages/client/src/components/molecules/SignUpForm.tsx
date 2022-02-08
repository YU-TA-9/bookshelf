import { css } from '@emotion/react';
import { GoogleLoginButton } from '../atoms/GoogleLoginButton';
import { Title } from '../atoms/Title';
import { GoogleLogin } from 'react-google-login';
import { api } from '../../api/apiFactory';
import { useNavigate } from 'react-router-dom';
import { LinkText } from '../atoms/Link';

const titleWrap = css`
  margin-bottom: 16px;
`;

const buttonWrap = css`
  margin: 0 auto 16px auto;
`;

const loginLinkWrap = css`
  margin-bottom: 16px;
`;

const contentsWrap = css`
  text-align: center;
`;

type Props = {
  title: string;
};

export const SignUpForm = ({ title }: Props) => {
  const navigate = useNavigate();
  const handleSuccessGoogle = async (response: any) => {
    try {
      const { data } = await api.authControllerRegisterGoogle({
        token: response.tokenId,
      });
      localStorage.setItem('user_info', JSON.stringify(data));
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const handleFailureGoogle = async (response: any) => {
    console.error(response);
  };

  return (
    <div css={contentsWrap}>
      <div css={titleWrap}>
        <Title text={title} />
      </div>
      <div css={buttonWrap}>
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID}
          render={(renderProps) => (
            <GoogleLoginButton
              position="center"
              text="Sign up with google"
              onClick={renderProps.onClick}
              //disabled={renderProps.disabled}
            />
          )}
          onSuccess={handleSuccessGoogle}
          onFailure={handleFailureGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
      <div css={loginLinkWrap}>
        <LinkText isReactRouter text="ログイン" to="/login" />
      </div>
    </div>
  );
};
