import { CommonButton } from '@/components/common/common-button';
import { CommonInput } from '@/components/common/common-input';
import { Icon } from '@iconify/react/dist/iconify.js';

import React from 'react';

const AccountPage = () => {
  return (
    <article className='rounded-xl bg-white px-12 py-8'>
      {/* 기본 정보 섹션 */}
      <section>
        <h3 className='border-b pb-2 text-label1-semi text-black'>기본 정보</h3>
        <div className='flex flex-col gap-[26px] mt-[18px]'>
          <CommonInput label='닉네임' />
          <CommonInput label='아이디' />
          <CommonInput label='비밀번호' />
        </div>
      </section>

      {/* 소셜 로그인 섹션 */}
      <section>
        <h3 className='mt-11 border-b pb-2 text-label1-semi text-black'>
          소셜 로그인
        </h3>
        {/* 구글 */}
        <div className='mt-[18px] flex items-center justify-between'>
          <div className='flex justify-start gap-[75px]'>
            <div className='flex items-center gap-6'>
              <Icon icon='logos:google-icon' width='23.46' height='24' />
              <span className='text-label2-regular'>Google</span>
            </div>
            <div className='text-label2-medium'>[유저 닉네임]로 연결됨</div>
          </div>
          <CommonButton
            variant='tertiary'
            size='small'
            borderRadius='full'
            textClass='text-caption-medium'
            width='77px'
          >
            연결 해제
          </CommonButton>
        </div>

        {/* 카카오 */}
        <div className='mt-7 flex items-center justify-between'>
          <div className='flex justify-start gap-[75px]'>
            <div className='flex items-center gap-6'>
              <Icon
                icon='simple-icons:kakaotalk'
                width='24'
                height='24'
                className='rounded-[6px] bg-black text-[#fee500]'
              />
              <span className='text-label2-regular'>Kakao</span>
            </div>
            <div className='text-label2-regular text-gray-40'>
              연결되지 않음
            </div>
          </div>
          <CommonButton
            variant='tertiary'
            size='small'
            borderRadius='full'
            textClass='text-caption-medium'
            width='77px'
          >
            연결
          </CommonButton>
        </div>
        <p className='mt-[25px] text-end text-caption-medium text-gray-50 underline'>
          탈퇴하기
        </p>
      </section>

      {/* 버튼 영역 */}
      <div className='mt-6 flex items-center justify-center gap-3'>
        <CommonButton
          variant='tertiary'
          size='medium'
          borderRadius='full'
          width='107px'
        >
          취소
        </CommonButton>
        <CommonButton borderRadius='full' width='107px'>
          저장
        </CommonButton>
      </div>
    </article>
  );
};

export default AccountPage;
