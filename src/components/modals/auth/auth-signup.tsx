import { signupGoogle, signupKakao } from '@/services/social.server.dto';
import { modalStore } from '@/store/modal.store';

const AuthSignup = () => {
  const setModalState = modalStore((state) => state.setModalState);
  const handleSocialGoogle = async () => {
    await signupGoogle();
  };

  const handleSocialKakao = async () => {
    await signupKakao();
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col'>
        <button type='button' onClick={handleSocialKakao}>
          카카오로 시작하기
        </button>
        <button type='button' onClick={handleSocialGoogle}>
          구글로 시작하기
        </button>
        <button type='button' onClick={() => setModalState('signup-email')}>
          Uuno 아이디로 가입
        </button>
      </div>
    </div>
  );
};

export default AuthSignup;
