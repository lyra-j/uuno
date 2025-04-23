import { CommonButton } from '@/components/common/common-button';
import { CommonInput } from '@/components/common/common-input';
import { Icon } from '@iconify/react/dist/iconify.js';

import React from 'react';

const AccountPage = () => {
  return (
    <article className='rounded-xl bg-white px-12 py-8'>
      {/* 기본 정보 섹션 */}
      <section className='flex h-[calc(100vh-16rem)] w-full items-center'>
        <h3 className='flex w-full items-center justify-center pb-2 text-center text-body-medium text-black'>
          계정 설정 페이지는 <br />
          준비 중입니다.
        </h3>
      </section>
    </article>
  );
};

export default AccountPage;
