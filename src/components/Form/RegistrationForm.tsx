import { Button, Text, VStack } from '@chakra-ui/react';
import { GraphQLError } from 'graphql';
import router from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiCheckCircle } from 'react-icons/hi';
import { RegisterMutationVariables, useMeLazyQuery, useRegisterMutation } from '../../generated/graphql';
import { AUTH_COOKIE_EXPIRATION } from '../../lib/constants';
import { FormInput } from './FormInput';
import { FormPasswordInput } from './FormPasswordInput';

export default function RegistrationForm() {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterMutationVariables['data']>();

  const [registerUser, { data }] = useRegisterMutation();
  const [fetchMe] = useMeLazyQuery();

  const onSubmit: SubmitHandler<RegisterMutationVariables['data']> = async (data) => {
    await registerUser({ variables: { data } })
      .catch((e: GraphQLError) => setErrorMessage(e.message))
      .then(async (res) => {
        if (res && res.data?.register) {
          const setCookie = (await import('../../lib/utils/setCookie')).default;
          setCookie('uid', res.data.register, AUTH_COOKIE_EXPIRATION);
          fetchMe()
            .then(() => {
              router.push('/');
            })
            .catch(() => {
              setErrorMessage('Unknown error ocured');
            });
        } else {
          setErrorMessage('Unknown error ocured');
        }
      });
  };

  const isRegistrationSuccessful = data && data.register ? true : false;

  return (
    <VStack
      as="form"
      shadow={{ base: 'none', md: 'md' }}
      p={10}
      spacing={'1.5rem'}
      rounded={'md'}
      onSubmit={handleSubmit(onSubmit)}
      bg={{ base: 'transparent', lg: 'white' }}
      width={{ base: '100%', md: 'auto' }}
    >
      <FormInput
        name={'name'}
        register={register}
        title={'Name'}
        isRequired
        errors={errors}
        rules={{
          required: 'Provide your name, please',
          minLength: { value: 2, message: 'Name must be at least 2 letters long' },
        }}
      />
      <FormInput
        name={'username'}
        register={register}
        title={'Username'}
        isRequired
        errors={errors}
        rules={{
          required: 'Type a username, please',
          minLength: { value: 5, message: 'Password must be at least 5 letters long' },
        }}
      />
      <FormPasswordInput
        name={'password'}
        register={register}
        title={'Password'}
        isRequired
        errors={errors}
        rules={{
          required: 'Type a password, please',
          minLength: { value: 5, message: 'Password must be at least 5 characters long' },
        }}
      />

      <Button
        bgGradient={'linear(to-r, red.400,pink.400)'}
        _hover={{
          shadow: 'md',
          opacity: '0.9',
        }}
        _active={{ opacity: '0.9' }}
        color={'white'}
        type={'submit'}
        isLoading={isSubmitting}
        loadingText={'Creating'}
        width={'full'}
        disabled={isRegistrationSuccessful}
        rightIcon={isRegistrationSuccessful ? <HiCheckCircle /> : undefined}
      >
        {isRegistrationSuccessful ? `Success` : `Create account`}
      </Button>
      <Text color={'red.600'}>{errorMessage}</Text>
    </VStack>
  );
}
