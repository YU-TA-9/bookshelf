import { LoginForm } from '../molecules/LoginForm';
import { NotUserTemplate } from '../templates/NotUserTemplate';

export const Login = () => {
  return (
    <NotUserTemplate>
      <LoginForm />
    </NotUserTemplate>
  );
};
