'use client';

import { useAuthCheck } from '@/utils/auth/auth-check';

const AuthListener = () => {
  useAuthCheck();
  return null;
};

export default AuthListener;
