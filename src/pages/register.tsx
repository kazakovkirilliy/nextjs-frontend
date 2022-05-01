import React from 'react';
import AuthWrapper from '../components/AuthWrapper';
import RegistrationForm from '../components/Form/RegistrationForm';

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
