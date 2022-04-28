import React from 'react';
import AuthWrapper from '../components/AuthWrapper';
import dynamic from 'next/dynamic';

const RegistrationForm = dynamic(() => import('../components/Form/RegistrationForm'), {
  ssr: false,
});

export default function Register() {
  return (
    <AuthWrapper
      title={'Create new account'}
      subtext={'Already have an account?'}
      actionHref={'/login'}
      actionText={'Sign in here!'}
    >
      <RegistrationForm />
    </AuthWrapper>
  );
}
