'use client';
import { ROUTES } from '@/constants/path.constant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Icon } from '@iconify/react';

interface NavigationTab {
  key: string;
  label: string;
  route: string;
  icon: string;
}
const DashboardTab = () => {
  const tabs: NavigationTab[] = [
    {
      key: 'my-cards',
      label: '내 명함',
      route: ROUTES.DASHBOARD.MYCARDS,
      icon: 'tdesign:assignment-user',
    },
    {
      key: 'account',
      label: '계정 설정',
      route: ROUTES.DASHBOARD.ACCOUNT,
      icon: 'tdesign:setting-1',
    },
  ];

  // 경로 일치여부 확인 후 없으면 첫번째를 기본값으로 지정
  const pathname = usePathname();
  const activeTab =
    tabs.find((tab) => pathname?.startsWith(tab.route))?.key || tabs[0].key;

  return (
    <div
      className='mt-11 flex flex-col gap-y-2 text-label2-medium text-gray-70'
      role='tablist'
      aria-label='대시보드 탭'
    >
      {tabs.map((tab) => {
        const isSelected = activeTab === tab.key;

        return (
          <Link
            key={tab.key}
            href={tab.route}
            role='tab'
            aria-selected={isSelected}
            className={`flex items-center gap-2 rounded-md px-4 py-2 transition-colors ${isSelected ? `bg-gray-5 text-label2-medium text-black` : `hover:bg-gray-5`}`}
          >
            <Icon icon={tab.icon} width='18' height='18' />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};

export default DashboardTab;
