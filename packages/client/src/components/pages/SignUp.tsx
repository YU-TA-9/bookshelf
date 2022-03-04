import { SignUpForm } from '../molecules/SignUpForm';
import { NotUserTemplate } from '../templates/NotUserTemplate';

export const SignUp = () => {
  return (
    <NotUserTemplate>
      <SignUpForm />
    </NotUserTemplate>
  );
};
