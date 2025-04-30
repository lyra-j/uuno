'use client';

import { authStore } from '@/store/auth.store';
import Image from 'next/image';

interface props {
  socialLogin?: string;
}

const AccountSocialLogin = ({ socialLogin }: props) => {
  const userName = authStore((state) => state.userName);
  return (
    <div className='mt-[46px] flex w-full flex-col'>
      <p className='text-label1-semi text-black'>소셜 로그인</p>

      <div className='mt-2 w-full border border-b-gray-5' />

      <div className='mt-6 flex flex-col gap-7'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-row items-center'>
            <Image
              src={'/icons/logos_google-icon.svg'}
              width={24}
              height={24}
              alt='google 로고'
            />
            <p className='ml-6 w-[60px] items-start text-label2-regular text-black'>
              Google
            </p>
            <p
              className={`ml-[74px] text-label2-medium ${socialLogin === 'google' ? 'text-black' : 'text-gray-50'}`}
            >
              {socialLogin === 'google'
                ? `${userName}로 연결됨`
                : '연결되지 않음'}
            </p>
          </div>
          <button className='flex h-8 items-center justify-center gap-1 rounded-[46px] border border-gray-10 px-4 py-[6px]'>
            연결 해제
          </button>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex flex-row items-center'>
            <Image
              src={'/icons/authkakao.svg'}
              width={24}
              height={24}
              alt='kakao 로고'
            />
            <p className='ml-6 w-[60px] items-start text-label2-regular text-black'>
              Kakao
            </p>
            <p
              className={`ml-[74px] text-label2-medium ${socialLogin === 'kakao' ? 'text-black' : 'text-gray-50'}`}
            >
              {socialLogin === 'kakao'
                ? `${userName}로 연결됨`
                : '연결되지 않음'}
            </p>
          </div>
          <button className='flex h-8 items-center justify-center gap-1 rounded-[46px] border border-gray-10 px-4 py-[6px]'>
            연결 해제
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSocialLogin;
