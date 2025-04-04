'use client';
import { VALIDATE } from '@/constants/messages';
import { ROUTES } from '@/constants/path';
import { login, logout, signup } from '@/services/auth.dto';
import { signupGoogle, signupKakao } from '@/services/social.dto';
import { LoginType, SignupType } from '@/types/auth.type';
import {
  duplicateEmailValidation,
  duplicateNickNameValidation,
} from '@/utils/duplicate-validation';
import { loginSchema, signUpSchema } from '@/utils/validate-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

interface FormType {
  email: string;
  password: string;
  confirmPassword?: string;
  nick_name?: string;
}

interface AuthProps {
  type: 'login' | 'signup';
}

interface DuplicatedType {
  email?: string;
  nick_name?: string;
}

const AuthForm = ({ type }: AuthProps) => {
  const { register, handleSubmit, formState, reset, watch } = useForm<FormType>(
    {
      mode: 'onBlur',
      resolver: zodResolver(type === 'signup' ? signUpSchema : loginSchema),
    }
  );
  const [duplicatedEmail, setDuplicatedEmail] = useState(false);
  const [duplicatedNickName, setDuplicatedNickName] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkNickName, setCheckNickName] = useState(false);
  const [loginError, setLoginError] = useState('');
  const email = watch('email');
  const nick_name = watch('nick_name');
  const router = useRouter();

  const handleLogin = async (value: FieldValues) => {
    const result = await login(value as LoginType);
    if (!result.success) {
      setLoginError(result.message);
      reset();
    } else {
      router.push(ROUTES.HOME);
    }
  };

  const handleSignUp = async (value: FieldValues) => {
    await signup(value as SignupType);
  };

  const handleSocial = async (type: string) => {
    if (type === 'google') {
      await signupGoogle();
    }
    if (type === 'kakao') {
      await signupKakao();
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.HOME);
  };

  const handleDuplicate = async ({ email, nick_name }: DuplicatedType) => {
    if (email) {
      if (!(await duplicateEmailValidation(email))) {
        /** 중복이 아닐때 */
        setDuplicatedEmail(false);
      } else {
        setDuplicatedEmail(true);
      }
    }
    if (nick_name) {
      if (!(await duplicateNickNameValidation(nick_name))) {
        /** 중복이 아닐때 */
        setDuplicatedNickName(false);
      } else {
        setDuplicatedNickName(true);
      }
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
          <button
            type='button'
            onClick={async () => {
              await handleDuplicate({ nick_name });
              setCheckNickName(true);
              setTimeout(() => {
                setCheckNickName(false);
              }, 1500);
            }}
          >
            닉네임 중복 체크
          </button>
          {checkNickName &&
            (duplicatedNickName ? (
              <p style={{ color: 'red' }}>{VALIDATE.DUPLICATED_NICKNAME}</p>
            ) : (
              <p style={{ color: 'red' }}>{VALIDATE.VALID_NICKNAME}</p>
            ))}
        </>
      )}

      <label htmlFor='email'>Email:</label>
      <input id='email' type='email' {...register('email')} />
      {formState.errors.email && (
        <p style={{ color: 'red' }}>{formState.errors.email.message}</p>
      )}
      {type === 'signup' && (
        <button
          type='button'
          onClick={async () => {
            await handleDuplicate({ email });
            setCheckEmail(true);
            setTimeout(() => {
              setCheckEmail(false);
            }, 1500);
          }}
        >
          이메일 중복 체크
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
        <>
          <label htmlFor='confirmPassword'>Password:</label>
          <input
            id='confirmPassword'
            type='password'
            {...register('confirmPassword')}
          />
          {formState.errors.confirmPassword && (
            <p style={{ color: 'red' }}>
              {formState.errors.confirmPassword.message}
            </p>
          )}
        </>
      )}

      {type === 'signup' && (
        <button type='submit' disabled={!formState.isValid || duplicatedEmail}>
          회원가입
        </button>
      )}
      {type === 'login' && (
        <>
          <button type='submit'>로그인</button>
          <p style={{ color: 'red' }}>{loginError}</p>
        </>
      )}

      {type === 'login' && (
        <>
          <button type='button' onClick={() => handleSocial('google')}>
            Google
          </button>
          <button
            type='button'
            onClick={() => {
              handleSocial('kakao');
            }}
          >
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
