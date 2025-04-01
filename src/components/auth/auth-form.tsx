'use client';
import { VALIDATE } from '@/constants/messages';
import { ROUTES } from '@/constants/path';
import { login, logout, signup } from '@/services/auth.dto';
import { signupGoogle, signupKakao } from '@/services/social.dto';
import { LoginType, SignupType } from '@/types/auth.type';
import { duplicateValidation } from '@/utils/duplicate-validation';
import { loginSchema, signUpSchema } from '@/utils/validate-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

interface FormType {
  email: string;
  password: string;
  nick_name?: string;
}

interface AuthProps {
  type: 'login' | 'signup';
}

const AuthForm = ({ type }: AuthProps) => {
  const [duplicatedEmail, setDuplicatedEmail] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

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

  const handleGoogle = async () => {
    await signupGoogle();
  };

  const handleKakao = async () => {
    await signupKakao();
  };

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.HOME);
  };

  const handleDuplicate = async (email: string) => {
    if (!(await duplicateValidation(email))) {
      /** 중복이 아닐때 */
      setDuplicatedEmail(false);
    } else {
      setDuplicatedEmail(true);
    }
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
      <input
        id='email'
        type='email'
        {...register('email')}
        onChange={(e) => {
          setEmail(e.target.value);
          setDuplicatedEmail(false);
        }}
      />
      {formState.errors.email && (
        <p style={{ color: 'red' }}>{formState.errors.email.message}</p>
      )}
      {type === 'signup' && (
        <button
          type='button'
          onClick={() => {
            handleDuplicate(email);
            setCheckEmail(true);
            setTimeout(() => {
              setCheckEmail(false);
            }, 1500);
          }}
        >
          중복 체크
        </button>
      )}
      {checkEmail &&
        (duplicatedEmail ? (
          <p style={{ color: 'red' }}>{VALIDATE.DUPLICATED_EMAIL}</p>
        ) : (
          <p style={{ color: 'red' }}>{VALIDATE.VALID_EMAIL}</p>
        ))}

      <label htmlFor='password'>Password:</label>
      <input id='password' type='password' {...register('password')} />
      {formState.errors.password && (
        <p style={{ color: 'red' }}>{formState.errors.password.message}</p>
      )}
      {type === 'signup' && (
        <button type='submit' disabled={!formState.isValid || duplicatedEmail}>
          회원가입
        </button>
      )}
      {type === 'login' && <button type='submit'>로그인</button>}

      {type === 'login' && (
        <>
          <button type='button' onClick={handleGoogle}>
            Google
          </button>
          <button type='button' onClick={handleKakao}>
            KaKao
          </button>
        </>
      )}

      <button type='button' onClick={handleLogout}>
        Logout
      </button>
    </form>
  );
};

export default AuthForm;
