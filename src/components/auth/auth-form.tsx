'use client';
import { VALIDATE } from '@/constants/auth.messages.constant';
import { login, signup } from '@/apis/auth-server.api';
import { signupGoogle, signupKakao } from '@/apis/social-server.api';
import { getUserDataClient } from '@/apis/user-client.api';
import { authStore } from '@/store/auth.store';
import { modalStore } from '@/store/modal.store';
import { LoginType, SignupType } from '@/types/auth.type';
import {
  duplicateEmailValidation,
  duplicateNickNameValidation,
} from '@/utils/auth/duplicate-validation';
import { loginSchema, signUpSchema } from '@/utils/auth/auth-validate-schema';
import { debounce } from '@/utils/common/common.debounce.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import AuthErrorIcon from '@/components/icons/auth/auth-error';
import AuthConfirmIcon from '@/components/icons/auth/auth-confirm';
import AuthKakaoIcon from '@/components/icons/auth/auth-kakao';
import AuthGoogleIcon from '@/components/icons/auth/auth-google';

interface FormType {
  email: string;
  password: string;
  confirmPassword?: string;
  nick_name?: string;
}

interface AuthProps {
  type: 'login' | 'signup';
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
  const setUserId = authStore((state) => state.setUserId);
  const setUserName = authStore((state) => state.setUserName);
  const setModalState = modalStore((state) => state.setModalState);

  // 로그인 함수
  const handleLogin = async (value: FieldValues) => {
    const { success, message } = await login(value as LoginType);
    if (!success) {
      setLoginError(message);
      reset();
    } else {
      const { user, message } = await getUserDataClient();
      setUserId(user?.id);
      setUserName(user?.user_metadata.nick_name);

      if (message) {
        console.error(message);
      }
      if (user) {
        setLogin(true);
        modalOpen(false);
        setModalState('signup');
      }
    }
  };

  // 회원가입
  const handleSignUp = async (value: FieldValues) => {
    const { success } = await signup(value as SignupType);
    if (success) {
      reset();
      setModalState('login');
    }
  };

  // 구글 로그인
  const handleSocialGoogle = async () => {
    await signupGoogle(window.location.pathname);
  };

