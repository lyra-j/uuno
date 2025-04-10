'use client';
import { VALIDATE } from '@/constants/auth.messages.constant';
import { login, signup } from '@/services/auth.server.dto';
import { signupGoogle, signupKakao } from '@/services/social.server.dto';
import { getUserDataClient } from '@/services/user.client.dto';
import { authStore } from '@/store/auth.store';
import { modalStore } from '@/store/modal.store';
import { LoginType, SignupType } from '@/types/auth.type';
import {
  duplicateEmailValidation,
  duplicateNickNameValidation,
} from '@/utils/auth/duplicate-validation';
import { loginSchema, signUpSchema } from '@/utils/auth/validate-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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
      mode: 'onChange',
      resolver: zodResolver(type === 'signup' ? signUpSchema : loginSchema),
    }
  );
  const [loginError, setLoginError] = useState('');

  const [validationState, setValidationState] = useState({
    email: {
      checked: false,
      duplicated: false,
    },
    nickName: {
      checked: false,
      duplicated: false,
    },
  });
  const email = watch('email');
  const nick_name = watch('nick_name');
  const setLogin = authStore((state) => state.setLogin);
  const modalOpen = modalStore((state) => state.setIsOpen);

  const handleLogin = async (value: FieldValues) => {
    const { success, message } = await login(value as LoginType);
    if (!success) {
      setLoginError(message);
      reset();
    } else {
      const { user, message } = await getUserDataClient();
      if (message) {
        console.error(message);
      }
      if (user) {
        setLogin(true);
        modalOpen(false);
      }
    }
  };

  const handleSignUp = async (value: FieldValues) => {
    await signup(value as SignupType);
  };

  const handleSocialGoogle = async () => {
    await signupGoogle();
  };

  const handleSocialKakao = async () => {
    await signupKakao();
  };

  const updateValidationState = (
    field: 'email' | 'nickName',
    key: 'checked' | 'duplicated',
    value: boolean
  ) => {
    setValidationState((prev) => ({
      ...prev,
      [field]: { ...prev[field], [key]: value },
    }));
  };

  const handleDuplicate = async (value: DuplicatedType) => {
    if (value.email) {
      if (!(await duplicateEmailValidation(value.email))) {
        /** 중복이 아닐때 */
        updateValidationState('email', 'duplicated', false);
      } else {
        updateValidationState('email', 'duplicated', true);
      }
    }

    if (value.nick_name) {
      if (!(await duplicateNickNameValidation(value.nick_name))) {
        /** 중복이 아닐때 */
        updateValidationState('nickName', 'duplicated', false);
      } else {
        updateValidationState('nickName', 'duplicated', true);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(type === 'signup' ? handleSignUp : handleLogin)}
    >
      {type === 'signup' && (
        <div className='flex flex-col'>
          <div className='flex flex-row'>
            <label htmlFor='nick_name' className='absolute'>
              이름
            </label>
            <input
              id='nick_name'
              {...register('nick_name')}
              className='border pl-16'
            />
            <button
              type='button'
              onClick={async () => {
                await handleDuplicate({ nick_name });
                updateValidationState('nickName', 'checked', true);
                setTimeout(() => {
                  updateValidationState('nickName', 'checked', false);
                }, 1500);
              }}
            >
              중복 체크
            </button>
          </div>
          {formState.errors.nick_name && (
            <p style={{ color: 'red' }}>{formState.errors.nick_name.message}</p>
          )}
          {validationState.nickName.checked &&
            (validationState.nickName.duplicated ? (
              <p style={{ color: 'red' }}>{VALIDATE.DUPLICATED_NICKNAME}</p>
            ) : (
              <p style={{ color: 'red' }}>{VALIDATE.VALID_NICKNAME}</p>
            ))}
        </div>
      )}

      <div className='flex flex-col'>
        <div className='flex flex-row'>
          <label htmlFor='email' className='absolute'>
            이메일
          </label>
          <input
            id='email'
            type='email'
            {...register('email')}
            className='border pl-16'
          />
          {type === 'signup' && (
            <button
              type='button'
              onClick={async () => {
                await handleDuplicate({ email });
                updateValidationState('email', 'checked', true);
                setTimeout(() => {
                  updateValidationState('email', 'checked', false);
                }, 1500);
              }}
            >
              중복 체크
            </button>
          )}
        </div>
        {formState.errors.email && (
          <p style={{ color: 'red' }}>{formState.errors.email.message}</p>
        )}
        {validationState.email.checked &&
          (validationState.email.duplicated ? (
            <p style={{ color: 'red' }}>{VALIDATE.DUPLICATED_EMAIL}</p>
          ) : (
            <p style={{ color: 'red' }}>{VALIDATE.VALID_EMAIL}</p>
          ))}
      </div>

      <div className='flex flex-col'>
        <div className='flex flex-row'>
          <label htmlFor='password' className='absolute'>
            비밀번호
          </label>
          <input
            id='password'
            type='password'
            {...register('password')}
            className='border pl-16'
          />
        </div>
        {formState.errors.password && (
          <p style={{ color: 'red' }}>{formState.errors.password.message}</p>
        )}
      </div>

      {type === 'signup' && (
        <div className='flex flex-col'>
          <div className='flex flex-row'>
            <label htmlFor='confirmPassword' className='absolute'>
              비번 확인
            </label>
            <input
              id='confirmPassword'
              type='password'
              {...register('confirmPassword')}
              className='border pl-16'
            />
          </div>
          {formState.errors.confirmPassword && (
            <p style={{ color: 'red' }}>
              {formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
      )}

      {type === 'signup' && (
        <button
          type='submit'
          disabled={!formState.isValid || validationState.email.duplicated}
        >
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
          <button type='button' onClick={handleSocialGoogle}>
            Google
          </button>
          <button type='button' onClick={handleSocialKakao}>
            KaKao
          </button>
        </>
      )}
    </form>
  );
};

export default AuthForm;
