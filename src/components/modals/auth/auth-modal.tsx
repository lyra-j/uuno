'use client';
import { modalStore } from '@/store/modal.store';
import AuthLogin from './auth-login';
import AuthSignup from './auth-signup';
import AuthSignupEmail from './auth-signup-email';

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
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
      onClick={() => {
        setOpenModal(false);
        setModalState('signup');
      }}
    >
      <div
        className='w-[400px] rounded-xl bg-white p-6'
        onClick={(e) => e.stopPropagation()}
      >
        <h1>{modalState === 'login' ? 'Uuno 로그인' : 'Uuno 회원가입'}</h1>
        {modalState === 'login' && <AuthLogin />}
        {modalState === 'signup' && <AuthSignup />}
        {modalState === 'signup-email' && <AuthSignupEmail />}
        <>
          {modalState === 'login' ? (
            <div>
              아직 회원이 아니신가요?
              <span
                className='cursor-pointer'
                onClick={() => {
                  setModalState('signup-email');
                }}
              >
                회원가입
              </span>
            </div>
          ) : (
            <div>
              이미 회원이신가요?
              <span
                className='cursor-pointer'
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
  );
};

export default AuthModal;