  // 카카오 로그인
  const handleSocialKakao = async () => {
    await signupKakao(window.location.pathname);
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

  // 중복 검사
  const handleDuplicate = async (
    field: 'nick_name' | 'email',
    value: string
  ) => {
    if (!value) return;

    if (field === 'email') {
      if (!(await duplicateEmailValidation(value))) {
        /** 중복이 아닐때 */
        updateValidationState('email', 'duplicated', false);
      } else {
        updateValidationState('email', 'duplicated', true);
      }
    }

    if (field === 'nick_name') {
      if (!(await duplicateNickNameValidation(value))) {
        /** 중복이 아닐때 */
        updateValidationState('nickName', 'duplicated', false);
      } else {
        updateValidationState('nickName', 'duplicated', true);
      }
    }
  };

  // 디바운스로 중복 검사
  const debouncedCheck = useMemo(() => {
    return debounce(handleDuplicate, 400);
  }, []);

  // 이메일 호출
  useEffect(() => {
    if (email && email.length > 7) {
      updateValidationState('email', 'checked', true);
      debouncedCheck('email', email);
    }
  }, [email]);

  // 닉네임 호출
  useEffect(() => {
    if (nick_name && nick_name.length > 2) {
      updateValidationState('nickName', 'checked', true);
      debouncedCheck('nick_name', nick_name);
    }
  }, [nick_name]);

  return (
    <form
      className='flex flex-col items-start gap-[14px] self-stretch'
      onSubmit={handleSubmit(type === 'signup' ? handleSignUp : handleLogin)}
    >
      {type === 'signup' && (
        <div className='g-2 flex w-[308px] flex-col items-start'>
          <label htmlFor='nick_name' className='text-label2-bold text-black'>
            닉네임
          </label>
          <input
            id='nick_name'
            {...register('nick_name')}
            className='flex h-11 w-[308px] items-center justify-between rounded-[6px] border border-gray-10 px-5 py-3'
          />
          <div className='g-1 flex items-center self-stretch'>
            {formState.errors.nick_name ? (
              <>
                <AuthErrorIcon />
                <p className='text-caption-medium text-error'>
                  {formState.errors.nick_name.message}
                </p>
              </>
            ) : validationState.nickName.checked ? (
              <>
                {validationState.nickName.duplicated ? (
                  <AuthErrorIcon />
                ) : (
                  <AuthConfirmIcon />
                )}
                <p
                  className={`text-caption-medium ${
                    validationState.nickName.duplicated
                      ? 'text-error'
                      : 'text-primary-40'
                  }`}
                >
                  {validationState.nickName.duplicated
                    ? VALIDATE.DUPLICATED_NICKNAME
                    : VALIDATE.VALID_NICKNAME}
                </p>
              </>
            ) : null}
          </div>
        </div>
      )}

      <div className='flex flex-col'>
        <label htmlFor='email' className='text-label2-bold text-black'>
          이메일
        </label>
        <input
          id='email'
          type='email'
          {...register('email')}
          className='flex h-11 w-[308px] items-center justify-between rounded-[6px] border border-gray-10 px-5 py-3'
        />
        <div className='g-1 flex items-center self-stretch'>
          {type === 'signup' && (
            <>
              {formState.errors.email ? (
                <>
                  <AuthErrorIcon />
                  <p className='text-caption-medium text-error'>
                    {formState.errors.email.message}
                  </p>
                </>
              ) : validationState.email.checked ? (
                <>
                  {validationState.email.duplicated ? (
                    <AuthErrorIcon />
                  ) : (
                    <AuthConfirmIcon />
                  )}
                  <p
                    className={`text-caption-medium ${
                      validationState.email.duplicated
                        ? 'text-error'
                        : 'text-primary-40'
                    }`}
                  >
                    {validationState.email.duplicated
                      ? VALIDATE.DUPLICATED_EMAIL
                      : VALIDATE.VALID_EMAIL}
                  </p>
                </>
              ) : null}
            </>
          )}
        </div>
      </div>

      <div className='flex flex-col'>
        <label htmlFor='password' className='text-label2-bold text-black'>
          비밀번호
        </label>
        <input
          id='password'
          type='password'
          {...register('password')}
          className='flex h-11 w-[308px] items-center justify-between rounded-[6px] border border-gray-10 px-5 py-3'
        />
        <div className='g-1 flex items-center self-stretch'>
          {type === 'signup' && formState.errors.password && (
            <>
              <AuthErrorIcon />
              <p className='text-caption-medium text-error'>
                {formState.errors.password.message}
              </p>
            </>
          )}
        </div>
      </div>

      {type === 'signup' && (
        <div className='flex flex-col'>
          <label
            htmlFor='confirmPassword'
            className='text-label2-bold text-black'
          >
            비밀번호 확인
          </label>
          <input
            id='confirmPassword'
            type='password'
            {...register('confirmPassword')}
            className='flex h-11 w-[308px] items-center justify-between rounded-[6px] border border-gray-10 px-5 py-3'
          />
          <div className='g-1 flex items-center self-stretch'>
            {formState.errors.confirmPassword && (
              <>
                <AuthErrorIcon />
                <p className='text-caption-medium text-error'>
                  {formState.errors.confirmPassword.message}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {type === 'signup' && (
        <button
          className='flex h-11 cursor-pointer items-center justify-center gap-1 self-stretch rounded-[6px] bg-primary-40 px-3 py-[6px] hover:bg-primary-50'
          type='submit'
          disabled={
            !formState.isValid ||
            validationState.email.duplicated ||
            validationState.nickName.duplicated
          }
        >
          <p className='text-label2-medium text-white'>회원가입</p>
        </button>
      )}

      {type === 'login' && (
        <>
          <button
            className='flex h-11 cursor-pointer items-center justify-center gap-1 self-stretch rounded-[6px] bg-primary-40 px-3 py-[6px] hover:bg-primary-50'
            type='submit'
          >
            <p className='text-label2-medium text-white'>로그인</p>
          </button>
          <div className='g-1 flex items-center self-stretch'>
            {loginError && (
              <>
                <AuthErrorIcon />
                <p className='text-caption-medium text-error'>{loginError}</p>
              </>
            )}
          </div>
        </>
      )}

      {type === 'login' && (
        <>
          <div className='g-4 flex items-center self-stretch'>
            <div className='flex-grow border-t border-gray-10'></div>
            <p className='text-label2-medium text-gray-70'>간편 로그인</p>
            <div className='flex-grow border-t border-gray-10'></div>
          </div>
          <div className='flex flex-col items-start gap-[10px] self-stretch'>
            <button
              className='flex h-[44px] w-[308px] items-center justify-center gap-[6px] rounded-[6px] bg-[#FEE500] px-5 py-3'
              type='button'
              onClick={handleSocialKakao}
            >
              <AuthKakaoIcon />
              <p className='text-label2-medium text-black'>카카오로 시작하기</p>
            </button>
            <button
              className='flex h-[44px] w-[308px] items-center justify-center gap-[6px] rounded-[6px] border border-b-gray-10 bg-white px-5 py-3'
              type='button'
              onClick={handleSocialGoogle}
            >
              <AuthGoogleIcon />
              <p className='text-label2-medium text-black'>구글로 시작하기</p>
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default AuthForm;
