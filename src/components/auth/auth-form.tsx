'use client';
import { VALIDATE } from '@/constants/messages';
import { ROUTES } from '@/constants/path';
import { login, logout, signup } from '@/services/auth.server.dto';
import { signupGoogle, signupKakao } from '@/services/social.server.dto';
import { authStore } from '@/store/auth.store';
import { LoginType, SignupType } from '@/types/auth.type';
import {
  duplicateEmailValidation,
  duplicateNickNameValidation,
} from '@/utils/duplicate-validation';
import { createClient } from '@/utils/supabase/client';
import { loginSchema, signUpSchema } from '@/utils/validate-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
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
  const supabase = createClient();
  const email = watch('email');
  const nick_name = watch('nick_name');
  const router = useRouter();
  const setLogin = authStore((state) => state.setLogin);

  const handleLogin = async (value: FieldValues) => {
    const result = await login(value as LoginType);
    if (!result.success) {
      setLoginError(result.message);
      reset();
    } else {
      const { data, error } = await supabase.auth.getUser();
      if (data.user) {
        setLogin(true);
      }
      router.push(ROUTES.HOME);
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

  const handleLogout = async () => {
    await logout();
    setLogin(false);
    router.push(ROUTES.HOME);
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
              updateValidationState('nickName', 'checked', true);
              setTimeout(() => {
                updateValidationState('nickName', 'checked', false);
              }, 1500);
            }}
          >
            닉네임 중복 체크
          </button>
          {validationState.nickName.checked &&
            (validationState.nickName.duplicated ? (
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
            updateValidationState('email', 'checked', true);
            setTimeout(() => {
              updateValidationState('email', 'checked', false);
            }, 1500);
          }}
        >
          이메일 중복 체크
        </button>
      )}

      {validationState.email.checked &&
        (validationState.email.duplicated ? (
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

      <button type='button' onClick={handleLogout}>
        Logout
      </button>
    </form>
  );
};

export default AuthForm;
