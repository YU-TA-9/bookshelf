import { css } from '@emotion/react';
import { GoogleLogin } from 'react-google-login';
import { api } from '../../api/apiFactory';
import { useNavigate } from 'react-router-dom';
import { LinkText } from '../atoms/Link';
import { useNotificationBar } from '../customs/UseNotificationBar';
import { Button } from '../atoms/Button';

type Props = {};

const loginButton = css`
  margin-bottom: 8px;
`;

const googleIcon = css`
  width: 14px;
  height: 14px;
  margin-right: 8px;
`;

export const LoginForm = ({}: Props) => {
  const { notify } = useNotificationBar();
  const navigate = useNavigate();
  const handleSuccessGoogle = async (response: any) => {
    try {
      const { data } = await api.authControllerLoginGoogle({
        token: response.tokenId,
      });
      localStorage.setItem('user_info', JSON.stringify(data));
      navigate('/');
    } catch (e) {
      switch (e.response.status) {
        case 404:
          notify('未登録のユーザーです', 'sub');
          break;
        default:
          notify('ネットワークエラーです', 'sub');
      }
    }
  };

  const handleFailureGoogle = async (response: any) => {
    console.error(response);
  };

  return (
    <>
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        onSuccess={handleSuccessGoogle}
        onFailure={handleFailureGoogle}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <Button
            cssProps={loginButton}
            background="top"
            onClick={renderProps.onClick}
            width={240}
          >
            <img
              css={googleIcon}
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
            Googleでサインイン
          </Button>
        )}
      />
      <p>
        <LinkText isReactRouter text="新しく登録する" to="/signUp" />
      </p>
    </>
  );
};
