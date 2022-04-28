import dynamic from 'next/dynamic';
import AuthWrapper from '../components/AuthWrapper';

const LoginForm = dynamic(() => import('../components/Form/LoginForm'), {
  ssr: false,
});

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
