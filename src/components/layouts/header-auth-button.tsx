'use client';

import { ROUTES } from '@/constants/path';
import { logout } from '@/services/auth.server.dto';
import { authStore } from '@/store/auth.store';
import { modalStore } from '@/store/modal.store';
import { useRouter } from 'next/navigation';

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

  return (
    <button
      className='rounded-md bg-white px-3 py-[6px]'
      type='button'
      onClick={() => {
        if (type === 'logout') handleLogout();
        if (type === 'login') {
          modalOpen(true);
        }
      }}
    >
      {type === 'login' ? '로그인' : '로그아웃'}
    </button>
  );
};

export default HeaderAuthButton;
