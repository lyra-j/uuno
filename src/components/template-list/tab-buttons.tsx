'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CommonButton } from '../common/common-button';
import { ROUTES } from '@/constants/path.constant';
import { Icon } from '@iconify/react';

const TabButtons = () => {
  // 확장성을 위한 tab배열 매핑
  const tabs = [
    { key: 'simple', label: '심플한', route: ROUTES.TEMPLATES.SIMPLE },
    { key: 'trendy', label: '트렌디한', route: ROUTES.TEMPLATES.TRENDY },
  ];

  const pathname = usePathname();
  const activeTab =
    tabs.find((tab) => pathname?.includes(tab.route))?.key || 'simple';

  return (
    <section className='mt-[74px] flex items-center justify-between max-sm:flex-col max-sm:gap-y-4 max-sm:items-start'>
      <div className='flex items-center gap-[10px]' role='tablist' aria-label='템플릿 스타일'>
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={tab.route}
            role='tab'
            aria-selected={activeTab === tab.key}
            aria-controls={`${tab.key}-panel`}
            // 버튼에서 탭으로 구조가 바뀌면서, 기존에 있는 버튼과는 default/hover 상태가 달라져 공통 버튼으로 만들지 않은점 참고해주세요.
            className={`flex h-9 w-[108px] items-center justify-center rounded-md px-3 py-1.5 text-label2-bold transition-colors ${
              activeTab === tab.key
                ? 'border-transparent bg-primary-5 text-primary-40'
                : 'border border-gray-10 bg-white text-black hover:bg-primary-5 hover:font-bold hover:text-primary-40'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <CommonButton asChild textClass='text-label2-bold'>
        <Link href={ROUTES.EDITOR} className='flex items-center'>
          <Icon
            icon='mdi:add'
            width='20'
            height='20'
            className='inline-block'
          />
          처음부터 만들기
        </Link>
      </CommonButton>
    </section>
  );
};

export default TabButtons;
