'use client';

import { ROUTES } from '@/constants/path.constant';
import { logout } from '@/services/auth.server.dto';
import { authStore } from '@/store/auth.store';
import { modalStore } from '@/store/modal.store';
import { useRouter } from 'next/navigation';
import { CommonButton } from '../common/common-button';

interface HeaderAuthButtonProps {
  type: 'login' | 'logout';
}

const HeaderAuthButton = ({ type }: HeaderAuthButtonProps) => {
  const setLogin = authStore((state) => state.setLogin);
  const modalOpen = modalStore((state) => state.setIsOpen);
  const router = useRouter();

  const handleLogout = async () => {
    const { success, message } = await logout();
    if (success) {
      setLogin(false);
      router.push(ROUTES.HOME);
    }
    if (!success) {
      console.error(message);
    }
  };

  // type === login
  if (type === 'login') {
    return (
      <CommonButton
        type='button'
        onClick={() => modalOpen(true)}
        variant='tertiary'
        textClass='text-label2-medium'
      >
        로그인
      </CommonButton>
    );
  }

  // type === logout
  // 드롭다운 메뉴에서는 공통 버튼모양이 아니라서 분리함
  return (
    <button
      type='button'
      onClick={handleLogout}
      className='text-extra-medium text-black'
    >
      로그아웃
    </button>
  );
};

export default HeaderAuthButton;
