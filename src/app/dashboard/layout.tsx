import DashboardTab from '@/components/dashboard/dashboard-tab';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className='h-[calc(100vh-64px)]'>
      <section className='flex items-center border-b border-solid border-gray-5 p-6 max-md:p-[14px]'>
        {/* 페이지 타이틀 */}
        <div className='mx-auto flex w-full max-w-5xl items-center justify-start px-8 text-title-bold max-md:text-label1-semi max-md:justify-center'>
          <h2>내 명함 관리</h2>
        </div>
      </section>

      <section className='mx-auto max-w-5xl'>
        <div className='flex h-[calc(100vh-150px)]'>
          {/* 왼쪽 : 탭 메뉴 */}
          <aside
            aria-label='대시보드 메뉴'
            className='flex w-[194px] flex-col overflow-auto border-r border-gray-5 px-5 shadow-[0px_3px_18px_0px_rgba(0,0,0,0.04)] max-md:hidden'
          >
            <DashboardTab />
          </aside>

          {/* 오른쪽 : 콘텐츠 영역 */}
          <section className='flex flex-1 flex-col overflow-auto bg-bg'>
            <div className='h-full px-[14px] pt-[14px]'>{children}</div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default DashboardLayout;
