'use client';
import { VALIDATE } from '@/constants/messages';
import { login, signup } from '@/services/auth.dto';
import { LoginType, SignupType } from '@/types/auth.type';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

interface FormType {
  email: string;
  password: string;
  nick_name?: string;
}

interface AuthProps {
  type: 'login' | 'signup';
}

const loginSchema = z.object({
  email: z.string().email({ message: VALIDATE.INVALID_EMAIL }),
  password: z
    .string()
    .min(VALIDATE.MIN_PASSWORD_LENGTH, {
      message: VALIDATE.MIN_PASSWORD_MESSAGE,
    })
    .max(VALIDATE.MAX_PASSWORD_LENGTH, {
      message: VALIDATE.MAX_PASSWORD_MESSAGE,
    })
    .regex(VALIDATE.STRING_PASSWORD_REGEX, {
      message: VALIDATE.STRING_PASSWORD_MESSAGE,
    })
    .regex(VALIDATE.NUMBER_PASSWORD_REGEX, {
      message: VALIDATE.STRING_PASSWORD_MESSAGE,
    }),
});

const signUpSchema = z.object({
  email: z.string().email({ message: VALIDATE.INVALID_EMAIL }),
  password: z
    .string()
    .min(VALIDATE.MIN_PASSWORD_LENGTH, {
      message: VALIDATE.MIN_PASSWORD_MESSAGE,
    })
    .max(VALIDATE.MAX_PASSWORD_LENGTH, {
      message: VALIDATE.MAX_PASSWORD_MESSAGE,
    })
    .regex(VALIDATE.STRING_PASSWORD_REGEX, {
      message: VALIDATE.STRING_PASSWORD_MESSAGE,
    })
    .regex(VALIDATE.NUMBER_PASSWORD_REGEX, {
      message: VALIDATE.STRING_PASSWORD_MESSAGE,
    }),
  nick_name: z
    .string()
    .min(VALIDATE.MIN_NICKNAME_LENGTH, {
      message: VALIDATE.MIN_NICKNAME_MESSAGE,
    })
    .max(VALIDATE.MAX_NICKNAME_LENGTH, {
      message: VALIDATE.MAX_NICKNAME_MESSAGE,
    }),
});

const AuthForm = ({ type }: AuthProps) => {
  const { register, handleSubmit, formState } = useForm<FormType>({
    mode: 'onBlur',
    resolver: zodResolver(type === 'signup' ? signUpSchema : loginSchema),
  });

  const handleLogin = async (value: FieldValues) => {
    await login(value as LoginType);
  };

  const handleSignUp = async (value: FieldValues) => {
    await signup(value as SignupType);
  };

  return (
    <form
      onSubmit={handleSubmit(type === 'signup' ? handleSignUp : handleLogin)}
    >
      {type === 'signup' && (
        <>
          <label htmlFor='nick_name'>nickname:</label>
          <input id='nick_name' {...register('nick_name')} />
          {formState.errors.nick_name && (
            <p style={{ color: 'red' }}>{formState.errors.nick_name.message}</p>
          )}
        </>
      )}

      <label htmlFor='email'>Email:</label>
      <input id='email' type='email' {...register('email')} />
      {formState.errors.email && (
        <p style={{ color: 'red' }}>{formState.errors.email.message}</p>
      )}

      <label htmlFor='password'>Password:</label>
      <input id='password' type='password' {...register('password')} />
      {formState.errors.password && (
        <p style={{ color: 'red' }}>{formState.errors.password.message}</p>
      )}

      <button type='submit'>{type === 'signup' ? 'sign up' : 'login'}</button>
    </form>
  );
};

export default AuthForm;
