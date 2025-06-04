'use client';

import { userNameUpdate } from '@/apis/user-name-update.api';
import {  VALIDATE } from '@/constants/auth.messages.constant';
import { toastSuccess } from '@/lib/toast-util';
import { authStore } from '@/store/auth.store';
import { nickNameSchema } from '@/utils/auth/auth-validate-schema';
import { duplicateNickNameValidation } from '@/utils/auth/duplicate-validation';
import { useEffect, useState } from 'react';

interface AccountUserNameInputProps {
  userName: string;
}

const AccountUserNameInput = ({ userName }: AccountUserNameInputProps) => {
  const [userNickName, setUserNickName] = useState(userName);
  const [error, setError] = useState('');
  const setUserName = authStore((state) => state.setUserName);

  const handleNickNameUpdate = async () => {
    const result = nickNameSchema.safeParse(userNickName);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    const status = await duplicateNickNameValidation(userNickName);

    if (status) {
      setError(VALIDATE.DUPLICATED_NICKNAME);
      return;
    }

    await userNameUpdate(userNickName);
    setUserName(userNickName);
    toastSuccess('닉네임이 변경되었습니다!');
    setError('');
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleNickNameUpdate();
    }, 800);

    return () => clearTimeout(timeout);
  }, [userNickName]);

  return (
    <div className='mt-[18px] flex w-full flex-col gap-2'>
      <p className='text-label2-bold text-black'>닉네임</p>
      <input
        type='text'
        value={userNickName}
        onChange={(e) => setUserNickName(e.target.value)}
        className='flex h-11 w-full items-center gap-[10px] rounded border border-gray-10 px-5 py-[10px]'
      />
      <p className='text-caption-medium text-error'>{error}</p>
    </div>
  );
};

export default AccountUserNameInput;
