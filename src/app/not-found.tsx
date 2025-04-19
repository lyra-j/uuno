'use client';

import ErrorPageIcon from '@/components/icons/error-page-icon';
import { CommonButton } from '@/components/common/common-button';

const NotFoundPage = () => {
  return (
    <div className='flex h-[calc(100vh-64px)] items-center justify-center'>
      <div className='relative mx-0 flex h-full w-full max-w-5xl flex-col items-center justify-start bg-bg px-4 text-center md:mx-auto md:justify-center md:px-0'>
        <div className='mt-[151px] md:mt-0'>
          <div>
            <ErrorPageIcon />
          </div>
          <p className='mt-11 break-keep text-center text-label2-medium text-gray-70 md:my-0 md:mb-6 md:mt-8 md:text-body-medium'>
            존재하지 않는 주소를 입력하셨거나,
            <br />
            요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
          </p>
        </div>
        <CommonButton
          variant='primary'
          borderRadius='6px'
          size='large'
          className='absolute bottom-[77px] mx-4 w-[calc(100vw-2rem)] text-label2-medium text-white md:relative md:bottom-auto md:mx-0 md:w-auto md:px-9'
          onClick={() => {
            window.location.href = '/';
          }}
        >
          메인 페이지로 이동 →
        </CommonButton>
      </div>
    </div>
  );
};

export default NotFoundPage;
