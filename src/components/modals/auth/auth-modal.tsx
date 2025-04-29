'use client';
import { modalStore } from '@/store/modal.store';
import AuthLogin from './auth-login';
import AuthSignup from './auth-signup';
import AuthSignupEmail from './auth-signup-email';
import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';

const AuthModal = () => {
  const modalState = modalStore((state) => state.modalState);
  const setModalState = modalStore((state) => state.setModalState);
  const openModal = modalStore((state) => state.isOpen);
  const setOpenModal = modalStore((state) => state.setIsOpen);

  if (!openModal) {
    return null;
  }

  return (
    <div
      className='fixed inset-0 z-50 flex justify-center bg-white sm:items-center sm:bg-black/50'
      onClick={() => {
        if (window.innerWidth < 640) {
          return;
        }
        setOpenModal(false);
        setModalState('signup');
      }}
    >
      <div
        className='mt-[100px] flex w-[368px] flex-col items-center gap-[26px] rounded-xl bg-white p-6 px-[30px] py-10 sm:relative sm:mt-0'
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={'/icons/close.svg'}
          width={16}
          height={16}
          alt='닫기 버튼'
          className='absolute right-[30px] top-10 cursor-pointer sm:right-5 sm:top-5'
          onClick={() => {
            setOpenModal(false);
            setModalState('signup');
          }}
        />
        {modalState === 'signup-email' && (
          <Icon
            icon='ci:chevron-left'
            width='24'
            height='24'
            className='absolute left-[30px] top-10 cursor-pointer'
            onClick={() => setModalState('signup')}
          />
        )}
        <div className='flex flex-col items-center gap-[46px] self-stretch'>
          <div
            className={`flex flex-col items-start gap-[${modalState === 'login' ? '60px' : modalState === 'signup-email' ? '26px' : '100px'}] self-stretch sm:gap-[26px]`}
          >
            <div className='flex items-center justify-center gap-[17px] self-stretch'>
              <h2 className='text-heading-semi text-black'>
                {modalState === 'login'
                  ? 'Uuno 로그인'
                  : modalState === 'signup-email'
                    ? '이메일로 회원가입'
                    : 'Uuno 회원가입'}
              </h2>
            </div>
            {modalState === 'signup-email' && <AuthSignupEmail />}
            {modalState === 'signup' && <AuthSignup />}
            {modalState === 'login' && <AuthLogin />}
          </div>
          <>
            {modalState === 'login' ? (
              <div className='flex w-[200px] items-center justify-center gap-[16px]'>
                <p className='text-label2-medium text-black'>
                  아직 회원이 아니신가요?
                </p>
                <span
                  className='cursor-pointer text-label2-medium text-primary-40'
                  onClick={() => {
                    setModalState('signup-email');
                  }}
                >
                  회원가입
                </span>
              </div>
            ) : (
              <div className='flex w-[192px] items-center justify-center gap-[16px]'>
                <p className='text-label2-medium text-black'>
                  이미 회원이신가요?
                </p>
                <span
                  className='cursor-pointer text-label2-medium text-primary-40'
                  onClick={() => {
                    setModalState('login');
                  }}
                >
                  로그인
                </span>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
