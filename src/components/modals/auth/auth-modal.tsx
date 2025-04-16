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
        className='flex w-[368px] flex-col items-center gap-[26px] rounded-xl bg-white p-6 px-[30px] py-10'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex flex-col items-center gap-[46px] self-stretch'>
          <div className='flex flex-col items-start gap-[26px] self-stretch'>
            <div className='flex items-center justify-center gap-[17px] self-stretch'>
              <h2 className='text-heading-semi text-black'>
                {modalState === 'login' ? 'Uuno 로그인' : 'Uuno 회원가입'}
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
