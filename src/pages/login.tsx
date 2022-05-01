import AuthWrapper from '../components/AuthWrapper';
import LoginForm from '../components/Form/LoginForm';

export default function Login() {
  return (
    <AuthWrapper
      title={'Sign in existing account'}
      subtext={'Not registered yet?'}
      actionHref={'/register'}
      actionText={'Register here!'}
    >
      <LoginForm />
    </AuthWrapper>
  );
}
