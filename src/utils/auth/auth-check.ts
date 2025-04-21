'use client';

import { authStore } from '@/store/auth.store';
import { useEffect } from 'react';
import { getUserDataClient } from '@/apis/user-client.api';

/**
 * 소셜 로그인 시 auth상태 zustand update
 */
export const useAuthCheck = () => {
  const setLogin = authStore((state) => state.setLogin);

  useEffect(() => {
    const checkLogin = async () => {
      const { user } = await getUserDataClient();

      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    };
    checkLogin();
  }, [setLogin]);
};
