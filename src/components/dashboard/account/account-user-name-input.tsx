'use client';

import { userNameUpdate } from '@/apis/user-name-update.api';
import { authStore } from '@/store/auth.store';
import { useEffect, useState } from 'react';

interface AccountUserNameInputProps {
  userName: string;
}

const AccountUserNameInput = ({ userName }: AccountUserNameInputProps) => {
  const [userNickName, setUserNickName] = useState(userName);
  const setUserName = authStore((state) => state.setUserName);

  const handleNickNameUpdate = async () => {
    await userNameUpdate(userNickName);
    setUserName(userNickName);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleNickNameUpdate();
    }, 2000);

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
    </div>
  );
};

export default AccountUserNameInput;
