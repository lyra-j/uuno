import AuthGoogleIcon from '@/components/icons/auth/auth-google';
import AuthKakaoIcon from '@/components/icons/auth/auth-kakao';
import AuthMailIcon from '@/components/icons/auth/auth-mail';
import { signupGoogle, signupKakao } from '@/apis/social-server.api';
import { modalStore } from '@/store/modal.store';
import { authStore } from '@/store/auth.store';
import { getUserDataClient } from '@/apis/user-client.api';

const AuthSignup = () => {
  const setModalState = modalStore((state) => state.setModalState);
  const setUserName = authStore((state) => state.setUserName);

  const handleSocialGoogle = async () => {
    await signupGoogle(window.location.pathname);
    const { user } = await getUserDataClient();

    const userName = user?.user_metadata.full_name;

    setUserName(userName);
  };

  const handleSocialKakao = async () => {
    await signupKakao(window.location.pathname);
    const { user } = await getUserDataClient();

    const userName = user?.user_metadata.full_name;

    setUserName(userName);
  };

  return (
    <div className='flex h-[158px] w-[308px] flex-col items-start gap-[10px]'>
      <div className='flex flex-col items-start gap-[10px]'>
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
        <button
          className='flex h-[44px] w-[308px] items-center justify-center gap-[6px] rounded-[6px] border border-b-gray-10 bg-white px-5 py-3'
          type='button'
          onClick={() => setModalState('signup-email')}
        >
          <AuthMailIcon />
          <p className='text-label2-medium text-black'>이메일로 가입</p>
        </button>
      </div>
    </div>
  );
};

export default AuthSignup;
