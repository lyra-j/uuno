'use client';

import { authCheck } from '@/utils/auth/auth-check';

const AuthListener = () => {
  authCheck();
  return null;
};

export default AuthListener;
