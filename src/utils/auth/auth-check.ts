'use client';

import { authStore } from '@/store/auth.store';
import { useEffect } from 'react';
import { getUserDataClient } from '@/apis/user-client.api';

/**
 * 소셜 로그인 시 auth상태 zustand update
 */
export const useAuthCheck = () => {
  const setLogin = authStore((state) => state.setLogin);
  const setUserId = authStore((state) => state.setUserId);
  const setUserName = authStore((state) => state.setUserName);

  useEffect(() => {
    const checkLogin = async () => {
      const { user } = await getUserDataClient();

      if (user) {
        setLogin(true);
        setUserId(user?.id);
        setUserName(
          user?.user_metadata.nick_name || user?.user_metadata.full_name
        );
      } else {
        setLogin(false);
        setUserId('');
        setUserName('');
      }
    };
    checkLogin();
  }, [setLogin]);
};
